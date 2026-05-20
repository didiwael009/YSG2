import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import AnimateIn from "@/components/AnimateIn";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { CALENDLY_URL } from "@/lib/constants";

const comparisonRows = [
  { label: "Visitor intent", google: "Actively searching for a solution", meta: "Interrupted while scrolling" },
  { label: "Best fit", google: "Established categories with search demand", meta: "New or niche categories; retargeting" },
  { label: "Landing page requirement", google: "Intent-matched, short, fast to CTA", meta: "Education-first, more proof, softer ask" },
  { label: "Practical starting budget", google: "~$2,000-3,000/month for signal", meta: "~$1,500-2,500/month for creative testing" },
  { label: "Best use case", google: "Capture buyers already evaluating solutions", meta: "Build awareness and retarget warm audiences" },
];

const ruleChecks = [
  {
    title: "Does the ICP already search for this problem?",
    body: "If yes, Google has a head start. If no, Meta is usually the better entry point.",
  },
  {
    title: "Can the landing page convert cold or high-intent traffic?",
    body: "If the page is weak, the channel will only produce data on a broken page.",
  },
  {
    title: "Is the offer clear enough to justify the click cost?",
    body: "A vague offer can survive low CPCs. It cannot survive expensive traffic.",
  },
];

const googleChecklist = [
  "Use a keyword-matched headline that feels close to the search query.",
  "Show the value proposition quickly within the first screen.",
  "Keep the page short and move fast to the CTA.",
  "Put trust signals above the fold.",
  "Make the CTA visible fast.",
  "Remove unnecessary navigation and distractions.",
  "Prioritise fast loading speed.",
];

const metaChecklist = [
  "Keep visual continuity from ad to page.",
  "Educate the visitor on the problem before asking for action.",
  "Use more storytelling and problem framing.",
  "Add more social proof and founder credibility.",
  "Use a softer first ask when the visitor is cold.",
  "Continue the conversation started by the ad.",
];

const faq = [
  {
    q: "Is Google Ads or Meta Ads better for B2B SaaS?",
    a: "Neither is universally better. Google Ads works better when buyers are already searching for a solution and Meta Ads works better when buyers are not yet searching and need to be made aware of the problem or category.",
  },
  {
    q: "How much budget do I need to test Google Ads for SaaS?",
    a: "A practical starting budget is often around $2,000-3,000 per month to get enough signal to optimise. Below that, clicks are usually too few to identify what is working and what is wasting budget.",
  },
  {
    q: "Can I run Google Ads and Meta Ads at the same time for SaaS?",
    a: "Yes, but only after at least one channel is optimised. Running both from day one on a limited budget produces weak signal from both.",
  },
  {
    q: "What landing page do I need for Google Ads vs Meta Ads?",
    a: "They are different. Google traffic needs a short, intent-matched page. Meta traffic needs more context, education, and proof before asking for the demo.",
  },
];

export default function GoogleAdsVsMetaAdsSaas() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-28 pb-16 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">Paid Acquisition</p>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Google Ads vs Meta Ads for SaaS: Which Channel Fits Your Stage?
              </h1>
              <p className="text-lg text-muted-foreground">
                Google captures demand that already exists. Meta creates demand before buyers know they are looking. Both can work for B2B SaaS, but they require different landing pages, different offers, and different expectations.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button variant="hero" size="lg" className="group" asChild>
                  <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                    Book a Free SaaS Channel Audit
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                <Link to="/blog/saas-landing-page-google-meta-ads" className="inline-flex items-center text-sm font-medium text-primary hover:underline">
                  Read the landing page breakdown
                </Link>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-12 bg-card border-y border-border">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl font-bold mb-6 text-foreground">The Core Difference: Intent</h2>
              <div className="overflow-hidden rounded-2xl border border-border bg-background">
                <table className="w-full text-left">
                  <thead className="bg-muted/40">
                    <tr>
                      <th className="px-4 py-3 text-sm font-semibold text-foreground">Signal</th>
                      <th className="px-4 py-3 text-sm font-semibold text-foreground">Google Ads</th>
                      <th className="px-4 py-3 text-sm font-semibold text-foreground">Meta Ads</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row) => (
                      <tr key={row.label} className="border-t border-border">
                        <td className="px-4 py-4 align-top font-medium text-foreground">{row.label}</td>
                        <td className="px-4 py-4 align-top text-sm text-muted-foreground">{row.google}</td>
                        <td className="px-4 py-4 align-top text-sm text-muted-foreground">{row.meta}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl font-bold mb-4 text-foreground">My Rule Before Choosing Any Paid Channel</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Before choosing Google Ads or Meta Ads for a SaaS client, I check three things. If one of them is weak, the channel is not the first problem to solve. The conversion path is.
              </p>
              <div className="grid gap-5 md:grid-cols-3">
                {ruleChecks.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-border bg-card p-5">
                    <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-4 w-4" />
                    </div>
                    <p className="font-semibold text-foreground mb-2">{item.title}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-12 bg-card border-y border-border">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl font-bold mb-4 text-foreground">When to Start With Google Ads</h2>
              <p className="text-muted-foreground mb-5 leading-relaxed">
                Google Ads works when buyers are already searching for a solution like yours. It is the better starting point when the category is established, the query is clear, and the page can move fast to a conversion action.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-border bg-background p-5">
                  <p className="font-semibold text-foreground mb-3">Use Google when:</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {googleChecklist.slice(0, 4).map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-border bg-background p-5">
                  <p className="font-semibold text-foreground mb-3">Why it wins:</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• It captures existing demand instead of trying to create it.</li>
                    <li>• The buyer already knows the problem and is closer to action.</li>
                    <li>• A well-matched landing page can convert the click quickly.</li>
                    <li>• It works best when search demand and category language already exist.</li>
                  </ul>
                </div>
              </div>
              <div className="mt-5 rounded-2xl border border-border bg-muted/30 p-5">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Google Ads struggles when the category is too niche or too new for search demand to exist. If the core query has very low volume, Meta is usually the better starting point.
                </p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl font-bold mb-4 text-foreground">When to Start With Meta Ads</h2>
              <p className="text-muted-foreground mb-5 leading-relaxed">
                Meta Ads works when you need to create demand, not capture it. It gives you room to test creative angles and message fit before committing to expensive search keywords.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-border bg-background p-5">
                  <p className="font-semibold text-foreground mb-3">Use Meta when:</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {metaChecklist.slice(0, 3).map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-border bg-background p-5">
                  <p className="font-semibold text-foreground mb-3">Why it wins:</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• It is stronger for new or niche categories.</li>
                    <li>• It lets you build retargeting audiences while awareness is low.</li>
                    <li>• It gives you creative signal before you scale spend.</li>
                    <li>• It works best when the page can educate before it converts.</li>
                  </ul>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-4 text-sm">
                <Link to="/meta-ads-for-saas" className="text-primary hover:underline">Meta Ads for SaaS service</Link>
                <Link to="/blog/saas-landing-page-google-meta-ads" className="text-primary hover:underline">Full breakdown of landing page strategy by channel</Link>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-12 bg-card border-y border-border">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl font-bold mb-4 text-foreground">The Most Common Mistake: Running Both Too Early</h2>
              <div className="rounded-3xl bg-slate-950 p-6 md:p-8 text-slate-100">
                <p className="text-lg font-semibold mb-4">Running Google Ads and Meta Ads from day one looks efficient. In practice, it splits budget and attention before either channel is ready.</p>
                <p className="text-slate-300 leading-relaxed mb-5">
                  Creative testing on Meta requires iteration. Keyword refinement on Google requires data. If you split spend too early, neither channel accumulates enough signal to optimise quickly.
                </p>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• The founder sees two underperforming channels instead of one clear learning loop.</li>
                  <li>• The page gets blamed before the message has been tested properly.</li>
                  <li>• The team stops before the channel has time to prove its fit.</li>
                </ul>
                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                  Traffic sent to a broken foundation is burned budget.
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl font-bold mb-4 text-foreground">What Has to Be True Before Either Channel Works</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-border bg-background p-5">
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li>• The landing page headline names the outcome for a specific ICP.</li>
                    <li>• The proof is specific, named, and relevant to the buyer.</li>
                    <li>• The primary CTA is one clear action, not three competing options.</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-border bg-background p-5">
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li>• The mobile experience is tested and the CTA is visible on a small screen.</li>
                    <li>• Basic conversion tracking exists before spend scales.</li>
                    <li>• The page is ready to convert the traffic before the channel budget grows.</li>
                  </ul>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-4 text-sm">
                <Link to="/landing-page-for-saas" className="text-primary hover:underline">Fix the SaaS landing page first</Link>
                <Link to="/conversion-rate-optimisation-specialist" className="text-primary hover:underline">SaaS CRO specialist</Link>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-12 bg-card border-y border-border">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl font-bold mb-4 text-foreground">A Simple Channel Decision Checklist</h2>
              <div className="overflow-hidden rounded-2xl border border-border bg-background">
                <table className="w-full text-left">
                  <thead className="bg-muted/40">
                    <tr>
                      <th className="px-4 py-3 text-sm font-semibold text-foreground">Your situation</th>
                      <th className="px-4 py-3 text-sm font-semibold text-foreground">Start with</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Buyers already search for your category", "Google Ads"],
                      ["Category is new, niche, or unnamed", "Meta Ads"],
                      ["Landing page is weak or unproven", "Fix the page first"],
                      ["Budget is limited", "Pick one channel and run it longer"],
                      ["Existing traffic but few demos or signups", "CRO before more spend"],
                      ["Strong visual story, low search volume", "Meta Ads"],
                    ].map(([left, right]) => (
                      <tr key={left} className="border-t border-border">
                        <td className="px-4 py-4 align-top text-sm text-muted-foreground">{left}</td>
                        <td className="px-4 py-4 align-top text-sm font-medium text-foreground">{right}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl font-bold mb-4 text-foreground">Why I Look at the Landing Page Before the Channel</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                For SaaS, a paid channel only works when the positioning, landing page, tracking, CTA, and follow-up path all support the same buyer journey. A great campaign on top of a confused page produces clicks, not pipeline.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                That is where I help: choosing the right channel for your stage, fixing the page before spend scales, and making sure the campaign produces useful learning instead of noisy traffic.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <Link to="/landing-page-for-saas" className="text-primary hover:underline">SaaS landing page</Link>
                <Link to="/meta-ads-for-saas" className="text-primary hover:underline">Meta Ads for SaaS</Link>
                <Link to="/blog/saas-landing-page-google-meta-ads" className="text-primary hover:underline">Landing page strategy by channel</Link>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                Not Sure Which <span className="text-gradient">Channel Fits</span> Your Stage?
              </h2>
              <p className="text-muted-foreground mb-8">
                In a 20-minute channel audit, we can identify whether Google search demand exists for your ICP, whether Meta is the better starting point, and what the landing page needs before either channel is worth scaling.
              </p>
              <Button variant="hero" size="lg" className="group" asChild>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                  Book a Free SaaS Channel Audit
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-16 bg-card border-t border-border">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl font-bold mb-6 text-foreground">FAQ</h2>
              <div className="space-y-5">
                {faq.map((item) => (
                  <div key={item.q} className="rounded-2xl border border-border bg-background p-5">
                    <p className="font-semibold text-foreground mb-2">{item.q}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <Footer hideCTA />
    </div>
  );
}
