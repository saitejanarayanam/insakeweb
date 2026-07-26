"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function createTestimonial(formData: FormData) {
  await prisma.testimonial.create({
    data: {
      name: String(formData.get("name")).trim(),
      role: String(formData.get("role") ?? "").trim() || null,
      quote: String(formData.get("quote")).trim(),
    },
  });
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function deleteTestimonial(id: string) {
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}
