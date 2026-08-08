"use client";

import Script from "next/script";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import { formatINR } from "@/lib/format";
import { PageHero } from "@/components/PageHero";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
    };
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const subtotal = items.reduce((sum, i) => sum + i.price, 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scriptReady, setScriptReady] = useState(false);

  async function handlePay() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseIds: items.map((i) => i.courseId) }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong");
        setLoading(false);
        return;
      }

      if (!data.keyId) {
        setError("Payments are not configured yet. Add your Razorpay key to .env to enable checkout.");
        setLoading(false);
        return;
      }

      const razorpay = new window.Razorpay({
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "inSAKE",
        description: "Course enrollment",
        order_id: data.razorpayOrderId,
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          const verifyRes = await fetch("/api/checkout/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId: data.orderId, ...response }),
          });
          if (verifyRes.ok) {
            clear();
            router.push("/dashboard?enrolled=1");
          } else {
            setError("Payment verification failed. Please contact support.");
          }
        },
        theme: { color: "#7c3aed" },
      });
      razorpay.open();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <meta name="robots" content="noindex, nofollow" />
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => setScriptReady(true)}
      />
      <PageHero eyebrow="Checkout" title="Complete your enrollment" />

      <div className="mx-auto max-w-2xl px-4 py-12">
        {items.length === 0 ? (
          <p className="text-center text-(--color-muted)">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-3 rounded-2xl border border-(--color-border) p-5">
              {items.map((item) => (
                <div key={item.courseId} className="flex justify-between text-sm">
                  <span>{item.title}</span>
                  <span className="text-(--color-muted)">{formatINR(item.price)}</span>
                </div>
              ))}
              <div className="mt-2 flex justify-between border-t border-(--color-border) pt-3 text-base font-semibold">
                <span>Total</span>
                <span className="text-(--color-primary)">{formatINR(subtotal)}</span>
              </div>
            </div>

            {error && (
              <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p>
            )}

            <button
              onClick={handlePay}
              disabled={loading || !scriptReady}
              className="mt-6 w-full rounded-full bg-(--color-primary) px-6 py-3 text-sm font-semibold text-white shadow-md shadow-(--color-primary)/30 hover:bg-(--color-primary-dark) disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Processing..." : `Pay ${formatINR(subtotal)}`}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
