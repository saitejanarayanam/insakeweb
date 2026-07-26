import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { formatINR } from "@/lib/format";

export const metadata: Metadata = { title: "Admin" };

export default async function AdminOverviewPage() {
  const [courseCount, postCount, userCount, orders] = await Promise.all([
    prisma.course.count(),
    prisma.blogPost.count(),
    prisma.user.count(),
    prisma.order.findMany({ where: { status: "PAID" } }),
  ]);

  const revenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  const stats = [
    { label: "Courses", value: courseCount, href: "/admin/courses" },
    { label: "Blog posts", value: postCount, href: "/admin/blog" },
    { label: "Users", value: userCount, href: null },
    { label: "Revenue (paid orders)", value: formatINR(revenue), href: "/admin/orders" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">Admin overview</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const content = (
            <div className="rounded-2xl border border-(--color-border) p-5">
              <div className="text-xs text-(--color-muted)">{s.label}</div>
              <div className="mt-1 text-2xl font-bold text-(--color-primary)">{s.value}</div>
            </div>
          );
          return s.href ? (
            <Link key={s.label} href={s.href}>
              {content}
            </Link>
          ) : (
            <div key={s.label}>{content}</div>
          );
        })}
      </div>
    </div>
  );
}
