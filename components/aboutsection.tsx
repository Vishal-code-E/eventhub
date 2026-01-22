"use client";

import React from "react";
import { CometCard } from "./ui/cometcard";


export default function AboutSection() {
  return (
    <section className="bg-black text-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* General About Event Hub */}
        <h2 className="text-4xl font-bold mb-4">
          Your Campus, Your Events. All in One Place.
        </h2>
        <p className="text-lg text-gray-300 mb-12">
          Event Hub is where college events come alive. From hackathons to
          cultural fests, workshops to meetups — we connect students, organizers,
          and innovators through a single platform built for community.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 bg-zinc-900 rounded-lg shadow hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2">🎯 For Students</h3>
            <p className="text-gray-400">
              Discover events that match your interests, register instantly, and
              never miss out.
            </p>
          </div>
          <div className="p-6 bg-zinc-900 rounded-lg shadow hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2">⚡ For Organizers</h3>
            <p className="text-gray-400">
              Simplify event hosting with easy dashboards, RSVPs, and engagement
              tools.
            </p>
          </div>
          <div className="p-6 bg-zinc-900 rounded-lg shadow hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2">🌍 For Community</h3>
            <p className="text-gray-400">
              Build culture, foster innovation, and bring people together.
            </p>
          </div>
        </div>

        {/* Clubs Section */}
        <h2 className="text-3xl font-bold mb-8">Explore Clubs at REC</h2>
        <p className="text-gray-300 mb-12">
          REC is more than classrooms — it’s where passion meets action.
          Explore the vibrant student clubs that make our campus culture thrive.
        </p>

      <div className="grid md:grid-cols-3 gap-8">
        <CometCard>
          <h3 className="text-xl font-semibold mb-2">E-CELL REC</h3>
          <p className="text-gray-400">
            Dive into programming, hackathons, and tech talks with fellow coders.
          </p>
        </CometCard>
        <CometCard>
          <h3 className="text-xl font-semibold mb-2">GDG</h3>
          <p className="text-gray-400">
            Celebrate diversity through music, dance, drama, and cultural fests.
          </p>
        </CometCard>
        <CometCard>
          <h3 className="text-xl font-semibold mb-2">CSI</h3>
          <p className="text-gray-400">
            Join teams, tournaments, and fitness events to stay active and competitive.
          </p>
        </CometCard>
      </div>
      </div>
    </section>
  );
}
