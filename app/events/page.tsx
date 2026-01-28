import { PrismaClient } from '@prisma/client';
import EventCard from '@/components/eventcard';
import { Sparkles } from 'lucide-react';
import { EventsEmptyState } from '@/components/EventsEmptyState';
import { EventCardSkeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';

const prisma = new PrismaClient();

// Make this page dynamic to avoid build-time database calls
export const dynamic = 'force-dynamic';

async function EventsList() {
  // Fetch all events with club information
  const events = await prisma.event.findMany({
    include: {
      club: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      date: 'asc',
    },
  });

  if (events.length === 0) {
    return (
      <EventsEmptyState
        title="No Events Yet"
        description="Exciting events are coming soon! Check back later to discover amazing experiences on campus."
        action={{
          label: "Go to Dashboard",
          href: "/student/dashboard"
        }}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {events.map((event) => (
        <EventCard
          key={event.id}
          id={event.id}
          title={event.title}
          date={event.date}
          location={event.location || 'TBA'}
          posterUrl={event.posterUrl}
          clubName={event.club.name}
        />
      ))}
    </div>
  );
}

function EventsLoading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <EventCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default async function EventsPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Discover Events</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-linear-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
            Upcoming Events
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover and register for exciting events happening on campus
          </p>
        </div>

        {/* Events Grid with Suspense */}
        <Suspense fallback={<EventsLoading />}>
          <EventsList />
        </Suspense>
      </div>
    </div>
  );
}
