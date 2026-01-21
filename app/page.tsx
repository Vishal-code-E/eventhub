import Hero from "@/components/hero";
import LogoMarquee from "@/components/LogoMarquee";
import AboutSection from "@/components/aboutsection";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <main>
      {/* Hero section */}
      <div className="w-full h-screen flex items-center justify-center text-white">
        <Hero />
      </div>
      {/* Logo marquee section */}
      <LogoMarquee />
      <AboutSection />

      {/* Footer section */}
      <Footer />
    </main>
  );
}
