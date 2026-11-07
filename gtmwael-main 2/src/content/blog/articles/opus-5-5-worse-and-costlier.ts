import type { BlogPost } from "../types";

export const aiNewsOpus55WorseAndCostlier: BlogPost = {
  slug: "opus-5-5-worse-and-costlier",
  path: "/blog/opus-5-5-worse-and-costlier",
  category: "AI News",
  breadcrumbTitle: "Models",
  title: "Developers say Opus 5.5 got worse and costlier",
  h1: "Developers say Opus 5.5 got worse and costlier",
  metaTitle: "Opus 5.5 Got Worse and Costlier, Developers Say",
  description: "A post on r/ClaudeCode says Opus 5.5 takes longer and burns more tokens than at launch. What to check in your Claude pipelines, and what is not confirmed.",
  schemaType: "Article",
  schemaHeadline: "Developers say Opus 5.5 got worse and costlier",
  schemaDescription: "A post on r/ClaudeCode says Opus 5.5 takes longer and burns more tokens than at launch. What to check in your Claude pipelines, and what is not confirmed.",
  schemaDateModified: "2026-11-07",
  schemaIncludeGlobal: false,
  schemaBreadcrumbs: [
    {
      name: "Blog",
      path: "/blog",
    },
    {
      name: "Developers say Opus 5.5 got worse and costlier",
      path: "/blog/opus-5-5-worse-and-costlier",
    },
  ],
  searchIntent: "Teams running pipelines on Claude who want to know whether Opus 5.5 changed and how to catch a silent model change.",
  excerpt: "A post on r/ClaudeCode says Opus 5.5 now takes longer to get things right and burns more tokens than at launch. Nothing confirms it.",
  author: "Wael Aouididi",
  authorBio: "SaaS Growth Marketer and fractional growth lead. I help B2B SaaS teams fix positioning, landing pages, outreach, and conversion before they scale traffic.",
  datePublished: "2026-11-06",
  dateModified: "2026-11-07",
  readTime: "1 min read",
  ogImage: "/ai-news/2026-11-06/opus-5-5-regression.webp",
  featuredImage: "/ai-news/2026-11-06/opus-5-5-regression.webp",
  featuredImageAlt: "Illustration of a large brain-shaped machine leaking coins from a crack while an engineer times it with a stopwatch.",
  primaryKeyword: "opus 5.5",
  secondaryKeywords: [
    "opus 5.5",
    "claude opus regression",
    "claude token costs",
  ],
  toc: [],
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
      standalone: true,
    },
  ],
  cta: {
    title: "Want to know which AI change matters for your funnel?",
    body: "If a model or tool change is moving your numbers, I can help you find what to test first, from landing pages to outreach.",
    button: "Book a 20-min GTM Audit",
  },
  internalLinks: [
    {
      href: "/saas-marketing-plan",
      label: "SaaS marketing plan",
    },
    {
      href: "/landing-page-for-saas",
      label: "SaaS landing page optimization",
    },
  ],
  relatedPosts: [
    {
      label: "AI News",
      title: "Claude Code May Put Your Email in Its Web Requests",
      description: "A GitHub issue and a Hacker News thread say Claude Code sends your email in a User-Agent header when it searches the web.",
      href: "/blog/claude-code-email-user-agent",
    },
    {
      label: "AI Distribution",
      title: "Can a Claude Connector Bring Your SaaS Customers?",
      description: "A founder says a Claude connector brought 24,000 accounts in five weeks. How the directory works and what to test.",
      href: "/blog/claude-connector-customer-acquisition",
    },
  ],
};
