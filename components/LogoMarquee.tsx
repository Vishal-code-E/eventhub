"use client";

const logos = [
    { name: "E-Cell" },
    { name: "GDG" },
    { name: "IEEE" },
    { name: "Music Club" },
    { name: "Dance Club" },
];

export default function LogoMarquee() {
    return (
        <div className="bg-black py-10 overflow-hidden relative">
            <div className="flex animate-marquee whitespace-nowrap">
                {logos.map((logo, i) => (
                    <div
                        key={i}
                        className="mx-10 inline-block text-white text-2xl font-bold grayscale hover:grayscale-0 transition"
                    >
                        {logo.name}
                    </div>
                ))}
                {/* duplicate for infinite scroll effect */}
                {logos.map((logo, i) => (
                    <div
                        key={`dup-${i}`}
                        className="mx-10 inline-block text-white text-2xl font-bold grayscale hover:grayscale-0 transition"
                    >
                        {logo.name}
                    </div>
                ))}
            </div>
        </div>
    );
}
