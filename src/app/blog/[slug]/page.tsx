import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { SimpleMarkdown } from "@/components/SimpleMarkdown";

async function getPost(slug: string) {
  return prisma.blogPost.findUnique({
    where: { slug, published: true },
    include: { course: true },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <div className="flex flex-wrap items-center gap-2 text-xs text-(--color-muted)">
        {post.category && (
          <span className="rounded-full bg-(--color-surface) px-2.5 py-0.5 font-medium text-(--color-primary)">
            {post.category}
          </span>
        )}
        <span>
          {post.publishedAt.toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        {post.readMinutes && (
          <>
            <span aria-hidden>·</span>
            <span>{post.readMinutes} min read</span>
          </>
        )}
      </div>
      <h1 className="mt-2 text-3xl font-bold">{post.title}</h1>
      <p className="mt-3 text-(--color-muted)">{post.excerpt}</p>

      <div className="mt-8">
        <SimpleMarkdown text={post.content} />
      </div>

      {post.course && (
        <div className="mt-10 rounded-2xl border border-(--color-border) bg-(--color-surface) p-5">
          <p className="text-sm text-(--color-muted)">Related course</p>
          <Link
            href={`/courses/${post.course.slug}`}
            className="mt-1 block text-lg font-semibold text-(--color-primary)"
          >
            {post.course.title} →
          </Link>
        </div>
      )}
    </article>
  );
}
