import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { formatINR } from "@/lib/format";
import { AddToCartButton } from "@/components/AddToCartButton";
import { SimpleMarkdown } from "@/components/SimpleMarkdown";
import { JsonLd } from "@/components/JsonLd";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

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
  const description = course.tagline ?? course.description.slice(0, 150);
  return {
    title: course.title,
    description,
    alternates: { canonical: `/courses/${course.slug}` },
    openGraph: {
      title: course.title,
      description,
      type: "website",
      url: `/courses/${course.slug}`,
      images: course.imageUrl ? [{ url: course.imageUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: course.title,
      description,
      images: course.imageUrl ? [course.imageUrl] : undefined,
    },
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

  const courseUrl = `${BASE_URL}/courses/${course.slug}`;
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    url: courseUrl,
    ...(course.imageUrl
      ? { image: course.imageUrl.startsWith("http") ? course.imageUrl : `${BASE_URL}${course.imageUrl}` }
      : {}),
    provider: {
      "@type": "Organization",
      name: "inSAKE Academy",
      url: BASE_URL,
    },
    ...(course.difficulty ? { educationalLevel: course.difficulty } : {}),
    offers: {
      "@type": "Offer",
      price: (course.price / 100).toString(),
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: courseUrl,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Courses", item: `${BASE_URL}/courses` },
      { "@type": "ListItem", position: 3, name: course.title, item: courseUrl },
    ],
  };

  return (
    <div>
      <JsonLd data={courseJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      {/* Hero image banner */}
      <div className="relative h-40 w-full overflow-hidden sm:h-48 md:h-56">
        {course.imageUrl ? (
          <Image
            src={course.imageUrl}
            alt={course.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-(--color-primary) to-fuchsia-600" />
        )}
        {/* Dark gradient overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        {/* Category + title overlaid on banner */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 sm:px-8">
          <div className="mx-auto max-w-4xl">
            {course.category && (
              <span className="mb-2 inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                {course.category.name}
              </span>
            )}
            <h1 className="text-2xl font-bold text-white sm:text-3xl">{course.title}</h1>
            {course.tagline && (
              <p className="mt-1 text-sm text-white/80">{course.tagline}</p>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="flex flex-wrap items-center gap-6 rounded-2xl border border-(--color-border) bg-(--color-surface) p-5">
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
              imageUrl={course.imageUrl}
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
    </div>
  );
}
