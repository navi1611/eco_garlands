# J The Divine Eco Valley

> **Handcrafted Natural Cardamom, Nut & Spice Garlands**  
> *Nature Crafted. Tradition Inspired. Globally Delivered.*

Production-ready, highly animated, responsive website built with **Next.js App Router**, **TypeScript**, **Tailwind CSS**, **Three.js / React Three Fiber**, **Supabase PostgreSQL**, and **Zod**.

---

## 🌿 Brand Ethos & Architecture

- **Visual Tone**: Luxury botanical brand + Indian craftsmanship + modern international presentation.
- **Color System**: Cream white (`#F8F4E8`), Soft Cream (`#FFFDF5`), Forest Emerald (`#164A36`), Dark Emerald (`#0D3527`), Gold (`#C9A227`), Botanical Green (`#6F8F72`), Charcoal (`#1E2923`).
- **Typography**: Cormorant Garamond (Editorial Serif for headings) + Plus Jakarta Sans (Modern UI Sans).
- **Rendering Architecture**: React Server Components (RSC) and SSR by default; Client Components used strictly for isolated interactive components (3D garland canvas, mobile menu, filter controls, gallery switcher, quote form).
- **No Inline Styles**: 100% styled via Tailwind CSS design tokens.

---

## 📁 Repository Structure

```
├── app/
│   ├── layout.tsx              # Root layout with fonts, JSON-LD Organization schema
│   ├── page.tsx                # Homepage (Hero, Story, Categories, Export Map, CTA)
│   ├── about/page.tsx          # "From Seed to Celebration" 01-08 timeline
│   ├── products/
│   │   ├── page.tsx            # Database-driven product catalog with URL filters
│   │   └── [slug]/page.tsx     # Dynamic product detail page with JSON-LD schema
│   ├── applications/page.tsx   # Cultural & ceremonial application contexts
│   ├── quote/page.tsx          # Dedicated commercial quote experience
│   ├── contact/page.tsx        # Contact desk with editable placeholders
│   ├── loading.tsx             # Skeleton loading state
│   ├── error.tsx               # Error boundary
│   ├── not-found.tsx           # 404 page
│   ├── sitemap.ts              # Dynamic XML sitemap
│   └── robots.ts               # Robots crawling directives
│
├── components/
│   ├── layout/                 # Navbar, MobileMenu, Footer, PageContainer
│   ├── ui/                     # Button, SectionHeading, Badge, Container, Skeleton, States
│   ├── home/                   # Hero, Cardamom3D, BrandIntro, CardamomStory, ExportSection...
│   ├── about/                  # ProcessTimeline, TimelineItem, ManufacturingProcess
│   ├── products/               # ProductCard, ProductGrid, ProductFilters, ProductGallery...
│   ├── quote/                  # QuoteForm, FormField, ProductSelector, QuoteSuccess
│   └── animation/              # FadeIn, RevealOnScroll, StaggerChildren
│
├── lib/
│   ├── supabase/               # server.ts, client.ts, types.ts
│   ├── products/               # queries.ts, data.ts (rich sample dataset & fallback)
│   └── quotes/                 # schema.ts (Zod validation), mutations.ts (Server Action)
│
├── supabase/
│   ├── schema.sql              # PostgreSQL DDL with RLS & indexes
│   └── seed.sql                # Catalog seed data with sample cardamom garlands
│
└── .env.example                # Supabase configuration template
```

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in your Supabase project credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```
*(Note: If Supabase credentials are not provided, the application automatically falls back to the embedded sample dataset and simulates quote request recording, ensuring the site runs out-of-the-box.)*

### 3. Setup Supabase Database
Run the scripts in your Supabase SQL editor:
1. Execute `supabase/schema.sql` to generate tables (`products`, `quote_requests`), Row Level Security policies, and performance indexes.
2. Execute `supabase/seed.sql` to populate sample products across all categories.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build & Validation
```bash
npm run build
npm run start
```

---

## 🎨 3D Cardamom Garland Specification

- Located in `components/home/Cardamom3D.tsx` (wrapped via `Cardamom3DWrapper.tsx` for dynamic hydration). Set `NEXT_PUBLIC_SPLINE_HERO_SCENE` to a Spline scene URL to render a Spline scene (`SplineHero.tsx`) instead.
- Procedural spindle geometry morphing with three longitudinal ridges characteristic of true green cardamom (*Elettaria cardamomum*).
- Interspersed with whole nutmeg spheres, whole spices, and gold spacer rings.
- Soft floating wave animation, orbit controls, warm cinematic lighting, and golden botanical particles.
- Fully supports `prefers-reduced-motion` and contains a graceful static fallback when WebGL is unavailable.

---

## 🔒 Security & Data Integrity

- **Server-Side Validation**: All quote submissions validated server-side using Zod before insertion.
- **Row Level Security**:
  - `products`: Public read access for active records (`active = true`); modifications restricted to `service_role`.
  - `quote_requests`: Public insertion allowed; reading and status management restricted exclusively to `service_role` (never exposed to browser clients).
