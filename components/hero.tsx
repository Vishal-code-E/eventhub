"use client";
import Link from "next/link";
import Antigravity from "./Antigravity";

export default function Hero() {
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 z-0 w-full h-full">
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
      </div>
      <section className="relative z-10 text-white text-center px-6 py-16 pointer-events-none">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
          Welcome to <span className="text-gray-300">EventHub</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-400 max-w-2xl mx-auto">
          Discover, register, and celebrate every event in our college.
        </p>
        <div className="flex gap-4 justify-center pointer-events-auto">
          <Link
            href="/events"
            className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition"
          >
            Explore Events
          </Link>
          <Link
            href="/organize"
            className="px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition"
          >
            Host an Event
          </Link>
        </div>
      </section>
    </div>
  );
}
