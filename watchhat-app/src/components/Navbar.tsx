'use client';
import Image from 'next/image';
import logo from '@/assets/A-HAT_Logo.svg';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <nav className="">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          {/* Logo */}
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <Link className="flex flex-shrink-0 items-center" href="/">
              <Image className="h-10 w-auto" src={logo} alt="WatchHat-logo" />
              <span className="hidden md:block font-(family-name: --Inter) text-2xl font-bold ml-2">
                WatchHat
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block md:ml-6">
            <div className="flex items-center font-bold">
              <div className="hidden md:ml-6 md:block">
                <div className="flex space-x-2">
                  {session?.user && (
                    <>
                      <Link href="/home" className="font-(family-name: --Inter) hover:underline rounded-md py-2 pr-6">HOME</Link>
                      <Link href="/my-lists" className="font-(family-name: --Inter) hover:underline rounded-md py-2 pr-6">MY LISTS</Link>
                    </>
                  )}
                  <Link href="/about-us" className="font-(family-name: --Inter) hover:underline rounded-md py-2 pr-6">ABOUT US</Link>
                </div>
              </div>
              
              {!session?.user ? (
                <div>
                  <button 
                    onClick={() => router.push('/signup')}
                    className="flex items-center bg-custom-orange hover:bg-dark-orange hover:text-white rounded-sm px-4 py-2 ml-4"
                  >
                    <span>JOIN NOW</span>
                  </button>
                </div>
              ) : (
                <div>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center bg-custom-orange hover:bg-dark-orange hover:text-white rounded-sm px-4 py-2 ml-4"
                  >
                    <span>LOGOUT</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {session?.user && (
              <>
                <Link
                  href="/home"
                  className="block rounded-md px-3 py-2 text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  HOME
                </Link>
                <Link
                  href="/my-lists"
                  className="block rounded-md px-3 py-2 text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  MY LISTS
                </Link>
              </>
            )}
            <Link
              href="/about-us"
              className="block rounded-md px-3 py-2 text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              ABOUT US
            </Link>
            {!session?.user ? (
              <button 
                onClick={() => {
                  router.push('/signup');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center bg-gray-700 bg-custom-orange hover:bg-dark-orange rounded-md px-3 py-2 my-4 w-full"
              >
                <span>JOIN NOW</span>
              </button>
            ) : (
              <button 
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center bg-gray-700 bg-custom-orange hover:bg-dark-orange rounded-md px-3 py-2 my-4 w-full"
              >
                <span>LOGOUT</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;