"use client";

const clubs = [
    { name: "E-CELL REC" },
    { name: "GDG REC" },
    { name: "CSI REC" },
    { name: "GFG REC" },
    { name: "Chayachitram REC" },
    { name: "Femspire" },
    { name: "Sports Club" },
    { name: "Chitralaya REC" },
    { name: "Creative HUB REC" },
    { name: "Saptaswara" },
    // More clubs
    { name: "Robotics Club" },
    { name: "Literary Club" },
    { name: "Photography Club" },
];

export default function LogoMarquee() {
    return (
        <div className="bg-black py-10 overflow-hidden relative">
            <div className="flex animate-marquee whitespace-nowrap">
                {clubs.map((club, i) => (
                    <div
                        key={i}
                        className="mx-10 inline-block text-white text-2xl font-bold grayscale hover:grayscale-0 transition"
                    >
                        {club.name}
                    </div>
                ))}
                {/* duplicate for infinite scroll effect */}
                {clubs.map((club, i) => (
                    <div
                        key={`dup-${i}`}
                        className="mx-10 inline-block text-white text-2xl font-bold grayscale hover:grayscale-0 transition"
                    >
                        {club.name}
                    </div>
                ))}
            </div>
        </div>
    );
}
