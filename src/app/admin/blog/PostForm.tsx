import type { BlogPost, Course } from "@/generated/prisma/client";

export function PostForm({
  post,
  courses,
  action,
}: {
  post?: BlogPost;
  courses: Course[];
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium">Title</label>
          <input
            name="title"
            required
            defaultValue={post?.title}
            className="mt-1 w-full rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Slug</label>
          <input
            name="slug"
            required
            defaultValue={post?.slug}
            className="mt-1 w-full rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Excerpt</label>
        <textarea
          name="excerpt"
          rows={2}
          defaultValue={post?.excerpt}
          className="mt-1 w-full rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Cover image URL</label>
        <input
          name="coverImage"
          type="url"
          placeholder="https://…"
          defaultValue={post?.coverImage ?? ""}
          className="mt-1 w-full rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Content (markdown-ish)</label>
        <textarea
          name="content"
          rows={8}
          defaultValue={post?.content}
          className="mt-1 w-full rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm font-mono outline-none focus:border-(--color-primary)"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium">Category</label>
          <input
            name="category"
            defaultValue={post?.category ?? ""}
            placeholder="e.g. IT Audit & Governance"
            className="mt-1 w-full rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Read time (minutes)</label>
          <input
            name="readMinutes"
            type="number"
            min="0"
            defaultValue={post?.readMinutes ?? undefined}
            className="mt-1 w-full rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium">Related course</label>
          <select
            name="courseId"
            defaultValue={post?.courseId ?? ""}
            className="mt-1 w-full rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
          >
            <option value="">—</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2 pt-6">
          <input
            id="published"
            name="published"
            type="checkbox"
            defaultChecked={post?.published ?? true}
            className="h-4 w-4"
          />
          <label htmlFor="published" className="text-sm font-medium">
            Published
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="rounded-full bg-(--color-primary) px-6 py-3 text-sm font-semibold text-white hover:bg-(--color-primary-dark)"
      >
        {post ? "Save changes" : "Create post"}
      </button>
    </form>
  );
}
