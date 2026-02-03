'use client';

import Link from 'next/link';
import NotificationBell from '@/components/NotificationBell';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    signOut({ callbackUrl: '/signup' });
  };

  const navLinks = status === 'authenticated' && session?.user
    ? [
        { label: 'Home', href: '/' },
        { label: 'Events', href: '/events' },
        { label: 'Clubs', href: '/clubs' },
        { label: 'Gallery', href: '/gallery' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Dashboard', href: session.user.role === 'ADMIN' ? '/admin/admind' : '/student/dashboard' },
      ]
    : [
        { label: 'Home', href: '/' },
        { label: 'Events', href: '/events' },
        { label: 'Clubs', href: '/clubs' },
        { label: 'Gallery', href: '/gallery' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Login', href: '/signup' },
      ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-white font-bold text-xl tracking-wide">EVENT HUB</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
            
            {status === 'authenticated' && (
              <>
                <NotificationBell />
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            {status === 'authenticated' && <NotificationBell />}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium py-2"
              >
                {link.label}
              </Link>
            ))}
            
            {status === 'authenticated' && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="block w-full text-left text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium py-2"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
