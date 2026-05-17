import { ArrowRight, Play, ExternalLink, Star } from "lucide-react";
import { Link } from "react-router-dom";
import AnimateIn from "@/components/AnimateIn";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import ResponsiveImage from "@/components/ResponsiveImage";
import { Button } from "@/components/ui/button";
import { CALENDLY_URL } from "@/lib/constants";

import metaAdsDashboard from "@/assets/meta-ads-dashboard.png";
import adCreative1 from "@/assets/ad-creative-1.jpg";
import adCreative2 from "@/assets/ad-creative-2.jpg";
import adCreative3 from "@/assets/ad-creative-3.jpg";
import adCreative4 from "@/assets/ad-creative-4.jpg";

const heroStats = [
  { value: "+38%", label: "Conversion rate lift" },
  { value: "−26%", label: "CPA reduction" },
  { value: "11", label: "Active accounts" },
];

const videoReferences = [
  {
    title: "One Great Book startup ad",
    youtubeUrl: "https://youtube.com/shorts/775cuQpyzd8?feature=share",
    thumbnail: "https://img.youtube.com/vi/775cuQpyzd8/hqdefault.jpg",
    format: "Cold traffic hook",
    status: "Featured",
  },
  {
    title: "UGC script teardown",
    youtubeUrl: "https://youtube.com/shorts/HnxBXKyFiQI",
    thumbnail: "https://img.youtube.com/vi/HnxBXKyFiQI/hqdefault.jpg",
    format: "Problem-led creative",
    status: "Active",
  },
  {
    title: "Creative rotation 101",
    youtubeUrl: "https://youtube.com/shorts/PGUHcI72MdU?feature=share",
    thumbnail: "https://img.youtube.com/vi/PGUHcI72MdU/hqdefault.jpg",
    format: "Anti-fatigue system",
    status: "Active",
  },
];

const adCreatives = [
  { src: adCreative1, alt: "Feed ad creative — square format" },
  { src: adCreative2, alt: "Concept creative — product showcase" },
  { src: adCreative3, alt: "Split comparison creative" },
  { src: adCreative4, alt: "Story ad creative — vertical format" },
];

export default function MetaAdsForSaas() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">Meta Ads for SaaS</p>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Meta Ads for SaaS: Creative, Funnel, and Conversion
              </h1>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Most B2B SaaS founders who try Meta Ads either give up after two weeks or keep spending without understanding why the demos are not coming in.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                The problem is rarely the budget. It is the system behind the ads.
              </p>
              <p className="text-muted-foreground mb-10 leading-relaxed">
                Meta Ads only work for SaaS when the offer angle, creative, landing page, tracking, and retargeting path are connected and working together. Run ads into a weak landing page with vague messaging and no tracking, and you will burn budget on clicks that go nowhere.
              </p>

              {/* Hero stats */}
              <div className="flex flex-wrap gap-x-10 gap-y-4 mb-10">
                {heroStats.map((s) => (
                  <div key={s.label}>
                    <p className="text-4xl font-bold text-foreground tracking-tight">{s.value}</p>
                    <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
                  </div>
                ))}
              </div>

              <Button variant="hero" size="lg" className="group" asChild>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                  Book a 15-minute Meta Ads diagnosis
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <p className="text-xs text-muted-foreground/60 mt-3">
                Attribution: Meta 7-day click. Results vary by offer, spend, and seasonality.
              </p>
            </div>
          </AnimateIn>

          {/* Dashboard proof card */}
          <AnimateIn>
            <div className="max-w-3xl mx-auto mt-12">
              <div className="bg-card/80 border border-border rounded-2xl overflow-hidden shadow-xl">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">Meta Ads Manager — Proof Snapshot</span>
                </div>
                <div className="p-2">
                  <ResponsiveImage
                    src={metaAdsDashboard}
                    alt="Meta Ads Manager dashboard showing campaign performance — CPC €0.19, CTR 2.86%, conversion rate 4.00%"
                    className="w-full rounded-lg"
                    sizes="(min-width: 1024px) 768px, 100vw"
                    loading="eager"
                    decoding="async"
                  />
                </div>
                <div className="flex gap-6 px-5 py-3 border-t border-border text-center">
                  {[["€0.19", "CPC"], ["2.86%", "CTR"], ["4.00%", "Conv. rate"]].map(([val, label]) => (
                    <div key={label}>
                      <p className="text-sm font-bold text-foreground">{val}</p>
                      <p className="text-xs text-muted-foreground">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Why Meta Ads Fail — dark */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Why SaaS Meta Ads Fail</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Most SaaS Meta Ads fail for the same reasons. They are worth naming directly because founders usually blame the wrong thing — the platform, the audience, or the budget — when the real problem is earlier.
              </p>
              <div className="space-y-5">
                {[
                  {
                    label: "The offer angle is wrong for cold traffic",
                    body: "Meta Ads reach people who are not actively searching for your product. 'Book a demo' is a high-commitment ask for someone who has never heard of you. Cold traffic needs a lower-friction entry point — a specific outcome, a specific pain, a reason to stop scrolling that does not require immediate trust.",
                  },
                  {
                    label: "The creative does not earn attention",
                    body: "Most SaaS ad creative looks like a product screenshot with a tagline. That works for retargeting people who already know the product. It does not work for cold audiences who have no context. Cold creative needs to open with the problem — not the product.",
                  },
                  {
                    label: "The landing page is not built for paid traffic",
                    body: "Sending paid traffic to a homepage or a generic feature page is one of the most common and expensive mistakes in SaaS paid acquisition. The landing page needs to match the ad angle exactly — same ICP, same problem, same language, direct path to the next step.",
                  },
                  {
                    label: "Tracking is incomplete or broken",
                    body: "Without proper Meta pixel setup, conversion event tracking, and UTM attribution, you cannot tell which ads are producing pipeline and which are producing clicks that go nowhere. Optimising without this data means spending more on what is not working.",
                  },
                  {
                    label: "There is no retargeting path",
                    body: "Most SaaS buyers do not convert on the first visit. They need multiple touchpoints. Without a structured retargeting sequence — awareness to consideration to conversion — you are leaving most of your warm audience behind.",
                  },
                ].map((item) => (
                  <div key={item.label} className="p-5 rounded-lg border border-border bg-background/50">
                    <p className="font-semibold text-foreground mb-2">{item.label}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* When Meta Ads Make Sense — light */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">When Meta Ads Make Sense for SaaS</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Meta Ads are not the right channel for every SaaS product at every stage. Before spending, it is worth being honest about whether the conditions are in place.
              </p>
              <p className="text-muted-foreground mb-4 font-medium">Meta Ads tend to work well for SaaS when:</p>
              <ul className="space-y-3 mb-8 pl-1">
                {[
                  "The product solves a problem that a specific audience recognises without having to search for it.",
                  "The ACV is high enough to justify paid acquisition costs. For most B2B SaaS products, that usually means several thousand pounds in ARR per customer, unless the funnel is highly efficient or product-led.",
                  "The landing page and conversion path are already working with organic or outbound traffic.",
                  "There is a clear lower-friction entry point beyond 'book a demo' — a specific outcome, a free audit, a short trial, a relevant lead magnet.",
                  "Tracking and pixel events are configured correctly before the first pound is spent.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                    <span className="text-primary mt-1 flex-shrink-0">→</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                If those conditions are not in place, Meta Ads will produce data on why they are not working — but not pipeline. Fix the foundation first, then scale the channel. For a direct comparison of when to use Meta versus Google, see{" "}
                <Link to="/google-ads-vs-meta-ads-saas" className="text-primary hover:underline">
                  Google Ads vs Meta Ads for SaaS
                </Link>.
              </p>

              <div className="p-6 rounded-lg border border-border bg-card mb-8">
                <p className="font-semibold text-foreground mb-4">You are a good fit for this service if:</p>
                <ul className="space-y-2">
                  {[
                    "You are running Meta Ads but results are inconsistent or unclear.",
                    "You want to start a paid acquisition programme and want to build it correctly from the start.",
                    "Your ads are generating clicks but not demo bookings or trial sign-ups.",
                    "You are not sure whether the problem is the creative, the audience, the landing page, or the tracking.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                      <span className="text-primary mt-1 flex-shrink-0">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Button variant="hero" size="lg" className="group" asChild>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                  Book a 15-minute Meta Ads diagnosis
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Creative proof — dark */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">Creative examples</p>
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">What Problem-Led Creative Looks Like</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Cold traffic creative opens with a problem the audience recognises — before the product is mentioned. These three short videos and four static formats show the approach in practice.
              </p>

              {/* Video thumbnails */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {videoReferences.map((video) => (
                  <a
                    key={video.title}
                    href={video.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-xl border border-border overflow-hidden bg-background/50 hover:border-primary/40 transition-colors"
                    aria-label={`Watch ${video.title} on YouTube`}
                  >
                    <div className="relative aspect-[9/16] max-h-64 overflow-hidden">
                      <img
                        src={video.thumbnail}
                        alt={`${video.title} — Meta Ads creative example`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                          <Play className="ml-1 h-5 w-5 fill-current" />
                        </span>
                      </span>
                      <span className="absolute top-3 left-3 rounded-full bg-white px-2.5 py-1 text-xs font-bold text-black">Shorts</span>
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-muted-foreground mb-0.5">{video.format}</p>
                      <p className="text-sm font-semibold text-foreground leading-snug">{video.title}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Static ad creatives */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {adCreatives.map((creative, i) => (
                  <div
                    key={i}
                    className="bg-background/50 border border-border rounded-xl overflow-hidden aspect-[4/5] hover:border-primary/30 transition-colors"
                  >
                    <ResponsiveImage
                      src={creative.src}
                      alt={creative.alt}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                      decoding="async"
                      sizes="(min-width: 768px) 25vw, 50vw"
                    />
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4">Static formats: square feed ads and vertical story formats used in active campaigns.</p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* What I Fix — light */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-10">What I Fix Before Scaling Spend</h2>

              <div className="space-y-10">
                {/* Offer Angle */}
                <div className="border-b border-border pb-10">
                  <h3 className="font-display text-xl font-bold mb-4 text-foreground">Offer Angle</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    The offer is what you are asking a cold visitor to do — and why they should care enough to do it.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    "Book a demo" is not an offer. It is a commitment request from a stranger.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    I work on the specific outcome angle that makes sense for cold Meta traffic: a clear pain point, a specific result, a low-friction next step that earns trust before asking for a meeting. This is connected directly to the positioning work in the wider{" "}
                    <Link to="/saas-marketing-agency" className="text-primary hover:underline">SaaS GTM strategy</Link>
                    {" "}— because an unclear product position produces an unclear ad offer.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    If you are comparing a Meta Ads agency with a SaaS growth partner, the difference is straightforward: an agency manages campaigns. I fix the offer, the page, the tracking, and the conversion path behind the campaign — then manage it.
                  </p>
                </div>

                {/* Creative Testing */}
                <div className="border-b border-border pb-10">
                  <h3 className="font-display text-xl font-bold mb-4 text-foreground">Creative Testing</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    SaaS ad creative has two jobs: stop the scroll and earn enough interest to click.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    Most SaaS creative fails the first job. A product screenshot with a tagline does not stop a scroll. Neither does a stock photo with generic copy.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    I build and test creative that opens with the problem — a specific situation the target audience recognises, before introducing the product as the fix. This works for cold audiences because it meets them where they are, not where you want them to be.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Testing is structured: one variable at a time, clear hypotheses, decisions based on cost-per-result rather than click-through rate alone.
                  </p>
                </div>

                {/* Landing Page Fit */}
                <div className="border-b border-border pb-10">
                  <h3 className="font-display text-xl font-bold mb-4 text-foreground">Landing Page Fit</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    Paid traffic needs a dedicated landing page — not a homepage, not a feature page, not a pricing page.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    The landing page for a Meta Ad campaign needs to match the ad angle exactly. Same ICP, same problem framing, same language, same level of awareness. A mismatch between the ad and the landing page is where most of the conversion loss happens in SaaS paid acquisition.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    I review and restructure the landing page to match the paid traffic angle before recommending more spend. If the{" "}
                    <Link to="/landing-page-for-saas" className="text-primary hover:underline">SaaS landing page for paid traffic</Link>
                    {" "}is not ready to convert paid traffic, scaling the budget makes the problem more expensive, not better.
                  </p>
                </div>

                {/* Tracking */}
                <div className="border-b border-border pb-10">
                  <h3 className="font-display text-xl font-bold mb-4 text-foreground">Tracking and Events</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    You cannot optimise what you cannot measure.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    I configure the Meta pixel correctly, set up conversion events that map to real business outcomes — demo bookings, trial sign-ups, contact form submissions — and connect UTM parameters so attribution is reliable. Without this, Meta's algorithm optimises for the wrong outcome and you cannot tell which ads are producing pipeline.
                  </p>
                </div>

                {/* Retargeting Path */}
                <div>
                  <h3 className="font-display text-xl font-bold mb-4 text-foreground">Retargeting Path</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    Cold traffic rarely converts on the first visit. That is not a failure — it is how B2B buying works.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    I build a structured retargeting path: warm audiences who have visited the landing page see different creative than cold audiences. People who have engaged but not converted see proof-led content. People close to conversion see a lower-friction offer or a direct reason to act now.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Without a retargeting path, you are funding awareness for competitors. With one, paid traffic compounds over time.
                  </p>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Proof — dark */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Proof and Experience</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                11 active accounts. Results across campaigns include a 38% lift in conversion rate and a 26% reduction in CPA. These are not averages — they are outcomes from fixing tracking, targeting, and creative as a connected system before scaling spend.
              </p>

              {/* GrowApp */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-semibold text-foreground">GrowApp — B2B SaaS free trial</p>
                  <Link to="/case-study/growapp" className="text-xs text-primary hover:underline flex items-center gap-1">
                    Full case study <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
                <div className="rounded-lg border border-border overflow-hidden">
                  <div className="grid grid-cols-[1fr_80px_80px] bg-background px-3 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">
                    <span>Metric</span><span className="text-center">Before</span><span className="text-right">After</span>
                  </div>
                  {[
                    ["Cost per lead", "£30+", "£3–£7"],
                    ["Trial requests (6 months)", "—", "847"],
                    ["Warm traffic CPV", "—", "£0.20–£0.35"],
                  ].map(([metric, before, after]) => (
                    <div key={metric} className="grid grid-cols-[1fr_80px_80px] px-3 py-3 text-sm border-b border-border last:border-0">
                      <span className="text-foreground">{metric}</span>
                      <span className="text-center text-muted-foreground">{before}</span>
                      <span className="text-right text-primary font-medium">{after}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                  The default lead form was generating expensive, low-intent submissions. Replaced it with a direct trial offer, split campaigns into warm, prospecting, and test segments, fixed tracking, monitored frequency caps, and scaled winning ad sets 30% every two days. CPL dropped 73% below industry average.
                </p>
              </div>

              {/* DTC Skincare */}
              <div className="mb-8">
                <p className="font-semibold text-foreground mb-3">DTC Skincare — AOV £48, £15k/mo spend</p>
                <div className="rounded-lg border border-border overflow-hidden">
                  <div className="grid grid-cols-[1fr_80px_80px] bg-background px-3 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">
                    <span>Metric</span><span className="text-center">Before</span><span className="text-right">After</span>
                  </div>
                  {[
                    ["ROAS (Meta 7-day click)", "1.2", "3.1"],
                    ["CPA", "£42", "£23"],
                  ].map(([metric, before, after]) => (
                    <div key={metric} className="grid grid-cols-[1fr_80px_80px] px-3 py-3 text-sm border-b border-border last:border-0">
                      <span className="text-foreground">{metric}</span>
                      <span className="text-center text-muted-foreground">{before}</span>
                      <span className="text-right text-primary font-medium">{after}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                  CAPI gateway setup, buyers lookalike 1–2%, UGC routine creative at 30 seconds. Tracking was the first fix — without clean attribution, the algorithm was optimising for the wrong signals.
                </p>
              </div>

              {/* Zembra */}
              <div className="mb-8 p-5 rounded-lg border border-border bg-background/50">
                <p className="font-semibold text-foreground mb-2">Zembra — 4X revenue growth</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Aligned paid and outbound acquisition with repositioned messaging and a rebuilt landing page. When the offer angle, ad creative, and conversion path speak the same language, paid acquisition stops feeling random. The broader GTM execution contributed to 4X revenue growth.
                </p>
              </div>

              {/* Client review */}
              <div className="p-6 rounded-xl border border-border bg-background/50">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                  ))}
                  <span className="ml-2 text-sm font-semibold text-foreground">5.0</span>
                </div>
                <p className="text-sm text-muted-foreground italic leading-relaxed mb-4">
                  "Wael is solid. He's a rare contractor who goes the extra mile and delivers more than originally promised. He was constantly thinking about my funnel improvements and how to get more customers and clicks — sharing ideas and insights proactively. He gave me great ideas to optimise my funnel and was very thorough. I'd recommend him if you want to optimise your Meta ad spend or your funnel."
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground font-medium">— Verified Upwork client</p>
                  <a
                    href="https://www.upwork.com/freelancers/~0141da0e8c48042461"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline flex items-center gap-1"
                  >
                    Verify on Upwork <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-4">Attribution: Meta 7-day click. Results vary by offer, spend, and seasonality.</p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Who This Is Not For — light */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">Who This Is Not For</h2>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Do not hire me if you want someone to "just run ads" while leaving the landing page, offer, and tracking untouched. That approach produces spend without insight.
                </p>
                <p>
                  Do not hire me if you are not willing to fix the landing page. Paid traffic amplifies what is on the page. If the page is weak, more spend makes it more expensive to find out.
                </p>
                <p>
                  Do not hire me if your ACV is too low to make paid acquisition economically viable. For very low-ACV SaaS products,{" "}
                  <Link to="/cold-email-for-saas" className="text-primary hover:underline">cold email for SaaS</Link>
                  {" "}and organic channels usually produce better pipeline economics at early stage.
                </p>
                <p className="text-foreground font-medium">
                  This works best for founders who want Meta Ads connected to a conversion system — not running in isolation from positioning, landing page, and tracking.
                </p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* FAQ — dark */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-10">FAQ</h2>
              <div className="space-y-6">

                <div className="border-b border-border pb-6">
                  <h3 className="font-semibold text-foreground mb-2">Do Meta Ads work for B2B SaaS?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Yes, but with conditions. Meta Ads work for B2B SaaS when the product solves a problem a specific audience recognises, the ACV justifies paid acquisition costs, the landing page and tracking are ready, and there is a lower-friction entry point beyond a cold demo request. Without these conditions, the channel produces data on why it is not working — not pipeline. For a full comparison, see{" "}
                    <Link to="/google-ads-vs-meta-ads-saas" className="text-primary hover:underline">Google Ads vs Meta Ads for SaaS</Link>.
                  </p>
                </div>

                <div className="border-b border-border pb-6">
                  <h3 className="font-semibold text-foreground mb-2">What is a reasonable budget to start Meta Ads for SaaS?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    There is no universal number. The more important question is whether the landing page, offer, and tracking are ready before the budget is set. Spending more on a broken system produces more expensive failures, not better results.
                  </p>
                </div>

                <div className="border-b border-border pb-6">
                  <h3 className="font-semibold text-foreground mb-2">Should I use Meta Ads or Google Ads for SaaS?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Google Ads capture active intent — people searching for a solution. Meta Ads create demand by reaching people before they search. For most early-stage SaaS products, Google Ads convert better at lower volume. Meta Ads scale better once creative, offer, and retargeting are working. The full breakdown is in the{" "}
                    <Link to="/google-ads-vs-meta-ads-saas" className="text-primary hover:underline">Google Ads vs Meta Ads for SaaS</Link>
                    {" "}comparison.
                  </p>
                </div>

                <div className="border-b border-border pb-6">
                  <h3 className="font-semibold text-foreground mb-2">Why are my Meta Ads getting clicks but no demos?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The most common cause is a mismatch between the ad and the landing page — different language, different ICP signal, or a generic page that resets the visitor's context. The second cause is a high-friction CTA asking for too much from cold traffic. Both are fixable before increasing spend.
                  </p>
                </div>

                <div className="border-b border-border pb-6">
                  <h3 className="font-semibold text-foreground mb-2">What creative format works best for SaaS Meta Ads?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    For cold traffic, problem-led creative that opens with a specific pain the ICP recognises tends to outperform product-led creative. For retargeting, proof-led creative works better because the audience already has context. Measure cost-per-result, not click-through rate.
                  </p>
                </div>

                <div className="border-b border-border pb-6">
                  <h3 className="font-semibold text-foreground mb-2">How does the Meta Ads landing page connect to SaaS conversion rate optimisation?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    They are the same problem viewed from different angles. Paid traffic exposes conversion problems faster because every non-converting visitor has a direct cost. A{" "}
                    <Link to="/conversion-rate-optimisation-specialist" className="text-primary hover:underline">SaaS conversion rate optimisation</Link>
                    {" "}audit and a Meta Ads setup often need to happen together.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Can Meta Ads replace cold email for SaaS?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Not usually at early stage.{" "}
                    <Link to="/cold-email-for-saas" className="text-primary hover:underline">Cold email for SaaS</Link>
                    {" "}reaches a specific named ICP directly and can generate pipeline with a small, well-targeted list. Meta Ads require more infrastructure and produce results more slowly. Most founders benefit from running both as part of a connected acquisition system.
                  </p>
                </div>

              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Final CTA — light */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                Ready to Fix Your <span className="text-gradient">Meta Ads System?</span>
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                If your Meta Ads are generating clicks but not demos, the problem is in the system — not the budget.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                In 15 minutes, you will know whether the issue is the offer angle, the creative, the landing page, the tracking, or the retargeting path — and what to fix first. Bring your current ad account, your landing page URL, and your cost-per-result numbers.
              </p>
              <Button variant="hero" size="lg" className="group" asChild>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                  Book a 15-minute Meta Ads diagnosis
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </AnimateIn>
        </div>
      </section>

      <Footer hideCTA />
    </div>
  );
}
