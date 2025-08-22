"use client";
import Link from "next/link";




export default function Hero() {
  return (
    <section className="relative h-[80vh] flex flex-col justify-center items-center text-center bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10">
        <h1 className="text-5xl font-bold mb-4">Welcome to EventHub</h1>
        <p className="text-lg mb-6">
          Discover, register, and celebrate every event in our college.
        </p>
        <a
          href="/events"
          className="px-6 py-3 bg-white text-purple-700 font-semibold rounded-lg shadow hover:bg-gray-200 transition"
        >
          Explore Events
        </a>
      </div>
    </section>
  );
}
