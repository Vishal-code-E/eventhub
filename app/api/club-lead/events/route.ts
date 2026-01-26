import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    // 1. Validate session
    const session = await getServerSession();
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized - Please sign in first' },
        { status: 401 }
      );
    }

    // 2. Get user and validate club lead role
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user || user.role !== 'COORDINATOR' || !user.clubId) {
      return NextResponse.json(
        { error: 'Unauthorized - Only club leads can create events' },
        { status: 403 }
      );
    }

    // 3. Parse form data
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const dateStr = formData.get('date') as string;
    const location = formData.get('location') as string;
    const posterImage = formData.get('posterImage') as File | null;

    // 4. Validate required fields
    if (!title || !description || !dateStr || !location) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // 5. Parse date
    const eventDate = new Date(dateStr);
    if (isNaN(eventDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format' },
        { status: 400 }
      );
    }

    // 6. Handle poster image upload (if provided)
    let posterUrl: string | null = null;
    
    if (posterImage && posterImage.size > 0) {
      // Validate image type
      if (!posterImage.type.startsWith('image/')) {
        return NextResponse.json(
          { error: 'Invalid file type. Please upload an image.' },
          { status: 400 }
        );
      }

      // Create uploads directory if it doesn't exist
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'posters');
      try {
        await mkdir(uploadsDir, { recursive: true });
      } catch (error) {
        console.error('Error creating uploads directory:', error);
      }

      // Generate unique filename
      const timestamp = Date.now();
      const sanitizedFilename = posterImage.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filename = `${timestamp}-${sanitizedFilename}`;
      const filepath = path.join(uploadsDir, filename);

      // Save file
      const bytes = await posterImage.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(filepath, buffer);

      // Store relative URL
      posterUrl = `/uploads/posters/${filename}`;
    }

    // 7. Create event
    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: eventDate,
        location,
        posterUrl,
        clubId: user.clubId,
      },
      include: {
        club: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Event created successfully',
      event: {
        id: event.id,
        title: event.title,
        date: event.date,
      },
    });
  } catch (error) {
    console.error('Event creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create event. Please try again.' },
      { status: 500 }
    );
  }
}
