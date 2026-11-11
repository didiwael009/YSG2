import type { BlogPost } from "../types";

export const aiBlogWritingSkillsBenchmark: BlogPost = {
  slug: "ai-blog-writing-skills-benchmark",
  path: "/blog/ai-blog-writing-skills-benchmark",
  layout: "teardown",
  category: "Original Research",
  breadcrumbTitle: "AI Blog Writing Skills Benchmark",
  title: "I Tested 25 AI Blog Writing Skills: No Clear Winner",
  h1: "I tested 25 AI blog writing skills. The judges could not separate the best ones.",
  metaTitle: "I Tested 25 AI Blog Writing Skills: No Clear Winner",
  description:
    "25 Claude skills, skill chains and Custom GPTs wrote the same blog article, scored blind by AI judges. Most gaps sit below judge noise.",
  searchIntent:
    "Marketers and SaaS founders who write blog content with Claude or ChatGPT and want to know which AI blog writing skill or Custom GPT writes the best article, and how much the choice of skill really matters.",
  excerpt:
    "I gave 25 AI blog writing tools (Claude skills, chains of skills and Custom GPTs) the same folder of facts and asked each for the same article. Two AI judges scored the results blind over four rounds. One method came out on top more often, but the gaps between the leaders are smaller than the noise in the judging.",
  author: "Wael Aouididi",
  authorBio:
    "SaaS Growth Marketer and fractional growth lead. I help B2B SaaS teams fix positioning, landing pages, outreach, and conversion before they scale traffic.",
  datePublished: "2026-11-11",
  dateModified: "2026-11-11",
  schemaType: "Article",
  schemaHeadline:
    "I tested 25 AI blog writing skills. The judges could not separate the best ones.",
  schemaDescription:
    "A blind benchmark of 25 Claude skills, skill chains and Custom GPTs writing the same blog article, over four rounds with a no-skill control and three articles per finalist.",
  schemaDatePublished: "2026-11-11",
  schemaDateModified: "2026-11-11",
  schemaIncludeGlobal: false,
  schemaBreadcrumbs: [
    { name: "Blog", path: "/blog" },
    {
      name: "AI Blog Writing Skills Benchmark",
      path: "/blog/ai-blog-writing-skills-benchmark",
    },
  ],
  readTime: "9 min read",
  ogImage: "/ai-blog-writing-skills-benchmark.webp",
  featuredImage: "/ai-blog-writing-skills-benchmark.webp",
  featuredImageAlt:
    "Dot chart of the final: Corey Haines copywriting scores 8.04, 7.61 and 7.36 (mean 7.67), Blog Prose 7.46, 7.46 and 7.25 (mean 7.39), against the blog-prose-1 anchor at 8.43.",
  primaryKeyword: "ai blog writing",
  secondaryKeywords: [
    "claude skills blog writing",
    "ai blog writing tools",
    "custom gpt blog writer",
    "ai humanizer blog",
    "best ai article writer",
  ],
  toc: [
    { label: "What every tool had to write", id: "brief" },
    { label: "How the judging worked", id: "judging" },
    { label: "Counting the 25 tools", id: "tools" },
    { label: "Round 1", id: "round-1" },
    { label: "Round 2", id: "round-2" },
    { label: "Humanizer and anti-AI passes", id: "humanizer" },
    { label: "Round 3", id: "round-3" },
    { label: "The final", id: "final" },
    { label: "blog-prose-1 is an outlier", id: "outlier" },
    { label: "What I would do this week", id: "this-week" },
    { label: "What this cannot tell you", id: "limits" },
    { label: "Sources and tools tested", id: "sources" },
  ],
  blocks: [
    {
      type: "callout",
      label: "Key takeaways",
      items: [
        "Across 25 tools and four rounds, no fresh article beat the first article written with Blog Prose, a skill with one GitHub star (mine).",
        "Most gaps between the top tools were 0.1 to 0.3 points out of 10, below the roughly 0.5 point the judges move on their own.",
        "Adding a humanizer or anti-AI rewrite after a good draft lowered the score or left it unchanged, with one exception.",
        "<mark>The final, Corey Haines copywriting (7.67) against Blog Prose (7.39) over three new articles each, has no clear winner.</mark>",
      ],
    },
    {
      type: "paragraphs",
      paragraphs: [
        "Between 6 and 11 November 2026, I gave 25 AI writing tools the same job: write one blog article from the same folder of facts. Claude skills from GitHub, chains of two or three skills, and two Custom GPTs. Two AI judges scored the results without knowing who wrote what.",
        "I wanted to know whether the skill you load before asking Claude for an article changes the article enough to matter. This is the companion to my [benchmark of AI video script skills](/blog/ai-video-script-skills-benchmark), and the short answer is similar: one method came out on top more often than the others, but the differences between the leaders are smaller than the noise in the judging.",
      ],
    },
    {
      type: "section",
      id: "brief",
      label: "Method",
      title: "What every tool had to write",
      paragraphs: [
        "Every tool got the same brief and the same dossier. The task was a detailed French blog article, in Markdown, for marketers curious about AI, explaining my video script benchmark: the comparison, the protocol, the final results, how they differed from the first ranking, the role of luck, the errors, the limits and what to do with it. The brief asked for clickable sources, the images from the dossier where they helped, and every number traceable to the dossier. Tools could not look up the published version.",
        "So each tool wrote about the same benchmark, from the same raw material. Whatever changed between articles came from the method, or from chance.",
        "For the Claude entries, the writer was always Opus 5.5. Each trial ran in one session with the skill's instructions pasted in as text and tools turned off. That means I tested each skill's method, not its installation or its web research. The two Custom GPTs ran in a fresh ChatGPT chat with the full dossier. As a control, I ran Opus 5.5 with the dossier and no skill at all. I call that the control below.",
      ],
    },
    {
      type: "section",
      id: "judging",
      label: "Judging",
      title: "How the judging worked",
      paragraphs: [
        "The judges scored each article from 0 to 10 on seven criteria with equal weight:",
      ],
    },
    {
      type: "data-table",
      columns: ["Criterion", "What the judge checks"],
      rows: [
        ["Clarity", "The topic, the two phases and the results make sense on a first read"],
        ["Accuracy", "Numbers, quotes, attribution and limits match the dossier"],
        ["Hook", "Title and opening give a precise reason to keep reading"],
        ["Progression", "Sections answer each other, tables and images serve the argument"],
        ["Natural French", "Rhythm, precise wording, a credible voice"],
        ["Stakes", "The article explains the decisions the results allow"],
        ["Ending", "A concrete, proportionate consequence or next step"],
      ],
    },
    {
      type: "paragraphs",
      paragraphs: [
        "One rule matters more than the others. If an article states something that contradicts the dossier, or presents as established a fact the dossier does not support, the judge must quote the sentence and cap accuracy at 3. One wrong number costs far more than a weak hook.",
        "The judges never saw the author. Each judge family read the same articles in two fresh sessions, in a different order each time, and an article's score is the average of those passes. In round 1 the two families were Fable 5.1 and GPT. From round 2 on, they were Fable 5.1 and Opus 5.5.",
      ],
    },
    {
      type: "section",
      id: "tools",
      label: "The field",
      title: "Counting the 25 tools",
      paragraphs: [
        "I count a tool as anything a reader could pick and use: a single skill, a fixed chain of skills, or a Custom GPT. I do not count the Opus control or a reference article Codex wrote in round 1, since neither is a tool you would install.",
      ],
    },
    {
      type: "data-table",
      columns: ["Round", "New tools tested", "Detail"],
      align: [1],
      rows: [
        ["Round 1", "6", "2 skills, 2 chains, 2 Custom GPTs"],
        ["Round 2 (7 Nov)", "8", "5 skills, 3 chains (Blog Prose came back as a reference)"],
        ["Round 3 (11 Nov)", "11", "11 skills from a new inventory"],
        ["Total", "25", "18 single skills, 5 chains, 2 Custom GPTs"],
      ],
    },
    {
      type: "paragraphs",
      paragraphs: [
        "Two of the round 3 entries, stop-slop and ce-noslop, did not write from scratch. They are editing skills, so I had them revise the best existing article (blog-prose-1) instead.",
      ],
    },
    {
      type: "section",
      id: "round-1",
      label: "Round 1",
      title: "Round 1: Blog Prose takes the lead by less than the noise",
      paragraphs: [
        "In the first selection, one article per tool, the top tool article was blog-prose-1 at 8.36. Only the Codex reference article scored higher, at 8.39. The editorial chain (Content Research Writer, then Blog Prose, then Avoid AI Writing) came next at 8.18. The two Custom GPTs finished at 7.25 and 6.71.",
        "The two best methods then went to a final with three new articles each, next to three new articles from the control.",
      ],
    },
    {
      type: "data-table",
      columns: ["Method", "Average", "Article 1", "Article 2", "Article 3", "Spread"],
      align: [1, 2, 3, 4, 5],
      rows: [
        ["Blog Prose", "7.74", "6.96", "8.21", "8.04", "1.25"],
        ["Editorial chain", "7.63", "7.89", "7.57", "7.43", "0.46"],
        ["Opus alone (control)", "7.55", "7.43", "7.54", "7.68", "0.25"],
      ],
    },
    {
      type: "paragraphs",
      paragraphs: [
        "Blog Prose won by 0.11 over the chain and 0.19 over the control. In the same final, the same article judged twice by the same family moved by 0.37 points on average, and the two judge families disagreed by 0.55 points on average. <mark>A lead of 0.11 does not survive that.</mark> Blog Prose also had the widest spread of the three: its worst article was the lowest score in the final.",
        'Every one of the nine final articles had at least one factual error flagged by at least one judge. With a stricter threshold, at least two evaluations flagging the same article, Blog Prose had errors in 2 of 3 articles and the other two methods in 3 of 3. A typical confirmed error: one article from the chain said the batch contained "four skills alone" when the protocol had three.',
      ],
    },
    {
      type: "section",
      id: "round-2",
      label: "Round 2",
      title: "Round 2: a chain wins, and humanizer passes cost points",
      paragraphs: [
        "Round 2 ran through the Anthropic API with GitHub skills only, no Custom GPTs. In the selection (one article each), LangChain's deepagents blog-post skill scored highest at 8.71. Behind it, three entries tied at 8.46: technical-blog-writing, a chain of blog-writing-specialist then avoid-ai-writing, and one of the control's three runs.",
        "That tie is the useful part. The control, the same model with no skill, scored 7.54, 8.07 and 8.46 across its three runs. A single draw from plain Opus tied the second-best skill.",
        "The four best went to a final with three articles each:",
      ],
    },
    {
      type: "data-table",
      columns: ["Rank", "Tool", "Average", "Three articles", "Spread", "Articles with an error"],
      align: [0, 2, 4, 5],
      rows: [
        ["1", "blog-writing-specialist, then avoid-ai-writing", "8.18", "8.00 / 8.14 / 8.39", "0.39", "0 of 3"],
        ["2", "deepagents blog-post", "8.05", "7.71 / 7.75 / 8.68", "0.97", "2 of 3"],
        ["3", "technical-blog-writing", "7.74", "7.39 / 7.39 / 8.43", "1.04", "2 of 3"],
        ["4", "Opus alone (control)", "7.68", "7.18 / 7.54 / 8.32", "1.14", "2 of 3"],
      ],
    },
    {
      type: "paragraphs",
      paragraphs: [
        "Here, an article counts as having an error when at least two passes flagged one. The chain was the only entry that was both consistent and error-free. Its lead over deepagents was 0.13, under the judge noise. All three tools beat the control on average, by 0.06 to 0.50 points.",
        "deepagents repeated something I saw with the video scripts: first on a single article, second over three. Its best article and its worst were almost a point apart.",
      ],
    },
    {
      type: "section",
      id: "humanizer",
      label: "Humanizers",
      title: "What the humanizer and anti-AI passes did",
      paragraphs: [
        'A common habit is to write a draft with one tool, then run it through a "humanizer" to strip AI tells. I tested that directly, and on these data it mostly did not help.',
      ],
    },
    {
      type: "list",
      items: [
        "In round 2, adding humanizer after technical-blog-writing lowered the score by 0.53. Adding it after Blog Prose lowered it by 0.61. Blog Prose plus humanizer finished 11th of 12, with errors flagged in all four passes.",
        "In round 3, stop-slop and ce-noslop revised blog-prose-1. The revisions scored 8.29 and 8.21, against 8.32 for the original in the same batch. They broke nothing and added nothing.",
      ],
    },
    {
      type: "paragraphs",
      paragraphs: [
        "There is one exception. The round 2 winner ends with avoid-ai-writing, and in the selection that chain scored 8.46 against 7.89 for blog-writing-specialist alone. My guess is that an anti-AI pass helps a weaker draft and hurts a strong one, but I only have one case on each side, so treat that as a hypothesis.",
      ],
    },
    {
      type: "section",
      id: "round-3",
      label: "Round 3",
      title: "Round 3: eleven new skills, none above Blog Prose",
      paragraphs: [
        "On 11 November I built an inventory of blog writing skills on GitHub and ran 11 I had not tested. The writer was again Opus 5.5 with the skill pasted as text. To keep the scores comparable, I mixed the new articles with older ones I had already scored (I call these anchors), and judged them in two batches of 12.",
      ],
    },
    {
      type: "data-table",
      columns: ["Article", "Batch 1", "Batch 2"],
      align: [1, 2],
      rows: [
        ["blog-prose-1 (anchor)", "8.54", "8.32"],
        ["Editorial chain article (anchor)", "8.57", "8.07"],
        ["Opus alone article (anchor)", "8.11", "8.29"],
        ["rezvani content-production", "8.29", "7.64"],
        ["Corey Haines copywriting", "7.96", "7.89"],
        ["Sentry blog-writing-guide", "7.71", ""],
        ["Anthropic content-creation", "7.54", ""],
        ["aaron content-writer", "7.50", ""],
        ["ECC article-writing", "7.43", ""],
        ["stop-slop (revision of blog-prose-1)", "", "8.29"],
        ["ce-noslop (revision of blog-prose-1)", "", "8.21"],
        ["Rich Tabor technical-writing", "", "7.75"],
        ["Yaroslavle seo-content-writer", "", "7.64"],
        ["ghostwriter (Linktree)", "", "7.14"],
      ],
    },
    {
      type: "paragraphs",
      paragraphs: [
        "No new skill scored above blog-prose-1. The most stable newcomer was Corey Haines's copywriting skill, at 7.96 and 7.89, but it stayed below the Opus control article in both batches.",
        "The anchors also show how much the batch itself moves a score. rezvani content-production went from 8.29 to 7.64. One of the Blog Prose final articles went from 8.50 to 7.68. Same text, same grid, different neighbours. <mark>On this evidence, one judging session cannot separate two tools that are less than about half a point apart.</mark>",
      ],
    },
    {
      type: "section",
      id: "final",
      label: "Final",
      title: "The final: Corey Haines against Blog Prose",
      paragraphs: [
        "Corey Haines's skill and Blog Prose each wrote three new articles, this time with Opus subagents in Claude Code rather than the API. I judged them blind next to two anchors: four passes (Fable twice, Opus twice), four different orders.",
      ],
    },
    {
      type: "data-table",
      columns: ["Rank", "Article", "Average", "Fable", "Opus", "Errors per pass"],
      align: [0, 2, 3, 4, 5],
      rows: [
        ["1", "blog-prose-1 (anchor)", "8.43", "8.43", "8.43", "0.0"],
        ["2", "Corey Haines, article 3", "8.04", "7.79", "8.29", "0.0"],
        ["3", "Opus alone (anchor)", "7.82", "7.50", "8.14", "0.0"],
        ["4", "Corey Haines, article 1", "7.61", "7.29", "7.93", "0.8"],
        ["5", "Blog Prose, article 3", "7.46", "7.71", "7.21", "0.8"],
        ["6", "Blog Prose, article 2", "7.46", "7.57", "7.36", "1.2"],
        ["7", "Corey Haines, article 2", "7.36", "7.29", "7.43", "1.2"],
        ["8", "Blog Prose, article 1", "7.25", "7.21", "7.29", "1.0"],
      ],
    },
    {
      type: "paragraphs",
      paragraphs: [
        "Over its three new articles, Corey Haines averaged 7.67, with 0.68 points between its best and worst. Blog Prose averaged 7.39, with a spread of 0.21. Corey's articles had 0.67 flagged errors each on average, Blog Prose's 1.0.",
        "The gap is 0.28 points, below the roughly 0.5 points the judges move on their own. I do not call that a win. Corey Haines wrote the best new article, and Blog Prose was more consistent. <mark>Neither method's average beat the Opus control anchor.</mark>",
      ],
    },
    {
      type: "section",
      id: "outlier",
      label: "The outlier",
      title: "blog-prose-1 is an outlier, not the method's average",
      paragraphs: [
        "The most stable result in the whole benchmark is a single article. blog-prose-1 was written once, with Blog Prose, in round 1. On 11 November it went through three separate judging sessions: second by 0.03 points in batch 1, then first in batch 2 and first in the final, with no factual error flagged in any pass.",
        "The earlier rounds are less clean. Round 1 judges did flag an error in it, and the Blog Prose entry carried into round 2 as a reference finished fifth there, with errors in 2 of 4 passes. And none of the six new articles in the final reached it: the Blog Prose articles written for the final scored 7.25 to 7.46.",
        "So the method that produced the best article does not reliably produce articles that good. That is the same lesson as the [video benchmark](/blog/ai-video-script-skills-benchmark): the draw matters as much as the tool.",
        "It is also worth knowing where Blog Prose comes from. When I read the GitHub API on 11 November, [sjmoran/claude-blog-prose](https://github.com/sjmoran/claude-blog-prose) had one star, and it is mine. Corey Haines's [marketingskills](https://github.com/coreyhaines31/marketingskills) repository had 59,710, and Anthropic's knowledge-work-plugins had 35,437. Popularity told me nothing about how the skills would score here.",
      ],
    },
    {
      type: "section",
      id: "this-week",
      label: "What I would do",
      title: "What I would do this week",
      paragraphs: [
        "If you write blog content with Claude, these are the changes I would make based on this benchmark:",
      ],
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Paste one method skill into your prompt, then stop adding layers. Blog Prose and Corey Haines's copywriting skill reached the last final. Neither beat the plain Opus anchor on average there, so expect a modest effect, not a transformation.",
        "Generate three drafts and keep the best one. The spread between three runs of the same method reached 1.25 points, wider than the gap between most tools. I did not test best-of-three as a method, but the spreads suggest it is a cheaper lever than switching skills.",
        "Skip the humanizer on a draft you already like. In four of the five tests here, a humanizer or anti-AI pass on a finished draft lowered the score or changed nothing.",
        "Check every number against your source before publishing. In round 1, every final article had at least one error flagged. Errors were the costliest defect in the grid, and no skill removed them reliably.",
      ],
    },
    {
      type: "paragraphs",
      paragraphs: [
        "If you run your own comparison, judge each article at least twice, with two different models, in a shuffled order. One pass misranked the same text by up to 0.82 points here.",
      ],
    },
    {
      type: "section",
      id: "limits",
      label: "Limits",
      title: "What this benchmark cannot tell you",
      paragraphs: [],
    },
    {
      type: "list",
      items: [
        "One dossier, one topic. Every article was about the same benchmark, from the same folder. A skill built for SEO articles or product launches may do better on its home ground.",
        "French output, English skills. All the skills in the inventory are written in English, with no language instructions. I measured how their methods carry into French.",
        "Methods, not installations. Skills were pasted as text with tools off. Skills that rely on web research, image generation or a voice profile ran without those features.",
        "AI judges only. No human scored these articles. The judges also inherit the dossier's own mistakes. My own French article about the video benchmark scored 3.00 on accuracy, mostly because one line in the dossier gave a wrong cost range that the judges trusted over the real outputs.",
        "Small samples. The finals used three articles per method. The Custom GPTs ran in round 1 only, without cost or timing data.",
      ],
    },
    {
      type: "paragraphs",
      paragraphs: [
        "Running it cost little. Round 2 came to about $22 (writing $8.89, judging $13.26), round 3 to $16.98 (writing $4.92, judging $12.06).",
      ],
    },
    {
      type: "section",
      id: "sources",
      label: "Sources",
      title: "Sources and tools tested",
      paragraphs: [
        "Skills named in this article, with the repository I took each method from:",
      ],
    },
    {
      type: "list",
      items: [
        "Blog Prose: [sjmoran/claude-blog-prose](https://github.com/sjmoran/claude-blog-prose)",
        "Copywriting (Corey Haines): [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills)",
        "blog-write: [AgriciDaniel/claude-blog](https://github.com/AgriciDaniel/claude-blog)",
        "Content Research Writer: [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills)",
        "Avoid AI Writing: [conorbronsdon/avoid-ai-writing](https://github.com/conorbronsdon/avoid-ai-writing)",
        "Fact Check Workflow: [jamditis/claude-skills-journalism](https://github.com/jamditis/claude-skills-journalism)",
        "blog-post (deepagents): [langchain-ai/deepagents](https://github.com/langchain-ai/deepagents)",
        "technical-blog-writing: [inference-sh/skills](https://github.com/inference-sh/skills)",
        "humanizer: [blader/humanizer](https://github.com/blader/humanizer)",
        "blog-writing-specialist: [manojbajaj95/claude-gtm-plugin](https://github.com/manojbajaj95/claude-gtm-plugin)",
        "blog-post-writer: [nicknisi/claude-plugins](https://github.com/nicknisi/claude-plugins)",
        "content-production: [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills)",
        "blog-writing-guide (Sentry): [getsentry/skills](https://github.com/getsentry/skills)",
        "content-creation (Anthropic): [anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins)",
        "article-writing (ECC): [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code)",
        "content-writer (aaron): [aaron-he-zhu/aaron-marketing-skills](https://github.com/aaron-he-zhu/aaron-marketing-skills)",
        "seo-content-writer (Yaroslavle): [Yaroslavle/seo-content-writer-claude-skill](https://github.com/Yaroslavle/seo-content-writer-claude-skill)",
        "stop-slop: [hardikpandya/stop-slop](https://github.com/hardikpandya/stop-slop)",
        "ce-noslop (Every): [EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin)",
        "technical-writing (Rich Tabor): [richtabor/agent-skills](https://github.com/richtabor/agent-skills)",
        "ghostwriter (Linktree): [mblode/agent-skills](https://github.com/mblode/agent-skills)",
        "Custom GPTs: [News Articles to Blog Writer](https://chatgpt.com/g/g-2eXEhvmBt-news-articles-to-blog-writer) and [Super rédacteur d'article](https://chatgpt.com/g/g-561Oil5Yg-super-redacteur-d-article)",
      ],
    },
    {
      type: "paragraphs",
      paragraphs: [
        "Star counts come from the GitHub API on 11 November 2026 and measure the whole repository, not the writing skill alone.",
        "The next thing I want to run is the same final with a human panel scoring alongside the AI judges, to see whether people rank blog-prose-1 first too.",
        "Wael Aouididi, yoursaasgrowth",
      ],
    },
  ],
  cta: {
    title: "Want an AI content workflow that holds up?",
    body: "If you are building blog or video production with AI, I can help you set up the tools, the checks and the tests worth running first.",
    button: "Book a 20-min GTM Audit",
  },
  internalLinks: [
    {
      href: "/blog/ai-video-script-skills-benchmark",
      label: "AI video script skills benchmark",
    },
    { href: "/saas-marketing-plan", label: "SaaS marketing plan" },
    {
      href: "/b2b-saas-marketing-strategy",
      label: "B2B SaaS marketing strategy",
    },
  ],
  relatedPosts: [
    {
      label: "Original Research",
      title: "I tested 15 AI video script skills. Luck mostly wins.",
      description:
        "15 Claude skills and Custom GPTs wrote the same Reel voice-over, scored blind by two AI judges. The best tool exists, but reruns matter more.",
      href: "/blog/ai-video-script-skills-benchmark",
    },
    {
      label: "Original Research",
      title: "AI Animation Styles Benchmark: 20 Video Tests Side by Side",
      description:
        "20 short test videos, each made with a different AI animation skill on the same 15-second voice. Watch them, filter by family and star the styles to keep.",
      href: "/blog/ai-animation-styles-benchmark",
    },
  ],
};
