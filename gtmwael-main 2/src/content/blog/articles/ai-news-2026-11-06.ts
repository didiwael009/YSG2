import type { BlogPost } from "../types";

export const aiNews20261106: BlogPost = {
  slug: "ai-news-2026-11-06",
  path: "/blog/ai-news-2026-11-06",
  category: "AI News",
  breadcrumbTitle: "Issue 1",
  title: "AI News, Nov 6: Opus 5.5 doubts, an email leak in Claude Code, and free code that doesn't sell",
  h1: "AI News, Nov 6: Opus 5.5 doubts, an email leak in Claude Code, and free code that doesn't sell",
  metaTitle: "AI News, Nov 6: Opus 5.5 Doubts and a Claude Code Leak",
  description:
    "Five AI stories for SaaS teams: Opus 5.5 regression claims, Claude Code's email in web requests, a free clone with no users, AI READMEs, GPT-6 Cyber.",
  schemaType: "Article",
  schemaHeadline: "AI News, Nov 6: Opus 5.5 doubts, an email leak in Claude Code, and free code that doesn't sell",
  schemaDescription:
    "Five AI stories from developer forums, each with what it means for SaaS and agency teams and the limit of what is known.",
  schemaDateModified: "2026-11-06",
  schemaIncludeGlobal: false,
  schemaBreadcrumbs: [
    { name: "Blog", path: "/blog" },
    { name: "AI News, Nov 6", path: "/blog/ai-news-2026-11-06" },
  ],
  searchIntent:
    "SaaS founders, marketers and agencies who want a short, sourced roundup of what developers are saying about AI models and tools this week.",
  excerpt:
    "Developers say Opus 5.5 got worse and costlier, Claude Code may send your email in its web requests, a free clone of a SaaS found no users, readers push back on AI-written READMEs, and OpenAI claims GPT-6 Cyber patched 948 Linux flaws.",
  author: "Wael Aouididi",
  authorBio:
    "SaaS Growth Marketer and fractional growth lead. I help B2B SaaS teams fix positioning, landing pages, outreach, and conversion before they scale traffic.",
  datePublished: "2026-11-06",
  dateModified: "2026-11-06",
  readTime: "4 min read",
  ogImage: "/ai-news/2026-11-06/opus-5-5-regression.webp",
  featuredImage: "/ai-news/2026-11-06/opus-5-5-regression.webp",
  featuredImageAlt: "Illustration of a large brain-shaped machine leaking coins from a crack while an engineer times it with a stopwatch.",
  primaryKeyword: "ai news",
  secondaryKeywords: [
    "ai news",
    "opus 5.5",
    "claude code",
    "gpt-6 cyber",
    "vibe coding",
  ],
  toc: [
    { label: "Opus 5.5 got worse and costlier?", id: "opus-5-5-regression" },
    { label: "Your email in Claude Code requests", id: "claude-code-email-user-agent" },
    { label: "A free clone found no users", id: "open-source-vs-saas" },
    { label: "READMEs written by Claude", id: "ai-written-readmes" },
    { label: "GPT-6 Cyber and 948 Linux flaws", id: "gpt-6-cyber-linux-patches" },
  ],
  blocks: [
    {
      type: "news-item",
      id: "opus-5-5-regression",
      rubrique: "MODELS",
      title: "Developers say Opus 5.5 got worse and costlier",
      text: [
        "A post on r/ClaudeCode (1,168 upvotes, 459 comments) says Opus 5.5 now takes longer to get things right and burns more tokens than at launch. The most upvoted reply (422 votes) guesses Anthropic quantized the model to free compute before a new release. Nothing confirms it.",
        "If your pipelines run on Claude, pin the model version, keep a small regression test you can rerun, and set a token budget per job, so a silent change shows in your numbers before it shows in your output.",
      ],
      image: "/ai-news/2026-11-06/opus-5-5-regression.webp",
      imageAlt: "Illustration of a large brain-shaped machine leaking coins from a crack while an engineer times it with a stopwatch.",
      limit: "No statement from Anthropic; the only benchmarks found are on secondary blogs and unverified.",
      sourceLabel: "r/ClaudeCode",
      sourceUrl: "https://www.reddit.com/r/ClaudeCode/comments/1xodr56/opus_55_is_definitely_getting_dumber_and_costlier/",
    },
    {
      type: "news-item",
      id: "claude-code-email-user-agent",
      rubrique: "AUTOMATION",
      title: "Claude Code may put your email in its web requests",
      text: [
        "A GitHub issue (#107757, 300 reactions) and a Hacker News thread (865 points) report that Claude Code sends a User-Agent header containing the user's email when it searches the web. The issue's author says it brings dozens of spam emails a day.",
        "For agencies running agents on client work: check what your automations send in your name, and give agents a dedicated address, not your main inbox.",
      ],
      image: "/ai-news/2026-11-06/claude-code-email-user-agent.webp",
      imageAlt: "Illustration of a small robot walking through a doorway pulling a large envelope by a string while small envelopes flutter away.",
      limit: "No official answer yet; one commenter could not reproduce it, so the mechanism is unclear.",
      sourceLabel: "Hacker News",
      sourceUrl: "https://news.ycombinator.com/item?id=50385272",
    },
    {
      type: "news-item",
      id: "open-source-vs-saas",
      rubrique: "DIGITAL BUSINESS",
      title: "A free open source clone of a SaaS found no users",
      text: [
        "On r/vibecoding, a builder vibe-coded an open source alternative to a popular SaaS, with parity on the core features, and got no traction. Top reply (158 votes): why not host it and charge less than the incumbent? Another (63): most people don't want to be sysadmins.",
        "Code is getting cheap to write. People still pay for convenience: hosting, security, support. Sell that part.",
      ],
      image: "/ai-news/2026-11-06/open-source-vs-saas.webp",
      imageAlt: "Illustration of an empty stall offering free boxes of gears next to a busy stall handing out wrapped parcels.",
      limit: "One project's story, no download or conversion figures.",
      sourceLabel: "r/vibecoding",
      sourceUrl: "https://www.reddit.com/r/vibecoding/comments/1xomkge/my_opensource_project_never_took_off_the/",
    },
    {
      type: "news-item",
      id: "ai-written-readmes",
      rubrique: "CONTENT",
      title: "Readers are tired of READMEs written by Claude",
      text: [
        "A post on r/ClaudeAI (463 upvotes) asks vibe-coders to rewrite the READMEs Claude generates for them. Looking for VR headset scripts, the author found every README dense, padded and hard to read. A reply with 164 votes jokes that READMEs are now written for other Claudes.",
        "A README is a first pitch, like a landing page. Write the opening yourself: what it does, who it's for, how to start, in three lines.",
      ],
      image: "/ai-news/2026-11-06/ai-written-readmes.webp",
      imageAlt: "Illustration of a tired reader facing a towering stack of dense pages while a hand offers one short page.",
      limit: "One user's opinion; nothing shows it hurts stars or adoption.",
      sourceLabel: "r/ClaudeAI",
      sourceUrl: "https://www.reddit.com/r/ClaudeAI/comments/1xoj99r/vibecoders_i_beg_you_when_posting_your_app_or/",
    },
    {
      type: "news-item",
      id: "gpt-6-cyber-linux-patches",
      rubrique: "MODELS",
      title: "OpenAI says GPT-6 Cyber patched 948 Linux kernel flaws",
      text: [
        "OpenAI announced GPT-6 Cyber: 48.5% on ExploitGym, against 32.1% for GPT-5.6 Cyber. According to OpenAI, an autonomous pipeline validated and patched 948 privilege-escalation flaws in the Linux kernel in one run, for about $1.2M of API, roughly $1,000 per flaw according to Greg Brockman. OpenAI researcher Eric Wallace says human researchers find about 20 such flaws a year.",
      ],
      image: "/ai-news/2026-11-06/gpt-6-cyber-linux-patches.webp",
      imageAlt: "Illustration of a small penguin on a wall of server racks while tiny robotic arms stitch patches over its cracks.",
      limit: "Figures from OpenAI and its researchers on X; no independent check, no count of patches accepted by Linux maintainers.",
      sourceLabel: "r/singularity",
      sourceUrl: "https://www.reddit.com/r/singularity/comments/1xoo9ob/openai_has_just_announced_gpt6_cyber_a_major_step/",
    },
  ],
  cta: {
    title: "Want to know which AI change matters for your funnel?",
    body:
      "If a model or tool change is moving your numbers, I can help you find what to test first, from landing pages to outreach.",
    button: "Book a 20-min GTM Audit",
  },
  internalLinks: [
    { href: "/saas-marketing-plan", label: "SaaS marketing plan" },
    { href: "/landing-page-for-saas", label: "SaaS landing page optimization" },
  ],
  relatedPosts: [
    {
      label: "AI Distribution",
      title: "Can a Claude Connector Bring Your SaaS Customers?",
      description:
        "A founder says a Claude connector brought 24,000 accounts in five weeks. How the directory works and what to test.",
      href: "/blog/claude-connector-customer-acquisition",
    },
    {
      label: "SaaS CRO",
      title: "AI Conversion Rate Optimization for SaaS: Fix First",
      description: "What SaaS teams should fix before adding AI personalization, chatbots, or funnel tools.",
      href: "/blog/ai-conversion-rate-optimization-saas",
    },
  ],
};
