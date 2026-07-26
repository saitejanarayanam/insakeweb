"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function createMentor(formData: FormData) {
  await prisma.mentor.create({
    data: {
      name: String(formData.get("name")).trim(),
      title: String(formData.get("title")).trim(),
      company: String(formData.get("company") ?? "").trim() || null,
      bio: String(formData.get("bio")).trim(),
    },
  });
  revalidatePath("/admin/mentors");
  revalidatePath("/");
  revalidatePath("/about");
}

export async function deleteMentor(id: string) {
  await prisma.mentor.delete({ where: { id } });
  revalidatePath("/admin/mentors");
  revalidatePath("/");
  revalidatePath("/about");
}
