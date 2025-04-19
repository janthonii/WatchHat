"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
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
      const username = formData.get("username") as string; // Changed from email
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
    <div className="ShowItemList">
      <div className="grid mt-8 justify-items-center"> 
        <div className="shadow-lg p-5 rounded-lg border-t-4 bg-white border-red-700">
          <h1 className="text-xl text-slate-600 font-bold my-4">Login</h1>
          
          {error && <div className="text-lg text-red-500 mb-4">{error}</div>}

          <form onSubmit={onSubmit} className="my-8 max-w-md mx-auto flex flex-col gap-4 border p-6 border-gray-300 rounded-md shadow-sm bg-white">
            <div className="flex flex-col">
              <label htmlFor="username" className="mb-1 text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                required
                minLength={5}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="mb-1 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`bg-red-700 text-white rounded px-4 py-2 mt-2 hover:bg-red-800 transition ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="my-3 text-center">
            Don't have an account?{" "}
            <Link href="/signup" className="text-red-600 hover:underline">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;