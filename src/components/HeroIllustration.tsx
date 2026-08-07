"use client";

import { useState } from "react";

const IMAGE = "/images/hero-illustration.png";

interface Hotspot {
  id: string;
  label: string;
  /** Bounding box in % of the source image (1402x1122). */
  left: number;
  top: number;
  width: number;
  height: number;
}

const HOTSPOTS: Hotspot[] = [
  { id: "learners", label: "10K+ Learners Empowered", left: 37, top: 6, width: 18, height: 9 },
  { id: "live", label: "Live & Interactive Sessions", left: 72, top: 17, width: 17.5, height: 9.5 },
  { id: "projects", label: "Real-world Projects", left: 72, top: 29.5, width: 17.5, height: 9 },
  { id: "mentor", label: "Mentor Support", left: 72, top: 42, width: 17.5, height: 8.5 },
  { id: "resources", label: "Downloadable Resources", left: 72, top: 54, width: 17.5, height: 10.5 },
  { id: "industry", label: "Industry-recognized Certification", left: 70, top: 66, width: 19.5, height: 10.5 },
  { id: "career-support", label: "Career Support", left: 69, top: 78.5, width: 20, height: 10.5 },
  { id: "progress", label: "Your Progress — 75% Completed", left: 16, top: 24, width: 17, height: 9.5 },
  { id: "checklist", label: "Course checklist", left: 15.5, top: 37, width: 17.5, height: 22.5 },
  { id: "companies", label: "Top Companies Hire Our Learners", left: 15, top: 68, width: 39, height: 9 },
  { id: "growth", label: "85% Career Impact — 45% Salary Hike", left: 13, top: 79, width: 22, height: 18 },
  { id: "testimonial", label: "Learner testimonial", left: 35.5, top: 77, width: 27.5, height: 20 },
];

export function HeroIllustration() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-(--color-primary)/10 blur-2xl" />

      <div className="relative aspect-[1402/1122] w-full">
        {/* Base picture — the only place any pixel of the image is ever
            drawn. Hotspots below never render image content of their own
            (that was the source of the "doubling" look), they only draw a
            highlight ring on top when active. */}
        <img
          src={IMAGE}
          alt="inSAKE certification platform: certificates, mentor support, and career outcomes"
          className="h-full w-full object-contain"
          draggable={false}
        />

        {/* Interactive hotspots — highlight-only, no duplicated image content */}
        {HOTSPOTS.map((h) => {
          const isActive = active === h.id;
          return (
            <button
              key={h.id}
              type="button"
              aria-label={h.label}
              className={`absolute rounded-lg transition-all duration-300 ease-out ${
                isActive
                  ? "z-20 bg-(--color-primary)/8 shadow-md shadow-(--color-primary)/20 ring-1 ring-(--color-primary)/50"
                  : "cursor-pointer ring-1 ring-transparent hover:z-20 hover:bg-(--color-primary)/5 hover:shadow-md hover:shadow-(--color-primary)/10 hover:ring-(--color-primary)/30"
              }`}
              style={{
                left: `${h.left}%`,
                top: `${h.top}%`,
                width: `${h.width}%`,
                height: `${h.height}%`,
              }}
              onMouseEnter={() => setActive(h.id)}
              onMouseLeave={() => setActive((cur) => (cur === h.id ? null : cur))}
              onClick={() => setActive((cur) => (cur === h.id ? null : h.id))}
            />
          );
        })}
      </div>
    </div>
  );
}
