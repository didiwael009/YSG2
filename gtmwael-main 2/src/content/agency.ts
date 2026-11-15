// Copy for the hidden /agency page (mockup v3, approved 2026-11-15).
// Site copy rules: English, no em-dashes, no bold markup.
import pilauCampaign from "@/assets/agency/pilau-campaign.webp";
import pilauGreen from "@/assets/agency/pilau-green.webp";
import pilauPink from "@/assets/agency/pilau-pink.webp";
import pilauColors from "@/assets/agency/pilau-colors.webp";
import fediOoredoo from "@/assets/agency/fedi-ooredoo.webp";
import fediTunisair from "@/assets/agency/fedi-tunisair.webp";
import fediAbida from "@/assets/agency/fedi-abida.webp";
import fediKitkat from "@/assets/agency/fedi-kitkat.webp";
import fediPortrait from "@/assets/agency/fedi-portrait.webp";
import waelInTheLoop from "@/assets/agency/wael-intheloop.webp";
import waelSambalingo from "@/assets/casestudy-sambalingo.webp";
import waelPubrella from "@/assets/landing-pubwrite.jpg";

export type AgencyPerson = {
  id: "sirine" | "fedi" | "wael";
  name: string;
  short: string;
  role: string;
  bio: string;
  initials: string;
  photo?: string;
  link: { label: string; href: string };
};

export type AgencyProject = {
  title: string;
  label: string;
  /** External URL, a site path starting with "/", or none (card without link). */
  href?: string;
  image: string;
  alt: string;
};

const SIRINE_FIGMA = "https://www.figma.com/proto/UHJGcTDg637GiBYmO06m9b/portfolio";
const FEDI_BEHANCE = "https://www.behance.net/amamifedi";

export const AGENCY_HERO = {
  badge: "Creative team + automation",
  line1: "We create.",
  line2: "I scale it.",
  sub: "Sirine, Fedi and I design the look of your brand. Then I turn that look into a system that makes and publishes content at volume.",
  clientsLabel: "Their work for",
  clients: ["Pilau", "Ooredoo", "Tunisair", "ABIDA", "Kitkat"],
  frameCaption: "Pilau, by Sirine Aouididi",
};

export const AGENCY_HERO_IMAGE = {
  src: pilauCampaign,
  alt: "Pilau summer campaign by Sirine Aouididi",
};

export const AGENCY_TEAM: { eyebrow: string; line1: string; line2: string; people: AgencyPerson[] } = {
  eyebrow: "The team",
  line1: "Three designers.",
  line2: "One production line.",
  people: [
    {
      id: "sirine",
      name: "Sirine Aouididi",
      short: "Sirine",
      role: "Creative director, designer",
      initials: "SA",
      bio: "CEO of N°619 Studio. She builds brand identities, like Pilau swimwear. Works in Arabic, French, English and Italian.",
      link: { label: "Portfolio on Figma", href: SIRINE_FIGMA },
    },
    {
      id: "fedi",
      name: "Fedi Amami",
      short: "Fedi",
      role: "Art director, graphic designer",
      initials: "FA",
      photo: fediPortrait,
      bio: "Based in Fribourg, Switzerland. Art director at Kyubi in Tunisia. Projects for Ooredoo Tunisie, Tunisair, Kitkat and ABIDA.",
      link: { label: "Portfolio on Behance", href: FEDI_BEHANCE },
    },
    {
      id: "wael",
      name: "Wael Aouididi",
      short: "Wael",
      role: "Designer, automation",
      initials: "WA",
      photo: "/hero-portrait-256.webp",
      bio: "Design graduate. Builds content systems with Claude Code and a stack of AI tools. Top Rated on Upwork.",
      link: { label: "His creative work", href: "/creative" },
    },
  ],
};

export const AGENCY_WORK = {
  eyebrow: "The work",
  line1: "Brands they",
  line2: "already shaped",
  pilau: {
    name: "Pilau",
    credit: "Sirine Aouididi, creative director",
    word: "Swimwear",
    tagline: "a brand identity, from crest to campaign",
    sentence: "Editorial look, cream grounds, retro stripes and a crest logo, declined in colour variants.",
    images: [
      { src: pilauGreen, alt: "Green Pilau swimsuit with embroidered starfish" },
      { src: pilauPink, alt: "Pink Pilau swimsuit with floral embroidery" },
      { src: pilauColors, alt: "Pilau logo colour variants" },
    ],
    link: { label: "See it on Figma", href: SIRINE_FIGMA },
  },
  fediTitle: "selected projects",
  fediProjects: [
    { title: "Ooredoo Tunisie", label: "Social media", href: "https://www.behance.net/gallery/46196185/Ooredoo-Tunisie-Social-Media", image: fediOoredoo, alt: "" },
    { title: "Tunisair", label: "Campaign", href: "https://www.behance.net/gallery/46196829/Tunisair", image: fediTunisair, alt: "" },
    { title: "ABIDA", label: "Rebranding", href: "https://www.behance.net/gallery/95050249/Rebranding-ABIDA", image: fediAbida, alt: "" },
    { title: "Kitkat", label: "The game", href: "https://www.behance.net/gallery/47905535/Kitkat-The-game", image: fediKitkat, alt: "" },
  ] as AgencyProject[],
  waelTitle: "selected projects",
  waelProjects: [
    { title: "SambaLingo", label: "Content system", href: "/content-automation", image: waelSambalingo, alt: "" },
    { title: "InTheLoop", label: "iPhone app design", image: waelInTheLoop, alt: "" },
    { title: "Pubrella", label: "Full SaaS rebrand", href: "/case-study/pubrella", image: waelPubrella, alt: "" },
  ] as AgencyProject[],
};

export const AGENCY_AUTOMATION = {
  badge: "Produce · Content at scale",
  line1: "One system.",
  line2: "134 posts.",
  body: "Videos, songs, animations and posts, made with Claude Code and a stack of AI tools. I check every piece. You approve it before it goes live.",
  stats: [
    { value: "134", label: "posts" },
    { value: "3", label: "languages" },
  ],
};

export const AGENCY_PROCESS = {
  eyebrow: "How it works",
  line1: "One look,",
  line2: "made a hundred times",
  steps: [
    { title: "We set the look", body: "Sirine, Fedi and I design the identity, the art direction and the templates every post starts from." },
    { title: "I build the system", body: "I turn those templates into a pipeline of AI tools and scripts that makes new pieces in the same look." },
    { title: "Content ships at volume", body: "Posts, videos and visuals, in several languages. I check every piece. You approve it before it goes live." },
  ],
  ctaLine: "Get the look. Then the volume.",
  ctaLabel: "Book a call",
  ctaNote: "Free · no commitment",
};
