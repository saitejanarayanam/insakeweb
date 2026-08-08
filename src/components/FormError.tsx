export function FormError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="mt-0.5 shrink-0">
        <circle cx="12" cy="12" r="9" strokeWidth="2" />
        <path d="M12 8v5M12 16h.01" strokeWidth="2" strokeLinecap="round" />
      </svg>
      {message}
    </div>
  );
}
