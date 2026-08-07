import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import { COURSE_CONTENT } from "./course-content";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const CATEGORIES = [
  { name: "IT Audit", slug: "it-audit" },
  { name: "Project Management", slug: "project-management" },
  { name: "Security Management", slug: "security-management" },
  { name: "Risk Management", slug: "risk-management" },
  { name: "Fraud Examination", slug: "fraud-examination" },
  { name: "AI Project Management", slug: "ai-project-management" },
  { name: "Finance", slug: "finance" },
  { name: "Data & Business", slug: "data-business" },
  { name: "Career Readiness", slug: "career-readiness" },
  { name: "Soft Skills", slug: "soft-skills" },
  { name: "Data Analytics", slug: "data-analytics" },
];

const MENTORS = [
  { name: "Arjun Mehta", title: "Senior GRC Consultant", company: "Oracle", bio: "15+ years advising enterprises on governance, risk, and compliance programs." },
  { name: "Priya Nair", title: "Finance Lead", company: "IBM", bio: "Chartered Accountant specializing in financial modeling and equity research." },
  { name: "Rohan Kulkarni", title: "Program Manager", company: "Accenture", bio: "PMP-certified program manager with a decade of delivery experience across industries." },
  { name: "Sneha Iyer", title: "Data Analytics Trainer", company: "Wipro", bio: "Teaches Python, SQL, and Power BI to working professionals transitioning into analytics." },
];

const PARTNERS = ["BITS Pilani", "IIT Madras", "IIT Gwalior", "NMIMS Mumbai", "CHRIST University"];

const TESTIMONIALS = [
  { name: "Kavya R.", role: "PMP Certified, 2026", quote: "The structured 30-day plan made a huge difference — passed on my first attempt." },
  { name: "Aditya S.", role: "CISA Certified, 2026", quote: "Mentors with real industry experience made the exam prep practical, not just theoretical." },
  { name: "Meera P.", role: "Financial Analyst Trainee", quote: "Went from spreadsheets-only to confidently building financial models in a few months." },
];

const COURSES = [
  { slug: "cisa-certification", title: "CISA Certification", category: "it-audit", tagline: "Certified Information Systems Auditor", price: 2499900, hours: 40, difficulty: "Advanced", image: "/courses/cisa-certification.png" },
  { slug: "pmp-certification", title: "PMP Certification", category: "project-management", tagline: "Project Management Professional", price: 2999900, hours: 35, difficulty: "Intermediate", image: "/courses/pmp-certification.png" },
  { slug: "cism-certification", title: "CISM Certification", category: "security-management", tagline: "Certified Information Security Manager", price: 2699900, hours: 40, difficulty: "Advanced", image: "/courses/cism-certification.png" },
  { slug: "crisc-certification", title: "CRISC Certification", category: "risk-management", tagline: "Risk and Information Systems Control", price: 2599900, hours: 28, difficulty: "Advanced", image: "/courses/crisc-certification.png" },
  { slug: "cissp-certification", title: "CISSP Certification", category: "security-management", tagline: "Certified Information Systems Security Professional", price: 3199900, hours: 45, difficulty: "Advanced", image: "/courses/cissp-certification.png" },
  { slug: "cgeit-certification", title: "CGEIT Certification", category: "risk-management", tagline: "Governance of Enterprise IT", price: 2599900, hours: 32, difficulty: "Advanced", image: "/courses/cgeit-certification.png" },
  { slug: "cfe-certification", title: "CFE Certification", category: "fraud-examination", tagline: "Certified Fraud Examiner", price: 2399900, hours: 35, difficulty: "Intermediate", image: "/courses/cfe-certification.svg" },
  { slug: "cpmai-certification", title: "CPMAI Certification", category: "ai-project-management", tagline: "AI Project Management", price: 2299900, hours: 25, difficulty: "Intermediate", image: "/courses/cpmai-certification.svg" },
  { slug: "equity-research-training", title: "Equity Research Training", category: "finance", tagline: "Build institutional-grade research reports", price: 1799900, hours: 20, difficulty: "Beginner", image: "/courses/equity-research-training.svg" },
  { slug: "financial-analyst-training", title: "Financial Analyst Training", category: "finance", tagline: "End-to-end financial modeling", price: 1899900, hours: 30, difficulty: "Intermediate", image: "/courses/financial-analyst-training.svg" },
  { slug: "advanced-excel", title: "Advanced Excel for Data & Business", category: "data-business", tagline: "From formulas to dashboards", price: 699900, hours: 30, difficulty: "Intermediate", image: "/courses/advanced-excel.svg" },
  { slug: "power-bi", title: "Power BI for Data Analytics", category: "data-analytics", tagline: "Business intelligence dashboards", price: 899900, hours: 30, difficulty: "Intermediate", image: "/courses/power-bi.svg" },
  { slug: "tableau", title: "Tableau for Data Visualization", category: "data-analytics", tagline: "Data visualization for analysts", price: 899900, hours: 30, difficulty: "Intermediate", image: "/courses/tableau.svg" },
  { slug: "python-data-analysts", title: "Python for Data Analysts", category: "data-analytics", tagline: "Python fundamentals for analytics roles", price: 999900, hours: 45, difficulty: "Intermediate", image: "/courses/python-data-analysts.svg" },
  { slug: "sql-data-analysts", title: "SQL for Data Analysts", category: "data-analytics", tagline: "Query and model relational data", price: 799900, hours: 30, difficulty: "Beginner", image: "/courses/sql-data-analysts.svg" },
  { slug: "campus-to-corporate", title: "Campus to Corporate Program", category: "career-readiness", tagline: "Bridge the gap from college to your first job", price: 499900, hours: 30, difficulty: "Beginner", image: "/courses/campus-to-corporate.svg" },
  { slug: "communication-skills", title: "Communication Skills Program", category: "soft-skills", tagline: "Speak and write with clarity and confidence", price: 399900, hours: 30, difficulty: "Beginner", image: "/courses/communication-skills.svg" },
  { slug: "personality-development", title: "Personality Development Program", category: "soft-skills", tagline: "Build presence and professional confidence", price: 399900, hours: 30, difficulty: "Beginner", image: "/courses/personality-development.svg" },
  { slug: "presentation-skills", title: "Presentation Skills Program", category: "soft-skills", tagline: "Present ideas that land", price: 399900, hours: 21, difficulty: "Beginner", image: "/courses/presentation-skills.svg" },
  { slug: "soft-skills", title: "Soft Skills Mastery Program", category: "soft-skills", tagline: "Workplace essentials for early-career professionals", price: 499900, hours: 30, difficulty: "Beginner", image: "/courses/soft-skills.svg" },
];

async function main() {
  const categories = new Map<string, string>();
  for (const c of CATEGORIES) {
    const created = await prisma.courseCategory.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
    categories.set(c.slug, created.id);
  }

  const mentors = [];
  for (const m of MENTORS) {
    const created = await prisma.mentor.create({ data: m });
    mentors.push(created);
  }

  for (const p of PARTNERS) {
    await prisma.partnerInstitution.create({ data: { name: p } });
  }

  for (const t of TESTIMONIALS) {
    await prisma.testimonial.create({ data: t });
  }

  let i = 0;
  for (const c of COURSES) {
    await prisma.course.upsert({
      where: { slug: c.slug },
      update: {},
      create: {
        slug: c.slug,
        title: c.title,
        tagline: c.tagline,
        description: COURSE_CONTENT[c.slug].description,
        syllabus: COURSE_CONTENT[c.slug].syllabus,
        price: c.price,
        studyHours: c.hours,
        difficulty: c.difficulty,
        imageUrl: c.image ?? null,
        featured: true,
        categoryId: categories.get(c.category),
        mentorId: mentors[i % mentors.length].id,
      },
    });
    i++;
  }

  await prisma.user.upsert({
    where: { email: "admin@insake.in" },
    update: {},
    create: {
      email: "admin@insake.in",
      name: "inSAKE Admin",
      role: "ADMIN",
      passwordHash: await bcrypt.hash("ChangeMe123!", 10),
    },
  });

  const courseBySlug = new Map<string, string>();
  for (const c of COURSES) {
    const found = await prisma.course.findUnique({ where: { slug: c.slug } });
    if (found) courseBySlug.set(c.slug, found.id);
  }

  const BLOG_POSTS = [
    {
      slug: "how-to-become-cfe-india-2026",
      title: "How to Become a Certified Fraud Examiner (CFE) in India: Step-by-Step (2026)",
      excerpt: "A step-by-step guide to becoming a Certified Fraud Examiner in India — membership, eligibility, the exam, and career paths.",
      category: "Fraud Examination & Forensics",
      readMinutes: 9,
      courseSlug: "cfe-certification",
    },
    {
      slug: "cfe-certification-2026-guide",
      title: "CFE Certification 2026: New 3-Section Exam, Salary & Eligibility",
      excerpt: "The complete CFE guide — exam format, eligibility points, salary in India, and how to prepare.",
      category: "Fraud Examination & Forensics",
      readMinutes: 10,
      courseSlug: "cfe-certification",
    },
    {
      slug: "how-to-become-ai-project-manager-2026",
      title: "How to Become an AI Project Manager in 2026 (No Coding Required)",
      excerpt: "The skills, the roles, and why CPMAI matters for professionals moving into AI project management.",
      category: "AI Project Management",
      readMinutes: 9,
      courseSlug: "cpmai-certification",
    },
    {
      slug: "cpmai-certification-2026-guide",
      title: "CPMAI Certification 2026: The AI Project Management Credential Explained",
      excerpt: "The 6-phase methodology, exam format, and career outlook for the CPMAI credential.",
      category: "AI Project Management",
      readMinutes: 10,
      courseSlug: "cpmai-certification",
    },
    {
      slug: "how-to-pass-pmp-exam-30-day-study-plan",
      title: "How to Pass the PMP Exam on Your First Attempt: 30-Day Study Plan (2026)",
      excerpt: "A practical 30-day PMP study plan — week-by-week milestones and exam-day tips.",
      category: "Project Management",
      readMinutes: 9,
      courseSlug: "pmp-certification",
    },
    {
      slug: "pmp-certification-2026-guide",
      title: "PMP Certification in 2026: New Exam, PMBOK 8, Salary & How to Pass",
      excerpt: "The complete PMP guide — eligibility, exam pattern, salary in India, and a step-by-step study plan.",
      category: "Project Management",
      readMinutes: 11,
      courseSlug: "pmp-certification",
    },
    {
      slug: "is-cisa-worth-it-2026",
      title: "Is CISA Worth It in 2026? Salary, ROI & Who Should Get It",
      excerpt: "A clear look at the salary uplift, ROI, and who benefits most from the CISA certification.",
      category: "IT Audit & Governance",
      readMinutes: 9,
      courseSlug: "cisa-certification",
    },
    {
      slug: "cisa-certification-2026-guide",
      title: "CISA Certification 2026: Salary, Syllabus, Eligibility & How to Pass",
      excerpt: "The complete CISA guide — the 5 domains, exam pattern, eligibility, and salary in India.",
      category: "IT Audit & Governance",
      readMinutes: 10,
      courseSlug: "cisa-certification",
    },
    {
      slug: "how-to-become-a-ciso-cism-roadmap",
      title: "How to Become a CISO in India: The CISM Career Roadmap (2026)",
      excerpt: "The career ladder, why CISM matters, and the skills you need at each stage.",
      category: "Information Security",
      readMinutes: 9,
      courseSlug: "cism-certification",
    },
    {
      slug: "cism-certification-2026-guide",
      title: "CISM Certification 2026: Is It Worth It? Salary, Domains & Career Path",
      excerpt: "The complete CISM guide — the 4 domains, exam pattern, eligibility, and career paths.",
      category: "Information Security",
      readMinutes: 10,
      courseSlug: "cism-certification",
    },
    {
      slug: "it-risk-grc-careers-crisc-2026",
      title: "IT Risk & GRC Careers in 2026: Why CRISC Is in High Demand",
      excerpt: "Why IT risk and GRC are among the fastest-growing careers, and why CRISC is the credential to get.",
      category: "IT Risk & Control",
      readMinutes: 9,
      courseSlug: "crisc-certification",
    },
    {
      slug: "crisc-certification-2026-guide",
      title: "CRISC Certification 2026: Domains, Salary, Eligibility & Career Guide",
      excerpt: "The complete CRISC guide — the 4 domains, exam pattern, eligibility, and salary in India.",
      category: "IT Risk & Control",
      readMinutes: 10,
      courseSlug: "crisc-certification",
    },
  ];

  for (const b of BLOG_POSTS) {
    await prisma.blogPost.upsert({
      where: { slug: b.slug },
      update: {},
      create: {
        slug: b.slug,
        title: b.title,
        excerpt: b.excerpt,
        content: `# ${b.title}\n\nThis is placeholder article content. Replace with the final copy before launch.`,
        category: b.category,
        readMinutes: b.readMinutes,
        courseId: courseBySlug.get(b.courseSlug),
      },
    });
  }

  console.log("Seed complete. Admin login: admin@insake.in / ChangeMe123!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
