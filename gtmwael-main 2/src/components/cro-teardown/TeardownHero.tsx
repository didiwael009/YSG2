import type { CroTeardownPost } from "@/lib/cro-teardown";

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" }).format(
    new Date(`${date}T00:00:00`),
  );

const TeardownHero = ({ post }: { post: CroTeardownPost }) => {
  const firstSnapshot = post.snapshots[0];
  const lastSnapshot = post.snapshots[post.snapshots.length - 1];

  return (
    <header className="bg-[radial-gradient(circle_at_15%_0%,rgba(124,60,255,0.28),transparent_30%),radial-gradient(circle_at_85%_5%,rgba(255,91,31,0.22),transparent_30%),linear-gradient(135deg,#090713_0%,#170920_46%,#070711_100%)] pb-16 pt-32 md:pb-20 md:pt-36">
      <div className="container mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
        <div>
          <span className="mb-3 inline-block text-[11px] font-black uppercase tracking-[0.09em] text-primary">
            {post.category}
          </span>
          <h1 className="max-w-[820px] font-display text-[38px] font-black leading-[0.98] text-white md:text-[60px]">
            {post.h1}
          </h1>
          <p className="mt-6 max-w-[580px] text-[18px] leading-[1.58] text-[#cec8dd]">
            {post.excerpt}
          </p>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-[13px] font-bold text-white">
              {post.fromLabel}
            </span>
            <span className="text-[13px] text-white/40">→</span>
            <span className="text-[13px] font-bold text-primary">{post.toLabel}</span>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-2 text-xs font-extrabold text-[#e5dfef]">
              By {post.author}
            </span>
            <time
              dateTime={post.datePublished}
              className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-2 text-xs font-extrabold text-[#e5dfef]"
            >
              {formatDate(post.datePublished)}
            </time>
            <span className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-2 text-xs font-extrabold text-[#e5dfef]">
              {post.readTime}
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-2 text-xs font-extrabold text-[#e5dfef]">
              {post.snapshots.length} snapshots
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { snap: firstSnapshot, label: post.fromLabel, accent: false },
            { snap: lastSnapshot, label: post.toLabel, accent: true },
          ].map(({ snap, label, accent }) => (
            <figure
              key={snap.month}
              className="overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.06] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
            >
              <div className="overflow-hidden rounded-[14px]">
                <img
                  src={snap.screenshotPath}
                  alt={`${post.companyName} homepage — ${label}`}
                  width={720}
                  height={450}
                  className="h-[200px] w-full object-cover object-top md:h-[240px]"
                  decoding="async"
                />
              </div>
              <figcaption className="mt-2 px-1 pb-0.5">
                <span
                  className={`text-[11px] font-black ${accent ? "text-primary" : "text-white/50"}`}
                >
                  {label}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </header>
  );
};

export default TeardownHero;
