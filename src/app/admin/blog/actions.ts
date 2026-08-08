"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function parsePostForm(formData: FormData) {
  return {
    slug: String(formData.get("slug")).trim(),
    title: String(formData.get("title")).trim(),
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    content: String(formData.get("content") ?? "").trim(),
    coverImage: String(formData.get("coverImage") ?? "").trim() || null,
    category: String(formData.get("category") ?? "").trim() || null,
    readMinutes: formData.get("readMinutes") ? Number(formData.get("readMinutes")) : null,
    courseId: String(formData.get("courseId") ?? "") || null,
    published: formData.get("published") === "on",
  };
}

export async function createPost(formData: FormData) {
  const data = parsePostForm(formData);
  await prisma.blogPost.create({ data });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog?saved=1");
}

export async function updatePost(id: string, formData: FormData) {
  const data = parsePostForm(formData);
  await prisma.blogPost.update({ where: { id }, data });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${data.slug}`);
  redirect("/admin/blog?saved=1");
}

export async function deletePost(id: string) {
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}
