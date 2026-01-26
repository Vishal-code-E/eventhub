import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import Navbar from '@/components/Navbar';
import RegistrationCard from './RegistrationCard';
import { Calendar } from 'lucide-react';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export default async function StudentDashboard() {
  const session = await getServerSession();

  if (!session || !session.user?.email) {
    redirect('/login');
  }

  // Fetch user and their registrations
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      eventRegistrations: {
        include: {
          event: {
            include: {
              club: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  if (!user) {
    redirect('/login');
  }

  const registrations = user.eventRegistrations;
  const hasRegistrations = registrations.length > 0;

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">My Registrations</h1>
            <p className="text-muted-foreground">
              Manage your event registrations and track your attendance
            </p>
          </div>

          {/* Registrations List */}
          {hasRegistrations ? (
            <div className="space-y-4">
              {registrations.map((registration) => (
                <RegistrationCard
                  key={registration.id}
                  eventId={registration.event.id}
                  eventTitle={registration.event.title}
                  eventDate={registration.event.date}
                  eventLocation={registration.event.location}
                  posterUrl={registration.event.posterUrl}
                  clubName={registration.event.club.name}
                  status={registration.status}
                />
              ))}
            </div>
          ) : (
            // Empty State
            <div className="flex flex-col items-center justify-center py-20 px-4">
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
                <Calendar className="w-12 h-12 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-2">No registrations yet</h2>
              <p className="text-muted-foreground text-center mb-6 max-w-md">
                You haven&apos;t registered for any events yet. Browse upcoming events and register to get started!
              </p>
              <a
                href="/events"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Browse Events
              </a>
            </div>
          )}
        </div>
      </main>
    </>
  );
}