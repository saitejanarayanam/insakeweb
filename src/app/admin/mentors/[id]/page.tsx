import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateMentor } from "../actions";

export default async function EditMentorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const mentor = await prisma.mentor.findUnique({ where: { id } });
  if (!mentor) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold">Edit mentor</h1>

      <form
        action={updateMentor.bind(null, id)}
        className="mt-6 max-w-lg space-y-3 rounded-2xl border border-(--color-border) p-5"
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            name="name"
            placeholder="Name"
            defaultValue={mentor.name}
            required
            className="rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
          />
          <input
            name="title"
            placeholder="Title"
            defaultValue={mentor.title}
            required
            className="rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
          />
        </div>
        <input
          name="company"
          placeholder="Company (optional)"
          defaultValue={mentor.company ?? ""}
          className="w-full rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
        />
        <input
          name="photoUrl"
          type="url"
          placeholder="Photo URL (optional)"
          defaultValue={mentor.photoUrl ?? ""}
          className="w-full rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
        />
        <textarea
          name="bio"
          placeholder="Bio"
          defaultValue={mentor.bio}
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
