'use client';

import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useReducedMotion, useIsMobile } from '@/lib/motion';

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
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const shouldAnimate = !prefersReducedMotion && !isMobile;

  return (
    <motion.div
      whileHover={shouldAnimate ? { y: -8 } : undefined}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => router.push(`/events/${id}`)}
      className="group cursor-pointer bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
    >
      {/* Poster Image - Poster-First Design */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-muted/80 to-muted/40">
        {posterUrl ? (
          <>
            <motion.img
              src={posterUrl}
              alt={title}
              className="w-full h-full object-cover"
              whileHover={shouldAnimate ? { scale: 1.05 } : undefined}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
            
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 via-purple-500/10 to-primary/5">
            <Calendar className="w-20 h-20 text-muted-foreground/30" />
          </div>
        )}
        
        {/* Hover overlay with CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={shouldAnimate ? { opacity: 1 } : undefined}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-500"
        >
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            whileHover={shouldAnimate ? { y: 0, opacity: 1 } : undefined}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="text-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75"
          >
            <p className="text-white font-semibold text-lg mb-2">View Event</p>
            <div className="flex items-center justify-center gap-1 text-primary text-sm font-medium">
              <span>Learn More</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </motion.div>
        </motion.div>

        {/* Minimal info overlay on poster */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <div className="flex items-center gap-2 text-white/90 text-xs">
            <Calendar className="w-3.5 h-3.5" />
            <span className="font-medium">{formattedDate}</span>
          </div>
        </div>
      </div>

      {/* Compact Info Section */}
      <div className="p-4 space-y-2.5 bg-card/80 backdrop-blur-sm">
        {/* Title */}
        <h3 className="font-bold text-base leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="line-clamp-1">{location}</span>
        </div>

        {/* Club Name */}
        <div className="flex items-center gap-1.5 text-xs pt-1 border-t border-border/50">
          <Users className="w-3.5 h-3.5 text-primary/80" />
          <span className="font-medium text-primary/90">{clubName}</span>
        </div>
      </div>
    </motion.div>
  );
}
