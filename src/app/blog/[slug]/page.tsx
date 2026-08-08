import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { SimpleMarkdown } from "@/components/SimpleMarkdown";
import { JsonLd } from "@/components/JsonLd";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

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
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt.toISOString(),
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const postUrl = `${BASE_URL}/blog/${post.slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: postUrl,
    datePublished: post.publishedAt.toISOString(),
    dateModified: post.publishedAt.toISOString(),
    ...(post.coverImage
      ? { image: post.coverImage.startsWith("http") ? post.coverImage : `${BASE_URL}${post.coverImage}` }
      : {}),
    author: { "@type": "Organization", name: "inSAKE Academy" },
    publisher: {
      "@type": "Organization",
      name: "inSAKE Academy",
      logo: { "@type": "ImageObject", url: `${BASE_URL}/insake-logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
    ],
  };

  return (
    <article>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      {post.coverImage && (
        <div className="relative h-48 w-full overflow-hidden sm:h-64">
          <Image src={post.coverImage} alt={post.title} fill priority className="object-cover" />
        </div>
      )}
      <div className="mx-auto max-w-3xl px-4 py-12">
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
      </div>
    </article>
  );
}
