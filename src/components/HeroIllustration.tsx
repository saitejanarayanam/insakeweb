import Image from "next/image";

export function HeroIllustration() {
  return (
    <div className="group relative mx-auto w-full max-w-lg">
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-(--color-primary)/10 blur-2xl transition-opacity duration-500 group-hover:opacity-70" />
      <Image
        src="/images/hero-illustration.png"
        alt="inSAKE certification platform: certificates, mentor support, and career outcomes"
        width={1402}
        height={1122}
        priority
        className="relative w-full transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.02]"
      />
    </div>
  );
}
