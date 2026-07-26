export type Stat = { value: string; label: string; icon?: string };

export function StatsRow({ stats }: { stats: Stat[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="min-w-[120px] rounded-2xl border border-(--color-ink-border) bg-(--color-ink-surface) px-5 py-3 text-center"
        >
          {s.icon && <div className="text-lg">{s.icon}</div>}
          <div className="text-xl font-bold text-(--color-ink-foreground)">{s.value}</div>
          <div className="text-xs text-(--color-ink-muted)">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
