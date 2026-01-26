import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import EventDetailClient from './EventDetailClient';

const prisma = new PrismaClient();

// Make this page dynamic to avoid build-time database calls
export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EventDetailPage({ params }: PageProps) {
  const { id } = await params;

  // Fetch event with club information
  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      club: {
        select: {
          name: true,
          logoUrl: true,
        },
      },
    },
  });

  if (!event) {
    notFound();
  }

  // Get user session
  const session = await getServerSession();
  
  // Check if user is already registered
  let isRegistered = false;
  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (user) {
      const registration = await prisma.eventRegistration.findUnique({
        where: {
          userId_eventId: {
            userId: user.id,
            eventId: event.id,
          },
        },
      });

      isRegistered = registration?.status === 'REGISTERED';
    }
  }

  return (
    <EventDetailClient
      event={{
        id: event.id,
        title: event.title,
        description: event.description || '',
        date: event.date.toISOString(),
        location: event.location || 'TBA',
        posterUrl: event.posterUrl,
        clubName: event.club.name,
        clubLogoUrl: event.club.logoUrl,
      }}
      isAuthenticated={!!session}
      isRegistered={isRegistered}
    />
  );
}
