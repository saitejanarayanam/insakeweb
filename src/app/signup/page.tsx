"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { PageHero } from "@/components/PageHero";
import { FormError } from "@/components/FormError";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Something went wrong");
      setLoading(false);
      return;
    }

    const signInRes = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (signInRes?.error) {
      router.push("/login");
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div>
      <meta name="robots" content="noindex, nofollow" />
      <PageHero eyebrow="Get started" title="Create your account" />
      <div className="mx-auto max-w-md px-4 py-12">
        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-(--color-border) p-6">
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
            />
          </div>
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
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
            />
            <p className="mt-1 text-xs text-(--color-muted)">At least 8 characters.</p>
          </div>
          <FormError message={error} />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-(--color-primary) px-6 py-3 text-sm font-semibold text-white shadow-md shadow-(--color-primary)/30 hover:bg-(--color-primary-dark) disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
          <p className="text-center text-sm text-(--color-muted)">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-(--color-primary)">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
