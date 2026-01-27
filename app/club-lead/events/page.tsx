import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { Plus, Sparkles } from 'lucide-react';
import { EventsList } from './EventsList';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export default async function ClubLeadEventsPage() {
  const session = await getServerSession();

  if (!session || !session.user?.email) {
    redirect('/login');
  }

  // Fetch club lead user with their club
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      club: true,
    },
  });

  if (!user || user.role !== 'COORDINATOR' || !user.clubId) {
    redirect('/403');
  }

  // Fetch events for the club lead's club
  const events = await prisma.event.findMany({
    where: {
      clubId: user.clubId,
    },
    include: {
      club: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      date: 'desc',
    },
  });

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                <span>Club Leader Dashboard</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                My Events
              </h1>
              
              <p className="text-lg text-muted-foreground">
                Manage events for {user.club?.name}
              </p>
            </div>
            
            {/* Create Event CTA */}
            <Link
              href="/club-lead/events/new"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              Create Event
            </Link>
          </div>

          {/* Events Grid */}
          <EventsList events={events} />
        </div>
      </main>
    </>
  );
}
