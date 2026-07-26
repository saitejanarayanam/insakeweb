import { prisma } from "@/lib/prisma";
import { createTestimonial, deleteTestimonial } from "./actions";

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="text-2xl font-bold">Testimonials</h1>

      <form action={createTestimonial} className="mt-6 max-w-lg space-y-3 rounded-2xl border border-(--color-border) p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            name="name"
            placeholder="Name"
            required
            className="rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
          />
          <input
            name="role"
            placeholder="Role (optional)"
            className="rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
          />
        </div>
        <textarea
          name="quote"
          placeholder="Quote"
          required
          rows={2}
          className="w-full rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
        />
        <button
          type="submit"
          className="rounded-full bg-(--color-primary) px-5 py-2 text-sm font-semibold text-white hover:bg-(--color-primary-dark)"
        >
          Add testimonial
        </button>
      </form>

      <div className="mt-6 space-y-3">
        {testimonials.map((t) => (
          <div key={t.id} className="flex items-start justify-between rounded-2xl border border-(--color-border) p-4">
            <div>
              <p className="text-sm">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-1 text-xs text-(--color-muted)">
                {t.name}
                {t.role ? ` — ${t.role}` : ""}
              </p>
            </div>
            <form action={deleteTestimonial.bind(null, t.id)}>
              <button type="submit" className="text-sm text-red-500 hover:underline">
                Delete
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
