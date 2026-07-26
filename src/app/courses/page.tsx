import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CourseCard } from "@/components/CourseCard";
import { PageHero } from "@/components/PageHero";
import { StatsRow } from "@/components/StatsRow";

export const metadata: Metadata = {
  title: "Courses",
  description: "Browse certification, finance & analytics, and career-skills courses.",
};

const STATS = [
  { value: "10,000+", label: "Students Trained" },
  { value: "100+", label: "Corporate Clients" },
  { value: "95%", label: "Pass Rate" },
  { value: "5+", label: "Countries" },
];

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  const [categories, courses] = await Promise.all([
    prisma.courseCategory.findMany({ orderBy: { order: "asc" } }),
    prisma.course.findMany({
      where: {
        published: true,
        ...(category ? { category: { slug: category } } : {}),
      },
      include: { category: true },
      orderBy: { title: "asc" },
    }),
  ]);

  return (
    <div>
      <PageHero
        eyebrow="Professional Certifications"
        title="Explore Our Certification Courses"
        description="Industry-recognized certifications designed by experts, trusted by 10,000+ professionals across 5+ countries."
      >
        <StatsRow stats={STATS} />
      </PageHero>

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-wrap gap-2">
          <Link
            href="/courses"
            className={`rounded-full border px-3 py-1.5 text-sm font-medium ${
              !category
                ? "border-(--color-primary) bg-(--color-primary) text-white"
                : "border-(--color-border) hover:bg-(--color-surface)"
            }`}
          >
            All
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/courses?category=${c.slug}`}
              className={`rounded-full border px-3 py-1.5 text-sm font-medium ${
                category === c.slug
                  ? "border-(--color-primary) bg-(--color-primary) text-white"
                  : "border-(--color-border) hover:bg-(--color-surface)"
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {courses.length === 0 && (
          <p className="mt-12 text-center text-(--color-muted)">No courses found in this category yet.</p>
        )}

        <div className="mt-16 rounded-2xl border border-(--color-border) bg-(--color-surface) p-8 text-center">
          <h2 className="text-lg font-bold">Not sure which course?</h2>
          <p className="mt-1 text-sm text-(--color-muted)">
            Our experts will guide you to the right certification path for your goals.
          </p>
          <a
            href="https://wa.me/919989569893"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-full bg-(--color-primary) px-6 py-3 text-sm font-semibold text-white hover:bg-(--color-primary-dark)"
          >
            Talk to an Advisor
          </a>
        </div>
      </div>
    </div>
  );
}
