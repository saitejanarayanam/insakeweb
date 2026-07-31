export function CertificateIllustration() {
  return (
    <svg viewBox="0 0 220 200" className="w-full" aria-hidden>
      <defs>
        <linearGradient id="cert-primary" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-primary)" />
          <stop offset="100%" stopColor="#e879f9" />
        </linearGradient>
        <linearGradient id="cert-seal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
      </defs>

      <rect x="18" y="14" width="150" height="150" rx="14" transform="rotate(-4 93 89)" fill="var(--color-ink)" stroke="var(--color-ink-border)" />

      <rect x="28" y="24" width="150" height="150" rx="14" fill="var(--background)" stroke="var(--color-border)" />

      <rect x="46" y="44" width="60" height="60" rx="12" fill="url(#cert-primary)" opacity="0.15" />
      <path
        d="M62 78 74 90 96 62"
        fill="none"
        stroke="url(#cert-primary)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <rect x="46" y="118" width="110" height="8" rx="4" fill="var(--color-border)" />
      <rect x="46" y="134" width="80" height="8" rx="4" fill="var(--color-border)" />

      <g transform="translate(148 128)">
        <circle r="30" fill="url(#cert-seal)" />
        <path
          d="M-11 1 -3 9 12-8"
          fill="none"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M-8 26 -14 44 0 34 14 44 8 26" fill="url(#cert-seal)" />
      </g>

      <g fill="var(--color-primary)" opacity="0.7">
        <path d="M190 40 193 47 200 50 193 53 190 60 187 53 180 50 187 47Z" />
        <path d="M22 150 24 155 29 157 24 159 22 164 20 159 15 157 20 155Z" />
      </g>
    </svg>
  );
}
