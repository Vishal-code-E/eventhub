'use client';

import { Calendar, MapPin, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface EventCardProps {
  id: string;
  title: string;
  date: Date;
  location: string;
  posterUrl: string | null;
  clubName: string;
}

export default function EventCard({ id, title, date, location, posterUrl, clubName }: EventCardProps) {
  const router = useRouter();

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.2 }}
      onClick={() => router.push(`/events/${id}`)}
      className="group cursor-pointer bg-card border border-border rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
    >
      {/* Poster Image */}
      <div className="relative aspect-3/4 overflow-hidden bg-muted">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-primary/20 to-purple-500/20">
            <Calendar className="w-16 h-16 text-muted-foreground/50" />
          </div>
        )}
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white font-semibold text-lg">View Details</span>
        </div>
      </div>

      {/* Event Info */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{formattedDate}</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span className="line-clamp-1">{location}</span>
        </div>

        {/* Club Name */}
        <div className="flex items-center gap-2 text-sm">
          <Users className="w-4 h-4 text-primary" />
          <span className="font-medium text-primary">{clubName}</span>
        </div>

        {/* CTA */}
        <button className="w-full mt-4 py-2 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
          Register Now
        </button>
      </div>
    </motion.div>
  );
}
