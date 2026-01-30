"use client";

import { Marquee } from "@/components/ui/marquee";

const clubs = [
    "E-CELL REC",
    "GDG REC",
    "CSI REC",
    "GFG REC",
    "Chayachitram REC",
    "Femspire",
    "Sports Club",
    "Chitralaya REC",
    "Creative HUB REC",
    "Saptaswara",
    "Robotics Club",
    "Literary Club",
    "Photography Club",
];

export default function LogoMarquee() {
    return (
        <div className="py-20 flex min-h-[300px] flex-col items-center justify-center bg-black">
            <h2 className="mb-10 px-20 text-muted-foreground text-center text-sm font-medium uppercase tracking-wider">
                Our College Clubs & Communities
            </h2>
            <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-center overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] px-6">
                <Marquee className="[--gap:80px] [--duration:40s]" pauseOnHover>
                    {clubs.map((club, idx) => (
                        <div
                            key={idx}
                            className="flex items-center justify-center text-white text-2xl md:text-3xl font-bold grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110 cursor-pointer"
                        >
                            {club}
                        </div>
                    ))}
                </Marquee>
            </div>
        </div>
    );
}
