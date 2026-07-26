const BADGES = [
  { label: "ISO 27001", gradient: "from-(--color-primary) to-violet-700", icon: "shield" },
  { label: "Industry-recognized", gradient: "from-sky-500 to-cyan-600", icon: "briefcase" },
  { label: "Enterprise-ready", gradient: "from-fuchsia-500 to-pink-600", icon: "building" },
  { label: "CPD Approved", gradient: "from-(--color-primary) to-fuchsia-500", icon: "cap" },
] as const;

const ICONS: Record<(typeof BADGES)[number]["icon"], React.ReactNode> = {
  shield: (
    <path d="M12 2 4 5v6c0 5 3.4 8.7 8 9 4.6-.3 8-4 8-9V5l-8-3Z" />
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </>
  ),
  building: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path d="M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1" />
    </>
  ),
  cap: (
    <path d="M12 3 2 8l10 5 10-5-10-5ZM6 10.5V15c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" />
  ),
};

export function TrustBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {BADGES.map((b) => (
        <div
          key={b.label}
          className="flex items-center gap-2.5 rounded-2xl border border-(--color-ink-border) bg-(--color-ink-surface) px-4 py-2.5"
        >
          <span className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${b.gradient} text-white`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {ICONS[b.icon]}
            </svg>
          </span>
          <span className="text-xs font-medium text-(--color-ink-muted)">{b.label}</span>
        </div>
      ))}
    </div>
  );
}
