import type { BlogPost } from "../types";

export const aiNewsClaudeCodeEmailUserAgent: BlogPost = {
  slug: "claude-code-email-user-agent",
  path: "/blog/claude-code-email-user-agent",
  category: "AI News",
  breadcrumbTitle: "Automation",
  title: "Claude Code may put your email in its web requests",
  h1: "Claude Code may put your email in its web requests",
  metaTitle: "Claude Code May Put Your Email in Its Web Requests",
  description: "A GitHub issue and a Hacker News thread say Claude Code sends your email in a User-Agent header when it searches the web. What agencies should check.",
  schemaType: "Article",
  schemaHeadline: "Claude Code may put your email in its web requests",
  schemaDescription: "A GitHub issue and a Hacker News thread say Claude Code sends your email in a User-Agent header when it searches the web. What agencies should check.",
  schemaDateModified: "2026-11-07",
  schemaIncludeGlobal: false,
  schemaBreadcrumbs: [
    {
      name: "Blog",
      path: "/blog",
    },
    {
      name: "Claude Code may put your email in its web requests",
      path: "/blog/claude-code-email-user-agent",
    },
  ],
  searchIntent: "Agencies and teams running Claude Code agents who want to know what the agent sends in their name.",
  excerpt: "A GitHub issue and a Hacker News thread report that Claude Code sends a User-Agent header containing the user's email when it searches the web.",
  author: "Wael Aouididi",
  authorBio: "SaaS Growth Marketer and fractional growth lead. I help B2B SaaS teams fix positioning, landing pages, outreach, and conversion before they scale traffic.",
  datePublished: "2026-11-06",
  dateModified: "2026-11-07",
  readTime: "1 min read",
  ogImage: "/ai-news/2026-11-06/claude-code-email-user-agent.webp",
  featuredImage: "/ai-news/2026-11-06/claude-code-email-user-agent.webp",
  featuredImageAlt: "Illustration of a small robot walking through a doorway pulling a large envelope by a string while small envelopes flutter away.",
  primaryKeyword: "claude code",
  secondaryKeywords: [
    "claude code",
    "claude code user agent",
    "ai agent privacy",
  ],
  toc: [],
  blocks: [
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
      title: "Developers Say Opus 5.5 Got Worse and Costlier",
      description: "A post on r/ClaudeCode says Opus 5.5 takes longer and burns more tokens than at launch. Nothing confirms it yet.",
      href: "/blog/opus-5-5-worse-and-costlier",
    },
    {
      label: "AI Distribution",
      title: "Can a Claude Connector Bring Your SaaS Customers?",
      description: "A founder says a Claude connector brought 24,000 accounts in five weeks. How the directory works and what to test.",
      href: "/blog/claude-connector-customer-acquisition",
    },
  ],
};
