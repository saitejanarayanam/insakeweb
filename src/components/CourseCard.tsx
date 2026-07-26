import Link from "next/link";
import { formatINR } from "@/lib/format";

export type CourseCardData = {
  slug: string;
  title: string;
  tagline: string | null;
  price: number;
  studyHours: number | null;
  difficulty: string | null;
  featured: boolean;
  category?: { name: string } | null;
};

export function CourseCard({ course }: { course: CourseCardData }) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="flex flex-col rounded-2xl border border-(--color-border) bg-(--background) p-5 transition hover:-translate-y-0.5 hover:border-(--color-primary) hover:shadow-lg hover:shadow-(--color-primary)/10"
    >
      <div className="flex items-center justify-between gap-2">
        {course.featured ? (
          <span className="w-fit rounded-full bg-(--color-primary)/10 px-2.5 py-0.5 text-xs font-medium text-(--color-primary)">
            ✨ Featured
          </span>
        ) : (
          <span />
        )}
        {course.category && (
          <span className="w-fit rounded-full bg-(--color-surface) px-2.5 py-0.5 text-xs font-medium text-(--color-muted)">
            {course.category.name}
          </span>
        )}
      </div>
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
