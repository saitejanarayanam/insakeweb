import { prisma } from "@/lib/prisma";
import { PostForm } from "../PostForm";
import { createPost } from "../actions";

export default async function NewPostPage() {
  const courses = await prisma.course.findMany({ orderBy: { title: "asc" } });

  return (
    <div>
      <h1 className="text-2xl font-bold">New blog post</h1>
      <div className="mt-6">
        <PostForm courses={courses} action={createPost} />
      </div>
    </div>
  );
}
