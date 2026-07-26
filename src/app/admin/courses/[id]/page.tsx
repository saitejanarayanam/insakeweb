import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CourseForm } from "../CourseForm";
import { updateCourse } from "../actions";

export default async function EditCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [course, categories, mentors] = await Promise.all([
    prisma.course.findUnique({ where: { id } }),
    prisma.courseCategory.findMany({ orderBy: { name: "asc" } }),
    prisma.mentor.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!course) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold">Edit course</h1>
      <div className="mt-6">
        <CourseForm
          course={course}
          categories={categories}
          mentors={mentors}
          action={updateCourse.bind(null, id)}
        />
      </div>
    </div>
  );
}
