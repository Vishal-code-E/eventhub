"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white h-[90vh] flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl px-6">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Welcome to <span className="text-blue-500">E-Cell REC</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-300">
          Igniting ideas, building leaders, and shaping the startup ecosystem.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/events"
            className="px-6 py-3 bg-blue-600 rounded-md text-lg font-semibold hover:bg-blue-700 transition"
          >
            Explore Events
          </Link>
          <Link
            href="/clubs"
            className="px-6 py-3 bg-gray-700 rounded-md text-lg font-semibold hover:bg-gray-600 transition"
          >
            Discover Clubs
          </Link>
        </div>
      </div>
    </section>
  );
}
