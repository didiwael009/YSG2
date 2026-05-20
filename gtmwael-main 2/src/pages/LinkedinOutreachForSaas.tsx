import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import AnimateIn from "@/components/AnimateIn";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { CALENDLY_URL } from "@/lib/constants";

const ruleItems = [
  {
    title: "Is the ICP narrow enough?",
    body: '“SaaS founders” is too broad. “Seed-stage B2B SaaS founders hiring their first outbound motion” is usable.',
  },
  {
    title: "Does the profile create trust before the message?",
    body: "If the profile cannot explain the offer in five seconds, the message has to do work the profile should already be doing.",
  },
  {
    title: "Is the first message asking for too much?",
    body: "A connection request should earn familiarity, not demand a call. The pitch does not belong in the first touch.",
  },
  {
    title: "Is there a follow-up system?",
    body: "LinkedIn works when it supports email, content, and a clear next step — not as a standalone tactic.",
  },
];

const profileItems = [
  {
    label: "Headline",
    body: 'Not your job title. Who you help and what outcome you produce. “Founder” tells the visitor nothing.',
  },
  {
    label: "About section",
    body: "One paragraph on the problem you solve, for whom, and with what result. Write it for the person reading it.",
  },
  {
    label: "Featured section",
    body: "One piece of strong proof: a case study, a real result, or a post that shows you understand the problem.",
  },
  {
    label: "Experience section",
    body: "Written in terms of outcomes, not job responsibilities.",
  },
];

const sequenceSteps = [
  {
    day: "Day 1",
    body: "Send a connection request on LinkedIn with a short, specific observation — no pitch.",
  },
  {
    day: "Day 2",
    body: "Engage with one of their recent posts. A thoughtful comment is worth more than a like.",
  },
  {
    day: "Day 3",
    body: "Send the first cold email. The recipient may now recognise your name from LinkedIn.",
  },
  {
    day: "Day 5",
    body: "If no email reply, send a follow-up email with a new angle — not “just following up.”",
  },
  {
    day: "Day 7",
    body: "If the LinkedIn connection was accepted, send a brief DM referencing the email thread.",
  },
];

const faq = [
  {
    q: "How many LinkedIn connection requests should I send per week for SaaS outreach?",
    a: "LinkedIn adjusts limits based on account type, history, and policy, so the operating principle is to stay well within whatever the current cap appears to be for your account. In practice, 20–40 highly targeted connections per week produces better results than pushing volume. Quality of targeting matters more than raw volume on LinkedIn.",
  },
  {
    q: "Should I use LinkedIn or cold email for B2B SaaS outreach?",
    a: "Both, used together. LinkedIn alone has connection limits that cap reach. Cold email alone misses the trust signals that LinkedIn content and profile visibility create. The combination — where LinkedIn warms the prospect before email arrives — generally outperforms either channel in isolation.",
  },
  {
    q: "What should I say in a LinkedIn connection request for SaaS?",
    a: "Reference something specific about the person or their company. One observation, one connection to a relevant problem, no CTA. The connection request earns the right to continue the conversation — it does not pitch the product.",
  },
  {
    q: "Does LinkedIn outreach work without Sales Navigator?",
    a: "Yes, for early-stage outreach at low volume. The free LinkedIn search has enough filtering capability to build a targeted list for most B2B SaaS ICPs. Sales Navigator becomes worthwhile when you need advanced Boolean search, intent signals, saved lead lists, and the ability to track account changes over time.",
  },
  {
    q: "How do I warm up a LinkedIn profile before outreach?",
    a: "Publish two to three pieces of content relevant to your ICP's problems over 3–4 weeks before starting connection-based outreach. Engage genuinely with posts from people in your target audience — comments that add a specific observation, not generic agreement.",
    linkLabel: "cold email for SaaS",
    linkTo: "/cold-email-for-saas",
  },
];

export default function LinkedinOutreachForSaas() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-28 pb-16 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-4xl mx-auto">
              <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">B2B Outreach</p>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
                LinkedIn Outreach for SaaS: B2B Prospecting That Starts Conversations
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl">
                LinkedIn outreach for B2B SaaS is not a volume channel. It is a precision channel. Twenty highly targeted connections per week, warmed by relevant content, with a message that earns a reply rather than demands one — that is what works.
              </p>
              <p className="mt-4 text-muted-foreground max-w-3xl leading-relaxed">
                Sending generic connection requests at high daily volume with a pitch in the first message is what produces restrictions and zero pipeline. The difference is not effort. It is the order of operations.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button variant="hero" size="lg" className="group" asChild>
                  <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                    Book a 20-min Outreach Diagnosis
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                <Link
                  to="/saas-cold-email-strategy"
                  className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  SaaS cold email strategy
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
              <div className="rounded-3xl border border-border bg-background p-6 md:p-8">
                <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">My rule before running LinkedIn outreach</p>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-5 text-foreground">Check the outreach readiness before sending a request</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {ruleItems.map((item) => (
                    <div key={item.title} className="rounded-2xl border border-border bg-card p-5">
                      <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Check className="h-4 w-4" />
                      </div>
                      <p className="font-semibold text-foreground mb-2">{item.title}</p>
                      <p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                  If any of these are weak, sending more messages only scales the leak.
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
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-foreground">LinkedIn as a Trust Layer, Not a Volume Channel</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                High-volume LinkedIn outreach — sending generic connection requests at scale — produces low reply rates and risks account restrictions. The channel works differently than cold email.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                The most effective LinkedIn outreach strategy for B2B SaaS uses the platform as a warm-up layer: publish relevant content, engage with the target audience before connecting, and then send a message that references something specific — not a product pitch.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                A prospect who has seen your content before receiving a connection request is more likely to accept and reply than one receiving a cold connection with no prior exposure. The first impression happens before the connection request is sent.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-12 bg-card border-y border-border">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-foreground">Profile Optimisation Comes First</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Every LinkedIn outreach message arrives with a profile attached. If the profile reads like a CV — job titles, dates, vague accomplishments — the message lands without credibility.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                {profileItems.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-border bg-background p-5">
                    <p className="font-semibold text-foreground mb-2">{item.label}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-foreground">Connection Request Message: What Works vs What Doesn&apos;t</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                The connection request message earns the connection. It does not pitch the product.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-border bg-card p-5">
                  <p className="font-semibold text-foreground mb-3">What a weak connection message looks like</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    “Hi [Name], I came across your profile and was impressed by your experience. I help SaaS companies grow faster with our platform. Would love to connect and share how we've helped similar companies.”
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-background p-5">
                  <p className="font-semibold text-foreground mb-3">What a stronger message looks like</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Reference something specific — a post they published, a company milestone, or a problem they mentioned publicly — and make no ask. One specific observation plus one sentence connecting it to something relevant is enough.
                  </p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                The connection message earns the connection. The follow-up starts the conversation. The third or fourth touch is where the ask for a call or demo belongs — after familiarity has been built.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-12 bg-card border-y border-border">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-foreground">Running LinkedIn and Cold Email Together</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                The same buyer approached by email and LinkedIn with a consistent message responds at meaningfully higher rates than either channel alone. LinkedIn creates familiarity and social proof. Email provides the direct ask with more room for context.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                {sequenceSteps.map((item) => (
                  <div key={item.day} className="rounded-2xl border border-border bg-background p-5">
                    <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">{item.day}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                The offer angle, ICP signal, and next step should be identical across LinkedIn and email. Inconsistent messages across channels create confusion instead of familiarity.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-foreground">FAQ</h2>
              <div className="space-y-6">
                {faq.map((item) => (
                  <div key={item.q} className="rounded-2xl border border-border bg-card p-6">
                    <h3 className="font-display text-xl font-bold mb-3 text-foreground">{item.q}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.a}</p>
                    {"linkTo" in item && item.linkTo ? (
                      <Link to={item.linkTo} className="mt-3 inline-flex text-sm font-medium text-primary hover:underline">
                        {item.linkLabel}
                      </Link>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-foreground">Related SaaS Growth Work</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-border bg-card p-5">
                  <p className="text-sm leading-relaxed text-muted-foreground mb-3">
                    LinkedIn outreach works better when the rest of the acquisition path is clear.
                  </p>
                  <Link to="/saas-marketing-agency" className="inline-flex text-sm font-medium text-primary hover:underline">
                    SaaS GTM strategy
                  </Link>
                </div>
                <div className="rounded-2xl border border-border bg-background p-5">
                  <p className="text-sm leading-relaxed text-muted-foreground mb-3">
                    If outreach sends people to a weak page, fix the conversion path before scaling messages.
                  </p>
                  <Link to="/landing-page-for-saas" className="inline-flex text-sm font-medium text-primary hover:underline">
                    SaaS landing page
                  </Link>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                Build an Outreach System <span className="text-gradient">That Earns Replies</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                I build outbound systems that combine cold email and LinkedIn into one coherent pipeline channel — with consistent messaging, a proper warm-up sequence, and a conversion path that qualifies before the call.
              </p>
              <Button variant="hero" size="lg" className="group" asChild>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                  Book a 20-min Outreach Diagnosis
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
