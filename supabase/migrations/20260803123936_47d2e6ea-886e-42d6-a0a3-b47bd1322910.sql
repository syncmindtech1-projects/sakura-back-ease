CREATE TABLE public.signup_notifications (
  user_id uuid PRIMARY KEY,
  email text,
  full_name text,
  method text,
  notified_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.signup_notifications TO service_role;
ALTER TABLE public.signup_notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "No client access" ON public.signup_notifications FOR SELECT TO authenticated USING (false);