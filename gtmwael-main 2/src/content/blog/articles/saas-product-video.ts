import type { BlogPost } from "../types";

export const saasProductVideo: BlogPost = {
  slug: "saas-product-video",
  path: "/blog/saas-product-video",
  category: "Meta Ads for SaaS",
  breadcrumbTitle: "SaaS Product Video",
  title: "SaaS Product Video: Test Before Production",
  h1: "SaaS Product Video: How to Test Your Product Moment Before Production",
  metaTitle: "SaaS Product Video: Test Before Production",
  description:
    "A SaaS product video should prove the product moment before you invest in production. Test the message first, then scale the format.",
  searchIntent:
    "Informational and practical. SaaS founders want to understand how to create and use a SaaS product video to explain the product, test ad angles, and improve landing page conversion.",
  excerpt:
    "Most SaaS product videos fail because the message is wrong, not the production. Validate the product moment before spending on polished video.",
  author: "Wael Aouididi",
  authorBio:
    "SaaS Growth Marketer and fractional growth lead. I help B2B SaaS teams fix positioning, landing pages, outreach, and conversion before they scale traffic.",
  datePublished: "2026-05-18",
  dateModified: "2026-11-13",
  schemaType: "Article",
  schemaHeadline: "SaaS Product Video: How to Test Your Product Moment Before Production",
  schemaDateModified: "2026-11-13",
  schemaIncludeGlobal: false,
  schemaBreadcrumbs: [
    { name: "Blog", path: "/blog" },
    { name: "SaaS Product Video", path: "/blog/saas-product-video" },
  ],
  readTime: "12 min read",
  ogImage: "/saas-product-video-html-demo-obs-workflow.webp",
  featuredImage: "/saas-product-video-html-demo-obs-workflow.webp",
  featuredImageAlt:
    "Split-screen SaaS product demo showing before-and-after states recorded with OBS for ad testing",
  primaryKeyword: "saas product video",
  secondaryKeywords: [
    "saas demo video",
    "saas product demo video",
    "product demo video for saas",
    "saas explainer video",
    "saas video ads",
    "saas product demo",
    "saas landing page video",
  ],
  toc: [
    { label: "Short answer", id: "short-answer" },
    { label: "One before-and-after, not a feature list", id: "what-is-a-saas-product-video" },
    { label: "The message fails, not the production", id: "why-most-saas-product-videos-fail" },
    { label: "Validate first, produce second", id: "validate-first-produce-second" },
    { label: "Step 1: the product moment", id: "define-the-product-moment" },
    { label: "Step 2: the HTML demo", id: "build-a-saas-product-demo" },
    { label: "Step 3: OBS recording", id: "record-the-demo-with-obs" },
    { label: "Step 4: sound and captions", id: "add-sound-and-captions" },
    { label: "Step 5: the UGC hook", id: "add-a-ugc-hook" },
    { label: "Step 6: landing page match", id: "match-video-to-landing-page" },
    { label: "Four signals before polish", id: "measure-saas-product-video" },
    { label: "Message, sequence and placement mistakes", id: "common-saas-product-video-mistakes" },
    { label: "Five-part script", id: "script-framework" },
    { label: "Evidence becomes the brief", id: "when-to-invest-in-production" },
    { label: "What I would do this week", id: "this-week" },
    { label: "FAQ", id: "faq" },
  ],
  blocks: [
    {
      type: "intro",
      id: "short-answer",
      label: "Short answer",
      headline:
        "A SaaS product video should prove one product moment before you spend on polished production.",
      paragraphs: [
        "The strongest SaaS product video is not a feature tour. It shows one before-and-after transformation, matches the [SaaS landing page](/landing-page-for-saas), and gives the buyer a reason to take the next step.",
      ],
    },
    {
      type: "paragraphs",
      lead: true,
      dropcap: true,
      paragraphs: [
        "I built this workflow from running [Meta Ads for SaaS](/meta-ads-for-saas) creative, and from watching what failed in the first creative iteration and what changed in the second. One of those campaigns was for [One Great Book](https://www.onegreatbook.app/), an AI SaaS tool that helps founders write business books.",
        "Most SaaS product videos fail before they hit an audience. Not because the production is bad, but because the message was never tested.",
        "Teams invest in motion design, voiceover, and brand-aligned UI before they know which product moment the market actually responds to.",
        "By the time the video is done, it is built around an assumption. If that assumption is wrong, rebuilding costs as much as the original.",
        "This article explains a different sequence: validate the product moment first using a GPT prompt, a browser, and OBS. If it works, you now have a brief for polished production. If it does not, you spent two minutes instead of two weeks finding out.",
      ],
    },
    {
      type: "callout",
      label: "Key takeaways",
      items: [
        "<mark>A SaaS product video should prove one product moment, a before-and-after a stranger can grasp, before you spend on polished production.</mark>",
        "Most videos fail on the message, not the production: they lead with features, show the wow moment too late, or never match the landing page.",
        "A GPT-built HTML demo recorded in OBS lets you test the product moment in two minutes instead of two weeks.",
        "Read hook rate, hold rate, CTR and landing page message match before you edit the polish. The validated concept then becomes the brief for production.",
      ],
    },
    {
      type: "section",
      id: "what-is-a-saas-product-video",
      label: "Definition",
      title: "A SaaS product video proves one before-and-after, not a feature list",
      paragraphs: [
        "A SaaS product video is a short video that shows your product solving a specific problem. Not a feature tour. Not a brand reel. A specific before-and-after that a cold audience can understand without context.",
        "There are three formats you will encounter in practice:",
        "A demo video shows the product being used. An explainer video names the problem and mechanism. A product demo ad combines the product moment with a hook designed for Meta, Instagram, or YouTube.",
        "All three fail for the same reason: the team builds them before deciding what the video is supposed to prove.",
      ],
    },
    {
      type: "dark-checklist",
      id: "why-most-saas-product-videos-fail",
      label: "Failure pattern",
      title: "Most SaaS product videos fail on the message, not the production",
      paragraphs: [
        "A SaaS team decides they need a product video. They brief a designer or video editor. The brief says: show our product, make it look polished, explain the main features. The video comes back looking clean. It performs poorly. Nobody knows why.",
        "The reason is almost always one of these:",
      ],
      items: [
        {
          title: "The video leads with features, not transformation.",
          body:
            "The viewer sees what the product does, but not what changes for them. On Meta, where no one is looking for your product, that is not enough.",
        },
        {
          title: "The product moment hits too late.",
          body:
            "The hook is weak, the intro is long, and the wow moment arrives at the 20-second mark. Most viewers are gone before that.",
        },
        {
          title: "The video and the landing page do not match.",
          body:
            "The ad promises one transformation. The landing page headline says something different. The visitor clicks and immediately wonders whether they went to the right place.",
        },
        {
          title: "The message was never tested before production.",
          body:
            "The team spent budget producing a concept they believed in, not one the market confirmed.",
        },
      ],
    },
    {
      type: "numbered-list",
      id: "validate-first-produce-second",
      label: "Sequence",
      title: "Validate the product moment first, then pay for production",
      paragraphs: [
        "The correct order is simple. Choose the product moment, build a quick prototype, record it, test it, then invest in polish only after the signal is real.",
        "This costs almost nothing, moves fast, and gives you evidence before you spend on production instead of intuition after production.",
      ],
      items: [
        {
          title: "Choose the product moment",
          body:
            "Define the smallest visible before-and-after your SaaS creates for the buyer.",
        },
        {
          title: "Build a quick prototype in HTML",
          body:
            "Use GPT to create a focused browser demo that shows only the transformation.",
        },
        {
          title: "Record the workflow with OBS",
          body:
            "Capture the browser demo in the format your placement requires.",
        },
        {
          title: "Add a human hook if needed",
          body:
            "Use a direct talking-head clip when the problem needs emotional recognition before the demo.",
        },
        {
          title: "Run it on Meta or place it on the landing page",
          body:
            "Use the video where it can create measurable scroll-stop, click, or conversion behavior.",
        },
        {
          title: "Read the four signals",
          body:
            "Look at hook rate, hold rate, CTR, and landing page message match before editing the polish.",
        },
        {
          title: "Invest in polished production after validation",
          body:
            "Once the product moment works, the evidence becomes the creative brief.",
        },
      ],
    },
    {
      type: "section",
      id: "define-the-product-moment",
      label: "Step 1",
      title: "Step 1: The product moment is a before-and-after a stranger grasps in five seconds",
      paragraphs: [
        "Before you open GPT, answer one question: What is the smallest visible transformation your product creates?",
        "That is the product moment. It is not a feature description. It is a before-and-after that a stranger can grasp in under five seconds.",
        "Feature version: Three summarization modes with multi-document support.",
        "Product moment version: Forty pages of meeting notes become a five-point summary with action items in thirty seconds.",
        "The feature requires the viewer to imagine the result. The product moment makes the result visible. On Meta, visible beats imaginable every time.",
      ],
    },
    {
      type: "visual-break",
      title: "Product moment examples",
      items: [
        {
          title: "Workflow clarity",
          bullets: [
            "Disorganized call notes become a formatted client-ready report in thirty seconds.",
            "A blank content brief becomes a complete campaign outline with a single click.",
          ],
        },
        {
          title: "Decision speed",
          bullets: [
            "A stack of support tickets becomes a categorized trend summary overnight.",
            "A forty-page RFP becomes five prioritized decision points before the next meeting.",
          ],
        },
      ],
    },
    {
      type: "section",
      id: "build-a-saas-product-demo",
      label: "Step 2",
      title: "Step 2: A GPT-built HTML demo shows only the transformation",
      paragraphs: [
        "The HTML demo is the core of this workflow. It is not a mockup or a slide. It is a functional browser interface that shows the before state, the action, and the after state, recorded directly and turned into a video.",
        "Why HTML instead of screen recording the real product? Your actual product UI often has noise: navigation menus, notification dots, empty states, loading indicators, unrelated features.",
        "The HTML demo strips all of that and shows only the product moment. For ad testing, that clarity is more important than authenticity.",
        "If you want the demo to move beyond a plain HTML page, I tested [20 AI animation styles built from one 15-second voice](/blog/ai-animation-styles-benchmark), from 10 minutes to 7 h 30 of build time.",
      ],
    },
    {
      type: "quote",
      text: "Prompt: Create a single HTML page for a 1920x1080 viewport, formatted as a SaaS product demo. On the left side, show disorganized meeting notes. In the center, place a large button labeled Generate Report. When clicked, animate the right panel filling with a clean client report: headline, three sections, action items, and next steps. Use large typography, dark background, white text, no navigation, no branding, no small labels. Just the before state, the action, and the after state.",
    },
    {
      type: "figure",
      src: "/saas-product-video-html-demo-obs-workflow.webp",
      alt: "Split-screen SaaS product demo showing before-and-after states recorded with OBS for ad testing",
      caption: "The before state, the action and the after state in one browser page, recorded with OBS.",
      width: 1200,
      height: 630,
    },
    {
      type: "visual-break",
      title: "Three rules for the HTML demo",
      items: [
        {
          title: "Large text only",
          bullets: [
            "If the viewer needs to zoom in to read the UI, the demo fails in the first three seconds.",
            "Every label and output should be readable at full screen on a mobile device.",
          ],
        },
        {
          title: "Remove everything outside the product moment",
          bullets: [
            "No menus, notification counts, or footer text.",
            "Every element that is not the before state, the action, or the after state is a distraction.",
          ],
        },
        {
          title: "Make the contrast visible",
          bullets: [
            "The wow moment needs to look clearly different from the before state.",
            "If both panels look similar, the viewer does not register what changed.",
          ],
        },
        {
          title: "Match the split ratio before recording",
          bullets: [
            "For split-screen Meta formats, format the HTML at the exact split ratio.",
            "A full-width demo squeezed into a 50/50 split will crop critical elements.",
          ],
        },
      ],
    },
    {
      type: "section",
      id: "record-the-demo-with-obs",
      label: "Step 3",
      title: "Step 3: OBS records the demo, and the wow moment stays out of the platform edges",
      paragraphs: [
        "Open [OBS](https://obsproject.com/) and set the capture source to your browser window.",
        "For vertical Meta placements, set output to 1080x1920. For horizontal or split-screen formats, set output to 1920x1080.",
        "Safe zone rule: Meta and Instagram overlay interaction buttons at the bottom and right edges of the screen. Keep the product moment and CTA text in the center of the frame, away from the edges. If the wow moment is in the bottom-right corner, it will be covered on every Reels placement.",
        "Record the demo at normal speed. The viewer needs to register what changed, not just see that something happened quickly. Total recording time should stay under sixty seconds.",
      ],
    },
    {
      type: "section",
      id: "add-sound-and-captions",
      label: "Step 4",
      title: "Step 4: Sound and captions are focus cues, not decoration",
      paragraphs: [
        "This step is skipped by most SaaS teams. It is a measurable error.",
        "Sound directs attention. A typing sound under the before state tells the viewer something is happening. A clean click at the button press signals the transition. A subtle reveal sound as the after state appears punctuates the wow moment. These sounds are not decoration; they are focus cues.",
        "None of this requires audio production. Free sound libraries have all three. Add them directly to the HTML using JavaScript audio triggers, or layer them in post using CapCut or DaVinci Resolve.",
        "Burned-in captions increase completion and CTR. Not because every viewer watches silently, but because captions keep viewers oriented during transitions. Keep caption text large, high-contrast, and positioned away from platform UI zones.",
      ],
    },
    {
      type: "section",
      id: "add-a-ugc-hook",
      label: "Step 5",
      title: "Step 5: A human hook gives recognition before the demo gives proof",
      paragraphs: [
        "A screen recording demo is testable. A screen recording demo combined with a human hook is stronger.",
        "The human element creates emotional recognition before the product moment creates logical validation. The format looks like this: a talking-head clip in the top half of the frame names the problem. The HTML demo in the bottom half shows the solution.",
        "From a real campaign: this is the format used in Meta Ads for One Great Book across two iterations.",
        // TODO(wael): One Great Book hook rate / hold rate / CTR iteration 1 vs 2
        "The first iteration used a simpler UI with a looser product moment. The second iteration tightened the demo to match the hook and made the transformation more visually distinct. The structure, human hook above and product demo below, stayed consistent because it worked.",
        "If you write the hook or voice-over with AI, my [benchmark of 15 AI video script skills](/blog/ai-video-script-skills-benchmark) shows how far the same model swung from one run to the next: 1.50 points.",
      ],
    },
    {
      type: "visual-break",
      title: "Three practical options for the UGC clip",
      items: [
        {
          title: "Record it yourself",
          bullets: [
            "A phone, a window, and one honest line is enough.",
            "Use the line to name the painful before state before the product demo shows the after state.",
          ],
        },
        {
          title: "Use Arcads",
          bullets: [
            "[Arcads](https://www.arcads.ai/) can generate a presenter clip for testing.",
            "Combine the presenter clip with the OBS recording before exporting the ad.",
          ],
        },
        {
          title: "Use Veo for the visual",
          bullets: [
            "With Veo 3, audio quality could degrade on longer clips.",
            "Generate the visual, then record or generate a clean voiceover and sync it in post.",
          ],
        },
        {
          title: "Remove the background when useful",
          bullets: [
            "Place the presenter in front of the demo only when pointing or reacting improves clarity.",
            "CapCut handles background removal without requiring editing experience.",
          ],
        },
      ],
    },
    {
      type: "callout",
      label: "Update, November 7, 2026",
      items: [
        "New since this guide was written: on November 4, 2026, Viggle published on Hugging Face the open weights of Viggle Remake, a model built on MiniMax H3 that replaces the people in an existing video and keeps the motion.",
        "For a UGC hook, one recorded take can become several presenters to test, without a reshoot. One user who ran it locally says it swaps characters better than almost anything, but loses some of the identity fidelity MiniMax H3 is known for.",
        "Limit: hardware needs are not stated, and recasting someone else's video raises a rights question. Recast only takes you own. Source: [r/StableDiffusion, November 5, 2026](https://www.reddit.com/r/StableDiffusion/comments/1xnui9u/viggle_remake_open_weights_for_recasting_editing/).",
      ],
    },
    {
      type: "section",
      id: "match-video-to-landing-page",
      label: "Step 6",
      title: "Step 6: The landing page must repeat the video's promise in the same words",
      paragraphs: [
        "This is where most SaaS ad funnels break silently, and it is directly relevant if you are using the demo on a landing page or linking an ad to a product page.",
        "If the video says: Turn messy meeting notes into client-ready reports in thirty seconds, the landing page headline should say exactly that, not AI-powered productivity for modern teams.",
        "The visitor clicked because they recognized the product moment. When the landing page does not continue that same promise in the same language, they experience a gap.",
        "Most of them leave. The ad looks like it failed. The actual failure is the message disconnect.",
        "Same transformation. Same language. Same visual proof, with more detail.",
        "This is one of the most common conversion leaks in SaaS paid acquisition. The ad creative does its job. The landing page undoes it.",
        "If you are working on this problem, where traffic is arriving but not converting, the [SaaS landing page optimization service](/landing-page-for-saas) and [conversion rate optimization work](/conversion-rate-optimisation-specialist) are where most of this gets fixed.",
      ],
    },
    {
      type: "section",
      id: "measure-saas-product-video",
      label: "Measurement",
      title: "Read four signals before you polish anything",
      paragraphs: [
        "These are practical signals, not universal benchmarks. Use them as directional guides, not hard rules.",
        "The 25% hook rate is in line with [Vaizle's review](https://insights.vaizle.com/hook-rate-hold-rate/) of Meta video ads, which puts 20-25% as a solid baseline, with top performers exceeding 30%.",
        "The 20% hold rate at 10 seconds and the 0.8% CTR are the thresholds I use, my own rules of thumb rather than published benchmarks.",
      ],
    },
    {
      type: "visual-break",
      title: "Four signals to read before polishing the video",
      items: [
        {
          title: "Hook rate: watched past 3 seconds",
          bullets: [
            "Directional target: at least 25%.",
            "If below target, rebuild the opening frame or hook line.",
          ],
        },
        {
          title: "Hold rate at 10 seconds",
          bullets: [
            "The threshold I use: at least 20%.",
            "If below target, tighten the demo and move the wow moment earlier.",
          ],
        },
        {
          title: "CTR after 10K impressions",
          bullets: [
            "The threshold I use: at least 0.8%.",
            "If below target, replace the angle, not just the execution.",
          ],
        },
        {
          title: "Landing page message match",
          bullets: [
            "The hero should mirror the ad promise.",
            "If it does not, rewrite the landing page headline and measure bounce rate after the click.",
          ],
        },
      ],
    },
    {
      type: "dark-checklist",
      id: "common-saas-product-video-mistakes",
      label: "Mistakes",
      title: "Most SaaS product video mistakes are message, sequence and placement problems",
      paragraphs: [
        "Seven mistakes come up again and again. None of them is fixed by a bigger production budget.",
      ],
      items: [
        {
          title: "Starting with features instead of transformation.",
          body:
            "The viewer cannot convert what the feature does into what changes for them. Show the result, not the mechanism.",
        },
        {
          title: "Over-producing before validating.",
          body:
            "A polished video built around the wrong angle is not better than a rough prototype built around the right one. It is just harder to replace.",
        },
        {
          title: "Putting the wow moment too late.",
          body:
            "If the transformation appears after the 10-second mark, most viewers on Meta have already scrolled past.",
        },
        {
          title: "Showing unreadable UI.",
          body:
            "Small fonts, dense dashboards, and cluttered interfaces lose the viewer before they understand what happened.",
        },
        {
          title: "Ignoring the landing page match.",
          body:
            "The ad creates intent. The landing page fails to receive it.",
        },
        {
          title: "Using one export for every placement.",
          body:
            "A 9:16 Reels export and a 1:1 Feed export have different safe zones. One creative cut for all placements means something important is cropped somewhere.",
        },
        {
          title: "Treating video as a replacement for clear positioning.",
          body:
            "If you cannot describe the product moment in one sentence, no amount of production will fix the video.",
        },
      ],
    },
    {
      type: "numbered-list",
      id: "script-framework",
      label: "Framework",
      title: "Five parts carry a product video script",
      paragraphs: [
        "A simple five-part structure works across demo ads, landing page videos, and explainer formats.",
        "This structure works because it mirrors how buyers actually think. They are not looking for features. They are looking for evidence that the problem they have right now will be solved.",
      ],
      items: [
        {
          title: "Before state",
          body:
            "Name the painful situation clearly. Use specific language the viewer already uses internally.",
        },
        {
          title: "Product action",
          body:
            "Show the trigger: the button press, the input, or the one moment that starts the transformation.",
        },
        {
          title: "After state",
          body:
            "Reveal the result. Make it visually distinct and immediately comprehensible.",
        },
        {
          title: "Outcome",
          body:
            "State what this means for the viewer: time saved, quality improved, or work eliminated.",
        },
        {
          title: "Next step",
          body:
            "Use a single, low-friction action: watch the demo, try it free, or book a call.",
        },
      ],
    },
    {
      type: "section",
      id: "when-to-invest-in-production",
      label: "Production",
      title: "Once the numbers clear, the evidence becomes the brief for polished production",
      paragraphs: [
        "Once the numbers clear the thresholds above, you have something more valuable than a polished video: you have evidence that the product moment works.",
        "That evidence is the brief for polished production.",
        "The brief becomes simple: same before state, same action, same after state, with production quality that reflects the brand.",
        "The motion designer or video editor does not need to invent the concept. Their job is to make the validated concept look its best.",
        "This is the correct order. It is also the reverse of how most SaaS teams approach it. They produce first and validate second, so most polished SaaS product videos are built on untested assumptions about what the market cares about.",
        "If the bigger issue is channel order, use the [SaaS marketing plan](/saas-marketing-plan) and [B2B SaaS marketing strategy](/b2b-saas-marketing-strategy) pages to map where video belongs in the wider growth system.",
      ],
    },
    {
      type: "section",
      id: "this-week",
      label: "Next step",
      title: "What I would do this week",
      paragraphs: [
        "Run one product moment through the sequence before you brief anyone.",
      ],
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Write the product moment as one before-and-after sentence a stranger could grasp in five seconds.",
        "Ask GPT for a single HTML page with the before state, the action and the after state, in large text.",
        "Record it in OBS under sixty seconds, with the wow moment in the center of the frame.",
        "Run it, then read hook rate, hold rate, CTR and landing page message match.",
        "Brief polished production only after the signals clear.",
      ],
    },
    {
      type: "mid-cta",
      title: "Need the product moment audited before you spend on creative?",
      body:
        "I will review the ad angle, SaaS landing page match, conversion path, and the product moment buyers actually need to see.",
      button: "Book a 20-min GTM Audit",
    },
  ],
  faq: [
    {
      question: "What is a SaaS product video?",
      answer:
        "A SaaS product video is a short video that shows your software solving a specific problem. The most effective ones focus on a single product moment, the before-and-after transformation, rather than a list of features or a general brand overview.",
    },
    {
      question: "How long should a SaaS product video be?",
      answer:
        "For paid ads, aim for 15-30 seconds. The product moment should appear before the 10-second mark. For landing page demos and explainer videos, 60-90 seconds is a reasonable range, long enough to show the transformation clearly, short enough to hold attention. For bottom-of-funnel product tours, 2-3 minutes is acceptable if the viewer is already considering a purchase.",
    },
    {
      question: "Where should I use a SaaS product video?",
      answer:
        "The highest-impact placements are above the fold on your landing page, in Meta and Instagram Reels ad campaigns, on YouTube pre-roll for awareness, in sales emails and demo follow-ups, and on product pages for specific features. The landing page placement is often most underused because a 30-second demo above the fold can reduce friction faster than copy alone.",
    },
    {
      question: "Should I create a polished SaaS video first?",
      answer:
        "No. Validate the product moment first with a prototype. A polished video built around the wrong angle is not better than a rough prototype built around the right one; it is just harder to replace. Use the prototype to test the hook, the transformation, and the landing page match. Invest in production once you have signal.",
    },
    {
      question: "Can a SaaS product video improve landing page conversion?",
      answer:
        "Yes, but only if the video shows the same transformation as the landing page headline. A video that demonstrates a clear product moment reduces cognitive load for the visitor: instead of reading and imagining the result, they see it. That reduces hesitation and increases the chance they take the next step. The risk is when the video and the landing page say different things; that disconnect increases bounce rate.",
    },
    {
      question: "What should a SaaS product demo video include?",
      answer:
        "A named before state that the viewer recognizes immediately, a visible product action, a clear and high-contrast after state, a stated outcome or benefit, and a single next step. Optional but effective: a human hook that names the problem before the demo plays, burned-in captions, and attention cues timed to the transition.",
    },
  ],
  source: {
    label: "Vaizle hook rate and hold rate review",
    url: "https://insights.vaizle.com/hook-rate-hold-rate/",
    body:
      "The hook rate target in this article is a directional testing signal, in line with practitioner benchmark reporting from Vaizle. The hold rate and CTR thresholds are my own rules of thumb.",
  },
  cta: {
    title: "Need a SaaS product video that matches the funnel?",
    body:
      "If your SaaS landing page or ad funnel is not converting, the problem may be the message, the product moment, the landing page match, or the conversion path.",
    button: "Book a 20-min GTM Audit",
  },
  internalLinks: [
    { href: "/landing-page-for-saas", label: "SaaS landing page optimization" },
    { href: "/conversion-rate-optimisation-specialist", label: "conversion rate optimization for SaaS" },
    { href: "/meta-ads-for-saas", label: "Meta Ads for SaaS" },
    { href: "/saas-marketing-plan", label: "SaaS marketing plan" },
    { href: "/b2b-saas-marketing-strategy", label: "B2B SaaS marketing strategy" },
    { href: "/saas-marketing-agency", label: "SaaS GTM strategy and positioning" },
    { href: "/blog/ai-video-script-skills-benchmark", label: "AI video script skills benchmark" },
    { href: "/blog/ai-animation-styles-benchmark", label: "AI animation styles benchmark" },
  ],
  relatedPosts: [
    {
      label: "Original Research",
      title: "I tested 15 AI video script skills. The same model swung 1.50 points.",
      description:
        "15 Claude skills and Custom GPTs wrote the same Reel voice-over, scored blind by two AI judges. The best tool exists, but reruns matter more.",
      href: "/blog/ai-video-script-skills-benchmark",
    },
    {
      label: "Original Research",
      title: "I made 20 AI animation styles from one voice: 10 minutes to 7 h 30",
      description:
        "20 test videos, each made with an AI animation skill on the same 15-second voice. Compare build time and flaws, filter by family, star the styles to keep.",
      href: "/blog/ai-animation-styles-benchmark",
    },
    {
      label: "Landing Pages",
      title: "SaaS Landing Page Optimization Best Practices 2026",
      description:
        "A practical guide to improving SaaS landing page conversion with clarity, proof, CTA hierarchy, mobile UX, and testing.",
      href: "/blog/landing-page-optimization-best-practices-2026",
    },
    {
      label: "Paid Acquisition",
      title: "Google Ads vs Meta Ads for SaaS",
      description:
        "Which channel fits your stage, and how the landing page should change for each one.",
      href: "/google-ads-vs-meta-ads-saas",
    },
    {
      label: "Conversion",
      title: "SaaS Traffic But No Signups",
      description:
        "Why traffic does not convert when positioning, proof, CTA hierarchy, or onboarding clarity are weak.",
      href: "/blog/saas-traffic-but-no-signups",
    },
  ],
  pillarPage: "/landing-page-for-saas",
};
