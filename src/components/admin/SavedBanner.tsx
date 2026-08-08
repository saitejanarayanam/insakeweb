export function SavedBanner({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="mb-4 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-2.5 text-sm font-medium text-green-700">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="shrink-0">
        <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Saved successfully.
    </div>
  );
}
