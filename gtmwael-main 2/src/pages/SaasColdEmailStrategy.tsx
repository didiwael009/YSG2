import { ArrowRight, Check, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import AnimateIn from "@/components/AnimateIn";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { CALENDLY_URL } from "@/lib/constants";

const preSendChecks = [
  {
    title: "ICP defined by pain, not job title",
    body: "A job title tells you who they are. A trigger, recent hire, funding round, tool migration, or visible pain tells you why they might reply now.",
  },
  {
    title: "Sending infrastructure is safe",
    body: "Domains, inboxes, SPF, DKIM, DMARC, warm-up, and list verification come before copy. Skipping this means the best email can still land in spam.",
  },
  {
    title: "Offer specific enough to earn a reply",
    body: "\"Grow faster\" is not an offer. \"Reduce failed onboarding handoffs after hiring your first CS team\" is closer.",
  },
  {
    title: "Every follow-up adds a new reason",
    body: "If every email says \"just checking in,\" the sequence is noise. Each touch needs its own argument.",
  },
  {
    title: "Reply path continues the message",
    body: "Cold email does not end at the inbox. The landing page and booking flow need the same ICP, problem, and next step.",
  },
];

const targetingSignals = [
  "Funding announcements in the last 90 days",
  "Recent hires in the department your product serves",
  "Technology stack visible through job postings",
  "Company growth signals, new offices, product launches, or headcount changes",
  "Tool migrations or newly adopted software visible in tech stack data",
  "Specific pain language appearing in the company's public content",
];

const infrastructureItems = [
  {
    title: "Secondary sending domain",
    body: "Never send cold email from your primary domain. Set up a secondary domain dedicated to outbound so deliverability risk stays isolated from your main inbox and product emails.",
  },
  {
    title: "DNS configuration",
    body: "SPF, DKIM, and DMARC records must be configured on every sending domain before the first email sends. Missing authentication increases spam placement risk.",
  },
  {
    title: "Inbox warm-up",
    body: "New sending domains should be warmed up gradually before sending to real prospects. Starting at high volume without warm-up can produce immediate spam placement.",
  },
  {
    title: "List verification",
    body: "Every list should be verified before sending. Remove invalid addresses, role-based emails, and known spam traps before they damage sender reputation.",
  },
];

const sequenceSteps = [
  {
    label: "Email 1",
    title: "Identify the problem + low-friction ask",
    body: "The first email does one job: earn a reply. It identifies a specific problem, connects it to the company, and asks a low-friction question.",
  },
  {
    label: "Email 2",
    title: "New angle, not a follow-up",
    body: "The second email should introduce a proof point, a different framing, or a relevant example. It gives a new reason to reply.",
  },
  {
    label: "Email 3",
    title: "Soft close or direct question",
    body: "The third email either asks a direct question or closes the loop. The point is to reduce pressure and invite a low-stakes reply.",
  },
];

const failurePatterns = [
  {
    title: "Targeting job titles, not problems",
    body: "The list is built from a job title filter and nothing else. There is no signal that the companies are experiencing the specific problem the product solves.",
  },
  {
    title: "Skipping infrastructure setup",
    body: "No warm-up period, sending from the primary domain, missing DKIM or DMARC, and unverified lists. The emails technically send. They land in spam.",
  },
  {
    title: "Volume as the fix",
    body: "The reply rate is weak, so the founder increases send volume. The volume multiplied a broken system, not a working one.",
  },
  {
    title: "Follow-ups that add nothing",
    body: "\"Just checking in\" is not a new reason to reply. Each follow-up needs a fresh angle, proof point, or question.",
  },
];

const faq = [
  {
    question: "How many cold emails should I send per day for SaaS outreach?",
    answer:
      "Start conservatively, monitor bounce rates, spam complaints, replies, and domain health, then increase slowly. Specific daily caps depend on inbox age, sender reputation, and current mailbox provider rules, all of which change. The pattern that works for most early-stage SaaS teams is the same regardless of the exact numbers: a well-targeted list of a few hundred contacts per month outperforms a spray-and-pray approach at 5,000+.",
  },
  {
    question: "What is a good cold email reply rate for B2B SaaS?",
    answer:
      "Reply-rate benchmarks vary heavily by ICP, offer, market, data quality, and deliverability. Generic campaigns often sit in the low single digits. A tight, personalised campaign, verified list, properly warmed domain, real offer angle, should perform materially better. The point is less about hitting a specific percentage and more about whether the system is working: if qualified replies are flat or declining, the leak needs to be diagnosed before sending more volume.",
  },
  {
    question: "Do I need a separate domain for cold email?",
    answer:
      "Yes. Sending cold email from your primary domain puts your main email reputation at risk. If deliverability drops or the domain gets flagged, it affects every email from that domain, including transactional emails, product notifications, and support replies. A secondary sending domain, correctly configured and warmed up, keeps outbound isolated.",
  },
  {
    question: "How long should a B2B cold email sequence be?",
    answer:
      "Three to five emails for most B2B SaaS outreach. The first email identifies the problem and makes a low-friction ask. Follow-up emails add new angles or proof points, not \"just checking in\" reminders. The final email is a clear close or break-up framing. Long sequences with no new argument per email tend to raise spam complaints; very short sequences leave replies on the table.",
  },
  {
    question: "What is the difference between cold email and email marketing?",
    answer:
      "Cold email is outbound outreach to people who have not opted in to hear from you. It is one-to-one in tone, highly targeted, and focused on starting a conversation, not broadcasting a message. Email marketing is permission-based, sent to subscribers who have opted in, and typically used for nurture, product updates, and retention. The technical infrastructure, legal requirements, and best practices for each are different.",
  },
];

export default function SaasColdEmailStrategy() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Navigation />

      <main>
        <section className="relative overflow-hidden bg-hero-gradient pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(circle_at_18%_20%,white_0,transparent_28%),radial-gradient(circle_at_82%_10%,white_0,transparent_24%)]" />
          <div className="container relative z-10 px-4">
            <AnimateIn>
              <div className="mx-auto max-w-5xl">
                <p className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-primary">Cold Outreach</p>
                <h1 className="font-display max-w-5xl text-4xl font-bold leading-[0.98] tracking-[-0.04em] text-foreground md:text-6xl lg:text-7xl">
                  SaaS Cold Email Strategy: Build a Pipeline System, Not a Blast Campaign
                </h1>

                <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.75fr] lg:items-end">
                  <div className="space-y-5 text-lg leading-8 text-muted-foreground">
                    <p>Most SaaS cold email fails before the first message is sent.</p>
                    <p>Not because the sequence is weak. Because the targeting is wrong, the infrastructure is broken, and the offer gives the reader no real reason to reply.</p>
                    <p>
                      This guide covers the full SaaS cold email strategy, from domain setup and ICP targeting to offer framing, reply rate benchmarks, and the sequence structure that actually produces qualified pipeline. If you want this built as a service rather than DIYed, see my{" "}
                      <Link to="/cold-email-for-saas" className="text-primary underline underline-offset-4">
                        cold email for SaaS service
                      </Link>
                      .
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border/60 bg-background/80 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Cold email breaks when</p>
                    <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                      <p className="flex gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />The list is too broad</p>
                      <p className="flex gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />The domain is not protected</p>
                      <p className="flex gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />The offer sounds generic</p>
                    </div>
                  </div>
                </div>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Button variant="hero" size="lg" className="group" asChild>
                    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                      Book a 20-min Cold Email Diagnosis
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/linkedin-outreach-for-saas">Read LinkedIn outreach guide</Link>
                  </Button>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        <section className="border-y border-border bg-background py-16">
          <div className="container px-4">
            <AnimateIn>
              <div className="mx-auto max-w-5xl">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary">My rule before sending</p>
                <h2 className="font-display max-w-3xl text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                  If these five are weak, sending more emails only scales the leak.
                </h2>
                <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
                  {preSendChecks.map((item) => (
                    <div key={item.title} className="bg-background p-6 md:p-7">
                      <CheckCircle2 className="mb-5 h-6 w-6 text-primary" />
                      <h3 className="font-display text-xl font-bold text-foreground">{item.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        <section className="bg-[#faf9f6] py-20 text-[#11101a] md:py-24">
          <div className="container px-4">
            <AnimateIn>
              <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <div>
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary">Targeting</p>
                  <h2 className="font-display text-4xl font-bold leading-[0.98] tracking-[-0.04em] text-[#11101a] md:text-6xl">
                    SaaS cold email wins or loses before copy.
                  </h2>
                </div>
                <div className="space-y-6 text-lg leading-8 text-[#514b5d]">
                  <p>The biggest cold email mistake is targeting job titles instead of buyers with a specific, time-sensitive problem.</p>
                  <p>Sending to "VP of Engineering" is not targeting. It is guessing.</p>
                  <p>Sending to VP of Engineering at companies that have recently hired two senior engineers, moved to a new CI/CD tool, and have a public job posting for DevOps is targeting.</p>
                  <p>A tight ICP with a specific trigger generates dramatically higher reply quality than a broad list with generic copy. Volume is the worst solution to a targeting problem.</p>
                </div>
              </div>

              <div className="mx-auto mt-14 grid max-w-6xl gap-x-10 gap-y-5 md:grid-cols-2">
                {targetingSignals.map((signal) => (
                  <div key={signal} className="flex gap-4 border-t border-[#ded9d1] py-5 text-[#514b5d]">
                    <span className="text-primary">{"->"}</span>
                    <p className="text-lg leading-7">{signal}</p>
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>
        </section>

        <section className="bg-[#0f0d19] py-20 text-white md:py-24">
          <div className="container px-4">
            <AnimateIn>
              <div className="mx-auto max-w-6xl">
                <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
                  <div>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary">Infrastructure</p>
                    <h2 className="font-display text-4xl font-bold leading-tight tracking-[-0.035em] text-white md:text-5xl">
                      Before the first email sends, protect deliverability.
                    </h2>
                  </div>
                  <p className="text-lg leading-8 text-white/70">
                    Getting the technical setup wrong destroys the campaign before a human reads a message. This is the most skipped part of most SaaS cold email programmes.
                  </p>
                </div>

                <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/15 bg-white/15 md:grid-cols-2">
                  {infrastructureItems.map((item) => (
                    <div key={item.title} className="bg-[#0f0d19] p-7">
                      <h3 className="font-display text-2xl font-bold text-white">{item.title}</h3>
                      <p className="mt-4 text-sm leading-7 text-white/68">{item.body}</p>
                    </div>
                  ))}
                </div>

                <p className="mt-8 max-w-4xl border-l-2 border-primary pl-5 text-sm leading-7 text-white/70">
                  Major mailbox providers including Gmail and Yahoo have tightened sender requirements at scale. Google's{" "}
                  <a href="https://support.google.com/mail/answer/81126" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-primary underline-offset-4">
                    Gmail sender guidelines
                  </a>{" "}
                  cover the current expectations.
                </p>
              </div>
            </AnimateIn>
          </div>
        </section>

        <section className="bg-background py-20 md:py-24">
          <div className="container px-4">
            <AnimateIn>
              <div className="mx-auto max-w-6xl">
                <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                  <div>
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary">Benchmarks</p>
                    <h2 className="font-display text-4xl font-bold leading-[0.98] tracking-[-0.04em] text-foreground md:text-6xl">
                      What good actually looks like.
                    </h2>
                  </div>
                  <div className="space-y-6 text-lg leading-8 text-muted-foreground">
                    <p>Most founders do not know what a realistic cold email reply rate looks like, which makes it hard to diagnose whether the system is working.</p>
                    <p>Reply-rate benchmarks vary heavily by ICP, offer, market, data quality, and deliverability. Generic, poorly targeted, badly sequenced campaigns often sit in the low single digits. A tight, personalised campaign should perform materially better.</p>
                    <p>
                      In the{" "}
                      <Link to="/case-study/zembra" className="text-primary underline underline-offset-4">
                        Zembra case study
                      </Link>
                      , targeting precision and personalisation quality produced around 50% open rates and around 7% reply rates on outbound sequences, which translated directly into qualified pipeline growth.
                    </p>
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        <section className="border-y border-[#ded9d1] bg-[#faf9f6] py-20 text-[#11101a] md:py-24">
          <div className="container px-4">
            <AnimateIn>
              <div className="mx-auto max-w-6xl">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary">Sequence structure</p>
                <h2 className="font-display max-w-4xl text-4xl font-bold leading-tight tracking-[-0.035em] text-[#11101a] md:text-6xl">
                  The sequence works when each email has a different job.
                </h2>
                <p className="mt-6 max-w-4xl text-lg leading-8 text-[#514b5d]">
                  Most SaaS cold email sequences are either too long or structurally wrong. Multiple emails that all say variations of "just following up" are worse than two emails with a clear point of view.
                </p>

                <div className="mt-12 grid gap-6 lg:grid-cols-3">
                  {sequenceSteps.map((step) => (
                    <div key={step.label} className="rounded-3xl border border-[#ded9d1] bg-white p-7">
                      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">{step.label}</p>
                      <h3 className="font-display text-2xl font-bold text-[#11101a]">{step.title}</h3>
                      <p className="mt-4 text-sm leading-7 text-[#514b5d]">{step.body}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-10 rounded-3xl bg-[#0f0d19] p-7 text-white md:p-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Personalisation test</p>
                  <p className="mt-4 max-w-4xl text-2xl font-semibold leading-snug text-white">
                    "I noticed you work in [industry]" is not personalisation. It is a mail merge.
                  </p>
                  <p className="mt-4 max-w-4xl text-base leading-8 text-white/70">
                    Real personalisation connects something specific about the recipient's company, role, or recent activity to a problem your product solves.
                  </p>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        <section className="bg-background py-20 md:py-24">
          <div className="container px-4">
            <AnimateIn>
              <div className="mx-auto max-w-6xl">
                <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
                  <div>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary">Failure patterns</p>
                    <h2 className="font-display text-4xl font-bold leading-tight tracking-[-0.035em] text-foreground md:text-5xl">
                      When cold email fails, it usually fails in one of four places.
                    </h2>
                  </div>
                  <p className="text-lg leading-8 text-muted-foreground">
                    Recognising the pattern is faster than running another sequence to find out.
                  </p>
                </div>

                <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2">
                  {failurePatterns.map((pattern) => (
                    <div key={pattern.title} className="bg-background p-7">
                      <h3 className="font-display text-2xl font-bold text-foreground">{pattern.title}</h3>
                      <p className="mt-4 text-sm leading-7 text-muted-foreground">{pattern.body}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-12 rounded-3xl bg-[#0f0d19] p-8 text-white shadow-[0_24px_70px_rgba(0,0,0,0.18)] md:p-10">
                  <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Not sure where the leak is?</p>
                      <h3 className="mt-3 font-display text-3xl font-bold text-white">Targeting, infrastructure, or copy?</h3>
                      <p className="mt-4 max-w-3xl text-base leading-8 text-white/70">
                        Low replies can look identical in the dashboard even when the cause is completely different. A short diagnosis usually finds it in under 20 minutes.
                      </p>
                    </div>
                    <Button variant="hero" size="lg" className="group" asChild>
                      <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                        Book diagnosis
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        <section className="bg-[#faf9f6] py-20 text-[#11101a] md:py-24">
          <div className="container px-4">
            <AnimateIn>
              <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <div>
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary">Conversion path</p>
                  <h2 className="font-display text-4xl font-bold leading-[0.98] tracking-[-0.04em] text-[#11101a] md:text-6xl">
                    Cold email connects to the landing page.
                  </h2>
                </div>
                <div className="space-y-6 text-lg leading-8 text-[#514b5d]">
                  <p>
                    Cold email produces replies. What happens to those replies depends entirely on where they are sent.
                  </p>
                  <p>
                    If a prospect replies positively and clicks through to a{" "}
                    <Link to="/landing-page-for-saas" className="text-primary underline underline-offset-4">
                      SaaS landing page
                    </Link>{" "}
                    with a vague headline, no ICP signal, and generic proof, the trust built through the personalised email evaporates in the first five seconds.
                  </p>
                  <p>
                    Cold email and{" "}
                    <Link to="/linkedin-outreach-for-saas" className="text-primary underline underline-offset-4">
                      LinkedIn outreach for SaaS
                    </Link>{" "}
                    are the outbound side of the system. The landing page and demo flow are the inbound conversion side. Both need to work together.
                  </p>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        <section className="bg-background py-20 md:py-24">
          <div className="container px-4">
            <AnimateIn>
              <div className="mx-auto max-w-5xl">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary">FAQ</p>
                <h2 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-6xl">SaaS Cold Email FAQ</h2>
                <div className="mt-10 divide-y divide-border border-y border-border">
                  {faq.map((item) => (
                    <div key={item.question} className="py-7">
                      <h3 className="font-display text-2xl font-bold text-foreground">{item.question}</h3>
                      <p className="mt-4 text-base leading-8 text-muted-foreground">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        <section className="bg-[#faf9f6] py-20 text-[#11101a] md:py-24">
          <div className="container px-4">
            <AnimateIn>
              <div className="mx-auto max-w-5xl">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary">Related SaaS growth work</p>
                <h2 className="font-display text-4xl font-bold tracking-tight text-[#11101a] md:text-5xl">Cold email works better when the GTM message is clear.</h2>
                <div className="mt-10 grid gap-6 md:grid-cols-2">
                  <Link to="/saas-marketing-agency" className="rounded-3xl border border-[#ded9d1] bg-white p-7 transition hover:border-primary/60">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Strategy first</p>
                    <h3 className="mt-4 font-display text-2xl font-bold text-[#11101a]">SaaS GTM strategy</h3>
                    <p className="mt-3 text-sm leading-7 text-[#514b5d]">If the ICP or offer is still unclear, fix the GTM message before scaling outbound.</p>
                  </Link>
                  <Link to="/landing-page-for-saas" className="rounded-3xl border border-[#ded9d1] bg-white p-7 transition hover:border-primary/60">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Conversion path</p>
                    <h3 className="mt-4 font-display text-2xl font-bold text-[#11101a]">SaaS landing page</h3>
                    <p className="mt-3 text-sm leading-7 text-[#514b5d]">If outreach lands prospects on a weak page, the page is the leak, not the campaign.</p>
                  </Link>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        <section className="bg-[#0f0d19] py-20 text-white md:py-24">
          <div className="container px-4">
            <AnimateIn>
              <div className="mx-auto max-w-4xl text-center">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary">Next step</p>
                <h2 className="font-display text-4xl font-bold leading-tight tracking-[-0.035em] text-white md:text-6xl">
                  Build a cold email system that produces pipeline.
                </h2>
                <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/70">
                  Bring your current sequence, your open and reply rates, and your ICP definition. We will find the leak.
                </p>
                <div className="mt-9">
                  <Button variant="hero" size="lg" className="group" asChild>
                    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                      Book a 20-min Cold Email Diagnosis
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
