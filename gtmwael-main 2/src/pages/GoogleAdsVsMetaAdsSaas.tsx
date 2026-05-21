import { ArrowRight, Check, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import AnimateIn from "@/components/AnimateIn";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { CALENDLY_URL } from "@/lib/constants";

const comparisonRows = [
  { label: "Visitor intent", google: "Actively searching for a solution", meta: "Interrupted while scrolling" },
  { label: "Best fit", google: "Established categories with search demand", meta: "New or niche categories; retargeting" },
  { label: "Typical SaaS CPC", google: "Often $15-40 for competitive B2B keywords", meta: "Lower CPM, longer conversion path" },
  { label: "Landing page requirement", google: "Intent-matched, short, fast to CTA", meta: "Education-first, more proof, softer ask" },
  { label: "Practical starting budget", google: "~$2,000-3,000/month for reliable signal", meta: "~$1,500-2,500/month for creative testing" },
  { label: "Best use case", google: "Capture buyers already evaluating solutions", meta: "Build awareness; retarget warm audiences" },
];

const decisionRules = [
  {
    title: "Does the ICP already search for this problem?",
    body: "If yes, Google has a head start. If no, Meta is usually the better entry point.",
  },
  {
    title: "Can the landing page convert cold or high-intent traffic?",
    body: "If it cannot, the channel will only produce data on a broken page.",
  },
  {
    title: "Is the offer clear enough to justify the click cost?",
    body: "A vague offer can survive low CPCs. It cannot survive $20-40 CPCs.",
  },
];

const googleStarts = [
  "The category has established search volume. Check Google Keyword Planner or a tool like Ahrefs before committing budget.",
  "Your ICP knows the name of the problem and uses specific intent queries.",
  "You have enough budget to absorb competitive B2B CPCs and still get enough clicks to optimise.",
  "The landing page is already optimised for intent-matched traffic. A visitor who searched for \"CRM for small sales teams\" needs a page that confirms they are in the right place immediately.",
];

const metaStarts = [
  "Your category is new or niche. Buyers experience the problem but do not search for a category solution.",
  "You have a strong visual angle on the product: a before/after, a product moment, a transformation that is clear in 5 seconds.",
  "You have budget and patience for creative testing. Meta requires more ad variants to find the angle that works.",
  "The landing page can educate before it converts. Meta visitors arrive cold and need more context before taking action.",
  "You want to build retargeting audiences while awareness is low.",
];

const decisionChecklist = [
  { situation: "Buyers already search for your category", startWith: "Google Ads" },
  { situation: "Category is new, niche, or unnamed", startWith: "Meta Ads" },
  { situation: "Landing page is weak or unproven", startWith: "Fix the page first" },
  { situation: "Budget is limited", startWith: "Pick one channel, run it longer" },
  { situation: "Existing traffic but few demos / signups", startWith: "CRO before more spend" },
  { situation: "Strong visual story, low search volume", startWith: "Meta Ads" },
  { situation: "Defined keywords, intent-matched page, $2K+/mo budget", startWith: "Google Ads" },
];

const landingPageRequirements = [
  "The landing page headline names the outcome for a specific ICP",
  "The proof on the page is specific: a named result from a recognisable company or role",
  "The primary CTA is one clear action, not three competing options",
  "The mobile experience is tested and the CTA is visible on a small screen",
  "There is basic conversion tracking in place so you know what is working",
];

const faq = [
  {
    question: "Is Google Ads or Meta Ads better for B2B SaaS?",
    answer:
      "Neither is universally better. Google Ads works better when buyers are already searching for a solution because it captures existing demand. Meta Ads works better when buyers are not yet searching and need to be made aware of the problem or category. The right starting point depends on whether your ICP searches for solutions like yours and whether search volume is sufficient to run a meaningful campaign.",
  },
  {
    question: "How much budget do I need to test Google Ads for SaaS?",
    answer:
      "A practical starting budget is often around $2,000-3,000 per month to get enough signal to optimise. Below that, clicks are usually too few to identify which keywords and ads are working and which are wasting budget. If that minimum is not available, Meta Ads offers more creative testing options at lower CPMs and may be a better starting point.",
  },
  {
    question: "Can I run Google Ads and Meta Ads at the same time for SaaS?",
    answer:
      "Yes, but only after at least one channel is optimised. Running both from day one on a limited budget produces weak signal from both. Start with the channel that best fits the current ICP and offer, get it working, then layer in the second, ideally using Meta to retarget audiences built from Google traffic.",
  },
  {
    question: "What landing page do I need for Google Ads vs Meta Ads?",
    answer:
      "They are different. A Google Ads landing page should confirm the search query intent immediately, move fast to the CTA, and keep the page short and direct. A Meta Ads landing page needs to build context, educate the visitor about the problem, and use a softer first ask. The same page rarely serves both well.",
    link: "/blog/saas-landing-page-google-meta-ads",
    linkLabel: "full breakdown of landing page strategy by channel",
  },
];

export default function GoogleAdsVsMetaAdsSaas() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Navigation />

      <main>
        <section className="relative overflow-hidden bg-hero-gradient pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(circle_at_20%_20%,white_0,transparent_30%),radial-gradient(circle_at_85%_15%,white_0,transparent_25%)]" />
          <div className="container relative z-10 px-4">
            <AnimateIn>
              <div className="mx-auto max-w-5xl">
                <p className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                  Paid Acquisition
                </p>
                <h1 className="font-display max-w-4xl text-4xl font-bold leading-[0.98] tracking-[-0.04em] text-foreground md:text-6xl lg:text-7xl">
                  Google Ads vs Meta Ads for SaaS: Which Channel Fits Your Stage?
                </h1>

                <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.75fr] lg:items-end">
                  <div className="space-y-5 text-lg leading-8 text-muted-foreground">
                    <p>Google Ads captures demand that already exists. Meta Ads creates demand before buyers know they are looking.</p>
                    <p>Both can work for B2B SaaS. But starting with the wrong one, before the landing page is ready or before the right demand exists, is one of the fastest ways to burn budget without learning anything useful.</p>
                    <p>The decision is not which channel is better. It is which channel fits your offer, your ICP, and your current stage.</p>
                  </div>

                  <div className="rounded-2xl border border-border/60 bg-background/80 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Decision filter</p>
                    <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                      <p className="flex gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />Search demand exists</p>
                      <p className="flex gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />Landing page can convert</p>
                      <p className="flex gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />Offer clarity matches CPC</p>
                    </div>
                  </div>
                </div>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Button variant="hero" size="lg" className="group" asChild>
                    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                      Book a Free SaaS Channel Audit
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/blog/saas-landing-page-google-meta-ads">Read landing page breakdown</Link>
                  </Button>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        <section className="border-y border-[#ded9d1] bg-[#faf9f6] py-20 text-[#11101a] md:py-24">
          <div className="container px-4">
            <AnimateIn>
              <div className="mx-auto max-w-6xl">
                <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
                  <div>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary">Core difference</p>
                    <h2 className="font-display text-4xl font-bold leading-tight tracking-[-0.035em] text-[#11101a] md:text-5xl">
                      The channel changes the job of the page.
                    </h2>
                  </div>
                  <p className="text-lg leading-8 text-[#514b5d]">
                    Use this as the starting frame. Google usually confirms demand. Meta usually creates context. The wrong page for the wrong channel makes both look weaker than they are.
                  </p>
                </div>

                <div className="mt-12 overflow-hidden rounded-2xl border border-[#ded9d1] bg-white">
                  <div className="grid grid-cols-[0.8fr_1fr_1fr] border-b border-[#ded9d1] bg-[#f3f1ec] text-sm font-semibold text-[#11101a]">
                    <div className="p-4">Decision point</div>
                    <div className="p-4">Google Ads</div>
                    <div className="p-4">Meta Ads</div>
                  </div>
                  {comparisonRows.map((row) => (
                    <div key={row.label} className="grid grid-cols-1 border-b border-[#ded9d1] last:border-b-0 md:grid-cols-[0.8fr_1fr_1fr]">
                      <div className="bg-[#faf9f6] p-4 font-semibold text-[#11101a]">{row.label}</div>
                      <div className="p-4 text-sm leading-7 text-[#514b5d]">{row.google}</div>
                      <div className="p-4 text-sm leading-7 text-[#514b5d]">{row.meta}</div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        <section className="border-y border-border bg-background py-16">
          <div className="container px-4">
            <AnimateIn>
              <div className="mx-auto max-w-5xl">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary">My rule before choosing</p>
                <h2 className="font-display max-w-3xl text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                  Check demand, page readiness, and offer clarity before choosing a channel.
                </h2>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                  Before choosing Google Ads or Meta Ads for a SaaS client, I check three things. If one of these three is weak, the channel is not the first problem to solve. The conversion path is.
                </p>

                <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
                  {decisionRules.map((item) => (
                    <div key={item.title} className="bg-background p-6 md:p-7">
                      <CheckCircle2 className="mb-5 h-6 w-6 text-primary" />
                      <h3 className="font-display text-xl font-bold text-foreground">{item.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.body}</p>
                    </div>
                  ))}
                </div>

                <p className="mt-7 max-w-3xl text-base leading-8 text-muted-foreground">
                  That is the order I work in with founders, and it is the reason most "paid ads do not work for SaaS" conclusions are actually positioning and landing page conclusions.
                </p>
              </div>
            </AnimateIn>
          </div>
        </section>

        <section className="bg-[#faf9f6] py-20 text-[#11101a] md:py-24">
          <div className="container px-4">
            <AnimateIn>
              <div className="mx-auto max-w-6xl">
                <div className="grid gap-12 lg:grid-cols-2">
                  <div>
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary">When Google fits</p>
                    <h2 className="font-display text-4xl font-bold leading-tight tracking-[-0.035em] text-[#11101a] md:text-5xl">
                      Start with Google when buyers already search.
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-[#514b5d]">
                      Google Ads works when buyers are already searching for a solution like yours.
                    </p>
                    <div className="mt-9 space-y-0 border-y border-[#ded9d1]">
                      {googleStarts.map((item, index) => (
                        <div key={item} className="grid gap-5 border-b border-[#ded9d1] py-6 last:border-b-0 sm:grid-cols-[3rem_1fr]">
                          <span className="font-display text-xl font-bold text-primary">{String(index + 1).padStart(2, "0")}</span>
                          <p className="text-base leading-7 text-[#514b5d]">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-3xl bg-[#0f0d19] p-7 text-white md:p-9">
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary">When Meta fits</p>
                    <h2 className="font-display text-4xl font-bold leading-tight tracking-[-0.035em] md:text-5xl">
                      Start with Meta when you need to create demand.
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-white/72">
                      Meta Ads works when buyers experience the problem, but do not yet search for a category solution.
                    </p>
                    <div className="mt-9 space-y-5">
                      {metaStarts.map((item) => (
                        <div key={item} className="flex gap-4 border-t border-white/15 pt-5">
                          <Check className="mt-1 h-4 w-4 shrink-0 text-primary" />
                          <p className="text-sm leading-7 text-white/72">{item}</p>
                        </div>
                      ))}
                    </div>
                    <p className="mt-8 text-sm leading-7 text-white/72">
                      If Meta is the better starting point, the campaign needs more than ad management. It needs creative testing, landing page alignment, and follow-up. See my{" "}
                      <Link to="/meta-ads-for-saas" className="font-medium text-primary underline-offset-4 hover:underline">
                        Meta Ads for SaaS service
                      </Link>{" "}
                      for how I run this end-to-end.
                    </p>
                  </div>
                </div>

                <p className="mt-10 max-w-4xl border-t border-[#ded9d1] pt-6 text-base leading-8 text-[#514b5d]">
                  For a deeper breakdown of how landing page structure changes between Google and Meta traffic, see the{" "}
                  <Link to="/blog/saas-landing-page-google-meta-ads" className="font-medium text-primary underline-offset-4 hover:underline">
                    full breakdown of landing page strategy by channel
                  </Link>
                  .
                </p>
              </div>
            </AnimateIn>
          </div>
        </section>

        <section className="bg-[#0f0d19] py-16 text-white">
          <div className="container px-4">
            <AnimateIn>
              <div className="mx-auto flex max-w-5xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
                <div className="max-w-3xl">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary">Common mistake</p>
                  <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
                    Running both channels too early splits the learning.
                  </h2>
                  <p className="mt-5 text-base leading-8 text-white/72">
                    Starting Google Ads and Meta Ads simultaneously from day one seems efficient. In practice, it splits budget and attention before either channel has been optimised.
                  </p>
                </div>
                <Button variant="hero" size="lg" className="group shrink-0" asChild>
                  <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                    Book a Free SaaS Channel Audit
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
              <div className="mx-auto mt-10 max-w-5xl border-t border-white/15 pt-8 text-base leading-8 text-white/72">
                <p>
                  Creative testing on Meta requires iteration. Keyword refinement on Google requires data. Running both at half-budget means neither accumulates enough signal to optimise quickly. The founder looks at two underperforming channels, concludes paid acquisition does not work for the product, and stops.
                </p>
                <p className="mt-5">
                  The better approach: choose one channel, run it long enough to find the angle that works, then layer in the second. Six to eight weeks of focused spend on one channel produces more useful learning than the same budget split across two.
                </p>
              </div>
            </AnimateIn>
          </div>
        </section>

        <section className="border-y border-[#ded9d1] bg-[#faf9f6] py-20 text-[#11101a] md:py-24">
          <div className="container px-4">
            <AnimateIn>
              <div className="mx-auto max-w-6xl">
                <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
                  <div>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary">Decision checklist</p>
                    <h2 className="font-display text-4xl font-bold leading-tight tracking-[-0.035em] text-[#11101a] md:text-5xl">
                      A simple channel decision checklist
                    </h2>
                  </div>
                  <p className="text-lg leading-8 text-[#514b5d]">
                    Use this as a starting point. It is not a substitute for looking at the actual ICP, offer, and page, but it sets the default.
                  </p>
                </div>

                <div className="mt-12 grid gap-x-10 gap-y-0 lg:grid-cols-2">
                  {decisionChecklist.map((item, index) => (
                    <div key={item.situation} className="group grid grid-cols-[3.5rem_1fr] gap-5 border-t border-[#d8d2c9] py-6">
                      <div className="flex items-start justify-between">
                        <span className="font-display text-xl font-bold text-[#bcb5aa] transition-colors group-hover:text-primary">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold leading-7 text-[#11101a]">{item.situation}</p>
                        <p className="mt-1 text-sm leading-7 text-[#514b5d]">{item.startWith}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-10 max-w-4xl border-t border-[#d8d2c9] pt-6 text-base leading-8 text-[#514b5d]">
                  If you already have traffic but few demos or signups, more ad spend usually amplifies the existing conversion problem instead of solving it. A{" "}
                  <Link to="/conversion-rate-optimisation-specialist" className="font-medium text-primary underline-offset-4 hover:underline">
                    SaaS CRO specialist
                  </Link>{" "}
                  review is the cheaper first move.
                </p>
              </div>
            </AnimateIn>
          </div>
        </section>

        <section className="bg-background py-16">
          <div className="container px-4">
            <AnimateIn>
              <div className="mx-auto max-w-5xl">
                <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                  What has to be true before either channel works
                </h2>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                  Both channels share one hard requirement: the landing page has to be able to convert the traffic before spend scales.
                </p>

                <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
                  {landingPageRequirements.map((item, index) => (
                    <div key={item} className="border-t border-border pt-6">
                      <p className="mb-3 text-sm font-bold text-primary">{String(index + 1).padStart(2, "0")}</p>
                      <p className="text-base leading-7 text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </div>

                <p className="mt-10 max-w-4xl text-base leading-8 text-muted-foreground">
                  If any of these are missing, the channel budget will produce data on a broken page. Fix the{" "}
                  <Link to="/landing-page-for-saas" className="font-medium text-primary underline-offset-4 hover:underline">
                    SaaS landing page
                  </Link>{" "}
                  first, then scale the channel.
                </p>
              </div>
            </AnimateIn>
          </div>
        </section>

        <section className="bg-white py-20 text-[#11101a] md:py-24">
          <div className="container px-4">
            <AnimateIn>
              <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <div>
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary">How I look at it</p>
                  <h2 className="font-display text-4xl font-bold leading-[0.98] tracking-[-0.04em] text-[#11101a] md:text-6xl">
                    I look at the landing page before the channel.
                  </h2>
                </div>
                <div className="space-y-0 border-y border-[#ded9d1]">
                  {[
                    "I do not treat paid ads as isolated campaign management.",
                    "For SaaS, a paid channel only works when the positioning, landing page, tracking, CTA, and follow-up path all support the same buyer journey.",
                    "That is where I help: choosing the right channel for your stage, fixing the page before spend scales, and making sure the campaign produces useful learning instead of noisy traffic.",
                  ].map((item, index) => (
                    <div key={item} className="grid gap-5 border-b border-[#ded9d1] py-7 last:border-b-0 sm:grid-cols-[3rem_1fr]">
                      <span className="font-display text-2xl font-bold text-primary">{String(index + 1).padStart(2, "0")}</span>
                      <p className="text-lg leading-8 text-[#514b5d]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        <section className="bg-background py-16">
          <div className="container px-4">
            <AnimateIn>
              <div className="mx-auto max-w-5xl">
                <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">FAQ</h2>
                <div className="mt-10 divide-y divide-border border-y border-border">
                  {faq.map((item) => (
                    <div key={item.question} className="py-7">
                      <h3 className="font-display text-xl font-bold text-foreground">{item.question}</h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {item.answer}
                        {item.link ? (
                          <>
                            {" "}
                            <Link to={item.link} className="font-medium text-primary underline-offset-4 hover:underline">
                              {item.linkLabel}
                            </Link>
                            .
                          </>
                        ) : null}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        <section className="bg-[#0f0d19] py-20 text-white">
          <div className="container px-4">
            <AnimateIn>
              <div className="mx-auto max-w-4xl text-center">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary">Not sure which channel fits your stage?</p>
                <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
                  The right channel depends on demand, page readiness, and offer clarity.
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/72">
                  In a 20-minute channel audit, I can tell you whether Google search demand exists for your ICP, whether Meta is the better starting point, and what the landing page needs before either channel is worth scaling.
                </p>
                <div className="mt-8">
                  <Button variant="hero" size="lg" className="group" asChild>
                    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                      Book a Free SaaS Channel Audit
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>
      </main>

      <Footer hideCTA />
    </div>
  );
}
