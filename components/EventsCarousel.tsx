'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import './events-carousel.css';

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  posterUrl?: string;
  club: {
    name: string;
  };
}

interface EventsCarouselProps {
  events: Event[];
  className?: string;
}

const EventCard = ({ event, isActive }: { event: Event; isActive: boolean }) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <motion.div
      className={cn(
        "relative group cursor-pointer transition-all duration-500 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50",
        isActive ? "scale-105 shadow-2xl shadow-purple-500/20" : "scale-95 opacity-75"
      )}
      whileHover={{ scale: isActive ? 1.08 : 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Background Image */}
      <div className="relative h-[350px] md:h-[400px] overflow-hidden">
        {event.posterUrl ? (
          <img
            src={event.posterUrl}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600 flex items-center justify-center">
            <Calendar className="w-12 h-12 md:w-16 md:h-16 text-white/60" />
          </div>
        )}
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        {/* Club Badge */}
        <div className="absolute top-3 right-3 md:top-4 md:right-4 px-2 py-1 md:px-3 md:py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs text-white font-medium">
          {event.club.name}
        </div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
        <motion.h3 
          className="text-lg md:text-xl font-bold mb-2 line-clamp-2 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {event.title}
        </motion.h3>
        
        <motion.p 
          className="text-sm text-gray-300 mb-3 md:mb-4 line-clamp-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {event.description}
        </motion.p>

        {/* Event Details */}
        <div className="flex flex-col gap-2 text-xs md:text-sm">
          <motion.div 
            className="flex items-center gap-2 text-gray-300"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Calendar className="w-3 h-3 md:w-4 md:h-4" />
            <span>{formatDate(event.date)} at {formatTime(event.date)}</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-2 text-gray-300"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <MapPin className="w-3 h-3 md:w-4 md:h-4" />
            <span className="line-clamp-1">{event.location}</span>
          </motion.div>
        </div>

        {/* Action Button */}
        <motion.div
          className="mt-3 md:mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            href={`/events/id/${event.id}`}
            className="inline-flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-xs md:text-sm font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
          >
            <Users className="w-3 h-3 md:w-4 md:h-4" />
            View Event
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function EventsCarousel({ events, className }: EventsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [itemsToShow, setItemsToShow] = useState(3);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Responsive items to show
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(1); // Mobile: 1 item
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2); // Tablet: 2 items
      } else {
        setItemsToShow(3); // Desktop: 3 items
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, events.length - itemsToShow);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isSignificantSwipe = Math.abs(distance) > 50;

    if (isSignificantSwipe) {
      if (distance > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  if (!events || events.length === 0) {
    return (
      <section className={cn("py-20 px-4 bg-black", className)}>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Upcoming Events</h2>
          <p className="text-gray-400">No events available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("py-20 px-4 bg-black relative overflow-hidden", className)}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />
      <div className="absolute top-20 left-10 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 text-purple-300 text-sm font-medium mb-4 md:mb-6">
            <Calendar className="w-4 h-4" />
            <span>Discover Events</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Trending Events
          </h2>
          
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto px-4">
            Swipe through the most exciting events happening on campus. Don't miss out on amazing experiences!
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative events-carousel-container">
          {/* Navigation Buttons - Hidden on mobile */}
          {events.length > itemsToShow && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/80 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-black/90 hover:border-purple-500/50 transition-all duration-300 shadow-xl hover:shadow-purple-500/25 hidden md:block"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/80 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-black/90 hover:border-purple-500/50 transition-all duration-300 shadow-xl hover:shadow-purple-500/25 hidden md:block"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Carousel */}
          <div 
            ref={carouselRef}
            className="overflow-hidden rounded-3xl"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <motion.div
              className="flex gap-4 md:gap-6 carousel-wrapper"
              animate={{ 
                x: `calc(-${currentIndex * (100 / itemsToShow)}% - ${currentIndex * (itemsToShow === 1 ? 1 : itemsToShow === 2 ? 1 : 1.5)}rem)` 
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30 
              }}
            >
              {events.map((event, index) => (
                <div
                  key={event.id}
                  className={cn(
                    "flex-shrink-0 carousel-item",
                    itemsToShow === 1 ? "w-full" :
                    itemsToShow === 2 ? "w-[calc(50%-0.75rem)]" :
                    "w-[calc(33.333%-1rem)]"
                  )}
                >
                  <EventCard 
                    event={event} 
                    isActive={index >= currentIndex && index < currentIndex + itemsToShow}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Indicators */}
          {events.length > itemsToShow && (
            <div className="flex justify-center gap-3 mt-8">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    index === currentIndex
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 w-8"
                      : "bg-gray-600 hover:bg-gray-500"
                  )}
                />
              ))}
            </div>
          )}
        </div>

        {/* View All Link */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-full transition-all duration-300 shadow-xl hover:shadow-purple-500/25"
          >
            View All Events
            <ChevronRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}