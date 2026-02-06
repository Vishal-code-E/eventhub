"use client";

import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-black text-white mt-20">
      {/* Top Call-to-Action Section */}
      <div className="bg-black py-12 text-center">
        <div className="flex flex-col items-center gap-4">
          {/* Logo */}
          <Image
            src="/logomain2.png" // replace with your actual logo file name in /public
            alt="EventHub Logo"
            width={140}
            height={140}
            className="rounded" // optional (remove if logo shouldn’t be rounded)
          />

          <h2 className="text-2xl font-semibold">Stay Updated</h2>
          <p className="text-gray-400 mb-6">
            Follow EVENT HUB for latest updates, event recaps, and campus news.
          </p>
        </div>

        <div className="flex justify-center gap-6">
          <Link
            href="https://twitter.com/"
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </Link>
          <Link
            href="https://linkedin.com/"
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </Link>
          <Link
            href="https://instagram.com/"
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </Link>
          <Link
            href="https://youtube.com/"
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            YouTube
          </Link>
        </div>
      </div>

      {/* Middle Section: Links */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Connect */}
        <div>
          <h3 className="font-semibold mb-4">Connect</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="#">Blog</Link></li>
            <li><Link href="#">Instagram</Link></li>
            <li><Link href="#">Twitter</Link></li>
            <li><Link href="#">YouTube</Link></li>
          </ul>
        </div>

        {/* Programs */}
        <div>
          <h3 className="font-semibold mb-4">Programs</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="#">Student Clubs</Link></li>
            <li><Link href="#">Workshops</Link></li>
            <li><Link href="#">Hackathons</Link></li>
            <li><Link href="#">Internships</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="#">Event Dashboard</Link></li>
            <li><Link href="#">Docs</Link></li>
            <li><Link href="#">Help Center</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} EventHub. All rights reserved.
      </div>
    </footer>
  );
}
