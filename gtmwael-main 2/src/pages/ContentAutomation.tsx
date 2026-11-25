import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, ArrowUpRight, Clapperboard, Globe2, Music2, Play } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { BOOKING_URL } from "@/lib/constants";
import { CONTENT_AUTOMATION_COPY as C } from "@/content/contentAutomation";
import { CREAM, HEAVY, INK, LIME, SERIF } from "@/components/creative2/style";
import sambalingoPhone from "@/assets/sambalingo-phone.webp";
import sampleVideo from "@/assets/content-sample-video.webp";
import sampleSong from "@/assets/content-sample-song.webp";
import samplePostAr from "@/assets/content-sample-post-ar.webp";
import samplePostFr from "@/assets/content-sample-post-fr.webp";
import pipelineShortlist from "@/assets/pipeline-shortlist.webp";
import pipelineQa from "@/assets/pipeline-qa.webp";
import pipelineCoverFr from "@/assets/pipeline-cover-fr.webp";
import pipelineCoverAr from "@/assets/pipeline-cover-ar.webp";

const focusDark =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c6f432]";
const focusLight =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0e0e0e]";

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

/** Eyebrow + two-line title (heavy, then serif italic), the creative-2 heading. */
const Heading = ({
  id,
  eyebrow,
  line1,
  line2,
  dark,
  as: Tag = "h2",
}: {
  id: string;
  eyebrow: string;
  line1: string;
  line2: string;
  dark: boolean;
  as?: "h1" | "h2";
}) => (
  <>
    <p className="mb-4 text-sm font-bold uppercase tracking-widest" style={dark ? { color: LIME } : undefined}>
      {eyebrow}
    </p>
    <Tag id={id} className="leading-[0.95] tracking-[-0.03em]">
      <span className="block text-5xl md:text-6xl lg:text-7xl" style={HEAVY}>{line1}</span>
      <span className="mt-1 block text-5xl md:text-6xl lg:text-7xl" style={SERIF}>{line2}</span>
    </Tag>
  </>
);

/* 1. Hero: the claim, the phone, the booking link */
const Hero = () => {
  const h = C.hero;
  return (
    <section aria-labelledby="ca-title" className="relative overflow-hidden font-body" style={{ background: CREAM, color: INK }}>
      <div className="container px-4 pb-20 pt-32 md:pb-28 md:pt-40">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p
              className="mb-6 inline-flex rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.06em]"
              style={{ background: LIME, color: INK }}
            >
              {h.eyebrow}
            </p>
            <h1 id="ca-title" className="leading-[0.95] tracking-[-0.03em]">
              <span className="block text-[clamp(3rem,7vw,5.75rem)] leading-[0.95]" style={HEAVY}>{h.titleLine1}</span>
              <span className="mt-2 block text-[clamp(2.4rem,5.2vw,4.75rem)] leading-[1.02]" style={SERIF}>{h.titleLine2}</span>
            </h1>
            <p className="mt-7 max-w-[52ch] text-lg leading-relaxed md:text-xl" style={{ color: "#333" }}>{h.body}</p>
            <div className="mt-9 flex flex-wrap items-start gap-4">
              <div className="flex flex-col items-center">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group inline-flex min-h-12 items-center gap-2 rounded-xl px-7 py-3 font-bold text-white transition-transform hover:-translate-y-0.5 ${focusLight}`}
                  style={{ background: INK }}
                >
                  {h.primaryCta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </a>
                <p className="mt-2 text-sm italic" style={{ color: "#333" }}>{h.note}</p>
              </div>
              <a
                href="#ca-numbers"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("ca-numbers");
                }}
                className={`inline-flex min-h-12 items-center gap-2 rounded-xl px-7 py-3 font-semibold transition-colors hover:bg-black/5 ${focusLight}`}
                style={{ border: `1.5px solid ${INK}` }}
              >
                {h.secondaryCta}
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <figure className="relative mx-auto w-full max-w-[400px]">
            <div className="absolute inset-[8%] -z-0 rounded-full" style={{ background: LIME, opacity: 0.55, filter: "blur(60px)" }} aria-hidden="true" />
            <div className="relative mx-auto w-[82%] overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-25px_#0007]">
              <img src={sambalingoPhone} alt={h.phoneAlt} width={400} height={543} decoding="async" fetchPriority="high" className="h-auto w-full" />
            </div>
            <figcaption
              className="absolute right-0 top-[6%] rounded-full px-3 py-1 text-xs font-semibold text-white"
              style={{ background: INK }}
            >
              {h.phoneChip}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};

/* 2. SambaLingo analytics, from the daily stats dashboard */
const Numbers = () => {
  const n = C.numbers;
  const max = Math.max(...n.concepts.map((c) => c.avgViews));
  return (
    <section id="ca-numbers" aria-labelledby="ca-numbers-title" className="section-padding scroll-mt-20 font-body" style={{ background: INK, color: CREAM }}>
      <div className="container px-4">
        <div className="mx-auto mb-12 flex max-w-6xl flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <Heading id="ca-numbers-title" eyebrow={n.eyebrow} line1={n.titleLine1} line2={n.titleLine2} dark />
          </div>
          <p className="max-w-md text-base leading-relaxed text-white/75 md:text-lg">{n.intro}</p>
        </div>

        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl p-7 md:p-10" style={{ background: LIME, color: INK }}>
            <p className="leading-[0.9] tracking-tight text-[clamp(3.5rem,11vw,7.5rem)]" style={HEAVY}>{n.totalViews}</p>
            <p className="mt-2 text-2xl md:text-3xl" style={SERIF}>{n.totalLabel}</p>
          </div>

          <ul className="mt-4 grid grid-cols-2 gap-3 sm:mt-6 sm:gap-4 lg:grid-cols-4">
            {n.platforms.map((p) => (
              <li key={p.handle} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-6">
                <p className="text-xs font-bold uppercase tracking-widest sm:text-sm" style={{ color: LIME }}>{p.platform}</p>
                <p className="mt-1 truncate text-sm text-white/70">{p.handle}</p>
                <p className="mt-4 text-3xl tracking-tight sm:mt-6 sm:text-4xl md:text-5xl" style={HEAVY}>{p.views}</p>
                <p className="mt-1 text-sm text-white/75 sm:text-base">views · {p.videos}</p>
              </li>
            ))}
          </ul>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
              <h3 className="text-2xl" style={HEAVY}>{n.topTitle}</h3>
              <p className="mt-1 text-base text-white/70">{n.topIntro}</p>
              <ol className="mt-6">
                {n.top.map((v, i) => (
                  <li key={v.url} className="border-t border-white/10 first:border-t-0">
                    <a
                      href={v.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group grid grid-cols-[2rem_1fr_auto] items-baseline gap-3 rounded-sm py-4 ${focusDark}`}
                    >
                      <span className="text-2xl leading-none" style={{ ...HEAVY, color: LIME }}>{i + 1}</span>
                      <span>
                        <span className="block text-base font-semibold leading-snug group-hover:underline group-hover:underline-offset-4">{v.title}</span>
                        <span className="mt-0.5 flex items-center gap-1 text-sm text-white/60">
                          {v.date} · Instagram
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                      </span>
                      <span className="text-xl tabular-nums" style={HEAVY}>{v.views}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
              <h3 className="text-2xl" style={HEAVY}>{n.conceptsTitle}</h3>
              <p className="mt-1 text-base text-white/70">{n.conceptsIntro}</p>
              <ul className="mt-6 space-y-4">
                {n.concepts.map((c) => (
                  <li key={c.name}>
                    <div className="flex items-baseline justify-between gap-3 text-base">
                      <span className="font-semibold">
                        {c.name} <span className="text-sm font-normal text-white/60">· {c.videos} videos</span>
                      </span>
                      <span className="tabular-nums" style={HEAVY}>{c.avgViews.toLocaleString("en-US")}</span>
                    </div>
                    <div className="mt-1.5 h-2.5 rounded-full bg-white/10" aria-hidden="true">
                      <div className="h-full rounded-full" style={{ width: `${(c.avgViews / max) * 100}%`, background: LIME }} />
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-lg leading-snug" style={SERIF}>{n.insight}</p>
            </div>
          </div>

          <p className="mt-6 text-sm text-white/55">{n.source}</p>
        </div>
      </div>
    </section>
  );
};

/* 3. Showcase video: click-to-play, only the thumbnail loads until play */
const SHOWCASE_ID = "TVedsBTxMsE";
const SHOWCASE_TITLE = "AI workflow showcase";

const VideoShowcase = () => {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl shadow-[0_30px_80px_-30px_#000a]" style={{ background: INK }}>
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${SHOWCASE_ID}?autoplay=1&rel=0`}
          title={SHOWCASE_TITLE}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play the video: ${SHOWCASE_TITLE}`}
          className={`group absolute inset-0 h-full w-full ${focusLight}`}
        >
          <img
            src={`https://i.ytimg.com/vi/${SHOWCASE_ID}/maxresdefault.jpg`}
            alt=""
            width={1280}
            height={720}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
          <span
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-[0_8px_30px_#0008] transition-transform group-hover:scale-105 sm:h-20 sm:w-20"
            style={{ background: LIME, color: INK }}
          >
            <Play className="ml-1 h-7 w-7 fill-current sm:h-8 sm:w-8" aria-hidden="true" />
          </span>
        </button>
      )}
    </div>
  );
};

const Showcase = () => {
  const s = C.showcase;
  return (
    <section id="ca-showcase" aria-labelledby="ca-showcase-title" className="section-padding scroll-mt-20 font-body" style={{ background: CREAM, color: INK }}>
      <div className="container px-4">
        <div className="mx-auto mb-12 flex max-w-6xl flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <Heading id="ca-showcase-title" eyebrow={s.eyebrow} line1={s.titleLine1} line2={s.titleLine2} dark={false} />
          </div>
          <p className="max-w-md text-base leading-relaxed md:text-lg" style={{ color: "#333" }}>{s.intro}</p>
        </div>
        <figure className="mx-auto max-w-6xl">
          <VideoShowcase />
          <figcaption className="mt-3 text-sm" style={{ color: "#555" }}>{s.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
};

/* 4. The pipeline, shown with real artifacts from one week of AI News */
type Step = { title: string; body: string; caption: string; images: { src: string; alt: string }[] };

const steps: Step[] = [
  {
    title: "A shortlist every morning",
    body: "A script reads the AI subreddits every morning. The stories worth a look land on one page, with votes and comments. I tick five to seven.",
    caption: "The shortlist page, 5 November.",
    images: [{ src: pipelineShortlist, alt: "The daily shortlist page: Reddit stories with votes, comments and a checkbox to pick each one" }],
  },
  {
    title: "Claude Code makes it, then checks it",
    body: "Agents write the carousel and the video. A check pulls frames from every render, so I catch a bad slide before anyone else sees it.",
    caption: "Control frames from the 3 November video.",
    images: [{ src: pipelineQa, alt: "Six control frames taken from an AI News video in French" }],
  },
  {
    title: "Three languages, one queue",
    body: "French, English and Arabic, each written for its readers. One registry, so no topic runs twice.",
    caption: "French and Arabic covers, 3 November.",
    images: [
      { src: pipelineCoverFr, alt: "AI News carousel cover in French" },
      { src: pipelineCoverAr, alt: "AI News carousel cover in Arabic, same day" },
    ],
  },
];

const Pipeline = () => {
  const p = C.pipeline;
  return (
    <section id="content-pipeline" aria-labelledby="ca-pipeline-title" className="section-padding scroll-mt-20 font-body" style={{ background: INK, color: CREAM }}>
      <div className="container px-4">
        <div className="mx-auto mb-12 flex max-w-6xl flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <Heading id="ca-pipeline-title" eyebrow={p.eyebrow} line1={p.titleLine1} line2={p.titleLine2} dark />
          </div>
          <p className="max-w-md text-base leading-relaxed text-white/75 md:text-lg">{p.intro}</p>
        </div>

        <ol className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3" aria-label="From sources to published posts">
          {steps.map(({ title, body, caption, images }, i) => (
            <li key={title} className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-6">
              <figure>
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#efe8df]">
                  {images.length === 1 ? (
                    <img
                      src={images[0].src}
                      alt={images[0].alt}
                      width={640}
                      height={400}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-left-top"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center gap-[4%] px-[6%]" style={{ background: "#1f1f1f" }}>
                      {images.map(({ src, alt }) => (
                        <img key={src} src={src} alt={alt} width={360} height={450} loading="lazy" decoding="async" className="h-[86%] w-auto rounded-sm" />
                      ))}
                    </div>
                  )}
                </div>
                <figcaption className="mt-2 text-xs text-white/55">{caption}</figcaption>
              </figure>
              <span className="mt-6 text-4xl leading-none" style={{ ...HEAVY, color: LIME }}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-2xl leading-tight" style={HEAVY}>{title}</h3>
              <p className="mt-2 text-base leading-relaxed text-white/75">{body}</p>
            </li>
          ))}
        </ol>

        <p className="mx-auto mt-12 max-w-6xl text-xl leading-snug md:text-2xl" style={SERIF}>
          {p.runningBefore}
          <Link to="/cro-teardowns" className={`rounded-sm underline decoration-[#c6f432] decoration-2 underline-offset-4 hover:text-white ${focusDark}`}>
            {p.runningLink}
          </Link>
          {p.runningAfter}
        </p>
      </div>
    </section>
  );
};

/* 5. What you can order: real samples */
const formats = [
  { icon: Clapperboard, title: "Animated video", body: "2D and 3D characters, mascot sketches and motion graphics with animated captions.", tools: "Remotion, Blender, Kling" },
  { icon: Music2, title: "Songs and voice", body: "Short songs that teach, jingles and voiceovers. Lyrics checked line by line, karaoke captions.", tools: "Suno, ElevenLabs, Whisper" },
  { icon: Globe2, title: "Posts in three languages", body: "Carousels, short videos and SEO pages in English, French and Arabic. Written, not translated.", tools: "Claude Code, FLUX, Search Console" },
];

const FormatThumb = ({ index }: { index: number }) => {
  const frame = "relative aspect-[4/5] w-full overflow-hidden rounded-xl";
  if (index < 2) {
    const [src, alt] =
      index === 0
        ? [sampleVideo, "A 3D pug in a SambaLingo video: Stop saying obrigado, say this instead"]
        : [sampleSong, "A singing cartoon pug with English and Portuguese karaoke lyrics"];
    return (
      <div className={frame} style={{ background: INK }}>
        <img src={src} alt={alt} width={480} height={640} loading="lazy" decoding="async" className="h-full w-full object-cover" />
      </div>
    );
  }
  return (
    <div className={frame} style={{ background: INK }}>
      <img
        src={samplePostFr}
        alt="AI News carousel cover in French, newspaper style"
        width={360}
        height={450}
        loading="lazy"
        decoding="async"
        className="absolute left-[8%] top-[10%] w-[58%] -rotate-6 rounded-lg shadow-[0_10px_30px_#0009]"
      />
      <img
        src={samplePostAr}
        alt="The same AI News carousel cover written in Arabic"
        width={360}
        height={450}
        loading="lazy"
        decoding="async"
        className="absolute bottom-[8%] right-[8%] w-[58%] rotate-3 rounded-lg shadow-[0_10px_30px_#0009]"
      />
    </div>
  );
};

const Formats = () => {
  const f = C.formats;
  return (
    <section aria-labelledby="ca-formats-title" className="section-padding font-body" style={{ background: CREAM, color: INK }}>
      <div className="container px-4">
        <div className="mx-auto mb-12 flex max-w-6xl flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <Heading id="ca-formats-title" eyebrow={f.eyebrow} line1={f.titleLine1} line2={f.titleLine2} dark={false} />
          </div>
          <p className="max-w-sm text-base leading-relaxed md:text-lg" style={{ color: "#333" }}>{f.intro}</p>
        </div>
        <ul className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3 lg:gap-8">
          {formats.map(({ icon: Icon, title, body, tools }, index) => (
            <li key={title} className="relative flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white/60 p-5 md:p-6">
              <span className="absolute inset-x-0 top-0 h-1.5" style={{ background: INK }} aria-hidden="true" />
              <FormatThumb index={index} />
              <h3 className="mt-6 flex items-center gap-2.5 text-2xl tracking-tight md:text-3xl" style={HEAVY}>
                <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                {title}
              </h3>
              <p className="mt-2 text-base leading-snug" style={{ color: "#333" }}>{body}</p>
              <p className="mt-auto pt-5 text-sm font-semibold tracking-wide" style={{ color: "#555" }}>{tools}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

/* 6. Closing call to action */
const FinalCta = () => {
  const c = C.finalCta;
  return (
    <section aria-label="Book a call" className="section-padding-sm font-body" style={{ background: INK, color: CREAM }}>
      <div className="container flex flex-col items-center px-4 text-center">
        <p className="max-w-2xl text-4xl leading-tight md:text-5xl" style={SERIF}>{c.line}</p>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`group mt-8 inline-flex min-h-12 items-center gap-2 rounded-full px-7 py-3 text-base font-bold hover:brightness-95 ${focusDark}`}
          style={{ background: LIME, color: INK }}
        >
          {c.button}
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </a>
        <p className="mt-3 text-sm italic text-white/60">{c.note}</p>
      </div>
    </section>
  );
};

const ContentAutomation = () => (
  <main id="main" className="min-h-screen overflow-x-clip" style={{ background: INK }}>
    <Navigation />
    <Hero />
    <Numbers />
    <Showcase />
    <Pipeline />
    <Formats />
    <FinalCta />
    <Footer hideCTA />
  </main>
);

export default ContentAutomation;
