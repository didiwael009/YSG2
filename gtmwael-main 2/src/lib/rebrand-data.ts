import landingClarrio from "@/assets/landing-clarrio.jpg";
import landingZembra from "@/assets/landing-zembra.png";
import landingBottlenexus from "@/assets/landing-bottlenexus.jpg";
import landingShipzzer from "@/assets/landing-shipzzer.jpg";
import landingPubwrite from "@/assets/landing-pubwrite.jpg";

export const rebrandingProjects = [
  {
    title: "Pubrella",
    description: "Full SaaS rebrand — Led complete brand identity, visual direction, and product positioning",
    link: "https://pubrella.com/",
    category: "SaaS",
    role: "Full Rebrand",
    cover: landingPubwrite,
    featured: true,
  },
  {
    title: "BottleNexus",
    description: "Alcohol DTC technology — Oversaw rebrand and page design direction",
    link: "https://bottlenexus.com/",
    category: "E-commerce",
    role: "Project Lead",
    cover: landingBottlenexus,
  },
  {
    title: "Zembra",
    description: "Reviews API platform — Led product positioning and page strategy",
    link: "https://zembra.io",
    category: "SaaS",
    role: "Project Lead",
    cover: landingZembra,
  },
  {
    title: "Clarrio.ai",
    description: "Healthcare AI platform — Directed messaging and conversion flow",
    link: "https://clarrio.ai",
    category: "HealthTech",
    role: "Project Lead",
    cover: landingClarrio,
  },
  {
    title: "Shipzzer",
    description: "Depot management SaaS — Led positioning and page strategy",
    link: "https://shipzzer.com",
    category: "Logistics",
    role: "Project Lead",
    cover: landingShipzzer,
  },
];

// Pubrella, Zembra and Clarrio are purple or blue; Shipzzer and BottleNexus are light: alternate them.
const SPACED_ORDER = ["Pubrella", "Shipzzer", "Zembra", "BottleNexus", "Clarrio.ai"];
export const brandsSpaced = [...rebrandingProjects].sort(
  (a, b) => SPACED_ORDER.indexOf(a.title) - SPACED_ORDER.indexOf(b.title),
);
