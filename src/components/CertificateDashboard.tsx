"use client";

import { useState } from "react";
import {
  Briefcase,
  Download,
  GraduationCap,
  MessageCircle,
  PlayCircle,
  Rocket,
  TrendingUp,
  Users,
} from "lucide-react";

interface FloatingCardProps {
  className?: string;
  centered?: boolean;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

function FloatingCard({ className, centered, icon, title, description }: FloatingCardProps) {
  const [bouncing, setBouncing] = useState(false);

  return (
    <div
      className={`absolute flex cursor-pointer select-none items-center gap-2.5 rounded-xl bg-(--background) p-2.5 shadow-lg shadow-black/10 transition-shadow duration-300 hover:shadow-xl hover:shadow-(--color-primary)/20 ${
        bouncing ? (centered ? "animate-card-bounce-centered" : "animate-card-bounce") : ""
      } ${className ?? ""}`}
      onClick={() => setBouncing(true)}
      onAnimationEnd={() => setBouncing(false)}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-(--color-surface) text-(--color-primary)">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="text-[11px] leading-tight font-semibold text-(--foreground)">{title}</h4>
        <p className="mt-0.5 truncate text-[10px] leading-tight text-(--color-muted)">{description}</p>
      </div>
    </div>
  );
}

/**
 * Native canvas is a fixed 580x460 box; the outer wrapper reserves the
 * correctly-scaled footprint per breakpoint and scales this box down to
 * fit on mobile, so every child position below is one single source of
 * truth (no separate mobile/desktop coordinates to keep in sync).
 */
export function CertificateDashboard() {
  return (
    <div className="relative mx-auto h-[300px] w-[340px] sm:h-[440px] sm:w-[500px]">
      <div className="absolute left-0 top-0 h-[440px] w-[500px] origin-top-left scale-[0.68] sm:scale-100">
        {/* Top */}
        <FloatingCard
          className="left-1/2 top-1 w-36 -translate-x-1/2"
          centered
          icon={<Users className="h-4 w-4" />}
          title="10K+"
          description="Learners Empowered"
        />

        {/* Left */}
        <div className="absolute left-1 top-[120px] w-36 rounded-xl bg-(--background) p-2.5 shadow-lg shadow-black/10">
          <h4 className="text-[11px] font-semibold text-(--foreground)">Your Progress</h4>
          <p className="mt-0.5 text-[10px] text-(--color-muted)">75% Completed</p>
          <div className="mt-2 h-1.5 rounded-full bg-(--color-surface)">
            <div className="h-full w-3/4 rounded-full bg-(--color-primary)" />
          </div>
        </div>

        {/* Certificate */}
        <div className="absolute left-1/2 top-1/2 z-10 w-[168px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border-2 border-(--color-primary) bg-linear-to-br from-(--background) to-(--color-surface) p-3 text-center shadow-2xl shadow-(--color-primary)/25">
          <h4 className="text-[11px] font-bold text-(--color-primary)">inSAKE</h4>
          <h2 className="mt-1 text-sm font-bold text-(--foreground)">CERTIFICATION</h2>
          <p className="text-[8px] text-(--color-muted)">OF ACHIEVEMENT</p>
          <p className="mt-2 text-[9px] text-(--foreground)">This is to certify that</p>
          <div className="my-1.5 font-serif text-base italic text-(--color-primary)">Aarav Sharma</div>
          <p className="text-[9px] text-(--foreground)">has successfully completed the</p>
          <h4 className="mt-1 text-[10px] font-bold text-(--color-primary)">ISO 27001 Foundation</h4>
        </div>

        {/* Right column */}
        <FloatingCard
          className="right-1 top-1 w-36"
          icon={<PlayCircle className="h-4 w-4" />}
          title="Live & Interactive"
          description="Learn from experts"
        />
        <FloatingCard
          className="right-1 top-[75px] w-36"
          icon={<Briefcase className="h-4 w-4" />}
          title="Real-world Projects"
          description="Build practical skills"
        />
        <FloatingCard
          className="right-1 top-[149px] w-36"
          icon={<MessageCircle className="h-4 w-4" />}
          title="Mentor Support"
          description="Guidance anytime"
        />
        <FloatingCard
          className="right-1 top-[223px] w-36"
          icon={<Download className="h-4 w-4" />}
          title="Downloadable Resources"
          description="Templates & guides"
        />
        <FloatingCard
          className="right-1 top-[297px] w-36"
          icon={<GraduationCap className="h-4 w-4" />}
          title="Industry Certification"
          description="Boost credibility"
        />
        <FloatingCard
          className="right-1 top-[371px] w-36"
          icon={<Rocket className="h-4 w-4" />}
          title="Career Support"
          description="Resume review & mocks"
        />

        {/* Bottom */}
        <FloatingCard
          className="bottom-1 left-1 w-[170px]"
          icon={<TrendingUp className="h-4 w-4" />}
          title="85% Career Impact"
          description={<span className="text-(--color-accent)">▲ 45% Salary Hike</span>}
        />
      </div>
    </div>
  );
}
