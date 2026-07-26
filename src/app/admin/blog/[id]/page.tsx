import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PostForm } from "../PostForm";
import { updatePost } from "../actions";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [post, courses] = await Promise.all([
    prisma.blogPost.findUnique({ where: { id } }),
    prisma.course.findMany({ orderBy: { title: "asc" } }),
  ]);

  if (!post) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold">Edit blog post</h1>
      <div className="mt-6">
        <PostForm post={post} courses={courses} action={updatePost.bind(null, id)} />
      </div>
    </div>
  );
}
