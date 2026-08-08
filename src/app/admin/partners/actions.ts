"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function createPartner(formData: FormData) {
  await prisma.partnerInstitution.create({
    data: { name: String(formData.get("name")).trim() },
  });
  revalidatePath("/admin/partners");
  revalidatePath("/");
  redirect("/admin/partners?saved=1");
}

export async function updatePartner(id: string, formData: FormData) {
  await prisma.partnerInstitution.update({
    where: { id },
    data: { name: String(formData.get("name")).trim() },
  });
  revalidatePath("/admin/partners");
  revalidatePath("/");
  redirect("/admin/partners?saved=1");
}

export async function deletePartner(id: string) {
  await prisma.partnerInstitution.delete({ where: { id } });
  revalidatePath("/admin/partners");
  revalidatePath("/");
}
