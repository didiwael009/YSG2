# Blog Publishing Checklist

This checklist supports the automated guardrails. The real publishing gate is `npm run seo:check`, which also runs at the end of `npm run build`.

## Required Data

- `slug` is short, lowercase, and date-free.
- `path` is exactly `/blog/{slug}`.
- `title`, `h1`, `metaTitle`, and `description` are unique.
- `metaTitle` should be 60 characters or fewer when possible; the automated hard limit is 65 characters.
- `description` is 120-155 characters.
- `primaryKeyword` appears in the title or meta title, H1, and first 100 words.
- `searchIntent` states the one clear intent the article serves.
- `datePublished` and `dateModified` are set.
- `featuredImage` and `featuredImageAlt` are set.
- `internalLinks` lists the intended contextual internal links.
- `relatedPosts` prevents orphan articles.
- `pillarPage` is set for cluster posts and linked in the first 150 words.

## Template Output

- One H1.
- One title tag.
- One meta description.
- One self-referencing canonical URL.
- Open Graph tags.
- Twitter Card tags.
- Exactly one `BlogPosting` JSON-LD block.
- `BlogPosting.publisher.name` is `Your SaaS Growth`.
- `BlogPosting.publisher.logo.url` is `https://www.yoursaasgrowth.com/favicon.png`.
- `BlogPosting.url` and `mainEntityOfPage.@id` match the canonical URL.
- `FAQPage` JSON-LD only when visible FAQ content exists.
- FAQ schema questions and answers match the visible FAQ copy exactly.
- `BreadcrumbList` JSON-LD.
- Robots defaults to `index, follow`.
- Markdown internal links render as real HTML anchors.
- Only one crawlable "In this article" table of contents is visible.

## Human Editorial Review

- The article fully matches the search intent.
- Examples are specific and SaaS-relevant.
- Numeric claims are sourced or clearly framed as hypothetical.
- Internal links are useful in context, not only present for SEO.
- CTA placement makes sense after the intro and at the end.
- FAQ questions are genuinely useful and not duplicated from body headings.
