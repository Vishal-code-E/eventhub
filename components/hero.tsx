"use client";

import { SparklesCore } from "@/components/ui/sparkles";

export default function Hero() {
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen overflow-hidden bg-black">
      
      <section className="relative z-10 text-white text-center px-6 py-16">
        <h1 className="font-aalto text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-wider text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">
          EVENT HUB REC
        </h1>
        
        {/* Glowing divider line */}
        <div className="w-full max-w-4xl mx-auto mb-8">
          <div className="h-px bg-linear-to-r from-transparent via-white to-transparent opacity-50 shadow-[0_0_20px_rgba(255,255,255,0.5)]"></div>
        </div>
        
        {/* Sparkles effect below divider */}
        <div className="w-full max-w-4xl mx-auto h-40 relative">
          <SparklesCore
            id="hero-sparkles"
            background="transparent"
            minSize={0.4}
            maxSize={1.4}
            particleDensity={300}
            className="w-full h-full"
            particleColor="#FFFFFF"
            speed={0.5}
          />
        </div>
      </section>
    </div>
  );
}
