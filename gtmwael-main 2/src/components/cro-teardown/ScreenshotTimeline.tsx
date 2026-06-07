import type { SnapshotEntry } from "@/lib/cro-teardown";

const ScreenshotTimeline = ({ snapshots }: { snapshots: SnapshotEntry[] }) => (
  <section id="timeline" className="scroll-mt-28">
    <span className="mb-3 inline-block text-[11px] font-black uppercase tracking-[0.09em] text-primary">
      Visual timeline
    </span>
    <h2 className="mb-2 font-display text-[31px] font-bold leading-[1.02] text-[#11101a] md:text-[38px]">
      Homepage snapshots over time
    </h2>
    <p className="mb-6 text-[15px] leading-[1.6] text-[#5b5468]">
      Each thumbnail shows the above-the-fold area of the homepage at that point in time.
      Scroll to compare.
    </p>

    <div className="relative -mx-6 px-6 md:-mx-0 md:px-0">
      <div className="flex gap-4 overflow-x-auto pb-4 md:gap-5" style={{ scrollSnapType: "x mandatory" }}>
        {snapshots.map((snap, index) => (
          <div
            key={snap.month}
            className="flex-none"
            style={{ scrollSnapAlign: "start", width: "200px" }}
          >
            <a
              href={snap.screenshotPath}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative overflow-hidden rounded-[14px] border border-[#11111f]/10 bg-[#f0eef8] shadow-[0_4px_20px_rgba(7,7,17,0.07)] transition-shadow duration-200 group-hover:shadow-[0_8px_32px_rgba(7,7,17,0.14)]">
                <img
                  src={snap.screenshotPath}
                  alt={`Hootsuite homepage — ${snap.label}`}
                  width={1440}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  className="h-[260px] w-full object-cover object-top"
                />
                {(index === 0 || index === snapshots.length - 1) && (
                  <div
                    className={`absolute left-2.5 top-2.5 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.06em] ${
                      index === 0
                        ? "bg-[#11111f] text-white"
                        : "bg-primary text-white"
                    }`}
                  >
                    {index === 0 ? "Start" : "Latest"}
                  </div>
                )}
              </div>
            </a>
            <div className="mt-2.5 text-center">
              <span className="text-[13px] font-bold text-[#2c2635]">{snap.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute right-0 top-0 hidden h-[260px] w-12 bg-gradient-to-l from-white md:block" />
    </div>
  </section>
);

export default ScreenshotTimeline;
