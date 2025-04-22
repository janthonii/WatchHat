'use client';
import Image from 'next/image';
import logo from '@/assets/A-HAT_Logo.svg';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="relative z-50">
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
              {!session?.user ? (
                <div className="flex items-center">
                  <Link
                    href="/about-us"
                    className="text-[#FBE9D0] hover:text-white px-3 py-2 rounded-md text-sm font-medium uppercase"
                  >
                    ABOUT US
                  </Link>
                  <button 
                    onClick={() => router.push('/signup')}
                    className="flex items-center bg-custom-orange hover:bg-dark-orange hover:text-white rounded-sm px-4 py-2 ml-4"
                  >
                    <span>JOIN NOW</span>
                  </button>
                </div>
              ) : (
                <div className="relative ml-4" ref={dropdownRef}>
                  <button 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center bg-[#E64833] hover:bg-dark-orange text-[#FBE9D0] rounded-sm px-4 py-2 uppercase"
                  >
                    <span>WELCOME, {session.user.name?.toUpperCase() || session.user.email?.split('@')[0].toUpperCase()}</span>
                    <svg
                      className={`ml-2 h-4 w-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#E64833] ring-1 ring-black ring-opacity-5 z-50">
                      <div className="py-1">
                        <Link
                          href="/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="block px-4 py-2 text-sm text-[#FBE9D0] hover:bg-[#d93f2b] uppercase"
                        >
                          Profile
                        </Link>
                        <Link
                          href="/recommended"
                          onClick={() => setDropdownOpen(false)}
                          className="block px-4 py-2 text-sm text-[#FBE9D0] hover:bg-[#d93f2b] uppercase"
                        >
                          Recommended
                        </Link>
                        <Link
                          href="/my-lists"
                          onClick={() => setDropdownOpen(false)}
                          className="block px-4 py-2 text-sm text-[#FBE9D0] hover:bg-[#d93f2b] uppercase"
                        >
                          My Lists
                        </Link>
                        <Link
                          href="/home"
                          onClick={() => setDropdownOpen(false)}
                          className="block px-4 py-2 text-sm text-[#FBE9D0] hover:bg-[#d93f2b] uppercase"
                        >
                          Search
                        </Link>
                        <Link
                          href="/about-us"
                          onClick={() => setDropdownOpen(false)}
                          className="block px-4 py-2 text-sm text-[#FBE9D0] hover:bg-[#d93f2b] uppercase"
                        >
                          About Us
                        </Link>
                        <hr className="border-[#FBE9D0]" />
                        <button
                          onClick={() => {
                            handleLogout();
                            setDropdownOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-[#FBE9D0] hover:bg-[#d93f2b] uppercase"
                        >
                          Log Out
                        </button>
                      </div>
                    </div>
                  )}
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
                  SEARCH
                </Link>
                <Link
                  href="/recommended"
                  className="block rounded-md px-3 py-2 text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  RECOMMENDED
                </Link>
                <Link
                  href="/my-lists"
                  className="block rounded-md px-3 py-2 text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  MY LISTS
                </Link>
                <Link
                  href="/profile"
                  className="block rounded-md px-3 py-2 text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  PROFILE
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
                <span>LOG OUT</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;