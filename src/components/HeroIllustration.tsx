export function HeroIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-(--color-primary)/20 blur-2xl" />

      <div className="relative rounded-3xl border border-(--color-ink-border) bg-(--color-ink-surface) p-6 shadow-2xl shadow-black/40">
        <div className="flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-(--color-primary) to-fuchsia-500 text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2 3 7l9 5 9-5-9-5Z" />
              <path d="M3 12l9 5 9-5M3 17l9 5 9-5" />
            </svg>
          </div>
          <span className="rounded-full bg-green-500/15 px-2.5 py-1 text-xs font-semibold text-green-400">
            Certified
          </span>
        </div>

        <div className="mt-6 space-y-3">
          <div className="h-3 w-3/4 rounded-full bg-(--color-ink-border)" />
          <div className="h-3 w-1/2 rounded-full bg-(--color-ink-border)" />
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-16 rounded-xl bg-gradient-to-br from-(--color-primary)/20 to-fuchsia-500/10" />
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3 rounded-xl border border-(--color-ink-border) p-3">
          <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-(--color-primary) to-fuchsia-500" />
          <div className="flex-1 space-y-1.5">
            <div className="h-2 w-2/3 rounded-full bg-(--color-ink-border)" />
            <div className="h-2 w-1/3 rounded-full bg-(--color-ink-border)" />
          </div>
        </div>
      </div>

      <div className="absolute -right-4 -top-4 rounded-full bg-(--color-primary) px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
        ISO 27001 ✓
      </div>
      <div className="absolute -bottom-4 -left-4 rounded-full bg-green-500 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
        10K+ Learners
      </div>
    </div>
  );
}
