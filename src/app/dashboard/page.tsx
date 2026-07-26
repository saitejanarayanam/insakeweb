import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ enrolled?: string }>;
}) {
  const { enrolled } = await searchParams;
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/dashboard");
  const userId = session.user.id;

  const enrollments = await prisma.enrollment.findMany({
    where: { userId },
    include: { course: true },
    orderBy: { enrolledAt: "desc" },
  });

  return (
    <div>
      <PageHero eyebrow="Dashboard" title={`Welcome back, ${session.user.name ?? "there"}`} />

      <div className="mx-auto max-w-4xl px-4 py-12">
        {enrolled && (
          <div className="mb-6 rounded-2xl bg-green-50 p-4 text-sm text-green-700">
            Enrollment confirmed — you now have access to your course(s) below.
          </div>
        )}

        <h2 className="text-xl font-bold">My courses</h2>
        {enrollments.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-(--color-border) p-10 text-center">
            <p className="text-(--color-muted)">You haven&apos;t enrolled in any courses yet.</p>
            <Link
              href="/courses"
              className="mt-4 inline-block rounded-full bg-(--color-primary) px-6 py-3 text-sm font-semibold text-white hover:bg-(--color-primary-dark)"
            >
              Browse courses
            </Link>
          </div>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {enrollments.map((e) => (
              <Link
                key={e.id}
                href={`/courses/${e.course.slug}`}
                className="rounded-2xl border border-(--color-border) p-5 hover:border-(--color-primary)"
              >
                <h3 className="font-semibold">{e.course.title}</h3>
                <p className="mt-1 text-xs text-(--color-muted)">
                  Enrolled {e.enrolledAt.toLocaleDateString("en-IN")}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
