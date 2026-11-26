CREATE TABLE IF NOT EXISTS public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  form_type text not null,
  name text,
  email text not null,
  subject text,
  message text,
  meta jsonb,
  created_at timestamptz not null default now()
);
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;