import Link from "next/link";
import { formatINR } from "@/lib/format";
import { CategoryIcon } from "@/components/icons/CategoryIcon";

export type CourseCardData = {
  slug: string;
  title: string;
  tagline: string | null;
  price: number;
  studyHours: number | null;
  difficulty: string | null;
  featured: boolean;
  category?: { name: string; slug: string } | null;
};

const BADGE_GRADIENTS = [
  "from-(--color-primary) to-fuchsia-500",
  "from-sky-500 to-cyan-600",
  "from-fuchsia-500 to-pink-600",
  "from-amber-500 to-orange-600",
  "from-emerald-500 to-teal-600",
];

function badgeGradient(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return BADGE_GRADIENTS[hash % BADGE_GRADIENTS.length];
}

export function CourseCard({ course }: { course: CourseCardData }) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="flex flex-col rounded-2xl border border-(--color-border) bg-(--background) p-5 transition hover:-translate-y-0.5 hover:border-(--color-primary) hover:shadow-lg hover:shadow-(--color-primary)/10"
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white ${badgeGradient(
            course.category?.slug ?? course.slug
          )}`}
        >
          <CategoryIcon slug={course.category?.slug} />
        </span>
        {course.featured && (
          <span className="w-fit rounded-full bg-(--color-primary)/10 px-2.5 py-0.5 text-xs font-medium text-(--color-primary)">
            ✨ Featured
          </span>
        )}
      </div>
      {course.category && (
        <span className="mt-3 w-fit rounded-full bg-(--color-surface) px-2.5 py-0.5 text-xs font-medium text-(--color-muted)">
          {course.category.name}
        </span>
      )}
      <h3 className="mt-2 text-base font-semibold">{course.title}</h3>
      {course.tagline && (
        <p className="mt-1 text-sm text-(--color-muted)">{course.tagline}</p>
      )}
      <div className="mt-3 flex items-center gap-3 text-xs text-(--color-muted)">
        {course.studyHours && <span>{course.studyHours}h Study</span>}
        {course.difficulty && (
          <>
            <span aria-hidden>·</span>
            <span>{course.difficulty}</span>
          </>
        )}
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-(--color-border) pt-4">
        <span className="text-sm font-semibold text-(--color-primary)">
          {formatINR(course.price)}
        </span>
        <span className="text-xs font-medium text-(--color-primary)">View Course Details →</span>
      </div>
    </Link>
  );
}
