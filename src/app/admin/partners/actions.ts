"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function createPartner(formData: FormData) {
  await prisma.partnerInstitution.create({
    data: { name: String(formData.get("name")).trim() },
  });
  revalidatePath("/admin/partners");
  revalidatePath("/");
}

export async function deletePartner(id: string) {
  await prisma.partnerInstitution.delete({ where: { id } });
  revalidatePath("/admin/partners");
  revalidatePath("/");
}
