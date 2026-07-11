CREATE TABLE IF NOT EXISTS public.site_ads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slot_key TEXT NOT NULL UNIQUE,
  ad_kind TEXT NOT NULL DEFAULT 'text',
  title TEXT NOT NULL,
  blurb TEXT,
  sponsor TEXT,
  cta_label TEXT,
  cta_link TEXT,
  video_url TEXT,
  image_url TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.site_ads TO anon, authenticated;
GRANT ALL ON public.site_ads TO service_role;

ALTER TABLE public.site_ads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active ads" ON public.site_ads
  FOR SELECT USING (active = true);

CREATE TRIGGER update_site_ads_updated_at BEFORE UPDATE ON public.site_ads
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
