'use client';

import { useRouter } from 'next/navigation';
import { Calendar, MapPin, Users, CheckCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface EventDetailClientProps {
  event: {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    posterUrl: string | null;
    clubName: string;
    clubLogoUrl: string | null;
  };
  isAuthenticated: boolean;
  isRegistered: boolean;
}

export default function EventDetailClient({ event, isAuthenticated, isRegistered: initialIsRegistered }: EventDetailClientProps) {
  const router = useRouter();
  const [isRegistered, setIsRegistered] = useState(initialIsRegistered);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const formattedTime = new Date(event.date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleRegister = async () => {
    if (!isAuthenticated) {
      router.push('/signup');
      return;
    }

    if (isRegistered) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/events/${event.id}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to register for event');
      }

      setIsRegistered(true);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        {event.posterUrl ? (
          <img
            src={event.posterUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-primary/30 to-purple-500/30 flex items-center justify-center">
            <Calendar className="w-32 h-32 text-muted-foreground/50" />
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-6xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-white mb-4"
            >
              {event.title}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2"
            >
              <Users className="w-5 h-5 text-primary" />
              <span className="text-lg text-white font-medium">{event.clubName}</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Details */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Event Details</h2>
              
              {/* Date & Time */}
              <div className="flex items-start gap-4 p-4 bg-card border border-border rounded-lg">
                <Calendar className="w-6 h-6 text-primary mt-1" />
                <div>
                  <p className="font-semibold text-white">Date & Time</p>
                  <p className="text-muted-foreground">{formattedDate}</p>
                  <p className="text-muted-foreground">{formattedTime}</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4 p-4 bg-card border border-border rounded-lg">
                <MapPin className="w-6 h-6 text-primary mt-1" />
                <div>
                  <p className="font-semibold text-white">Venue</p>
                  <p className="text-muted-foreground">{event.location}</p>
                </div>
              </div>

              {/* Description */}
              {event.description && (
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-white">About This Event</h3>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {event.description}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Registration */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <h3 className="text-xl font-bold text-white">Registration</h3>
                
                {error && (
                  <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {isRegistered ? (
                  <button
                    disabled
                    className="w-full py-3 px-4 bg-green-500/20 border border-green-500/50 text-green-500 rounded-lg font-semibold flex items-center justify-center gap-2 cursor-not-allowed"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Registered
                  </button>
                ) : (
                  <button
                    onClick={handleRegister}
                    disabled={isLoading}
                    className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : !isAuthenticated ? (
                      'Login to Register'
                    ) : (
                      'Register Now'
                    )}
                  </button>
                )}

                <p className="text-sm text-muted-foreground text-center">
                  {isRegistered
                    ? "You're all set! We'll send you a reminder before the event."
                    : !isAuthenticated
                    ? 'Sign in to reserve your spot for this event'
                    : "Reserve your spot now. It's free!"}
                </p>
              </div>

              {/* Club Info */}
              <div className="bg-card border border-border rounded-xl p-6 space-y-3">
                <h4 className="font-semibold text-white">Organized By</h4>
                <div className="flex items-center gap-3">
                  {event.clubLogoUrl ? (
                    <img
                      src={event.clubLogoUrl}
                      alt={event.clubName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-white">{event.clubName}</p>
                    <p className="text-sm text-muted-foreground">Student Club</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
