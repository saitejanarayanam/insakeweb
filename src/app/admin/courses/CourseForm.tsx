import type { Course, CourseCategory, Mentor } from "@/generated/prisma/client";

export function CourseForm({
  course,
  categories,
  mentors,
  action,
}: {
  course?: Course;
  categories: CourseCategory[];
  mentors: Mentor[];
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
            defaultValue={course?.title}
            className="mt-1 w-full rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Slug</label>
          <input
            name="slug"
            required
            defaultValue={course?.slug}
            className="mt-1 w-full rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Tagline</label>
        <input
          name="tagline"
          defaultValue={course?.tagline ?? ""}
          className="mt-1 w-full rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Description</label>
        <textarea
          name="description"
          required
          rows={3}
          defaultValue={course?.description}
          className="mt-1 w-full rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Image URL</label>
        <input
          name="imageUrl"
          type="url"
          placeholder="https://…"
          defaultValue={course?.imageUrl ?? ""}
          className="mt-1 w-full rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Syllabus (markdown-ish: # heading, - bullet)</label>
        <textarea
          name="syllabus"
          rows={6}
          defaultValue={course?.syllabus}
          className="mt-1 w-full rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm font-mono outline-none focus:border-(--color-primary)"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="text-sm font-medium">Price (₹)</label>
          <input
            name="priceRupees"
            type="number"
            step="1"
            min="0"
            required
            defaultValue={course ? course.price / 100 : undefined}
            className="mt-1 w-full rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Study hours</label>
          <input
            name="studyHours"
            type="number"
            min="0"
            defaultValue={course?.studyHours ?? undefined}
            className="mt-1 w-full rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Difficulty</label>
          <select
            name="difficulty"
            defaultValue={course?.difficulty ?? ""}
            className="mt-1 w-full rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
          >
            <option value="">—</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <input
            id="published"
            name="published"
            type="checkbox"
            defaultChecked={course?.published ?? true}
            className="h-4 w-4"
          />
          <label htmlFor="published" className="text-sm font-medium">
            Published
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            id="featured"
            name="featured"
            type="checkbox"
            defaultChecked={course?.featured ?? true}
            className="h-4 w-4"
          />
          <label htmlFor="featured" className="text-sm font-medium">
            Featured
          </label>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium">Category</label>
          <select
            name="categoryId"
            defaultValue={course?.categoryId ?? ""}
            className="mt-1 w-full rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
          >
            <option value="">—</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">Mentor</label>
          <select
            name="mentorId"
            defaultValue={course?.mentorId ?? ""}
            className="mt-1 w-full rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
          >
            <option value="">—</option>
            {mentors.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="rounded-full bg-(--color-primary) px-6 py-3 text-sm font-semibold text-white hover:bg-(--color-primary-dark)"
      >
        {course ? "Save changes" : "Create course"}
      </button>
    </form>
  );
}
