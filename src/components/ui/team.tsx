"use client";

import Image from "next/image";

import { Marquee } from "@/components/ui/marquee";

export interface TeamMember {
  name: string;
  role: string;
  image?: string | null;
}

interface TeamProps {
  members: TeamMember[];
  title?: string;
  description?: string;
  className?: string;
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function Team({
  members,
  title = "Learn from industry mentors",
  description = "Certified practitioners who bring real-world experience into every course.",
  className,
}: TeamProps) {
  return (
    <section className={`relative w-full overflow-hidden bg-(--background) py-12 md:py-24 ${className ?? ""}`}>
      <svg
        className="pointer-events-none absolute right-0 bottom-0 text-(--color-border)"
        fill="none"
        height="154"
        viewBox="0 0 460 154"
        width="460"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_494_1104)">
          <path
            d="M-87.463 458.432C-102.118 348.092 -77.3418 238.841 -15.0744 188.274C57.4129 129.408 180.708 150.071 351.748 341.128C278.246 -374.233 633.954 380.602 548.123 42.7707"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="40"
          />
        </g>
        <defs>
          <clipPath id="clip0_494_1104">
            <rect fill="white" height="154" width="460" />
          </clipPath>
        </defs>
      </svg>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-16 flex max-w-5xl flex-col items-center px-6 text-center lg:px-0">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-(--color-primary) text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16.051 12.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z" />
              <path d="M8 15H7a4 4 0 0 0-4 4v2" />
              <circle cx="10" cy="7" r="4" />
            </svg>
          </div>

          <h2 className="relative mb-4 font-medium text-4xl text-(--foreground) tracking-tight sm:text-5xl">
            {title}
            <svg
              className="pointer-events-none absolute -top-2 -right-8 -z-10 w-24 text-(--color-border)"
              fill="currentColor"
              height="86"
              viewBox="0 0 108 86"
              width="108"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M38.8484 16.236L15 43.5793L78.2688 15L18.1218 71L93 34.1172L70.2047 65.2739"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="28"
              />
            </svg>
          </h2>
          <p className="max-w-2xl text-(--color-muted)">{description}</p>
        </div>

        <div className="relative w-full">
          <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-20 bg-linear-to-r from-(--background) to-transparent" />
          <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-20 bg-linear-to-l from-(--background) to-transparent" />

          <Marquee className="[--gap:1rem]" pauseOnHover>
            {members.map((member) => (
              <div className="group flex w-40 shrink-0 flex-col" key={member.name}>
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-neutral-100">
                  {member.image ? (
                    <Image
                      alt={member.name}
                      className="h-full w-full object-cover grayscale transition-all duration-300 hover:grayscale-0"
                      fill
                      src={member.image}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-(--color-primary) to-fuchsia-500 text-2xl font-semibold text-white">
                      {initials(member.name)}
                    </div>
                  )}
                  <div className="absolute bottom-0 w-full rounded-lg bg-(--background)/85 p-2">
                    <h3 className="truncate text-sm font-semibold text-(--foreground)">{member.name}</h3>
                    <p className="truncate text-(--color-muted) text-xs">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
