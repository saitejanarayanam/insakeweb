import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatINR } from "@/lib/format";
import { deleteCourse } from "./actions";

export default async function AdminCoursesPage() {
  const courses = await prisma.course.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Courses</h1>
        <Link
          href="/admin/courses/new"
          className="rounded-full bg-(--color-primary) px-4 py-2 text-sm font-semibold text-white hover:bg-(--color-primary-dark)"
        >
          New course
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-(--color-border)">
        <table className="w-full text-left text-sm">
          <thead className="bg-(--color-surface) text-xs uppercase text-(--color-muted)">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Published</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c) => (
              <tr key={c.id} className="border-t border-(--color-border)">
                <td className="px-4 py-3 font-medium">{c.title}</td>
                <td className="px-4 py-3 text-(--color-muted)">{c.category?.name ?? "—"}</td>
                <td className="px-4 py-3">{formatINR(c.price)}</td>
                <td className="px-4 py-3">{c.published ? "Yes" : "No"}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-3">
                    <Link href={`/admin/courses/${c.id}`} className="text-(--color-primary) hover:underline">
                      Edit
                    </Link>
                    <form action={deleteCourse.bind(null, c.id)}>
                      <button type="submit" className="text-red-500 hover:underline">
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {courses.length === 0 && (
          <p className="p-6 text-center text-(--color-muted)">No courses yet.</p>
        )}
      </div>
    </div>
  );
}
