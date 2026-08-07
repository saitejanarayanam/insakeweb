"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function markContactMessageRead(id: string) {
  await prisma.contactMessage.update({ where: { id }, data: { read: true } });
  revalidatePath("/admin/contact");
}

export async function deleteContactMessage(id: string) {
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/admin/contact");
}
