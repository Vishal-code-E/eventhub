/**
 * NextAuth Configuration
 * Handles Google OAuth authentication for college students
 * Only allows email addresses from approved college domains
 */

import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Allowed college email domains
 * Add your college domain here (e.g., "youruniversity.edu")
 */
const ALLOWED_DOMAINS = [
  "students.iiit.ac.in",
  "research.iiit.ac.in", 
  "iiit.ac.in",
  // Add more allowed domains as needed
];

/**
 * Validates if email belongs to approved college domain
 */
function isCollegeEmail(email: string): boolean {
  return ALLOWED_DOMAINS.some(domain => email.toLowerCase().endsWith(`@${domain}`));
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "select_account", // Force account selection
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  
  callbacks: {
    /**
     * Sign-in callback - validates college email domain
     */
    async signIn({ user, account, profile }) {
      if (!user.email) {
        return false;
      }

      // Check if email is from allowed college domain
      if (!isCollegeEmail(user.email)) {
        // Redirect to error page with message
        return `/signup?error=invalid_domain&email=${encodeURIComponent(user.email)}`;
      }

      try {
        // Check if user exists in database
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email }
        });

        // If user doesn't exist, create basic user record
        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user.email,
              name: user.name || "",
              image: user.image || "",
              isProfileComplete: false,
            }
          });
        }

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },

    /**
     * Session callback - adds user data to session
     */
    async session({ session, token }) {
      if (session.user && token.email) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { email: token.email as string }
          });

          if (dbUser) {
            session.user.id = dbUser.id;
            session.user.email = dbUser.email;
            session.user.isProfileComplete = dbUser.isProfileComplete;
            session.user.role = dbUser.role;
          }
        } catch (error) {
          console.error("Error in session callback:", error);
        }
      }
      return session;
    },

    /**
     * JWT callback - adds user info to token
     */
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
  },

  pages: {
    signIn: '/signup',  // Custom signup page
    error: '/signup',   // Error page
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
