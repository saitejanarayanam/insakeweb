import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-(--color-ink-border) bg-(--color-ink) text-(--color-ink-foreground)">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-col items-start justify-between gap-6 border-b border-(--color-ink-border) pb-8 sm:flex-row sm:items-center">
          <p className="max-w-xl text-sm text-(--color-ink-muted)">
            The enterprise-grade platform for professional certification, upskilling, and
            workforce validation — trusted globally.
          </p>
          <a
            href="https://wa.me/919989569893"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full bg-(--color-primary) px-5 py-2.5 text-sm font-semibold text-white hover:bg-(--color-primary-dark)"
          >
            Chat on WhatsApp
          </a>
        </div>

        <div className="grid gap-8 py-10 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-(--color-ink-muted)">Company</div>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/" className="text-(--color-ink-muted) hover:text-(--color-primary)">Home</Link></li>
              <li><Link href="/about" className="text-(--color-ink-muted) hover:text-(--color-primary)">About Us</Link></li>
              <li><Link href="/contact" className="text-(--color-ink-muted) hover:text-(--color-primary)">Contact</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-(--color-ink-muted)">Courses</div>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/courses" className="text-(--color-ink-muted) hover:text-(--color-primary)">All Courses</Link></li>
              <li><Link href="/courses/cisa-certification" className="text-(--color-ink-muted) hover:text-(--color-primary)">CISA</Link></li>
              <li><Link href="/courses/cism-certification" className="text-(--color-ink-muted) hover:text-(--color-primary)">CISM</Link></li>
              <li><Link href="/courses/pmp-certification" className="text-(--color-ink-muted) hover:text-(--color-primary)">PMP</Link></li>
              <li><Link href="/courses/crisc-certification" className="text-(--color-ink-muted) hover:text-(--color-primary)">CRISC</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-(--color-ink-muted)">Legal</div>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/terms" className="text-(--color-ink-muted) hover:text-(--color-primary)">Terms of Service</Link></li>
              <li><Link href="/refund-policy" className="text-(--color-ink-muted) hover:text-(--color-primary)">Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="grid gap-4 border-t border-(--color-ink-border) py-8 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <span className="text-lg">🇮🇳</span>
            <div>
              <div className="text-xs font-semibold text-(--color-ink-foreground)">India (HQ)</div>
              <p className="mt-0.5 text-xs text-(--color-ink-muted)">
                House No. 02, Ground floor, Borewell Rd, Whitefield, Bengaluru, Karnataka 560066, India
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-lg">🇺🇸</span>
            <div>
              <div className="text-xs font-semibold text-(--color-ink-foreground)">USA</div>
              <p className="mt-0.5 text-xs text-(--color-ink-muted)">213 Decatur Ln, Georgia, 30033, USA</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-(--color-ink-border) px-4 py-4 text-center text-xs text-(--color-ink-muted)">
        © {new Date().getFullYear()} inSAKE Academy. All rights reserved.
      </div>
    </footer>
  );
}
