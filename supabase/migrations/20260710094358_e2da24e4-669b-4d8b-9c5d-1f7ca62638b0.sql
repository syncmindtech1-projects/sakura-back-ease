
CREATE TABLE public.ad_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  advertiser_name text NOT NULL,
  contact_email text NOT NULL,
  company text,
  phone text,
  ad_type text,
  budget text,
  video_url text,
  target_url text,
  message text NOT NULL,
  source text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.ad_submissions TO anon, authenticated;
GRANT ALL ON public.ad_submissions TO service_role;
ALTER TABLE public.ad_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit an ad" ON public.ad_submissions FOR INSERT TO public WITH CHECK (true);
