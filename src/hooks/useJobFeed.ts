import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Server-side paginated job feed backed by the `scraped_jobs` table.
 * Column mapping: employer = company, url_link = apply_url,
 * time_added = posted_at (falls back to scraped_at), country = region.
 */
export const PAGE_SIZE = 20;

export interface FeedJob {
  id: string;
  title: string;
  employer: string;
  location: string;
  country: string;
  description: string;
  urlLink: string;
  timeAgo: string;
  jobType: string;
  salary: string;
  remote: boolean;
  logoUrl: string | null;
}

export const stripHtml = (html?: string | null) =>
  (html || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();

export const timeAgo = (iso?: string | null, now = Date.now()) => {
  if (!iso) return "Recently";
  const diff = Math.max(0, now - new Date(iso).getTime());
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return mins <= 1 ? "just now" : `${mins} minutes ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
  const months = Math.floor(days / 30);
  return `${months} month${months > 1 ? "s" : ""} ago`;
};

const typeLabel = (t?: string | null) => {
  const v = (t || "").toLowerCase();
  if (v.includes("part")) return "Part-time";
  if (v.includes("contract")) return "Contract";
  if (v.includes("freelance")) return "Freelance";
  if (v.includes("intern")) return "Internship";
  return "Full-time";
};

const typePattern: Record<string, string> = {
  "Part-time": "%part%",
  Contract: "%contract%",
  Freelance: "%freelance%",
  Internship: "%intern%",
};

let countryCache: string[] | null = null;

export const useJobCountries = () => {
  const [countries, setCountries] = useState<string[]>(countryCache ?? []);
  useEffect(() => {
    if (countryCache) return;
    (async () => {
      const set = new Map<string, number>();
      for (let from = 0; from < 10000; from += 1000) {
        const { data } = await supabase.from("scraped_jobs").select("region").range(from, from + 999);
        (data ?? []).forEach((r: any) => r.region && set.set(r.region, (set.get(r.region) ?? 0) + 1));
        if (!data || data.length < 1000) break;
      }
      const list = [...set.entries()].sort((a, b) => b[1] - a[1]).map(([c]) => c);
      countryCache = list;
      setCountries(list);
    })();
  }, []);
  return countries;
};

export const useJobFeed = (opts: { country: string; query: string; type: string; page: number }) => {
  const { country, query, type, page } = opts;
  const [jobs, setJobs] = useState<FeedJob[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      let q = supabase
        .from("scraped_jobs")
        .select("id,title,company,location,region,description,apply_url,posted_at,scraped_at,job_type,salary,remote,logo_url,source_name", { count: "exact" })
        .not("apply_url", "is", null);
      if (country && country !== "All") q = q.eq("region", country);
      const s = query.trim().replace(/[%,()]/g, " ");
      if (s) q = q.or(`title.ilike.%${s}%,company.ilike.%${s}%`);
      if (type !== "All") {
        if (type === "Full-time") q = q.or("job_type.is.null,job_type.ilike.%full%");
        else q = q.ilike("job_type", typePattern[type]);
      }
      const from = (page - 1) * PAGE_SIZE;
      const { data, count } = await q
        .order("posted_at", { ascending: false, nullsFirst: false })
        .order("scraped_at", { ascending: false })
        .range(from, from + PAGE_SIZE - 1);
      if (cancelled) return;
      setJobs(
        (data ?? []).map((r: any) => ({
          id: r.id,
          title: r.title,
          employer: r.company || `Employer via ${r.source_name}`,
          location: r.location || r.region || "",
          country: r.region || "",
          description: stripHtml(r.description),
          urlLink: r.apply_url,
          timeAgo: timeAgo(r.posted_at ?? r.scraped_at),
          jobType: typeLabel(r.job_type),
          salary: r.salary || "Not disclosed",
          remote: !!r.remote,
          logoUrl: r.logo_url ?? null,
        }))
      );
      setTotal(count ?? 0);
      setLoading(false);
    })().catch(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, [country, query, type, page]);

  return { jobs, total, loading };
};
