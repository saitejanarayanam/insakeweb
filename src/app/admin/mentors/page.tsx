import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createMentor, deleteMentor } from "./actions";
import { AdminSearchBox } from "@/components/admin/AdminSearchBox";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ConfirmDeleteButton } from "@/components/admin/ConfirmDeleteButton";
import { SavedBanner } from "@/components/admin/SavedBanner";
import { SubmitButton } from "@/components/admin/SubmitButton";

export default async function AdminMentorsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const mentors = await prisma.mentor.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <SavedBanner show={saved === "1"} />
      <h1 className="text-2xl font-bold">Mentors</h1>

      <form action={createMentor} className="mt-6 max-w-lg space-y-3 rounded-2xl border border-(--color-border) p-5">
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
            <label className="text-sm font-medium">Title</label>
            <input
              name="title"
              required
              className="mt-1 w-full rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">Company (optional)</label>
          <input
            name="company"
            className="mt-1 w-full rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Photo URL (optional)</label>
          <input
            name="photoUrl"
            type="url"
            placeholder="https://…"
            className="mt-1 w-full rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Bio</label>
          <textarea
            name="bio"
            required
            rows={2}
            className="mt-1 w-full rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
          />
        </div>
        <SubmitButton className="rounded-full bg-(--color-primary) px-5 py-2 text-sm font-semibold text-white hover:bg-(--color-primary-dark)">
          Add mentor
        </SubmitButton>
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
                <ConfirmDeleteButton
                  confirmMessage={`Delete mentor "${m.name}"? This can't be undone.`}
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
