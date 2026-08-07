import "dotenv/config";
import { prisma } from "../src/lib/prisma";

// Publishes today's still-unreviewed drafts (published:false, created earlier today).
// Deliberately scoped to today only, so an admin's own long-standing draft
// from a previous day is never swept up and force-published.
async function main() {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const drafts = await prisma.blogPost.findMany({
    where: { published: false, publishedAt: { gte: startOfToday } },
    orderBy: { publishedAt: "asc" },
  });

  if (drafts.length === 0) {
    console.log("No unreviewed drafts from today. Nothing to auto-publish.");
    return;
  }

  for (const post of drafts) {
    await prisma.blogPost.update({ where: { id: post.id }, data: { published: true } });
    console.log(`Auto-published: "${post.title}" (/blog/${post.slug})`);
  }

  console.log(`\n${drafts.length} post(s) auto-published (weren't reviewed by the end-of-day cutoff).`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
