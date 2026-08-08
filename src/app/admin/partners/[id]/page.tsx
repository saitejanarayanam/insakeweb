import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updatePartner } from "../actions";
import { SubmitButton } from "@/components/admin/SubmitButton";

export default async function EditPartnerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const partner = await prisma.partnerInstitution.findUnique({ where: { id } });
  if (!partner) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold">Edit partner institution</h1>

      <form action={updatePartner.bind(null, id)} className="mt-6 flex max-w-lg gap-3">
        <label htmlFor="partner-name" className="sr-only">
          Institution name
        </label>
        <input
          id="partner-name"
          name="name"
          placeholder="Institution name"
          defaultValue={partner.name}
          required
          className="flex-1 rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
        />
        <SubmitButton className="rounded-full bg-(--color-primary) px-5 py-2 text-sm font-semibold text-white hover:bg-(--color-primary-dark)">
          Save
        </SubmitButton>
      </form>
    </div>
  );
}
