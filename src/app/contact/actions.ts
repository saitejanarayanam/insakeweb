"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContactMessage(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message || !EMAIL_RE.test(email)) {
    redirect("/contact?error=1");
  }

  await prisma.contactMessage.create({ data: { name, email, message } });
  revalidatePath("/admin/contact");
  redirect("/contact?sent=1");
}
