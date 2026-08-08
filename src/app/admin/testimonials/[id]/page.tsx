import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateTestimonial } from "../actions";
import { SubmitButton } from "@/components/admin/SubmitButton";

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
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              name="name"
              defaultValue={testimonial.name}
              required
              className="mt-1 w-full rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Role (optional)</label>
            <input
              name="role"
              defaultValue={testimonial.role ?? ""}
              className="mt-1 w-full rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">Quote</label>
          <textarea
            name="quote"
            defaultValue={testimonial.quote}
            required
            rows={3}
            className="mt-1 w-full rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
          />
        </div>
        <SubmitButton className="rounded-full bg-(--color-primary) px-5 py-2 text-sm font-semibold text-white hover:bg-(--color-primary-dark)">
          Save changes
        </SubmitButton>
      </form>
    </div>
  );
}
