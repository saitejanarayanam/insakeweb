import Link from "next/link";
import Image from "next/image";
import { formatINR } from "@/lib/format";

export type CourseCardData = {
  slug: string;
  title: string;
  tagline: string | null;
  price: number;
  studyHours: number | null;
  difficulty: string | null;
  featured: boolean;
  imageUrl: string | null;
  category?: { name: string; slug: string } | null;
};

export function CourseCard({ course }: { course: CourseCardData }) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="flex flex-col rounded-2xl border border-(--color-border) bg-(--background) overflow-hidden transition hover:-translate-y-0.5 hover:border-(--color-primary) hover:shadow-lg hover:shadow-(--color-primary)/10"
    >
      <div className="relative aspect-[21/9] w-full shrink-0 overflow-hidden bg-(--color-surface)">
        {course.imageUrl ? (
          <Image
            src={course.imageUrl}
            alt={course.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="h-full w-full bg-(--color-surface)" />
        )}
        {course.featured && (
          <span className="absolute right-3 top-3 rounded-full bg-(--background)/90 px-2.5 py-0.5 text-xs font-medium text-(--color-primary) backdrop-blur">
            ✨ Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        {course.category && (
          <span className="w-fit rounded-full bg-(--color-surface) px-2.5 py-0.5 text-xs font-medium text-(--color-muted)">
            {course.category.name}
          </span>
        )}
        <h3 className="mt-2 line-clamp-1 text-base font-semibold">{course.title}</h3>
        <p className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm text-(--color-muted)">
          {course.tagline}
        </p>
        <div className="mt-3 flex min-h-[1em] items-center gap-3 text-xs text-(--color-muted)">
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
      </div>
    </Link>
  );
}
