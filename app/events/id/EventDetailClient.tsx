'use client';

import { useRouter } from 'next/navigation';
import { Calendar, MapPin, Users, CheckCircle, Loader2, Clock, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import { useReducedMotion, useIsMobile } from '@/lib/motion';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const posterY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const posterOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

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

  const shouldAnimate = !prefersReducedMotion && !isMobile;

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10">
      {/* Hero Section with Parallax */}
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        {/* Poster with parallax effect */}
        <motion.div
          className="absolute inset-0"
          style={shouldAnimate ? { y: posterY, opacity: posterOpacity } : {}}
        >
          {event.posterUrl ? (
            <img
              src={event.posterUrl}
              alt={event.title}
              className="w-full h-full object-cover scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/30 via-purple-500/30 to-primary/20 flex items-center justify-center">
              <Calendar className="w-32 h-32 text-muted-foreground/30" />
            </div>
          )}
        </motion.div>
        
        {/* Multi-layer gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40" />

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 pb-12">
          <div className="max-w-6xl mx-auto px-4">
            {/* Event badge */}
            <motion.div
              initial={shouldAnimate ? { opacity: 0, y: 20 } : {}}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span>Featured Event</span>
            </motion.div>

            <motion.h1
              initial={shouldAnimate ? { opacity: 0, y: 20 } : {}}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-2xl"
            >
              {event.title}
            </motion.h1>
            
            <motion.div
              initial={shouldAnimate ? { opacity: 0, y: 20 } : {}}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-3 bg-card/60 backdrop-blur-md border border-border/50 rounded-full px-6 py-3 w-fit"
            >
              <Users className="w-5 h-5 text-primary" />
              <span className="text-base font-semibold text-foreground">{event.clubName}</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            initial={shouldAnimate ? { opacity: 0, y: 20 } : {}}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Date & Time Card */}
              <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border border-border/50 rounded-2xl hover:border-primary/30 transition-colors duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-muted-foreground mb-1">Date & Time</p>
                  <p className="font-bold">{formattedDate}</p>
                  <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <p className="text-sm">{formattedTime}</p>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border border-border/50 rounded-2xl hover:border-primary/30 transition-colors duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-muted-foreground mb-1">Venue</p>
                  <p className="font-bold">{event.location}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            {event.description && (
              <div className="space-y-4 p-6 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border border-border/50 rounded-2xl">
                <h3 className="text-2xl font-bold">About This Event</h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {event.description}
                </p>
              </div>
            )}
          </motion.div>

          {/* Sidebar - Registration */}
          <motion.div
            initial={shouldAnimate ? { opacity: 0, x: 20 } : {}}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 space-y-6">
              {/* Registration Card */}
              <div className="bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 space-y-6 shadow-xl shadow-black/5">
                <h3 className="text-xl font-bold">Registration</h3>
                
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-500/30 text-red-500 px-4 py-3 rounded-xl text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                {isRegistered ? (
                  <motion.button
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    disabled
                    className="w-full py-4 px-4 bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 text-green-500 rounded-xl font-semibold flex items-center justify-center gap-2 cursor-not-allowed"
                  >
                    <CheckCircle className="w-5 h-5" />
                    You're Registered!
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={handleRegister}
                    disabled={isLoading}
                    whileHover={shouldAnimate ? { scale: 1.02 } : undefined}
                    whileTap={shouldAnimate ? { scale: 0.98 } : undefined}
                    className="w-full py-4 px-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                  </motion.button>
                )}

                <p className="text-sm text-muted-foreground text-center leading-relaxed">
                  {isRegistered
                    ? "You're all set! We'll send you a reminder before the event."
                    : !isAuthenticated
                    ? 'Sign in to reserve your spot for this event'
                    : "Reserve your spot now. It's free!"}
                </p>
              </div>

              {/* Club Info Card */}
              <div className="bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 space-y-4 shadow-xl shadow-black/5">
                <h4 className="font-semibold text-sm text-muted-foreground">Organized By</h4>
                <div className="flex items-center gap-4">
                  {event.clubLogoUrl ? (
                    <img
                      src={event.clubLogoUrl}
                      alt={event.clubName}
                      className="w-14 h-14 rounded-full object-cover border-2 border-primary/20"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center border-2 border-primary/20">
                      <Users className="w-7 h-7 text-primary" />
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-lg">{event.clubName}</p>
                    <p className="text-sm text-muted-foreground">Student Club</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
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
