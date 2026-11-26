ALTER TABLE public.signup_notifications
  ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT 'Job Seeker',
  ADD COLUMN IF NOT EXISTS reviewed boolean NOT NULL DEFAULT false;

ALTER TABLE public.job_submissions
  ADD COLUMN IF NOT EXISTS rejection_reason text;

ALTER TABLE public.ad_submissions
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS rejection_reason text;