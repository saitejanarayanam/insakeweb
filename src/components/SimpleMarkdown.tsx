export function SimpleMarkdown({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <div className="prose-sm max-w-none space-y-2 text-sm text-(--foreground)">
      {lines.map((line, i) => {
        if (line.startsWith("## ")) {
          return (
            <h3 key={i} className="pt-2 text-base font-semibold">
              {line.slice(3)}
            </h3>
          );
        }
        if (line.startsWith("# ")) {
          return (
            <h2 key={i} className="pt-2 text-lg font-bold">
              {line.slice(2)}
            </h2>
          );
        }
        if (line.startsWith("- ")) {
          return (
            <li key={i} className="ml-5 list-disc text-(--color-muted)">
              {line.slice(2)}
            </li>
          );
        }
        if (line.trim() === "") return null;
        return (
          <p key={i} className="text-(--color-muted)">
            {line}
          </p>
        );
      })}
    </div>
  );
}
