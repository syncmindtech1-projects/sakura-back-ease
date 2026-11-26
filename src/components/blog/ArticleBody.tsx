import { useMemo } from "react";
import { Link } from "react-router-dom";

export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

export const slugifyHeading = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export const extractHeadings = (body: string): Heading[] =>
  body
    .split("\n")
    .filter((l) => l.startsWith("## ") || l.startsWith("### "))
    .map((l) => {
      const level = l.startsWith("### ") ? 3 : 2;
      const text = l.replace(/^#{2,3}\s+/, "").trim();
      return { id: slugifyHeading(text), text, level } as Heading;
    });

const inline = (text: string, keyPrefix: string) => {
  // supports **bold** and [label](/path)
  const nodes: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*)|(\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = regex.exec(text))) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const token = m[0];
    if (token.startsWith("**")) {
      nodes.push(
        <strong key={`${keyPrefix}-b-${i++}`} className="font-semibold text-foreground">
          {token.slice(2, -2)}
        </strong>,
      );
    } else {
      const label = token.slice(1, token.indexOf("]"));
      const href = token.slice(token.indexOf("(") + 1, -1);
      nodes.push(
        <Link
          key={`${keyPrefix}-l-${i++}`}
          to={href}
          className="text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary"
        >
          {label}
        </Link>,
      );
    }
    last = m.index + token.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
};

const ArticleBody = ({ body }: { body: string }) => {
  const blocks = useMemo(() => body.split("\n").filter((l) => l.trim().length > 0), [body]);

  const out: React.ReactNode[] = [];
  let list: string[] = [];

  const flushList = (key: string) => {
    if (!list.length) return;
    out.push(
      <ul key={key} className="my-6 space-y-2.5 pl-5">
        {list.map((item, i) => (
          <li
            key={i}
            className="relative text-[1.0625rem] leading-[1.85] text-foreground/85 before:absolute before:-left-5 before:top-[0.85em] before:h-[5px] before:w-[5px] before:rounded-full before:bg-primary"
          >
            {inline(item, `${key}-${i}`)}
          </li>
        ))}
      </ul>,
    );
    list = [];
  };

  blocks.forEach((line, idx) => {
    if (line.startsWith("- ")) {
      list.push(line.slice(2));
      return;
    }
    flushList(`ul-${idx}`);

    if (line.startsWith("## ")) {
      const text = line.slice(3).trim();
      out.push(
        <h2
          key={idx}
          id={slugifyHeading(text)}
          className="blog-serif scroll-mt-28 text-[1.65rem] md:text-[2rem] font-semibold text-foreground mt-14 mb-4 leading-tight"
        >
          {text}
        </h2>,
      );
    } else if (line.startsWith("### ")) {
      const text = line.slice(4).trim();
      out.push(
        <h3
          key={idx}
          id={slugifyHeading(text)}
          className="blog-serif scroll-mt-28 text-xl md:text-2xl font-semibold text-foreground mt-10 mb-3"
        >
          {text}
        </h3>,
      );
    } else if (line.startsWith("> ")) {
      out.push(
        <blockquote
          key={idx}
          className="my-10 border-l-2 border-primary pl-6 md:pl-8 md:-ml-8"
        >
          <p className="blog-serif text-xl md:text-[1.6rem] leading-snug text-foreground italic">
            {inline(line.slice(2), `q-${idx}`)}
          </p>
        </blockquote>,
      );
    } else {
      out.push(
        <p key={idx} className="my-5 text-[1.0625rem] leading-[1.85] text-foreground/85">
          {inline(line, `p-${idx}`)}
        </p>,
      );
    }
  });
  flushList("ul-end");

  return <div className="blog-body">{out}</div>;
};

export default ArticleBody;
