import { ReactNode } from "react";

interface Props {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

const LegalDoc = ({ title, lastUpdated, children }: Props) => (
  <article className="container mx-auto px-4 md:px-8 py-16 md:py-24 max-w-3xl">
    <header className="pb-8 mb-10 border-b border-border">
      <span className="eyebrow">Legal</span>
      <h1 className="serif text-4xl md:text-5xl mt-3 text-foreground">{title}</h1>
      <p className="text-sm text-muted-foreground mt-4">Last updated: {lastUpdated}</p>
    </header>

    <div
      className="space-y-5 text-[15px] leading-relaxed text-muted-foreground
        [&_h2]:serif [&_h2]:text-xl [&_h2]:md:text-2xl [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-3
        [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4"
    >
      {children}
    </div>
  </article>
);

export default LegalDoc;
