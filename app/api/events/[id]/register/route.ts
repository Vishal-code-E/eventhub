import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { sendRegistrationEmail } from '@/lib/email';

const prisma = new PrismaClient();

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id: eventId } = await context.params;
    
    // 1. Validate user session
    const session = await getServerSession();
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized - Please sign in first' },
        { status: 401 }
      );
    }

    // 2. Fetch event
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        club: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // 3. Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // 4. Check if registration already exists
    const existingRegistration = await prisma.eventRegistration.findUnique({
      where: {
        userId_eventId: {
          userId: user.id,
          eventId: event.id,
        },
      },
    });

    if (existingRegistration && existingRegistration.status === 'REGISTERED') {
      return NextResponse.json(
        { error: 'You are already registered for this event' },
        { status: 400 }
      );
    }

    // 5. Create or update registration
    const registration = await prisma.eventRegistration.upsert({
      where: {
        userId_eventId: {
          userId: user.id,
          eventId: event.id,
        },
      },
      update: {
        status: 'REGISTERED',
      },
      create: {
        userId: user.id,
        eventId: event.id,
        status: 'REGISTERED',
      },
    });

    // 6. Create notification
    await prisma.notification.create({
      data: {
        userId: user.id,
        type: 'EVENT_REMINDER',
        payload: {
          eventId: event.id,
          eventTitle: event.title,
          eventDate: event.date.toISOString(),
          eventLocation: event.location || 'TBA',
          clubName: event.club.name,
        },
      },
    });

    // 7. Send confirmation email
    try {
      await sendRegistrationEmail({
        userEmail: user.email,
        userName: user.firstName || user.name || 'there',
        eventTitle: event.title,
        eventDate: event.date,
        eventLocation: event.location,
        clubName: event.club.name,
      });
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // Don't fail the registration if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully registered for the event',
      registration: {
        id: registration.id,
        eventTitle: event.title,
        eventDate: event.date,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Failed to register for event. Please try again.' },
      { status: 500 }
    );
  }
}

// Optional: Implement cancellation endpoint
export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id: eventId } = await context.params;
    
    const session = await getServerSession();
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Update registration status to CANCELLED
    await prisma.eventRegistration.update({
      where: {
        userId_eventId: {
          userId: user.id,
          eventId,
        },
      },
      data: {
        status: 'CANCELLED',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Registration cancelled successfully',
    });
  } catch (error) {
    console.error('Cancellation error:', error);
    return NextResponse.json(
      { error: 'Failed to cancel registration' },
      { status: 500 }
    );
  }
}
