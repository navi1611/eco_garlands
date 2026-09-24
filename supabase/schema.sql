-- J The Divine Eco Valley
-- Database Schema for Supabase PostgreSQL
-- Tables: products, quote_requests
-- Security: Row Level Security (RLS) enabled on both tables

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create products table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    short_description TEXT NOT NULL,
    category TEXT NOT NULL,
    religion_or_cultural_use TEXT,
    occasion TEXT,
    materials TEXT[] NOT NULL DEFAULT '{}',
    base_material TEXT NOT NULL,
    image_url TEXT NOT NULL,
    gallery_images TEXT[] NOT NULL DEFAULT '{}',
    featured BOOLEAN NOT NULL DEFAULT false,
    active BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes for products
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_active ON public.products(active);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(featured);

-- 3. Create quote_requests table
CREATE TABLE IF NOT EXISTS public.quote_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    full_name TEXT NOT NULL,
    company_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    country TEXT NOT NULL,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL,
    quantity TEXT NOT NULL,
    intended_use TEXT NOT NULL,
    delivery_date TEXT,
    target_market TEXT,
    customization_requirements TEXT,
    packaging_requirements TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'closed'))
);

-- Indexes for quote_requests
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON public.quote_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON public.quote_requests(status);
CREATE INDEX IF NOT EXISTS idx_quotes_product_id ON public.quote_requests(product_id);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

-- 5. Products RLS Policies
-- Public read access: Anyone can view active products
CREATE POLICY "Public can view active products"
    ON public.products
    FOR SELECT
    TO anon, authenticated
    USING (active = true);

-- Service role full access on products
CREATE POLICY "Service role has full access to products"
    ON public.products
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- 6. Quote Requests RLS Policies
-- Public insertion: Anyone can submit a quote request
CREATE POLICY "Public can submit quote requests"
    ON public.quote_requests
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Protected read: Only service_role (admins / internal backend) can read quote requests
CREATE POLICY "Service role can view and manage quote requests"
    ON public.quote_requests
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);
