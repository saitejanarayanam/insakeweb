import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Blog",
  description: "Certification guides, exam prep tips, and career advice from inSAKE.",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  const allPosts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  const categories = Array.from(
    new Set(allPosts.map((p) => p.category).filter((c): c is string => Boolean(c)))
  ).sort();

  const posts = category ? allPosts.filter((p) => p.category === category) : allPosts;

  return (
    <div>
      <PageHero
        eyebrow="Knowledge Hub"
        title="Insights & Resources"
        description="Expert articles on cybersecurity, certifications, finance, and career growth."
      />

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-wrap gap-2">
          <Link
            href="/blog"
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
              key={c}
              href={`/blog?category=${encodeURIComponent(c)}`}
              className={`rounded-full border px-3 py-1.5 text-sm font-medium ${
                category === c
                  ? "border-(--color-primary) bg-(--color-primary) text-white"
                  : "border-(--color-border) hover:bg-(--color-surface)"
              }`}
            >
              {c}
            </Link>
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="flex flex-col rounded-2xl border border-(--color-border) p-5 transition hover:border-(--color-primary) hover:shadow-lg hover:shadow-(--color-primary)/10"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs text-(--color-muted)">
                {post.category && (
                  <span className="rounded-full bg-(--color-surface) px-2.5 py-0.5 font-medium text-(--color-primary)">
                    {post.category}
                  </span>
                )}
                {post.readMinutes && <span>{post.readMinutes} min read</span>}
              </div>
              <h2 className="mt-2 text-lg font-semibold">{post.title}</h2>
              <p className="mt-2 text-sm text-(--color-muted)">{post.excerpt}</p>
              <div className="mt-3 text-xs text-(--color-muted)">
                inSAKE Academy ·{" "}
                {post.publishedAt.toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </Link>
          ))}
          {posts.length === 0 && (
            <p className="col-span-full text-center text-(--color-muted)">No articles published yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
