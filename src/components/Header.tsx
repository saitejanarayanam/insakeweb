"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useCartStore } from "@/lib/cart-store";

const NAV_LINKS = [
  { href: "/courses", label: "Courses" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const { data: session, status } = useSession();
  const itemCount = useCartStore((s) => s.items.length);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-(--color-border) bg-(--background)/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <Image src="/insake-logo.png" alt="inSAKE" width={32} height={32} className="h-8 w-8" priority />
          <span>inSAKE</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-(--foreground) hover:text-(--color-primary)"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link href="/cart" className="relative text-sm font-medium hover:text-(--color-primary)">
            Cart
            {itemCount > 0 && (
              <span className="absolute -right-3 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-(--color-primary) text-[10px] text-white">
                {itemCount}
              </span>
            )}
          </Link>

          {status === "authenticated" ? (
            <>
              {session.user.role === "ADMIN" && (
                <Link href="/admin" className="text-sm font-medium hover:text-(--color-primary)">
                  Admin
                </Link>
              )}
              <Link href="/dashboard" className="text-sm font-medium hover:text-(--color-primary)">
                Dashboard
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-full border border-(--color-border) px-4 py-1.5 text-sm font-medium hover:bg-(--color-surface)"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium hover:text-(--color-primary)">
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-(--color-primary) px-4 py-1.5 text-sm font-semibold text-white shadow-sm shadow-(--color-primary)/30 hover:bg-(--color-primary-dark)"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-(--color-border) px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="text-sm font-medium">
                {link.label}
              </Link>
            ))}
            <Link href="/cart" onClick={() => setMenuOpen(false)} className="text-sm font-medium">
              Cart {itemCount > 0 && `(${itemCount})`}
            </Link>
            {status === "authenticated" ? (
              <>
                {session.user.role === "ADMIN" && (
                  <Link href="/admin" onClick={() => setMenuOpen(false)} className="text-sm font-medium">
                    Admin
                  </Link>
                )}
                <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="text-sm font-medium">
                  Dashboard
                </Link>
                <button onClick={() => signOut({ callbackUrl: "/" })} className="text-left text-sm font-medium">
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMenuOpen(false)} className="text-sm font-medium">
                  Log in
                </Link>
                <Link href="/signup" onClick={() => setMenuOpen(false)} className="text-sm font-medium">
                  Sign up
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
