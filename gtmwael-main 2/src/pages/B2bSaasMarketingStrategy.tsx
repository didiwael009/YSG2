import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import AnimateIn from "@/components/AnimateIn";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { CALENDLY_URL } from "@/lib/constants";

const faqItems = [
  {
    question: "What is a B2B SaaS marketing strategy?",
    answer:
      "A B2B SaaS marketing strategy is the set of decisions that connects ICP, positioning, buyer journey, channel selection, conversion path, and pipeline measurement into a system that turns the right attention into qualified pipeline. It is not a channel plan — it is the thinking that makes channel execution worth doing.",
  },
  {
    question: "How do you create a B2B SaaS marketing strategy?",
    answer:
      "Start with ICP and positioning — not channels. Map the buyer journey to understand what stage of awareness your buyers are in. Choose channels that match buyer intent. Fix the conversion path. Set up tracking that connects marketing to pipeline. Add follow-up to close the gap between interest and decision.",
  },
  {
    question: "What channels work best for B2B SaaS?",
    answer:
      "It depends on the ICP, buyer awareness stage, ACV, and sales motion. Cold email works best for narrow ICPs with painful, specific problems. SEO works best when buyers actively search for the problem or category. Paid ads work best once the conversion path is validated. LinkedIn works best when trust and education matter. The right channel is the one that reaches the specific buyer at the stage where they are most likely to act.",
  },
  {
    question: "What is the difference between a SaaS marketing strategy and a GTM strategy?",
    answer:
      "A GTM strategy defines the overall commercial approach: who you are selling to, how you will reach them, and how the sales motion works. A marketing strategy is focused on how marketing creates demand and pipeline within that direction. The GTM strategy sets direction. The marketing strategy executes the demand generation piece.",
  },
  {
    question: "How long does a B2B SaaS marketing strategy take to work?",
    answer:
      "Cold email can produce pipeline within weeks if ICP, offer, and infrastructure are right. SEO typically takes six to twelve months to compound meaningfully. Paid ads need two to three months minimum to generate optimisation data. Fixing the foundations — positioning, landing page, conversion path — produces results across every channel simultaneously.",
  },
  {
    question: "Should early-stage SaaS founders focus on SEO, ads, or outbound first?",
    answer:
      "For most early-stage B2B SaaS founders, cold email is the highest-leverage starting point. It provides fast feedback on positioning and offer, requires no paid spend, and produces qualified conversations quickly when the ICP is specific. SEO should run in parallel as a medium-term investment. Paid ads make sense once the conversion path is validated. See the SaaS GTM strategy page for how this plays out in practice.",
  },
];

export default function B2bSaasMarketingStrategy() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* ══════════════════════════════════════════════
          HERO — dark
      ══════════════════════════════════════════════ */}
      <section className="pt-28 pb-16 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">
                B2B SaaS Growth
              </p>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight text-foreground">
                B2B SaaS Marketing Strategy: What to Fix Before Scaling Traffic
              </h1>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Most B2B SaaS teams do not fail because they picked the wrong channel.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                They fail because they scale before the strategy is clear. They run ads before the positioning is sharp. They publish content before knowing what buyers actually search for. They send cold emails before the ICP is tight. They redesign the website before understanding why visitors do not convert.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                A B2B SaaS marketing strategy should not start with "which channel should we use?" It should start with: <strong className="text-foreground">what needs to be true before any channel can produce pipeline?</strong>
              </p>

              {/* Quick Answer */}
              <div className="rounded-xl border border-border bg-card/60 p-6 mb-8">
                <p className="text-sm font-semibold text-foreground mb-1">Quick Answer</p>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  A B2B SaaS marketing strategy is the system of decisions that connects the right buyer to the right message through the right channel — and converts that attention into qualified pipeline. It must answer six questions:
                </p>
                <ol className="space-y-2">
                  {[
                    ["Who is the best-fit buyer?", "ICP, role, trigger, and urgency"],
                    ["Why would they choose this product?", "Positioning over every alternative"],
                    ["Where are they in their awareness?", "Buyer journey stage and trust gap"],
                    ["Which channel reaches them best?", "Based on intent, not preference"],
                    ["What happens after they click?", "Conversion path and demo flow"],
                    ["How do we know it is working?", "Pipeline metrics, not activity metrics"],
                  ].map(([q, a], i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                      <span className="text-primary font-bold flex-shrink-0 min-w-[20px]">{i + 1}.</span>
                      <span><strong className="text-foreground">{q}</strong> — {a}</span>
                    </li>
                  ))}
                </ol>
                <p className="text-xs text-muted-foreground mt-4 border-t border-border pt-4">
                  If any of these six are vague, the strategy is not ready. Channels will underperform until the answers are clear.
                </p>
              </div>

              {/* Strategy order */}
              <div className="rounded-lg border border-border bg-card/40 px-5 py-4 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground mr-2">Strategy order:</span>
                ICP → Positioning → Buyer Journey → Channel Fit → Conversion Path → Pipeline Measurement
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          WHAT IT IS + WHY FAILS — light
      ══════════════════════════════════════════════ */}
      <section className="py-16 bg-white border-y border-[#11111f]/10">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto space-y-12">

              {/* What it actually is */}
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-[#11101a]">
                  What a B2B SaaS Marketing Strategy Actually Is
                </h2>
                <p className="text-[#4d4658] mb-4 leading-relaxed">
                  A B2B SaaS marketing strategy is not a channel plan. It is not a content calendar. It is not a list of tactics sorted by quarter.
                </p>
                <p className="text-[#4d4658] mb-4 leading-relaxed">It is the set of decisions that connects:</p>
                <ul className="space-y-2 mb-5 pl-1">
                  {[
                    ["ICP", "who the best-fit buyer is"],
                    ["Positioning", "why this product over every alternative"],
                    ["Offer", "what you are asking the buyer to do and why now"],
                    ["Buyer journey", "where they are in their awareness and what they need at each stage"],
                    ["Conversion path", "what happens between first contact and a closed deal"],
                    ["Acquisition channels", "where this buyer already looks or listens"],
                    ["Analytics", "what signals show that marketing is creating pipeline"],
                    ["Follow-up", "how momentum is maintained between interest and decision"],
                  ].map(([label, body]) => (
                    <li key={label} className="flex items-start gap-3 text-sm text-[#4d4658] leading-relaxed">
                      <span className="text-primary mt-1 flex-shrink-0">→</span>
                      <span><strong className="text-[#11101a]">{label}</strong> — {body}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[#4d4658] leading-relaxed">
                  Its job is not to create marketing activity. Its job is to turn the right attention into qualified pipeline. The difference between a strategy and a plan matters. The{" "}
                  <Link to="/saas-marketing-plan" className="text-primary hover:underline">SaaS marketing plan</Link>{" "}
                  is the execution layer — which channels, which timelines, which specific activities. The strategy is the thinking that makes the plan worth executing. Without a clear strategy, the best marketing plan produces activity without direction.
                </p>
              </div>

              {/* Why strategies fail */}
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-[#11101a]">
                  Why Most B2B SaaS Marketing Strategies Fail
                </h2>
                <p className="text-[#4d4658] mb-6 leading-relaxed">
                  Most B2B SaaS marketing strategies fail not because founders are careless — but because the failure happens silently. Activity looks healthy. Emails are sent. Content is published. Ads are running. But pipeline stays flat or random.
                </p>
                <div className="space-y-4">
                  {[
                    { label: "ICP is too broad", body: '"B2B companies" is not an ICP. "SMBs" is not an ICP. "Operations teams" is still too broad. When the ICP is vague, every downstream decision — messaging, channel, content, offer — is also vague.' },
                    { label: "Positioning is too generic", body: "The website explains what the product does but not why a specific buyer should choose it over alternatives they are already using. The message could apply to any competitor in the category." },
                    { label: "Website built around features, not buyer pain", body: "The homepage explains capabilities. Visitors cannot identify their own problem in the copy, so they do not see themselves as the buyer." },
                    { label: "Channels chosen by popularity, not intent match", body: "A founder reads that LinkedIn works for B2B SaaS and starts posting. Another sees a competitor running Meta Ads and copies the approach. Neither decision is based on where their specific ICP actually is." },
                    { label: "Ads sent to weak pages", body: "Paid traffic lands on a homepage or feature page with no ICP signal, no specific proof, and a high-friction CTA. The ads produce clicks that do not convert." },
                    { label: "SEO content written for traffic, not pipeline", body: "Articles are published for broad keywords that attract the wrong audience. Traffic grows but demos do not." },
                    { label: "Cold email sent to bad-fit lists", body: "The targeting is too broad, the message is generic, and the offer does not connect a specific problem to a specific outcome. Reply rates stay low and the team learns very little because the targeting was wrong from the start." },
                    { label: "No tracking between traffic and revenue", body: "The team knows how many visitors came and how many opened the email. Nobody knows which channel created qualified pipeline." },
                    { label: "No follow-up system after demos", body: "Interested prospects fall out of the funnel between the first conversation and the decision because nobody maintained the momentum." },
                  ].map((item) => (
                    <div key={item.label} className="p-4 rounded-lg border border-[#11111f]/10 bg-[#f9f8fc]">
                      <p className="font-semibold text-[#11101a] mb-1.5">{item.label}</p>
                      <p className="text-sm text-[#4d4658] leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[#4d4658] mt-5 leading-relaxed text-sm">
                  Each of these is a strategy failure — not a tactics failure. Fixing them requires a different order of operations, not more activity.
                </p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          STEPS 1–2 — dark
      ══════════════════════════════════════════════ */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto space-y-14">

              {/* Step 1 */}
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-primary mb-2">Step 1</p>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-foreground">
                  Define the ICP Narrowly Enough to Matter
                </h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  This is where most B2B SaaS marketing strategies break down first.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  A useful ICP is not a demographic. It is a description of a specific person in a specific situation experiencing a specific problem with enough urgency to act on it.
                </p>
                <div className="rounded-lg border border-border bg-card/60 p-5 mb-6">
                  <p className="text-sm font-semibold text-foreground mb-3">A useful ICP has:</p>
                  <ul className="space-y-2">
                    {[
                      ["Role", "the specific job title and decision-making authority"],
                      ["Industry", "the vertical or category where the problem is most acute"],
                      ["Company stage", "size, funding, or maturity that creates the right conditions"],
                      ["Trigger event", "what changed recently that makes this problem urgent now"],
                      ["Painful workflow", "the specific broken process the product fixes"],
                      ["Current alternative", "what they are doing instead and why it is failing"],
                      ["Buying urgency", "what forces a decision rather than indefinite delay"],
                    ].map(([label, body]) => (
                      <li key={label} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong className="text-foreground">{label}</strong> — {body}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-5">
                  <div className="rounded-lg border border-border bg-card/50 p-5">
                    <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">Weak ICP</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">B2B companies that need better analytics.</p>
                  </div>
                  <div className="rounded-lg border border-primary/30 bg-primary/5 p-5">
                    <p className="text-xs font-black uppercase tracking-widest text-primary mb-3">Better ICP</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Seed-stage SaaS founders with 5,000+ monthly visitors who cannot see which landing pages, CTAs, or campaigns are creating demo bookings — and are about to increase paid spend without knowing if the funnel can convert it.
                    </p>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  The second version makes every downstream decision easier. The messaging writes itself. The SEO keywords become obvious. The cold email targeting is specific enough to build a list. The landing page knows exactly who it is speaking to. If the ICP is not this specific, sharpen it before moving to the next step. Everything else depends on it.
                </p>
              </div>

              {/* Step 2 */}
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-primary mb-2">Step 2</p>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-foreground">
                  Clarify the Positioning Before Choosing Channels
                </h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Channels only amplify what is already clear or already unclear. This is the foundation of any{" "}
                  <Link to="/saas-marketing-agency" className="text-primary hover:underline">SaaS GTM strategy</Link>{" "}
                  — and the step most founders skip.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">Strong positioning makes every channel work better:</p>
                <ul className="space-y-2 mb-6 pl-1">
                  {[
                    "Cold email reply rates go up because the message connects a specific problem to a specific outcome",
                    "SEO content ranks for the right queries because it is written for a specific searcher",
                    "Paid ads convert because the landing page continues the conversation the ad started",
                    "Demos close at higher rates because the buyer already understood the value before getting on the call",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Weak positioning makes every channel expensive. The ads get clicks but not demos. The cold email gets opens but not replies. The SEO gets traffic but not qualified visitors. Each channel appears not to work, so the founder tries another one.
                </p>
                <blockquote className="border-l-4 border-primary pl-5 py-2 mb-5">
                  <p className="text-foreground font-semibold leading-relaxed">
                    Why would this specific buyer choose this product over every other option available to them right now?
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    That includes direct competitors, category alternatives, and the option of doing nothing. If the answer is not clear and specific, the positioning is not ready. Fix it before choosing a channel.
                  </p>
                </blockquote>
                <p className="text-muted-foreground leading-relaxed">
                  For a practical framework to sharpen positioning as part of a broader plan, the{" "}
                  <Link to="/saas-marketing-plan" className="text-primary hover:underline">SaaS marketing plan</Link>{" "}
                  covers the step-by-step execution.
                </p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          MID-PAGE CTA
      ══════════════════════════════════════════════ */}
      <section className="py-12 bg-white border-y border-[#11111f]/10">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto rounded-2xl border border-primary/20 bg-primary/5 p-7 md:p-9 text-center">
              <p className="text-sm font-semibold text-[#11101a] mb-2">
                If your positioning is clear but pipeline still feels random, the bottleneck is probably in the buyer journey, channel fit, or conversion path.
              </p>
              <p className="text-[#4d4658] text-sm mb-6">
                In a 20-minute GTM Audit I will help you find which one is blocking growth.
              </p>
              <Button variant="hero" size="lg" className="group" asChild>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                  Book a 20-min GTM Audit
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          STEP 3 — dark
      ══════════════════════════════════════════════ */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <p className="text-xs font-black uppercase tracking-widest text-primary mb-2">Step 3</p>
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Map the Buyer Journey and Trust Gaps
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                This is where a B2B SaaS marketing strategy becomes genuinely strategic — and where most marketing plans stop short.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Different buyers are at different stages of awareness. The content, channel, and conversion path that works for a decision-ready buyer will not work for someone who does not yet know the problem exists.
              </p>

              {/* Buyer journey table */}
              <div className="overflow-x-auto rounded-xl border border-border mb-6">
                <table className="w-full min-w-[520px] text-sm">
                  <thead>
                    <tr className="border-b border-border bg-card/60">
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Buyer stage</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">What they need</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Trust gap to fix</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Problem unaware", "Education", "They do not see the problem yet"],
                      ["Problem aware", "Diagnosis", "They do not know what is causing it"],
                      ["Solution aware", "Options and comparison", "They do not know which approach fits"],
                      ["Vendor aware", "Proof and specifics", "They do not trust you enough yet"],
                      ["Decision ready", "Risk reduction", "They need confidence to act now"],
                    ].map(([stage, need, gap], i) => (
                      <tr key={stage} className={`border-b border-border last:border-0 ${i % 2 === 0 ? "" : "bg-card/30"}`}>
                        <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">{stage}</td>
                        <td className="px-4 py-3 text-muted-foreground">{need}</td>
                        <td className="px-4 py-3 text-muted-foreground">{gap}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="space-y-4">
                {[
                  { stage: "Problem unaware", detail: "buyers are not searching for a solution — reach them through LinkedIn content, community participation, and founder-led thought leadership where they already spend time." },
                  { stage: "Problem aware", detail: 'buyers are asking diagnostic questions like "why is my landing page not converting" — SEO content that answers these earns trust at exactly the right moment.' },
                  { stage: "Solution aware", detail: "buyers are evaluating options — comparison pages, case studies, and proof-led content convert here." },
                  { stage: "Vendor aware", detail: "buyers know your product exists and are checking whether to trust it — the landing page, proof section, and objection handling make or break this stage." },
                  { stage: "Decision ready", detail: "buyers need one final reason to act — a clear next step, a risk reducer, or a specific answer to a remaining objection closes the gap." },
                ].map((item) => (
                  <div key={item.stage} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                    <span className="text-primary mt-1 flex-shrink-0">→</span>
                    <span><strong className="text-foreground">{item.stage}</strong> {item.detail}</span>
                  </div>
                ))}
              </div>

              <p className="text-muted-foreground mt-6 leading-relaxed">
                The strategic question: <strong className="text-foreground">where is your ICP in this journey, and does your marketing meet them there?</strong> Using the wrong approach for the wrong stage is why most B2B SaaS marketing produces traffic without pipeline. This is also where trust gaps live — in the messaging, the proof, the CTA, the follow-up. The strategy needs to identify and fix them before spending more on acquisition.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          STEP 4 — light
      ══════════════════════════════════════════════ */}
      <section className="py-16 bg-white border-y border-[#11111f]/10">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <p className="text-xs font-black uppercase tracking-widest text-primary mb-2">Step 4</p>
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-[#11101a]">
                Choose Channels Based on Buyer Intent
              </h2>
              <p className="text-[#4d4658] mb-8 leading-relaxed">
                Channel selection is where most B2B SaaS marketing strategies get made by opinion rather than logic. The right channel is not the most popular one, the one a competitor uses, or the one the founder is most comfortable with. It is the one that reaches the specific ICP at the specific stage of awareness where they are most likely to act.
              </p>

              <div className="space-y-5">
                {[
                  {
                    title: "Cold Email",
                    when: "The ICP is narrow, the problem is painful but not actively searched, and the offer is specific enough to earn a reply.",
                    risk: "When the targeting is wrong, reply rates stay low and the team learns very little because the data is too noisy to act on.",
                    use: "Fast feedback on positioning and messaging. For most early-stage SaaS founders with a tight ICP, it is the highest-leverage starting channel.",
                    link: { label: "cold email for SaaS", to: "/cold-email-for-saas" },
                  },
                  {
                    title: "SEO and Content",
                    when: "Buyers already search for the problem, the category, the alternative, or the workflow.",
                    risk: "Starting too broad. Generic keyword traffic does not convert. Intent-matched content does.",
                    use: "Long-term compounding qualified traffic. Start with specific, problem-aware queries where competition is lower and buyer intent is higher.",
                    externalLink: { label: "helpful content guidance", href: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content" },
                  },
                  {
                    title: "Paid Ads",
                    when: "The offer, landing page, tracking, and follow-up are already validated.",
                    risk: "Running paid ads before the landing page converts is an expensive way to discover a conversion problem. Paid ads amplify what is already there — working or not.",
                    use: "Scaling what is already converting. Not for diagnosing a broken funnel.",
                    link: { label: "Meta Ads for SaaS", to: "/meta-ads-for-saas" },
                  },
                  {
                    title: "LinkedIn and Founder-Led Content",
                    when: "The buyer needs education, trust, and repeated exposure before they are ready to talk.",
                    risk: "It is a slow channel. It will not produce pipeline in the first 30 days.",
                    use: "Building positioning, proof, and founder-led demand creation. Particularly effective for reaching decision-makers who are not actively searching yet.",
                  },
                  {
                    title: "Partnerships",
                    when: "Your buyer already trusts another ecosystem player — agencies, consultants, software vendors, communities, or integration partners.",
                    risk: "Partnerships take time to build and depend on alignment between both parties.",
                    use: "Trust transfer at scale. For early-stage SaaS in an established ecosystem, one strong partnership can outperform months of cold outreach.",
                  },
                ].map((channel) => (
                  <div key={channel.title} className="rounded-xl border border-[#11111f]/10 bg-[#f9f8fc] p-5">
                    <p className="font-display font-bold text-[#11101a] mb-3">{channel.title}</p>
                    <div className="space-y-2 text-sm">
                      <p className="text-[#4d4658] leading-relaxed"><strong className="text-[#11101a]">Best when:</strong> {channel.when}</p>
                      <p className="text-[#4d4658] leading-relaxed"><strong className="text-[#11101a]">Risk:</strong> {channel.risk}</p>
                      <p className="text-[#4d4658] leading-relaxed">
                        <strong className="text-[#11101a]">Use it for:</strong> {channel.use}
                        {channel.link && (
                          <> See <Link to={channel.link.to} className="text-primary hover:underline">{channel.link.label}</Link> for what a system that produces real replies looks like.</>
                        )}
                        {channel.externalLink && (
                          <> As Google's <a href={channel.externalLink.href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{channel.externalLink.label}</a> puts it: write for people first, not just search engines.</>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 px-5 py-4 text-sm text-[#4d4658]">
                <strong className="text-[#11101a]">The sequencing principle:</strong> start with the channel that reaches the most qualified buyer with the least infrastructure. For most early-stage B2B SaaS founders, that is cold email first, SEO in parallel, paid ads once the conversion path is validated.
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          STEP 5 — dark
      ══════════════════════════════════════════════ */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <p className="text-xs font-black uppercase tracking-widest text-primary mb-2">Step 5</p>
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Fix the Conversion Path and Measure What Matters
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                A B2B SaaS marketing strategy without a working conversion path is a demand generation programme that benefits whoever the visitor finds next.
              </p>
              <p className="text-muted-foreground mb-5 leading-relaxed">
                The conversion path includes everything between first contact and a closed deal. Most founders think about the landing page in isolation. The strategy needs to cover:
              </p>
              <ul className="space-y-2 mb-6 pl-1">
                {[
                  ["Landing page clarity", "does the page earn trust fast enough?"],
                  ["CTA hierarchy", "does the page ask for the right thing at the right moment?"],
                  ["Proof", "is it specific enough to be believed?"],
                  ["Objection handling", "are the top buyer objections answered before the demo?"],
                  ["Demo flow", "does the booking process reduce friction or add it?"],
                  ["Follow-up", "is there a system between the booking and the demo, and between the demo and the decision?"],
                ].map(([label, body]) => (
                  <li key={label} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                    <span className="text-primary mt-1 flex-shrink-0">→</span>
                    <span><strong className="text-foreground">{label}</strong> — {body}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                For a detailed breakdown of what breaks in the conversion path and how to fix it, the{" "}
                <Link to="/landing-page-for-saas" className="text-primary hover:underline">SaaS landing page</Link>{" "}
                and{" "}
                <Link to="/conversion-rate-optimisation-specialist" className="text-primary hover:underline">SaaS conversion rate optimisation</Link>{" "}
                services cover the execution.
              </p>

              <h3 className="font-display text-xl font-bold mb-4 text-foreground">
                Measure pipeline, not marketing activity
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-lg border border-border bg-card/50 p-5">
                  <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">Feel good but do not show pipeline</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Impressions, clicks, open rates, pageviews, social followers, content published, emails sent.
                  </p>
                </div>
                <div className="rounded-lg border border-primary/30 bg-primary/5 p-5">
                  <p className="text-xs font-black uppercase tracking-widest text-primary mb-3">Actually show whether it is working</p>
                  <ul className="space-y-1.5">
                    {[
                      "Qualified demo bookings per channel",
                      "Trial signups per channel",
                      "Demo show rate",
                      "Landing page conversion rate",
                      "Cost per qualified conversation",
                      "Pipeline generated by channel",
                      "Channel-to-close attribution",
                    ].map((item) => (
                      <li key={item} className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FRAMEWORK TABLE — light
      ══════════════════════════════════════════════ */}
      <section className="py-16 bg-white border-y border-[#11111f]/10">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-[#11101a]">
                The B2B SaaS Marketing Strategy Framework
              </h2>
              <p className="text-[#4d4658] mb-6 leading-relaxed">
                Use this as a working reference. Every row is a strategic decision that needs an honest answer before the next one is made.
              </p>

              <div className="overflow-x-auto rounded-xl border border-[#11111f]/10 mb-6">
                <table className="w-full min-w-[420px] text-sm">
                  <thead>
                    <tr className="border-b border-[#11111f]/10 bg-[#f9f8fc]">
                      <th className="px-4 py-3 text-left font-semibold text-[#11101a] w-1/3">Strategy layer</th>
                      <th className="px-4 py-3 text-left font-semibold text-[#11101a]">Question to answer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["ICP", "Who is the best-fit buyer — role, industry, stage, trigger?"],
                      ["Problem", "What painful problem do they already feel and cannot ignore?"],
                      ["Positioning", "Why this product over every alternative available right now?"],
                      ["Buyer stage", "Where is the ICP in their awareness — and what do they need there?"],
                      ["Trust gap", "What stops them from converting at each stage of the journey?"],
                      ["Channel", "Where does this buyer already look, listen, or search?"],
                      ["Conversion path", "What happens between first contact and a qualified demo?"],
                      ["Tracking", "Which signals show that marketing is creating pipeline — not just activity?"],
                      ["Follow-up", "How is momentum maintained between interest and decision?"],
                    ].map(([layer, question], i) => (
                      <tr key={layer} className={`border-b border-[#11111f]/10 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-[#f9f8fc]"}`}>
                        <td className="px-4 py-3 font-medium text-[#11101a] whitespace-nowrap">{layer}</td>
                        <td className="px-4 py-3 text-[#4d4658]">{question}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[#4d4658] text-sm leading-relaxed">
                If any row has a vague answer, that row is the strategy gap. Fix the gap before adding spend to the channel.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          MISTAKES — dark
      ══════════════════════════════════════════════ */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-6 text-foreground">
                Common B2B SaaS Marketing Strategy Mistakes
              </h2>
              <div className="space-y-4">
                {[
                  { label: "Starting with channels", body: "Choosing SEO, ads, or cold email before ICP, positioning, and conversion path are clear means every channel is working against a weak foundation." },
                  { label: "Copying competitors", body: "What works for a competitor with different positioning, different ICP, different ACV, and different stage will not necessarily work for you. Strategy is contextual." },
                  { label: "Targeting too broad an ICP", body: "Broad targeting means broad messaging, which means weak conversion at every stage. Narrow the ICP until it feels uncomfortably specific — that is usually where the real opportunity is." },
                  { label: "Treating SEO as a traffic channel only", body: "SEO should produce qualified visitors who are one step away from needing what you sell. Generic traffic from broad keywords does not convert. Intent-matched content does." },
                  { label: "Treating paid ads as a magic fix", body: "Paid ads amplify what is already there. If the positioning, landing page, and offer are weak, paid ads produce expensive clicks that confirm what is broken." },
                  { label: "Running outbound before the offer is clear", body: "Cold email with a vague offer produces low reply rates and bad data. A specific offer to a specific ICP produces replies and useful feedback simultaneously." },
                  { label: "Ignoring the conversion path", body: "Demand generation without a working conversion path creates pipeline for whoever the visitor finds next. Fix the path before scaling demand." },
                  { label: "Measuring activity instead of pipeline", body: "The strategy is working when it produces qualified conversations — not when it produces impressions, clicks, or open rates." },
                ].map((item) => (
                  <div key={item.label} className="p-5 rounded-lg border border-border bg-card/50">
                    <p className="font-semibold text-foreground mb-2">{item.label}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FAQ — light
      ══════════════════════════════════════════════ */}
      <section className="py-16 bg-white border-y border-[#11111f]/10" id="faq">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 text-[#11101a]">FAQ</h2>
              <div className="space-y-6">
                {faqItems.map((item) => (
                  <div key={item.question} className="border-b border-[#11111f]/10 pb-6 last:border-0 last:pb-0">
                    <p className="font-semibold text-[#11101a] mb-2 leading-snug">{item.question}</p>
                    <p className="text-sm text-[#4d4658] leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-lg border border-[#11111f]/10 bg-[#f9f8fc] px-6 py-5 text-sm text-[#4d4658]">
                Not ready for an audit yet? Start with the{" "}
                <Link to="/saas-marketing-plan" className="text-primary hover:underline">SaaS marketing plan framework</Link>{" "}
                — it covers the practical execution layer behind this strategy.
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FINAL CTA — dark
      ══════════════════════════════════════════════ */}
      <section className="py-16 bg-card border-t border-border">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Ready to Find What Is Blocking Pipeline?
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Most B2B SaaS teams do not need more random marketing activity. They need to know which part of the system is actually broken.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                In a 20-minute GTM audit, I will review your positioning, landing page, acquisition channel, and conversion path — then tell you what to fix first.
              </p>
              <Button variant="hero" size="lg" className="group" asChild>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                  Book a 20-min GTM Audit
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <p className="text-xs text-muted-foreground/60 mt-4">
                Also see:{" "}
                <Link to="/saas-marketing-agency" className="hover:text-primary transition-colors">
                  SaaS GTM strategy
                </Link>
                {" "}·{" "}
                <Link to="/saas-marketing-plan" className="hover:text-primary transition-colors">
                  SaaS marketing plan
                </Link>
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      <Footer hideCTA />
    </div>
  );
}
