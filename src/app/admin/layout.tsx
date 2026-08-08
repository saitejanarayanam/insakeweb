"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const ADMIN_NAV = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/courses", label: "Courses" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/contact", label: "Contact Messages" },
  { href: "/admin/mentors", label: "Mentors" },
  { href: "/admin/partners", label: "Partners" },
  { href: "/admin/orders", label: "Orders" },
];

function isActive(pathname: string, href: string) {
  return href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
}

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <>
      {ADMIN_NAV.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={`block rounded-lg px-3 py-2 text-sm font-medium ${
              active
                ? "bg-(--color-primary)/10 text-(--color-primary)"
                : "text-(--color-muted) hover:bg-(--color-surface) hover:text-(--color-primary)"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:py-10">
      <div className="mb-4 sm:hidden">
        <button
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          className="flex w-full items-center justify-between rounded-lg border border-(--color-border) px-3 py-2 text-sm font-medium"
        >
          Admin menu
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className={`transition-transform ${mobileOpen ? "rotate-180" : ""}`}
          >
            <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {mobileOpen && (
          <nav className="mt-2 space-y-1 rounded-lg border border-(--color-border) p-2">
            <NavLinks pathname={pathname} onNavigate={() => setMobileOpen(false)} />
          </nav>
        )}
      </div>

      <div className="flex gap-8">
        <aside className="hidden w-48 shrink-0 sm:block">
          <nav className="sticky top-20 space-y-1">
            <NavLinks pathname={pathname} />
          </nav>
        </aside>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
