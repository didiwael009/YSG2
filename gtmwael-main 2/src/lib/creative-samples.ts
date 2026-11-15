// Samples for /creative-2 "Selected work".
// Ads: Wael's Behance gallery 234607371 "Saas B2B Content Creation".
// Posts: Wael's Behance gallery 219845367 "Social Media contents" (Samsung Tunisia, Safi, KitKat, Saida).
// Apps: Wael's own iPhone screenshots (GymVoice, SambaLingo), sent 15 Nov 2026.

export type Sample = { src: string; alt: string; width: number; height: number };
export type AppSample = { name: string; icon: string; url?: string; screens: Sample[] };

export const ADS_URL = "https://www.behance.net/gallery/234607371/Saas-B2B-Content-Creation";
export const POSTS_URL = "https://www.behance.net/gallery/219845367/Social-Media-contents";

// Interleaved so no two Shipzzer ads (or the two Pubrella ads) sit side by side.
export const adSamples: Sample[] = [
  { src: "/creative2/work/ad-08.webp", alt: "Shipzzer ad: falling containers above a container wall, From chaos to clarity", width: 600, height: 1075 },
  { src: "/creative2/work/ad-01.webp", alt: "Pubrella ad: a boxer and the line Stop fighting ChatGPT threads", width: 600, height: 900 },
  { src: "/creative2/work/ad-03.webp", alt: "Shipzzer ad in French about time saved", width: 600, height: 600 },
  { src: "/creative2/work/ad-05.webp", alt: "Clarrio ad with a small robot character and the word clarity", width: 600, height: 600 },
  { src: "/creative2/work/ad-07.webp", alt: "Shipzzer ad: two yellow containers seen from above, Press pause on manual stress", width: 600, height: 804 },
  { src: "/creative2/work/ad-02.webp", alt: "Pubrella ad: a man covering his face with a page, Stop fighting ChatGPT threads", width: 600, height: 900 },
  { src: "/creative2/work/ad-04.webp", alt: "Shipzzer ad: quotes turned into invoices", width: 600, height: 600 },
  { src: "/creative2/work/ad-06.webp", alt: "Ad with the line Stop guessing your food costs", width: 600, height: 600 },
  { src: "/creative2/work/ad-09.webp", alt: "Shipzzer ad: congested vs optimized container yard, Not all busy yards perform well", width: 600, height: 600 },
];

export const postSamples: Sample[] = [
  { src: "/creative2/work/post-01.webp", alt: "Samsung Tunisia post: a dog in sunglasses", width: 600, height: 600 },
  { src: "/creative2/work/post-02.webp", alt: "Samsung Tunisia post for the Galaxy S6 Edge", width: 600, height: 600 },
  { src: "/creative2/work/post-03.webp", alt: "Samsung Tunisia post in French: Prêt dans l'instant", width: 600, height: 600 },
  { src: "/creative2/work/post-04.webp", alt: "Samsung Tunisia post: friends taking a selfie", width: 600, height: 600 },
  { src: "/creative2/work/post-05.webp", alt: "Safi post: a cooking tip with an onion", width: 600, height: 600 },
  { src: "/creative2/work/post-06.webp", alt: "Samsung Tunisia post: an illustration about selfies", width: 600, height: 600 },
];

export const appSamples: AppSample[] = [
  {
    name: "GymVoice",
    icon: "/creative2/apps/gv-icon.webp",
    screens: [
      { src: "/creative2/apps/gymvoice-listen.webp", alt: "GymVoice listen screen with podcasts, music and a song queue", width: 480, height: 1041 },
    ],
  },
  {
    name: "SambaLingo",
    icon: "/creative2/apps/sl-icon.webp",
    url: "https://sambalingo.app",
    screens: [
      { src: "/creative2/apps/sambalingo-session.webp", alt: "SambaLingo end of session screen: Boa! You know the next words", width: 480, height: 1041 },
      { src: "/creative2/apps/sambalingo-culture.webp", alt: "SambaLingo culture card with a pug: Never say de nada", width: 480, height: 1041 },
    ],
  },
];
