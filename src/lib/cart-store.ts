import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  courseId: string;
  slug: string;
  title: string;
  price: number; // paise
};

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (courseId: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        if (get().items.some((i) => i.courseId === item.courseId)) return;
        set({ items: [...get().items, item] });
      },
      removeItem: (courseId) =>
        set({ items: get().items.filter((i) => i.courseId !== courseId) }),
      clear: () => set({ items: [] }),
    }),
    { name: "insake-cart" }
  )
);
