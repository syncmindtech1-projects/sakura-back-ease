const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const JOB_SOURCES = [
  { url: 'https://www.brightermonday.co.ug/jobs', region: 'Uganda', name: 'BrighterMonday Uganda' },
  { url: 'https://www.brightermonday.co.ke/jobs', region: 'Kenya', name: 'BrighterMonday Kenya' },
  { url: 'https://www.fuzu.com/uganda/jobs', region: 'Uganda', name: 'Fuzu Uganda' },
  { url: 'https://www.fuzu.com/kenya/jobs', region: 'Kenya', name: 'Fuzu Kenya' },
  { url: 'https://wellfound.com/jobs', region: 'Global', name: 'Wellfound (AngelList)' },
  { url: 'https://web3.career/', region: 'Global', name: 'Web3.career' },
  { url: 'https://web3.career/remote-jobs', region: 'Remote', name: 'Web3.career Remote' },
  { url: 'https://wellfound.com/role/r/software-engineer', region: 'Global', name: 'Wellfound Engineering' },
  { url: 'https://www.linkedin.com/jobs/search/?location=Uganda', region: 'Uganda', name: 'LinkedIn Uganda' },
  { url: 'https://www.linkedin.com/jobs/search/?location=Dubai', region: 'UAE', name: 'LinkedIn UAE' },
];

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

    const { sourceIndex = 0, query, scrapeAll = false } = await req.json().catch(() => ({}));

    // Search mode
    if (query) {
      console.log('Searching jobs:', query);
      const response = await fetch('https://api.firecrawl.dev/v1/search', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `${query} jobs hiring`,
          limit: 10,
          scrapeOptions: { formats: ['markdown'] },
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        return new Response(
          JSON.stringify({ success: false, error: data.error || `Search failed: ${response.status}` }),
          { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ success: true, type: 'search', data }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Scrape all sources or a specific one
    const sourcesToScrape = scrapeAll ? JOB_SOURCES : [JOB_SOURCES[sourceIndex] || JOB_SOURCES[0]];
    const results = [];

    for (const source of sourcesToScrape) {
      console.log('Scraping:', source.name, source.url);
      try {
        const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url: source.url,
            formats: ['markdown', 'links'],
            onlyMainContent: true,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          results.push({
            source: source.name,
            region: source.region,
            data: data.data || data,
          });
        } else {
          console.error(`Failed to scrape ${source.name}:`, data.error);
          results.push({ source: source.name, region: source.region, error: data.error });
        }
      } catch (err) {
        console.error(`Error scraping ${source.name}:`, err);
        results.push({ source: source.name, region: source.region, error: String(err) });
      }

      // Small delay between requests to avoid rate limiting
      if (sourcesToScrape.length > 1) {
        await new Promise(r => setTimeout(r, 500));
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        type: scrapeAll ? 'scrape_all' : 'scrape',
        sources: JOB_SOURCES.map(s => ({ name: s.name, region: s.region, url: s.url })),
        results,
      }),
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
