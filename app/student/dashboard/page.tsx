import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import Navbar from '@/components/Navbar';
import RegistrationCard from './RegistrationCard';
import { Sparkles } from 'lucide-react';
import { EventsEmptyState } from '@/components/EventsEmptyState';
import { RegistrationCardSkeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

async function RegistrationsList({ userId }: { userId: string }) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      eventRegistrations: {
        include: {
          event: {
            include: {
              club: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  if (!user) {
    redirect('/signup');
  }

  const registrations = user.eventRegistrations;

  if (registrations.length === 0) {
    return (
      <EventsEmptyState
        title="No Registrations Yet"
        description="You haven't registered for any events yet. Browse upcoming events and register to get started!"
        action={{
          label: "Explore Events",
          href: "/events"
        }}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {registrations.map((registration) => (
        <RegistrationCard
          key={registration.id}
          eventId={registration.event.id}
          eventTitle={registration.event.title}
          eventDate={registration.event.date}
          eventLocation={registration.event.location}
          posterUrl={registration.event.posterUrl}
          clubName={registration.event.club.name}
          status={registration.status}
        />
      ))}
    </div>
  );
}

function RegistrationsLoading() {
  return (
    <div className="grid grid-cols-1 gap-4">
      {[1, 2, 3].map((i) => (
        <RegistrationCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default async function StudentDashboard() {
  const session = await getServerSession();

  if (!session || !session.user?.email) {
    redirect('/signup');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      name: true,
    },
  });

  if (!user) {
    redirect('/signup');
  }

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Your Dashboard</span>
            </div>
            
              <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              My Registrations
            </h1>
            
            <p className="text-lg text-muted-foreground">
              Manage your event registrations and track your attendance
            </p>
          </div>

          {/* Registrations List with Suspense */}
          <Suspense fallback={<RegistrationsLoading />}>
            <RegistrationsList userId={user.id} />
          </Suspense>
        </div>
      </main>
    </>
  );
}