import { useEffect, useState } from "react";
import { ExternalLink, MapPin, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import CompanyLogo from "@/components/CompanyLogo";

interface ScrapedJob {
  id: string;
  title: string;
  company: string | null;
  location: string | null;
  region: string | null;
  apply_url: string;
  source_name: string;
  scraped_at: string;
}

interface LiveJobsProps {
  limit?: number;
  region?: string;
  compact?: boolean;
}

const LiveJobs = ({ limit = 12, region, compact = false }: LiveJobsProps) => {
  const [jobs, setJobs] = useState<ScrapedJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let q = supabase
        .from("scraped_jobs")
        .select("id,title,company,location,region,apply_url,source_name,scraped_at")
        .order("scraped_at", { ascending: false })
        .limit(limit);
      if (region) q = q.eq("region", region);
      const { data, error } = await q;
      if (!error && data) setJobs(data as ScrapedJob[]);
      setLoading(false);
    })();
  }, [limit, region]);

  if (loading) {
    return (
      <section className="py-16 md:py-20 border-t border-border">
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-center py-12 text-muted-foreground">
          <Loader2 className="animate-spin mr-2" size={16} /> Loading live listings…
        </div>
      </section>
    );
  }
  if (jobs.length === 0) return null;

  return (
    <section className="py-16 md:py-24 border-t border-border" style={{ backgroundColor: "#FAFAF8" }}>
      <div className="container mx-auto px-4 md:px-8">
        <header className="flex items-end justify-between mb-10 pb-6 border-b border-border">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live · Updated from partner sites
            </div>
            <h2
              className="text-3xl md:text-5xl text-foreground"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Fresh listings this week
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Verified openings pulled directly from BrighterMonday, Fuzu, JobAdverts UG and others.
            </p>
          </div>
          <Link to="/jobs" className="hidden md:inline-flex text-sm font-medium text-foreground border-b border-foreground pb-0.5 hover:text-primary hover:border-primary transition-colors">
            Browse all
          </Link>
        </header>

        <ul className={compact ? "grid md:grid-cols-2 gap-4" : "grid md:grid-cols-2 lg:grid-cols-3 gap-4"}>
          {jobs.map((j) => (
            <li key={j.id}>
              <article className="group h-full bg-white border border-border rounded-xl p-5 hover:shadow-[0_10px_40px_-16px_rgba(0,0,0,0.15)] hover:border-foreground/20 transition-all flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
                      {j.title}
                    </h3>
                    {j.company && (
                      <div className="mt-1.5 flex items-center gap-2 text-xs text-muted-foreground">
                        <CompanyLogo name={j.company} size="sm" />
                        <span>{j.company}</span>
                      </div>
                    )}
                  </div>
                  <span className="shrink-0 text-[10px] uppercase tracking-wider text-muted-foreground px-2 py-1 bg-secondary rounded">
                    {j.source_name.replace(/ (Uganda|Kenya)$/, "")}
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                  {j.region && (
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={12} /> {j.region}
                    </span>
                  )}
                </div>

                <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {new Date(j.scraped_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                  </span>
                  <a
                    href={j.apply_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2 transition-all"
                  >
                    Apply <ExternalLink size={13} />
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default LiveJobs;
