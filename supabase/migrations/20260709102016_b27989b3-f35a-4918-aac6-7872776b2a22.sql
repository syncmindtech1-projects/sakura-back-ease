
-- PROFILES
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.profiles TO anon;
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- POSTED JOBS
CREATE TABLE public.posted_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  posted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  location TEXT,
  salary TEXT,
  job_type TEXT,
  category TEXT,
  description TEXT NOT NULL,
  apply_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.posted_jobs TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.posted_jobs TO authenticated;
GRANT ALL ON public.posted_jobs TO service_role;
ALTER TABLE public.posted_jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Posted jobs are viewable by everyone" ON public.posted_jobs FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert own posts" ON public.posted_jobs FOR INSERT TO authenticated WITH CHECK (auth.uid() = posted_by);
CREATE POLICY "Users can update own posts" ON public.posted_jobs FOR UPDATE TO authenticated USING (auth.uid() = posted_by) WITH CHECK (auth.uid() = posted_by);
CREATE POLICY "Users can delete own posts" ON public.posted_jobs FOR DELETE TO authenticated USING (auth.uid() = posted_by);

-- NOTIFICATIONS
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL DEFAULT 'new_job',
  title TEXT NOT NULL,
  body TEXT,
  link TEXT,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE, DELETE ON public.notifications TO authenticated;
GRANT ALL ON public.notifications TO service_role;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own notifications" ON public.notifications FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users update own notifications" ON public.notifications FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own notifications" ON public.notifications FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE INDEX notifications_user_created_idx ON public.notifications (user_id, created_at DESC);

-- UPDATED_AT trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER trg_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_posted_jobs_updated_at BEFORE UPDATE ON public.posted_jobs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END; $$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Fan-out notifications to all users when a new job is posted
CREATE OR REPLACE FUNCTION public.notify_users_new_job()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.notifications (user_id, type, title, body, link)
  SELECT u.id, 'new_job',
         'New job: ' || NEW.title,
         COALESCE(NEW.company, '') || COALESCE(' • ' || NEW.location, ''),
         '/jobs/posted-' || NEW.id::text
  FROM auth.users u;
  RETURN NEW;
END; $$;

CREATE TRIGGER trg_notify_new_job
AFTER INSERT ON public.posted_jobs
FOR EACH ROW EXECUTE FUNCTION public.notify_users_new_job();
