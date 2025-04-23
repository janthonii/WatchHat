// to stop the navbar from showing on login and signup pages

'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function NavbarWrapper() {
  const pathname = usePathname();
  
  // Hide navbar on these paths
  if (['/login', '/signup'].includes(pathname)) {
    return null;
  }

  return <Navbar />;
}