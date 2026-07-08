import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nyumbani Homes | Find Your Next Property",
  description: "Browse real estate listings — homes, apartments, and land for sale or rent.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b bg-white sticky top-0 z-10">
          <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
            <Link href="/" className="text-xl font-bold text-brand-700">
              Nyumbani Homes
            </Link>
            <nav className="flex gap-6 text-sm font-medium">
              <Link href="/listings">Browse</Link>
              <Link href="/dashboard">Agent Dashboard</Link>
              <Link href="/login">Log In</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t mt-16 py-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Nyumbani Homes. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
