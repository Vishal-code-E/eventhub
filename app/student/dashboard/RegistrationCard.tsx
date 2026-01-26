'use client';

import { Calendar, MapPin, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
    className: 'bg-green-500/10 text-green-500 border-green-500/20',
  },
  CANCELLED: {
    label: 'Cancelled',
    className: 'bg-muted text-muted-foreground border-border',
  },
  ATTENDED: {
    label: 'Attended',
    className: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
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
