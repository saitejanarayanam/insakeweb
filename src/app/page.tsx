import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CourseCard } from "@/components/CourseCard";
import { HeroIllustration } from "@/components/HeroIllustration";
import { TrustBadges } from "@/components/TrustBadges";

export default async function HomePage() {
  const [featuredCourses, partners, mentors, testimonials] = await Promise.all([
    prisma.course.findMany({
      where: { published: true },
      include: { category: true },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
    prisma.partnerInstitution.findMany({ orderBy: { order: "asc" } }),
    prisma.mentor.findMany({ orderBy: { order: "asc" }, take: 4 }),
    prisma.testimonial.findMany({ orderBy: { order: "asc" }, take: 3 }),
  ]);

  return (
    <div>
      <section className="bg-grid relative overflow-hidden bg-(--color-ink) text-(--color-ink-foreground)">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-(--color-primary)/30 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 lg:grid-cols-2 lg:py-28">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-(--color-ink-border) bg-(--color-ink-surface) px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-(--color-primary)">
              Enterprise-grade certification platform
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
              Unlock your potential with{" "}
              <span className="bg-gradient-to-r from-(--color-primary) to-fuchsia-400 bg-clip-text text-transparent">
                expert-led courses
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-(--color-ink-muted) lg:mx-0">
              Certifications, finance & analytics training, and career-skills programs —
              built to make you job-ready, taught by mentors who&apos;ve done the job.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
              <Link
                href="/courses"
                className="rounded-full bg-(--color-primary) px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-(--color-primary)/30 hover:bg-(--color-primary-dark)"
              >
                Explore courses
              </Link>
              <a
                href="https://wa.me/919989569893"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-(--color-ink-border) px-6 py-3 text-sm font-semibold hover:bg-(--color-ink-surface)"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.35a9.87 9.87 0 0 0 4.62 1.13h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
            <div className="mt-8 flex items-center justify-center gap-3 lg:justify-start">
              <div className="flex -space-x-2">
                {mentors.slice(0, 4).map((m) => (
                  <div
                    key={m.id}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-(--color-ink) bg-gradient-to-br from-(--color-primary) to-fuchsia-500 text-xs font-semibold text-white"
                  >
                    {m.name.charAt(0)}
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="text-xs font-semibold text-(--color-ink-foreground)">13,000+ Happy Learners</div>
                <div className="text-xs text-(--color-ink-muted)">★★★★★ 5.0 / 5.0 Rating</div>
              </div>
            </div>
          </div>

          <HeroIllustration />
        </div>

        <div className="relative border-t border-(--color-ink-border) py-8">
          <div className="mx-auto max-w-6xl px-4">
            <TrustBadges />
          </div>
        </div>
      </section>

      {partners.length > 0 && (
        <section className="border-b border-(--color-border) py-10">
          <div className="mx-auto max-w-6xl px-4">
            <p className="text-center text-xs font-semibold uppercase tracking-wide text-(--color-muted)">
              Trusted by learners from
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {partners.map((p) => (
                <span key={p.id} className="text-sm font-medium text-(--color-muted)">
                  {p.name}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-bold">Featured courses</h2>
          <Link href="/courses" className="text-sm font-medium text-(--color-primary)">
            View all →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {mentors.length > 0 && (
        <section className="border-t border-(--color-border) bg-(--color-surface) py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="mb-8 text-2xl font-bold">Learn from industry mentors</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {mentors.map((m) => (
                <div key={m.id} className="rounded-2xl border border-(--color-border) bg-(--background) p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-(--color-primary) to-fuchsia-500 text-lg font-semibold text-white">
                    {m.name.charAt(0)}
                  </div>
                  <h3 className="mt-3 text-sm font-semibold">{m.name}</h3>
                  <p className="text-xs text-(--color-muted)">
                    {m.title}
                    {m.company ? `, ${m.company}` : ""}
                  </p>
                  <p className="mt-2 text-xs text-(--color-muted)">{m.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {testimonials.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="mb-8 text-2xl font-bold">What learners say</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.id} className="rounded-2xl border border-(--color-border) p-5">
                <blockquote className="text-sm text-(--foreground)">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-3 text-xs text-(--color-muted)">
                  <span className="font-semibold text-(--foreground)">{t.name}</span>
                  {t.role ? ` — ${t.role}` : ""}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <section className="bg-grid relative overflow-hidden bg-(--color-ink) py-16 text-(--color-ink-foreground)">
        <div className="relative mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-2xl font-bold">Ready to get started?</h2>
          <p className="mt-2 text-(--color-ink-muted)">
            Browse our full catalog and find the course that fits your career goals.
          </p>
          <Link
            href="/courses"
            className="mt-6 inline-block rounded-full bg-(--color-primary) px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-(--color-primary)/30 hover:bg-(--color-primary-dark)"
          >
            Explore courses
          </Link>
        </div>
      </section>
    </div>
  );
}
