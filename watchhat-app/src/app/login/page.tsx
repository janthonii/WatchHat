import LoginForm from '@/components/loginForm';
import Image from 'next/image';
import logo from '@/assets/A-HAT_Logo.svg';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-[#142024] text-[#FBE9D0]">
      {/* Navbar */}
      <nav className="py-6 px-6 border-b border-[#244855]">
        <div className="flex items-center justify-center">
          <div className="flex items-center">
            <Image className="h-10 w-auto" src={logo} alt="WatchHat-logo" />
            <span className="ml-2 text-2xl font-bold">WatchHat</span>
          </div>
        </div>
      </nav>

      {/* Login Form Container */}
      <div className="flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-8">Login</h1>
          
          <LoginForm />
          
          <p className="text-center text-[#8a9ba8] mt-8">
            Don't have an account?{' '}
            <Link href="/signup" className="text-[#E64833] hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;