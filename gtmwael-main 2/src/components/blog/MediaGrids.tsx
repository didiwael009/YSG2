import { useEffect, useMemo, useRef, useState } from "react";
import type { BlogBlock } from "@/content/blog/types";
import { renderInlineText } from "./blocks";

type VideoGridBlock = Extract<BlogBlock, { type: "video-grid" }>;
type StyleGridBlock = Extract<BlogBlock, { type: "style-grid" }>;

const LABEL = "mb-3 inline-block text-[11px] font-black uppercase tracking-[0.09em] text-primary";
const H2 = "mb-4 mt-0 font-display text-[31px] font-bold leading-[1.02] text-[#11101a] md:text-[38px]";
const BODY = "mb-5 text-[17px] leading-[1.65] text-[#3d3849] md:text-[18px]";
const CARD = "overflow-hidden rounded-[20px] border border-[#11111f]/10 bg-[#fbfbfe]";
const CHIP = "rounded-full border px-3 py-1.5 text-xs font-extrabold transition-colors";
const TAG = "rounded-full border border-[#11111f]/10 bg-white px-2.5 py-1 text-[12px] font-semibold text-[#3d3849]";

/** Pauses every other video in the container when one starts with sound. */
const useOneVideoAtATime = (ref: React.RefObject<HTMLElement>, skip?: React.MutableRefObject<boolean>) => {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const onPlay = (event: Event) => {
      if (skip?.current) return;
      const playing = event.target as HTMLVideoElement;
      playing.muted = false;
      root.querySelectorAll("video").forEach((video) => {
        if (video !== playing && !video.paused) video.pause();
      });
    };
    root.addEventListener("play", onPlay, true);
    return () => root.removeEventListener("play", onPlay, true);
  }, [ref, skip]);
};

const Video = ({ src, poster, title }: { src: string; poster: string; title: string }) => (
  <video
    src={src}
    poster={poster}
    controls
    playsInline
    preload="none"
    aria-label={title}
    className="block aspect-[9/16] w-full bg-[#11111f] object-cover"
  />
);

export const VideoGrid = ({ block }: { block: VideoGridBlock }) => {
  const ref = useRef<HTMLDivElement>(null);
  useOneVideoAtATime(ref);

  return (
    <section id={block.id} className="mt-16 scroll-mt-28">
      <span className={LABEL}>{block.label}</span>
      <h2 className={H2}>{block.title}</h2>
      <div className="max-w-[720px]">
        {block.paragraphs.map((p) => (
          <p key={p} className={BODY}>
            {renderInlineText(p)}
          </p>
        ))}
      </div>
      <div ref={ref} className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {block.items.map((item) => (
          <figure key={item.id} id={item.id} className={`${CARD} m-0 flex scroll-mt-28 flex-col`}>
            <Video src={item.src} poster={item.poster} title={item.title} />
            <figcaption className="flex flex-1 flex-col gap-2 p-4">
              <strong className="font-display text-[17px] leading-tight text-[#11101a]">{item.title}</strong>
              <span className="text-[12px] font-semibold text-[#777287]">{item.meta}</span>
              <p className="m-0 text-[14px] leading-[1.55] text-[#3d3849]">{renderInlineText(item.about)}</p>
              <details className="mt-auto border-t border-[#11111f]/10 pt-2">
                <summary className="cursor-pointer text-[12px] font-extrabold uppercase tracking-[0.06em] text-[#554f63] hover:text-primary">
                  {item.transcriptLabel}
                </summary>
                <div className="mt-2 space-y-1.5">
                  {item.transcript.map((line, index) => (
                    <p key={`${index}-${line}`} className="m-0 text-[13.5px] leading-[1.55] text-[#3d3849]">
                      {line}
                    </p>
                  ))}
                </div>
              </details>
            </figcaption>
          </figure>
        ))}
      </div>
      {block.closing?.length ? (
        <div className="mt-8 max-w-[720px]">
          {block.closing.map((p) => (
            <p key={p} className={BODY}>
              {renderInlineText(p)}
            </p>
          ))}
        </div>
      ) : null}
    </section>
  );
};

const SAVED_KEY = "ysg-style-bench-saved";

const readSaved = (): Set<string> => {
  try {
    return new Set(JSON.parse(window.localStorage.getItem(SAVED_KEY) ?? "[]") as string[]);
  } catch {
    return new Set();
  }
};

export const StyleGrid = ({ block }: { block: StyleGridBlock }) => {
  const ref = useRef<HTMLDivElement>(null);
  const together = useRef(false);
  const [filter, setFilter] = useState("all");
  const [saved, setSaved] = useState<Set<string>>(() => new Set());
  const [playingAll, setPlayingAll] = useState(false);
  useOneVideoAtATime(ref, together);

  useEffect(() => setSaved(readSaved()), []);

  const visible = useMemo(
    () =>
      block.items.filter((item) =>
        filter === "all" ? true : filter === "saved" ? saved.has(item.id) : item.families.includes(filter),
      ),
    [block.items, filter, saved],
  );

  const videos = () => Array.from(ref.current?.querySelectorAll("video") ?? []);

  const stopAll = () => {
    together.current = false;
    setPlayingAll(false);
    videos().forEach((v) => v.pause());
  };

  const choose = (key: string) => {
    stopAll();
    setFilter(key);
  };

  const toggleSaved = (id: string) => {
    setSaved((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        window.localStorage.setItem(SAVED_KEY, JSON.stringify([...next]));
      } catch {
        /* storage unavailable: picks last for this visit only */
      }
      return next;
    });
  };

  const playAll = () => {
    if (together.current) return stopAll();
    together.current = true;
    setPlayingAll(true);
    videos().forEach((v) => {
      v.muted = true;
      v.currentTime = 0;
      v.play().catch(() => undefined);
    });
  };

  const chips = [{ key: "all", label: block.ui.all }, ...block.families, { key: "saved", label: `★ ${block.ui.saved}` }];

  return (
    <section id={block.id} className="scroll-mt-28">
      <span className={LABEL}>{block.label}</span>
      <h2 className={H2}>{block.title}</h2>
      {block.paragraphs?.length ? (
        <div className="max-w-[720px]">
          {block.paragraphs.map((p) => (
            <p key={p} className={BODY}>
              {renderInlineText(p)}
            </p>
          ))}
        </div>
      ) : null}

      <div className="sticky top-16 z-10 -mx-2 mt-6 rounded-[16px] bg-white/95 px-2 py-3 backdrop-blur">
        <div className="flex flex-wrap items-center gap-2">
          {chips.map((chip) => (
            <button
              key={chip.key}
              type="button"
              aria-pressed={filter === chip.key}
              onClick={() => choose(chip.key)}
              className={`${CHIP} ${
                filter === chip.key
                  ? "border-[#11111f] bg-[#11111f] text-white"
                  : "border-[#11111f]/15 bg-[#fbfbfe] text-[#554f63] hover:border-primary hover:text-primary"
              }`}
            >
              {chip.label}
            </button>
          ))}
          <button
            type="button"
            onClick={playAll}
            className={`${CHIP} border-primary bg-primary text-white hover:opacity-90`}
          >
            {playingAll ? block.ui.stopAll : block.ui.playAll}
          </button>
          <span className="ml-auto text-[12px] font-semibold text-[#777287]">
            {visible.length} / {block.items.length} {block.ui.count}
          </span>
        </div>
      </div>
      <p className="mt-2 text-[13px] leading-[1.55] text-[#777287]">{block.ui.hint}</p>

      {visible.length === 0 ? <p className="mt-6 text-[15px] text-[#5b5468]">{block.ui.empty}</p> : null}

      <div ref={ref} className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {visible.map((item) => {
          const isSaved = saved.has(item.id);
          return (
            <div
              key={item.id}
              id={`style-${item.id}`}
              className={`${CARD} flex flex-col ${isSaved ? "ring-2 ring-primary" : ""}`}
            >
              <div className="relative">
                <Video src={item.src} poster={item.poster} title={`${item.n} · ${item.name}`} />
                <span className="absolute left-3 top-3 rounded-full bg-[#11111f]/80 px-2.5 py-1 font-display text-[13px] font-bold text-white">
                  {item.n}
                </span>
                <button
                  type="button"
                  aria-label={block.ui.saveLabel}
                  aria-pressed={isSaved}
                  onClick={() => toggleSaved(item.id)}
                  className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full text-[18px] ${
                    isSaved ? "bg-primary text-white" : "bg-[#11111f]/70 text-white/80 hover:text-white"
                  }`}
                >
                  ★
                </button>
              </div>
              <div className="flex flex-1 flex-col gap-2.5 p-4">
                <span className="text-[11px] font-black uppercase tracking-[0.08em] text-primary">{item.familyLabel}</span>
                <h3 className="m-0 font-display text-[19px] font-bold leading-tight text-[#11101a]">{item.name}</h3>
                <span className="text-[12.5px] font-semibold text-[#777287]">
                  {item.url ? (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="underline decoration-primary/40 underline-offset-2 hover:text-primary">
                      {item.repo}
                    </a>
                  ) : (
                    item.repo
                  )}
                </span>
                <p className="m-0 text-[14.5px] leading-[1.55] text-[#11101a]">{item.look}</p>
                <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[13.5px] leading-[1.5]">
                  <dt className="font-extrabold text-[#554f63]">{block.ui.motion}</dt>
                  <dd className="m-0 text-[#3d3849]">{item.motion}</dd>
                  <dt className="font-extrabold text-[#554f63]">{block.ui.time}</dt>
                  <dd className="m-0 text-[#3d3849]">{item.time}</dd>
                </dl>
                <div className="flex flex-wrap gap-1.5">
                  <span className={`${TAG} ${item.flow ? "" : "opacity-70"}`}>{item.flow ? block.ui.flowImages : block.ui.allCode}</span>
                  <span className={TAG}>{item.sound}</span>
                  <span className={`${TAG} ${item.subtitlesOff ? "opacity-70" : ""}`}>
                    {block.ui.subtitles} {item.subtitles}
                  </span>
                </div>
                <ul className="m-0 mt-1 list-disc space-y-1 pl-5 text-[13.5px] leading-[1.5] text-[#3d3849]">
                  {item.flaws.map((flaw) => (
                    <li key={flaw}>{flaw}</li>
                  ))}
                </ul>
                {item.unseen ? (
                  <p className="m-0 mt-auto rounded-[10px] bg-[#fff4ee] px-3 py-2 text-[12.5px] font-semibold text-[#9a3b12]">{block.ui.unseen}</p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
