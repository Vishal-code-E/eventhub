/**
 * Auth Provider Component
 * Wraps the app with NextAuth SessionProvider
 * This makes session data available to all client components
 */

"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
