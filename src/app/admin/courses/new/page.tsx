import { prisma } from "@/lib/prisma";
import { CourseForm } from "../CourseForm";
import { createCourse } from "../actions";

export default async function NewCoursePage() {
  const [categories, mentors] = await Promise.all([
    prisma.courseCategory.findMany({ orderBy: { name: "asc" } }),
    prisma.mentor.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold">New course</h1>
      <div className="mt-6">
        <CourseForm categories={categories} mentors={mentors} action={createCourse} />
      </div>
    </div>
  );
}
