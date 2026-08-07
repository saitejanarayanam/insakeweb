import { prisma } from "@/lib/prisma";
import { createPartner, deletePartner } from "./actions";
import { AdminSearchBox } from "@/components/admin/AdminSearchBox";

export default async function AdminPartnersPage() {
  const partners = await prisma.partnerInstitution.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="text-2xl font-bold">Partner institutions</h1>

      <form action={createPartner} className="mt-6 flex max-w-lg gap-3">
        <input
          name="name"
          placeholder="Institution name"
          required
          className="flex-1 rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
        />
        <button
          type="submit"
          className="rounded-full bg-(--color-primary) px-5 py-2 text-sm font-semibold text-white hover:bg-(--color-primary-dark)"
        >
          Add
        </button>
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
            <form action={deletePartner.bind(null, p.id)}>
              <button type="submit" className="text-(--color-muted) hover:text-red-500">
                ×
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
