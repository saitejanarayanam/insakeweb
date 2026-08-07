import "dotenv/config";
import { writeFile, mkdir, readFile } from "node:fs/promises";
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

const COUNT = Number(process.argv.find((a) => a.startsWith("--count="))?.split("=")[1] ?? 2);
const STATE_PATH = path.join(process.cwd(), ".data", "blog-generator-state.json");
const OUTPUT_DIR = path.join(process.cwd(), "scripts", "output", new Date().toISOString().slice(0, 10));
const PUBLIC_BLOG_DIR = path.join(process.cwd(), "public", "blog");

const ANGLES = [
  "myth_buster",
  "case_study",
  "step_by_step_roadmap",
  "comparison",
  "faq_deep_dive",
  "day_in_the_life",
  "salary_career_impact",
  "common_mistakes",
] as const;

type Angle = (typeof ANGLES)[number];

type GeneratorState = Record<string, { lastAngles: Angle[]; lastRun: string }>;

const RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    title: { type: "string" },
    slug: { type: "string" },
    excerpt: { type: "string" },
    category: { type: "string" },
    readMinutes: { type: "integer" },
    content: { type: "string" },
    imagePrompts: { type: "array", items: { type: "string" }, minItems: 2, maxItems: 2 },
    social: {
      type: "object",
      properties: {
        instagram: { type: "string" },
        linkedin: { type: "string" },
        x: { type: "string" },
        facebook: { type: "string" },
      },
      required: ["instagram", "linkedin", "x", "facebook"],
    },
  },
  required: ["title", "slug", "excerpt", "category", "readMinutes", "content", "imagePrompts", "social"],
};

async function loadState(): Promise<GeneratorState> {
  try {
    return JSON.parse(await readFile(STATE_PATH, "utf8"));
  } catch {
    return {};
  }
}

async function saveState(state: GeneratorState) {
  await mkdir(path.dirname(STATE_PATH), { recursive: true });
  await writeFile(STATE_PATH, JSON.stringify(state, null, 2));
}

function pickAngle(state: GeneratorState, courseId: string): Angle {
  const recent = state[courseId]?.lastAngles ?? [];
  const fresh = ANGLES.filter((a) => !recent.includes(a));
  const pool = fresh.length > 0 ? fresh : ANGLES;
  return pool[Math.floor(Math.random() * pool.length)];
}

function recordAngle(state: GeneratorState, courseId: string, angle: Angle) {
  const recent = state[courseId]?.lastAngles ?? [];
  state[courseId] = {
    lastAngles: [angle, ...recent].slice(0, 3),
    lastRun: new Date().toISOString(),
  };
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const ANGLE_BRIEF: Record<Angle, string> = {
  myth_buster: "Open by naming 3-4 common misconceptions about this certification/program and correct each one with facts.",
  case_study: "Tell it through a specific, plausible day-in-the-career story of an Indian professional who pursued this path — struggles, turning point, outcome.",
  step_by_step_roadmap: "Lay out a concrete week-by-week or phase-by-phase preparation roadmap someone could actually follow.",
  comparison: "Compare this certification/program against 1-2 adjacent alternatives professionals often confuse it with, and give a clear 'pick this if...' verdict.",
  faq_deep_dive: "Structure around the 4-5 real questions prospective learners actually ask (eligibility, cost, time, ROI, difficulty), answered directly and specifically.",
  day_in_the_life: "Describe what someone in this role/certification actually does day-to-day, grounded in real responsibilities, to show the payoff of the credential.",
  salary_career_impact: "Center on concrete India-market salary bands, promotion timelines, and career trajectory this credential unlocks.",
  common_mistakes: "List the most common mistakes candidates make while preparing or applying, and what to do instead.",
};

async function generateText(course: {
  title: string;
  tagline: string | null;
  description: string;
  price: number;
  studyHours: number | null;
  difficulty: string | null;
  slug: string;
  categoryName: string | null;
}, angle: Angle) {
  const priceINR = (course.price / 100).toLocaleString("en-IN");
  const prompt = `You are the content lead for Insake, an India-focused professional certification and upskilling platform. Write ONE blog post promoting the course below. Do not sound like every other post — this is post ${Math.random().toString(36).slice(2, 6)} in a series, so pick a distinctive, punchy opening hook and vary sentence rhythm. Avoid generic AI-blog cliches ("In today's fast-paced world...", "Unlock your potential..."). Be concrete, confident, and India-relevant (mention INR figures, Indian job market where natural). Never mention that this is AI-generated.

Course:
- Title: ${course.title}
- Tagline: ${course.tagline ?? "n/a"}
- Category: ${course.categoryName ?? "n/a"}
- Description: ${course.description}
- Price: ₹${priceINR}
- Study hours: ${course.studyHours ?? "n/a"}
- Difficulty: ${course.difficulty ?? "n/a"}

Required angle for this post: ${angle.replace(/_/g, " ")}. ${ANGLE_BRIEF[angle]}

Output requirements for the "content" field (markdown, 550-800 words):
- Use "## " for 3-5 section headings (no top-level "# " heading, the title is shown separately).
- Use "- " bullet lists where they aid scannability.
- Insert exactly two image lines at natural points in the flow, formatted exactly as:
  ![short descriptive alt text](IMAGE_1)
  ![short descriptive alt text](IMAGE_2)
- End with a short, energetic closing paragraph that transitions naturally into enrolling (the page already renders a "Related course" enroll box right after the content, so do not fabricate a fake button or link yourself).

Also provide:
- "imagePrompts": two detailed prompts for an AI illustrator, one per image line above, in the same order. Professional, modern, flat-illustration or photo-realistic editorial style, violet/blue brand palette, NO text/letters/numbers/logos rendered in the image itself.
- "social": one ready-to-post caption per platform (plain text, include 3-6 relevant hashtags inline at the end of each, no markdown):
  - "instagram": punchy, emoji-friendly, <=150 words
  - "linkedin": professional tone, career-framed, <=150 words
  - "x": <=280 characters total including hashtags
  - "facebook": conversational, <=120 words
- "slug": kebab-case, seo-friendly, based on the title, no year unless it reads naturally.
- "excerpt": one compelling sentence, <=160 characters.
- "category": a short human-readable category label for this post.
- "readMinutes": integer estimate.`;

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
  return JSON.parse(raw) as {
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    readMinutes: number;
    content: string;
    imagePrompts: [string, string];
    social: { instagram: string; linkedin: string; x: string; facebook: string };
  };
}

async function generateImage(prompt: string): Promise<Buffer | null> {
  try {
    const res = await fetch(`${API_BASE}/${IMAGE_MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    });
    if (!res.ok) {
      console.warn(`  image generation unavailable (${res.status}), will fall back`);
      return null;
    }
    const data = await res.json();
    const part = data.candidates?.[0]?.content?.parts?.find((p: { inlineData?: unknown }) => p.inlineData);
    if (!part?.inlineData?.data) return null;
    return Buffer.from(part.inlineData.data, "base64");
  } catch (err) {
    console.warn("  image generation error, will fall back:", (err as Error).message);
    return null;
  }
}

async function ensureUniqueSlug(base: string): Promise<string> {
  let slug = slugify(base) || `post-${Date.now()}`;
  let n = 2;
  while (await prisma.blogPost.findUnique({ where: { slug } })) {
    slug = `${slugify(base)}-${n}`;
    n += 1;
  }
  return slug;
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });
  await mkdir(PUBLIC_BLOG_DIR, { recursive: true });

  const courses = await prisma.course.findMany({
    where: { published: true },
    include: { category: true, _count: { select: { blogPosts: true } } },
    orderBy: [{ createdAt: "asc" }],
  });
  courses.sort((a, b) => a._count.blogPosts - b._count.blogPosts);
  const targets = courses.slice(0, COUNT);

  if (targets.length === 0) {
    console.log("No published courses found.");
    return;
  }

  const state = await loadState();
  const results: { title: string; slug: string; id: string; course: string }[] = [];

  for (const course of targets) {
    const angle = pickAngle(state, course.id);
    console.log(`\nGenerating post for "${course.title}" (angle: ${angle})...`);

    const post = await generateText(
      {
        title: course.title,
        tagline: course.tagline,
        description: course.description,
        price: course.price,
        studyHours: course.studyHours,
        difficulty: course.difficulty,
        slug: course.slug,
        categoryName: course.category?.name ?? null,
      },
      angle,
    );

    const slug = await ensureUniqueSlug(post.slug || post.title);

    let content = post.content;
    let coverImage = course.imageUrl ?? "/insake-logo.png";

    const img1 = await generateImage(post.imagePrompts[0]);
    if (img1) {
      const file = `${slug}-1.png`;
      await writeFile(path.join(PUBLIC_BLOG_DIR, file), img1);
      coverImage = `/blog/${file}`;
      content = content.replace("(IMAGE_1)", `(/blog/${file})`);
    } else {
      content = content
        .split("\n")
        .filter((line) => !line.includes("(IMAGE_1)"))
        .join("\n");
    }

    const img2 = await generateImage(post.imagePrompts[1]);
    if (img2) {
      const file = `${slug}-2.png`;
      await writeFile(path.join(PUBLIC_BLOG_DIR, file), img2);
      content = content.replace("(IMAGE_2)", `(/blog/${file})`);
    } else {
      content = content
        .split("\n")
        .filter((line) => !line.includes("(IMAGE_2)"))
        .join("\n");
    }

    const created = await prisma.blogPost.create({
      data: {
        slug,
        title: post.title,
        excerpt: post.excerpt,
        content,
        coverImage,
        category: post.category,
        readMinutes: post.readMinutes,
        published: false,
        courseId: course.id,
      },
    });

    recordAngle(state, course.id, angle);
    results.push({ title: post.title, slug, id: created.id, course: course.title });

    const captionsFile = path.join(OUTPUT_DIR, `${slug}.md`);
    await writeFile(
      captionsFile,
      `# ${post.title}\n\nCourse: ${course.title}\nDraft review: /admin/blog/${created.id}\nCover image: ${coverImage}\n\n## Instagram\n${post.social.instagram}\n\n## LinkedIn\n${post.social.linkedin}\n\n## X\n${post.social.x}\n\n## Facebook\n${post.social.facebook}\n`,
    );

    console.log(`  Saved draft "${post.title}" -> /admin/blog/${created.id}`);
    console.log(`  Social captions -> ${captionsFile}`);
  }

  await saveState(state);

  console.log(`\nDone. ${results.length} draft post(s) created:`);
  for (const r of results) console.log(`  - ${r.title}  (/admin/blog/${r.id})`);
  console.log(`\nReview and publish them from /admin/blog. Social captions saved under scripts/output/`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
