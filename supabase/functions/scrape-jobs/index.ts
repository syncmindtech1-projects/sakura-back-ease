import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const JOB_SOURCES = [
  { url: 'https://jobadverts.ug/', region: 'Uganda', name: 'JobAdverts UG', detail: /jobadverts\.ug\/(\?post_type=jb-job&p=\d+|job\/[^/]+)/i },
  { url: 'https://jobadverts.ug/jobs/', region: 'Uganda', name: 'JobAdverts UG', detail: /jobadverts\.ug\/(\?post_type=jb-job&p=\d+|job\/[^/]+)/i },
  { url: 'https://www.brightermonday.co.ug/jobs', region: 'Uganda', name: 'BrighterMonday Uganda', detail: /brightermonday\.co\.ug\/listings\/[a-z0-9-]+/i },
  { url: 'https://www.brightermonday.co.ke/jobs', region: 'Kenya', name: 'BrighterMonday Kenya', detail: /brightermonday\.co\.ke\/listings\/[a-z0-9-]+/i },
  { url: 'https://www.fuzu.com/uganda/jobs', region: 'Uganda', name: 'Fuzu Uganda', detail: /fuzu\.com\/[a-z-]+\/jobs\/[a-z0-9-]+-\d+/i },
  { url: 'https://www.fuzu.com/kenya/jobs', region: 'Kenya', name: 'Fuzu Kenya', detail: /fuzu\.com\/[a-z-]+\/jobs\/[a-z0-9-]+-\d+/i },
  { url: 'https://www.theugandanjobline.com/', region: 'Uganda', name: 'Ugandan Job Line', detail: /theugandanjobline\.com\/\d{4}\/\d{2}\/[a-z0-9-]+\.html/i },
  { url: 'https://ugjobsonline.com/', region: 'Uganda', name: 'UG Jobs Online', detail: /ugjobsonline\.com\/[a-z0-9-]{8,}\/?$/i },
  { url: 'https://wellfound.com/jobs', region: 'Global', name: 'Wellfound', detail: /wellfound\.com\/jobs\/\d+-[a-z0-9-]+/i },
  { url: 'https://web3.career/', region: 'Global', name: 'Web3.career', detail: /web3\.career\/[a-z0-9-]+\/\d+/i },
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
        const parsed = extractJobsFromMarkdown(markdown, source.detail);


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
