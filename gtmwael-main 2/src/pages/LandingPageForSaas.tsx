import { ArrowRight, CheckCircle2, FileText, Layout, MessageSquare, Shield, Smartphone, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import AnimateIn from "@/components/AnimateIn";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { CALENDLY_URL } from "@/lib/constants";

const faqItems = [
  {
    question: "What makes a SaaS landing page different from a regular landing page?",
    answer:
      "B2B SaaS buyers do not impulse-buy. They evaluate, compare, return, and then decide. A SaaS landing page needs to earn trust across multiple sessions, answer objections before they are asked, and guide a sceptical technical or commercial buyer through a longer evaluation process. Generic landing page advice written for e-commerce or lead-gen does not account for this.",
  },
  {
    question: "Should I fix the landing page before running ads?",
    answer:
      "Yes, in almost every case. Paid traffic amplifies what is already on the page. If the page has weak messaging, vague proof, or friction in the demo flow, more ad spend makes those problems more expensive — not less visible. Fix the page first, then scale the channel. For a detailed comparison of how Google Ads and Meta Ads need different landing page approaches, see the Google Ads vs Meta Ads SaaS landing page article.",
  },
  {
    question: "How long should a SaaS landing page be?",
    answer:
      "Long enough to earn the conversion, short enough to hold attention. For most B2B SaaS products, this means a page that answers who it is for, what problem it solves, why to trust it, and what happens next — typically across five to seven clear sections. Length matters less than whether each section earns the next scroll.",
  },
  {
    question: "Do I need a separate landing page for ads vs organic traffic?",
    answer:
      "Sometimes. If your ad traffic is coming from a specific audience with a specific pain point, a dedicated landing page with message match to that ad will almost always convert better than sending paid traffic to a generic homepage. Message match between the ad and the page is one of the highest-impact fixes available.",
  },
  {
    question: "What is a good conversion rate for a B2B SaaS landing page?",
    answer:
      "A good conversion rate depends on traffic source, offer, ACV, sales motion, and ICP specificity. If a qualified landing page is consistently below 1%, there is usually a messaging, trust, or friction problem worth diagnosing before spending more on SaaS conversion rate optimisation.",
  },
  {
    question: "Do you rewrite the copy or just give recommendations?",
    answer:
      "I rewrite where needed. Recommendations without execution are not useful at this stage. The audit identifies what is broken. The execution fixes it — including hero rewrites, proof section restructuring, CTA copy, and objection handling.",
  },
  {
    question: "How does the landing page connect to cold email and ads?",
    answer:
      "Every outbound channel sends traffic somewhere. If that destination is a page that does not convert, the channel fails — regardless of how good the email or ad was. I look at the full path: cold email copy → landing page → demo flow. Each step needs to match the next. A strong cold email sequence that sends replies to a weak page wastes the outreach work entirely.",
  },
];

const fitItems = [
  "Your page gets traffic but demo bookings are weak or inconsistent.",
  "You are running Meta Ads or cold email and the landing page is not converting the traffic.",
  "You have a strong product but the website does not explain it clearly enough to earn a demo.",
  "Visitors land on your page and leave without taking any action.",
  "You have updated the design but conversions have not moved.",
  "You are about to launch a paid campaign and want the page ready before spending.",
];

const failureReasons = [
  {
    label: "Headline describes product, not outcome",
    body: '"All-in-one project management for teams" tells me what the product is. It does not tell me why I should care, who it is built for, or what problem it solves.',
  },
  {
    label: "Speaks to everyone, converts no one",
    body: "No named ICP, no specific industry signal, no language that makes a particular type of founder feel seen. The copy is generic enough to apply to any SaaS product in any category.",
  },
  {
    label: "Proof that earns nothing",
    body: "Logos from companies no one recognises. Testimonials that say \"great product\" with no specifics. Star ratings from review platforms without context.",
  },
  {
    label: "CTA asks for too much too soon",
    body: "The page asks for a demo before explaining what the product does. Or it buries the CTA after a wall of text nobody read. Either way, commitment is asked for before value is delivered.",
  },
  {
    label: "Designed, not written",
    body: "The visual is clean. The layout is professional. But the copy was treated as filler. Copy does not fill a design. Copy drives conversion. Design supports it.",
  },
];

const fixItems = [
  {
    icon: Layout,
    title: "Hero Clarity",
    body: "Rewrite the hero so it answers three questions in the first scroll: who is this for, what painful problem does it solve, and why should I trust this enough to keep reading.",
  },
  {
    icon: MessageSquare,
    title: "CTA Hierarchy",
    body: "Restructure the CTA hierarchy so the page guides visitors from awareness to interest to action. The primary CTA appears at the right moments. The page earns the demo request before asking for it.",
  },
  {
    icon: Shield,
    title: "Proof and Trust",
    body: "Rebuild the proof section so it earns trust at the moments it matters most: after the hero, before the CTA, and around any friction points. Real proof is specific — it names a role, a company, a problem, and a result.",
  },
  {
    icon: FileText,
    title: "Objection Handling",
    body: "Map the most common objections for your ICP and weave answers into the page at the right points — so visitors get their questions answered without having to ask them.",
  },
  {
    icon: Smartphone,
    title: "Mobile Friction",
    body: "Most SaaS founders review pages on desktop. Most buyers encounter the page on mobile. I check load speed, CTA visibility, form usability, and text readability specifically for mobile.",
  },
];

const pageStructure = [
  {
    number: "01",
    title: "Hero",
    body: "ICP-specific headline. Outcome-focused subheadline. One primary CTA. Optional social proof line.",
  },
  {
    number: "02",
    title: "Problem",
    body: "Name the painful situation your buyer is in. Make them feel seen. Do not pitch the product yet. Earn the right to pitch by demonstrating you understand the problem.",
  },
  {
    number: "03",
    title: "Solution",
    body: "Introduce the product as the specific fix for the specific problem named above. Keep it outcome-focused, not feature-focused.",
  },
  {
    number: "04",
    title: "Proof",
    body: "Specific testimonials with named roles and results. Case study references with real numbers where possible. Logos with context, not just a grid of images.",
  },
  {
    number: "05",
    title: "How it works",
    body: "Three to five steps showing what happens after the visitor takes action. Reduce uncertainty about the demo or trial process. Make the next step feel safe.",
  },
  {
    number: "06",
    title: "Objection handling",
    body: "Address the two or three questions every qualified visitor has before committing. Keep it short and honest.",
  },
  {
    number: "07",
    title: "CTA",
    body: "Repeat the primary CTA with a specific, low-friction framing that tells them what the next 20 minutes will look like.",
  },
];

const proofItems = [
  {
    company: "Zembra",
    tag: "Hero + Proof Rebuild",
    result: "Contributed to 4× revenue growth",
    body: "The page had no clear ICP signal and generic proof. Repositioned the hero, rebuilt the proof section, and aligned the page with the outbound traffic flow.",
  },
  {
    company: "Shipzzer",
    tag: "ICP Messaging + SEO",
    result: "Top-3 organic rankings · Stronger ICP clarity",
    body: "Reworked the messaging for freight-forwarding operators, then aligned the page with the broader GTM strategy and SEO foundations.",
  },
  {
    company: "GrowApp",
    tag: "From Zero",
    result: "Bootstrapped — zero to AppSumo launch",
    body: "Built the landing page and AppSumo listing from zero as a bootstrapped founder. No team, no agency, no design budget — just positioning, copy, proof, and a conversion path that had to sell.",
  },
  {
    company: "Bottle Nexus",
    tag: "Rebrand + Paid Acquisition",
    result: "Paid traffic with a conversion-ready destination",
    body: "Full creative rebrand, landing page restructure, and paid acquisition support — connecting ad creative to a conversion-ready page for the first time.",
  },
];

const LandingPageForSaas = () => {
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
                  SaaS Landing Page Strategy
                </p>
              </AnimateIn>
              <AnimateIn delay={150}>
                <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] mb-6">
                  Landing Page for SaaS: Strategy, Messaging, and CRO
                </h1>
              </AnimateIn>
              <AnimateIn delay={200}>
                <p className="text-lg text-[#cec8dd] mb-8 leading-relaxed">
                  A SaaS landing page is not a design asset. It is where your positioning, proof, trust signals, and conversion intent meet. I restructure landing pages so visitors understand the offer fast, trust the product, and take the next step — before they leave.
                </p>
              </AnimateIn>
              <AnimateIn delay={250}>
                <ul className="space-y-3 mb-8">
                  {[
                    "Hero clarity, CTA hierarchy, proof, and objection handling",
                    "Rewrites included — not just recommendations",
                    "Fix the page before spending more on traffic",
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
                      Book a 20-min SaaS Landing Page Diagnosis
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
                    src="/saas-landing-page-strategy-messaging-cro-wael-aouididi.webp"
                    alt="SaaS landing page strategy and CRO audit by Wael Aouididi for B2B founders"
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
          2. WHY LANDING PAGES FAIL — light
      ══════════════════════════════════════════════ */}
      <section className="rounded-t-[32px] bg-white py-20 md:py-28 shadow-[0_-36px_90px_rgba(0,0,0,0.25)]">
        <div className="container mx-auto px-6">
          <AnimateIn delay={100} className="max-w-2xl mb-14">
            <span className="mb-3 inline-block text-[11px] font-black uppercase tracking-[0.09em] text-primary">
              The Real Problem
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-[46px] text-[#11101a] leading-[1.02] mb-5">
              Why SaaS Landing Pages Fail
            </h2>
            <p className="text-[#4d4658] text-lg leading-relaxed">
              The landing page is the conversion point for every channel.{" "}
              <Link to="/meta-ads-for-saas" className="text-primary hover:underline">Meta Ads for SaaS</Link>{" "}
              sends paid traffic there. Cold email sends replies there. SEO sends organic visitors there. If the page does not convert, every channel becomes more expensive and less predictable. That is where focused{" "}
              <Link to="/conversion-rate-optimisation-specialist" className="text-primary hover:underline">SaaS conversion rate optimisation</Link>{" "}
              makes the difference.
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
              Most founders treat the landing page as a final step. The landing page is the conversion point. Everything else sends traffic there.
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
                Who This Service Is For
              </h2>
              <p className="text-[#cec8dd] text-lg leading-relaxed mb-5">
                This is for B2B SaaS founders whose landing page is not doing its job — whether you are running paid ads, outbound, or organic traffic to it.
              </p>
              <p className="text-[#cec8dd] leading-relaxed mb-4">
                You do not need a redesign first. You need a diagnosis. That is what I fix. If you are working on a broader{" "}
                <Link to="/saas-marketing-agency" className="text-primary hover:underline">SaaS GTM strategy</Link>,
                {" "}fixing the landing page first makes every other channel more effective.
              </p>
              <p className="text-[#cec8dd] leading-relaxed">
                If you are getting traffic but not demos, the{" "}
                <Link to="/blog/saas-traffic-but-no-signups" className="text-primary hover:underline">SaaS traffic but no signups guide</Link>{" "}
                explains the most common causes before you book an audit.
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
                    Book a 20-min SaaS Landing Page Diagnosis
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          4. WHAT I FIX — light
      ══════════════════════════════════════════════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto px-6">
          <AnimateIn delay={100} className="text-center mb-14 max-w-2xl mx-auto">
            <span className="mb-3 inline-block text-[11px] font-black uppercase tracking-[0.09em] text-primary">
              The Work
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-[46px] text-[#11101a] leading-[1.02]">
              What I Fix on Your SaaS Landing Page
            </h2>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {fixItems.map((item, i) => (
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
          5. PAGE STRUCTURE — dark
      ══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6">
          <AnimateIn delay={100} className="text-center mb-14 max-w-2xl mx-auto">
            <span className="mb-3 inline-block text-[11px] font-black uppercase tracking-[0.09em] text-primary">
              The Structure
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-[46px] text-white leading-[1.02] mb-4">
              The Page Structure I Recommend
            </h2>
            <p className="text-[#cec8dd] leading-relaxed">
              There is no universal SaaS landing page template. But there is a sequence I use when a page needs to convert sceptical B2B buyers. The goal is to earn the conversion before asking for it.
            </p>
          </AnimateIn>

          <div className="max-w-3xl mx-auto border-t border-white/10">
            {pageStructure.map((step, i) => (
              <AnimateIn key={step.number} delay={150 + i * 70}>
                <div className="grid grid-cols-[64px_1fr] gap-6 border-b border-white/10 py-8">
                  <div className="text-[13px] font-black tracking-widest text-primary pt-1">{step.number}</div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-[#cec8dd] leading-relaxed text-[15.5px]">{step.body}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
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
              I have restructured landing pages across multiple B2B SaaS products, both as a consultant and as a founder who needed his own pages to convert.
            </p>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto mb-10">
            {proofItems.map((item, i) => (
              <AnimateIn key={item.company} delay={150 + i * 80}>
                <div className="rounded-2xl border border-[#11111f]/10 bg-[#fbfbfe] p-7 h-full hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(7,7,17,0.09)] transition-all duration-300">
                  <div className="flex items-start justify-between mb-3 gap-3">
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
          7. WHO THIS IS NOT FOR — dark
      ══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6 max-w-3xl">
          <AnimateIn delay={100}>
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-7 md:p-9">
              <span className="mb-3 inline-block text-[11px] font-black uppercase tracking-[0.09em] text-primary">
                Honest Filter
              </span>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-5">
                Who This Is Not For
              </h2>
              <ul className="space-y-3">
                {[
                  "You want a landing page redesign without touching the copy or positioning. Design without clear messaging does not convert.",
                  "You want generic SaaS landing page templates. Templates do not account for your ICP, your offer, your proof, or your conversion bottleneck.",
                  "You are not willing to change the headline. The headline is almost always part of the problem.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#cec8dd] text-[15px] leading-relaxed">
                    <span className="text-white/25 font-bold mt-0.5 flex-shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[#cec8dd] leading-relaxed text-sm border-l-[3px] border-primary pl-4">
                This works best for founders who know the page is not working and want to understand exactly why — then fix it.
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
                  <p className="mt-3 text-[#5d5668] leading-relaxed text-[15.5px]">
                    {item.question === "Should I fix the landing page before running ads?" ? (
                      <>
                        Yes, in almost every case. Paid traffic amplifies what is already on the page. If the page has weak messaging, vague proof, or friction in the demo flow, more ad spend makes those problems more expensive — not less visible. Fix the page first, then scale the channel. For a detailed comparison of how Google Ads and Meta Ads need different landing page approaches, see the{" "}
                        <Link to="/blog/saas-landing-page-google-meta-ads" className="text-primary hover:underline">Google Ads vs Meta Ads SaaS landing page article</Link>.
                      </>
                    ) : (
                      item.answer
                    )}
                  </p>
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
                Ready to Fix Your SaaS Landing Page?
              </span>
              <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-5 max-w-3xl mx-auto leading-tight">
                If your page is getting traffic but not converting demos, the problem is diagnosable and fixable.
              </h2>
              <p className="text-[#cec8dd] mb-3 max-w-xl mx-auto leading-relaxed">
                In a 20-minute SaaS landing page diagnosis, I will tell you exactly what is stopping visitors from converting and what to fix first.
              </p>
              <p className="text-[#cec8dd]/70 mb-10 max-w-xl mx-auto leading-relaxed text-sm">
                Bring your landing page URL and your current traffic source. We will find what is breaking the conversion.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="hero" size="xl" className="group" asChild>
                  <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                    Book a 20-min SaaS Landing Page Diagnosis
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                <Button variant="outline" size="xl" className="border-white/20 text-white hover:bg-white/10" asChild>
                  <Link to="/conversion-rate-optimisation-specialist">SaaS conversion rate optimisation</Link>
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

export default LandingPageForSaas;
