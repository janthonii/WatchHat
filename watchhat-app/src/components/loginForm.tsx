"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const formData = new FormData(event.currentTarget);
      const username = formData.get("username") as string;
      const password = formData.get("password") as string;

      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid credentials");
      } else {
        router.push("/");
      }
    } catch (error) {
      setError("Login failed. Please try again.");
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
      
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="username" className="block text-sm font-medium">
            Username
          </label>
          <input
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
          className="w-full bg-[#E64833] text-white py-3 px-6 hover:bg-[#d43f2b] transition-colors"
          style={{ borderRadius: '30px' }}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </>
  );
};

export default LoginForm;