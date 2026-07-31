const PATHS: Record<string, React.ReactNode> = {
  "it-audit": (
    <>
      <rect x="6" y="3" width="12" height="18" rx="2" />
      <path d="M9 3v2a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V3" />
      <path d="m9 13 2 2 4-4" />
    </>
  ),
  "project-management": (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M8 4v16M16 4v16" />
      <path d="M8 9h0M16 13h0" />
    </>
  ),
  "security-management": (
    <>
      <path d="M12 2 4 5v6c0 5 3.4 8.7 8 9 4.6-.3 8-4 8-9V5l-8-3Z" />
      <path d="M9.5 12 11 13.5 15 9.5" />
    </>
  ),
  "risk-management": (
    <>
      <path d="M12 3 2 20h20L12 3Z" />
      <path d="M12 10v4M12 17h.01" />
    </>
  ),
  "fraud-examination": (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m20 20-4.3-4.3" />
    </>
  ),
  "ai-project-management": (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.5 4.5 6.5 6.5M17.5 17.5l2 2M19.5 4.5l-2 2M6.5 17.5l-2 2" />
    </>
  ),
  finance: (
    <>
      <path d="M3 17 9 11 13 15 21 7" />
      <path d="M21 12V7h-5" />
    </>
  ),
  "data-business": (
    <>
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </>
  ),
  "career-readiness": (
    <>
      <path d="M12 2c3 2 5 5.5 5 9.5 0 2-.5 3.7-1.5 5.2L14 21h-4l-1.5-4.3C7.5 15.2 7 13.5 7 11.5 7 7.5 9 4 12 2Z" />
      <circle cx="12" cy="10" r="2" />
      <path d="M9 21v-2M15 21v-2" />
    </>
  ),
  "soft-skills": (
    <>
      <path d="M8 10h.01M12 10h.01M16 10h.01" />
      <path d="M21 12c0 4.4-4 8-9 8-1.3 0-2.6-.2-3.7-.7L3 20l1.1-3.8C3.4 15 3 13.6 3 12c0-4.4 4-8 9-8s9 3.6 9 8Z" />
    </>
  ),
  "data-analytics": (
    <>
      <path d="M21 12a9 9 0 1 1-9-9" />
      <path d="M21 12a9 9 0 0 0-9-9v9Z" />
    </>
  ),
};

const DEFAULT_PATH = (
  <>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
  </>
);

export function CategoryIcon({
  slug,
  className,
}: {
  slug?: string | null;
  className?: string;
}) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {(slug && PATHS[slug]) || DEFAULT_PATH}
    </svg>
  );
}
