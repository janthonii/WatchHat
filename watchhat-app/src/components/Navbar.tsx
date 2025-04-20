'use client';
import Image from 'next/image';
import logo from '@/assets/A-HAT_Logo.svg';
import {useState} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import profileDefault from '@/assets/images/profile.png';

const Navbar = () => {

  const [isLoggedIn,setIsLoggedIn ] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    const newState = !isLoggedIn;
    setIsLoggedIn(newState);
      if (!newState) {
        router.push('/');
      }
  };

  return (
    <nav className=''>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-20 items-center justify-between'>
          <div className='absolute inset-y-0 left-0 flex items-center md:hidden'>
            {/* <!-- Mobile menu button - hamburger --> */}
            <button
              type='button'
              id='mobile-dropdown-button'
              className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
              aria-controls='mobile-menu'
              aria-expanded='false'
            >
              <span className='absolute -inset-0.5'></span>
              <span className='sr-only'>Open main menu</span>
              <svg
                className='block h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                />
              </svg>
            </button>
          </div>

          <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
            {/* <!-- Logo --> */}
            <Link className='flex flex-shrink-0 items-center' href='/'>
              <Image className='h-10 w-auto' src={logo} alt='WatchHat-logo' />

              <span className='hidden md:block font-(family-name: --Inter) text-2xl font-bold ml-2'>
                WatchHat
              </span>
            </Link>
            
          </div>

          {/* <!-- Right Side Menu (Logged Out) --> */}
          <div className='hidden md:block md:ml-6'>
            <div className='flex items-center font-bold'>
              <div className='hidden md:ml-6 md:block'>
                <div className='flex space-x-2'>
                  {isLoggedIn && (
                    <>
                      <Link href='/home' className='font-(family-name: --Inter) hover:underline rounded-md py-2 pr-6'>HOME</Link>
                      <Link href='/my-lists/recommended-list/0' className='font-(family-name: --Inter) hover:underline rounded-md py-2 pr-6'>RECOMMENDED LIST</Link>
                      <Link href='/my-lists/' className='font-(family-name: --Inter) hover:underline rounded-md py-2 pr-6'>MY LISTS</Link>
                    </>
                  )}
                  <Link href='/about-us' className='font-(family-name: --Inter) hover:underline rounded-md py-2 pr-6'>ABOUT US</Link>
                </div>
            </div>
            {
            !isLoggedIn && (
            <div>
              <button onClick={handleLogin} className='flex items-center bg-custom-orange hover:bg-dark-orange hover:text-white rounded-sm px-4 py-2'>
                <i className='font-(family-name: --Inter)'></i>
                <span>JOIN NOW</span>
              </button>
            </div>
            )}
            {
            isLoggedIn && (
            <div>
              <button onClick={handleLogin} className='flex items-center bg-custom-orange hover:bg-dark-orange hover:text-white rounded-sm px-4 py-2'>
                <i className='font-(family-name: --Inter)'></i>
                <span>LOGOUT</span>
              </button>
            </div>
            )}
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      <div className='hidden' id='mobile-menu'>
        <div className='space-y-1 px-2 pb-3 pt-2'>
          <Link
            href='/about'
            className='block rounded-md px-3 py-2 text-base font-medium'
          >
            ABOUT US
          </Link>
          {
            !isLoggedIn && (
            <div className="hidden md:block md:ml-6">
              <button onClick={handleLogin} className='flex items-center \bg-gray-700 bg-custom-orange hover:bg-dark-orange rounded-md px-3 py-2 my-4'>
                <i className='mr-2'></i>
                <span>JOIN NOW</span>
              </button>
            </div>
          )}
          {
            isLoggedIn && (
            <div className="hidden md:block md:ml-6">
              <button onClick={handleLogin} className='flex items-center \bg-gray-700 bg-custom-orange hover:bg-dark-orange rounded-md px-3 py-2 my-4'>
                <i className='mr-2'></i>
                <span>LOGOUT</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


