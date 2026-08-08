"use client";

export function ConfirmDeleteButton({
  confirmMessage = "Delete this? This can't be undone.",
  className,
  children = "Delete",
}: {
  confirmMessage?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(e) => {
        if (!window.confirm(confirmMessage)) e.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
