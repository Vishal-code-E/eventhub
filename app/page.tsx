import Hero from "@/components/hero";
import LogoMarquee from "@/components/LogoMarquee";
import AboutSection from "@/components/aboutsection";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <main className="bg-black">
      {/* Hero section */}
      <div className="w-full h-screen flex items-center justify-center text-white bg-black">
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
