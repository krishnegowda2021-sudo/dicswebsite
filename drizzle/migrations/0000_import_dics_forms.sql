CREATE TABLE public.enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  kind text NOT NULL DEFAULT 'general',
  full_name text NOT NULL,
  company text,
  email text NOT NULL,
  phone text NOT NULL,
  interest text,
  product_slug text,
  product_name text,
  message text NOT NULL,
  page_url text
);
GRANT INSERT ON public.enquiries TO anon, authenticated;
GRANT ALL ON public.enquiries TO service_role;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit an enquiry" ON public.enquiries FOR INSERT TO anon, authenticated
WITH CHECK (
  kind IN ('general','quote','product') AND
  char_length(full_name) BETWEEN 2 AND 120 AND
  char_length(email) BETWEEN 5 AND 200 AND
  char_length(phone) BETWEEN 6 AND 30 AND
  char_length(message) BETWEEN 10 AND 3000 AND
  coalesce(char_length(company),0) <= 160 AND
  coalesce(char_length(interest),0) <= 160 AND
  coalesce(char_length(product_slug),0) <= 300 AND
  coalesce(char_length(product_name),0) <= 300 AND
  coalesce(char_length(page_url),0) <= 500
);
CREATE TABLE public.career_applications (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 created_at timestamptz NOT NULL DEFAULT now(),
 full_name text NOT NULL CHECK (char_length(full_name) BETWEEN 2 AND 120),
 email text NOT NULL CHECK (char_length(email) <= 200),
 phone text NOT NULL CHECK (char_length(phone) BETWEEN 6 AND 30),
 position text NOT NULL CHECK (char_length(position) BETWEEN 2 AND 200),
 experience numeric NOT NULL CHECK (experience BETWEEN 0 AND 60),
 skills text NOT NULL CHECK (char_length(skills) BETWEEN 2 AND 1000),
 message text NOT NULL DEFAULT '' CHECK (char_length(message) <= 2000),
 consent boolean NOT NULL CHECK (consent = true)
);
GRANT INSERT ON public.career_applications TO anon, authenticated;
GRANT ALL ON public.career_applications TO service_role;
ALTER TABLE public.career_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors may submit career applications" ON public.career_applications FOR INSERT TO anon, authenticated WITH CHECK (consent = true);