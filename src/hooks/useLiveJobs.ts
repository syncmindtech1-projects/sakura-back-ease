import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Job } from "@/lib/jobData";
import {
  setLiveJobsCache,
  inferCategory,
  jobCategories,
  getJobCategoriesWithCounts,
} from "@/lib/jobData";

/**
 * Builds a mailto: apply link when an employer did not supply an apply URL.
 * Opens the visitor's mail client with a ready-to-send application email.
 */
export const buildApplyLink = (opts: {
  applyUrl?: string | null;
  contactEmail?: string | null;
  title: string;
  company: string;
}) => {
  const url = (opts.applyUrl || "").trim();
  if (url && /^(https?:|mailto:)/i.test(url)) return url;
  const email = (opts.contactEmail || "").trim();
  if (!email) return "";
  const subject = `Application for ${opts.title} at ${opts.company}`;
  const body =
    `Dear Hiring Team at ${opts.company},\n\n` +
    `I would like to apply for the ${opts.title} position advertised on JobSphere.\n\n` +
    `Please find my CV attached. I look forward to hearing from you.\n\n` +
    `Kind regards,\n`;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

export const isEmailApply = (link: string) =>
  link.toLowerCase().startsWith("mailto:");

const relative = (iso?: string | null) => {
  if (!iso) return "Recently";
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days <= 0) {
    const hours = Math.max(1, Math.floor(diff / 3600000));
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return `${months} month${months > 1 ? "s" : ""} ago`;
};

const normaliseType = (t?: string | null): Job["type"] => {
  const v = (t || "").toLowerCase();
  if (v.includes("part")) return "Part-time";
  if (v.includes("contract")) return "Contract";
  if (v.includes("freelance")) return "Freelance";
  if (v.includes("intern")) return "Internship";
  return "Full-time";
};

/** The database stores "Not Specified" / "Not Disclosed" as defaults; treat them as empty. */
const clean = (v?: string | null) => {
  const s = (v ?? "").trim();
  return !s || /^not (specified|disclosed)$/i.test(s) ? "" : s;
};

/** Use the stored sector only when it matches one of the site's categories; otherwise infer one. */
const resolveCategory = (
  sector: string,
  title: string,
  description?: string | null,
) => {
  const known = jobCategories.find(
    (c) => c.name.toLowerCase() === sector.toLowerCase(),
  );
  return known
    ? known.name
    : inferCategory(`${title} ${sector} ${description ?? ""}`);
};

let cache: Job[] | null = null;
let inflight: Promise<Job[]> | null = null;

const fetchJobs = async (): Promise<Job[]> => {
  const { data } = await supabase
    .from("jobs")
    .select(
      "id,title,employer,location,country,industry_sector,type,amount,description,url_link,source,posted_at,first_seen_at",
    )
    .eq("status", "active")
    .order("posted_at", { ascending: false, nullsFirst: false })
    .order("first_seen_at", { ascending: false })
    .limit(1000);

  const all: Job[] = (data ?? [])
    .filter((s: any) => !!s.url_link)
    .map((s: any) => {
      const title = s.title as string;
      const country = clean(s.country) || "East Africa";
      const location = clean(s.location) || country;
      const category = resolveCategory(
        clean(s.industry_sector),
        title,
        s.description,
      );
      const remote = /remote|work from home/i.test(
        `${title} ${s.location ?? ""} ${s.type ?? ""}`,
      );
      return {
        id: `sc-${s.id}`,
        title,
        company: clean(s.employer) || `Employer via ${s.source}`,
        location,
        type: normaliseType(s.type),
        category,
        salary: clean(s.amount) || "Not disclosed",
        posted: relative(s.posted_at ?? s.first_seen_at),
        remote,
        description:
          s.description ||
          `${title} — an open ${category.toLowerCase()} vacancy in ${country}. Click through to the original listing for full requirements, responsibilities and how to apply.`,
        tags: [category, remote ? "Remote" : null, country].filter(
          Boolean,
        ) as string[],
        applyUrl: s.url_link,
        source: s.source,
      } as Job;
    });

  cache = all;
  setLiveJobsCache(all);
  return all;
};

export const useLiveJobs = () => {
  const [jobs, setJobs] = useState<Job[]>(cache ?? []);
  const [loading, setLoading] = useState(!cache);

  useEffect(() => {
    let cancelled = false;
    if (!inflight)
      inflight = fetchJobs().finally(() => {
        inflight = null;
      });
    const p = cache ? Promise.resolve(cache) : inflight;
    p.then((data) => {
      if (!cancelled) {
        setJobs(data);
        setLoading(false);
      }
    }).catch(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  return { jobs, loading };
};

/** Countries JobSphere actively lists; anything else (Global, etc.) is excluded from the count. */
const SUPPORTED_COUNTRIES = new Set([
  "Uganda",
  "Kenya",
  "Tanzania",
  "Rwanda",
  "South Sudan",
  "Ethiopia",
  "Ghana",
]);

export const useLiveJobStats = () => {
  const { jobs, loading } = useLiveJobs();
  const companies = new Set(jobs.map((j) => j.company)).size;
  const countries = new Set(
    jobs
      .map((j) => j.location.split(",").pop()?.trim())
      .filter((c): c is string => !!c && SUPPORTED_COUNTRIES.has(c)),
  ).size;
  return { totalJobs: jobs.length, companies, countries, loading };
};

/** Job categories with live counts derived from the database. */
export const useJobCategories = () => {
  const { jobs, loading } = useLiveJobs();
  return { categories: getJobCategoriesWithCounts(jobs), loading };
};
