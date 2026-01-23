'use client';

import StaggeredMenu from '@/components/StaggeredMenu';

export default function Navbar() {
  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'Events', ariaLabel: 'View events', link: '/events' },
    { label: 'Clubs', ariaLabel: 'View clubs', link: '/clubs' },
    { label: 'Gallery', ariaLabel: 'View gallery', link: '/gallery' },
    { label: 'Internships', ariaLabel: 'View internships', link: '/internships' },
    { label: 'Jobs', ariaLabel: 'View jobs', link: '/jobs' },
    { label: 'Competitions', ariaLabel: 'View competitions', link: '/competitions' },
    { label: 'Mentorship', ariaLabel: 'View mentorship', link: '/mentorship' },
    { label: 'Mock Tests', ariaLabel: 'Take mock tests', link: '/mock-tests' },
    { label: 'Mock Interview', ariaLabel: 'Practice mock interviews', link: '/mock-interview' },
    { label: '100 Days to Code', ariaLabel: '100 days coding challenge', link: '/100-days-code' },
    { label: 'Courses', ariaLabel: 'View courses', link: '/courses' },
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
