"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function parseCourseForm(formData: FormData) {
  return {
    slug: String(formData.get("slug")).trim(),
    title: String(formData.get("title")).trim(),
    tagline: String(formData.get("tagline") ?? "").trim() || null,
    description: String(formData.get("description") ?? "").trim(),
    syllabus: String(formData.get("syllabus") ?? "").trim(),
    price: Math.round(Number(formData.get("priceRupees") ?? 0) * 100),
    studyHours: formData.get("studyHours") ? Number(formData.get("studyHours")) : null,
    difficulty: String(formData.get("difficulty") ?? "") || null,
    categoryId: String(formData.get("categoryId") ?? "") || null,
    mentorId: String(formData.get("mentorId") ?? "") || null,
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
  };
}

export async function createCourse(formData: FormData) {
  const data = parseCourseForm(formData);
  await prisma.course.create({ data });
  revalidatePath("/admin/courses");
  revalidatePath("/courses");
  redirect("/admin/courses");
}

export async function updateCourse(id: string, formData: FormData) {
  const data = parseCourseForm(formData);
  await prisma.course.update({ where: { id }, data });
  revalidatePath("/admin/courses");
  revalidatePath("/courses");
  revalidatePath(`/courses/${data.slug}`);
  redirect("/admin/courses");
}

export async function deleteCourse(id: string) {
  await prisma.course.delete({ where: { id } });
  revalidatePath("/admin/courses");
  revalidatePath("/courses");
}
