Production-ready Next.js (App Router) starter using Tailwind CSS and JavaScript, with a clean structure for:

- Luxury mobile-first landing page system
- Dynamic design pages
- Admin dashboard
- API routes
- Reusable components

## Getting started

Install and run:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_SITE_URL`: used for sitemap/robots
- `SUPABASE_URL`: your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY`: server-only key used by route handlers to read/write designs
- `SUPABASE_STORAGE_BUCKET`: Supabase Storage bucket for uploaded images (public recommended)

## Supabase schema

Create a table called `designs`:

```sql
create table if not exists public.designs (
  slug text primary key,
  before_image text,
  after_image text,
  created_at timestamptz not null default now()
);
```

## Routes

- `/` → landing page system (`src/app/(landing)/*`)
- `/design` → design index (`src/app/(design)/design/page.js`)
- `/design/[slug]` → dynamic design page (`src/app/(design)/design/[slug]/page.js`)
- `/admin` → admin dashboard shell (`src/app/(admin)/admin/*`)
- `/api/health` → health check
- `/api/designs` → design list
- `/api/designs/[slug]` → single design

## Folder structure (high-signal)

- `src/app/(landing)/` – landing page layouts + root page
- `src/components/landing/` – landing page “section system”
- `src/app/(design)/design/` – dynamic design pages
- `src/app/(admin)/admin/` – admin dashboard pages
- `src/app/api/` – route handlers (API routes)
- `src/components/ui/` – reusable UI primitives
- `src/components/site/` – header/footer/logo
- `src/content/` – content/data stubs (landing + designs)
- `src/lib/` – small shared utilities

## Production

```bash
npm run build
npm run start
```

## Notes

- This starter intentionally keeps “real auth” out of the admin area—add your preferred auth provider + RBAC.
- The API routes use in-repo data (`src/content/*`) as stubs; swap for DB access when ready.
