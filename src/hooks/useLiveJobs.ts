import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Job } from "@/lib/jobData";
import { setLiveJobsCache } from "@/lib/jobData";

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

export const isEmailApply = (link: string) => link.toLowerCase().startsWith("mailto:");

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

let cache: Job[] | null = null;
let inflight: Promise<Job[]> | null = null;

const fetchJobs = async (): Promise<Job[]> => {
  const [scraped, posted] = await Promise.all([
    supabase
      .from("scraped_jobs")
      .select("*")
      .order("posted_at", { ascending: false, nullsFirst: false })
      .limit(1000),
    supabase.from("posted_jobs").select("*").order("created_at", { ascending: false }).limit(300),
  ]);

  const postedJobs: Job[] = (posted.data ?? []).map((p: any) => ({
    id: `posted-${p.id}`,
    title: p.title,
    company: p.company,
    location: p.location ?? "Uganda",
    type: normaliseType(p.job_type),
    category: p.category ?? "General",
    salary: p.salary ?? "Not disclosed",
    posted: relative(p.created_at),
    featured: true,
    remote: /remote/i.test(`${p.location ?? ""} ${p.job_type ?? ""}`),
    description: p.description ?? "",
    tags: [p.category, p.job_type].filter(Boolean) as string[],
    applyUrl: buildApplyLink({
      applyUrl: p.apply_url,
      contactEmail: p.contact_email,
      title: p.title,
      company: p.company,
    }),
    contactEmail: p.contact_email ?? undefined,
    source: "JobSphere",
  }));

  const scrapedJobs: Job[] = (scraped.data ?? [])
    .filter((s: any) => !!s.apply_url)
    .map((s: any) => {
      const title = s.title as string;
      const region = s.region ?? "East Africa";
      const category = s.category ?? inferCategory(`${title} ${s.description ?? ""}`);
      const remote = !!s.remote || /remote|work from home/i.test(`${title} ${s.location ?? ""}`);
      return {
        id: `sc-${s.id}`,
        title,
        company: s.company ?? `Employer via ${s.source_name}`,
        location: s.location ?? region,
        type: normaliseType(s.job_type),
        category,
        salary: s.salary ?? "Not disclosed",
        posted: relative(s.posted_at ?? s.scraped_at),
        remote,
        description:
          s.description ||
          `${title} — an open ${category.toLowerCase()} vacancy in ${region}. Click through to the original listing for full requirements, responsibilities and how to apply.`,
        tags: [category, remote ? "Remote" : null, region].filter(Boolean) as string[],
        applyUrl: s.apply_url,
        source: s.source_name,
      } as Job;
    });

  const all = [...postedJobs, ...scrapedJobs];
  cache = all;
  setLiveJobsCache(all);
  return all;
};


export const useLiveJobs = () => {
  const [jobs, setJobs] = useState<Job[]>(cache ?? []);
  const [loading, setLoading] = useState(!cache);

  useEffect(() => {
    let cancelled = false;
    if (!inflight) inflight = fetchJobs().finally(() => { inflight = null; });
    const p = cache ? Promise.resolve(cache) : inflight;
    p.then((data) => {
      if (!cancelled) { setJobs(data); setLoading(false); }
    }).catch(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, []);

  return { jobs, loading };
};

export const useLiveJobStats = () => {
  const { jobs, loading } = useLiveJobs();
  const companies = new Set(jobs.map((j) => j.company)).size;
  const countries = new Set(
    jobs.map((j) => j.location.split(",").pop()?.trim()).filter(Boolean)
  ).size;
  return { totalJobs: jobs.length, companies, countries, loading };
};
