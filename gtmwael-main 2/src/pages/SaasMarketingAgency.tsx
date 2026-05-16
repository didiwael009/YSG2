import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

const faqItems = [
  {
    question: "What does a SaaS marketing agency do?",
    answer:
      "A SaaS marketing agency typically helps software companies with channels like SEO, paid ads, content, email, CRO, and demand generation. The problem is that many agencies treat these as separate services. For early-stage SaaS companies, the bigger need is often a connected GTM system — positioning, landing pages, conversion path, analytics, and acquisition working together.",
  },
  {
    question: "Are you a SaaS marketing agency?",
    answer:
      "Not in the traditional sense. I work more like a fractional SaaS growth lead. I help founders diagnose what is blocking growth, fix the core conversion assets, and connect GTM execution across landing pages, CRO, ads, outreach, SEO content, and analytics.",
  },
  {
    question: "When should a SaaS founder hire a marketing agency?",
    answer:
      "You should hire a SaaS marketing agency when you already have clear positioning, a proven offer, working conversion paths, reliable tracking, and enough budget to scale execution. If those pieces are not clear yet, you likely need a GTM and conversion diagnosis first.",
  },
  {
    question: "What should I fix before spending more on SaaS marketing services?",
    answer:
      "Start with positioning, landing page clarity, CTA hierarchy, proof, analytics, and conversion friction. If these are weak, more traffic usually creates more waste — not more pipeline.",
  },
  {
    question: "Do you offer SaaS marketing services?",
    answer:
      "Yes. I help with SaaS positioning, GTM strategy, landing pages, CRO, Meta Ads, cold email, LinkedIn outreach, analytics, and SEO content as part of a wider growth system.",
  },
  {
    question: "Do you help with SEO for SaaS?",
    answer:
      "Yes, but SEO is not a standalone service. I use it as part of a wider SaaS growth system — to capture intent and support trust and pipeline, not just rankings.",
  },
  {
    question: "Do you help with paid ads?",
    answer:
      "Yes. I help with Meta Ads and paid acquisition strategy, especially where ads need better landing pages, stronger offers, clearer tracking, and better conversion paths.",
  },
  {
    question: "Do you help with cold email?",
    answer:
      "Yes. I help with the full cold email process: targeting, domain setup, deliverability, personalisation, sequences, follow-up copy, and testing.",
  },
];

const fitItems = [
  "You have traffic but weak demo bookings.",
  "You are running ads, but the landing page is not converting.",
  "You send cold emails, but replies are low or inconsistent.",
  "You have a strong product, but the website does not explain it clearly.",
  "You are too early for a full B2B SaaS marketing agency but too busy to keep guessing.",
  "You need someone who can think strategically and still execute.",
];

const methodSteps = [
  "Clarify the positioning.",
  "Fix the landing page.",
  "Remove conversion friction.",
  "Make tracking visible.",
  "Scale acquisition.",
];

const SaasMarketingAgency = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
          <div className="container relative z-10 mx-auto px-6">
            <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div className="max-w-3xl">
                <p className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                  SaaS GTM Strategy
                </p>
                <h1 className="mb-6 font-display text-4xl font-bold leading-tight text-foreground md:text-6xl">
                  SaaS Marketing Agency Alternative for B2B Founders
                </h1>
                <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
                  <p>Most B2B SaaS founders do not need a bigger marketing team first.</p>
                  <p>
                    They need a sharper message, a clearer landing page, a stronger offer, and a conversion path that does
                    not leak trust before the demo call.
                  </p>
                  <p>
                    I work with B2B SaaS founders who need practical GTM execution — not another bloated SaaS marketing
                    agency selling isolated tactics while pipeline stays random.
                  </p>
                  <p>
                    I fix the foundation before scaling traffic: positioning, landing pages, CRO, analytics, cold email,
                    paid ads, and the full path from first visit to qualified pipeline.
                  </p>
                </div>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link
                    to="/book"
                    className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                  >
                    Book a 20-min GTM Audit
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link
                    to="/case-studies"
                    className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:text-primary"
                  >
                    View SaaS case studies
                  </Link>
                </div>
              </div>

              <div className="rounded-3xl border border-border/60 bg-card/70 p-4 shadow-2xl shadow-primary/10">
                <img
                  src="/saas-marketing-agency-alternative-wael-aouididi.webp"
                  alt="Wael Aouididi SaaS marketing agency alternative for B2B founders"
                  width={1200}
                  height={630}
                  decoding="async"
                  fetchpriority="high"
                  className="aspect-[1200/630] w-full rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-4xl px-6">
            <article className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-primary">
              <p className="text-xl leading-relaxed text-foreground">
                Because more traffic does not fix a weak message. It only exposes it faster.
              </p>

              <h2>Why Most SaaS Marketing Agencies Fail Early-Stage Founders</h2>
              <p>Most agencies start with a channel.</p>
              <ul>
                <li>SEO agency? More content.</li>
                <li>Paid ads agency? More campaigns.</li>
                <li>Cold email agency? More sequences.</li>
                <li>Design agency? A nicer landing page.</li>
              </ul>
              <p>That sounds useful until you realise the real problem is not the channel.</p>
              <p>The problem is usually this:</p>
              <ul>
                <li>Your positioning is vague.</li>
                <li>Your homepage does not explain the product fast enough.</li>
                <li>Your landing page gives visitors no reason to trust you.</li>
                <li>Your demo CTA appears before the buyer understands the value.</li>
                <li>Your analytics do not show where people drop.</li>
                <li>Your outbound message sounds like every other SaaS pitch.</li>
                <li>Your paid traffic lands on a page that was never built to convert.</li>
              </ul>
              <p>
                So the founder keeps buying tactics. More ads. More emails. More posts. More tools. More dashboards.
              </p>
              <p>But the pipeline still feels random.</p>
              <p>
                That is why I do not start by asking: which channel should we scale? I start by asking: why would a
                serious buyer trust this enough to take the next step?
              </p>

              <h2>Who This Is For</h2>
              <p>
                This is for B2B SaaS founders and small teams who already have something real but cannot turn attention
                into consistent pipeline.
              </p>
              <p>You may be a good fit if:</p>
              <ul>
                {fitItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>You do not need a 40-slide strategy deck. You need the right problems fixed in the right order.</p>
              <p>
                <strong>
                  That is the situation I fix. <Link to="/book">Book a 20-min GTM Audit</Link> and I will tell you where
                  the bottleneck is.
                </strong>
              </p>

              <h2>How the Engagement Works</h2>
              <h3>1. Diagnosis</h3>
              <p>
                I review your website, funnel, messaging, acquisition channels, and conversion path. The goal is to find
                what is blocking trust, demos, trials, or qualified pipeline.
              </p>
              <h3>2. Bottleneck Map</h3>
              <p>
                You get a clear list of what to fix first. Not everything matters equally. Some fixes improve clarity fast.
                Some reduce friction. Some make ads cheaper. Some improve outbound reply rates. We focus on the
                highest-leverage fixes first.
              </p>
              <h3>3. Execution</h3>
              <p>
                I help rewrite, restructure, test, and improve the core GTM assets — homepage,{" "}
                <Link to="/services/landing-page">landing page</Link>, cold email sequence, ad angle, analytics setup, or{" "}
                <Link to="/blog/saas-traffic-but-no-signups">B2B SaaS marketing strategy</Link>.
              </p>
              <h3>4. Iteration</h3>
              <p>
                Once the foundation is stronger, we review performance and decide what to scale. More traffic only makes
                sense when the page, offer, and funnel are ready.
              </p>

              <h2>What I Fix Before Scaling Traffic</h2>
              <p>
                Positioning affects the landing page.
                <br />
                The landing page affects paid ads.
                <br />
                Paid ads affect analytics.
                <br />
                Analytics affects CRO.
                <br />
                CRO affects pipeline.
              </p>
              <p>
                When these pieces are handled separately, growth becomes slow and expensive. My role is to find the
                bottleneck and fix the part of the system that is holding back pipeline.
              </p>

              <h3>Positioning</h3>
              <p>
                If buyers cannot understand what you do in a few seconds, every channel becomes harder. I clarify who the
                product is for, what painful problem it solves, why it matters now, and why your solution is different.
                This is not abstract brand work. It is conversion work.
              </p>

              <h3>Landing Page Clarity</h3>
              <p>
                A SaaS landing page is not a design asset. I restructure the page so visitors quickly understand the offer,
                the value, the proof, the CTA, and the reason to trust you — before they leave. See the full{" "}
                <Link to="/services/landing-page">SaaS landing page strategy</Link> if this is your current bottleneck.
              </p>

              <h3>CRO and Conversion Path</h3>
              <p>
                <Link to="/services/landing-page">SaaS conversion rate optimisation</Link> is not button-colour testing. I
                look for confusion, doubt, weak proof, CTA friction, mobile issues, form friction, and broken steps between
                the first visit and the demo booking.
              </p>

              <h3>Paid Ads and Message Match</h3>
              <p>
                Ads do not work in isolation. Before recommending more spend, I check whether the ad angle, audience
                intent, landing page, CTA, tracking, and follow-up path are strong enough to convert. If you are running{" "}
                <Link to="/services/meta-ads">Meta Ads for SaaS</Link>, this is usually where money is leaking.
              </p>

              <h3>Cold Email and Outreach</h3>
              <p>
                <Link to="/services/cold-email">Cold email for SaaS</Link> is not just a sequence. I help with targeting,
                deliverability, personalisation, offer angle, follow-ups, and reply handling — so outreach supports real
                pipeline, not just open rates. I have achieved around 50% open rates and 7% reply rates across SaaS
                outreach campaigns.
              </p>

              <h3>Analytics and Growth Visibility</h3>
              <p>
                A lot of SaaS teams do not have a growth problem. They have a visibility problem. I help define the basic
                events, conversion points, and funnel signals needed to make better decisions — without vanity dashboards.
              </p>

              <h2>Why This Is Different From a Typical B2B SaaS Marketing Agency</h2>
              <p>A typical B2B SaaS marketing agency gives you specialists.</p>
              <p>
                One person for content. One person for ads. One person for design. One person for reporting. One account
                manager between you and the actual work.
              </p>
              <p>That can work for later-stage teams with a clear GTM system already in place.</p>
              <p>
                But early-stage SaaS companies usually need something else. They need one person who can connect
                positioning, landing pages, acquisition, CRO, outreach, analytics, and execution.
              </p>
              <p>That is the gap I fill — as a practical SaaS growth partner, not a generic vendor.</p>
              <p>
                If you want to see how this translates into a full{" "}
                <Link to="/blog/landing-page-optimization-best-practices-2026">SaaS marketing plan</Link>, that breakdown
                is available separately.
              </p>

              <h2>Proof and Experience</h2>
              <p>I am not a generic marketer trying to "serve SaaS." I have built and scaled SaaS products myself.</p>
              <p>
                <strong>Zembra:</strong> The product had traction but unclear positioning and a cold email system that was
                not converting. I repositioned the offer, rebuilt the outreach infrastructure, and aligned GTM execution —
                contributing to 4× revenue growth.
              </p>
              <p>
                <strong>Shipzzer:</strong> A B2B SaaS platform in freight forwarding with weak search visibility and
                unclear ICP messaging. I restructured the positioning, built cold email sequences, and developed SEO
                foundations that helped the product compete for top organic rankings on core industry terms.
              </p>
              <p>
                <strong>GrowApp:</strong> A bootstrapped SaaS product I built and launched from zero — including product
                marketing, landing page, AppSumo launch execution, and the full acquisition system.
              </p>
              <p>
                <strong>Bottle Nexus:</strong> Full rebrand, creative direction, landing page restructure, and paid
                acquisition support — connecting ads to a conversion-ready page for the first time.
              </p>
              <p>I bring operator context. Not just B2B SaaS marketing agency theory.</p>
              <p>That matters because early-stage SaaS growth is rarely a single-channel problem.</p>

              <h2>The Method: Fix Trust Before Scaling Traffic</h2>
              <p>Most founders want more leads. That is understandable.</p>
              <p>But before adding more traffic, I look for the trust gaps that stop people from converting.</p>
              <p>The sequence is:</p>
              <ol>
                {methodSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <p>
                This is slower than saying "let's launch ads tomorrow." But it prevents wasted budget. And growth works
                better when the foundation can hold the traffic.
              </p>

              <h2>When You Should Not Hire Me</h2>
              <p>Do not hire me if you want a hands-off vendor who disappears for a month and sends a report.</p>
              <p>Do not hire me if you want generic content at volume.</p>
              <p>Do not hire me if you want someone to "just run ads" without touching the page, offer, or tracking.</p>
              <p>Do not hire me if you believe traffic alone will fix weak positioning.</p>
              <p>
                This works best when the founder is willing to fix the uncomfortable parts: the message, the page, the
                offer, the proof, and the conversion path.
              </p>
              <p>That is where the leverage is.</p>

              <h2 id="faq">FAQ</h2>
              {faqItems.map((item) => (
                <section key={item.question} className="not-prose border-b border-border py-6">
                  <h3 className="mb-3 font-display text-xl font-bold text-foreground">{item.question}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                </section>
              ))}

              <div className="not-prose mt-14 rounded-3xl border border-primary/20 bg-primary/10 p-8 md:p-10">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                  Ready to Find the Real Growth Bottleneck?
                </p>
                <h2 className="mb-4 font-display text-3xl font-bold text-foreground">Anyone can make promises.</h2>
                <p className="mb-4 text-muted-foreground">
                  In a 20-minute GTM Audit, you will know quickly whether I understand your problem.
                </p>
                <p className="mb-7 text-muted-foreground">
                  Bring your website, your current funnel, and the channel you are trying to scale. I will tell you what
                  is wrong, what to fix first, and whether more traffic is actually the next move.
                </p>
                <Link
                  to="/book"
                  className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                >
                  Book a 20-min GTM Audit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </article>
          </div>
        </section>

        <section className="border-t border-border py-12">
          <div className="container mx-auto grid gap-4 px-6 md:grid-cols-3">
            {[
              "Positioning before channels",
              "Trust before traffic",
              "Pipeline before vanity metrics",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card/50 p-5">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="font-medium text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SaasMarketingAgency;
