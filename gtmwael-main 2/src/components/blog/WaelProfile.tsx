import { Link } from "react-router-dom";

export const PROFILE_COPY =
  "Written by Wael. I rebuild sites, run content and ads for digital businesses and agencies.";

export const DARK_BAND = "linear-gradient(180deg,hsl(240 30% 6%),hsl(260 35% 12%))";
const BUTTON = "linear-gradient(135deg,hsl(16 90% 55%),hsl(30 90% 50%))";

const Portrait = ({ size }: { size: number }) => (
  <img
    src="/hero-portrait-256.webp"
    width={size}
    height={size}
    alt="Wael"
    loading="lazy"
    className="shrink-0 rounded-full object-cover"
    style={{ width: size, height: size }}
  />
);

const WorkButton = () => (
  <Link
    to="/book"
    className="inline-block rounded-full px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
    style={{ background: BUTTON }}
  >
    Work with me
  </Link>
);

/** Full-width dark band closing the magazine home. */
export const ProfileBand = () => (
  <section style={{ background: DARK_BAND }} className="text-white">
    <div className="mx-auto flex w-full max-w-[1240px] flex-col items-start gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-center lg:px-8">
      <Portrait size={72} />
      <p className="flex-1 text-xl leading-snug" style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 500 }}>
        {PROFILE_COPY}
      </p>
      <WorkButton />
    </div>
  </section>
);
