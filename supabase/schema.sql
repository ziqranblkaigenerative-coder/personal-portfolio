-- =========================================================
-- SUPABASE DATABASE SCHEMA & RLS POLICIES FOR PERSONAL PORTFOLIO
-- =========================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL DEFAULT 'Web App',
    description TEXT NOT NULL,
    content TEXT,
    image_url TEXT NOT NULL,
    demo_url TEXT,
    github_url TEXT,
    tech_stack TEXT[] DEFAULT '{}',
    featured BOOLEAN DEFAULT false,
    status TEXT DEFAULT 'published' CHECK (status IN ('published', 'draft', 'archived')),
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::TEXT, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::TEXT, now()) NOT NULL
);

-- 3. Create Profile Settings Table
CREATE TABLE IF NOT EXISTS public.profile_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    title TEXT NOT NULL,
    bio TEXT NOT NULL,
    short_intro TEXT,
    avatar_url TEXT,
    email TEXT,
    phone TEXT,
    location TEXT,
    resume_url TEXT,
    social_links JSONB DEFAULT '{}'::jsonb,
    skills JSONB DEFAULT '[]'::jsonb,
    experience JSONB DEFAULT '[]'::jsonb,
    education JSONB DEFAULT '[]'::jsonb,
    stats JSONB DEFAULT '{"years_experience":"4+","projects_completed":"28+","happy_clients":"15+","tech_masteries":"12+"}'::jsonb,
    available_for_hire BOOLEAN DEFAULT true,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::TEXT, now()) NOT NULL
);

-- 4. Create Indexes for High Performance Querying
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_sort_order ON public.projects(sort_order);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_settings ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies for Projects Table
-- Public can READ published projects
DROP POLICY IF EXISTS "Public can view published projects" ON public.projects;
CREATE POLICY "Public can view published projects"
    ON public.projects FOR SELECT
    USING (status = 'published' OR auth.role() = 'authenticated');

-- Authenticated Admin can INSERT projects
DROP POLICY IF EXISTS "Admins can insert projects" ON public.projects;
CREATE POLICY "Admins can insert projects"
    ON public.projects FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

-- Authenticated Admin can UPDATE projects
DROP POLICY IF EXISTS "Admins can update projects" ON public.projects;
CREATE POLICY "Admins can update projects"
    ON public.projects FOR UPDATE
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Authenticated Admin can DELETE projects
DROP POLICY IF EXISTS "Admins can delete projects" ON public.projects;
CREATE POLICY "Admins can delete projects"
    ON public.projects FOR DELETE
    USING (auth.role() = 'authenticated');

-- 7. RLS Policies for Profile Settings Table
DROP POLICY IF EXISTS "Public can view profile settings" ON public.profile_settings;
CREATE POLICY "Public can view profile settings"
    ON public.profile_settings FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Admins can manage profile settings" ON public.profile_settings;
CREATE POLICY "Admins can manage profile settings"
    ON public.profile_settings FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- 8. Setup Supabase Storage Bucket for Portfolio Assets
-- Run in SQL editor or create manually in Storage tab:
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-assets', 'portfolio-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policy: Public Read Access
DROP POLICY IF EXISTS "Public can view portfolio assets" ON storage.objects;
CREATE POLICY "Public can view portfolio assets"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'portfolio-assets');

-- Storage Policy: Authenticated Upload Access
DROP POLICY IF EXISTS "Admins can upload portfolio assets" ON storage.objects;
CREATE POLICY "Admins can upload portfolio assets"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'portfolio-assets' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can delete portfolio assets" ON storage.objects;
CREATE POLICY "Admins can delete portfolio assets"
    ON storage.objects FOR DELETE
    USING (bucket_id = 'portfolio-assets' AND auth.role() = 'authenticated');
