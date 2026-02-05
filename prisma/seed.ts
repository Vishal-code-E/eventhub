import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.eventRegistration.deleteMany();
  await prisma.registration.deleteMany();
  await prisma.gallery.deleteMany();
  await prisma.event.deleteMany();
  await prisma.club.deleteMany();

  // Add sample clubs
  const ecell = await prisma.club.create({
    data: {
      name: "E-Cell REC",
      description: "Entrepreneurship Cell of REC",
      logoUrl: "/logos/ecell.png",
      contact: "Sri Ram Vishal",
      socialLinks: {
        instagram: "https://instagram.com/ecellrec",
        linkedin: "https://linkedin.com/company/ecellrec"
      }
    },
  });

  const techClub = await prisma.club.create({
    data: {
      name: "Tech Club",
      description: "Technology and Innovation Club",
      logoUrl: "/logos/techclub.png",
      contact: "Tech Lead",
      socialLinks: {
        instagram: "https://instagram.com/techclub",
        linkedin: "https://linkedin.com/company/techclub"
      }
    },
  });

  const culturalClub = await prisma.club.create({
    data: {
      name: "Cultural Club",
      description: "Arts and Cultural Activities",
      logoUrl: "/logos/cultural.png",
      contact: "Cultural Head",
      socialLinks: {
        instagram: "https://instagram.com/culturalclub",
        linkedin: "https://linkedin.com/company/culturalclub"
      }
    },
  });

  const sportsClub = await prisma.club.create({
    data: {
      name: "Sports Club",
      description: "Sports and Fitness Activities",
      logoUrl: "/logos/sports.png",
      contact: "Sports Captain",
      socialLinks: {
        instagram: "https://instagram.com/sportsclub",
        linkedin: "https://linkedin.com/company/sportsclub"
      }
    },
  });

  // Add upcoming events with future dates
  const events = [
    {
      title: "Startup Pitch Competition 2026",
      description: "Annual startup pitch competition where students present their innovative business ideas to industry experts and investors.",
      date: new Date("2026-02-15T14:00:00.000Z"),
      location: "Main Auditorium, REC",
      clubId: ecell.id,
    },
    {
      title: "Tech Hackathon 2026",
      description: "48-hour hackathon focused on AI, ML, and emerging technologies. Build innovative solutions and win exciting prizes.",
      date: new Date("2026-02-20T09:00:00.000Z"),
      location: "Computer Lab, Block A",
      clubId: techClub.id,
    },
    {
      title: "Cultural Night Extravaganza",
      description: "Annual cultural fest featuring dance, music, drama, and art exhibitions. Showcase your talents and enjoy performances.",
      date: new Date("2026-02-25T18:00:00.000Z"),
      location: "Open Air Theatre",
      clubId: culturalClub.id,
    },
    {
      title: "Inter-College Sports Meet",
      description: "Multi-sport competition including cricket, football, basketball, badminton, and track events.",
      date: new Date("2026-03-01T08:00:00.000Z"),
      location: "Sports Complex",
      clubId: sportsClub.id,
    },
    {
      title: "Innovation Workshop",
      description: "Learn about design thinking, prototyping, and innovation methodologies from industry professionals.",
      date: new Date("2026-03-05T10:00:00.000Z"),
      location: "Innovation Lab, REC",
      clubId: ecell.id,
    },
    {
      title: "Web Development Bootcamp",
      description: "Intensive 3-day bootcamp covering React, Node.js, and modern web development practices.",
      date: new Date("2026-03-10T09:00:00.000Z"),
      location: "Tech Lab 1, Block B",
      clubId: techClub.id,
    },
    {
      title: "Art Exhibition & Workshop",
      description: "Student art exhibition followed by workshops on painting, sculpture, and digital art.",
      date: new Date("2026-03-15T15:00:00.000Z"),
      location: "Art Gallery, Main Building",
      clubId: culturalClub.id,
    },
    {
      title: "Marathon for Health",
      description: "5K and 10K marathon promoting health and fitness awareness among students and faculty.",
      date: new Date("2026-03-20T06:00:00.000Z"),
      location: "Campus Grounds",
      clubId: sportsClub.id,
    }
  ];

  // Create all events
  for (const eventData of events) {
    await prisma.event.create({
      data: eventData,
    });
  }

  console.log("✅ Seed completed successfully!");
  console.log(`✅ Created ${events.length} upcoming events`);
  console.log("✅ Created 4 clubs");
}

main()
  .then(() => console.log("Seed complete!"))
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
// This script seeds the database with initial data for clubs and events. 