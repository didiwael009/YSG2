import { ArrowRight, Check, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import AnimateIn from "@/components/AnimateIn";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { CALENDLY_URL } from "@/lib/constants";

const readinessChecks = [
  {
    title: "Is the ICP narrow enough?",
    body: "\"SaaS founders\" is too broad. \"Seed-stage B2B SaaS founders hiring their first outbound motion\" is usable. If you cannot describe the buyer in one sentence that excludes most of LinkedIn, the targeting is not ready.",
  },
  {
    title: "Does the profile create trust before the message?",
    body: "If a prospect clicks the profile and cannot understand the offer in five seconds, the message has to do work the profile should already be doing.",
  },
  {
    title: "Is the first message asking for too much?",
    body: "A connection request should earn familiarity, not demand a call. The product pitch does not belong here.",
  },
  {
    title: "Is there a follow-up system?",
    body: "LinkedIn alone rarely creates pipeline. It works when it supports email, content, and a clear next step, not as a standalone tactic.",
  },
];

const profileItems = [
  {
    label: "Headline",
    body: "Not your job title. Who you help and what outcome you produce. \"Founder\" tells the visitor nothing. \"I help B2B SaaS founders fix conversion before scaling paid traffic\" tells them everything relevant in one line.",
  },
  {
    label: "About section",
    body: "One paragraph on the problem you solve, for whom, and with what result. Write it for the person reading it, not for a recruiter and not for an algorithm.",
  },
  {
    label: "Featured section",
    body: "One piece of strong proof: a case study, a real result, or a post that shows you understand the problem deeply.",
  },
  {
    label: "Experience section",
    body: "Written in terms of outcomes, not job responsibilities. \"Led GTM execution that contributed to 4x revenue growth at Zembra\" is a proof point. \"GTM strategy and execution\" is a job description.",
  },
];

const sequence = [
  {
    day: "Day 1",
    title: "Connection request",
    body: "Send a connection request on LinkedIn with a short, specific observation. No pitch.",
  },
  {
    day: "Day 2",
    title: "Visible engagement",
    body: "Engage with one of their recent posts. A thoughtful comment is worth more than a like.",
  },
  {
    day: "Day 3",
    title: "First cold email",
    body: "Send the first cold email. The recipient may now recognise your name from LinkedIn, which can lift open and reply rates.",
    link: "/saas-cold-email-strategy",
    linkLabel: "SaaS cold email strategy",
  },
  {
    day: "Day 5",
    title: "Follow-up email",
    body: "If no email reply, send a follow-up email with a new angle, not \"just following up.\"",
  },
  {
    day: "Day 7",
    title: "LinkedIn DM",
    body: "If the LinkedIn connection was accepted, send a brief DM referencing the email thread. Keep it one or two sentences.",
  },
];

const faq = [
  {
    question: "How many LinkedIn connection requests should I send per week for SaaS outreach?",
    answer:
      "Treat the limit as variable because LinkedIn adjusts thresholds based on account type, history, and policy, and stay well within whatever the current cap appears to be for your account. In practice, 20-40 highly targeted connections per week produces better results than pushing volume. Quality of targeting matters more than volume on LinkedIn. A connection from someone who matches your ICP precisely is worth ten connections from people who roughly match a job title filter.",
  },
  {
    question: "Should I use LinkedIn or cold email for B2B SaaS outreach?",
    answer:
      "Both, used together. LinkedIn alone has connection limits that cap reach. Cold email alone misses the trust signals that LinkedIn content and profile visibility create. The combination, where LinkedIn warms the prospect before email arrives, generally outperforms either channel in isolation.",
    link: "/cold-email-for-saas",
    linkLabel: "cold email for SaaS",
  },
  {
    question: "What should I say in a LinkedIn connection request for SaaS?",
    answer:
      "Reference something specific about the person or their company. One observation, one connection to a relevant problem, no CTA. The connection request earns the right to continue the conversation; it does not pitch the product. Keep it under three sentences. If you cannot be specific, do not send it yet.",
  },
  {
    question: "Does LinkedIn outreach work without Sales Navigator?",
    answer:
      "Yes, for early-stage outreach at low volume. The free LinkedIn search has enough filtering capability to build a targeted list for most B2B SaaS ICPs. Sales Navigator becomes worthwhile when you need advanced Boolean search, intent signals, saved lead lists, and the ability to track account changes over time.",
  },
  {
    question: "How do I warm up a LinkedIn profile before outreach?",
    answer:
      "Publish two to three pieces of content relevant to your ICP's problems over 3-4 weeks before starting connection-based outreach. Engage genuinely with posts from people in your target audience: comments that add a specific observation, not generic agreement. This builds profile visibility and demonstrates expertise before a connection request arrives. A prospect who has seen your content once is more likely to accept and respond.",
  },
];

export default function LinkedinOutreachForSaas() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Navigation />

      <main>
        <section className="relative overflow-hidden bg-hero-gradient pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(circle_at_20%_20%,white_0,transparent_30%),radial-gradient(circle_at_85%_15%,white_0,transparent_25%)]" />
          <div className="container relative z-10 px-4">
            <AnimateIn>
              <div className="mx-auto max-w-5xl">
                <p className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-primary">B2B Outreach</p>
                <h1 className="font-display max-w-4xl text-4xl font-bold leading-[0.98] tracking-[-0.04em] text-foreground md:text-6xl lg:text-7xl">
                  LinkedIn Outreach for SaaS: B2B Prospecting That Starts Conversations
                </h1>

                <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.75fr] lg:items-end">
                  <div className="space-y-5 text-lg leading-8 text-muted-foreground">
                    <p>LinkedIn outreach for B2B SaaS is not a volume channel. It is a precision channel.</p>
                    <p>Twenty highly targeted connections per week, warmed by relevant content, with a message that earns a reply rather than demands one: that is what works.</p>
                    <p>Sending generic connection requests at high daily volume with a pitch in the first message is what produces LinkedIn restrictions and zero pipeline. The difference is not effort. It is the order of operations.</p>
                  </div>

                  <div className="rounded-2xl border border-border/60 bg-background/80 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Outreach filter</p>
                    <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                      <p className="flex gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />Narrow ICP</p>
                      <p className="flex gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />Trusted profile</p>
                      <p className="flex gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />Follow-up system</p>
                    </div>
                  </div>
                </div>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Button variant="hero" size="lg" className="group" asChild>
                    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                      Book a 20-min Outreach Diagnosis
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/saas-cold-email-strategy">Read cold email strategy</Link>
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
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary">My rule before outreach</p>
                <h2 className="font-display max-w-3xl text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                  Do not send the message until the setup can earn trust.
                </h2>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                  Before sending a single connection request, I check four things. If any of these four are weak, sending more messages only scales the leak.
                </p>
                <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
                  {readinessChecks.map((item) => (
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
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary">Trust layer</p>
                  <h2 className="font-display text-4xl font-bold leading-[0.98] tracking-[-0.04em] text-[#11101a] md:text-6xl">
                    LinkedIn works before the request is sent.
                  </h2>
                </div>
                <div className="space-y-0 border-y border-[#ded9d1]">
                  {[
                    "High-volume LinkedIn outreach, sending generic connection requests at scale, produces low reply rates and risks account restrictions.",
                    "The most effective LinkedIn outreach strategy for B2B SaaS uses the platform as a warm-up layer: relevant content, real engagement, and a specific connection message.",
                    "A prospect who has seen your content before receiving a connection request is more likely to accept and reply than one receiving a cold connection with no prior exposure.",
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
                <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">Profile optimisation comes first</h2>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                  Every LinkedIn outreach message arrives with a profile attached. If the profile reads like a CV, the message lands without credibility.
                </p>
                <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
                  {profileItems.map((item, index) => (
                    <div key={item.label} className="border-t border-border pt-6">
                      <p className="mb-3 text-sm font-bold text-primary">{String(index + 1).padStart(2, "0")}</p>
                      <h3 className="font-display text-2xl font-bold text-foreground">{item.label}</h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.body}</p>
                    </div>
                  ))}
                </div>
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
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary">Message quality</p>
                    <h2 className="font-display text-4xl font-bold leading-tight tracking-[-0.035em] text-[#11101a] md:text-5xl">
                      The connection request earns the connection.
                    </h2>
                  </div>
                  <p className="text-lg leading-8 text-[#514b5d]">
                    It does not pitch the product. The follow-up starts the conversation. The third or fourth touch is where the call or demo ask belongs.
                  </p>
                </div>

                <div className="mt-12 grid gap-6 lg:grid-cols-2">
                  <div className="rounded-3xl border border-[#ded9d1] bg-white p-7">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#8a8393]">Weak</p>
                    <p className="text-lg leading-8 text-[#514b5d]">
                      "Hi [Name], I came across your profile and was impressed by your experience. I help SaaS companies grow faster with our platform. Would love to connect and share how we&apos;ve helped similar companies. Let me know if you&apos;re open to a quick chat!"
                    </p>
                    <p className="mt-5 border-t border-[#ded9d1] pt-4 text-sm leading-7 text-[#514b5d]">This is a pitch disguised as a connection request. The prospect recognises it as a template and ignores it.</p>
                  </div>
                  <div className="rounded-3xl bg-[#0f0d19] p-7 text-white">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Stronger</p>
                    <p className="text-lg leading-8 text-white/78">
                      Reference something specific: a post they published, a company milestone, or a problem they mentioned publicly. Make no ask.
                    </p>
                    <p className="mt-5 border-t border-white/15 pt-4 text-sm leading-7 text-white/70">
                      The structure: one specific observation + one sentence connecting it to something relevant + no CTA. The connection is the ask.
                    </p>
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        <section className="bg-[#0f0d19] py-16 text-white">
          <div className="container px-4">
            <AnimateIn>
              <div className="mx-auto flex max-w-5xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
                <div className="max-w-3xl">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary">Upstream problem</p>
                  <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
                    Generic messages usually mean generic targeting.
                  </h2>
                  <p className="mt-5 text-base leading-8 text-white/72">
                    If acceptance rates are low and replies are rare, the issue is rarely the wording of a single message. It is usually targeting that is too broad, a profile that does not back up the message, or a follow-up system that does not exist.
                  </p>
                </div>
                <Button variant="hero" size="lg" className="group shrink-0" asChild>
                  <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                    Book a 20-min Outreach Diagnosis
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
            </AnimateIn>
          </div>
        </section>

        <section className="bg-white py-20 text-[#11101a] md:py-24">
          <div className="container px-4">
            <AnimateIn>
              <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <div>
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary">Limits and tools</p>
                  <h2 className="font-display text-4xl font-bold leading-[0.98] tracking-[-0.04em] text-[#11101a] md:text-6xl">
                    LinkedIn limits force precision. Good.
                  </h2>
                </div>
                <div className="space-y-6 text-lg leading-8 text-[#514b5d]">
                  <p>LinkedIn enforces connection-request limits that vary by account type, account history, and current platform policy. Because the exact number changes over time, the safer operating principle is simple: keep volume conservative and prioritise relevance.</p>
                  <p>Sales Navigator expands targeting capabilities significantly: Boolean search, account filters, buyer intent signals, saved leads, and InMail credits for reaching second-degree connections who might not accept a standard request.</p>
                  <p>InMail is useful for reaching second-degree and third-degree connections who will not see a standard connection request. Treat each InMail as a real outreach attempt, not a free shot.</p>
                </div>
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
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary">7-day sequence</p>
                    <h2 className="font-display text-4xl font-bold leading-tight tracking-[-0.035em] text-[#11101a] md:text-5xl">
                      LinkedIn and cold email work better together.
                    </h2>
                  </div>
                  <p className="text-lg leading-8 text-[#514b5d]">
                    LinkedIn creates familiarity and social proof. Email provides the direct ask with more room for context.
                  </p>
                </div>

                <div className="mt-12 grid gap-x-10 gap-y-0 lg:grid-cols-2">
                  {sequence.map((item) => (
                    <div key={item.day} className="group grid grid-cols-[4rem_1fr] gap-5 border-t border-[#d8d2c9] py-6">
                      <div className="flex items-start justify-between">
                        <span className="text-sm font-bold uppercase tracking-[0.16em] text-[#bcb5aa] transition-colors group-hover:text-primary">{item.day}</span>
                        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-bold text-[#11101a]">{item.title}</h3>
                        <p className="mt-2 text-base leading-7 text-[#514b5d]">
                          {item.body}
                          {item.link ? (
                            <>
                              {" "}
                              See the full{" "}
                              <Link to={item.link} className="font-medium text-primary underline-offset-4 hover:underline">
                                {item.linkLabel}
                              </Link>{" "}
                              for sequence structure.
                            </>
                          ) : null}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-10 max-w-4xl border-t border-[#d8d2c9] pt-6 text-base leading-8 text-[#514b5d]">
                  The offer angle, ICP signal, and next step should be identical across LinkedIn and email. Inconsistent messages across channels create confusion instead of familiarity.
                </p>
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
                            See{" "}
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

        <section className="bg-white py-20 text-[#11101a] md:py-24">
          <div className="container px-4">
            <AnimateIn>
              <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <div>
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary">Related SaaS growth work</p>
                  <h2 className="font-display text-4xl font-bold leading-[0.98] tracking-[-0.04em] text-[#11101a] md:text-6xl">
                    Outreach works better when the rest of the path is clear.
                  </h2>
                </div>
                <div className="space-y-0 border-y border-[#ded9d1]">
                  <div className="grid gap-5 border-b border-[#ded9d1] py-7 sm:grid-cols-[3rem_1fr]">
                    <span className="font-display text-2xl font-bold text-primary">01</span>
                    <p className="text-lg leading-8 text-[#514b5d]">
                      If the offer is unclear or the ICP is too broad, start with{" "}
                      <Link to="/saas-marketing-agency" className="font-medium text-primary underline-offset-4 hover:underline">
                        SaaS GTM strategy
                      </Link>
                      . Outreach amplifies whatever message you already have, including a confused one.
                    </p>
                  </div>
                  <div className="grid gap-5 py-7 sm:grid-cols-[3rem_1fr]">
                    <span className="font-display text-2xl font-bold text-primary">02</span>
                    <p className="text-lg leading-8 text-[#514b5d]">
                      If outreach sends people to a weak page, fix the{" "}
                      <Link to="/landing-page-for-saas" className="font-medium text-primary underline-offset-4 hover:underline">
                        SaaS landing page
                      </Link>{" "}
                      before scaling messages. Good outreach into a broken page produces clicks, not pipeline.
                    </p>
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        <section className="bg-[#0f0d19] py-20 text-white">
          <div className="container px-4">
            <AnimateIn>
              <div className="mx-auto max-w-4xl text-center">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary">Build an outreach system that earns replies</p>
                <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
                  If outreach is producing low acceptance, no replies, or stalled conversations, the problem is diagnosable.
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/72">
                  In a 20-minute outreach diagnosis, I will tell you whether the issue is profile positioning, targeting, connection message quality, follow-up logic, or channel sequencing, and what to fix first.
                </p>
                <div className="mt-8">
                  <Button variant="hero" size="lg" className="group" asChild>
                    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                      Book a 20-min Outreach Diagnosis
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
