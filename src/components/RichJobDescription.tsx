interface Props {
  text: string;
  className?: string;
}

/**
 * Renders job descriptions authored with the admin formatting toolbar.
 * Supports: ## / ### headings, - bullets, 1. numbered lists, **bold**,
 * blank-line paragraph breaks and single line breaks.
 */
const inline = (s: string) =>
  s
    .split(/(\*\*[^*]+\*\*)/g)
    .map((part, i) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>
      ) : (
        <span key={i}>{part}</span>
      )
    );

const RichJobDescription = ({ text, className = "" }: Props) => {
  const lines = (text || "").replace(/\r\n/g, "\n").split("\n");
  const blocks: JSX.Element[] = [];
  let list: string[] = [];
  let ordered = false;

  const flush = () => {
    if (!list.length) return;
    const items = list.map((li, i) => (
      <li key={i} className="text-sm text-muted-foreground leading-relaxed">{inline(li)}</li>
    ));
    blocks.push(
      ordered ? (
        <ol key={`l${blocks.length}`} className="list-decimal pl-5 space-y-1.5 my-3">{items}</ol>
      ) : (
        <ul key={`l${blocks.length}`} className="list-disc pl-5 space-y-1.5 my-3">{items}</ul>
      )
    );
    list = [];
  };

  lines.forEach((raw, idx) => {
    const line = raw.trimEnd();
    const bullet = line.match(/^\s*[-*•]\s+(.*)$/);
    const num = line.match(/^\s*\d+[.)]\s+(.*)$/);

    if (bullet) {
      if (ordered) flush();
      ordered = false;
      list.push(bullet[1]);
      return;
    }
    if (num) {
      if (!ordered) flush();
      ordered = true;
      list.push(num[1]);
      return;
    }
    flush();

    if (!line.trim()) return;

    const h3 = line.match(/^###\s+(.*)$/);
    const h2 = line.match(/^##\s+(.*)$/);
    if (h2) {
      blocks.push(<h3 key={idx} className="text-base font-semibold text-foreground mt-5 mb-2">{inline(h2[1])}</h3>);
      return;
    }
    if (h3) {
      blocks.push(<h4 key={idx} className="text-sm font-semibold text-foreground mt-4 mb-1.5">{inline(h3[1])}</h4>);
      return;
    }
    blocks.push(
      <p key={idx} className="text-sm text-muted-foreground leading-relaxed mb-3">{inline(line)}</p>
    );
  });
  flush();

  return <div className={className}>{blocks}</div>;
};

export default RichJobDescription;
