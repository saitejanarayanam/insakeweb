import Link from "next/link";
import type { Metadata } from "next";
import { Building2, CheckCircle2, Globe, GraduationCap, Rocket, Trophy } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { PageHero } from "@/components/PageHero";
import { StatsRow } from "@/components/StatsRow";
import { PersonIcon } from "@/components/icons/PersonIcon";

export const metadata: Metadata = {
  title: "About",
  description: "About inSAKE — our mission, values, and mentors.",
};

const IMPACT_STATS = [
  { value: "10,000+", label: "Students Trained", icon: <GraduationCap className="h-4 w-4" /> },
  { value: "100+", label: "Corporate Partners", icon: <Building2 className="h-4 w-4" /> },
  { value: "5+", label: "Countries Served", icon: <Globe className="h-4 w-4" /> },
];

const NUMBERS_STATS = [
  { value: "5+", label: "Countries" },
  { value: "100+", label: "Global Clients" },
  { value: "10,000+", label: "Students Trained" },
  { value: "100+", label: "Partner Companies" },
];

const TECH_PARTNERS = [
  "AWS",
  "Azure",
  "Cisco",
  "Oracle",
  "SAP",
  "Salesforce",
  "CompTIA",
  "ISACA",
  "PMI",
  "Axelos",
  "EC-Council",
];

const FEATURES = [
  { title: "Industry-focused Training", body: "Curriculum aligned with real-world demands" },
  { title: "Expert Mentorship", body: "Learn from certified professionals" },
  { title: "Cutting-edge Curriculum", body: "Latest technologies and methodologies" },
  { title: "Comprehensive Resources", body: "Study materials and practice labs" },
  { title: "Career Support", body: "Placement assistance and guidance" },
  { title: "Continuous Growth", body: "Lifelong learning opportunities" },
];

const ACHIEVEMENTS = [
  "Successfully expanded our operations across five countries, catering to diverse markets.",
  "Delivered investment and financial solutions to 100+ clients across the globe.",
  "Empowered students with the skills needed to secure placements in top multinational companies (MNCs) in India.",
  "Established strong collaborations with leading recruitment firms to enhance job opportunities.",
  "Introduced a referral-based interview process to maximize employment prospects for our students.",
];

const MISSION = [
  "To deliver tailor-made corporate solutions that align with business objectives and industry demands.",
  "To provide mentorship from industry leaders to accelerate career development.",
  "To leverage cutting-edge technology in finance and business operations, ensuring greater efficiency and precision.",
  "To create an ecosystem of continuous learning and professional growth.",
];

const OFFICES = [
  { flag: "🇮🇳", tag: "Headquarters", name: "India (HQ)", address: "House No. 02, Ground floor, Borewell Rd, Whitefield, Bengaluru, Karnataka 560066, India" },
  { flag: "🇺🇸", tag: "International", name: "USA", address: "213 Decatur Ln, Georgia, 30033, USA" },
];

export default async function AboutPage() {
  const mentors = await prisma.mentor.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <PageHero
        eyebrow="ISO 9001:2015 Certified · MCA Registered"
        title="About inSAKE Academy"
        description="A premier EdTech and consulting firm in India, dedicated to transforming the corporate and education landscape. Registered under the Government of India and the Ministry of Corporate Affairs."
      >
        <StatsRow stats={IMPACT_STATS} />
      </PageHero>

      <section className="border-b border-(--color-border) bg-(--color-surface) py-14">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-(--color-primary)">
            Technology Partners
          </span>
          <h2 className="mt-2 text-2xl font-bold">Powered by Industry Leaders</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-(--color-muted)">
            We partner with globally recognised organisations to deliver world-class certifications and
            training programs.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {TECH_PARTNERS.map((name) => (
              <span
                key={name}
                className="rounded-full border border-(--color-border) bg-(--background) px-4 py-2 text-sm font-medium"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-14">
        <section>
          <h2 className="text-xl font-bold">Who We Are</h2>
          <p className="mt-3 max-w-3xl text-sm text-(--color-muted)">
            At inSAKE Academy, we specialise in Education Technology and Consulting Services, providing
            state-of-the-art solutions to businesses while equipping professionals with industry-relevant
            skills. Our mission is to bridge the gap between education and employment by offering
            innovative learning experiences, corporate training, and strategic business solutions that
            foster sustainable growth.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl border border-(--color-border) p-5">
                <h3 className="text-sm font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-(--color-muted)">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {mentors.length > 0 && (
          <section className="mt-14">
            <h2 className="text-xl font-bold">Our mentors</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {mentors.map((m) => (
                <div key={m.id} className="rounded-2xl border border-(--color-border) p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-(--color-primary) to-fuchsia-500 text-white">
                    <PersonIcon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 text-sm font-semibold">{m.name}</h3>
                  <p className="text-xs text-(--color-muted)">
                    {m.title}
                    {m.company ? `, ${m.company}` : ""}
                  </p>
                  <p className="mt-2 text-sm text-(--color-muted)">{m.bio}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <section className="bg-grid border-y border-(--color-ink-border) bg-(--color-ink) py-14 text-(--color-ink-foreground)">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-wide text-(--color-primary)">
              Our Impact
            </span>
            <h2 className="mt-2 text-2xl font-bold">Numbers That Speak</h2>
          </div>
          <div className="mt-8">
            <StatsRow stats={NUMBERS_STATS} />
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-(--color-ink-muted)">
                <Trophy className="h-4 w-4 text-(--color-primary)" />
                Milestones — Our Achievements
              </h3>
              <ul className="mt-4 space-y-3">
                {ACHIEVEMENTS.map((a) => (
                  <li key={a} className="flex gap-2 text-sm text-(--color-ink-muted)">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-(--color-accent)" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-(--color-ink-muted)">
                Our Mission
              </h3>
              <ul className="mt-4 space-y-3">
                {MISSION.map((m) => (
                  <li key={m} className="flex gap-2 text-sm text-(--color-ink-muted)">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-(--color-primary)" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-(--color-primary) text-white">
            <Rocket className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold">Join the Movement</h2>
          <p className="mt-3 text-sm text-(--color-muted)">
            At inSAKE Academy, we are more than just a company — we are a movement toward a smarter, more
            efficient, and future-ready workforce. Join us as we shape the future of education, business,
            and technology.
          </p>
          <Link
            href="/courses"
            className="mt-6 inline-block rounded-full bg-(--color-primary) px-6 py-3 text-sm font-semibold text-white hover:bg-(--color-primary-dark)"
          >
            Explore Our Courses →
          </Link>
        </div>
      </section>

      <section className="border-t border-(--color-border) bg-(--color-surface) py-14">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-(--color-primary)">
            Global Presence
          </span>
          <h2 className="mt-2 text-2xl font-bold">Where We Operate</h2>
          <p className="mt-2 text-sm text-(--color-muted)">Serving professionals and businesses across the globe.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {OFFICES.map((o) => (
              <div key={o.name} className="rounded-2xl border border-(--color-border) bg-(--background) p-5 text-left">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-(--color-primary)">
                  <span className="text-base">{o.flag}</span>
                  {o.tag}
                </div>
                <div className="mt-1 text-sm font-semibold">{o.name}</div>
                <p className="mt-1 text-sm text-(--color-muted)">{o.address}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
