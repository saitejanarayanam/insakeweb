"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function createMentor(formData: FormData) {
  await prisma.mentor.create({
    data: {
      name: String(formData.get("name")).trim(),
      title: String(formData.get("title")).trim(),
      company: String(formData.get("company") ?? "").trim() || null,
      bio: String(formData.get("bio")).trim(),
      photoUrl: String(formData.get("photoUrl") ?? "").trim() || null,
    },
  });
  revalidatePath("/admin/mentors");
  revalidatePath("/");
  revalidatePath("/about");
  redirect("/admin/mentors?saved=1");
}

export async function updateMentor(id: string, formData: FormData) {
  await prisma.mentor.update({
    where: { id },
    data: {
      name: String(formData.get("name")).trim(),
      title: String(formData.get("title")).trim(),
      company: String(formData.get("company") ?? "").trim() || null,
      bio: String(formData.get("bio")).trim(),
      photoUrl: String(formData.get("photoUrl") ?? "").trim() || null,
    },
  });
  revalidatePath("/admin/mentors");
  revalidatePath("/");
  revalidatePath("/about");
  redirect("/admin/mentors?saved=1");
}

export async function deleteMentor(id: string) {
  await prisma.mentor.delete({ where: { id } });
  revalidatePath("/admin/mentors");
  revalidatePath("/");
  revalidatePath("/about");
}
