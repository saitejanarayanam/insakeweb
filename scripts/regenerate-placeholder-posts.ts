import "dotenv/config";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { prisma } from "../src/lib/prisma";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("Missing GEMINI_API_KEY in .env.local");
  process.exit(1);
}

const TEXT_MODEL = "gemini-flash-latest";
const IMAGE_MODEL = "gemini-2.5-flash-image";
const API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";
const PUBLIC_BLOG_DIR = path.join(process.cwd(), "public", "blog");

const RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    content: { type: "string" },
    imagePrompts: { type: "array", items: { type: "string" }, minItems: 2, maxItems: 2 },
  },
  required: ["content", "imagePrompts"],
};

async function generateText(post: { title: string; excerpt: string; category: string | null }, course: {
  title: string;
  tagline: string | null;
  description: string;
  price: number;
  studyHours: number | null;
  difficulty: string | null;
  categoryName: string | null;
}) {
  const priceINR = (course.price / 100).toLocaleString("en-IN");
  const prompt = `You are the content lead for Insake, an India-focused professional certification and upskilling platform. Write the full article body for a blog post that ALREADY has this exact title and excerpt (do not change them, just deliver the body that matches):

Title: ${post.title}
Excerpt: ${post.excerpt}
Category label: ${post.category ?? course.categoryName ?? "n/a"}

Course this post promotes:
- Title: ${course.title}
- Tagline: ${course.tagline ?? "n/a"}
- Description: ${course.description}
- Price: ₹${priceINR}
- Study hours: ${course.studyHours ?? "n/a"}
- Difficulty: ${course.difficulty ?? "n/a"}

Be concrete, confident, and India-relevant (INR figures, Indian job market). Avoid generic AI-blog cliches. Never mention this is AI-generated.

Output requirements for "content" (markdown, 550-800 words):
- Use "## " for 3-5 section headings (no top-level "# ", the title is shown separately).
- Use "- " bullet lists where they aid scannability.
- Insert exactly two image lines at natural points, formatted exactly as:
  ![short descriptive alt text](IMAGE_1)
  ![short descriptive alt text](IMAGE_2)
- End with a short, energetic closing paragraph that transitions naturally into enrolling (the page already renders a "Related course" enroll box right after the content — do not fabricate a fake button or link yourself).

Also provide "imagePrompts": two detailed prompts for an AI illustrator, one per image line above, in order. Professional, modern, flat-illustration or photo-realistic editorial style, violet/blue brand palette, NO text/letters/numbers/logos rendered in the image itself.`;

  const res = await fetch(`${API_BASE}/${TEXT_MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json", responseSchema: RESPONSE_SCHEMA },
    }),
  });
  if (!res.ok) throw new Error(`Gemini text call failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  const raw = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!raw) throw new Error("Gemini text call returned no content");
  return JSON.parse(raw) as { content: string; imagePrompts: [string, string] };
}

async function generateImage(prompt: string): Promise<Buffer | null> {
  try {
    const res = await fetch(`${API_BASE}/${IMAGE_MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    });
    if (!res.ok) {
      console.warn(`  image generation unavailable (${res.status}), falling back to course image`);
      return null;
    }
    const data = await res.json();
    const part = data.candidates?.[0]?.content?.parts?.find((p: { inlineData?: unknown }) => p.inlineData);
    if (!part?.inlineData?.data) return null;
    return Buffer.from(part.inlineData.data, "base64");
  } catch (err) {
    console.warn("  image generation error, falling back to course image:", (err as Error).message);
    return null;
  }
}

async function main() {
  await mkdir(PUBLIC_BLOG_DIR, { recursive: true });

  const posts = await prisma.blogPost.findMany({
    where: { content: { contains: "This is placeholder article content" } },
    include: { course: { include: { category: true } } },
  });

  if (posts.length === 0) {
    console.log("No placeholder posts found.");
    return;
  }

  console.log(`Found ${posts.length} placeholder post(s).\n`);
  let done = 0;

  for (const post of posts) {
    if (!post.course) {
      console.warn(`Skipping "${post.title}" — no linked course.`);
      continue;
    }
    console.log(`Regenerating "${post.title}"...`);

    const result = await generateText(
      { title: post.title, excerpt: post.excerpt, category: post.category },
      {
        title: post.course.title,
        tagline: post.course.tagline,
        description: post.course.description,
        price: post.course.price,
        studyHours: post.course.studyHours,
        difficulty: post.course.difficulty,
        categoryName: post.course.category?.name ?? null,
      },
    );

    let content = result.content;
    let coverImage = post.course.imageUrl ?? post.coverImage;

    const img1 = await generateImage(result.imagePrompts[0]);
    if (img1) {
      const file = `${post.slug}-1.png`;
      await writeFile(path.join(PUBLIC_BLOG_DIR, file), img1);
      coverImage = `/blog/${file}`;
      content = content.replace("(IMAGE_1)", `(/blog/${file})`);
    } else {
      content = content
        .split("\n")
        .filter((line) => !line.includes("(IMAGE_1)"))
        .join("\n");
    }

    const img2 = await generateImage(result.imagePrompts[1]);
    if (img2) {
      const file = `${post.slug}-2.png`;
      await writeFile(path.join(PUBLIC_BLOG_DIR, file), img2);
      content = content.replace("(IMAGE_2)", `(/blog/${file})`);
    } else {
      content = content
        .split("\n")
        .filter((line) => !line.includes("(IMAGE_2)"))
        .join("\n");
    }

    await prisma.blogPost.update({
      where: { id: post.id },
      data: { content, coverImage },
    });

    done += 1;
    console.log(`  Updated (${done}/${posts.length}). Cover: ${coverImage}\n`);
  }

  console.log(`Done. ${done} post(s) regenerated with real content.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
