# Blog Publishing System

Use this flow to add future blog posts faster.

## What The System Now Optimizes Automatically

The blog system now handles the technical SEO work that previously required a manual audit:

- Generates one `<title>` tag from `metaTitle`.
- Generates one meta description from `description`.
- Generates a self-referencing canonical URL from `https://www.yoursaasgrowth.com/blog/{slug}`.
- Generates Open Graph and Twitter Card tags from the blog post data.
- Generates `BlogPosting` JSON-LD for every blog article.
- Adds the author, publisher, publisher logo, publish date, modified date, canonical URL, and absolute image URL to `BlogPosting`.
- Generates `FAQPage` JSON-LD only when the article has visible FAQ content.
- Keeps FAQ schema questions and answers matched to the visible `faq` data.
- Generates `BreadcrumbList` JSON-LD.
- Defaults blog posts to `index, follow, max-image-preview:large`.
- Renders one crawlable table of contents.
- Renders markdown-style internal links as real anchors in the article body.
- Requires a featured image with descriptive alt text.
- Adds the blog URL to the sitemap once, with the `www` canonical and no trailing-slash duplicate.
- Fails the build if a new article misses required SEO data or outputs invalid prerendered HTML.

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

`npm run build` runs `scripts/seo-check.mjs` after prerendering. A post that breaks required metadata, canonical URLs, schema, FAQ matching, internal links, raw markdown link rendering, sitemap inclusion, H1 count, or indexability fails the build.

## BlogPosting Schema Contract

Every blog post must prerender exactly one `BlogPosting` JSON-LD block with:

- `headline` from the social article title.
- `description` from the meta description.
- `author.name` set from the post author.
- `publisher.name` set to `Your SaaS Growth`.
- `publisher.logo.url` set to `https://www.yoursaasgrowth.com/favicon.png`.
- `datePublished` and `dateModified` from the blog post data.
- `image` as an absolute URL.
- `url` equal to the canonical URL.
- `mainEntityOfPage.@id` equal to the canonical URL.

Do not hardcode separate article schema per post. Update the shared SEO manager and prerender generator when the schema contract changes.

## FAQ Schema Contract

FAQ schema is allowed only when the article has visible FAQ content in `post.faq`.

- Every visible FAQ item must have a matching `Question`.
- Every `Question` must have `acceptedAnswer.text`.
- Schema answer text must match the visible answer exactly.
- Do not add FAQPage schema for hidden or empty FAQ content.
