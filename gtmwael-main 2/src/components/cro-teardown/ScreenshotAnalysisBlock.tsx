import type { AnalysisBlock } from "@/lib/cro-teardown";

const ScreenshotAnalysisBlock = ({ block }: { block: AnalysisBlock }) => (
  <div id={block.id} className="scroll-mt-28">
    <div className="mb-3 text-[11px] font-black uppercase tracking-[0.08em] text-[#9990a8]">
      {block.label}
    </div>
    <h3 className="mb-5 font-display text-[23px] font-bold leading-tight text-[#11101a] md:text-[28px]">
      {block.heading}
    </h3>

    <div className={`grid gap-6 lg:items-start ${block.screenshotMissing ? "" : "lg:grid-cols-[1fr_380px]"}`}>
      {!block.screenshotMissing && (
        <a
          href={block.screenshotPath}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
          aria-label={`View full screenshot — ${block.label}`}
        >
          <div className="overflow-hidden rounded-[18px] border border-[#11111f]/10 shadow-[0_8px_40px_rgba(7,7,17,0.10)] transition-shadow duration-200 group-hover:shadow-[0_12px_50px_rgba(7,7,17,0.16)]">
            <img
              src={block.screenshotPath}
              alt={`Homepage screenshot — ${block.label}`}
              width={1440}
              height={900}
              loading="lazy"
              decoding="async"
              className="h-[420px] w-full object-cover object-top md:h-[520px]"
            />
          </div>
          <p className="mt-2 text-center text-[12px] text-[#9990a8]">
            Click to view full screenshot
          </p>
        </a>
      )}

      <div className="rounded-[18px] border border-[#11111f]/10 bg-[#fafafe] p-5">
        <div className="mb-4 text-[11px] font-black uppercase tracking-[0.08em] text-primary">
          Observations
        </div>
        <ul className="m-0 list-none p-0 space-y-0">
          {block.annotations.map((annotation, index) => (
            <li
              key={annotation}
              className="flex gap-3 border-b border-[#11111f]/08 py-3.5 last:border-0"
            >
              <span className="mt-0.5 flex-none text-[11px] font-black text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mb-0 text-[14.5px] leading-[1.65] text-[#3f394b]">{annotation}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export default ScreenshotAnalysisBlock;
