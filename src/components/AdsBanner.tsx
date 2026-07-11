import { ExternalLink, X } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Ad {
  id: string;
  title: string;
  blurb: string;
  sponsor: string;
  cta: string;
  link: string;
}

const ads: Ad[] = [
  { id: "1", title: "Get certified in Data Science, AI & Cloud", blurb: "Industry credentials from Stanford, Google and IBM — audit for free, upgrade when ready.", sponsor: "Coursera", cta: "Start learning", link: "#" },
  { id: "2", title: "A resume that gets you interviews", blurb: "Expert-written revisions and ATS-ready formatting. 95% of clients report more callbacks within 30 days.", sponsor: "TopResume", cta: "Request review", link: "#" },
  { id: "3", title: "Hire across 900M+ professionals", blurb: "Reach vetted candidates on the world's largest professional network. First job post is on us.", sponsor: "LinkedIn Talent", cta: "Post a role", link: "#" },
  { id: "4", title: "Remote work across Africa & beyond", blurb: "A curated board of remote roles from vetted, distributed-first companies hiring across the continent.", sponsor: "RemoteAfrica", cta: "Explore roles", link: "#" },
  { id: "5", title: "Practise interviews with an AI coach", blurb: "Simulated rounds tailored to your role, with structured feedback on clarity, structure and delivery.", sponsor: "InterviewPro", cta: "Try a session", link: "#" },
  { id: "6", title: "Certifications that pay off", blurb: "Verified programs that lift median salaries by up to 35%. Filter by industry, cost and time to complete.", sponsor: "CertifyNow", cta: "Browse programs", link: "#" },
  { id: "7", title: "Free coding bootcamps for African talent", blurb: "Fully funded cohorts in Python, JavaScript and data engineering. Applications open on a rolling basis.", sponsor: "AfricanDevs", cta: "Apply now", link: "#" },
  { id: "8", title: "Health cover built for freelancers", blurb: "Affordable, portable coverage from $15/month across East Africa. Underwritten and regulated.", sponsor: "CoverAfrica", cta: "See plans", link: "#" },
];

interface AdsBannerProps {
  variant?: "inline" | "sidebar" | "banner";
  adIndex?: number;
}

const Meta = ({ sponsor }: { sponsor: string }) => (
  <div className="flex items-center gap-2 eyebrow">
    <span className="inline-block w-1.5 h-1.5 rounded-full bg-foreground" />
    Sponsored · {sponsor}
  </div>
);

const AdsBanner = ({ variant = "inline", adIndex = 0 }: AdsBannerProps) => {
  const [dismissed, setDismissed] = useState(false);
  const slotKey = `banner-${adIndex}`;
  const fallback = ads[adIndex % ads.length];
  const [ad, setAd] = useState<Ad>(fallback);

  useEffect(() => {
    supabase.from("site_ads").select("*").eq("slot_key", slotKey).eq("active", true).maybeSingle()
      .then(({ data }) => {
        if (data) setAd({
          id: data.id,
          title: data.title,
          blurb: data.blurb ?? "",
          sponsor: data.sponsor ?? "Sponsored",
          cta: data.cta_label ?? "Learn more",
          link: data.cta_link ?? "#",
        });
      });
  }, [slotKey]);

  if (dismissed) return null;

  if (variant === "banner") {
    return (
      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4 md:px-8">
          <article className="relative border-y border-border py-10 md:py-14">
            <button
              onClick={() => setDismissed(true)}
              className="absolute top-4 right-0 p-1.5 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Dismiss sponsored content"
            >
              <X size={14} />
            </button>
            <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-start">
              <div className="md:col-span-3">
                <Meta sponsor={ad.sponsor} />
                <div className="mt-3 text-xs text-muted-foreground">Partner content presented alongside editorial. JobSphere does not endorse third-party offers.</div>
              </div>
              <div className="md:col-span-6">
                <h3 className="serif text-2xl md:text-[32px] leading-tight text-foreground">{ad.title}</h3>
                <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed">{ad.blurb}</p>
              </div>
              <div className="md:col-span-3 md:text-right">
                <a
                  href={ad.link}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center gap-2 text-sm font-medium text-foreground border-b border-foreground pb-0.5 hover:text-primary hover:border-primary transition-colors"
                >
                  {ad.cta} <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>
    );
  }

  if (variant === "sidebar") {
    return (
      <aside className="border border-border bg-card p-5 relative">
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-3 right-3 p-1 text-muted-foreground hover:text-foreground"
          aria-label="Dismiss"
        >
          <X size={12} />
        </button>
        <Meta sponsor={ad.sponsor} />
        <h4 className="serif text-lg leading-snug text-foreground mt-3">{ad.title}</h4>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{ad.blurb}</p>
        <a
          href={ad.link}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground border-b border-foreground pb-0.5 hover:text-primary hover:border-primary transition-colors"
        >
          {ad.cta} <ExternalLink size={12} />
        </a>
      </aside>
    );
  }

  return (
    <article className="border-y border-border py-5 relative">
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-3 right-0 p-1 text-muted-foreground hover:text-foreground"
        aria-label="Dismiss"
      >
        <X size={12} />
      </button>
      <div className="grid md:grid-cols-[160px_1fr_auto] gap-4 md:gap-8 items-center">
        <Meta sponsor={ad.sponsor} />
        <div className="min-w-0">
          <h4 className="serif text-lg leading-snug text-foreground">{ad.title}</h4>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{ad.blurb}</p>
        </div>
        <a
          href={ad.link}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="shrink-0 inline-flex items-center gap-1.5 text-sm font-medium text-foreground border-b border-foreground pb-0.5 hover:text-primary hover:border-primary transition-colors"
        >
          {ad.cta} <ExternalLink size={12} />
        </a>
      </div>
    </article>
  );
};

export default AdsBanner;
