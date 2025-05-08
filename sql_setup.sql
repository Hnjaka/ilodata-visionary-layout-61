
-- This SQL will need to be run in the Supabase SQL editor
-- Create table for site configuration including sitemap
CREATE TABLE IF NOT EXISTS public.site_config (
  id TEXT PRIMARY KEY,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Grant proper access to the table
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to select site_config (for viewing sitemap)
CREATE POLICY "Allow public read access to site_config"
  ON public.site_config
  FOR SELECT
  USING (true);

-- Allow only authenticated users with admin role to insert/update site_config
CREATE POLICY "Allow authenticated users to insert site_config"
  ON public.site_config
  FOR INSERT
  WITH CHECK (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin' AND is_approved = true));

CREATE POLICY "Allow authenticated users to update site_config"
  ON public.site_config
  FOR UPDATE
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin' AND is_approved = true));
