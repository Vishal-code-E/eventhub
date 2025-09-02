"use client";

export default function AboutSection() {
  return (
    <section className="bg-black text-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold mb-6">
          Your Campus, Your Events. All in One Place.
        </h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-16">
          Raghu Engineering College is home to a vibrant culture of innovation,
          learning, and celebration. From hackathons that fuel ideas, to cultural
          fests that light up the stage, and workshops that sharpen skills —
          <span className="font-semibold text-white"> Event Hub </span> brings
          it all under one roof. Whether you’re a student eager to explore, an
          organizer planning the next big thing, or someone who loves community
          vibes — this is where it all comes together.
        </p>

        {/* Image placeholder grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          <div className="h-48 bg-zinc-800 rounded-lg flex items-center justify-center text-gray-500">
            Image Placeholder 1
          </div>
          <div className="h-48 bg-zinc-800 rounded-lg flex items-center justify-center text-gray-500">
            Image Placeholder 2
          </div>
          <div className="h-48 bg-zinc-800 rounded-lg flex items-center justify-center text-gray-500">
            Image Placeholder 3
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-zinc-900 rounded-lg shadow hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2">🎯 For Students</h3>
            <p className="text-gray-400">
              Discover events that match your interests, register instantly, and
              never miss out on opportunities to grow, learn, and enjoy.
            </p>
          </div>
          <div className="p-6 bg-zinc-900 rounded-lg shadow hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2">⚡ For Organizers</h3>
            <p className="text-gray-400">
              Simplify event hosting with dashboards for RSVPs, promotions, and
              engagement tools — making every event smooth and successful.
            </p>
          </div>
          <div className="p-6 bg-zinc-900 rounded-lg shadow hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2">🌍 For Community</h3>
            <p className="text-gray-400">
              Strengthen the culture of innovation and collaboration at REC by
              bringing students, faculty, and innovators together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
