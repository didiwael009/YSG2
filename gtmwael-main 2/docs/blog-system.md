# Blog Publishing System

Use this flow to add future blog posts faster.

1. Add the article content in `src/lib/blog.ts`.
   - Add one object to `blogPosts`.
   - Keep `slug`, `path`, `category`, `title`, `h1`, `metaTitle`, `description`, `searchIntent`, `excerpt`, `author`, `datePublished`, `dateModified`, `readTime`, `ogImage`, `featuredImage`, `featuredImageAlt`, `primaryKeyword`, `toc`, `blocks`, `faq`, `source`, `cta`, `internalLinks`, and `relatedPosts`.
   - Add `pillarPage` when the article belongs to a service or pillar cluster. The first 150 words must link to it.
   - Build the article with reusable `blocks`: `intro`, `paragraphs`, `quote`, `section`, `split-note`, `visual-break`, `inline-cta`, `numbered-list`, `dark-checklist`, `example`, `comparison-table`, `mid-cta`, and `takeaway`.
   - The article layout is generated automatically from this data.

2. Run checks.
   - `npm run build`
   - `npm run lint`
   - `npm run seo:check`

The blog index, article route, runtime metadata, static SEO HTML, and sitemap are generated from `blogPosts`.

SEO fields to edit every time in the content object:
- `metaTitle`
- `description`
- `h1`
- `searchIntent`
- `slug`
- `path`
- `ogImage`
- `featuredImage`
- `featuredImageAlt`
- `author`
- `datePublished`
- `dateModified`
- `primaryKeyword`
- `faq`
- `internalLinks`
- `relatedPosts`
- `pillarPage`

This keeps the design, menu, footer, blog index, article route, SEO fallback pages, and sitemap consistent without rebuilding the page by hand each time.

`npm run build` runs `scripts/seo-check.mjs` after prerendering. A post that breaks required metadata, canonical URLs, schema, FAQ matching, internal links, sitemap inclusion, H1 count, or indexability fails the build.
