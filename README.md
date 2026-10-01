# J The Divine Eco Valley

> **Handcrafted Natural Cardamom, Nut & Spice Garlands**  
> *Nature Crafted. Tradition Inspired. Globally Delivered.*

Production-ready, highly animated, responsive website built with **Next.js App Router**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **Supabase PostgreSQL**, and **Zod**.

---

## 🌿 Brand Ethos & Architecture

- **Visual Tone**: Luxury botanical brand + Indian craftsmanship + modern international presentation.
- **Color System**: Cream white (`#F8F4E8`), Soft Cream (`#FFFDF5`), Forest Emerald (`#164A36`), Dark Emerald (`#0D3527`), Gold (`#C9A227`), Botanical Green (`#6F8F72`), Charcoal (`#1E2923`).
- **Typography**: Cormorant Garamond (Editorial Serif for headings) + Plus Jakarta Sans (Modern UI Sans).
- **Rendering Architecture**: React Server Components (RSC) and SSR by default; Client Components used strictly for isolated interactive components (hero garland animation, mobile menu, filter controls, gallery switcher, quote form).
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
│   ├── home/                   # Hero (+ hero/ garland layout, spice assets, particles), BrandIntro, ExportSection...
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

## 🌿 Hero: "Nature, gathered beautifully."

The home hero is a scroll-driven sequence in which individual spices gather into a hand-tied garland around the brand name. It uses no WebGL: spice cutouts are moved with GPU transforms from a single `requestAnimationFrame` loop, plus a small 2D canvas for pollen.

| File | Role |
| --- | --- |
| `components/home/Hero.tsx` | Sticky scroll stage, animation loop, copy, CTA |
| `components/home/hero/garlandLayout.ts` | Garland shape, where every spice rests, its flight path and timing |
| `components/home/hero/spiceAssets.ts` | Spice image manifest (paths, display size, aspect ratio) |
| `components/home/hero/particles.ts` | Drifting pollen motes (2D canvas) |
| `public/spices/*.svg` | Placeholder spice cutouts |

**Sequence** (assembly progress runs from 0 to 1 over roughly the first 1.2 screens of scrolling):

- **On load (0–3 s):** the parchment and sunlight fade in; *J The Divine / Eco Valley* resolves out of a soft blur; about 17 "hero" spices (star anise, chillies, cinnamon, turmeric) appear one by one at the edges and drift slowly.
- **0.02–0.40:** the garland cord draws itself, and the hero spices swirl inwards along curved paths.
- **0.12–0.92:** cardamom pods thread onto the cord from the top downwards, followed by bay leaves, cloves and peppercorns; the pendant and tassels arrive last.
- **Throughout:** chapter lines cross-fade (*From the valley's soil → Cardamom · Clove · Cinnamon · Star anise → Gathered by hand*), the view pushes in slightly, and the copy settles on the tagline *Nature, gathered beautifully.*
- **Formed:** no spinning. The garland breathes, sways a little and catches drifting pollen; leaves flick now and then as if in a breeze.
- **Curtain:** the rest of the page rises over the pinned hero with rounded corners while the hero dims and steps back.

**Accessibility and performance**

- `prefers-reduced-motion`: there's no animation loop. The finished garland is laid out in pure CSS, and the hero is a normal single screen.
- Phones and low-powered devices (≤4 CPU cores, ≤4 GB memory or Save-Data) get fewer, larger pods. Low-powered devices also skip the pollen and the pod micro-motion.
- The loop pauses when the hero is off screen, writes only `transform` and `opacity`, and keeps pixel paths cached until a resize.

**Replacing the placeholder spices with real assets**

1. Shoot or render each spice as a cutout on a transparent background, long axis pointing **up**, lit from the **top-left**, with a soft contact shadow down-right. WebP with alpha at 3–4× display size (roughly 200–400 px on the long side) works well.
2. Put the files in `public/spices/` and point `src` in `components/home/hero/spiceAssets.ts` at them. Add several variants per spice (`src: [...]`) so repeated pods don't look stamped.
3. Update `aspect` (height ÷ width) to match each new image. Adjust `width` if a spice should look bigger or smaller on the garland.
4. To use real 3D models, render them to images from a few angles (Blender, KeyShot or Spline exports) and use those as variants. That keeps the realism of 3D without running real-time 3D in the browser.

---

## 🔒 Security & Data Integrity

- **Server-Side Validation**: All quote submissions validated server-side using Zod before insertion.
- **Row Level Security**:
  - `products`: Public read access for active records (`active = true`); modifications restricted to `service_role`.
  - `quote_requests`: Public insertion allowed; reading and status management restricted exclusively to `service_role` (never exposed to browser clients).
