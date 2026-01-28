'use client';

import StaggeredMenu, { StaggeredMenuItem } from '@/components/StaggeredMenu';
import NotificationBell from '@/components/NotificationBell';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { data: session, status } = useSession();
  const [menuItems, setMenuItems] = useState<StaggeredMenuItem[]>([
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'Events', ariaLabel: 'View events', link: '/events' },
    { label: 'Clubs', ariaLabel: 'View clubs', link: '/clubs' },
    { label: 'Gallery', ariaLabel: 'View gallery', link: '/gallery' },
    { label: 'About', ariaLabel: 'About us', link: '/about' },
    { label: 'Contact', ariaLabel: 'Contact us', link: '/contact' },
    { label: 'Login', ariaLabel: 'Login to your account', link: '/login' },
  ]);

  useEffect(() => {
    // Update menu based on authentication status
    if (status === 'authenticated' && session?.user) {
      setMenuItems([
        { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
        { label: 'Events', ariaLabel: 'View events', link: '/events' },
        { label: 'Clubs', ariaLabel: 'View clubs', link: '/clubs' },
        { label: 'Gallery', ariaLabel: 'View gallery', link: '/gallery' },
        { label: 'About', ariaLabel: 'About us', link: '/about' },
        { label: 'Contact', ariaLabel: 'Contact us', link: '/contact' },
        { 
          label: 'Dashboard', 
          ariaLabel: 'View your dashboard', 
          link: session.user.role === 'ADMIN' ? '/admin/admind' : '/student/dashboard' 
        },
        { 
          label: 'Logout', 
          ariaLabel: 'Logout from your account', 
          link: '#',
          onClick: () => {
            signOut({ callbackUrl: '/signup' });
          }
        },
      ]);
    } else {
      setMenuItems([
        { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
        { label: 'Events', ariaLabel: 'View events', link: '/events' },
        { label: 'Clubs', ariaLabel: 'View clubs', link: '/clubs' },
        { label: 'Gallery', ariaLabel: 'View gallery', link: '/gallery' },
        { label: 'About', ariaLabel: 'About us', link: '/about' },
        { label: 'Contact', ariaLabel: 'Contact us', link: '/contact' },
        { label: 'Login', ariaLabel: 'Login to your account', link: '/signup' },
      ]);
    }
  }, [status, session]);

  const socialItems = [
    { label: 'Instagram', link: '#' },
    { label: 'Twitter', link: '#' },
    { label: 'LinkedIn', link: '#' },
  ];

  return (
    <>
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        logoUrl="/logomain2.png"
        isFixed={true}
        accentColor="#5227FF"
        colors={['#B19EEF', '#5227FF']}
      />
      
      {/* Notification Bell - Only show for authenticated users */}
      {status === 'authenticated' && (
        <div className="fixed top-6 right-20 z-40">
          <NotificationBell />
        </div>
      )}
    </>
  );
}
