import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import AnimateIn from "@/components/AnimateIn";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { CALENDLY_URL } from "@/lib/constants";

const failureReasons = [
  {
    label: "The offer angle is wrong for cold traffic",
    body: "Meta Ads reach people who are not actively searching for your product. "Book a demo" is a high-commitment ask from a stranger. Cold traffic needs a lower-friction entry point — a specific outcome, a specific pain, a reason to stop scrolling that does not require immediate trust.",
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
];

const fixSections = [
  {
    title: "Offer Angle",
    body: [
      "The offer is what you are asking a cold visitor to do — and why they should care enough to do it.",
      '"Book a demo" is not an offer. It is a commitment request from a stranger.',
      "I work on the specific outcome angle that makes sense for cold Meta traffic: a clear pain point, a specific result, a low-friction next step that earns trust before asking for a meeting. This is connected directly to the positioning work in the wider SaaS GTM strategy — because an unclear product position produces an unclear ad offer.",
      "If you are comparing a Meta Ads agency with a SaaS growth partner, the difference is straightforward: an agency manages campaigns. I fix the offer, the page, the tracking, and the conversion path behind the campaign — then manage it.",
    ],
    link: { label: "SaaS GTM strategy", to: "/saas-marketing-agency" },
  },
  {
    title: "Creative Testing",
    body: [
      "SaaS ad creative has two jobs: stop the scroll and earn enough interest to click.",
      "Most SaaS creative fails the first job. A product screenshot with a tagline does not stop a scroll. Neither does a stock photo with generic copy.",
      "I build and test creative that opens with the problem — a specific situation the target audience recognises, before introducing the product as the fix. This works for cold audiences because it meets them where they are, not where you want them to be.",
      "Testing is structured: one variable at a time, clear hypotheses, decisions based on cost-per-result rather than click-through rate alone.",
    ],
  },
  {
    title: "Landing Page Fit",
    body: [
      "Paid traffic needs a dedicated landing page — not a homepage, not a feature page, not a pricing page.",
      "The landing page for a Meta Ad campaign needs to match the ad angle exactly. Same ICP, same problem framing, same language, same level of awareness. A mismatch between the ad and the landing page is where most of the conversion loss happens in SaaS paid acquisition.",
      "I review and restructure the landing page to match the paid traffic angle before recommending more spend. If the SaaS landing page is not ready to convert paid traffic, scaling the budget makes the problem more expensive, not better.",
    ],
    link: { label: "SaaS landing page", to: "/landing-page-for-saas" },
  },
  {
    title: "Tracking and Events",
    body: [
      "You cannot optimise what you cannot measure.",
      "I configure the Meta pixel correctly, set up conversion events that map to real business outcomes — demo bookings, trial sign-ups, contact form submissions — and connect UTM parameters so attribution is reliable. Without this, Meta's algorithm optimises for the wrong outcome and you cannot tell which ads are producing pipeline.",
    ],
  },
  {
    title: "Retargeting Path",
    body: [
      "Cold traffic rarely converts on the first visit. That is not a failure — it is how B2B buying works.",
      "I build a structured retargeting path: warm audiences who have visited the landing page see different creative than cold audiences. People who have engaged but not converted see proof-led content. People close to conversion see a lower-friction offer or a direct reason to act now.",
      "Without a retargeting path, you are funding awareness for competitors. With one, paid traffic compounds over time.",
    ],
  },
];

const faqItems = [
  {
    question: "Do Meta Ads work for B2B SaaS?",
    answer:
      "Yes, but with conditions. Meta Ads work for B2B SaaS when the product solves a problem a specific audience recognises, the ACV justifies paid acquisition costs, the landing page and tracking are ready, and there is a lower-friction entry point beyond a cold demo request. Without these conditions, the channel produces data on why it is not working — not pipeline.",
    link: { label: "Google Ads vs Meta Ads for SaaS", to: "/google-ads-vs-meta-ads-saas" },
  },
  {
    question: "What is a reasonable budget to start Meta Ads for SaaS?",
    answer:
      "There is no universal number. The more important question is whether the landing page, offer, and tracking are ready before the budget is set. Spending more on a broken system produces more expensive failures, not better results.",
  },
  {
    question: "Should I use Meta Ads or Google Ads for SaaS?",
    answer:
      "Google Ads capture active intent — people searching for a solution. Meta Ads create demand by reaching people before they search. For most early-stage SaaS products, Google Ads convert better at lower volume. Meta Ads scale better once creative, offer, and retargeting are working.",
    link: { label: "Google Ads vs Meta Ads for SaaS", to: "/google-ads-vs-meta-ads-saas" },
  },
  {
    question: "Why are my Meta Ads getting clicks but no demos?",
    answer:
      "The most common cause is a mismatch between the ad and the landing page — different language, different ICP signal, or a generic page that resets the visitor's context. The second cause is a high-friction CTA asking for too much from cold traffic. Both are fixable before increasing spend.",
  },
  {
    question: "What creative format works best for SaaS Meta Ads?",
    answer:
      "For cold traffic, problem-led creative that opens with a specific pain the ICP recognises tends to outperform product-led creative. For retargeting, proof-led creative works better because the audience already has context. Measure cost-per-result, not click-through rate.",
  },
  {
    question: "How does the Meta Ads landing page connect to SaaS conversion rate optimisation?",
    answer:
      "They are the same problem viewed from different angles. Paid traffic exposes conversion problems faster because every non-converting visitor has a direct cost. A conversion rate optimisation audit and a Meta Ads setup often need to happen together — fixing the ads without fixing the page leaves most of the opportunity on the table.",
    link: { label: "SaaS conversion rate optimisation", to: "/conversion-rate-optimisation-specialist" },
  },
  {
    question: "Can Meta Ads replace cold email for SaaS?",
    answer:
      "Not usually at early stage. Cold email reaches a specific named ICP directly and can generate pipeline with a small, well-targeted list. Meta Ads require more infrastructure and produce results more slowly. Most B2B SaaS founders benefit from running both as part of a connected acquisition system.",
    link: { label: "cold email for SaaS", to: "/cold-email-for-saas" },
  },
];

const notForItems = [
  "You want someone to "just run ads" while leaving the landing page, offer, and tracking untouched. That approach produces spend without insight.",
  "You are not willing to fix the landing page. Paid traffic amplifies what is on the page. If the page is weak, more spend makes it more expensive to find out.",
  "Your ACV is too low to make paid acquisition economically viable. For very low-ACV SaaS products, cold email and organic channels usually produce better pipeline economics at early stage.",
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
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Meta Ads only work for SaaS when the offer angle, creative, landing page, tracking, and retargeting path are connected and working together. Run ads into a weak landing page with vague messaging and no tracking, and you will burn budget on clicks that go nowhere.
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
                {failureReasons.map((item) => (
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
              <p className="text-muted-foreground mb-5 font-medium">Meta Ads tend to work well for SaaS when:</p>
              <ul className="space-y-3 mb-8">
                {[
                  "The product solves a problem that a specific audience recognises without having to search for it.",
                  "The ACV is high enough to justify paid acquisition costs — for most B2B SaaS products, several thousand pounds in ARR per customer, unless the funnel is highly efficient or product-led.",
                  "The landing page and conversion path are already working with organic or outbound traffic.",
                  "There is a clear lower-friction entry point beyond "book a demo" — a specific outcome, a free audit, a short trial, or a relevant lead magnet.",
                  "Tracking and pixel events are configured correctly before the first pound is spent.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                If those conditions are not in place, Meta Ads will produce data on why they are not working — but not pipeline. Fix the foundation first, then scale the channel. For a direct comparison of when to use Meta versus Google, see{" "}
                <Link to="/google-ads-vs-meta-ads-saas" className="text-primary hover:underline">Google Ads vs Meta Ads for SaaS</Link>.
              </p>

              <div className="p-6 rounded-lg border border-border bg-card mb-8">
                <p className="font-semibold text-foreground mb-4">You are a good fit for this service if:</p>
                <ul className="space-y-2 mb-0">
                  {[
                    "You are running Meta Ads but results are inconsistent or unclear.",
                    "You want to start a paid acquisition programme and want to build it correctly from the start.",
                    "Your ads are generating clicks but not demo bookings or trial sign-ups.",
                    "You are not sure whether the problem is the creative, the audience, the landing page, or the tracking.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
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

      {/* What I Fix — dark */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-10">What I Fix Before Scaling Spend</h2>
              <div className="space-y-10">
                {fixSections.map((section) => (
                  <div key={section.title} className="border-b border-border pb-10 last:border-0 last:pb-0">
                    <h3 className="font-display text-xl font-bold mb-4 text-foreground">{section.title}</h3>
                    <div className="space-y-3">
                      {section.body.map((para, i) => (
                        <p key={i} className="text-sm text-muted-foreground leading-relaxed">{para}</p>
                      ))}
                    </div>
                    {section.link && (
                      <Link to={section.link.to} className="inline-block mt-4 text-sm text-primary hover:underline">
                        {section.link.label} →
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Proof — light */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Proof and Experience</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                11 active accounts. Results across campaigns include a 38% lift in conversion rate and a 26% reduction in CPA. These are not averages — they are outcomes from fixing tracking, targeting, and creative as a connected system before scaling spend.
              </p>

              {/* GrowApp table */}
              <div className="mb-8">
                <p className="font-semibold text-foreground mb-3">GrowApp — B2B SaaS free trial</p>
                <div className="rounded-lg border border-border overflow-hidden">
                  <div className="grid grid-cols-3 bg-card px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <span>Metric</span><span>Before</span><span>After</span>
                  </div>
                  {[
                    ["Cost per lead", "£30+", "£3–£7"],
                    ["Trial requests (6 months)", "—", "847"],
                    ["Warm traffic CPV", "—", "£0.20–£0.35"],
                  ].map(([metric, before, after]) => (
                    <div key={metric} className="grid grid-cols-3 px-4 py-3 text-sm border-t border-border">
                      <span className="text-foreground">{metric}</span>
                      <span className="text-muted-foreground">{before}</span>
                      <span className="text-primary font-medium">{after}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                  The default lead form was generating expensive, low-intent submissions. I replaced it with a direct trial offer, split campaigns into warm, prospecting, and test segments, fixed tracking, monitored frequency caps, and scaled winning ad sets 30% every two days. CPL dropped 73% below industry average.
                </p>
              </div>

              {/* DTC Skincare table */}
              <div className="mb-8">
                <p className="font-semibold text-foreground mb-3">DTC Skincare — AOV £48, £15k/mo spend</p>
                <div className="rounded-lg border border-border overflow-hidden">
                  <div className="grid grid-cols-3 bg-card px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <span>Metric</span><span>Before</span><span>After</span>
                  </div>
                  {[
                    ["ROAS (Meta 7-day click)", "1.2", "3.1"],
                    ["CPA", "£42", "£23"],
                  ].map(([metric, before, after]) => (
                    <div key={metric} className="grid grid-cols-3 px-4 py-3 text-sm border-t border-border">
                      <span className="text-foreground">{metric}</span>
                      <span className="text-muted-foreground">{before}</span>
                      <span className="text-primary font-medium">{after}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                  CAPI gateway setup, buyers lookalike 1–2%, UGC routine creative at 30 seconds. Tracking was the first fix — without clean attribution, the algorithm was optimising for the wrong signals.
                </p>
              </div>

              {/* Traffic efficiency */}
              <div className="mb-8 p-5 rounded-lg border border-border bg-card">
                <p className="font-semibold text-foreground mb-2">Traffic efficiency</p>
                <p className="text-sm text-muted-foreground">
                  CPC €0.19 · CTR 2.86% · Conversion rate 4.00% (December 2025). Used to feed audiences and reduce CPA over time.
                </p>
              </div>

              {/* Client review */}
              <blockquote className="mb-8 p-6 rounded-lg border border-border bg-card relative">
                <p className="text-sm text-muted-foreground italic leading-relaxed mb-4">
                  "Wael is solid. He's a rare contractor who goes the extra mile and delivers more than originally promised. He was constantly thinking about my funnel improvements and how to get more customers and clicks — sharing ideas and insights proactively. He gave me great ideas to optimise my funnel and was very thorough. I'd recommend him if you want to optimise your Meta ad spend or your funnel."
                </p>
                <footer className="text-xs text-muted-foreground font-medium">— Verified Upwork client</footer>
              </blockquote>

              {/* Zembra */}
              <div className="p-5 rounded-lg border border-border bg-card">
                <p className="font-semibold text-foreground mb-2">Zembra</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Aligned paid and outbound acquisition with repositioned messaging and a rebuilt landing page. When the offer angle, ad creative, and conversion path speak the same language, paid acquisition stops feeling random. The broader GTM execution contributed to 4X revenue growth.
                </p>
              </div>

              <p className="text-xs text-muted-foreground mt-4">Attribution: Meta 7-day click. Results vary by offer, spend, and seasonality.</p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Who This Is Not For — dark */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">Who This Is Not For</h2>
              <div className="space-y-4 mb-6">
                {notForItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-lg border border-border bg-background/40">
                    <span className="text-muted-foreground text-sm leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                This works best for founders who want Meta Ads connected to a conversion system — not running in isolation from positioning, landing page, and tracking. If cold outreach fits your current stage better, see{" "}
                <Link to="/cold-email-for-saas" className="text-primary hover:underline">cold email for SaaS</Link>.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* FAQ — light */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-10">FAQ</h2>
              <div className="space-y-6">
                {faqItems.map((item) => (
                  <div key={item.question} className="border-b border-border pb-6 last:border-0 last:pb-0">
                    <h3 className="font-semibold text-foreground mb-2">{item.question}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2">{item.answer}</p>
                    {item.link && (
                      <Link to={item.link.to} className="text-sm text-primary hover:underline">
                        {item.link.label} →
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Final CTA — dark */}
      <section className="py-16 bg-card border-t border-border">
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
