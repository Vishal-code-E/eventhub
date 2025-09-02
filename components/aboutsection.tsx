"use client";

import Link from "next/link";

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

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "E-CELL REC", href: "/clubs/e-cell" },
            { name: "GDG REC", href: "/clubs/gdg" },
            { name: "CSI REC", href: "/clubs/csi" },
            { name: "GFG REC", href: "/clubs/gfg" },
            { name: "Chayachitram REC", href: "/clubs/chayachitram" },
            { name: "Femspire", href: "/clubs/femspire" },
            { name: "Sports Club", href: "/clubs/sports" },
            { name: "Chitralaya REC", href: "/clubs/chitralaya" },
            { name: "Creative Hub REC", href: "/clubs/creative-hub" },
            { name: "Saptaswara REC", href: "/clubs/saptaswara" },
          ].map((club, idx) => (
            <Link
              key={idx}
              href={club.href}
              className="block p-6 bg-zinc-900 rounded-lg shadow hover:scale-105 hover:bg-zinc-800 transition"
            >
              <h3 className="text-lg font-semibold">{club.name}</h3>
              <p className="text-gray-400 text-sm mt-2">
                Learn more about events, initiatives, and activities from {club.name}.
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
