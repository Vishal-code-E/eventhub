import Hero from "@/components/hero";
import LogoMarquee from "@/components/LogoMarquee";
import AboutSection from "@/components/aboutsection";
import EventsCarousel from "@/components/EventsCarousel";
import { Footer } from "@/components/footer";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Make this page dynamic to fetch fresh data
export const dynamic = 'force-dynamic';

async function getEvents() {
  try {
    const events = await prisma.event.findMany({
      where: {
        date: {
          gte: new Date(), // Only get events with date >= current date
        },
      },
      include: {
        club: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        date: 'asc',
      },
      take: 10, // Limit to 10 upcoming events for carousel
    });
    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

export default async function HomePage() {
  const events = await getEvents();
  
  console.log('🎉 Events fetched for homepage:', events.length);

  return (
    <main className="bg-black">
      {/* Hero section */}
      <div className="w-full h-screen flex items-center justify-center text-white bg-black">
        <Hero />
      </div>
      {/* Logo marquee section */}
      <LogoMarquee />
      
      {/* Events carousel section */}
      <EventsCarousel events={events} />
      
      <AboutSection />

      {/* Footer section */}
      <Footer />
    </main>
  );
}
