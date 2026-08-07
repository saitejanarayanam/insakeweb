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

/** CSS background-position/-size percentages that "window" into one region
 * of a full-size background image, so scaling the element scales exactly
 * that crop of the picture — no separate cropped assets needed. */
function spriteStyle(h: Hotspot): React.CSSProperties {
  return {
    backgroundImage: `url(${IMAGE})`,
    backgroundSize: `${10000 / h.width}% ${10000 / h.height}%`,
    backgroundPosition: `${(100 * h.left) / (100 - h.width)}% ${(100 * h.top) / (100 - h.height)}%`,
  };
}

export function HeroIllustration() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="group relative mx-auto w-full max-w-2xl">
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-(--color-primary)/10 blur-2xl transition-opacity duration-500 group-hover:opacity-70" />

      <div className="relative aspect-[1402/1122] w-full transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.02]">
        {/* Base picture — the single source of truth for every pixel; hotspots
            below only add a background when active, so nothing is ever
            double-rendered at rest. */}
        <img
          src={IMAGE}
          alt="inSAKE certification platform: certificates, mentor support, and career outcomes"
          className="h-full w-full object-contain"
          draggable={false}
        />

        {/* Interactive hotspots windowed into the same image */}
        {HOTSPOTS.map((h) => {
          const isActive = active === h.id;
          return (
            <button
              key={h.id}
              type="button"
              aria-label={h.label}
              className={`absolute cursor-pointer rounded-lg transition-all duration-300 ease-out ${
                isActive
                  ? "z-20 scale-[1.08] shadow-xl shadow-(--color-primary)/40 ring-2 ring-(--color-primary)"
                  : ""
              }`}
              style={{
                left: `${h.left}%`,
                top: `${h.top}%`,
                width: `${h.width}%`,
                height: `${h.height}%`,
                ...(isActive ? spriteStyle(h) : undefined),
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
