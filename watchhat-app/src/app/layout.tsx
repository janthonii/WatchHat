import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarWrapper from '@/components/NavbarWrapper';
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WatchHat | Movie Recommendations",
  description: "Rank your movies! Get your best fit movies based on your rankings! Have personal lists of movies to watch! Have shared lists of movies for you and your friends to watch!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <SessionProvider>
          <NavbarWrapper />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
