import { useRef, useState } from "react";
import { Bold, Heading1, Heading2, List, ListOrdered, CornerDownLeft, Pilcrow, Eye, Pencil } from "lucide-react";
import RichJobDescription from "@/components/RichJobDescription";

interface Props {
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  label?: string;
}

/** Textarea with a word-processor style formatting toolbar + live preview. */
const DescriptionEditor = ({ value, onChange, rows = 12, label = "Description" }: Props) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [preview, setPreview] = useState(false);

  const apply = (fn: (sel: string, before: string, after: string) => { text: string; caret?: number }) => {
    const el = ref.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const before = value.slice(0, start);
    const sel = value.slice(start, end);
    const after = value.slice(end);
    const { text, caret } = fn(sel, before, after);
    onChange(text);
    requestAnimationFrame(() => {
      el.focus();
      const pos = caret ?? text.length;
      el.setSelectionRange(pos, pos);
    });
  };

  // Prefix every selected line (or the current line) with a marker.
  const linePrefix = (marker: string | ((i: number) => string)) =>
    apply((sel, before, after) => {
      const lineStart = before.lastIndexOf("\n") + 1;
      const head = before.slice(0, lineStart);
      const chunk = (before.slice(lineStart) + sel) || "";
      const lines = chunk.split("\n");
      const out = lines
        .map((l, i) => {
          const clean = l.replace(/^\s*(#{2,3}\s+|[-*•]\s+|\d+[.)]\s+)/, "");
          const m = typeof marker === "string" ? marker : marker(i);
          return clean.trim() ? m + clean : clean;
        })
        .join("\n");
      const text = head + out + after;
      return { text, caret: (head + out).length };
    });

  const wrapBold = () =>
    apply((sel, before, after) => {
      const inner = sel || "bold text";
      const text = `${before}**${inner}**${after}`;
      return { text, caret: before.length + inner.length + 4 };
    });

  const insert = (snippet: string) =>
    apply((sel, before, after) => {
      const text = `${before}${snippet}${sel}${after}`;
      return { text, caret: before.length + snippet.length + sel.length };
    });

  const Btn = ({ icon: Icon, title, onClick }: any) => (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className="p-2 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground"
    >
      <Icon size={14} />
    </button>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="text-xs font-semibold">{label}</label>
        <button
          type="button"
          onClick={() => setPreview((p) => !p)}
          className="text-xs inline-flex items-center gap-1 px-2 py-1 rounded-md border border-border hover:bg-secondary"
        >
          {preview ? <Pencil size={12} /> : <Eye size={12} />} {preview ? "Edit" : "Preview"}
        </button>
      </div>

      <div className="border border-border rounded-lg overflow-hidden bg-secondary">
        <div className="flex flex-wrap items-center gap-0.5 px-2 py-1 border-b border-border bg-card">
          <Btn icon={Heading1} title="Heading" onClick={() => linePrefix("## ")} />
          <Btn icon={Heading2} title="Sub-heading" onClick={() => linePrefix("### ")} />
          <Btn icon={Bold} title="Bold" onClick={wrapBold} />
          <span className="w-px h-4 bg-border mx-1" />
          <Btn icon={List} title="Bullet list" onClick={() => linePrefix("- ")} />
          <Btn icon={ListOrdered} title="Numbered list" onClick={() => linePrefix((i) => `${i + 1}. `)} />
          <span className="w-px h-4 bg-border mx-1" />
          <Btn icon={CornerDownLeft} title="Line break" onClick={() => insert("\n")} />
          <Btn icon={Pilcrow} title="New paragraph (blank line)" onClick={() => insert("\n\n")} />
        </div>

        {preview ? (
          <div className="bg-card p-4 min-h-[220px] max-h-[420px] overflow-y-auto">
            {value.trim() ? (
              <RichJobDescription text={value} />
            ) : (
              <p className="text-sm text-muted-foreground">Nothing to preview yet.</p>
            )}
          </div>
        ) : (
          <textarea
            ref={ref}
            rows={rows}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 bg-secondary text-sm outline-none resize-y font-mono leading-relaxed"
            placeholder={"## About the role\nWrite a short intro paragraph.\n\n### Responsibilities\n- First duty\n- Second duty"}
          />
        )}
      </div>
      <p className="text-[11px] text-muted-foreground mt-1">
        Use the buttons for headings, bold, bullets, numbered lists and spacing — the job page renders it exactly as previewed.
      </p>
    </div>
  );
};

export default DescriptionEditor;
