CREATE TABLE public.deleted_jobs (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  original_id uuid,
  source_table text NOT NULL DEFAULT 'posted_jobs',
  title text NOT NULL,
  company text NOT NULL,
  contact_email text,
  location text,
  salary text,
  job_type text,
  category text,
  description text,
  apply_url text,
  posted_by uuid,
  original_created_at timestamp with time zone,
  deleted_by text,
  deleted_at timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT ALL ON public.deleted_jobs TO service_role;

ALTER TABLE public.deleted_jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "No client access to deleted jobs"
ON public.deleted_jobs FOR SELECT TO authenticated USING (false);

CREATE TRIGGER update_deleted_jobs_updated_at
BEFORE UPDATE ON public.deleted_jobs
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();