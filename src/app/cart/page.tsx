"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { formatINR } from "@/lib/format";
import { PageHero } from "@/components/PageHero";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = items.reduce((sum, i) => sum + i.price, 0);

  return (
    <div>
      <PageHero eyebrow="Your cart" title="Cart" />

      <div className="mx-auto max-w-3xl px-4 py-12">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-(--color-border) p-10 text-center">
            <p className="text-(--color-muted)">Your cart is empty.</p>
            <Link
              href="/courses"
              className="mt-4 inline-block rounded-full bg-(--color-primary) px-6 py-3 text-sm font-semibold text-white hover:bg-(--color-primary-dark)"
            >
              Browse courses
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.courseId}
                  className="flex items-center justify-between rounded-2xl border border-(--color-border) p-4"
                >
                  <div>
                    <Link href={`/courses/${item.slug}`} className="font-medium hover:text-(--color-primary)">
                      {item.title}
                    </Link>
                    <div className="text-sm text-(--color-muted)">{formatINR(item.price)}</div>
                  </div>
                  <button
                    onClick={() => removeItem(item.courseId)}
                    className="text-sm font-medium text-(--color-muted) hover:text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between rounded-2xl border border-(--color-border) bg-(--color-surface) p-5">
              <div>
                <div className="text-xs text-(--color-muted)">Subtotal</div>
                <div className="text-xl font-bold text-(--color-primary)">{formatINR(subtotal)}</div>
              </div>
              <Link
                href="/checkout"
                className="rounded-full bg-(--color-primary) px-6 py-3 text-sm font-semibold text-white shadow-md shadow-(--color-primary)/30 hover:bg-(--color-primary-dark)"
              >
                Proceed to checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
