import { CertificateIllustration } from "@/components/icons/CertificateIllustration";

export function HeroIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-(--color-primary)/20 blur-2xl" />

      <div className="relative rounded-3xl border border-(--color-ink-border) bg-(--color-ink-surface) p-6 shadow-xl shadow-(--color-primary)/10">
        <CertificateIllustration />
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
