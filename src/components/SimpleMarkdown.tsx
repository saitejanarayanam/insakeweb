const IMAGE_LINE = /^!\[(.*?)\]\((.*?)\)$/;
const BOLD = /\*\*(.+?)\*\*/g;

function renderInline(text: string) {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  for (const match of text.matchAll(BOLD)) {
    const index = match.index ?? 0;
    if (index > lastIndex) parts.push(text.slice(lastIndex, index));
    parts.push(<strong key={index}>{match[1]}</strong>);
    lastIndex = index + match[0].length;
  }
  parts.push(text.slice(lastIndex));
  return parts;
}

export function SimpleMarkdown({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <div className="prose-sm max-w-none space-y-2 text-sm text-(--foreground)">
      {lines.map((line, i) => {
        const image = line.match(IMAGE_LINE);
        if (image) {
          const [, alt, src] = image;
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={src}
              alt={alt}
              loading="lazy"
              className="my-4 w-full rounded-2xl border border-(--color-border) object-cover"
            />
          );
        }
        if (line.startsWith("## ")) {
          return (
            <h3 key={i} className="pt-2 text-base font-semibold">
              {renderInline(line.slice(3))}
            </h3>
          );
        }
        if (line.startsWith("# ")) {
          return (
            <h2 key={i} className="pt-2 text-lg font-bold">
              {renderInline(line.slice(2))}
            </h2>
          );
        }
        if (line.startsWith("- ")) {
          return (
            <li key={i} className="ml-5 list-disc text-(--color-muted)">
              {renderInline(line.slice(2))}
            </li>
          );
        }
        if (line.trim() === "") return null;
        return (
          <p key={i} className="text-(--color-muted)">
            {renderInline(line)}
          </p>
        );
      })}
    </div>
  );
}
