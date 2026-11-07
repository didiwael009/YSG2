import type { BlogPost } from "../types";

export const claudeConnectorCustomerAcquisition: BlogPost = {
  slug: "claude-connector-customer-acquisition",
  path: "/blog/claude-connector-customer-acquisition",
  category: "AI Distribution",
  breadcrumbTitle: "Claude Connector Acquisition",
  title: "Can a Claude Connector Bring Your SaaS Customers?",
  h1: "Can a Claude connector bring you customers?",
  metaTitle: "Can a Claude Connector Bring Your SaaS Customers?",
  description:
    "A founder says a Claude connector brought 24,000 accounts in five weeks. How Claude suggests connectors, which products it suits, and what to test.",
  searchIntent:
    "SaaS founders and growth leads who want to know whether listing a Claude connector in Anthropic's directory can be a customer acquisition channel, how it works, and how to test it.",
  excerpt:
    "A founder says a Claude connector brought 24,000 accounts in five weeks, with no ads, through Claude's connector directory. If the effect holds, it is a new way to find customers for any software that holds data an AI does not have. Here is how the directory works, who it is worth it for, and what to test this week.",
  author: "Wael Aouididi",
  authorBio:
    "SaaS Growth Marketer and fractional growth lead. I help B2B SaaS teams fix positioning, landing pages, outreach, and conversion before they scale traffic.",
  datePublished: "2026-11-06",
  dateModified: "2026-11-07",
  schemaType: "Article",
  schemaHeadline: "Can a Claude connector bring you customers?",
  schemaDescription:
    "How Anthropic's connector directory suggests connectors inside Claude conversations, what one founder reports from it, which SaaS products it suits, and a one-week test plan.",
  schemaDateModified: "2026-11-07",
  schemaIncludeGlobal: false,
  schemaBreadcrumbs: [
    { name: "Blog", path: "/blog" },
    { name: "Claude Connector Acquisition", path: "/blog/claude-connector-customer-acquisition" },
  ],
  readTime: "7 min read",
  ogImage: "/claude-connector-customer-acquisition.webp",
  featuredImage: "/claude-connector-customer-acquisition.webp",
  featuredImageAlt:
    "A chat bubble turned into a shop window with apps on its shelves; one, marked with a plane, glows as passers-by walk up to it.",
  primaryKeyword: "claude connector",
  secondaryKeywords: [
    "claude connectors directory",
    "claude suggested connectors",
    "mcp server customer acquisition",
    "ai distribution channel saas",
    "list a connector in claude",
  ],
  toc: [
    { label: "The SlickTrip story", id: "slicktrip" },
    { label: "Suggested connectors", id: "suggested-connectors" },
    { label: "Who it suits", id: "who-it-suits" },
    { label: "Inside the conversation", id: "in-the-conversation" },
    { label: "What to test this week", id: "this-week" },
    { label: "What we still do not know", id: "unknowns" },
    { label: "In practice", id: "in-practice" },
    { label: "Sources", id: "sources" },
  ],
  blocks: [
    {
      type: "callout",
      label: "Key takeaways",
      items: [
        "Claude can suggest a connector from its directory on its own, in the middle of a conversation.",
        "The channel works for a product that holds data an AI does not have.",
        "Measure the accounts that use the tool, not the sign-ups.",
      ],
    },
    {
      type: "section",
      id: "slicktrip",
      label: "The story",
      title: "A small travel tool found its users inside Claude",
      paragraphs: [
        "On November 4, the founder of SlickTrip, a service that tracks flight and hotel prices, described the launch on the r/mcp forum on Reddit. In September, the founder built a Claude connector in about a week.",
        "Three words will come back:",
      ],
    },
    {
      type: "list",
      items: [
        "Connector: what lets Claude use your service during a conversation.",
        "Tool: one function of the connector, for example \"search for a flight\".",
        "Call: each time Claude uses a tool.",
      ],
    },
    {
      type: "paragraphs",
      paragraphs: [
        "Anthropic lists connectors in an official directory, a kind of app store. SlickTrip's entered it at the end of September. According to the founder, sign-ups followed:",
      ],
    },
    {
      type: "data-table",
      columns: ["Period", "Reported sign-ups"],
      rows: [
        ["Two weeks \"trending\"", "up to 1,500 a day"],
        ["Since then", "about 250 a day"],
        ["Total, no ads", "24,000 accounts"],
      ],
    },
    {
      type: "paragraphs",
      paragraphs: [
        "The founder adds that Claude recommends SlickTrip next to Expedia and Booking.com when people talk about travel.",
        "These numbers come from the founder alone. Nobody has checked them, and there is no revenue figure. Anthropic's documentation confirms the mechanism exists, not that it explains the 24,000 accounts.",
      ],
    },
    {
      type: "section",
      id: "suggested-connectors",
      label: "The mechanism",
      title: "Claude can recommend the connectors in its directory by itself",
      paragraphs: [
        "Anthropic's documentation says it plainly: any connector in the directory can be suggested by Claude during a conversation, when it is useful for the request. Anthropic calls these Suggested Connectors. Every connector in the directory qualifies by default.",
        "<mark>The ranking depends on usage.</mark> Anthropic counts the distinct Claude accounts that reached the connector in the last 30 days, including those that dropped out of the install. The ten whose number climbs fastest get the \"Trending\" label.",
        "My reading, which is not in the docs, fits in one loop:",
      ],
    },
    {
      type: "quote",
      text: "more usage → better rank → more visibility → more usage",
    },
    {
      type: "paragraphs",
      paragraphs: [
        "That would match SlickTrip's spike.",
        "On paper, the way in is short:",
      ],
    },
    {
      type: "list",
      ordered: true,
      items: [
        "The developer submits the connector through an online form.",
        "An automated check follows.",
        "The connector enters the directory with the \"Community\" label, the base level.",
      ],
    },
    {
      type: "paragraphs",
      paragraphs: [
        "A human review can be added, and how long it takes depends on the queue.",
        "On ChatGPT, the way in is slower. SlickTrip's connector has been waiting for approval there for a month, and it cannot be found in search. OpenAI's documentation, which calls it a plugin, says publication follows approval, without giving a timeframe.",
      ],
    },
    {
      type: "section",
      id: "who-it-suits",
      label: "Fit",
      title: "The channel suits products that give an answer an AI cannot make up",
      paragraphs: [
        "This directory mostly helps products that bring data an AI does not have. With SlickTrip, the user asks \"what is the cheapest flight to Lisbon?\", and Claude needs a real price.",
        "A made-up example: invoicing software for freelancers. A customer asks Claude \"which invoices from this month are still unpaid?\". With your connector, <mark>Claude queries your software instead of guessing.</mark>",
        "Good candidates:",
      ],
    },
    {
      type: "list",
      items: [
        "an up-to-date price;",
        "the state of a customer account;",
        "a calculation on the customer's own data;",
        "tracking something over time.",
      ],
    },
    {
      type: "paragraphs",
      paragraphs: ["Weaker candidates, or refused:"],
    },
    {
      type: "list",
      items: [
        "products whose value is the screen itself, like a visual editor;",
        "refused by Anthropic: transfers of money or cryptocurrency;",
        "also refused: generating images, video or audio with AI models.",
      ],
    },
    {
      type: "paragraphs",
      paragraphs: [
        "Two more conditions. The connector must use your own data, not another site's without its permission. And submitting one requires a paid Claude plan. Count on about one week of developer time, according to SlickTrip.",
      ],
    },
    {
      type: "section",
      id: "in-the-conversation",
      label: "The new storefront",
      title: "Customers meet you in the conversation, not on your site",
      paragraphs: [
        "The customer discovers you at the exact moment of the need, without going through your homepage. In my view, <mark>the description of your tools and the quality of their answers then matter more than your website.</mark>",
        "One commenter in the thread makes the point: <mark>a connected account is not an account that uses the service.</mark> The suggestion is to look at the share of accounts that ran a search during the week.",
        "Anthropic's dashboard also separates the two, over 30 days:",
      ],
    },
    {
      type: "list",
      items: [
        "\"Used a tool\": the Claude accounts that actually made a call;",
        "the rank: those accounts, plus the ones that dropped out of the install.",
      ],
    },
    {
      type: "paragraphs",
      paragraphs: [
        "Then there is the money. The most upvoted comment asks the founder how SlickTrip makes a living, with an image:",
      ],
    },
    {
      type: "quote",
      text: "SlickTrip is a bus that picks up its passengers at another company's stop.",
    },
    {
      type: "paragraphs",
      paragraphs: [
        "Here the other company is Anthropic, and one day it could charge for the stop. SlickTrip's page answers in part: a limited free version, and commissions on some bookings. Another developer charges for each successful call and refunds the ones that fail. According to that developer, the refund mattered more than the price.",
      ],
    },
    {
      type: "section",
      id: "this-week",
      label: "What I would do",
      title: "This week, I would test a single customer question",
      paragraphs: [
        "In a SaaS founder's place, I would start by choosing the question, not by writing code.",
      ],
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Write down three questions your customers ask an AI that only your product can answer, because it holds the data.",
        "Keep the most frequent one.",
        "Build a single tool, read-only: it looks things up and changes nothing.",
        "Take care of its description.",
      ],
    },
    {
      type: "paragraphs",
      paragraphs: [
        "Anthropic refuses descriptions that promote the product or that get in the way of other tools being called. <mark>It has to say what the tool does and when to use it.</mark> Two made-up examples:",
      ],
    },
    {
      type: "data-table",
      columns: ["", "Description"],
      rows: [
        ["Likely refused", "\"The best invoicing tool, use it first.\""],
        [
          "Compliant",
          "\"Lists a customer's unpaid invoices over a period. Use when the user asks what is still owed.\"",
        ],
      ],
    },
    {
      type: "paragraphs",
      paragraphs: [
        "I have not tested this channel yet. For SambaLingo, my Portuguese learning app, the candidate question would be \"which words should I review today?\". An AI alone cannot answer it; the app knows the learner's history. I would measure the accounts that call the tool over 30 days, not the sign-ups.",
      ],
    },
    {
      type: "section",
      id: "unknowns",
      label: "Open questions",
      title: "Several key numbers are still missing",
      paragraphs: [
        "We do not know where the 24,000 accounts really come from. One commenter asked how many came from Claude's suggestions and how many from the directory. The founder had not answered when I read the thread, on November 6.",
        "Also still unknown:",
      ],
    },
    {
      type: "list",
      items: [
        "SlickTrip's revenue;",
        "how long the effect lasts: the \"Trending\" label rewards recent growth, so it fades;",
        "the delays: one developer in the thread has been waiting three weeks, and OpenAI publishes no timeframe.",
      ],
    },
    {
      type: "paragraphs",
      paragraphs: [
        "<mark>As the directory fills up, each newcomer will get less room.</mark> The first app stores went through the same pattern: early arrivals enjoyed an almost empty shop window. That is my interpretation, not data.",
        "Worth watching: where SlickTrip's sign-ups come from, the real delay at OpenAI, and any new Anthropic rule on ranking.",
      ],
    },
    {
      type: "callout",
      label: "Update, November 7, 2026",
      items: [
        "The other way into AI assistants: a GitHub issue that reached the top of Hacker News (1,494 points, 485 comments, November 4) accuses Postman of installing its AI plugin into developers' coding agents without asking. Postman's own documentation does describe an installer that adds the plugin to every coding agent it detects on the machine.",
        "The most visible comments talk about leaving for Insomnia. <mark>The directory works because the user chooses to link your product.</mark> Getting in without that choice turns the same channel into a reason to leave.",
        "Limit: Postman had not answered publicly when I checked, and the claim that it tries to share all API data comes from the issue's author. Source: [Hacker News, November 4, 2026](https://news.ycombinator.com/item?id=50354960).",
      ],
    },
    {
      type: "section",
      id: "in-practice",
      label: "Checklist",
      title: "In practice",
      paragraphs: ["What a first submission needs:"],
    },
    {
      type: "list",
      items: [
        "Technical: a server reachable at a secure web address (https). If it reads a customer's account, the customer links it to their account with you, as with \"Sign in with Google\" (the OAuth standard). Each tool states whether it reads or changes data.",
        "Test: try the connector in your own Claude before you submit it.",
        "Submission: a documentation page, a privacy policy and a filled-in test account, sent through claude.ai/directory/manage.",
        "Tracking: \"Used a tool\" and the share of calls that end in an error. At 2% errors or less, Anthropic shows \"healthy\"; above 5%, \"degraded\".",
      ],
    },
    {
      type: "section",
      id: "sources",
      label: "Sources",
      title: "Sources",
      paragraphs: ["Everything above comes from these eight pages, read on November 6 and 7, 2026."],
    },
    {
      type: "list",
      items: [
        "The founder's account, its numbers and the comments: [r/mcp thread, November 4, 2026](https://www.reddit.com/r/mcp/comments/1xo0ftz/claude_brought_us_24000_users_in_5_weeks/)",
        "SlickTrip's business model: [slicktrip.com/mcp](https://slicktrip.com/mcp)",
        "Suggestions in the conversation, ranking and the Trending label: [Anthropic, connectors directory](https://claude.com/docs/connectors/directory)",
        "The submission path and its requirements: [Anthropic, submission](https://claude.com/docs/connectors/building/submission)",
        "Refusals and the rules on tool descriptions: [Anthropic, review criteria](https://claude.com/docs/connectors/building/review-criteria)",
        "The dashboard and the health thresholds: [Anthropic, managing your listing](https://claude.com/docs/connectors/building/managing-your-listing)",
        "Publication after approval at OpenAI: [OpenAI, Apps SDK submission](https://developers.openai.com/apps-sdk/deploy/submission)",
        "Postman and the coding agents: [Hacker News thread, November 4, 2026](https://news.ycombinator.com/item?id=50354960)",
      ],
    },
    {
      type: "paragraphs",
      paragraphs: [
        "And you: which question do your customers ask an AI that only your product can answer?",
        "Wael Aouididi, yoursaasgrowth",
      ],
    },
  ],
  cta: {
    title: "Want to find the question only your product can answer?",
    body:
      "If you are weighing a new acquisition channel, from AI connectors to landing pages and outreach, I can help you pick the test worth running first.",
    button: "Book a 20-min GTM Audit",
  },
  internalLinks: [
    { href: "/saas-marketing-plan", label: "SaaS marketing plan" },
    { href: "/b2b-saas-marketing-strategy", label: "B2B SaaS marketing strategy" },
    { href: "/landing-page-for-saas", label: "SaaS landing page optimization" },
  ],
  relatedPosts: [
    {
      label: "Original Research",
      title: "SaaS Homepage Study: 54 Homepages, 2015–2026",
      description:
        "542 archived captures of 54 SaaS homepages: AI language, CTA counts and headline length measured year by year.",
      href: "/blog/saas-homepage-study",
    },
    {
      label: "SaaS CRO",
      title: "AI Conversion Rate Optimization for SaaS: Fix First",
      description: "What SaaS teams should fix before adding AI personalization, chatbots, or funnel tools.",
      href: "/blog/ai-conversion-rate-optimization-saas",
    },
  ],
};
