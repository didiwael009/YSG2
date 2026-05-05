# Codex Marketing Skills Pack

## What this is

This pack adapts the uploaded marketing skills repository for a Codex project workflow.

The original skill folders already follow the Agent Skills pattern: each skill is a folder containing a `SKILL.md` file, with optional `references/` files. Codex can discover and use this format.

## Recommended install location

Copy the `.agents/` folder into the real app folder:

```txt
gtmwael-main 2/.agents/
```

Final structure:

```txt
gtmwael-main 2/
  AGENTS.md
  PROJECT_CONTEXT.md
  TASKS.md
  SEO_RULES.md
  .agents/
    product-marketing-context.md
    skills/
      product-marketing-context/
      seo-audit/
      schema-markup/
      ai-seo/
      page-cro/
      copywriting/
      copy-editing/
      analytics-tracking/
      site-architecture/
      content-strategy/
      paid-ads/
      ad-creative/
      cold-email/
```

## Why not install all skills now?

The full uploaded pack contains many marketing skills and tool guides. Installing everything at once creates noise and can make Codex choose irrelevant workflows.

This starter pack keeps the skills most relevant to Your SaaS Growth:

- SEO and schema
- landing page CRO
- copywriting
- content strategy
- analytics tracking
- paid ads / ad creative
- cold email
- site architecture

Add more skills later only when you actually need them.

## Add this line to AGENTS.md

Add this under the “First thing to do” section:

```md
If the task is marketing-related, SEO-related, CRO-related, analytics-related, copy-related, paid-ads-related, content-related, or outbound-related, check `.agents/skills/` and use the relevant skill instructions before editing.
```

## Add this line to PROJECT_CONTEXT.md

```md
Marketing skills are installed in `.agents/skills/`. Codex should use the relevant skill only when the task clearly matches it, not for every coding task.
```

## Product marketing context

The most important file is:

```txt
.agents/product-marketing-context.md
```

Fill it with your actual positioning, audience, offers, proof, and ICP.

All marketing skills check this file first. Without it, Codex will produce generic marketing advice.

## Safe usage prompts

### Use a skill explicitly

```txt
Read AGENTS.md, PROJECT_CONTEXT.md, TASKS.md, SEO_RULES.md, and .agents/product-marketing-context.md.

Use the page-cro skill.

Task:
Audit the /services/landing-page page for conversion issues.

Rules:
- Inspect only the relevant route/component and SEO metadata.
- Do not edit files.
- Report problems and a prioritized fix plan.
```

### SEO audit prompt

```txt
Read AGENTS.md, PROJECT_CONTEXT.md, TASKS.md, SEO_RULES.md, and .agents/product-marketing-context.md.

Use the seo-audit skill.

Task:
Audit /blog/saas-traffic-but-no-signups for technical SEO and on-page SEO.

Rules:
- Do not edit files.
- Inspect only relevant files.
- Check H1, headings, meta, canonical, JSON-LD, internal links, prerender output logic, and sitemap inclusion.
```

### Copywriting prompt

```txt
Read AGENTS.md, PROJECT_CONTEXT.md, TASKS.md, and .agents/product-marketing-context.md.

Use the copywriting skill.

Task:
Rewrite the hero section of /services/cold-email.

Rules:
- Do not edit files first.
- Give 3 strong options.
- Use direct operator-style copy.
- No vague SaaS agency fluff.
```

## Rule

Do not ask Codex to “use all skills.”

Use one skill per task unless the task clearly needs two.
