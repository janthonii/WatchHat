"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';

const SignupForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      const username = formData.get("username")?.toString();
      const password = formData.get("password")?.toString();

      // Client-side validation
      if (!username || !password) {
        throw new Error("All fields are required");
      }

      const response = await fetch('/api/signup', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      router.push("/login");
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid mt-8 justify-items-center">
      <div className="shadow-lg p-5 rounded-lg border-t-4 bg-white border-red-700">
        <h1 className="text-xl text-slate-600 font-bold my-4">Signup</h1>
        
        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="username" className="mb-1 text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              required
              minLength={5}
              className="border border-gray-400 rounded px-3 py-2 focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              minLength={6}
              className="border border-gray-400 rounded px-3 py-2 focus:ring-2 focus:ring-red-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`bg-red-700 text-white py-2 rounded hover:bg-red-800 transition ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-red-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;