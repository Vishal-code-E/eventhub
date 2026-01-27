'use client';

import Link from 'next/link';
import { Calendar, MapPin } from 'lucide-react';
import { EventsEmptyState } from '@/components/EventsEmptyState';

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  posterUrl: string | null;
  club: {
    name: string;
  };
}

interface EventsListProps {
  events: Event[];
}

export function EventsList({ events }: EventsListProps) {
  if (events.length === 0) {
    return (
      <EventsEmptyState
        title="No Events Yet"
        description="You haven't created any events yet. Start by creating your first event and share it with your community!"
        action={{
          label: "Create Your First Event",
          href: "/club-lead/events/new"
        }}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {events.map((event) => {
        const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });

        return (
          <Link
            key={event.id}
            href={`/events/${event.id}`}
            className="group bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 cursor-pointer"
          >
            {/* Poster */}
            <div className="relative aspect-3/4 overflow-hidden bg-gradient-to-br from-muted/80 to-muted/40">
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
          </Link>
        );
      })}
    </div>
  );
}
