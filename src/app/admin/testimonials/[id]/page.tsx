import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateTestimonial } from "../actions";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const testimonial = await prisma.testimonial.findUnique({ where: { id } });
  if (!testimonial) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold">Edit testimonial</h1>

      <form
        action={updateTestimonial.bind(null, id)}
        className="mt-6 max-w-lg space-y-3 rounded-2xl border border-(--color-border) p-5"
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            name="name"
            placeholder="Name"
            defaultValue={testimonial.name}
            required
            className="rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
          />
          <input
            name="role"
            placeholder="Role (optional)"
            defaultValue={testimonial.role ?? ""}
            className="rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
          />
        </div>
        <textarea
          name="quote"
          placeholder="Quote"
          defaultValue={testimonial.quote}
          required
          rows={3}
          className="w-full rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
        />
        <button
          type="submit"
          className="rounded-full bg-(--color-primary) px-5 py-2 text-sm font-semibold text-white hover:bg-(--color-primary-dark)"
        >
          Save changes
        </button>
      </form>
    </div>
  );
}
