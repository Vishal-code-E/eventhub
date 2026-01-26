import { PrismaClient } from '@prisma/client';
import EventCard from '@/components/eventcard';
import { Calendar } from 'lucide-react';

const prisma = new PrismaClient();

// Make this page dynamic to avoid build-time database calls
export const dynamic = 'force-dynamic';

export default async function EventsPage() {
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

  return (
    <div className="min-h-screen bg-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Upcoming Events
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover and register for exciting events happening on campus
          </p>
        </div>

        {/* Events Grid */}
        {events.length > 0 ? (
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
        ) : (
          <div className="text-center py-20">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
            <h2 className="text-2xl font-semibold mb-2">No Events Yet</h2>
            <p className="text-muted-foreground">
              Check back soon for upcoming events!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
