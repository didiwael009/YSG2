import { ArrowRight, Check, Mail, ShieldCheck, Target, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import AnimateIn from "@/components/AnimateIn";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { CALENDLY_URL } from "@/lib/constants";

const failurePatterns = [
  {
    title: "Targeting job titles, not problems",
    body: "The list is built from a job title filter and nothing else. There is no signal that these companies are experiencing the specific problem the product solves.",
  },
  {
    title: "Skipping infrastructure setup",
    body: "No warm-up period. Sending from the primary domain. Missing DKIM or DMARC. High bounce rates from unverified lists. The emails technically send, but they land in spam.",
  },
  {
    title: "Volume as the fix for a targeting problem",
    body: "The reply rate is below 1%. The founder increases send volume by 5×. The reply rate stays roughly the same because the original system was broken.",
  },
  {
    title: "Generic follow-ups that add nothing",
    body: "Follow-up emails that all say some version of 'just checking in' train the recipient to ignore the sender and increase spam complaints.",
  },
];

const infraItems = [
  {
    title: "Secondary sending domain",
    body: "Never send cold email from your primary domain. Set up a secondary domain dedicated to outbound so any deliverability damage stays isolated.",
  },
  {
    title: "DNS configuration",
    body: "SPF, DKIM, and DMARC records must be correctly configured on every sending domain before the first email sends.",
  },
  {
    title: "Inbox warm-up",
    body: "Warm the inbox gradually before sending to real prospects. The point is to build reputation with natural-looking activity, not jump straight into volume.",
  },
  {
    title: "List verification",
    body: "Keep bounce rates low and verify every list before sending. Remove invalid addresses, role-based emails, and known spam traps.",
  },
];

const faq = [
  {
    question: "How many cold emails should I send per day for SaaS outreach?",
    answer:
      "Start conservatively, watch bounce rates, spam complaints, replies, and domain health, then increase slowly. A tight list with strong targeting beats a huge spray-and-pray list every time.",
  },
  {
    question: "What is a good cold email reply rate for B2B SaaS?",
    answer:
      "Reply-rate benchmarks vary by ICP, offer, market, data quality, and deliverability. Generic campaigns often sit in the low single digits. Tight targeting and a real offer angle should perform materially better.",
  },
  {
    question: "Do I need a separate domain for cold email?",
    answer:
      "Yes. Sending cold email from your primary domain puts your main email reputation at risk. A secondary sending domain, correctly configured and warmed up, keeps outbound isolated.",
  },
  {
    question: "How long should a B2B cold email sequence be?",
    answer:
      "Three to five emails works best for most B2B SaaS outreach. The first email identifies the problem, the follow-ups add new angles, and the final email gives a clear close or break-up framing.",
  },
  {
    question: "What is the difference between cold email and email marketing?",
    answer:
      "Cold email is outbound outreach to people who have not opted in. Email marketing is permission-based communication to subscribers. The infrastructure, legal requirements, and best practices for each are different.",
  },
];

export default function SaasColdEmailStrategy() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24">
        <section className="relative overflow-hidden bg-background">
          <div className="container px-4 py-12 md:py-16">
            <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <AnimateIn>
                <div className="max-w-3xl">
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-primary">Cold Outreach</p>
                  <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-foreground md:text-6xl">
                    SaaS Cold Email Strategy: Build a Pipeline System, Not a Blast Campaign
                  </h1>
                  <p className="mt-6 text-lg leading-8 text-muted-foreground md:text-xl">
                    Cold email is one of the most direct acquisition channels for B2B SaaS, and one of the most misused.
                    The difference between a system that produces qualified pipeline and one that ends in spam folders is
                    not volume. It is precision.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <Button variant="hero" size="lg" className="group" asChild>
                      <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                        Book a 20-min Cold Email Diagnosis
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </a>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <Link to="/cold-email-for-saas">Cold email for SaaS service</Link>
                    </Button>
                  </div>
                </div>
              </AnimateIn>

              <AnimateIn delay={0.1}>
                <div className="overflow-hidden rounded-[28px] border border-border bg-card shadow-[0_24px_70px_rgba(15,23,42,0.12)]">
                  <img
                    src="/cold-email-for-saas-outreach-strategy-wael-aouididi.webp"
                    alt="SaaS cold email strategy guide by Wael Aouididi"
                    className="h-[320px] w-full object-cover md:h-[420px]"
                    loading="eager"
                  />
                  <div className="space-y-3 p-6">
                    <div className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                      Pipeline system
                    </div>
                    <p className="text-sm leading-7 text-muted-foreground">
                      Before writing the sequence, fix ICP clarity, deliverability, offer specificity, and the conversion
                      path that receives the reply.
                    </p>
                  </div>
                </div>
              </AnimateIn>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-card/50 py-12">
          <div className="container px-4">
            <AnimateIn>
              <div className="mx-auto max-w-4xl rounded-[28px] border border-border bg-background p-8 shadow-[0_16px_50px_rgba(15,23,42,0.06)]">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary">My rule before sending a campaign</p>
                <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                  I do not write the sequence until the system is ready to receive replies.
                </h2>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
                  Before writing the sequence, I check five things: whether the ICP is defined by pain, whether the
                  infrastructure is safe, whether the offer is specific enough to earn a reply, whether each follow-up
                  adds a new reason to respond, and where the reply or click goes next.
                </p>

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {[
                    "ICP defined by pain, not title",
                    "Secondary domain and inbox setup",
                    "Offer specific enough to trigger a reply",
                    "Each follow-up adds a new reason to respond",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl border border-border bg-muted/30 p-4">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <p className="text-sm leading-7 text-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        <section className="py-14">
          <div className="container px-4">
            <AnimateIn>
              <div className="mx-auto max-w-4xl">
                <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                  Targeting: Where SaaS Cold Email Wins or Loses
                </h2>
                <p className="mt-5 text-lg leading-8 text-muted-foreground">
                  The biggest cold email mistake is targeting job titles instead of buyers with a specific, time-sensitive
                  problem. Sending to "VP of Engineering" is not targeting. Sending to a VP of Engineering at a company
                  that just hired two senior engineers, moved to a new CI/CD tool, and posted a DevOps role is targeting.
                </p>
                <p className="mt-4 text-lg leading-8 text-muted-foreground">
                  A tight ICP with a specific trigger produces far better reply rates than a broad list with generic copy.
                  Volume is the worst solution to a targeting problem.
                </p>

                <div className="mt-8 rounded-[28px] border border-border bg-card p-6">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary">Useful targeting signals</p>
                  <ul className="grid gap-3 md:grid-cols-2">
                    {[
                      "Funding announcements in the last 90 days",
                      "Recent hires in the department your product serves",
                      "Technology stack visible through job postings",
                      "Company growth signals such as headcount or launches",
                      "Tool migrations or newly adopted software",
                      "Pain language appearing in public content",
                    ].map((signal) => (
                      <li key={signal} className="flex items-start gap-3 rounded-2xl bg-background px-4 py-3 text-sm leading-7 text-foreground">
                        <Target className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{signal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        <section className="border-y border-border bg-card/50 py-14">
          <div className="container px-4">
            <AnimateIn>
              <div className="mx-auto max-w-4xl">
                <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                  Infrastructure: Before the First Email Sends
                </h2>
                <p className="mt-4 text-lg leading-8 text-muted-foreground">
                  Most cold email failures start before the first message is written. If the infrastructure is weak, the
                  best copy in the world still lands in spam.
                </p>

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {infraItems.map((item) => (
                    <div key={item.title} className="rounded-2xl border border-border bg-background p-5">
                      <div className="mb-3 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                        {item.title}
                      </div>
                      <p className="text-sm leading-7 text-muted-foreground">{item.body}</p>
                    </div>
                  ))}
                </div>

                <p className="mt-6 text-sm leading-7 text-muted-foreground">
                  Major mailbox providers including Gmail and Yahoo have tightened sender requirements at scale.{" "}
                  <a
                    href="https://support.google.com/mail/answer/81126"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    Google's Gmail sender guidelines
                  </a>{" "}
                  cover the current expectations, and the requirements are updated periodically.
                </p>
              </div>
            </AnimateIn>
          </div>
        </section>

        <section className="py-14">
          <div className="container px-4">
            <AnimateIn>
              <div className="mx-auto max-w-4xl">
                <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                  Reply Rate Benchmarks: What Good Actually Looks Like
                </h2>
                <p className="mt-4 text-lg leading-8 text-muted-foreground">
                  Most founders do not know what a realistic cold email reply rate looks like, which makes it hard to
                  diagnose whether the system is working. Benchmarks vary heavily by ICP, offer, market, data quality, and
                  deliverability.
                </p>
                <p className="mt-4 text-lg leading-8 text-muted-foreground">
                  In the Zembra engagement, targeting precision and personalisation quality produced around 50% open rates
                  and around 7% reply rates on outbound sequences. That is not a volume story. It is a system story.
                </p>
              </div>
            </AnimateIn>
          </div>
        </section>

        <section className="border-y border-border bg-card/50 py-14">
          <div className="container px-4">
            <AnimateIn>
              <div className="mx-auto max-w-4xl">
                <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                  The 3-Email Sequence Structure That Works for B2B SaaS
                </h2>
                <p className="mt-4 text-lg leading-8 text-muted-foreground">
                  Most SaaS cold email sequences are either too long or structurally wrong. A three-to-five email sequence
                  works best when each email has a distinct purpose.
                </p>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  {[
                    {
                      icon: Mail,
                      title: "Email 1 — Identify the problem",
                      body: "Earn a reply with a specific problem, a specific ICP, and a low-friction ask.",
                    },
                    {
                      icon: Zap,
                      title: "Email 2 — New angle",
                      body: "Add a proof point, a different framing of the problem, or a specific example relevant to the recipient.",
                    },
                    {
                      icon: ShieldCheck,
                      title: "Email 3 — Soft close",
                      body: "Use a direct question or break-up framing so the recipient can reply without pressure.",
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="rounded-2xl border border-border bg-background p-5">
                        <Icon className="mb-4 h-5 w-5 text-primary" />
                        <h3 className="font-semibold text-foreground">{item.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.body}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        <section className="py-14">
          <div className="container px-4">
            <AnimateIn>
              <div className="mx-auto max-w-4xl">
                <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                  When Cold Email Fails
                </h2>
                <p className="mt-4 text-lg leading-8 text-muted-foreground">
                  Most cold email failures follow one of four patterns. Recognising them is faster than running another
                  sequence to find out.
                </p>

                <div className="mt-8 grid gap-4">
                  {failurePatterns.map((item, index) => (
                    <div key={item.title} className="rounded-[28px] border border-border bg-background p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
                      <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {index + 1}
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        <section className="border-y border-border bg-card/50 py-14">
          <div className="container px-4">
            <AnimateIn>
              <div className="mx-auto max-w-4xl rounded-[28px] border border-primary/20 bg-primary/5 p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Quick diagnosis</p>
                <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                  Not sure whether the issue is targeting, infrastructure, or copy?
                </h2>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
                  Most cold email programmes fail in one of those three places. A short diagnosis usually finds the leak
                  in under 20 minutes.
                </p>
                <div className="mt-6">
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

        <section className="py-14">
          <div className="container px-4">
            <AnimateIn>
              <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                    How Cold Email Connects to the Landing Page
                  </h2>
                  <p className="mt-4 text-lg leading-8 text-muted-foreground">
                    Cold email produces replies. What happens to those replies depends entirely on where they are sent.
                  </p>
                  <p className="mt-4 text-lg leading-8 text-muted-foreground">
                    If a prospect clicks through to a{" "}
                    <Link to="/landing-page-for-saas" className="font-medium text-primary underline-offset-4 hover:underline">
                      SaaS landing page
                    </Link>{" "}
                    that has a vague headline, no ICP signal, and generic proof, the trust built through the personalised
                    email evaporates in the first five seconds on the page.
                  </p>

                  <ul className="mt-6 space-y-3 text-sm leading-7 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      Mirror the offer angle from the email sequence.
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      Name the same ICP the email was targeting.
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      Show proof relevant to the industry or role in the sequence.
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      Make the next step obvious and low-friction.
                    </li>
                  </ul>
                </div>

                <div className="rounded-[28px] border border-border bg-background p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Related links</p>
                  <div className="mt-5 space-y-3">
                    <Link to="/cold-email-for-saas" className="block rounded-2xl border border-border px-4 py-3 text-sm font-medium text-foreground hover:border-primary/30 hover:text-primary">
                      cold email for SaaS service
                    </Link>
                    <Link to="/linkedin-outreach-for-saas" className="block rounded-2xl border border-border px-4 py-3 text-sm font-medium text-foreground hover:border-primary/30 hover:text-primary">
                      LinkedIn outreach for SaaS
                    </Link>
                    <Link to="/saas-marketing-agency" className="block rounded-2xl border border-border px-4 py-3 text-sm font-medium text-foreground hover:border-primary/30 hover:text-primary">
                      SaaS GTM strategy
                    </Link>
                    <Link to="/case-study/zembra" className="block rounded-2xl border border-border px-4 py-3 text-sm font-medium text-foreground hover:border-primary/30 hover:text-primary">
                      Zembra case study
                    </Link>
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        <section className="border-y border-border bg-card/50 py-14">
          <div className="container px-4">
            <AnimateIn>
              <div className="mx-auto max-w-4xl">
                <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">FAQ</h2>
                <div className="mt-8 space-y-6">
                  {faq.map((item) => (
                    <div key={item.question} className="rounded-[24px] border border-border bg-background p-6">
                      <h3 className="text-lg font-semibold text-foreground">{item.question}</h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        <section className="py-14">
          <div className="container px-4">
            <AnimateIn>
              <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_0.85fr]">
                <div className="rounded-[28px] border border-border bg-background p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Related SaaS growth work</p>
                  <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
                    Cold email works better when the GTM message is clear.
                  </h2>
                  <p className="mt-4 text-lg leading-8 text-muted-foreground">
                    If the ICP or offer is unclear, start with{" "}
                    <Link to="/saas-marketing-agency" className="font-medium text-primary underline-offset-4 hover:underline">
                      SaaS GTM strategy
                    </Link>{" "}
                    before scaling outbound. If outreach lands prospects on a weak page, the page is the leak, not the campaign.
                  </p>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    The same diagnosis principle applies to the{" "}
                    <Link to="/landing-page-for-saas" className="font-medium text-primary underline-offset-4 hover:underline">
                      SaaS landing page
                    </Link>{" "}
                    the email replies are sent to.
                  </p>
                </div>

                <div className="rounded-[28px] border border-primary/20 bg-primary/5 p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Next step</p>
                  <h2 className="mt-3 font-display text-2xl font-bold text-foreground">Build a cold email system that produces pipeline</h2>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    If your cold email is not producing consistent replies, the problem is diagnosable. In a 20-minute
                    diagnosis, I will tell you whether the issue is targeting, infrastructure, offer, copy, or follow-up —
                    and what to fix first.
                  </p>
                  <div className="mt-6">
                    <Button variant="hero" size="lg" className="group" asChild>
                      <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                        Book a 20-min Cold Email Diagnosis
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </a>
                    </Button>
                  </div>
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
