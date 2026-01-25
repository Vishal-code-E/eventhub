/**
 * Type definitions for NextAuth
 * Extends default NextAuth types with custom user properties
 */

import { DefaultSession } from "next-auth";
import { Role } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      isProfileComplete: boolean;
      role: Role;
    } & DefaultSession["user"]
  }

  interface User {
    id: string;
    email: string;
    isProfileComplete?: boolean;
    role?: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
  }
}
