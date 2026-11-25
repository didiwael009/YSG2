// Copy for /content-automation, style A (creative).
// Figures: SambaLingo stats dashboard (~/tools/stats-videos/dashboard.html), generated
// 25 Nov 2026 08:09 from sorties/*/2026-11-25.json: views of videos published in the
// previous 30 days. "134 posts" in one month confirmed by Wael (see creative2.ts).
// Showcase video: YouTube TVedsBTxMsE, "Ai workflow showcase", SambaLingo channel.

export type CAPlatform = { platform: string; handle: string; views: string; videos: string };
export type CATopVideo = { title: string; views: string; date: string; url: string };
export type CAConcept = { name: string; avgViews: number; videos: number };

export const CONTENT_AUTOMATION_COPY = {
  hero: {
    eyebrow: "Content automation",
    titleLine1: "One system.",
    titleLine2: "134 posts in a month.",
    body: "I build content systems for digital businesses. Videos, songs, animations and posts, made with Claude Code and a stack of AI tools. I check every piece. You approve it before it goes live.",
    primaryCta: "Book a call",
    secondaryCta: "See the numbers",
    note: "Free · no commitment",
    phoneAlt: "The SambaLingo Instagram feed on a phone, a grid of pug videos that teach Portuguese",
    phoneChip: "@sambalingo.app on Instagram",
  },
  numbers: {
    eyebrow: "SambaLingo, live",
    titleLine1: "The numbers,",
    titleLine2: "last 30 days",
    intro: "SambaLingo is my own app to learn Brazilian Portuguese. The system feeds its accounts every day, in English and French. These are the views of every video it published in the last 30 days.",
    totalViews: "71,222",
    totalLabel: "views across four accounts",
    platforms: [
      { platform: "Instagram", handle: "@sambalingo.app", views: "41,048", videos: "62 videos" },
      { platform: "YouTube Shorts", handle: "SambaLingo", views: "15,082", videos: "50 videos" },
      { platform: "Instagram", handle: "@sambalingofr", views: "12,628", videos: "8 videos" },
      { platform: "Facebook", handle: "Sambalingo", views: "2,464", videos: "12 videos" },
    ] as CAPlatform[],
    topTitle: "Most watched",
    topIntro: "Top three on @sambalingo.app. Two of them are songs.",
    top: [
      { title: "Learn Portuguese with songs: Vou Festejar", views: "3,256", date: "4 Nov", url: "https://www.instagram.com/reel/DfVLkr4FJ8B/" },
      { title: "Brazilian slang the pug actually uses", views: "3,205", date: "6 Nov", url: "https://www.instagram.com/reel/DfZsAd-jMZZ/" },
      { title: "Garota de Ipanema, line by line", views: "2,960", date: "7 Nov", url: "https://www.instagram.com/reel/DfdA3zvCBPf/" },
    ] as CATopVideo[],
    conceptsTitle: "What gets watched",
    conceptsIntro: "Average views per video on @sambalingo.app, by format.",
    concepts: [
      { name: "Culture", avgViews: 1218, videos: 4 },
      { name: "Expressions", avgViews: 945, videos: 13 },
      { name: "Songs", avgViews: 918, videos: 10 },
      { name: "Quiz", avgViews: 468, videos: 4 },
      { name: "Grammar rules", avgViews: 414, videos: 31 },
    ] as CAConcept[],
    insight: "Expressions get more than twice the views of grammar rules. A script pulls these numbers every morning, and each week they go back into the formats.",
    source: "Counted on 25 November 2026, for videos published in the previous 30 days.",
  },
  showcase: {
    eyebrow: "Showcase",
    titleLine1: "See what",
    titleLine2: "it makes",
    intro: "A showcase of the video styles this workflow produces: 2D characters in 3D worlds, retro TV motion design and more.",
    caption: "AI workflow showcase, on the SambaLingo YouTube channel.",
  },
  pipeline: {
    eyebrow: "How it works",
    titleLine1: "How the system",
    titleLine2: "works",
    intro: "This is my own daily feed, AI News, during the first week of November. Your system runs the same way, on your topics.",
    runningBefore: "Running today: SambaLingo, 134 posts in its first month. MisterSMO, an AI social media manager. AI News, every day in three languages. And the ",
    runningLink: "CRO teardowns",
    runningAfter: ", 20 and counting.",
  },
  formats: {
    eyebrow: "What you can order",
    titleLine1: "What I can",
    titleLine2: "produce for you",
    intro: "One idea, cut for each channel. Claude Code makes it. I check it, you approve it.",
  },
  finalCta: {
    line: "Want a system like this for your brand?",
    button: "Book a call",
    note: "Free · no commitment",
  },
};
