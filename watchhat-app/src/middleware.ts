import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

const middleware = async (request: NextRequest) => {
    const { pathname } = request.nextUrl;
    const session = await auth();
    const isAuthenticated = !!session?.user;

    // Public paths that don't require authentication
    const publicPaths = [
        "/",
        "/home",
        "/about-us",
        "/signup",
        "/login",
        "/api/users", // Only if you want public user registration
        "/api/auth" // NextAuth.js API routes
    ];

    // Protected API routes
    const protectedApiRoutes = [
        "/api/users/[id]",
        "/api/users",
        "/api/lists/[id]",
        "/api/lists/",
        "/api/ratings/[id]",
        "/api/ratings/",
        "/api/similarities/[id]",
        "/api/similarities/"
        
    ];

    // 1. Redirect authenticated users from auth pages to home
    if (isAuthenticated && (pathname === "/signup" || pathname === "/login")) {
        return NextResponse.redirect(new URL("/home", request.url));
    }

    // 2. Protect private routes
    if (!isAuthenticated) {
        // Check if accessing protected page
        const isProtectedPage = [
            "/my-lists",
            "/profile",
        ].some(path => pathname.startsWith(path));

        // Check if accessing protected API route
        const isProtectedApiRoute = protectedApiRoutes.some(route => 
            pathname.startsWith(route)
        );

        if (isProtectedPage || isProtectedApiRoute) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    return NextResponse.next();
};

export const config = {
    matcher: [
        // Client-side routes
        "/home",
        "/my-lists",
        "/profile",
        "/signup",
        "/login",
        
        // API routes
        "/api/users/:path*",
        "/api/auth/session"
    ]
};

export { middleware };