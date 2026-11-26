ALTER TABLE public.scraped_jobs ADD COLUMN IF NOT EXISTS is_published boolean NOT NULL DEFAULT false;
ALTER TABLE public.posted_jobs ADD COLUMN IF NOT EXISTS is_published boolean NOT NULL DEFAULT false;
UPDATE public.scraped_jobs SET is_published = true;
UPDATE public.posted_jobs SET is_published = true;

CREATE OR REPLACE FUNCTION public.protect_job_publication() RETURNS trigger LANGUAGE plpgsql SECURITY INVOKER SET search_path = public AS $$
BEGIN
  IF current_user IN ('anon', 'authenticated') THEN
    IF TG_OP = 'INSERT' THEN
      NEW.is_published := false;
    ELSIF NEW.is_published IS DISTINCT FROM OLD.is_published THEN
      RAISE EXCEPTION 'Publication status can only be changed by the publishing service' USING ERRCODE = '42501';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER protect_scraped_job_publication BEFORE INSERT OR UPDATE ON public.scraped_jobs FOR EACH ROW EXECUTE FUNCTION public.protect_job_publication();
CREATE TRIGGER protect_posted_job_publication BEFORE INSERT OR UPDATE ON public.posted_jobs FOR EACH ROW EXECUTE FUNCTION public.protect_job_publication();

DROP POLICY IF EXISTS "Anyone can view scraped jobs" ON public.scraped_jobs;
CREATE POLICY "Public reads published scraped jobs" ON public.scraped_jobs FOR SELECT TO anon, authenticated USING (is_published = true);
DROP POLICY IF EXISTS "Posted jobs are viewable by everyone" ON public.posted_jobs;
CREATE POLICY "Public reads published posted jobs" ON public.posted_jobs FOR SELECT TO anon, authenticated USING (is_published = true);
GRANT SELECT ON public.scraped_jobs, public.posted_jobs TO anon, authenticated;
GRANT ALL ON public.scraped_jobs, public.posted_jobs TO service_role;
COMMENT ON COLUMN public.scraped_jobs.is_published IS 'Only trusted service publishers may make a listing public; salary is publicly advertised compensation.';
COMMENT ON COLUMN public.posted_jobs.is_published IS 'Only trusted service publishers may make a listing public; salary is publicly advertised compensation.';