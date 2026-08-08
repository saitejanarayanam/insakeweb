import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CourseCard } from "@/components/CourseCard";
import { HeroIllustration } from "@/components/HeroIllustration";
import { TrustBadges } from "@/components/TrustBadges";
import { PersonIcon } from "@/components/icons/PersonIcon";
import { ScrollCarousel } from "@/components/ScrollCarousel";
import { Marquee } from "@/components/ui/marquee";
import Team from "@/components/ui/team";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [featuredCourses, partners, mentors, testimonials] = await Promise.all([
    prisma.course.findMany({
      where: { published: true },
      select: {
        id: true,
        slug: true,
        title: true,
        tagline: true,
        price: true,
        studyHours: true,
        difficulty: true,
        featured: true,
        imageUrl: true,
        category: { select: { name: true, slug: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
    prisma.partnerInstitution.findMany({ orderBy: { order: "asc" } }),
    prisma.mentor.findMany({ orderBy: { order: "asc" }, take: 12 }),
    prisma.testimonial.findMany({ orderBy: { order: "asc" }, take: 3 }),
  ]);

  return (
    <div>
      <section className="bg-grid relative overflow-hidden border-b border-(--color-ink-border) bg-(--color-ink) text-(--color-ink-foreground)">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-(--color-primary)/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-10 lg:grid-cols-2 lg:py-14">
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
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-(--color-ink) bg-gradient-to-br from-(--color-primary) to-fuchsia-500 text-white"
                  >
                    <PersonIcon className="h-4 w-4" />
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
          <div className="mx-auto max-w-7xl px-4">
            <TrustBadges />
          </div>
        </div>
      </section>

      {partners.length > 0 && (
        <section className="border-b border-(--color-border) py-10">
          <div className="mx-auto max-w-7xl px-4">
            <p className="text-center text-xs font-semibold uppercase tracking-wide text-(--color-muted)">
              Trusted by learners from
            </p>
            <div className="relative mt-6">
              <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-16 bg-linear-to-r from-(--background) to-transparent" />
              <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-16 bg-linear-to-l from-(--background) to-transparent" />
              <Marquee className="[--duration:30s] [--gap:1.25rem]" pauseOnHover>
                {partners.map((p) => (
                  <span
                    key={p.id}
                    className="flex shrink-0 items-center justify-center rounded-full border border-(--color-border) bg-(--color-surface) px-6 py-2.5 text-sm font-medium text-(--color-muted)"
                  >
                    {p.name}
                  </span>
                ))}
              </Marquee>
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-bold">Featured courses</h2>
          <Link href="/courses" className="text-sm font-medium text-(--color-primary)">
            View all →
          </Link>
        </div>
        <ScrollCarousel>
          {featuredCourses.map((course) => (
            <div key={course.id} data-slide className="w-[270px] shrink-0 snap-start sm:w-[300px]">
              <CourseCard course={course} />
            </div>
          ))}
        </ScrollCarousel>
      </section>

      {mentors.length > 0 && (
        <Team
          className="border-t border-(--color-border) bg-(--color-surface)"
          members={mentors.map((m) => ({
            name: m.name,
            role: m.company ? `${m.title}, ${m.company}` : m.title,
            image: m.photoUrl,
          }))}
        />
      )}

      {testimonials.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="mb-8 text-2xl font-bold">What learners say</h2>
          <div className="relative">
            <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-16 bg-linear-to-r from-(--background) to-transparent" />
            <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-16 bg-linear-to-l from-(--background) to-transparent" />
            <Marquee className="[--duration:35s] [--gap:1.25rem]" pauseOnHover>
              {testimonials.map((t) => (
                <figure
                  key={t.id}
                  className="w-[280px] shrink-0 rounded-2xl border border-(--color-border) p-5 transition hover:-translate-y-0.5 hover:border-(--color-primary) hover:shadow-lg hover:shadow-(--color-primary)/10 sm:w-[340px]"
                >
                  <blockquote className="text-sm text-(--foreground)">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption className="mt-3 text-xs text-(--color-muted)">
                    <span className="font-semibold text-(--foreground)">{t.name}</span>
                    {t.role ? ` — ${t.role}` : ""}
                  </figcaption>
                </figure>
              ))}
            </Marquee>
          </div>
        </section>
      )}

      <section className="bg-grid relative overflow-hidden border-y border-(--color-ink-border) bg-(--color-ink) py-16 text-(--color-ink-foreground)">
        <div className="relative mx-auto max-w-7xl px-4 text-center">
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
