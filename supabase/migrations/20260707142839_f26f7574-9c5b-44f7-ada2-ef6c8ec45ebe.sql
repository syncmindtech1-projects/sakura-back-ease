
CREATE TABLE public.scraped_jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT,
  location TEXT,
  region TEXT,
  category TEXT,
  salary TEXT,
  job_type TEXT,
  description TEXT,
  apply_url TEXT NOT NULL,
  source_name TEXT NOT NULL,
  source_url TEXT,
  remote BOOLEAN DEFAULT false,
  posted_at TIMESTAMPTZ,
  scraped_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (apply_url)
);

GRANT SELECT ON public.scraped_jobs TO anon;
GRANT SELECT ON public.scraped_jobs TO authenticated;
GRANT ALL ON public.scraped_jobs TO service_role;

ALTER TABLE public.scraped_jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view scraped jobs"
  ON public.scraped_jobs FOR SELECT
  USING (true);

CREATE INDEX idx_scraped_jobs_region ON public.scraped_jobs(region);
CREATE INDEX idx_scraped_jobs_scraped_at ON public.scraped_jobs(scraped_at DESC);
