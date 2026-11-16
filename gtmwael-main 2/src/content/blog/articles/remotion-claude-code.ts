import type { BlogPost } from "../types";

export const remotionClaudeCode: BlogPost = {
  slug: "remotion-claude-code",
  path: "/blog/remotion-claude-code",
  layout: "teardown",
  category: "AI Video Workflow",
  breadcrumbTitle: "Remotion and Claude Code",
  title: "Remotion and Claude Code: The Workflow Behind My Motion Graphics Videos",
  h1: "How I make motion graphics videos with Remotion and Claude Code",
  metaTitle: "Remotion Claude Code Workflow: Skills, Fixes and Real Costs",
  description:
    "How I make videos with Remotion and Claude Code: setup traps, who owns time and audio, 8 skills compared, the render and fix loop, real token costs.",
  searchIntent:
    "Marketers, founders and developers who want to produce motion graphics videos by prompting Claude Code with Remotion, and want a working method with real costs and failure points before they start.",
  excerpt:
    "Claude Code writes the Remotion code, but the method around it decides whether the video is usable. Here is the split of roles I use, 8 Remotion skills compared on the same brief, the defects my render and fix loop caught, and what three videos cost on November 12.",
  author: "Wael Aouididi",
  authorBio:
    "SaaS Growth Marketer and fractional growth lead. I help B2B SaaS teams fix positioning, landing pages, outreach, and conversion before they scale traffic.",
  datePublished: "2026-11-16",
  dateModified: "2026-11-16",
  schemaType: "Article",
  schemaHeadline: "How I make motion graphics videos with Remotion and Claude Code",
  schemaDescription:
    "A working Remotion and Claude Code workflow: setup traps, a split of roles between Remotion, ffmpeg and Claude, 8 Remotion skills compared on one brief, a render and fix loop with real defects, and measured token costs per video.",
  schemaDateModified: "2026-11-16",
  schemaIncludeGlobal: false,
  schemaBreadcrumbs: [
    { name: "Blog", path: "/blog" },
    { name: "Remotion and Claude Code", path: "/blog/remotion-claude-code" },
  ],
  readTime: "9 min read",
  ogImage: "/og-default.png",
  featuredImage: "/og-default.png",
  featuredImageAlt:
    "Remotion and Claude Code workflow: code-drawn motion graphics rendered frame by frame.",
  primaryKeyword: "remotion claude code",
  secondaryKeywords: [
    "claude code remotion",
    "claude remotion",
    "remotion claude skill",
    "remotion skills",
    "claude code video editing",
  ],
  toc: [
    { id: "setup", label: "Three setup traps" },
    { id: "roles", label: "Who owns picture, sound and time" },
    { id: "pipeline", label: "The steps, in order" },
    { id: "skills", label: "8 Remotion skills compared" },
    { id: "loop", label: "The render, look, fix loop" },
    { id: "cost", label: "What one video costs" },
    { id: "limits", label: "Limits" },
    { id: "start", label: "Where to start" },
    { id: "further-reading", label: "Further reading" },
    { id: "faq", label: "FAQ" },
  ],
  blocks: [
    {
      type: "paragraphs",
      lead: true,
      paragraphs: [
        "Claude Code writes Remotion code well. What I don't let it do alone is decide when things happen, how they move and whether the render looks right.",
        "So my Remotion and Claude Code workflow is mostly about what Claude does not do: it never writes timestamps, it never cuts footage, and its renders get checked on frames, not on the code.",
        "This is the method I use for short vertical videos and for the motion layer of talking-head edits, with the numbers I measured along the way. It is written for marketers, founders and developers who already use Claude Code. You don't need to know Remotion: it describes a video as React components and renders it frame by frame. My renders ran on Remotion 4.0.539 and 4.0.542, on an M4 Mac.",
      ],
    },
    {
      type: "callout",
      label: "TL;DR",
      items: [
        "Remotion renders the picture, ffmpeg owns the cuts and the audio, and code turns anchor phrases into frame numbers, so Claude never writes a timestamp. Out of 8 Remotion skills compared on one brief, both judges recommended a pair: my choreography skill for motion and the official one for Remotion rules, because each is stronger where the other is weaker. Every render goes through a render, look, fix loop on frames. On November 12, three videos cost 19.65 to 22.29 million tokens each, $9.42 to $11.24 by Claude Code's own figure.",
      ],
    },
    {
      type: "section",
      id: "setup",
      label: "Setup",
      title: "Three setup traps that cost me renders before the first frame",
      paragraphs: [
        "I start each test project with npx create-video@latest --yes --blank --no-tailwind.",
        'Trap 1, the browser. On Remotion 4.0.539 the bundled Chrome hung on "Waiting for root component" and the render never started. The fix was to point Remotion at the Mac\'s own Chrome with --browser-executable and --chrome-mode=chrome-for-testing.',
        "Trap 2, the pixel format. For an MP4 that plays everywhere, I add --pixel-format=yuv420p, the color format most players expect. My talking-head pipeline first rendered the graphics as a separate transparent layer in ProRes 4444, a format that keeps transparency. Once it needed a virtual camera, Remotion took over the whole picture as a standard H.264 video with no sound, and the overlay pass went away.",
        "Trap 3, symlinks. Remotion ignores symlinked files in its public folder. I bring footage in with a hard link, a second name for the same file rather than a shortcut, and pass --public-dir.",
        "One more habit from day one: npx remotion still with --frame=165, or any frame number, renders a single frame. Checking a still is cheaper than rendering the whole video to see one problem.",
      ],
    },
    {
      type: "section",
      id: "roles",
      label: "Split of roles",
      title: "Remotion draws, ffmpeg cuts, and Claude never writes timestamps",
      paragraphs: [
        "Why Remotion at all: on October 29 I made the same animation in GSAP, a JavaScript animation library, and in Remotion. The two results were almost identical. I kept Remotion alone because a template is described once, then only the text and the audio change to make 20 videos.",
        "One hard rule in my video project's instructions is about time: Claude does not write a single timestamp. It writes a graphics_tags.yaml file that attaches a shot type to anchor phrases in the script and an energy tier to each line, from T1 to T3, where T3 gets the strongest treatment. Code resolves each phrase to a frame.",
        "The times come from a verbatim word-level transcript: mlx-whisper for the words, then WhisperX's alignment model for the timing of each word. I stopped using WhisperX's own text after it kept only 70 of 91 words on one test clip, dropping a false start and a filler take.",
        "Even good timestamps need care. After a pause, Whisper places word starts about 0.4 seconds early, so cuts get 80 ms of padding and each cut point is adjusted on the audio level. A cut must never land inside a word.",
        "Cutting happens in ffmpeg, never in Remotion, with exact frame and sample counts so audio and picture drift by 0 ms. Remotion renders with --muted, and ffmpeg lays the audio back at the end.",
        "Geometry follows the same logic. Positions and sizes are computed in Python and passed to Remotion as input values (props), and motion values come from one brand file: a 3-frame dip before each entrance, one overshoot past the final position, 4 frames between elements of a group, and no more than 2 elements moving at once. A separate setting asks for one animated element about every 5 seconds.",
        "On my M4, the first phase (ingest, transcription, cut) took about 2 minutes for a 224-second public-domain speech, keeping 179 seconds. Transcription ran about 9 seconds for 40 seconds of audio.",
      ],
    },
    {
      type: "data-table",
      columns: ["Job", "Owner"],
      rows: [
        ["Picture and motion", "Remotion, with components written by Claude Code"],
        ["Cuts and audio", "ffmpeg, with exact frame and sample counts"],
        ["Anchor phrases and energy tiers", "Claude, in graphics_tags.yaml"],
        ["Timing in frames", "Code, from a word-level transcript"],
        ["Positions and sizes", "Python, passed to Remotion as input values"],
        ["Motion values", "One brand file"],
        ["Checking the render", "Frames and stills, not the code"],
      ],
      footnote: "The split of roles in my video projects. Claude writes code and tags, never times.",
    },
    {
      type: "numbered-list",
      id: "pipeline",
      label: "Pipeline",
      title: "The steps from raw footage to final video",
      paragraphs: [
        "This is the order in my talking-head pipeline. Claude's part in the timeline is step 3: it writes tags, and code and ffmpeg do the rest.",
      ],
      items: [
        {
          title: "Clean the audio and fix the frame rate",
          body: "The raw file is converted to a constant 30 fps and its audio is cleaned before any cut. Nothing later reads the raw file.",
        },
        {
          title: "Transcribe word by word",
          body: "mlx-whisper writes the words, then WhisperX lines each word up with the audio.",
        },
        {
          title: "Claude tags the script",
          body: "Claude writes graphics_tags.yaml: shot types on anchor phrases and an energy tier for each line. No times.",
        },
        {
          title: "Code computes the frames",
          body: "Code turns each anchor phrase into a frame number and enforces durations, overlaps and spacing.",
        },
        {
          title: "ffmpeg cuts",
          body: "Each segment is trimmed by exact frame and sample counts, and the drift between audio and picture is logged. It must be 0 ms.",
        },
        {
          title: "Remotion renders the picture",
          body: "Footage, virtual camera, captions and graphics, rendered with no sound.",
        },
        {
          title: "ffmpeg puts the audio back",
          body: "The audio of the cut goes under Remotion's picture without re-encoding the picture.",
        },
        {
          title: "Check on frames",
          body: "Frames are extracted and looked at. After at most 2 automated fix passes, the video is delivered or a frame is flagged for a person.",
        },
      ],
    },
    {
      type: "data-chart",
      id: "skills",
      label: "Skills",
      title: "Which Remotion skill should Claude Code use? 8 compared on one brief",
      paragraphs: [
        "On November 7 I gave 8 Remotion and animation skills the same brief: a 1080×1920 video at 30 fps, 1,050 frames, 7 scenes. Two AI judges, Claude Opus and Claude Fable, scored what each skill would make Claude write, on 7 criteria: fidelity to the brief, choreography, motion mechanics, rhythm, graphics, Remotion correctness and code.",
      ],
      caption: "Average of two judges, out of 10",
      labelWidth: "wide",
      rows: [
        { label: "motion-choreographer (my local skill)", value: 7.43, display: "7.43" },
        { label: "disney-animation-rule (vibe-motion)", value: 6.57, display: "6.57" },
        { label: "remotion-motion-graphics (haidrrrry)", value: 6.14, display: "6.14" },
        { label: "kinetic-type (dricosnyman)", value: 5.79, display: "5.79" },
        { label: "pneuma-skills", value: 5.21, display: "5.21" },
        { label: "remotion-dev (official)", value: 5.21, display: "5.21", muted: true },
        { label: "brand-launch-video-star (vibe-motion)", value: 5.07, display: "5.07" },
        { label: "kinetic-typography (iart-ai)", value: 3.64, display: "3.64" },
      ],
      footnote:
        "Read-only analysis of each skill against the brief: no build and no render. The judges knew which skill was mine, so the scoring was not blind. Average gap between the two judges: 0.48 points.",
    },
    {
      type: "data-table",
      columns: ["Criterion", "Official remotion-dev", "My motion-choreographer"],
      align: [1, 2],
      rows: [
        ["Fidelity to the brief", "6.0", "6.0"],
        ["Choreography", "3.5", "9.0"],
        ["Motion mechanics", "3.0", "9.0"],
        ["Rhythm", "5.5", "7.5"],
        ["Graphics", "3.5", "7.5"],
        ["Remotion correctness", "7.5", "6.5"],
        ["Code", "7.5", "6.5"],
        ["Errors flagged", "5", "4"],
      ],
      footnote: "Scores out of 10, average of the two judges.",
    },
    {
      type: "paragraphs",
      paragraphs: [
        "The two profiles are almost mirror images. The official skill knows Remotion but scored 3.0 on motion mechanics. My skill brings a method, cause then trajectory then consequence, 10 motion mechanics, 3 directions compared before choosing, and a beat sheet that lists what happens frame by frame, but its Remotion rules are weaker.",
        "Both judges recommended the same pair: the method skill for choreography plus the official skill for exact Remotion rules. Judge A put the pair at about 7.7.",
        "Neither skill is clean on its own. The official skill cited packages the brief ruled out and referenced a Track API that does not exist in Remotion 4.0.520. Mine stops to ask the user to pick a direction unless it runs in a do-it-now mode, and its final hold can drop under the 60 frames the brief asked for.",
      ],
    },
    {
      type: "figure",
      src: "/remotion-claude-code/three-directions.jpg",
      alt: "Three rows of storyboard frames, one per animation direction, for the same news video",
      caption: "The 3 directions my choreographer skill drew for the choreography test, compared side by side before choosing one. The on-screen text is in French.",
      width: 1100,
      height: 1420,
    },
    {
      type: "dark-checklist",
      id: "loop",
      label: "QA loop",
      title: "Render, look, fix: the loop that catches the defects the code hides",
      paragraphs: [
        "Remotion code that compiles can still produce a broken frame. My choreographer skill builds the check into the method: render, make a contact sheet (a grid of frames on one image), inspect runs of frames around each impact, list 3 defects, fix, render again. In the talking-head pipeline, a low-resolution preview (720p, 15 fps) and a review page come before any graphics, and automated fixes stop after 2 passes.",
        "These are real defects that loop caught.",
      ],
      items: [
        {
          title: 'A "+13%" figure that overflowed',
          body: "Fixed in version 2 with 440 px bars and 158 px figures.",
        },
        {
          title: "Scene 1 stuck mid-screen at frame 130",
          body: "Fixed so the scene clears the screen by frame 126.",
        },
        {
          title: "A title overlap at frame 420",
          body: "Fixed by removing the title at frame 424.",
        },
        {
          title: "Paper that turned semi-transparent",
          body: "In a 6-second paper-cut video, the grain layer's alpha leaked into the paper. Alpha forced to 1.",
        },
        {
          title: "A steam ribbon clipped by its own shadow",
          body: "The shadow filter area cut the ribbon off. The filter was moved to screen coordinates.",
        },
        {
          title: "A row of text past the margin",
          body: "One row ran to 1,043 px. Font size went from 150 px to 136 px.",
        },
      ],
    },
    {
      type: "figure",
      src: "/remotion-claude-code/figure-v1-v2.jpg",
      alt: "The same frame in version 1 and version 2: a black bar with the figure +13%",
      caption: 'Left, version 1: the "+13%" figure runs to the edge of its bar. Right, version 2, with 440 px bars and 158 px figures.',
      width: 864,
      height: 768,
    },
    {
      type: "figure",
      src: "/remotion-claude-code/paper-cut.jpg",
      video: "/remotion-claude-code/paper-cut.mp4",
      alt: "Six-second paper-cut animation: a coffee cup, a steam ribbon, then cut-out words on a table",
      caption: "The 6-second paper-cut video after the fixes: the paper is opaque again, the steam ribbon is whole and the last row sits inside the margin. No sound.",
      width: 720,
      height: 1280,
    },
    {
      type: "paragraphs",
      paragraphs: [
        "None of these show up in the code. They show up on frame 130, frame 420, or in a still. That is why the loop looks at frames, not at the diff.",
        "Claude Code also wrote every line of Remotion code in that choreography test by hand: the skill gives method, not components. Images came from Google Flow, where 3 of 9 mockups were usable, then 5 isolated elements generated on a green background.",
      ],
    },
    {
      type: "figure",
      src: "/remotion-claude-code/flow-elements.jpg",
      alt: "Five cut-out elements on a green background: a stack of bills, a pointing hand, a globe, a microphone and coins",
      caption: "The 5 isolated elements generated in Google Flow on a green background, before Claude Code animated them.",
      width: 1100,
      height: 220,
    },
    {
      type: "figure",
      src: "/ai-animation-styles/t10.jpg",
      video: "/ai-animation-styles/t10.mp4",
      alt: "The final 16-second choreography test video",
      caption: "The final video of the choreography test. Unmute for the voice-over, in French.",
      width: 540,
      height: 960,
    },
    {
      type: "data-table",
      id: "cost",
      label: "Cost",
      title: "What one Remotion video costs in Claude Code tokens",
      paragraphs: [
        "My daily video routine rotates through styles. On November 12 it made three videos, and a script logged each one from Claude Code's session data, including sub-agents, the helper sessions Claude Code starts for side tasks.",
      ],
      columns: ["Style", "Tokens", "Cost", "Turns", "Sub-agents"],
      align: [1, 2, 3, 4],
      rows: [
        ["topanim (choreographer + 2 Remotion skills)", "19.65 M", "$9.42", "39", "23"],
        ["tv-retro-3d (motion-video-director skill)", "22.29 M", "$11.24", "6", "19"],
        ["cartoon-3d (three.js inside Remotion)", "20.15 M", "$10.42", "8", "20"],
      ],
      footnote:
        "Tokens include cache reads, the context Claude Code reads again on each turn, which is what weighs on usage limits. Cost is the total_cost_usd figure Claude Code reports for each session. In the first video, 14.31 M tokens went to Opus and 5.33 M to Sonnet.",
    },
    {
      type: "figure",
      src: "/remotion-claude-code/november-12-videos.jpg",
      alt: "Contact sheets of three vertical videos in three different styles",
      caption: "Contact sheets of the three November 12 videos. From top: topanim, tv-retro-3d, cartoon-3d.",
      width: 1400,
      height: 2195,
    },
    {
      type: "paragraphs",
      paragraphs: [
        "About 20 million tokens per video is the number to plan around. That total counts context read again on each turn and by each of the 19 to 23 sub-agents, not only the code written.",
        "Time is harder to pin down. The choreography test took about 7 h 30 on the clock, from 3:22 to 10:55, including slow renders. I did not measure active time, so that number is an upper bound, not a production rate.",
      ],
    },
    {
      type: "takeaway",
      id: "limits",
      label: "Limits",
      title: "What this workflow and this data do not show",
      paragraphs: [
        "These are notes from my own projects, not a controlled study.",
      ],
      subheading: "Read the numbers with these in mind",
      checklist: [
        "The 8-skill comparison judged code and method without rendering anything. A real render could change the ranking.",
        "The judges knew which skill was mine. The two judges were 0.48 points apart on average, but that does not remove the bias.",
        "Costs come from one day and three styles. A simpler style or a shorter video will cost less, and a session that goes wrong will cost more.",
        "The 7 h 30 includes waiting for renders. Active time was not measured.",
        "The final render of the choreography test was checked with ffprobe and its last frame. Version 2 was watched at 0.4x speed.",
      ],
    },
    {
      type: "section",
      id: "start",
      label: "Where to start",
      title: "How to start your own Remotion and Claude Code workflow",
      paragraphs: [
        "Start with the split of roles before any style: Remotion for picture, ffmpeg for cuts and audio, code for time. It rules out audio drift and graphics timed by guesswork.",
        "Then give Claude Code two kinds of guidance: one skill for how things should move and one for exact Remotion rules. Then render a still at every impact before rendering the full video.",
        "If you want to compare animation styles before choosing one, my benchmark of 20 styles made from one 15-second voice shows the range, from about 10 minutes to about 7 h 30 per video.",
      ],
    },
    {
      type: "section",
      id: "further-reading",
      label: "Further reading",
      title: "Further reading",
      paragraphs: [
        "[I made 20 AI animation styles from one voice](/blog/ai-animation-styles-benchmark): the styles, the time each took and the flaws that showed.",
        "[I tested 15 AI video script skills](/blog/ai-video-script-skills-benchmark): the step before the animation, writing the voice-over.",
        "[Remotion documentation](https://www.remotion.dev/docs/): the official reference for compositions, props and rendering.",
        "[Remotion render command](https://www.remotion.dev/docs/cli/render): the flags used above, including --muted, --pixel-format and --public-dir.",
        "[WhisperX on GitHub](https://github.com/m-bain/whisperX): the word-level alignment I use for timing.",
      ],
    },
  ],
  faq: [
    {
      question: "Can Claude Code make videos with Remotion?",
      answer:
        "Yes. Remotion describes video as React components, and Claude Code writes those components, runs the render command and reads the output. In my choreography test it wrote all of the Remotion code. What it needs from you is a method for timing, motion and checking the render.",
    },
    {
      question: "Is there an official Remotion skill for Claude Code?",
      answer:
        "Yes, remotion-dev. In my comparison it scored 7.5 out of 10 on Remotion correctness, the highest of the 8, but 3.5 on choreography and 3.0 on motion mechanics. It also referenced a Track API that does not exist in Remotion 4.0.520. Both judges recommended pairing it with a choreography skill.",
    },
    {
      question: "Should Remotion handle the audio and the cuts?",
      answer:
        "Not in my workflow. Cuts and audio go through ffmpeg with exact frame and sample counts, and Remotion renders the picture with --muted. That keeps audio and picture drift at 0 ms.",
    },
    {
      question: "How much does a Remotion video cost with Claude Code?",
      answer:
        "On November 12, three short videos used 19.65 M, 22.29 M and 20.15 M tokens, cache reads included. Claude Code reported $9.42, $11.24 and $10.42 for those sessions.",
    },
    {
      question: "Why does my Remotion render hang on \"Waiting for root component\"?",
      answer:
        "On Remotion 4.0.539 I hit this with the bundled Chrome. Rendering with the Mac's own Chrome, via --browser-executable and --chrome-mode=chrome-for-testing, fixed it.",
    },
  ],
  cta: {
    title: "Want an AI video workflow that holds up?",
    body: "If you are building video or content production with AI, I can help you set up the tools, the checks and the tests worth running first.",
    button: "Book a 20-min GTM Audit",
  },
  internalLinks: [
    {
      href: "/blog/ai-animation-styles-benchmark",
      label: "AI animation styles benchmark",
    },
    {
      href: "/blog/ai-video-script-skills-benchmark",
      label: "AI video script skills benchmark",
    },
  ],
  relatedPosts: [
    {
      label: "Original Research",
      title: "I made 20 AI animation styles from one voice: 10 minutes to 7 h 30",
      description:
        "20 test videos made with AI animation skills on the same 15-second voice, compared by look, motion, time spent and visible flaws.",
      href: "/blog/ai-animation-styles-benchmark",
    },
    {
      label: "Original Research",
      title: "I tested 15 AI video script skills. Luck mostly wins.",
      description:
        "15 Claude skills and Custom GPTs wrote the same Reel voice-over, scored blind by two AI judges. The best tool exists, but reruns matter more.",
      href: "/blog/ai-video-script-skills-benchmark",
    },
  ],
};
