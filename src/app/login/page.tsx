"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { PageHero } from "@/components/PageHero";
import { FormError } from "@/components/FormError";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password.");
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-(--color-border) p-6">
      <div>
        <label className="text-sm font-medium">Email</label>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Password</label>
        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
        />
      </div>
      <FormError message={error} />
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-(--color-primary) px-6 py-3 text-sm font-semibold text-white shadow-md shadow-(--color-primary)/30 hover:bg-(--color-primary-dark) disabled:opacity-60"
      >
        {loading ? "Logging in..." : "Log in"}
      </button>
      <p className="text-center text-sm text-(--color-muted)">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-medium text-(--color-primary)">
          Sign up
        </Link>
      </p>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div>
      <meta name="robots" content="noindex, nofollow" />
      <PageHero eyebrow="Welcome back" title="Log in" />
      <div className="mx-auto max-w-md px-4 py-12">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
