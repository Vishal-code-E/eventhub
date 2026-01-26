import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { Calendar, MapPin, Plus } from 'lucide-react';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export default async function ClubLeadEventsPage() {
  const session = await getServerSession();

  if (!session || !session.user?.email) {
    redirect('/login');
  }

  // Fetch club lead user with their club
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      club: true,
    },
  });

  if (!user || user.role !== 'COORDINATOR' || !user.clubId) {
    redirect('/403');
  }

  // Fetch events for the club lead's club
  const events = await prisma.event.findMany({
    where: {
      clubId: user.clubId,
    },
    include: {
      club: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      date: 'desc',
    },
  });

  const hasEvents = events.length > 0;

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">My Events</h1>
              <p className="text-muted-foreground">
                Manage events for {user.club?.name}
              </p>
            </div>
            
            {/* Create Event CTA */}
            <Link
              href="/club-lead/events/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              <Plus className="w-5 h-5" />
              Create Event
            </Link>
          </div>

          {/* Events Grid */}
          {hasEvents ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => {
                const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                });

                return (
                  <div
                    key={event.id}
                    className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    {/* Poster */}
                    <div className="relative aspect-3/4 overflow-hidden bg-muted">
                      {event.posterUrl ? (
                        <img
                          src={event.posterUrl}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-primary/20 to-purple-500/20">
                          <Calendar className="w-16 h-16 text-muted-foreground/50" />
                        </div>
                      )}
                    </div>

                    {/* Event Info */}
                    <div className="p-4 space-y-3">
                      <h3 className="font-bold text-lg line-clamp-2">
                        {event.title}
                      </h3>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{formattedDate}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>

                      <div className="pt-3 border-t border-border">
                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
                          Published
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // Empty State
            <div className="flex flex-col items-center justify-center py-20 px-4">
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
                <Calendar className="w-12 h-12 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-2">No events yet</h2>
              <p className="text-muted-foreground text-center mb-6 max-w-md">
                You haven&apos;t created any events yet. Start by creating your first event!
              </p>
              <Link
                href="/club-lead/events/new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                <Plus className="w-5 h-5" />
                Create Your First Event
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
