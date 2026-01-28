"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useReducedMotion, useIsMobile } from "@/lib/motion";

// Dynamically import heavy 3D component with no SSR
const Antigravity = dynamic(() => import("./Antigravity"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-black via-gray-900 to-black" />
  ),
});

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  
  // Disable heavy 3D effects on mobile or when user prefers reduced motion
  const shouldShowAntigravity = !prefersReducedMotion && !isMobile;

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 z-0 w-full h-full">
        {shouldShowAntigravity ? (
          <Antigravity
            magnetRadius={6}
            ringRadius={7}
            waveSpeed={0.4}
            waveAmplitude={1}
            particleSize={1.5}
            particleVariance={1}
            lerpSpeed={0.05}
            count={300}
            rotationSpeed={0}
            depthFactor={1}
            pulseSpeed={3}
            fieldStrength={10}
            color="#ffffff"
            particleShape="capsule"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-black via-gray-900 to-black" />
        )}
      </div>
      
      <section className="relative z-10 text-white text-center px-6 py-16 pointer-events-none">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
          Welcome to <span className="text-gray-300">EventHub</span>
        </h1>
        
        <p className="text-lg md:text-xl mb-8 text-gray-400 max-w-2xl mx-auto">
          Discover, register, and celebrate every event in our college.
        </p>
        
        <div className="flex gap-4 justify-center pointer-events-auto">
          <Link
            href="/events"
            className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Explore Events
          </Link>
          <Link
            href="/organize"
            className="px-6 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-black transition-all duration-300"
          >
            Host an Event
          </Link>
        </div>
      </section>
    </div>
  );
}
