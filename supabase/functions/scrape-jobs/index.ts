const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const JOB_SOURCES = [
  { url: 'https://www.brightermonday.co.ug/jobs', region: 'Uganda', name: 'BrighterMonday Uganda' },
  { url: 'https://www.brightermonday.co.ke/jobs', region: 'Kenya', name: 'BrighterMonday Kenya' },
  { url: 'https://www.fuzu.com/uganda/jobs', region: 'Uganda', name: 'Fuzu Uganda' },
  { url: 'https://www.fuzu.com/kenya/jobs', region: 'Kenya', name: 'Fuzu Kenya' },
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

    const { sourceIndex = 0, query } = await req.json().catch(() => ({}));

    // If query provided, use Firecrawl search
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

    // Otherwise scrape a specific job board
    const source = JOB_SOURCES[sourceIndex] || JOB_SOURCES[0];
    console.log('Scraping:', source.name, source.url);

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
    if (!response.ok) {
      return new Response(
        JSON.stringify({ success: false, error: data.error || `Scrape failed: ${response.status}` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        type: 'scrape',
        source: source.name,
        region: source.region,
        data: data.data || data,
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
