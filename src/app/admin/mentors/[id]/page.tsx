import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateMentor } from "../actions";
import { SubmitButton } from "@/components/admin/SubmitButton";

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
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              name="name"
              defaultValue={mentor.name}
              required
              className="mt-1 w-full rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Title</label>
            <input
              name="title"
              defaultValue={mentor.title}
              required
              className="mt-1 w-full rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">Company (optional)</label>
          <input
            name="company"
            defaultValue={mentor.company ?? ""}
            className="mt-1 w-full rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Photo URL (optional)</label>
          <input
            name="photoUrl"
            type="url"
            placeholder="https://…"
            defaultValue={mentor.photoUrl ?? ""}
            className="mt-1 w-full rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Bio</label>
          <textarea
            name="bio"
            defaultValue={mentor.bio}
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
