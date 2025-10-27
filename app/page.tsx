import Hero from "@/components/hero";
import { Vortex } from "@/components/ui/vortex";
import LogoMarquee from "@/components/LogoMarquee";
import AboutSection from "@/components/aboutsection";
import ClientOnly from "@/components/ClientOnly";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <main>
      {/* Vortex background and Hero section */}
      <ClientOnly fallback={
        <div className="min-h-[calc(100vh-64px)] bg-black flex items-center justify-center text-white">
          <Hero />
        </div>
      }>
        <Vortex
          containerClassName="min-h-[calc(100vh-64px)] bg-black"  
          className="flex items-center justify-center text-white"
          backgroundColor="#000000"
          baseHue={0}             
          particleCount={600}
        >
          <Hero />
        </Vortex>
      </ClientOnly>
      {/* Logo marquee section */}
      <LogoMarquee />
      <AboutSection />

      {/* Footer section */}
      <Footer />
    </main>
  );
}
