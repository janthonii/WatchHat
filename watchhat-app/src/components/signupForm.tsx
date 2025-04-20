"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useRef } from 'react';
import { signIn } from "next-auth/react";

const SignupForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const clearError = () => setError(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const formData = new FormData(event.currentTarget);
      const username = formData.get("username") as string | null;
      const password = formData.get("password") as string | null;

      if (!username || !password) {
        throw new Error("All fields are required.");
      }

      const response = await fetch(`/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = typeof errorData.error === 'string' 
          ? errorData.error 
          : "Registration failed";
        throw new Error(errorMessage);
      }

      // Auto-login after signup
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (result?.error) throw new Error(result.error);
      router.push("/home");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {error && (
        <div className="mb-6 p-3 bg-[#E64833] text-white rounded text-center">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="username" className="block text-sm font-medium">
            Username
          </label>
          <input
            ref={usernameRef}
            onClick={clearError}
            onChange={clearError}
            className="w-full bg-[#142024] border border-[#244855] rounded px-4 py-3 focus:outline-none focus:border-[#E64833] text-[#FBE9D0]"
            type="text"
            name="username"
            id="username"
            required
            minLength={5}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            ref={passwordRef}
            onClick={clearError}
            onChange={clearError}
            className="w-full bg-[#142024] border border-[#244855] rounded px-4 py-3 focus:outline-none focus:border-[#E64833] text-[#FBE9D0]"
            type="password"
            name="password"
            id="password"
            required
            minLength={6}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#E64833] text-white py-3 px-6 hover:bg-[#d43f2b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ borderRadius: '30px' }}
        >
          {isLoading ? "Creating account..." : "Sign Up"}
        </button>
      </form>
    </>
  );
};

export default SignupForm;