export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="bg-grid relative overflow-hidden bg-(--color-ink) text-(--color-ink-foreground)">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-(--color-primary)/30 blur-3xl" />
      <div className="relative mx-auto max-w-4xl px-4 py-16 text-center">
        {eyebrow && (
          <span className="inline-flex items-center gap-2 rounded-full border border-(--color-ink-border) bg-(--color-ink-surface) px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-(--color-primary)">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        {description && (
          <p className="mx-auto mt-3 max-w-2xl text-(--color-ink-muted)">{description}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
