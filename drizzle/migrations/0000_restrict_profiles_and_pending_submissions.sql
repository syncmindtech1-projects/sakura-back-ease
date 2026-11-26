DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Users view own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
REVOKE SELECT ON public.profiles FROM anon;
GRANT SELECT ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

DROP POLICY IF EXISTS "Anyone can submit an ad" ON public.ad_submissions;
CREATE POLICY "Valid pending advertising submissions" ON public.ad_submissions FOR INSERT TO anon, authenticated WITH CHECK (
  status = 'pending' AND rejection_reason IS NULL
  AND char_length(btrim(advertiser_name)) BETWEEN 1 AND 200
  AND char_length(contact_email) BETWEEN 3 AND 254
  AND contact_email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
  AND char_length(btrim(message)) BETWEEN 1 AND 20000
  AND (company IS NULL OR char_length(company) <= 300)
  AND (phone IS NULL OR char_length(phone) <= 100)
  AND (ad_type IS NULL OR char_length(ad_type) <= 100)
  AND (budget IS NULL OR char_length(budget) <= 100)
  AND (source IS NULL OR char_length(source) <= 200)
  AND (video_url IS NULL OR video_url = '' OR (char_length(video_url) <= 2048 AND video_url ~ '^https?://[^[:space:]]+$'))
  AND (target_url IS NULL OR target_url = '' OR (char_length(target_url) <= 2048 AND target_url ~ '^https?://[^[:space:]]+$'))
);
GRANT INSERT ON public.ad_submissions TO anon, authenticated;
GRANT ALL ON public.ad_submissions TO service_role;

DROP POLICY IF EXISTS "Anyone can submit a job" ON public.job_submissions;
CREATE POLICY "Valid pending job submissions" ON public.job_submissions FOR INSERT TO anon, authenticated WITH CHECK (
  status = 'pending' AND rejection_reason IS NULL
  AND char_length(btrim(title)) BETWEEN 1 AND 300
  AND char_length(btrim(company)) BETWEEN 1 AND 300
  AND char_length(contact_email) BETWEEN 3 AND 254
  AND contact_email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
  AND char_length(btrim(description)) BETWEEN 1 AND 100000
  AND (location IS NULL OR char_length(location) <= 300)
  AND (salary IS NULL OR char_length(salary) <= 300)
  AND (job_type IS NULL OR char_length(job_type) <= 100)
  AND (category IS NULL OR char_length(category) <= 200)
  AND (plan IS NULL OR char_length(plan) <= 100)
  AND (apply_url IS NULL OR apply_url = '' OR (char_length(apply_url) <= 2048 AND apply_url ~ '^https?://[^[:space:]]+$'))
);
GRANT INSERT ON public.job_submissions TO anon, authenticated;
GRANT ALL ON public.job_submissions TO service_role;