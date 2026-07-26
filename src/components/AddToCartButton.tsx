"use client";

import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cart-store";

export function AddToCartButton({
  courseId,
  slug,
  title,
  price,
}: {
  courseId: string;
  slug: string;
  title: string;
  price: number;
}) {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const inCart = items.some((i) => i.courseId === courseId);

  return (
    <div className="flex gap-3">
      <button
        onClick={() => addItem({ courseId, slug, title, price })}
        disabled={inCart}
        className="rounded-full bg-(--color-primary) px-6 py-3 text-sm font-semibold text-white shadow-md shadow-(--color-primary)/30 hover:bg-(--color-primary-dark) disabled:cursor-not-allowed disabled:opacity-60"
      >
        {inCart ? "Added to cart" : "Add to cart"}
      </button>
      {inCart && (
        <button
          onClick={() => router.push("/cart")}
          className="rounded-full border border-(--color-border) px-6 py-3 text-sm font-semibold hover:bg-(--color-surface)"
        >
          View cart
        </button>
      )}
    </div>
  );
}
