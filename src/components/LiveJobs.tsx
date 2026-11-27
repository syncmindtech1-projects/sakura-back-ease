import { useEffect, useState } from "react";
import { ExternalLink, MapPin, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import CompanyLogo from "@/components/CompanyLogo";

interface LiveJob {
  id: string;
  title: string;
  employer: string | null;
  location: string | null;
  country: string | null;
  url_link: string;
  source: string;
  posted_at: string | null;
  first_seen_at: string;
}

interface LiveJobsProps {
  limit?: number;
  /** Filters by the `country` column. */
  region?: string;
  compact?: boolean;
}

const clean = (v?: string | null) => {
  const s = (v ?? "").trim();
  return !s || /^not (specified|disclosed)$/i.test(s) ? "" : s;
};

const LiveJobs = ({ limit = 12, region, compact = false }: LiveJobsProps) => {
  const [jobs, setJobs] = useState<LiveJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let q = supabase
        .from("jobs")
        .select(
          "id,title,employer,location,country,url_link,source,posted_at,first_seen_at",
        )
        .eq("status", "active")
        .order("posted_at", { ascending: false, nullsFirst: false })
        .order("first_seen_at", { ascending: false })
        .limit(limit);
      if (region) q = q.eq("country", region);
      const { data, error } = await q;
      if (!error && data) setJobs(data as LiveJob[]);
      setLoading(false);
    })();
  }, [limit, region]);

  if (loading) {
    return (
      <section className="py-16 md:py-20 border-t border-border">
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-center py-12 text-muted-foreground">
          <Loader2 className="animate-spin mr-2" size={16} /> Loading live
          listings…
        </div>
      </section>
    );
  }
  if (jobs.length === 0) return null;

  return (
    <section
      className="py-16 md:py-24 border-t border-border"
      style={{ backgroundColor: "#FAFAF8" }}
    >
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
              Verified openings pulled directly from BrighterMonday, Fuzu,
              JobAdverts UG and others.
            </p>
          </div>
          <Link
            to="/jobs"
            className="hidden md:inline-flex text-sm font-medium text-foreground border-b border-foreground pb-0.5 hover:text-primary hover:border-primary transition-colors"
          >
            Browse all
          </Link>
        </header>

        <ul
          className={
            compact
              ? "grid md:grid-cols-2 gap-4"
              : "grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          }
        >
          {jobs.map((j) => {
            const employer = clean(j.employer);
            return (
              <li key={j.id}>
                <article className="group h-full bg-white border border-border rounded-xl p-5 hover:shadow-[0_10px_40px_-16px_rgba(0,0,0,0.15)] hover:border-foreground/20 transition-all flex flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-semibold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        {j.title}
                      </h3>
                      {employer && (
                        <div className="mt-1.5 flex items-center gap-2 text-xs text-muted-foreground">
                          <CompanyLogo name={employer} size="sm" />
                          <span>{employer}</span>
                        </div>
                      )}
                    </div>
                    <span className="shrink-0 text-[10px] uppercase tracking-wider text-muted-foreground px-2 py-1 bg-secondary rounded">
                      {(j.source ?? "").replace(/ (Uganda|Kenya)$/, "")}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                    {(clean(j.location) || j.country) && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={12} /> {clean(j.location) || j.country}
                      </span>
                    )}
                  </div>

                  <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {new Date(
                        j.posted_at ?? j.first_seen_at,
                      ).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                    <a
                      href={j.url_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2 transition-all"
                    >
                      Apply <ExternalLink size={13} />
                    </a>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default LiveJobs;
