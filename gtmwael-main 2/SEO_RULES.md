# SEO_RULES.md

## Purpose

This file contains SEO rules for the Your SaaS Growth website.

Read it before editing:
- public pages
- blog posts
- case studies
- service pages
- routes
- metadata
- sitemap
- robots.txt
- structured data
- prerender scripts

## Core rules

- SEO-critical pages must not be JavaScript-only.
- Built HTML should contain real text content, not only `<div id="root"></div>`.
- Every SEO-critical page needs one H1.
- Every SEO-critical page needs unique meta title and meta description.
- Canonical URLs must use `https://www.yoursaasgrowth.com`.
- Public routes should have matching SEO metadata.
- Blog posts are managed from `src/lib/blog.ts`.
- Do not create separate React pages manually for each blog post.
- Do not remove or simplify the prerender system.
- Do not manually edit generated sitemap files as the main source of truth.

## Important files

- `src/App.tsx`
- `src/lib/seo.ts`
- `src/lib/blog.ts`
- `src/components/SeoManager.tsx`
- `src/entry-prerender.tsx`
- `scripts/generate-seo-pages.mjs`
- `public/sitemap.xml`
- `public/robots.txt`

## Blog rules

- `blogPosts` should be the single source of truth for blog articles.
- Every blog post should automatically be included in prerender routes.
- Every blog post should automatically be included in sitemap generation.
- Every blog post must have slug, path, title, H1, meta title, description, primary keyword, search intent, published date, modified date, author, featured image, featured image alt text, internal links, related posts, CTA, and FAQ when useful.
- Blog schema must use `BlogPosting`.
- Blog posts must not rely on manual canonical URLs. Canonicals are generated from `https://www.yoursaasgrowth.com/blog/{slug}`.
- BlogPosting schema must include author, publisher, publisher logo, dates, image, URL, and `mainEntityOfPage`.
- FAQPage schema must only exist when visible FAQ content exists, and schema answers must match visible answers exactly.
- Blog posts must output one crawlable table of contents and no raw markdown links in rendered HTML.
- `npm run build` must run `scripts/seo-check.mjs` after prerendering.

## Testing after SEO changes

After SEO-related changes, run:

`npm run build`

Then verify:
- build exits with code 0
- route count looks correct
- changed pages are generated
- blog posts appear in sitemap
- generated HTML has one H1
- generated HTML has real body text
- JSON-LD exists when expected
- blog posts have exactly one `BlogPosting` schema
- visible FAQ content has exactly one matching `FAQPage` schema
- canonical URLs are correct

## Do not do

- Do not run broad “fix all SEO” tasks.
- Do not touch unrelated files.
- Do not add public routes without SEO metadata.
- Do not rely only on client-side metadata.
- Do not use Vercel preview URLs or localhost in production canonical URLs.
