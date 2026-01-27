'use client';

import { Calendar, MapPin, X, CheckCircle, XCircle, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useReducedMotion } from '@/lib/motion';

interface RegistrationCardProps {
  eventId: string;
  eventTitle: string;
  eventDate: Date;
  eventLocation: string;
  posterUrl: string | null;
  clubName: string;
  status: 'REGISTERED' | 'CANCELLED' | 'ATTENDED';
}

const statusConfig = {
  REGISTERED: {
    label: 'Registered',
    icon: CheckCircle,
    className: 'bg-green-500/10 text-green-500 border border-green-500/30',
  },
  CANCELLED: {
    label: 'Cancelled',
    icon: XCircle,
    className: 'bg-muted text-muted-foreground border border-border',
  },
  ATTENDED: {
    label: 'Attended',
    icon: Star,
    className: 'bg-blue-500/10 text-blue-500 border border-blue-500/30',
  },
};

export default function RegistrationCard({
  eventId,
  eventTitle,
  eventDate,
  eventLocation,
  posterUrl,
  clubName,
  status: initialStatus,
}: RegistrationCardProps) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const [isCancelling, setIsCancelling] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const formattedDate = new Date(eventDate).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleCancel = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isCancelling || status !== 'REGISTERED') return;

    const confirmed = confirm('Are you sure you want to cancel this registration?');
    if (!confirmed) return;

    setIsCancelling(true);

    try {
      const response = await fetch(`/api/events/${eventId}/register`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setStatus('CANCELLED');
        router.refresh();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to cancel registration');
      }
    } catch (error) {
      console.error('Cancel error:', error);
      alert('Failed to cancel registration. Please try again.');
    } finally {
      setIsCancelling(false);
    }
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <motion.div
      initial={!prefersReducedMotion ? { opacity: 0, y: 10 } : {}}
      animate={{ opacity: 1, y: 0 }}
      whileHover={!prefersReducedMotion ? { y: -4 } : undefined}
      transition={{ duration: 0.3 }}
      onClick={() => router.push(`/events/${eventId}`)}
      className="group cursor-pointer bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Poster Thumbnail */}
        <div className="relative w-full sm:w-56 h-56 sm:h-auto overflow-hidden bg-gradient-to-br from-muted/80 to-muted/40 shrink-0">
          {posterUrl ? (
            <>
              <motion.img
                src={posterUrl}
                alt={eventTitle}
                className="w-full h-full object-cover"
                whileHover={!prefersReducedMotion ? { scale: 1.05 } : undefined}
                transition={{ duration: 0.5 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 via-purple-500/10 to-primary/5">
              <Calendar className="w-16 h-16 text-muted-foreground/30" />
            </div>
          )}
          
          {/* Status badge on poster */}
          <div className="absolute top-3 right-3">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md ${config.className}`}>
              <StatusIcon className="w-3.5 h-3.5" />
              <span>{config.label}</span>
            </div>
          </div>
        </div>

        {/* Event Info */}
        <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
          <div className="space-y-3">
            {/* Title */}
            <h3 className="font-bold text-xl sm:text-2xl line-clamp-2 group-hover:text-primary transition-colors duration-300">
              {eventTitle}
            </h3>

            {/* Club Name */}
            <div className="inline-flex items-center gap-1.5 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="font-semibold text-primary">{clubName}</span>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-primary" />
              </div>
              <span className="font-medium">{formattedDate}</span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <span className="line-clamp-1 font-medium">{eventLocation}</span>
            </div>
          </div>

          {/* Actions */}
          {status === 'REGISTERED' && (
            <div className="mt-5 pt-5 border-t border-border/50">
              <motion.button
                onClick={handleCancel}
                disabled={isCancelling}
                whileHover={!prefersReducedMotion ? { scale: 1.02 } : undefined}
                whileTap={!prefersReducedMotion ? { scale: 0.98 } : undefined}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-red-500 hover:text-red-600 bg-red-500/5 hover:bg-red-500/10 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-red-500/20"
              >
                <X className="w-4 h-4" />
                {isCancelling ? 'Cancelling...' : 'Cancel Registration'}
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function RegistrationCard({
  eventId,
  eventTitle,
  eventDate,
  eventLocation,
  posterUrl,
  clubName,
  status: initialStatus,
}: RegistrationCardProps) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const [isCancelling, setIsCancelling] = useState(false);

  const formattedDate = new Date(eventDate).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleCancel = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isCancelling || status !== 'REGISTERED') return;

    const confirmed = confirm('Are you sure you want to cancel this registration?');
    if (!confirmed) return;

    setIsCancelling(true);

    try {
      const response = await fetch(`/api/events/${eventId}/register`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setStatus('CANCELLED');
        router.refresh();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to cancel registration');
      }
    } catch (error) {
      console.error('Cancel error:', error);
      alert('Failed to cancel registration. Please try again.');
    } finally {
      setIsCancelling(false);
    }
  };

  const config = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={() => router.push(`/events/${eventId}`)}
      className="group cursor-pointer bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Poster Thumbnail */}
        <div className="relative w-full sm:w-48 h-48 sm:h-auto overflow-hidden bg-muted shrink-0">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={eventTitle}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-primary/20 to-purple-500/20">
              <Calendar className="w-12 h-12 text-muted-foreground/50" />
            </div>
          )}
        </div>

        {/* Event Info */}
        <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between">
          <div className="space-y-3">
            {/* Title and Status */}
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-bold text-lg sm:text-xl line-clamp-2 group-hover:text-primary transition-colors">
                {eventTitle}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${config.className}`}
              >
                {config.label}
              </span>
            </div>

            {/* Club Name */}
            <p className="text-sm font-medium text-primary">{clubName}</p>

            {/* Date */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span className="line-clamp-1">{eventLocation}</span>
            </div>
          </div>

          {/* Actions */}
          {status === 'REGISTERED' && (
            <div className="mt-4 pt-4 border-t border-border">
              <button
                onClick={handleCancel}
                disabled={isCancelling}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <X className="w-4 h-4" />
                {isCancelling ? 'Cancelling...' : 'Cancel Registration'}
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
