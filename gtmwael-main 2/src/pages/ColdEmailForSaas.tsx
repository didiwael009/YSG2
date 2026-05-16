import { ArrowRight, CheckCircle2, Mail, Send, Shield, Target, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import AnimateIn from "@/components/AnimateIn";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { CALENDLY_URL } from "@/lib/constants";

const faqItems = [
  {
    question: "What is cold email for SaaS?",
    answer:
      "Cold email for SaaS is outbound email outreach sent to potential buyers who have not previously engaged with your product. Done correctly, it is a direct, scalable way to reach your ideal customer profile, start a conversation, and move qualified prospects toward a demo or trial. Done incorrectly — which is most of the time — it damages sender reputation, produces no replies, and convinces founders the channel does not work.",
  },
  {
    question: "Why is my SaaS cold email going to spam?",
    answer:
      "The most common causes are sending from a primary domain without proper DNS setup, skipping inbox warm-up on new domains, sending too many emails too quickly, high bounce rates from unverified lists, and spam complaint rates above acceptable thresholds. Any one of these is enough to damage deliverability. Often it is a combination. The fix starts with a deliverability audit before sending another email.",
  },
  {
    question: "What reply rate should I expect from B2B cold email?",
    answer:
      "Reply rates vary significantly based on ICP specificity, offer clarity, personalisation quality, and sequence logic. A well-built system targeting a specific ICP with a relevant offer and genuine personalisation can reach 5–10% reply rates. Broad lists with generic copy typically produce under 1%. The gap is not about volume — it is about how well every element of the system is aligned.",
  },
  {
    question: "How many emails should a cold email sequence have?",
    answer:
      "Three to five emails is the standard range for B2B SaaS outreach. The first email introduces the problem and the offer. Follow-up emails add a new angle, a proof point, or a lower-friction ask. The final email is a clear close or a breakup message that invites a reply. More than five emails in quick succession risks spam complaints. Fewer than three leaves replies on the table.",
  },
  {
    question: "Should cold email and LinkedIn outreach run together?",
    answer:
      "Yes, for most B2B SaaS products. Email and LinkedIn reach the same buyer through different channels. A prospect who does not reply to email may respond to a LinkedIn connection. A prospect who sees your LinkedIn content first may be warmer when your email arrives. Running both together — with a consistent message and offer — improves overall reply rates.",
  },
  {
    question: "Do I need a separate domain for cold email?",
    answer:
      "Yes. Sending cold email from your primary domain puts your main email reputation at risk. If deliverability drops or the domain gets blacklisted, it affects all email from that domain — including transactional emails and support replies. A secondary sending domain, configured correctly and warmed up properly, keeps outbound separate from your core infrastructure.",
  },
  {
    question: "How does cold email connect to the landing page?",
    answer:
      "Every cold email sequence sends interested replies somewhere. If that destination is a weak landing page with vague messaging and no ICP signal, the warm-up work done in the email is wasted. The landing page needs to match the offer angle, speak to the same ICP, and make the next step feel low-friction. Cold email and SaaS conversion rate optimisation are connected — a strong sequence needs a strong destination to convert.",
  },
];

const fitItems = [
  "You have tried cold email but reply rates are consistently low.",
  "You are not sure whether the problem is targeting, copy, deliverability, or offer.",
  "You are starting a cold email programme from zero and want to build it correctly from the start.",
  "You are sending reasonable volume but demos booked from outreach are inconsistent or rare.",
  "Your emails are landing in spam or primary open rates have dropped sharply.",
  "You need outbound to support a SaaS landing page or paid channel — not replace them.",
];

const failureReasons = [
  {
    label: "Weak targeting",
    body: "The list is too broad. The ICP is not specific enough. You are emailing job titles instead of people with a specific problem your product solves.",
  },
  {
    label: "Broken infrastructure",
    body: "New domains sent immediately. No warm-up. No DKIM, SPF, or DMARC. Sending from the primary domain. Any of these alone tanks deliverability.",
  },
  {
    label: "Vague offer angle",
    body: "The email explains what the product does instead of why it matters to this specific person right now. There is no clear reason to reply.",
  },
  {
    label: "No real personalisation",
    body: '"I noticed you work in [industry]" is not personalisation. Real personalisation connects something specific about the recipient to a problem your product solves.',
  },
  {
    label: "No follow-up logic",
    body: "Most replies come from follow-up emails. But most sequences have one follow-up that says \"just checking in.\" That is noise, not a system.",
  },
];

const serviceItems = [
  {
    icon: Shield,
    title: "Domain Setup",
    body: "Secondary sending domains configured correctly — separate from your primary, with proper DNS including SPF, DKIM, and DMARC. Keeps deliverability clean and protects your brand.",
  },
  {
    icon: Send,
    title: "Deliverability",
    body: "Warm up new inboxes gradually, set appropriate daily send limits, track bounce and spam complaint rates, and check domain reputation regularly. An ongoing discipline, not a one-time checkbox.",
  },
  {
    icon: Target,
    title: "ICP and List Building",
    body: "Define the ideal customer profile with enough specificity to build a list of people who have an actual reason to care. Smaller than scraped databases. Dramatically higher reply rates.",
  },
  {
    icon: Users,
    title: "Personalisation",
    body: "A personalisation framework that researches a specific signal per prospect — a company announcement, job posting, or product change — and connects it to the offer angle. Around 50% open rates and 7% reply rates when done correctly.",
  },
  {
    icon: Mail,
    title: "Sequences and Follow-Up",
    body: "Three to five emails, each with a distinct purpose. Each follow-up adds something the previous did not: a new angle, proof point, or lower-friction ask. Not \"just checking in.\"",
  },
];

const proofItems = [
  {
    company: "Zembra",
    tag: "Full Cold Email System",
    result: "~50% open rate · 7% reply rate · 4× revenue growth",
    body: "Built and ran the full cold email infrastructure from scratch — domains, warm-up, list segmentation, offer angle, personalisation framework, and sequence logic. Aligned the outbound system with positioning and the landing page.",
  },
  {
    company: "Shipzzer",
    tag: "Niche ICP Sequencing",
    result: "Top 3 rankings · Targeted freight-forwarding outbound",
    body: "Built targeted cold email sequences for freight-forwarding operators — a niche audience with specific pain language that generic sequences miss entirely. Connected outbound to the broader GTM strategy.",
  },
  {
    company: "GrowApp",
    tag: "Founder-Led Outbound",
    result: "Bootstrapped — zero SDR team, efficiency non-negotiable",
    body: "Ran founder-led outbound as a bootstrapped SaaS founder. No budget for volume. The targeting, copy, and follow-up logic had to work on the first attempt.",
  },
];

const ColdEmailForSaas = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* ══════════════════════════════════════════════
          1. HERO — dark
      ══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32 bg-[radial-gradient(circle_at_15%_0%,rgba(124,60,255,0.28),transparent_35%),radial-gradient(circle_at_85%_5%,rgba(255,91,31,0.18),transparent_30%),linear-gradient(135deg,#090713_0%,#170920_46%,#070711_100%)]">
        <div className="container relative z-10 mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 max-w-xl">
              <AnimateIn delay={100}>
                <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">
                  Cold Email Outreach
                </p>
              </AnimateIn>
              <AnimateIn delay={150}>
                <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] mb-6">
                  Cold Email for SaaS: Outreach Strategy That Supports Pipeline
                </h1>
              </AnimateIn>
              <AnimateIn delay={200}>
                <p className="text-lg text-[#cec8dd] mb-8 leading-relaxed">
                  Most SaaS cold email fails before the first message is sent. I build cold email systems for B2B SaaS founders end to end — from domain setup and deliverability to ICP targeting, offer framing, personalisation, and follow-up.
                </p>
              </AnimateIn>
              <AnimateIn delay={250}>
                <ul className="space-y-3 mb-8">
                  {[
                    "Fix targeting, infrastructure, and offer before sending more volume",
                    "~50% open rates and 7% reply rates with the right system",
                    "Outbound that supports pipeline, not just activity metrics",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/90">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </AnimateIn>
              <AnimateIn delay={300}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="hero" size="xl" className="group" asChild>
                    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                      Book a 20-min Cold Email Diagnosis
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                  <Button variant="outline" size="xl" className="border-white/20 text-white hover:bg-white/10" asChild>
                    <Link to="/case-studies">View case studies</Link>
                  </Button>
                </div>
              </AnimateIn>
            </div>

            <AnimateIn delay={200} className="flex-shrink-0 w-full lg:w-auto">
              <div className="relative lg:max-w-md">
                <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full scale-75" />
                <figure className="relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.06] p-3 shadow-[0_28px_90px_rgba(0,0,0,0.32)]">
                  <img
                    src="/cold-email-for-saas-outreach-strategy-wael-aouididi.webp"
                    alt="Cold email for SaaS outreach strategy built by Wael Aouididi for B2B founders"
                    width={1200}
                    height={630}
                    decoding="async"
                    fetchPriority="high"
                    className="aspect-[1200/630] w-full rounded-[20px] object-cover"
                  />
                </figure>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          2. WHY COLD EMAIL FAILS — light
      ══════════════════════════════════════════════ */}
      <section className="rounded-t-[32px] bg-white py-20 md:py-28 shadow-[0_-36px_90px_rgba(0,0,0,0.25)]">
        <div className="container mx-auto px-6">
          <AnimateIn delay={100} className="max-w-2xl mb-14">
            <span className="mb-3 inline-block text-[11px] font-black uppercase tracking-[0.09em] text-primary">
              The Real Problem
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-[46px] text-[#11101a] leading-[1.02] mb-5">
              Why SaaS Cold Email Fails
            </h2>
            <p className="text-[#4d4658] text-lg leading-relaxed">
              The channel works. The execution is usually broken in one of five places. Fix all five and cold email becomes a predictable pipeline channel. Leave any one broken and more volume will not help.
            </p>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mb-12">
            {failureReasons.map((item, i) => (
              <AnimateIn key={item.label} delay={150 + i * 60}>
                <div className="rounded-2xl border border-[#11111f]/10 bg-[#fbfbfe] p-6 h-full hover:border-primary/30 hover:shadow-[0_8px_30px_rgba(124,60,255,0.08)] transition-all duration-300">
                  <p className="text-[11px] font-black uppercase tracking-[0.09em] text-primary mb-2">{item.label}</p>
                  <p className="text-[#4d4658] text-sm leading-relaxed">{item.body}</p>
                </div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn delay={500} className="max-w-2xl">
            <blockquote className="rounded-r-[24px] border-l-[5px] border-primary bg-[#11111f] px-8 py-7 font-display text-xl font-black leading-tight text-white shadow-[0_24px_70px_rgba(7,7,17,0.16)]">
              I do not start with templates. I start by diagnosing which part of the system is broken — and fixing it before sending another email.
            </blockquote>
          </AnimateIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          3. WHO IT'S FOR — dark
      ══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            <AnimateIn delay={100}>
              <span className="mb-3 inline-block text-[11px] font-black uppercase tracking-[0.09em] text-primary">
                Best Fit
              </span>
              <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-[46px] text-white leading-[1.02] mb-5">
                Who This Is For
              </h2>
              <p className="text-[#cec8dd] text-lg leading-relaxed mb-5">
                This is for B2B SaaS founders and small teams who need outbound to support pipeline — not just activity metrics.
              </p>
              <p className="text-[#cec8dd] leading-relaxed">
                Cold email works best as part of a connected acquisition system. That is what I fix.
              </p>
            </AnimateIn>

            <AnimateIn delay={200}>
              <div className="rounded-[26px] bg-[linear-gradient(135deg,#171021,#0d0d1a)] border border-white/10 p-7 shadow-[0_24px_70px_rgba(7,7,17,0.22)]">
                <span className="mb-4 inline-block text-[11px] font-black uppercase tracking-[0.09em] text-primary">
                  You may be a good fit if:
                </span>
                <div className="space-y-3 mb-6">
                  {fitItems.map((item) => (
                    <div key={item} className="flex items-start gap-3 border-b border-white/10 pb-3 last:border-0 last:pb-0">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-[#e2ddf0] text-sm leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
                <Button variant="hero" size="lg" className="group w-full" asChild>
                  <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                    Book a 20-min Cold Email Diagnosis
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          4. WHAT I HANDLE — light
      ══════════════════════════════════════════════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto px-6">
          <AnimateIn delay={100} className="text-center mb-14 max-w-2xl mx-auto">
            <span className="mb-3 inline-block text-[11px] font-black uppercase tracking-[0.09em] text-primary">
              The Work
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-[46px] text-[#11101a] leading-[1.02]">
              What I Handle End to End
            </h2>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {serviceItems.map((item, i) => (
              <AnimateIn key={item.title} delay={150 + i * 70}>
                <div className="rounded-2xl border border-[#11111f]/10 bg-[#fbfbfe] p-7 h-full hover:border-primary/30 hover:shadow-[0_8px_30px_rgba(124,60,255,0.08)] transition-all duration-300">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#11101a] mb-3">{item.title}</h3>
                  <p className="text-[#4d4658] text-sm leading-relaxed">{item.body}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          5. WHAT MAKES THIS DIFFERENT — dark
      ══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <AnimateIn delay={100}>
            <span className="mb-3 inline-block text-[11px] font-black uppercase tracking-[0.09em] text-primary">
              Why Different
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-[46px] text-white leading-[1.02] mb-8">
              What Makes This Different From Templates
            </h2>
          </AnimateIn>
          <AnimateIn delay={150}>
            <div className="grid md:grid-cols-2 gap-5 mb-10">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <p className="text-[11px] font-black uppercase tracking-widest text-white/40 mb-4">Template Thinking</p>
                <ul className="space-y-3">
                  {[
                    "Download the framework, plug in variables, send at volume",
                    "Track open rates as the primary success metric",
                    "Treat copy and infrastructure as separate concerns",
                    "Same frameworks every buyer already recognises",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[#cec8dd] text-sm leading-relaxed">
                      <span className="text-white/25 mt-0.5 font-bold flex-shrink-0">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
                <p className="text-[11px] font-black uppercase tracking-widest text-primary mb-4">System Thinking</p>
                <ul className="space-y-3">
                  {[
                    "ICP informs list, list informs offer, offer informs personalisation",
                    "Sequence connects to a landing page that can hold warmed-up interest",
                    "Every element aligned so the whole system compounds",
                    "Consistent, qualified pipeline — not random replies",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[#e2ddf0] text-sm leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimateIn>
          <AnimateIn delay={200}>
            <p className="text-[#cec8dd] text-lg leading-relaxed max-w-2xl">
              When one element is weak, the whole system underperforms. When all elements are aligned — targeting, infrastructure, offer, personalisation, sequence, and a strong{" "}
              <Link to="/landing-page-for-saas/" className="text-primary hover:underline">
                SaaS landing page
              </Link>{" "}
              as the destination — the channel produces consistent, qualified pipeline.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          6. PROOF — light
      ══════════════════════════════════════════════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto px-6">
          <AnimateIn delay={100} className="text-center mb-14">
            <span className="mb-3 inline-block text-[11px] font-black uppercase tracking-[0.09em] text-primary">
              Real Work
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-[46px] text-[#11101a] leading-[1.02] mb-4">
              Proof and Experience
            </h2>
            <p className="text-[#4d4658] max-w-xl mx-auto leading-relaxed">
              I have run cold email as a founder and as a consultant — which means efficiency and precision matter more than volume.
            </p>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-10">
            {proofItems.map((item, i) => (
              <AnimateIn key={item.company} delay={150 + i * 80}>
                <div className="rounded-2xl border border-[#11111f]/10 bg-[#fbfbfe] p-7 h-full hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(7,7,17,0.09)] transition-all duration-300">
                  <div className="flex items-start justify-between mb-3 gap-3 flex-wrap">
                    <span className="font-display text-xl font-bold text-[#11101a]">{item.company}</span>
                    <span className="text-[11px] font-black uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full whitespace-nowrap">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-sm font-black text-primary mb-3">{item.result}</p>
                  <p className="text-[#4d4658] text-sm leading-relaxed">{item.body}</p>
                </div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn delay={500} className="text-center">
            <Button variant="outline" size="lg" className="border-[#11111f]/20 text-[#11101a] hover:border-primary/40 hover:text-primary" asChild>
              <Link to="/case-studies">
                View all case studies
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </AnimateIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          7. WHO THIS IS NOT FOR + FAQ — dark
      ══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6 max-w-3xl">
          <AnimateIn delay={100} className="mb-16">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-7 md:p-9">
              <span className="mb-3 inline-block text-[11px] font-black uppercase tracking-[0.09em] text-primary">
                Honest Filter
              </span>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-5">
                Who This Is Not For
              </h2>
              <ul className="space-y-3">
                {[
                  "You want a template pack you can send yourself without understanding the system behind it.",
                  "You believe cold email volume solves a targeting or offer problem.",
                  "Your SaaS landing page or demo flow is not ready to convert an interested prospect. Fix that first.",
                  "You want a one-month experiment you will abandon when the first sequence underperforms.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#cec8dd] text-[15px] leading-relaxed">
                    <span className="text-white/25 font-bold mt-0.5 flex-shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[#cec8dd] leading-relaxed text-sm border-l-[3px] border-primary pl-4">
                This works best for founders who want outbound to become a reliable pipeline channel — not a tactic they try and abandon.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          8. FAQ — light
      ══════════════════════════════════════════════ */}
      <section className="bg-white py-20 md:py-28" id="faq">
        <div className="container mx-auto px-6 max-w-3xl">
          <AnimateIn delay={100} className="mb-10">
            <span className="mb-3 inline-block text-[11px] font-black uppercase tracking-[0.09em] text-primary">FAQ</span>
            <h2 className="font-display font-bold text-3xl md:text-[46px] text-[#11101a] leading-[1.02]">
              Frequently Asked Questions
            </h2>
          </AnimateIn>

          <div className="border-t border-[#11111f]/10">
            {faqItems.map((item, index) => (
              <AnimateIn key={item.question} delay={100 + index * 40}>
                <details
                  open={index === 0}
                  className="border-b border-[#11111f]/10 py-5"
                >
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-4">
                    <h3 className="text-base font-black text-[#171421]">{item.question}</h3>
                    <Zap className="w-4 h-4 text-primary flex-shrink-0 opacity-60" />
                  </summary>
                  <p className="mt-3 text-[#5d5668] leading-relaxed text-[15.5px]">{item.answer}</p>
                </details>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          9. FINAL CTA — dark
      ══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6">
          <AnimateIn delay={100}>
            <div className="relative rounded-3xl overflow-hidden bg-[radial-gradient(ellipse_at_top_left,rgba(124,60,255,0.25),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(255,91,31,0.15),transparent_50%),linear-gradient(135deg,#0f0a1a,#170920)] border border-primary/20 p-12 md:p-16 text-center shadow-[0_28px_80px_rgba(7,7,17,0.4)]">
              <span className="mb-4 inline-block text-[11px] font-black uppercase tracking-[0.09em] text-primary">
                Ready to Build a System That Produces Pipeline?
              </span>
              <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-5 max-w-3xl mx-auto leading-tight">
                If your cold email is not producing consistent replies, the problem is diagnosable.
              </h2>
              <p className="text-[#cec8dd] mb-3 max-w-xl mx-auto leading-relaxed">
                In a 20-minute cold email diagnosis, I will tell you whether the issue is targeting, infrastructure, offer, copy, or follow-up — and what to fix first.
              </p>
              <p className="text-[#cec8dd]/70 mb-10 max-w-xl mx-auto leading-relaxed text-sm">
                Bring your current sequence, your open and reply rates, and your ICP definition. We will find the leak.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="hero" size="xl" className="group" asChild>
                  <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                    Book a 20-min Cold Email Diagnosis
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                <Button variant="outline" size="xl" className="border-white/20 text-white hover:bg-white/10" asChild>
                  <Link to="/saas-marketing-agency">SaaS GTM strategy</Link>
                </Button>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <Footer hideCTA />
    </div>
  );
};

export default ColdEmailForSaas;
