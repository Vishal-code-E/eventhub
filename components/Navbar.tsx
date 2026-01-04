'use client';

import StaggeredMenu from '@/components/StaggeredMenu';

export default function Navbar() {
  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'Events', ariaLabel: 'View events', link: '/events' },
    { label: 'Clubs', ariaLabel: 'View clubs', link: '/clubs' },
    { label: 'Gallery', ariaLabel: 'View gallery', link: '/gallery' },
    { label: 'About', ariaLabel: 'About us', link: '/about' },
    { label: 'Contact', ariaLabel: 'Contact us', link: '/contact' },
    { label: 'Login', ariaLabel: 'Login to your account', link: '/login' },
  ];

  const socialItems = [
    { label: 'Instagram', link: '#' },
    { label: 'Twitter', link: '#' },
    { label: 'LinkedIn', link: '#' },
  ];

  return (
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
  );
}
