
CREATE TABLE public.job_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text NOT NULL,
  contact_email text NOT NULL,
  location text,
  salary text,
  job_type text,
  category text,
  description text NOT NULL,
  apply_url text,
  plan text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.job_submissions TO anon, authenticated;
GRANT ALL ON public.job_submissions TO service_role;

ALTER TABLE public.job_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a job" ON public.job_submissions
  FOR INSERT WITH CHECK (true);
