import type { Metadata } from "next";
import { Mail, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { submitContactMessage } from "./actions";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the inSAKE team.",
  alternates: { canonical: "/contact" },
};

const OFFICES = [
  {
    flag: "🇮🇳",
    tag: "Headquarters",
    name: "India (HQ)",
    address: "House No. 02, Ground floor, Borewell Rd, Whitefield, Bengaluru, Karnataka 560066, India",
  },
  {
    flag: "🇺🇸",
    tag: "International",
    name: "USA",
    address: "213 Decatur Ln, Georgia, 30033, USA",
  },
];

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string; error?: string }>;
}) {
  const { sent, error } = await searchParams;

  return (
    <div>
      <PageHero
        eyebrow="Get in touch"
        title="Contact Us"
        description="Have a question or want to enroll? We'd love to hear from you. Reach out via WhatsApp, email, or the form below."
      />

      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-5 sm:grid-cols-2">
          <a
            href="https://wa.me/919989569893"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-(--color-border) p-6 transition hover:border-(--color-primary) hover:shadow-lg hover:shadow-(--color-primary)/10"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366]">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div className="mt-3 text-sm font-semibold">WhatsApp</div>
            <div className="mt-1 text-lg font-bold text-(--color-primary)">+91 99895 69893</div>
            <p className="mt-1 text-xs text-(--color-muted)">Tap to chat instantly</p>
          </a>

          <a
            href="mailto:support@insake.in"
            className="rounded-2xl border border-(--color-border) p-6 transition hover:border-(--color-primary) hover:shadow-lg hover:shadow-(--color-primary)/10"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--color-primary)/10 text-(--color-primary)">
              <Mail className="h-5 w-5" />
            </div>
            <div className="mt-3 text-sm font-semibold">Email Us</div>
            <div className="mt-1 text-lg font-bold text-(--color-primary)">support@insake.in</div>
            <p className="mt-1 text-xs text-(--color-muted)">We reply within 24 hours</p>
          </a>
        </div>

        <h2 className="mt-12 text-lg font-bold">Send us a message</h2>
        <p className="mt-1 text-sm text-(--color-muted)">
          Prefer not to WhatsApp? Fill this in and we'll get back to you by email.
        </p>

        {sent === "1" && (
          <p className="mt-4 rounded-xl border border-(--color-accent)/30 bg-(--color-accent)/10 px-4 py-3 text-sm font-medium text-(--color-accent)">
            Thanks — your message has been sent. We'll get back to you within 24 hours.
          </p>
        )}
        {error === "1" && (
          <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-600">
            Please fill in your name, a valid email, and a message before sending.
          </p>
        )}

        <form action={submitContactMessage} className="mt-6 max-w-lg space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              name="name"
              placeholder="Your name"
              required
              className="rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
            />
            <input
              name="email"
              type="email"
              placeholder="Your email"
              required
              className="rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
            />
          </div>
          <textarea
            name="message"
            placeholder="How can we help?"
            required
            rows={4}
            className="w-full rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
          />
          <button
            type="submit"
            className="rounded-full bg-(--color-primary) px-6 py-2.5 text-sm font-semibold text-white hover:bg-(--color-primary-dark)"
          >
            Send message
          </button>
        </form>

        <h2 className="mt-12 text-lg font-bold">Our Offices</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {OFFICES.map((o) => (
            <div key={o.name} className="rounded-2xl border border-(--color-border) p-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-(--color-primary)">
                <span className="text-base">{o.flag}</span>
                {o.tag}
              </div>
              <div className="mt-1 text-sm font-semibold">{o.name}</div>
              <p className="mt-1 text-sm text-(--color-muted)">{o.address}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-(--color-ink-border) bg-(--color-ink) p-8 text-center text-(--color-ink-foreground)">
          <a
            href="https://wa.me/919989569893"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-(--color-primary) px-6 py-3 text-sm font-semibold text-white hover:bg-(--color-primary-dark)"
          >
            Chat on WhatsApp
          </a>
          <p className="mt-3 text-xs text-(--color-ink-muted)">Usually replies within minutes</p>
        </div>
      </div>
    </div>
  );
}
