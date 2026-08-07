import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deletePost } from "./actions";
import { AdminSearchBox } from "@/components/admin/AdminSearchBox";

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { publishedAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Blog posts</h1>
        <Link
          href="/admin/blog/new"
          className="rounded-full bg-(--color-primary) px-4 py-2 text-sm font-semibold text-white hover:bg-(--color-primary-dark)"
        >
          New post
        </Link>
      </div>

      <AdminSearchBox scope="blog" placeholder="Search posts..." />

      <div className="mt-4 overflow-x-auto rounded-2xl border border-(--color-border)" data-search-scope="blog">
        <table className="w-full text-left text-sm">
          <thead className="bg-(--color-surface) text-xs uppercase text-(--color-muted)">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Published</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id} data-search-row className="border-t border-(--color-border)">
                <td className="px-4 py-3 font-medium">{p.title}</td>
                <td className="px-4 py-3">{p.published ? "Yes" : "No"}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-3">
                    <Link href={`/admin/blog/${p.id}`} className="text-(--color-primary) hover:underline">
                      Edit
                    </Link>
                    <form action={deletePost.bind(null, p.id)}>
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
        {posts.length === 0 && <p className="p-6 text-center text-(--color-muted)">No posts yet.</p>}
      </div>
    </div>
  );
}
