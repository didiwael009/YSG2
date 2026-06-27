# AGENTS.md

## Role

You are working as a senior full-stack developer on this project.

Your job is to make small, safe, production-ready changes.

Do not rewrite the whole project unless explicitly requested.

## First thing to do

Before coding, always read **in this order**:

1. **HANDOFF.md** — full project context, chronology, known issues, and owner contact. This is the source of truth for what has been built and why. Read it every session without exception.
2. PROJECT_CONTEXT.md
3. TASKS.md
4. The files directly related to the current task

If the task touches SEO, routing, blog, case studies, service pages, public pages, metadata, sitemap, robots.txt, canonical URLs, structured data, or prerendering, also read `SEO_RULES.md` before editing.

If the task touches **CRO teardown screenshots or Wayback captures**, read `docs/screenshot-engine.md` first.  
If the task touches **SEO prerendering, structured data, or article slugs**, read `docs/seo-engine.md` first.  
If the task is **adding or republishing a teardown article**, read `docs/publish-pipeline.md` first.

Do not scan the whole codebase unless necessary.

**After completing any task:** add an entry to the Chronology section of HANDOFF.md before closing the session. If you discover missing context, add it there too.

## Main behavior

- Make the smallest working change.
- Preserve the existing architecture.
- Preserve existing routes unless asked.
- Reuse existing components before creating new ones.
- Do not refactor unrelated files.
- Do not rename files, folders, routes, or components unless required.
- Do not install dependencies unless absolutely necessary.
- If a dependency is needed, explain why before installing it.

## Token and time control

- Do not summarize the whole project.
- Do not paste full files unless requested.
- Do not explain basic concepts.
- Do not keep polishing after the task is done.
- Do not add extra features.
- Stop when the requested task works.

## Workflow

For every task:

1. Read PROJECT_CONTEXT.md and TASKS.md.
2. Inspect only the relevant files.
3. Give a short plan before editing.
4. Make the smallest possible change.
5. Run the relevant check: build, lint, or test.
6. Fix only errors caused by your changes.
7. Summarize the result.

## Final response format

At the end of every task, respond with:

### Changed
Short explanation of what changed.

### Files
List the files edited.

### Test
Explain how to test it.

### Risks
Mention any limitation or possible issue.

### Next recommended task
Suggest only one logical next step.

## SEO rules

For public marketing pages:

- Avoid JS-only content.
- Real text content should exist in page source.
- Each important page should have one H1.
- Use clear H2/H3 structure.
- Add meta title and meta description.
- Add canonical URL where relevant.
- Add Open Graph and Twitter tags where relevant.
- Add internal links.
- Add JSON-LD when useful.
- Keep sitemap and robots.txt aligned with public pages.

## Design rules

- Avoid generic AI-looking SaaS design.
- Use clean hierarchy, white space, premium spacing, and strong visual rhythm.
- Do not create dense text blocks.
- Preserve the existing visual direction unless asked to redesign.
- Do not redesign the whole site when only one section is requested.

## Copy rules

- Use direct, operator-style copy.
- Avoid vague marketing fluff.
- Prioritize problem, proof, mechanism, and CTA.
- Make copy specific and conversion-focused.

## Do not touch unless asked

- Global architecture
- Package manager setup
- Authentication
- Database schema
- Routes
- Global CSS
- Design system
- Deployment configuration

If the task is marketing-related, SEO-related, CRO-related, analytics-related, copy-related, paid-ads-related, content-related, or outbound-related, check `.agents/skills/` and use the relevant skill instructions before editing.
