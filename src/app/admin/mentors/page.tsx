import { prisma } from "@/lib/prisma";
import { createMentor, deleteMentor } from "./actions";

export default async function AdminMentorsPage() {
  const mentors = await prisma.mentor.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="text-2xl font-bold">Mentors</h1>

      <form action={createMentor} className="mt-6 max-w-lg space-y-3 rounded-2xl border border-(--color-border) p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            name="name"
            placeholder="Name"
            required
            className="rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
          />
          <input
            name="title"
            placeholder="Title"
            required
            className="rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
          />
        </div>
        <input
          name="company"
          placeholder="Company (optional)"
          className="w-full rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
        />
        <textarea
          name="bio"
          placeholder="Bio"
          required
          rows={2}
          className="w-full rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
        />
        <button
          type="submit"
          className="rounded-full bg-(--color-primary) px-5 py-2 text-sm font-semibold text-white hover:bg-(--color-primary-dark)"
        >
          Add mentor
        </button>
      </form>

      <div className="mt-6 space-y-3">
        {mentors.map((m) => (
          <div key={m.id} className="flex items-start justify-between rounded-2xl border border-(--color-border) p-4">
            <div>
              <p className="text-sm font-semibold">{m.name}</p>
              <p className="text-xs text-(--color-muted)">
                {m.title}
                {m.company ? `, ${m.company}` : ""}
              </p>
              <p className="mt-1 text-xs text-(--color-muted)">{m.bio}</p>
            </div>
            <form action={deleteMentor.bind(null, m.id)}>
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
