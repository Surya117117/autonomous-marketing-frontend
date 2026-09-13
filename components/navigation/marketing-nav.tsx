"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navigation = [
  { label: "Product", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Resources", href: "#how-it-works" },
  { label: "About", href: "#about" },
];

export function MarketingNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0716]/80 backdrop-blur-xl text-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 font-semibold tracking-tight"
          onClick={() => setMobileOpen(false)}
        >
          <img
            src="/logo/app logo.png"
            alt="Marketing System Logo"
            className="h-9 w-9 object-contain"
          />
          <span className="text-xl font-bold tracking-tight">Marketing System</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-zinc-300 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/login"
            className="rounded-full px-5 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
          >
            Sign in
          </Link>

          <Link
            href="/signup"
            className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-purple-600/30 transition-all hover:opacity-95 hover:shadow-purple-600/50"
          >
            Start Free
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((open) => !open)}
          className="rounded-lg p-2 text-zinc-300 transition-colors hover:bg-white/10 md:hidden"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#0B0716] px-6 py-6 md:hidden">
          <nav className="flex flex-col gap-3">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2 text-base text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4">
              <Link
                href="/login"
                className="rounded-full border border-white/20 py-2.5 text-center text-sm font-medium text-white"
                onClick={() => setMobileOpen(false)}
              >
                Sign in
              </Link>

              <Link
                href="/signup"
                className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 py-2.5 text-center text-sm font-medium text-white shadow-md"
                onClick={() => setMobileOpen(false)}
              >
                Start Free
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
