# Blog Publishing System

Use this flow to add future blog posts faster.

1. Add the article content in `src/lib/blog.ts`.
   - Add one object to `blogPosts`.
   - Keep `slug`, `path`, `category`, `title`, `metaTitle`, `description`, `excerpt`, `author`, `publishedAt`, `modifiedAt`, `readTime`, `ogImage`, `toc`, `blocks`, `faq`, `source`, `cta`, and `relatedPosts`.
   - Build the article with reusable `blocks`: `intro`, `paragraphs`, `quote`, `section`, `split-note`, `visual-break`, `inline-cta`, `numbered-list`, `dark-checklist`, `example`, `comparison-table`, `mid-cta`, and `takeaway`.
   - The article layout is generated automatically from this data.

2. Run checks.
   - `npm run build`
   - `npm run lint`

The blog index, article route, runtime metadata, static SEO HTML, and sitemap are generated from `blogPosts`.

SEO fields to edit every time in the content object:
- `metaTitle`
- `description`
- `slug`
- `path`
- `ogImage`
- `author`
- `publishedAt`
- `modifiedAt`
- `faq`
- `relatedPosts`

This keeps the design, menu, footer, blog index, article route, SEO fallback pages, and sitemap consistent without rebuilding the page by hand each time.
