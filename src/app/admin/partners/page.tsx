import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createPartner, deletePartner } from "./actions";
import { AdminSearchBox } from "@/components/admin/AdminSearchBox";
import { ConfirmDeleteButton } from "@/components/admin/ConfirmDeleteButton";
import { SavedBanner } from "@/components/admin/SavedBanner";
import { SubmitButton } from "@/components/admin/SubmitButton";

export default async function AdminPartnersPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const partners = await prisma.partnerInstitution.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <SavedBanner show={saved === "1"} />
      <h1 className="text-2xl font-bold">Partner institutions</h1>

      <form action={createPartner} className="mt-6 flex max-w-lg gap-3">
        <label htmlFor="partner-name" className="sr-only">
          Institution name
        </label>
        <input
          id="partner-name"
          name="name"
          placeholder="Institution name"
          required
          className="flex-1 rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
        />
        <SubmitButton className="rounded-full bg-(--color-primary) px-5 py-2 text-sm font-semibold text-white hover:bg-(--color-primary-dark)">
          Add
        </SubmitButton>
      </form>

      <AdminSearchBox scope="partners" placeholder="Search partners..." />

      <div className="mt-4 flex max-w-lg flex-wrap gap-2" data-search-scope="partners">
        {partners.map((p) => (
          <div
            key={p.id}
            data-search-row
            className="flex items-center gap-2 rounded-full border border-(--color-border) px-3 py-1.5 text-sm"
          >
            {p.name}
            <Link href={`/admin/partners/${p.id}`} className="text-(--color-muted) hover:text-(--color-primary)">
              Edit
            </Link>
            <form action={deletePartner.bind(null, p.id)}>
              <ConfirmDeleteButton
                confirmMessage={`Remove partner "${p.name}"?`}
                className="text-(--color-muted) hover:text-red-500"
              >
                ×
              </ConfirmDeleteButton>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
