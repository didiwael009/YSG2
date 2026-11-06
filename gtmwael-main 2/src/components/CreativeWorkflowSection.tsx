import { ArrowDown, ArrowRight, Clapperboard, Globe2, Music2 } from "lucide-react";
import { Link } from "react-router-dom";
import sambalingoPhone from "@/assets/sambalingo-phone.webp";
import sampleVideo from "@/assets/content-sample-video.webp";
import sampleSong from "@/assets/content-sample-song.webp";
import samplePostAr from "@/assets/content-sample-post-ar.webp";
import samplePostFr from "@/assets/content-sample-post-fr.webp";
import pipelineShortlist from "@/assets/pipeline-shortlist.webp";
import pipelineQa from "@/assets/pipeline-qa.webp";
import pipelineCoverFr from "@/assets/pipeline-cover-fr.webp";
import pipelineCoverAr from "@/assets/pipeline-cover-ar.webp";

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

const formats = [
  {
    icon: Clapperboard,
    title: "Animated video",
    body: "2D and 3D characters, mascot sketches and motion graphics with animated captions.",
    tools: "Remotion, Blender, Kling",
  },
  {
    icon: Music2,
    title: "Songs and voice",
    body: "Short songs that teach, jingles and voiceovers. Lyrics checked line by line, karaoke captions.",
    tools: "Suno, ElevenLabs, Whisper",
  },
  {
    icon: Globe2,
    title: "Posts in three languages",
    body: "Carousels, short videos and SEO pages in English, French and Arabic. Written, not translated.",
    tools: "Claude Code, FLUX, Search Console",
  },
];

const focusStyle =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400";

const thumbFrame = "relative aspect-[3/4] w-full max-w-[220px] overflow-hidden rounded-2xl border border-purple-200/15 bg-[#1b1228]";

const FormatThumb = ({ index }: { index: number }) => {
  if (index === 0) {
    return (
      <div className={thumbFrame}>
        <img
          src={sampleVideo}
          alt="A 3D pug in a SambaLingo video: Stop saying obrigado, say this instead"
          width={480}
          height={640}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className={thumbFrame}>
        <img
          src={sampleSong}
          alt="A singing cartoon pug with English and Portuguese karaoke lyrics"
          width={480}
          height={640}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }
  return (
    <div className={`${thumbFrame} bg-[radial-gradient(circle_at_50%_40%,#3a1f57_0%,#1b1228_70%)]`}>
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

type Props = { variant?: "teaser" | "full" };

const CreativeWorkflowSection = ({ variant = "full" }: Props) => {
  const full = variant === "full";
  const Heading = full ? "h1" : "h2";
  return (
  <section
    id="creative-workflow"
    aria-labelledby="creative-workflow-title"
    className="scroll-mt-24 bg-[#140e22] bg-[radial-gradient(ellipse_at_62%_24%,#2e1747_0%,#1a112a_42%,#140e22_74%)] text-foreground"
  >
    <div className={`mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 ${full ? "pb-16 pt-28 lg:pb-24 lg:pt-36" : "pb-16 pt-14 lg:pb-20 lg:pt-20"}`}>
      {/* 1. Proof first: headline, phone, one big number */}
      <div className="grid items-center gap-x-10 gap-y-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-orange-500 bg-orange-600/15 px-4 py-1 text-xs font-bold uppercase tracking-[0.14em] text-orange-100">
            Produce · Content at scale
          </p>
          <Heading
            id="creative-workflow-title"
            className="font-display text-[clamp(2.4rem,5vw,4.25rem)] font-bold leading-[1.02] tracking-tight"
          >
            One system.{" "}
            <span className="whitespace-nowrap text-orange-500 [font-size:inherit] [line-height:inherit]">134 posts.</span>
          </Heading>
          <p className="mt-5 max-w-[50ch] text-base leading-relaxed text-[#d7c8e6] sm:text-lg">
            I build content systems for digital businesses. Videos, songs, animations
            and posts, made with Claude Code and a stack of AI tools. I check every piece.
            You approve it before it goes live.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              to="/book"
              className={`inline-flex min-h-12 items-center gap-3 rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-[#170c20] shadow-[0_6px_24px_#f9731640] hover:bg-orange-400 ${focusStyle}`}
            >
              Build yours
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            {full ? (
              <a
                href="#content-pipeline"
                className={`inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-[#e6dbf2] underline decoration-purple-300/40 underline-offset-4 hover:text-white ${focusStyle}`}
              >
                See how it works
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : (
              <Link
                to="/content-automation"
                className={`inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-[#e6dbf2] underline decoration-purple-300/40 underline-offset-4 hover:text-white ${focusStyle}`}
              >
                See the whole system
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>

        <figure className="relative mx-auto w-full max-w-[420px] pb-12 sm:pb-0">
          <div className="mx-auto w-[78%] [mask-image:radial-gradient(ellipse_72%_76%_at_50%_44%,black_74%,transparent_100%)]">
            <img
              src={sambalingoPhone}
              alt="The SambaLingo Instagram feed on a phone, a grid of pug videos that teach Portuguese"
              width={400}
              height={543}
              loading="lazy"
              decoding="async"
              className="h-auto w-full"
            />
          </div>
          <div className="absolute bottom-0 left-0 rounded-2xl border border-orange-500/40 bg-[#1b1228]/90 px-5 py-4 shadow-[0_12px_40px_#0008] backdrop-blur sm:bottom-[10%] sm:left-[-4%]">
            <span className="block font-display text-6xl font-bold leading-none text-orange-500 sm:text-7xl">134</span>
            <span className="mt-1 block text-sm font-semibold text-foreground">Published in one month</span>
            <span className="mt-0.5 flex items-center gap-1.5 text-xs text-[#d7c8e6]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
              Real content. Live account.
            </span>
          </div>
          <figcaption className="absolute right-0 top-[6%] rounded-full border border-purple-200/25 bg-[#1b1228]/80 px-3 py-1 text-xs font-semibold text-[#e6dbf2] backdrop-blur">
            @sambalingo.app on Instagram
          </figcaption>
        </figure>
      </div>

      {full && (
        <>
      {/* 2. The pipeline, shown with real artifacts from one week of AI News */}
      <div id="content-pipeline" className="mt-16 scroll-mt-24 border-t border-purple-200/15 pt-12 lg:mt-20 lg:pt-14">
        <div className="max-w-[62ch]">
          <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">How the system works</h3>
          <p className="mt-3 text-base leading-relaxed text-[#d7c8e6]">
            This is my own daily feed, AI News, during the first week of November. Your system runs the same way, on your topics.
          </p>
        </div>
        <ol className="mt-10 grid gap-12 md:grid-cols-3 md:gap-8 lg:gap-12" aria-label="From sources to published posts">
          {steps.map(({ title, body, caption, images }) => (
            <li key={title}>
              <figure>
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-[#efe8df] ring-1 ring-purple-200/15">
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
                    <div className="flex h-full items-center justify-center gap-[4%] bg-[#2a1c3d] px-[6%]">
                      {images.map(({ src, alt }) => (
                        <img
                          key={src}
                          src={src}
                          alt={alt}
                          width={360}
                          height={450}
                          loading="lazy"
                          decoding="async"
                          className="h-[86%] w-auto rounded-sm"
                        />
                      ))}
                    </div>
                  )}
                </div>
                <figcaption className="mt-2 text-xs text-purple-200/70">{caption}</figcaption>
              </figure>
              <p className="mt-5 font-display text-lg font-bold leading-snug">{title}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#d7c8e6]">{body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-12 max-w-[70ch] text-sm leading-relaxed text-[#d7c8e6]">
          Running today: SambaLingo, 134 posts in its first month. MisterSMO, an AI social media manager. AI News, every day in three languages. And the{" "}
          <Link
            to="/cro-teardowns"
            className={`rounded-sm font-semibold text-orange-300 underline decoration-orange-300/40 underline-offset-4 hover:text-orange-200 ${focusStyle}`}
          >
            CRO teardowns
          </Link>
          , 20 and counting.
        </p>
      </div>

      {/* 3. What you can order: real samples, three plain columns */}
      <div className="mt-14">
        <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">What I can produce for you</h3>
        <ul className="mt-6 grid gap-10 sm:grid-cols-3 sm:gap-8 lg:gap-10">
          {formats.map(({ icon: Icon, title, body, tools }, index) => (
            <li key={title}>
              <FormatThumb index={index} />
              <p className="mt-5 flex items-center gap-2.5 font-display text-lg font-bold leading-snug">
                <Icon className="h-5 w-5 shrink-0 text-orange-400" aria-hidden="true" />
                {title}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-[#d7c8e6]">{body}</p>
              <p className="mt-3 text-[13px] font-semibold tracking-wide text-[#e6dbf2]">{tools}</p>
            </li>
          ))}
        </ul>
      </div>
        </>
      )}
    </div>
  </section>
  );
};

export default CreativeWorkflowSection;
