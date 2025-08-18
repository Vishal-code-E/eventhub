import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
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

  // Add a sample event
  await prisma.event.create({
    data: {
      title: "Startup Club",
      description: "Weekly ideation + pitching sessions",
      date: new Date("2025-08-23T10:00:00.000Z"),
      location: "Electro Lounge, REC",
      clubId: ecell.id,
      posterUrl: "/posters/startup-sat.png"
    },
  });
}

main()
  .then(() => console.log("Seed complete!"))
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
// This script seeds the database with initial data for clubs and events. 