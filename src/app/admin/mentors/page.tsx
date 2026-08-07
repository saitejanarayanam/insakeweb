import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createMentor, deleteMentor } from "./actions";
import { AdminSearchBox } from "@/components/admin/AdminSearchBox";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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
        <input
          name="photoUrl"
          type="url"
          placeholder="Photo URL (optional)"
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

      <AdminSearchBox scope="mentors" placeholder="Search mentors..." />

      <div className="mt-4 space-y-3" data-search-scope="mentors">
        {mentors.map((m) => (
          <div key={m.id} data-search-row className="flex items-start justify-between rounded-2xl border border-(--color-border) p-4">
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10">
                {m.photoUrl && <AvatarImage src={m.photoUrl} alt={m.name} />}
                <AvatarFallback>{m.name.slice(0, 1).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold">{m.name}</p>
                <p className="text-xs text-(--color-muted)">
                  {m.title}
                  {m.company ? `, ${m.company}` : ""}
                </p>
                <p className="mt-1 text-xs text-(--color-muted)">{m.bio}</p>
              </div>
            </div>
            <div className="flex shrink-0 gap-3 text-sm">
              <Link href={`/admin/mentors/${m.id}`} className="text-(--color-primary) hover:underline">
                Edit
              </Link>
              <form action={deleteMentor.bind(null, m.id)}>
                <button type="submit" className="text-red-500 hover:underline">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
