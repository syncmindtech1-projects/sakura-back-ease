import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const BM_UG = /brightermonday\.co\.ug\/listings\/[a-z0-9-]+/i;
const BM_KE = /brightermonday\.co\.ke\/listings\/[a-z0-9-]+/i;
const FUZU = /fuzu\.com\/[a-z-]+\/jobs\/[a-z0-9-]+-\d+/i;
const JA_UG = /jobadverts\.ug\/(\?post_type=jb-job&p=\d+|job\/[^/]+)/i;

const JOB_SOURCES = [
  { url: 'https://www.brightermonday.co.ug/jobs', region: 'Uganda', name: 'BrighterMonday Uganda', detail: BM_UG },
  { url: 'https://www.brightermonday.co.ug/jobs?page=2', region: 'Uganda', name: 'BrighterMonday Uganda', detail: BM_UG },
  { url: 'https://www.brightermonday.co.ug/jobs?page=3', region: 'Uganda', name: 'BrighterMonday Uganda', detail: BM_UG },
  { url: 'https://www.brightermonday.co.ug/jobs/accounting-auditing-finance', region: 'Uganda', name: 'BrighterMonday Uganda', detail: BM_UG },
  { url: 'https://www.brightermonday.co.ug/jobs/sales-marketing', region: 'Uganda', name: 'BrighterMonday Uganda', detail: BM_UG },
  { url: 'https://www.brightermonday.co.ug/jobs/software-data', region: 'Uganda', name: 'BrighterMonday Uganda', detail: BM_UG },
  { url: 'https://www.brightermonday.co.ug/jobs/healthcare', region: 'Uganda', name: 'BrighterMonday Uganda', detail: BM_UG },
  { url: 'https://www.brightermonday.co.ug/jobs/admin-office', region: 'Uganda', name: 'BrighterMonday Uganda', detail: BM_UG },
  { url: 'https://www.brightermonday.co.ke/jobs', region: 'Kenya', name: 'BrighterMonday Kenya', detail: BM_KE },
  { url: 'https://www.brightermonday.co.ke/jobs?page=2', region: 'Kenya', name: 'BrighterMonday Kenya', detail: BM_KE },
  { url: 'https://www.brightermonday.co.ke/jobs?page=3', region: 'Kenya', name: 'BrighterMonday Kenya', detail: BM_KE },
  { url: 'https://www.brightermonday.co.ke/jobs/sales-marketing', region: 'Kenya', name: 'BrighterMonday Kenya', detail: BM_KE },
  { url: 'https://www.brightermonday.co.ke/jobs/software-data', region: 'Kenya', name: 'BrighterMonday Kenya', detail: BM_KE },
  { url: 'https://www.fuzu.com/uganda/jobs', region: 'Uganda', name: 'Fuzu Uganda', detail: FUZU },
  { url: 'https://www.fuzu.com/kenya/jobs', region: 'Kenya', name: 'Fuzu Kenya', detail: FUZU },
  { url: 'https://www.theugandanjobline.com/', region: 'Uganda', name: 'Ugandan Job Line', detail: /theugandanjobline\.com\/\d{4}\/\d{2}\/[a-z0-9-]+\.html/i },
  { url: 'https://www.theugandanjobline.com/page/2/', region: 'Uganda', name: 'Ugandan Job Line', detail: /theugandanjobline\.com\/\d{4}\/\d{2}\/[a-z0-9-]+\.html/i },
  { url: 'https://www.brightermonday.co.ug/jobs?page=4', region: 'Uganda', name: 'BrighterMonday Uganda', detail: BM_UG },
  { url: 'https://www.brightermonday.co.ug/jobs/ngo-npo-charity', region: 'Uganda', name: 'BrighterMonday Uganda', detail: BM_UG },
  { url: 'https://www.brightermonday.co.ke/jobs?page=4', region: 'Kenya', name: 'BrighterMonday Kenya', detail: BM_KE },
  { url: 'https://www.brightermonday.co.ke/jobs/healthcare', region: 'Kenya', name: 'BrighterMonday Kenya', detail: BM_KE },
  { url: 'https://www.fuzu.com/rwanda/jobs', region: 'Rwanda', name: 'Fuzu Rwanda', detail: FUZU },
  { url: 'https://www.fuzu.com/tanzania/jobs', region: 'Tanzania', name: 'Fuzu Tanzania', detail: FUZU },
  { url: 'https://www.theugandanjobline.com/page/3/', region: 'Uganda', name: 'Ugandan Job Line', detail: /theugandanjobline\.com\/\d{4}\/\d{2}\/[a-z0-9-]+\.html/i },
  { url: 'https://wellfound.com/jobs', region: 'Global', name: 'Wellfound', detail: /wellfound\.com\/jobs\/\d+-[a-z0-9-]+/i },
  { url: 'https://web3.career/', region: 'Global', name: 'Web3.career', detail: /web3\.career\/[a-z0-9-]+\/\d+/i },
  { url: 'https://web3.career/remote-jobs', region: 'Global', name: 'Web3.career', detail: /web3\.career\/[a-z0-9-]+\/\d+/i },
];


interface ParsedJob {
  title: string;
  apply_url: string;
  company?: string;
  location?: string;
}

const ASSET_RE = /\.(png|jpe?g|gif|svg|webp|css|js|ico|pdf)(\?|$)|\/cdn-cgi\/|\/static-assets\/|\/assets\/|active_storage/i;

function cleanTitle(raw: string): string {
  return raw
    .replace(/!\[[^\]]*\]/g, '')
    .replace(/[*_`]+/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Extract job-detail links from markdown: [Job Title at Company](url)
function extractJobsFromMarkdown(markdown: string, detail: RegExp): ParsedJob[] {
  const jobs: ParsedJob[] = [];
  const seen = new Set<string>();
  const linkRegex = /\[([^\]]*)\]\((https?:\/\/[^\s)]+)\)/g;
  let m;
  while ((m = linkRegex.exec(markdown)) !== null) {
    const text = cleanTitle(m[1]);
    const href = m[2].split('#')[0];
    if (ASSET_RE.test(href)) continue;
    // Only accept true job-detail URLs for this source
    if (!detail.test(href)) continue;
    if (text.length < 6 || text.length > 160) continue;
    const nav = /^(home|about|contact|login|register|sign up|apply|apply now|categories|next|previous|read more|view all|jobs|search|menu|share|facebook|twitter|linkedin|whatsapp|comments?|reply|view job|details)$/i;
    if (nav.test(text)) continue;
    if (!/[A-Za-z]{3}/.test(text)) continue;
    if (seen.has(href)) continue;
    seen.add(href);

    let title = text;
    let company: string | undefined;
    const atMatch = text.match(/^(.+?)\s+(?:at|@)\s+(.+)$/i);
    const dashMatch = !atMatch ? text.match(/^(.+?)\s+[-–—]\s+(.+)$/) : null;
    if (atMatch) { title = atMatch[1].trim(); company = atMatch[2].trim(); }
    else if (dashMatch) { title = dashMatch[1].trim(); company = dashMatch[2].trim(); }

    jobs.push({ title, apply_url: href, company });
    if (jobs.length >= 60) break;
  }
  return jobs;
}

// Direct HTML fallback: parse anchors straight from the page source
async function extractJobsFromHtml(pageUrl: string, detail: RegExp): Promise<ParsedJob[]> {
  const res = await fetch(pageUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml',
    },
  });
  if (!res.ok) return [];
  const html = await res.text();
  const base = new URL(pageUrl);
  const jobs: ParsedJob[] = [];
  const seen = new Set<string>();
  const anchorRe = /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = anchorRe.exec(html)) !== null) {
    let href: string;
    try { href = new URL(m[1], base).toString().split('#')[0]; } catch { continue; }
    if (ASSET_RE.test(href) || !detail.test(href) || seen.has(href)) continue;
    seen.add(href);
    let title = cleanTitle(m[2].replace(/<[^>]+>/g, ' '));
    if (title.length < 6 || title.length > 160) {
      const slug = href.replace(/\/$/, '').split('/').pop() || '';
      title = slug.replace(/-[a-z0-9]{5,8}$/i, '').replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    }
    if (title.length < 6) continue;
    jobs.push({ title, apply_url: href });
    if (jobs.length >= 60) break;
  }
  return jobs;
}


Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!apiKey) {
      return new Response(
        JSON.stringify({ success: false, error: 'Firecrawl connector not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, serviceKey);

    const body = await req.json().catch(() => ({}));
    const { sourceIndex = 0, query, scrapeAll = false, persist = true } = body;

    // Search mode
    if (query) {
      const response = await fetch('https://api.firecrawl.dev/v1/search', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `${query} jobs hiring`, limit: 10, scrapeOptions: { formats: ['markdown'] } }),
      });
      const data = await response.json();
      return new Response(
        JSON.stringify({ success: response.ok, type: 'search', data, error: response.ok ? undefined : data.error }),
        { status: response.ok ? 200 : response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const sourcesToScrape = scrapeAll ? JOB_SOURCES : [JOB_SOURCES[sourceIndex] || JOB_SOURCES[0]];
    const results: any[] = [];
    let totalInserted = 0;

    for (const source of sourcesToScrape) {
      console.log('Scraping:', source.name);
      try {
        let parsed: ParsedJob[] = [];
        // 1) Direct HTML pass (most reliable for real job-detail links)
        try {
          parsed = await extractJobsFromHtml(source.url, source.detail);
        } catch (e) {
          console.log('HTML pass failed for', source.name, String(e));
        }

        // 2) Firecrawl fallback when the page is JS-rendered / blocked
        if (parsed.length === 0) {
          const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: source.url, formats: ['markdown', 'links'], onlyMainContent: true }),
          });
          const data = await response.json();
          if (!response.ok) {
            results.push({ source: source.name, region: source.region, error: data.error });
            continue;
          }
          const markdown = data.data?.markdown || data.markdown || '';
          parsed = extractJobsFromMarkdown(markdown, source.detail);
        }




        let inserted = 0;
        if (persist && parsed.length > 0) {
          const rows = parsed.map((j) => ({
            title: j.title,
            company: j.company || null,
            location: j.location || null,
            region: source.region,
            apply_url: j.apply_url,
            source_name: source.name,
            source_url: source.url,
            scraped_at: new Date().toISOString(),
          }));
          const { data: upserted, error: upErr } = await supabase
            .from('scraped_jobs')
            .upsert(rows, { onConflict: 'apply_url', ignoreDuplicates: false })
            .select('id');
          if (upErr) console.error('Upsert error:', upErr);
          else inserted = upserted?.length ?? 0;
        }

        totalInserted += inserted;
        results.push({ source: source.name, region: source.region, parsed: parsed.length, inserted });
      } catch (err) {
        console.error(`Error scraping ${source.name}:`, err);
        results.push({ source: source.name, region: source.region, error: String(err) });
      }
      if (sourcesToScrape.length > 1) await new Promise(r => setTimeout(r, 800));
    }

    return new Response(
      JSON.stringify({ success: true, type: scrapeAll ? 'scrape_all' : 'scrape', totalInserted, results }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
