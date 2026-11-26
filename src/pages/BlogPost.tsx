import { useEffect, useMemo, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Calendar, ChevronRight, Clock, Linkedin, MessageCircle, Twitter } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import ArticleBody, { extractHeadings } from "@/components/blog/ArticleBody";
import {
  AUTHORS,
  formatDate,
  getPost,
  readTime,
  relatedPosts,
  wordCount,
} from "@/lib/blogData";

const SITE = "https://jobsphere.net";

const BlogPost = () => {
  const { slug } = useParams();
  const post = slug ? getPost(slug) : undefined;
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState("");

  const headings = useMemo(() => (post ? extractHeadings(post.body) : []), [post]);
  const words = post ? wordCount(post.body) : 0;
  const showToc = words > 800 && headings.length > 2;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setProgress(total > 0 ? Math.min(100, (h.scrollTop / total) * 100) : 0);

      let currentId = "";
      headings.forEach((hd) => {
        const el = document.getElementById(hd.id);
        if (el && el.getBoundingClientRect().top <= 120) currentId = hd.id;
      });
      setActiveId(currentId);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [headings]);

  if (!post) return <Navigate to="/blog" replace />;

  const author = AUTHORS[post.authorId];
  const url = `${SITE}/blog/${post.slug}`;
  const related = relatedPosts(post, 3);
  const minutes = readTime(post.body);

  const shareText = encodeURIComponent(post.title);
  const shareUrl = encodeURIComponent(url);
  const shares = [
    {
      label: "Share on LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
    },
    {
      label: "Share on X",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
    },
    {
      label: "Share on WhatsApp",
      icon: MessageCircle,
      href: `https://wa.me/?text=${shareText}%20${shareUrl}`,
    },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    image: [post.image],
    datePublished: post.date,
    dateModified: post.updated,
    author: { "@type": "Person", name: author.name, description: author.bio },
    publisher: {
      "@type": "Organization",
      name: "JobSphere",
      logo: { "@type": "ImageObject", url: `${SITE}/favicon.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: post.category,
    keywords: post.keyword,
    wordCount: words,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: post.category,
        item: `${SITE}/blog?category=${encodeURIComponent(post.category)}`,
      },
      { "@type": "ListItem", position: 4, name: post.title, item: url },
    ],
  };

  const faqSchema = post.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <PageLayout>
      <Helmet>
        <title>{post.seoTitle}</title>
        <meta name="description" content={post.metaDescription} />
        <meta name="keywords" content={post.keyword} />
        <meta name="author" content={author.name} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.seoTitle} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={post.image} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:modified_time" content={post.updated} />
        <meta property="article:section" content={post.category} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.seoTitle} />
        <meta name="twitter:description" content={post.metaDescription} />
        <meta name="twitter:image" content={post.image} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
      </Helmet>

      {/* Reading progress */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-50 bg-transparent" aria-hidden="true">
        <div className="h-full bg-primary transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>

      <article>
        {/* Header */}
        <header className="container mx-auto px-4 md:px-8 pt-12 md:pt-16 pb-8">
          <nav className="blog-sans flex items-center gap-2 text-xs text-muted-foreground mb-8" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <ChevronRight size={12} />
            <Link to="/blog" className="hover:text-foreground">Blog</Link>
            <ChevronRight size={12} />
            <Link to={`/blog?category=${encodeURIComponent(post.category)}`} className="hover:text-foreground">
              {post.category}
            </Link>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block blog-sans text-[11px] font-semibold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full border border-primary/30 text-primary">
              {post.category}
            </span>
            <h1 className="blog-serif text-3xl md:text-[3.2rem] leading-[1.06] font-semibold text-foreground mt-5">
              {post.title}
            </h1>
            <p className="blog-sans mt-5 text-lg text-muted-foreground leading-relaxed">{post.excerpt}</p>

            <div className="blog-sans flex flex-wrap items-center gap-x-6 gap-y-3 mt-8 text-sm text-muted-foreground">
              <span className="flex items-center gap-2.5">
                <img
                  src={author.photo}
                  alt={`Portrait of ${author.name}, ${author.role} covering East African careers`}
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <span className="text-foreground font-medium">{author.name}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} /> {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} /> {minutes} min read
              </span>
            </div>
          </div>
        </header>

        {/* Featured image */}
        <div className="container mx-auto px-4 md:px-8">
          <img
            src={post.image}
            alt={post.imageAlt}
            width={1200}
            height={700}
            fetchPriority="high"
            className="w-full aspect-[16/9] object-cover rounded-[20px] border border-border"
          />
        </div>

        {/* Body + TOC */}
        <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            {showToc && (
              <aside className="lg:col-span-3 order-2 lg:order-1">
                <div className="lg:sticky lg:top-24">
                  <p className="eyebrow mb-4">On this page</p>
                  <ul className="blog-sans space-y-2.5 border-l border-border">
                    {headings.map((h) => (
                      <li key={h.id} className={h.level === 3 ? "pl-7" : "pl-4"}>
                        <a
                          href={`#${h.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                          }}
                          className={`text-[13px] leading-snug block transition-colors ${
                            activeId === h.id ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            )}

            <div className={`${showToc ? "lg:col-span-9" : "lg:col-span-12"} order-1 lg:order-2`}>
              <div className="max-w-[42rem] blog-sans">
                <ArticleBody body={post.body} />

                {post.faqs && post.faqs.length > 0 && (
                  <section className="mt-16 pt-10 border-t border-border">
                    <h2 className="blog-serif text-2xl md:text-3xl font-semibold text-foreground mb-6">
                      Frequently asked questions
                    </h2>
                    <div className="space-y-6">
                      {post.faqs.map((f) => (
                        <div key={f.q}>
                          <h3 className="blog-serif text-lg font-semibold text-foreground">{f.q}</h3>
                          <p className="mt-2 text-[1.0625rem] leading-[1.8] text-foreground/80">{f.a}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Share */}
                <div className="mt-14 pt-8 border-t border-border flex flex-wrap items-center gap-3">
                  <span className="eyebrow mr-2">Share this article</span>
                  {shares.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                    >
                      <s.icon size={16} />
                    </a>
                  ))}
                </div>

                {/* Author */}
                <div className="mt-10 p-6 rounded-2xl border border-border bg-card flex gap-5">
                  <img
                    src={author.photo}
                    alt={`${author.name}, ${author.role} at JobSphere`}
                    width={64}
                    height={64}
                    loading="lazy"
                    className="w-16 h-16 rounded-full object-cover shrink-0"
                  />
                  <div>
                    <p className="blog-serif text-lg font-semibold text-foreground">{author.name}</p>
                    <p className="text-xs text-muted-foreground mb-2">{author.role}</p>
                    <p className="text-sm text-foreground/75 leading-relaxed">{author.bio}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related */}
      <section className="border-t border-border py-14">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="blog-serif text-2xl md:text-3xl font-semibold text-foreground mb-8">Related reading</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {related.map((r) => (
              <article key={r.slug} className="group">
                <Link to={`/blog/${r.slug}`} className="block overflow-hidden rounded-2xl border border-border">
                  <img
                    src={r.image}
                    alt={r.imageAlt}
                    width={800}
                    height={500}
                    loading="lazy"
                    decoding="async"
                    className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </Link>
                <span className="blog-sans block text-[11px] font-semibold uppercase tracking-[0.14em] text-primary mt-4">
                  {r.category}
                </span>
                <h3 className="blog-serif text-lg font-semibold text-foreground mt-2 leading-snug">
                  <Link to={`/blog/${r.slug}`} className="hover:text-primary transition-colors">
                    {r.title}
                  </Link>
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default BlogPost;
