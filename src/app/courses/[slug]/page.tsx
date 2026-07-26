import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { formatINR } from "@/lib/format";
import { AddToCartButton } from "@/components/AddToCartButton";
import { SimpleMarkdown } from "@/components/SimpleMarkdown";

async function getCourse(slug: string) {
  return prisma.course.findUnique({
    where: { slug, published: true },
    include: { category: true, mentor: true },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourse(slug);
  if (!course) return {};
  return {
    title: course.title,
    description: course.tagline ?? course.description.slice(0, 150),
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await getCourse(slug);
  if (!course) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {course.category && (
        <span className="mb-3 inline-block rounded-full bg-(--color-surface) px-2.5 py-0.5 text-xs font-medium text-(--color-primary)">
          {course.category.name}
        </span>
      )}
      <h1 className="text-3xl font-bold">{course.title}</h1>
      {course.tagline && <p className="mt-2 text-lg text-(--color-muted)">{course.tagline}</p>}

      <div className="mt-6 flex flex-wrap items-center gap-6 rounded-2xl border border-(--color-border) bg-(--color-surface) p-5">
        <div>
          <div className="text-xs text-(--color-muted)">Price</div>
          <div className="text-xl font-bold text-(--color-primary)">{formatINR(course.price)}</div>
        </div>
        {course.studyHours && (
          <div>
            <div className="text-xs text-(--color-muted)">Study Time</div>
            <div className="text-xl font-bold">{course.studyHours}h</div>
          </div>
        )}
        {course.difficulty && (
          <div>
            <div className="text-xs text-(--color-muted)">Level</div>
            <div className="text-xl font-bold">{course.difficulty}</div>
          </div>
        )}
        {course.mentor && (
          <div>
            <div className="text-xs text-(--color-muted)">Mentor</div>
            <div className="text-sm font-semibold">{course.mentor.name}</div>
          </div>
        )}
        <div className="ml-auto">
          <AddToCartButton
            courseId={course.id}
            slug={course.slug}
            title={course.title}
            price={course.price}
          />
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-bold">About this course</h2>
        <p className="mt-3 text-sm text-(--color-muted)">{course.description}</p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold">Syllabus</h2>
        <div className="mt-3">
          <SimpleMarkdown text={course.syllabus} />
        </div>
      </section>

      {course.mentor && (
        <section className="mt-10 rounded-2xl border border-(--color-border) p-5">
          <h2 className="text-lg font-bold">Your mentor</h2>
          <h3 className="mt-3 text-base font-semibold">{course.mentor.name}</h3>
          <p className="text-sm text-(--color-muted)">
            {course.mentor.title}
            {course.mentor.company ? `, ${course.mentor.company}` : ""}
          </p>
          <p className="mt-2 text-sm text-(--color-muted)">{course.mentor.bio}</p>
        </section>
      )}
    </div>
  );
}
