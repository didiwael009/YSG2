export type BlogFaq = {
  question: string;
  answer: string;
};

export type BlogComparisonRow = {
  element: string;
  google: string;
  meta: string;
};

export type BlogCard = {
  title: string;
  body: string;
};

export type BlogSection =
  | {
      id: string;
      title: string;
      intro?: string[];
      type: "split";
      cards: BlogCard[];
    }
  | {
      id: string;
      title: string;
      intro?: string[];
      type: "cards";
      cards: BlogCard[];
    }
  | {
      id: string;
      title: string;
      intro?: string[];
      type: "example";
      cards: BlogCard[];
    }
  | {
      id: string;
      title: string;
      intro?: string[];
      type: "table";
      rows: BlogComparisonRow[];
    }
  | {
      id: string;
      title: string;
      intro?: string[];
      type: "takeaway";
      checklist: string[];
    };

export type BlogPost = {
  slug: string;
  path: string;
  category: string;
  title: string;
  metaTitle: string;
  description: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  readTime: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  heroNote: {
    label: string;
    body: string;
  };
  intro: string[];
  thesis: string;
  toc: { label: string; id: string }[];
  sections: BlogSection[];
  faq: BlogFaq[];
  source: {
    label: string;
    url: string;
    body: string;
  };
  cta: {
    title: string;
    body: string;
    button: string;
  };
};

export const blogPosts: BlogPost[] = [
  {
    slug: "saas-landing-page-google-meta-ads",
    path: "/blog/saas-landing-page-google-meta-ads",
    category: "Paid Ads Strategy",
    title: "Stop Sending Google Ads and Meta Ads Traffic to the Same SaaS Landing Page",
    metaTitle: "Stop Sending Ads to One SaaS Landing Page",
    description:
      "Learn why one SaaS landing page fails across Google and Meta Ads, and how to match each page to visitor intent.",
    excerpt:
      "Google Ads captures demand. Meta Ads creates demand. Your SaaS landing page should match the visitor's intent instead of forcing both channels into one generic page.",
    author: "Wael Aouididi",
    publishedAt: "2026-04-27",
    readTime: "11 min read",
    primaryKeyword: "SaaS landing page",
    secondaryKeywords: [
      "Google Ads landing page",
      "Meta Ads landing page",
      "conversion optimization",
      "SaaS growth",
      "paid ads strategy",
    ],
    heroNote: {
      label: "Core principle",
      body: "Build trust before traffic. Traffic sent to a broken foundation is burned budget.",
    },
    intro: [
      "A SaaS founder launches Google Ads and Meta Ads, then sends both campaigns to the same SaaS landing page.",
      "Google converts better. Meta looks weak. The founder blames the platform.",
      "But often, the real problem is not the channel. It is message mismatch.",
      "Google and Meta visitors do not arrive with the same mindset. They did not come from the same moment. They are not asking the same question.",
    ],
    thesis:
      "For SaaS founders, the landing page is not just a destination. It is where paid traffic either turns into pipeline or disappears.",
    toc: [
      {
        label: "Google Ads Captures Demand. Meta Ads Creates Demand.",
        id: "google-ads-captures-demand-meta-ads-creates-demand",
      },
      {
        label: "Why One SaaS Landing Page Fails Across Google and Meta",
        id: "why-one-saas-landing-page-fails-across-google-and-meta",
      },
      {
        label: "What a Google Ads Landing Page Should Do for SaaS",
        id: "what-a-google-ads-landing-page-should-do-for-saas",
      },
      {
        label: "What a Meta Ads Landing Page Should Do for SaaS",
        id: "what-a-meta-ads-landing-page-should-do-for-saas",
      },
      {
        label: "SaaS Example: CRM for Small Sales Teams",
        id: "saas-example-crm-for-small-sales-teams",
      },
      {
        label: "Google Ads Landing Page vs Meta Ads Landing Page",
        id: "google-ads-landing-page-vs-meta-ads-landing-page",
      },
      { label: "Founder Takeaway", id: "founder-takeaway" },
      { label: "FAQ", id: "faq" },
    ],
    sections: [
      {
        id: "google-ads-captures-demand-meta-ads-creates-demand",
        title: "Google Ads Captures Demand. Meta Ads Creates Demand.",
        type: "split",
        intro: [
          "A good SaaS landing page starts with understanding intent.",
          "Google Ads and Meta Ads are not just different platforms. They are different moments in the buyer journey.",
        ],
        cards: [
          {
            title: "Google Ads = demand capture",
            body:
              "Someone searches for best CRM for small sales teams, AI meeting notes software, logistics management software, or project management tool for agencies. They already know they have a problem. Your Google Ads landing page should confirm they are in the right place and make the next step easy.",
          },
          {
            title: "Meta Ads = demand creation",
            body:
              "Someone is scrolling, watching short videos, checking updates, or avoiding work for five minutes. Then your ad appears. Your Meta Ads landing page should create context, build trust, and make the problem feel worth solving.",
          },
        ],
      },
      {
        id: "why-one-saas-landing-page-fails-across-google-and-meta",
        title: "Why One SaaS Landing Page Fails Across Google and Meta",
        type: "split",
        intro: [
          "One landing page cannot serve two different levels of intent equally well.",
          "A Google visitor wants speed. A Meta visitor needs context. When you send both users to the same SaaS landing page, one side usually suffers.",
        ],
        cards: [
          {
            title: "Google visitors want confirmation",
            body:
              "They are thinking: Is this what I searched for? Can this solve my problem? Can I see proof? What do I do next?",
          },
          {
            title: "Meta visitors need context",
            body:
              "They are thinking: Why am I here? Is this relevant to me? What problem is this solving? Why should I trust this company? Is this worth my time?",
          },
        ],
      },
      {
        id: "what-a-google-ads-landing-page-should-do-for-saas",
        title: "What a Google Ads Landing Page Should Do for SaaS",
        type: "cards",
        intro: [
          "A strong Google Ads landing page should be clear, fast, and tightly matched to the search query.",
          "The visitor has intent. Do not make them work too hard.",
        ],
        cards: [
          {
            title: "Use a keyword-matched headline",
            body:
              "If someone searches for CRM software for small teams, your headline should feel close to that phrase. Not clever. Not abstract. Clear.",
          },
          {
            title: "Show the value proposition quickly",
            body:
              "Within the first screen, explain who the product is for, what problem it solves, why it is different, and what the user should do next.",
          },
          {
            title: "Keep the page short",
            body:
              "Google traffic usually does not need a full education journey. Help a ready buyer take the next step.",
          },
          {
            title: "Put trust signals above the fold",
            body:
              "Customer logos, a short testimonial, a review rating, a security note, or a relevant case study result can reduce doubt before the visitor scrolls.",
          },
          {
            title: "Make the CTA visible fast",
            body:
              "For high-intent traffic, the user should not need to scroll for 30 seconds to book a demo or start a trial.",
          },
          {
            title: "Remove unnecessary navigation",
            body:
              "Paid traffic needs focus. Full navigation, blog links, social icons, footer distractions, and five CTAs create leaks.",
          },
          {
            title: "Prioritize fast loading speed",
            body:
              "Slow pages kill paid ads strategy. Speed is part of trust, especially when CPCs are high.",
          },
        ],
      },
      {
        id: "what-a-meta-ads-landing-page-should-do-for-saas",
        title: "What a Meta Ads Landing Page Should Do for SaaS",
        type: "cards",
        intro: [
          "A Meta Ads landing page needs more patience.",
          "This visitor did not search for you. Your page must continue the conversation started by the ad.",
        ],
        cards: [
          {
            title: "Keep visual continuity from ad to page",
            body:
              "If your ad uses a specific message, creative, pain point, or visual style, the landing page should continue it.",
          },
          {
            title: "Educate the visitor on the problem",
            body:
              "Meta traffic often needs problem awareness. Before selling the product, explain the pain clearly.",
          },
          {
            title: "Use more storytelling",
            body:
              "Explain the old way, why it breaks, what changes with your product, what the better workflow looks like, and how teams use it in real life.",
          },
          {
            title: "Add more social proof",
            body:
              "Cold traffic needs specific proof: testimonials, screenshots, short customer stories, founder credibility, before-and-after workflows, and use cases.",
          },
          {
            title: "Handle objections",
            body:
              "Answer doubts about setup, team adoption, company size, trials, and implementation before the sales call.",
          },
          {
            title: "Use a softer CTA",
            body:
              "A smaller first step like See the Workflow, Watch the Demo, or Get the Free Checklist can create a better path to pipeline for colder visitors.",
          },
        ],
      },
      {
        id: "saas-example-crm-for-small-sales-teams",
        title: "SaaS Example: CRM for Small Sales Teams",
        type: "example",
        intro: [
          "Let us say a B2B SaaS company sells a CRM for small sales teams.",
          "The offer is the same. The landing page should not be.",
        ],
        cards: [
          {
            title: "Google Ads page",
            body:
              "Search: CRM for small sales team. The headline can be Simple CRM Software for Small Sales Teams. The page should quickly show pipeline management, follow-up reminders, email tracking, easy setup, pricing or demo CTA, and customer proof from small teams.",
          },
          {
            title: "Meta Ads page",
            body:
              "Ad: Your team is losing deals because follow-ups live in five different places. The headline can be Stop Losing Deals Because Your Sales Process Is Scattered. The page should explain the pain, the better workflow, and why it is worth changing.",
          },
        ],
      },
      {
        id: "google-ads-landing-page-vs-meta-ads-landing-page",
        title: "Google Ads Landing Page vs Meta Ads Landing Page",
        type: "table",
        rows: [
          { element: "Visitor mindset", google: "Searching for a solution", meta: "Interrupted while scrolling" },
          { element: "Main job", google: "Confirm intent quickly", meta: "Create interest and trust" },
          { element: "Headline", google: "Keyword-matched", meta: "Problem or story-driven" },
          { element: "Page length", google: "Shorter and direct", meta: "Longer and educational" },
          { element: "CTA", google: "Direct demo or trial", meta: "Softer CTA or staged action" },
          { element: "Social proof", google: "Above the fold", meta: "Repeated throughout page" },
          { element: "Form placement", google: "Visible early", meta: "After education or proof" },
          { element: "Content style", google: "Clear, concise, comparison-ready", meta: "Contextual, narrative, trust-building" },
        ],
      },
      {
        id: "founder-takeaway",
        title: "Founder Takeaway",
        type: "takeaway",
        intro: [
          "The goal is not to choose Google Ads or Meta Ads. The goal is to design the post-click experience around intent.",
          "A good paid ads strategy does not end at the click. The click is only the handoff. Your landing page has to finish the job.",
          "Before you increase ad spend, audit the page you are sending traffic to. If the message is unclear, more traffic will only make the leak more expensive.",
        ],
        checklist: [
          "Is the headline clear?",
          "Does the page match the visitor's intent?",
          "Is the CTA easy to find?",
          "Is there enough proof to build trust?",
          "Does the page load fast?",
          "Are you asking cold visitors to convert too soon?",
        ],
      },
    ],
    faq: [
      {
        question: "Should SaaS companies use different landing pages for Google Ads and Meta Ads?",
        answer:
          "Yes. In most cases, Google Ads and Meta Ads should use different landing pages because the visitor intent is different. Google visitors are actively searching. Meta visitors usually need more education and trust before they convert.",
      },
      {
        question: "What makes a good SaaS landing page?",
        answer:
          "A good SaaS landing page has a clear headline, strong value proposition, relevant proof, simple CTA, fast load speed, and messaging that matches the traffic source.",
      },
      {
        question: "Is Meta Ads good for B2B SaaS?",
        answer:
          "Meta Ads can work for B2B SaaS when the offer, creative, and landing page are built for demand creation. It usually works better with education, proof, and softer CTAs than with a direct demo ask only.",
      },
      {
        question: "What is the biggest SaaS landing page mistake?",
        answer:
          "The biggest mistake is sending every traffic source to the same generic page. Different channels bring different levels of awareness, so the landing page should match the visitor's mindset.",
      },
      {
        question: "What should a Google Ads landing page include for SaaS?",
        answer:
          "A Google Ads landing page for SaaS should include a keyword-matched headline, clear value proposition, trust signals, fast-loading design, limited navigation, and a visible CTA or form.",
      },
      {
        question: "What should a Meta Ads landing page include for SaaS?",
        answer:
          "A Meta Ads landing page for SaaS should include visual continuity from the ad, problem education, storytelling, social proof, objection handling, and a softer CTA for colder visitors.",
      },
    ],
    source: {
      label: "Google Quality Score documentation",
      url: "https://support.google.com/google-ads/answer/6167118",
      body:
        "Google explains that Quality Score for Search campaigns includes expected clickthrough rate, ad relevance, and landing page experience. Landing page experience looks at how relevant and useful the page is to people who click the ad.",
    },
    cta: {
      title: "Audit your landing page before increasing ad spend.",
      body:
        "If the message is unclear, more traffic will only make the leak more expensive.",
      button: "Book a 20-min Landing Page Audit",
    },
  },
];

export const getBlogPostBySlug = (slug: string) =>
  blogPosts.find((post) => post.slug === slug);

export const getBlogPostByPath = (path: string) =>
  blogPosts.find((post) => post.path === path);
