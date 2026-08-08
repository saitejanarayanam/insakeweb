import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createTestimonial, deleteTestimonial } from "./actions";
import { AdminSearchBox } from "@/components/admin/AdminSearchBox";
import { ConfirmDeleteButton } from "@/components/admin/ConfirmDeleteButton";
import { SavedBanner } from "@/components/admin/SavedBanner";
import { SubmitButton } from "@/components/admin/SubmitButton";

export default async function AdminTestimonialsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const testimonials = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <SavedBanner show={saved === "1"} />
      <h1 className="text-2xl font-bold">Testimonials</h1>

      <form action={createTestimonial} className="mt-6 max-w-lg space-y-3 rounded-2xl border border-(--color-border) p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              name="name"
              required
              className="mt-1 w-full rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Role (optional)</label>
            <input
              name="role"
              className="mt-1 w-full rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">Quote</label>
          <textarea
            name="quote"
            required
            rows={2}
            className="mt-1 w-full rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
          />
        </div>
        <SubmitButton className="rounded-full bg-(--color-primary) px-5 py-2 text-sm font-semibold text-white hover:bg-(--color-primary-dark)">
          Add testimonial
        </SubmitButton>
      </form>

      <AdminSearchBox scope="testimonials" placeholder="Search testimonials..." />

      <div className="mt-4 space-y-3" data-search-scope="testimonials">
        {testimonials.map((t) => (
          <div key={t.id} data-search-row className="flex items-start justify-between rounded-2xl border border-(--color-border) p-4">
            <div>
              <p className="text-sm">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-1 text-xs text-(--color-muted)">
                {t.name}
                {t.role ? ` — ${t.role}` : ""}
              </p>
            </div>
            <div className="flex shrink-0 gap-3 text-sm">
              <Link href={`/admin/testimonials/${t.id}`} className="text-(--color-primary) hover:underline">
                Edit
              </Link>
              <form action={deleteTestimonial.bind(null, t.id)}>
                <ConfirmDeleteButton
                  confirmMessage={`Delete this testimonial from ${t.name}? This can't be undone.`}
                  className="text-red-500 hover:underline"
                />
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
