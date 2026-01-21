"use client";
import Link from "next/link";
import Antigravity from "./Antigravity";

export default function Hero() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 z-0 w-full h-full">
        <Antigravity
          count={400}
          magnetRadius={12}
          ringRadius={12}
          waveSpeed={0.5}
          waveAmplitude={1.2}
          particleSize={2}
          color="#FF9FFC"
          autoAnimate={true}
          particleShape="capsule"
        />
      </div>
      <section className="relative z-10 text-white text-center px-6 py-16">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
          Welcome to <span className="text-gray-300">EventHub</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-400 max-w-2xl mx-auto">
          Discover, register, and celebrate every event in our college.
        </p>
        <div className="flex gap-4 justify-center">
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
