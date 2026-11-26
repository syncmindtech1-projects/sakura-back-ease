import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Calendar, ChevronLeft, ChevronRight, Clock, Search } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import {
  AUTHORS,
  BLOG_CATEGORIES,
  BLOG_POSTS,
  formatDate,
  readTime,
  sortedPosts,
} from "@/lib/blogData";

const SITE = "https://jobsphere.net";
const PER_PAGE = 9;

const Blog = () => {
  const [params, setParams] = useSearchParams();
  const category = params.get("category") || "All";
  const query = params.get("q") || "";
  const page = Math.max(1, parseInt(params.get("page") || "1", 10));
  const [search, setSearch] = useState(query);

  const all = useMemo(() => sortedPosts(), []);
  const featured = all.find((p) => p.featured) || all[0];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter((p) => {
      const inCat = category === "All" || p.category === category;
      const inQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.keyword.toLowerCase().includes(q);
      return inCat && inQ;
    });
  }, [all, category, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, totalPages);
  const pagePosts = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  const update = (next: Record<string, string>) => {
    const p = new URLSearchParams(params);
    Object.entries(next).forEach(([k, v]) => (v ? p.set(k, v) : p.delete(k)));
    setParams(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "JobSphere Journal",
    url: `${SITE}/blog`,
    description:
      "Careers, hiring and the East African job market — reporting and practical guides from the JobSphere editorial team.",
    publisher: { "@type": "Organization", name: "JobSphere", url: SITE },
    blogPost: BLOG_POSTS.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${SITE}/blog/${p.slug}`,
      datePublished: p.date,
      dateModified: p.updated,
      author: { "@type": "Person", name: AUTHORS[p.authorId].name },
      image: p.image,
    })),
  };

  return (
    <PageLayout>
      <Helmet>
        <title>JobSphere Journal — Careers &amp; Hiring in East Africa</title>
        <meta
          name="description"
          content="Practical guides on job searching, hiring and remote work across Uganda, Kenya, Tanzania and Rwanda, written by the JobSphere editorial team."
        />
        <link rel="canonical" href={`${SITE}/blog`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="JobSphere Journal — Careers & Hiring in East Africa" />
        <meta
          property="og:description"
          content="Job search guides, employer resources and remote work reporting for East Africa."
        />
        <meta property="og:url" content={`${SITE}/blog`} />
        <meta property="og:image" content={featured.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="JobSphere Journal — Careers & Hiring in East Africa" />
        <meta
          name="twitter:description"
          content="Job search guides, employer resources and remote work reporting for East Africa."
        />
        <meta name="twitter:image" content={featured.image} />
        <script type="application/ld+json">{JSON.stringify(blogSchema)}</script>
      </Helmet>

      {/* Masthead */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 md:px-8 pt-14 pb-10 md:pt-20 md:pb-14">
          <div className="max-w-3xl">
            <span className="eyebrow">The JobSphere Journal</span>
            <h1 className="blog-serif text-4xl md:text-6xl font-semibold text-foreground mt-4 leading-[1.05]">
              Work, hiring and the East African job market
            </h1>
            <p className="blog-sans mt-5 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Reported guides for jobseekers and employers across Uganda, Kenya, Tanzania, Rwanda
              and Ethiopia — written by people who have sat on both sides of the interview table.
            </p>
          </div>
        </div>
      </header>

      {/* Featured */}
      {current === 1 && category === "All" && !query && (
        <section className="border-b border-border">
          <div className="container mx-auto px-4 md:px-8 py-10 md:py-14">
            <article className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <Link
                to={`/blog/${featured.slug}`}
                className="lg:col-span-7 block overflow-hidden rounded-[20px] border border-border"
              >
                <img
                  src={featured.image}
                  alt={featured.imageAlt}
                  width={1200}
                  height={700}
                  fetchPriority="high"
                  className="w-full aspect-[16/10] object-cover transition-transform duration-500 hover:scale-[1.03]"
                />
              </Link>
              <div className="lg:col-span-5">
                <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full border border-primary/30 text-primary">
                  {featured.category}
                </span>
                <h2 className="blog-serif text-3xl md:text-[2.6rem] leading-[1.1] font-semibold text-foreground mt-4">
                  <Link to={`/blog/${featured.slug}`} className="hover:text-primary transition-colors">
                    {featured.title}
                  </Link>
                </h2>
                <p className="blog-sans mt-4 text-muted-foreground leading-relaxed">{featured.excerpt}</p>
                <div className="blog-sans flex flex-wrap items-center gap-4 mt-6 text-xs text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <img
                      src={AUTHORS[featured.authorId].photo}
                      alt={`Portrait of ${AUTHORS[featured.authorId].name}, ${AUTHORS[featured.authorId].role}`}
                      width={28}
                      height={28}
                      loading="lazy"
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    {AUTHORS[featured.authorId].name}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} /> {formatDate(featured.date)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} /> {readTime(featured.body)} min read
                  </span>
                </div>
                <Link
                  to={`/blog/${featured.slug}`}
                  className="blog-sans inline-flex items-center gap-2 mt-7 text-sm font-semibold text-primary hover:gap-3 transition-all"
                >
                  Read more <ChevronRight size={16} />
                </Link>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* Filters */}
      <section className="border-b border-border sticky top-0 z-30 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <nav className="blog-sans flex gap-1.5 overflow-x-auto scrollbar-none -mx-1 px-1">
            {["All", ...BLOG_CATEGORIES].map((c) => (
              <button
                key={c}
                onClick={() => update({ category: c === "All" ? "" : c, page: "" })}
                className={`whitespace-nowrap text-[13px] font-medium px-3.5 py-1.5 rounded-full border transition-colors ${
                  category === c
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </nav>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              update({ q: search, page: "" });
            }}
            className="relative shrink-0"
          >
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles"
              aria-label="Search blog articles"
              className="blog-sans w-full md:w-64 pl-9 pr-3 py-2 text-sm rounded-full bg-secondary border border-border outline-none focus:border-primary transition-colors"
            />
          </form>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-8">
          {pagePosts.length === 0 ? (
            <p className="blog-sans text-muted-foreground py-16 text-center">
              Nothing published under that filter yet — more stories are coming up shortly.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {pagePosts.map((p, i) => {
                const author = AUTHORS[p.authorId];
                const tall = i % 5 === 0;
                return (
                  <article key={p.slug} className="group flex flex-col">
                    <Link to={`/blog/${p.slug}`} className="overflow-hidden rounded-2xl border border-border">
                      <img
                        src={p.image}
                        alt={p.imageAlt}
                        width={800}
                        height={500}
                        loading="lazy"
                        decoding="async"
                        className={`w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] ${
                          tall ? "aspect-[4/3]" : "aspect-[16/10]"
                        }`}
                      />
                    </Link>
                    <div className="mt-5 flex-1 flex flex-col">
                      <span className="blog-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                        {p.category}
                      </span>
                      <h3 className="blog-serif text-xl md:text-[1.4rem] leading-snug font-semibold text-foreground mt-2">
                        <Link to={`/blog/${p.slug}`} className="hover:text-primary transition-colors">
                          {p.title}
                        </Link>
                      </h3>
                      <p className="blog-sans mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {p.excerpt}
                      </p>
                      <div className="blog-sans mt-5 pt-4 border-t border-border flex items-center gap-3 text-xs text-muted-foreground">
                        <img
                          src={author.photo}
                          alt={`Portrait of ${author.name}, ${author.role} at JobSphere`}
                          width={24}
                          height={24}
                          loading="lazy"
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span>{author.name}</span>
                        <span className="ml-auto flex items-center gap-1.5">
                          <Clock size={12} /> {readTime(p.body)} min
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {totalPages > 1 && (
            <div className="blog-sans flex items-center justify-center gap-3 mt-16">
              <button
                onClick={() => update({ page: String(current - 1) })}
                disabled={current === 1}
                className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-full border border-border disabled:opacity-40 hover:border-foreground/40 transition-colors"
              >
                <ChevronLeft size={15} /> Previous
              </button>
              <span className="text-sm text-muted-foreground num">
                Page {current} of {totalPages}
              </span>
              <button
                onClick={() => update({ page: String(current + 1) })}
                disabled={current === totalPages}
                className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-full border border-border disabled:opacity-40 hover:border-foreground/40 transition-colors"
              >
                Next <ChevronRight size={15} />
              </button>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default Blog;
