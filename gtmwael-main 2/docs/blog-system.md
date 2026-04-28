# Blog Publishing System

Use this flow to add future blog posts faster.

1. Add the article content in `src/lib/blog.ts`.
   - Add one object to `blogPosts`.
   - Keep `slug`, `path`, `title`, `description`, `toc`, `sections`, `faq`, `source`, and `cta`.
   - The article layout is generated automatically from this data.

2. Add a small route page in `src/pages`.
   - Copy `src/pages/BlogSaasLandingPageAds.tsx`.
   - Change the slug in `getBlogPostBySlug(...)`.

3. Add the route in `src/App.tsx`.
   - Point the new route to the small page created in step 2.

4. Add SEO metadata in `src/lib/seo.ts`.
   - Add one article route with the same path.
   - Reuse the post title, description, published date, breadcrumbs, links, and FAQ.

5. Run checks.
   - `npm run build`
   - `npm run lint`

This keeps the design, menu, footer, blog index, and article structure consistent without rebuilding the page by hand each time.
