import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

//Navbar component
'use client';


const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav
            className="sticky top-0 z-50 w-full backdrop-blur-sm bg-white/70 border-b border-gray-200"
            aria-label="Main navigation"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-xl font-bold text-gray-900" aria-label="Homepage">
                            MyLogo
                        </Link>
                    </div>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex md:items-center md:space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`relative px-2 py-1 text-sm font-medium transition-colors ${
                                    pathname === link.href
                                        ? 'text-blue-600 underline underline-offset-4'
                                        : 'text-gray-700 hover:text-blue-500'
                                }`}
                                aria-current={pathname === link.href ? 'page' : undefined}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop CTA Button */}
                    <div className="hidden md:flex">
                        <Link
                            href="/contact"
                            className="ml-4 px-4 py-2 rounded-md bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-colors"
                        >
                            Get in Touch
                        </Link>
                    </div>

                    {/* Mobile Hamburger */}
                    <div className="md:hidden flex items-center">
                        <button
                            type="button"
                            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                            aria-controls="mobile-menu"
                            aria-expanded={mobileOpen}
                            onClick={() => setMobileOpen((open) => !open)}
                            className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div
                    id="mobile-menu"
                    className="fixed inset-0 z-40 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center md:hidden"
                    role="dialog"
                    aria-modal="true"
                >
                    <button
                        type="button"
                        aria-label="Close menu"
                        onClick={() => setMobileOpen(false)}
                        className="absolute top-6 right-6 p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <X size={32} />
                    </button>
                    <nav className="flex flex-col items-center space-y-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className={`text-2xl font-semibold transition-colors ${
                                    pathname === link.href
                                        ? 'text-blue-600 underline underline-offset-8'
                                        : 'text-gray-800 hover:text-blue-500'
                                }`}
                                aria-current={pathname === link.href ? 'page' : undefined}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            onClick={() => setMobileOpen(false)}
                            className="mt-6 px-6 py-3 rounded-md bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-colors text-lg"
                        >
                            Get in Touch
                        </Link>
                    </nav>
                </div>
            )}
        </nav>
    );
}