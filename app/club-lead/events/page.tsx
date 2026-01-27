import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { Calendar, MapPin, Plus, Sparkles } from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';

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
      
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                <span>Club Leader Dashboard</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                My Events
              </h1>
              
              <p className="text-lg text-muted-foreground">
                Manage events for {user.club?.name}
              </p>
            </div>
            
            {/* Create Event CTA */}
            <Link
              href="/club-lead/events/new"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
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
                    className="group bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 cursor-pointer"
                  >
                    {/* Poster */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-muted/80 to-muted/40">
                      {event.posterUrl ? (
                        <>
                          <img
                            src={event.posterUrl}
                            alt={event.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 via-purple-500/10 to-primary/5">
                          <Calendar className="w-20 h-20 text-muted-foreground/30" />
                        </div>
                      )}
                      
                      {/* Status badge */}
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex px-3 py-1.5 rounded-full text-xs font-semibold bg-green-500/20 text-green-500 border border-green-500/30 backdrop-blur-md">
                          Published
                        </span>
                      </div>
                    </div>

                    {/* Event Info */}
                    <div className="p-5 space-y-3">
                      <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors duration-300">
                        {event.title}
                      </h3>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Calendar className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium">{formattedDate}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-primary" />
                        </div>
                        <span className="line-clamp-1 font-medium">{event.location}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState
              icon={Calendar}
              title="No Events Yet"
              description="You haven't created any events yet. Start by creating your first event and share it with your community!"
              action={{
                label: "Create Your First Event",
                href: "/club-lead/events/new"
              }}
            />
          )}
        </div>
      </main>
    </>
  );
}
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
