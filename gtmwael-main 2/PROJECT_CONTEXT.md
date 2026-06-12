# PROJECT_CONTEXT.md

> **Start here:** Read `HANDOFF.md` first. It contains the full chronology, known issues, and owner contact. This file covers only the tech stack and folder structure.

---

## Project

Wael Aouididi's SaaS GTM / growth portfolio website.
Covers: positioning, landing pages, cold email, SEO, Meta ads, case studies, blog content, and booking.

## Current folder structure

The real app is inside `gtmwael-main 2/`.

The outer repository root contains a Vercel config that points into this folder.

Do not rename `gtmwael-main 2` unless deployment config is updated at the same time.

## Tech stack

- Vite
- React
- TypeScript
- React Router
- Tailwind CSS
- shadcn/ui
- Supabase client
- Vercel
- npm

## Package manager rule

Use **npm only**.

Do not use Bun for this project unless explicitly requested.

Do not edit `bun.lock` or `bun.lockb` unless the package manager strategy is changed.

## Important commands

```sh
# Install dependencies
npm install

# Dev server
npm run dev

# Build
npm run build

# CRO teardown pipeline — see HANDOFF.md for full CLI reference
npm run cro-teardown -- --name <Company> --url <url> --from YYYY-MM --to YYYY-MM
npm run cro-teardown:select -- --slug <slug>
npm run cro-teardown:generate-data -- --name <Company> --slug <slug>
npm run cro-teardown:compose -- --slug <slug> [--force]
npm run cro-teardown:publish -- --slug <slug> [--force]
```

## SEO rules

SEO standards are documented in `SEO_RULES.md`. Read it before editing SEO-critical pages, route metadata, blog posts, service pages, case studies, sitemap, robots.txt, structured data, or prerender scripts.
