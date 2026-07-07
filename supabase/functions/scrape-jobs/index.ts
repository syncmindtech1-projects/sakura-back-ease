import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const JOB_SOURCES = [
  { url: 'https://jobadverts.ug/', region: 'Uganda', name: 'JobAdverts UG' },
  { url: 'https://www.brightermonday.co.ug/jobs', region: 'Uganda', name: 'BrighterMonday Uganda' },
  { url: 'https://www.brightermonday.co.ke/jobs', region: 'Kenya', name: 'BrighterMonday Kenya' },
  { url: 'https://www.fuzu.com/uganda/jobs', region: 'Uganda', name: 'Fuzu Uganda' },
  { url: 'https://www.fuzu.com/kenya/jobs', region: 'Kenya', name: 'Fuzu Kenya' },
  { url: 'https://www.theugandanjobline.com/', region: 'Uganda', name: 'Ugandan Job Line' },
  { url: 'https://ugjobsonline.com/', region: 'Uganda', name: 'UG Jobs Online' },
  { url: 'https://wellfound.com/jobs', region: 'Global', name: 'Wellfound' },
  { url: 'https://web3.career/', region: 'Global', name: 'Web3.career' },
  { url: 'https://www.linkedin.com/jobs/search/?location=Uganda', region: 'Uganda', name: 'LinkedIn Uganda' },
];

interface ParsedJob {
  title: string;
  apply_url: string;
  company?: string;
  location?: string;
}

// Heuristic extraction from markdown links: [Job Title at Company](url)
function extractJobsFromMarkdown(markdown: string, sourceOrigin: string): ParsedJob[] {
  const jobs: ParsedJob[] = [];
  const seen = new Set<string>();
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  let m;
  while ((m = linkRegex.exec(markdown)) !== null) {
    const text = m[1].trim();
    const href = m[2];
    if (text.length < 8 || text.length > 160) continue;
    // filter obvious nav links
    const nav = /^(home|about|contact|login|register|sign up|apply|categories|next|previous|read more|view all|jobs|search|menu|share|facebook|twitter|linkedin|whatsapp|comments?|reply)$/i;
    if (nav.test(text)) continue;
    if (!/[A-Z]/.test(text)) continue;
    if (seen.has(href)) continue;
    // Prefer links that look like job posts (contain 'job' or 'career' or hosted on same origin)
    if (!href.includes(sourceOrigin) && !/job|career|vacan|hiring/i.test(href)) continue;
    seen.add(href);

    // Try to split "Title at Company" or "Title - Company"
    let title = text;
    let company: string | undefined;
    const atMatch = text.match(/^(.+?)\s+(?:at|@)\s+(.+)$/i);
    const dashMatch = !atMatch ? text.match(/^(.+?)\s+[-–—]\s+(.+)$/) : null;
    if (atMatch) { title = atMatch[1].trim(); company = atMatch[2].trim(); }
    else if (dashMatch) { title = dashMatch[1].trim(); company = dashMatch[2].trim(); }

    jobs.push({ title, apply_url: href, company });
    if (jobs.length >= 40) break;
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
        const origin = new URL(source.url).host;
        const parsed = extractJobsFromMarkdown(markdown, origin);

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
