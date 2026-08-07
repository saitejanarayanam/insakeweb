"use client";

import { useState } from "react";

export function AdminSearchBox({
  scope,
  placeholder = "Search...",
}: {
  scope: string;
  placeholder?: string;
}) {
  const [query, setQuery] = useState("");

  function handleChange(value: string) {
    setQuery(value);
    const container = document.querySelector<HTMLElement>(`[data-search-scope="${scope}"]`);
    if (!container) return;
    const q = value.trim().toLowerCase();
    container.querySelectorAll<HTMLElement>("[data-search-row]").forEach((row) => {
      const matches = !q || (row.textContent ?? "").toLowerCase().includes(q);
      row.classList.toggle("hidden", !matches);
    });
  }

  return (
    <input
      type="search"
      value={query}
      onChange={(e) => handleChange(e.target.value)}
      placeholder={placeholder}
      className="w-full max-w-sm rounded-lg border border-(--color-border) bg-(--background) px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
    />
  );
}
