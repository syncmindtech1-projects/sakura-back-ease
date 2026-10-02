const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Cache-Control': 'public, max-age=86400, s-maxage=604800',
};

const safeDomain = (value: string) => {
  try {
    const host = new URL(value).hostname.replace(/^www\./, '');
    return /^[a-z0-9.-]+$/i.test(host) ? host : '';
  } catch {
    return '';
  }
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  const token = Deno.env.get('LOGO_DEV_API_KEY');
  if (!token) return new Response('Logo service unavailable', { status: 503, headers: corsHeaders });

  const url = new URL(req.url);
  const name = (url.searchParams.get('name') || '').trim().slice(0, 120);
  const domain = safeDomain(url.searchParams.get('url') || '');
  if (!name && !domain) return new Response('Company required', { status: 400, headers: corsHeaders });

  const target = domain
    ? `https://img.logo.dev/${domain}?token=${encodeURIComponent(token)}&size=128&format=png&fallback=404`
    : `https://img.logo.dev/name/${encodeURIComponent(name)}?token=${encodeURIComponent(token)}&size=128&format=png&fallback=404`;

  const logo = await fetch(target);
  if (!logo.ok || !logo.body) return new Response('Logo not found', { status: 404, headers: corsHeaders });

  return new Response(logo.body, {
    headers: {
      ...corsHeaders,
      'Content-Type': logo.headers.get('content-type') || 'image/png',
    },
  });
});
