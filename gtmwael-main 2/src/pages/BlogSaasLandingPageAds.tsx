import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CALENDLY_URL } from "@/lib/constants";

const toc = [
  ["Google Ads Captures Demand. Meta Ads Creates Demand.", "google-ads-captures-demand-meta-ads-creates-demand"],
  ["Why One SaaS Landing Page Fails Across Google and Meta", "why-one-saas-landing-page-fails-across-google-and-meta"],
  ["What a Google Ads Landing Page Should Do for SaaS", "what-a-google-ads-landing-page-should-do-for-saas"],
  ["What a Meta Ads Landing Page Should Do for SaaS", "what-a-meta-ads-landing-page-should-do-for-saas"],
  ["SaaS Example: CRM for Small Sales Teams", "saas-example-crm-for-small-sales-teams"],
  ["Google Ads Landing Page vs Meta Ads Landing Page", "google-ads-landing-page-vs-meta-ads-landing-page"],
  ["Founder Takeaway", "founder-takeaway"],
  ["FAQ", "faq"],
];

const googlePageItems = [
  ["Use a keyword-matched headline", "If someone searches for CRM software for small teams, your headline should feel close to that phrase. For search traffic, clarity usually beats creativity."],
  ["Show the value proposition quickly", "Within the first screen, explain who the product is for, what problem it solves, why it is different, and what the user should do next."],
  ["Keep the page short", "A ready buyer usually needs confirmation, proof, and a clear next step. Do not turn the page into a full website."],
  ["Put trust signals above the fold", "Customer logos, a short testimonial, a security note, or a relevant case study result can reduce doubt before the visitor scrolls."],
  ["Make the CTA visible fast", "For high-intent traffic, the user should not need to scroll for 30 seconds to book a demo or start a trial."],
  ["Remove unnecessary navigation", "Paid search pages should guide one main action instead of leaking visitors into blog links, social icons, and five competing CTAs."],
  ["Prioritize fast loading speed", "Every delay makes paid search traffic less efficient. Speed is part of trust."],
];

const metaPageItems = [
  ["Keep visual continuity from ad to page", "If your ad uses a specific pain point, message, or visual style, the landing page should continue the same idea."],
  ["Educate the visitor on the problem", "Meta traffic often needs problem awareness before the product pitch. First make the pain recognizable."],
  ["Use more storytelling", "Explain the old way, why it breaks, what changes with your product, and what the better workflow looks like."],
  ["Add more social proof", "Cold traffic needs specific testimonials, screenshots, customer stories, founder credibility, or before-and-after workflows."],
  ["Handle objections", "Answer implementation, setup, team adoption, company-size, and trial questions before the sales call."],
  ["Use a softer CTA", "A smaller first step like watching a demo or seeing the workflow can create a better path to pipeline for colder traffic."],
];

const comparisonRows = [
  ["Visitor mindset", "Searching for a solution", "Interrupted while scrolling"],
  ["Main job", "Confirm intent quickly", "Create interest and trust"],
  ["Headline", "Keyword-matched", "Problem or story-driven"],
  ["Page length", "Shorter and direct", "Longer and educational"],
  ["CTA", "Direct demo or trial", "Softer CTA or staged action"],
  ["Social proof", "Above the fold", "Repeated throughout page"],
  ["Form placement", "Visible early", "After education or proof"],
  ["Content style", "Clear, concise, comparison-ready", "Contextual, narrative, trust-building"],
];

const faq = [
  ["Should SaaS companies use different landing pages for Google Ads and Meta Ads?", "Yes. In most cases, Google Ads and Meta Ads should use different landing pages because the visitor intent is different. Google visitors are actively searching. Meta visitors usually need more education and trust before they convert."],
  ["What makes a good SaaS landing page?", "A good SaaS landing page has a clear headline, strong value proposition, relevant proof, simple CTA, fast load speed, and messaging that matches the traffic source."],
  ["Is Meta Ads good for B2B SaaS?", "Meta Ads can work for B2B SaaS when the offer, creative, and landing page are built for demand creation. It usually works better with education, proof, and softer CTAs than with a direct demo ask only."],
  ["What is the biggest SaaS landing page mistake?", "The biggest mistake is sending every traffic source to the same generic page. Different channels bring different levels of awareness, so the landing page should match the visitor's mindset."],
  ["What should a Google Ads landing page include for SaaS?", "A Google Ads landing page for SaaS should include a keyword-matched headline, clear value proposition, trust signals, fast-loading design, limited navigation, and a visible CTA or form."],
  ["What should a Meta Ads landing page include for SaaS?", "A Meta Ads landing page for SaaS should include visual continuity from the ad, problem education, storytelling, social proof, objection handling, and a softer CTA for colder visitors."],
];

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="my-6 space-y-3">
    {items.map((item) => (
      <li key={item} className="flex gap-3 text-base leading-relaxed text-muted-foreground">
        <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const BlogSaasLandingPageAds = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <article>
          <header className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,hsl(var(--primary)/0.18),transparent_34%),radial-gradient(circle_at_16%_34%,hsl(var(--accent)/0.11),transparent_28%)]" />
            <div className="container relative z-10 mx-auto px-6">
              <Link to="/blog" className="text-sm font-semibold text-primary hover:text-primary/80">
                Blog
              </Link>
              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                SaaS Landing Page Strategy
              </p>
              <h1 className="mt-4 font-display max-w-5xl text-4xl font-bold leading-[1.08] tracking-tight md:text-6xl">
                Stop Sending Google Ads and Meta Ads Traffic to the Same SaaS Landing Page
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                Google Ads captures demand. Meta Ads creates demand. Your SaaS landing page needs to
                match the visitor's intent, not force both channels into one generic post-click path.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span>By Wael Aouididi</span>
                <span>/</span>
                <time dateTime="2026-04-27">April 27, 2026</time>
                <span>/</span>
                <span>11 min read</span>
              </div>
            </div>
          </header>

          <section className="border-y border-border/60 bg-card/25 py-10">
            <div className="container mx-auto px-6">
              <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                    Table of contents
                  </p>
                  <nav className="mt-5 grid gap-3" aria-label="Article sections">
                    {toc.map(([label, href]) => (
                      <a key={href} href={`#${href}`} className="text-sm text-muted-foreground hover:text-primary">
                        {label}
                      </a>
                    ))}
                  </nav>
                </div>
                <div className="rounded-2xl border border-border/60 bg-background/60 p-6">
                  <p className="text-lg leading-relaxed text-foreground">
                    A SaaS founder launches Google Ads and Meta Ads, then sends both campaigns to the
                    same SaaS landing page. Google converts better. Meta looks weak. The founder blames
                    the platform.
                  </p>
                  <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                    But often, the real problem is not the channel. It is message mismatch.
                  </p>
                  <p className="mt-4 font-display text-2xl font-bold text-primary">
                    Build trust before traffic.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="container mx-auto px-6 py-16 md:py-24">
            <div className="mx-auto max-w-3xl space-y-16">
              <section id="google-ads-captures-demand-meta-ads-creates-demand">
                <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                  Google Ads Captures Demand. Meta Ads Creates Demand.
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  A good SaaS landing page starts with understanding intent. Google Ads and Meta Ads
                  are not just different platforms. They are different moments in the buyer journey.
                </p>
                <div className="mt-8 grid gap-5 md:grid-cols-2">
                  <div className="rounded-2xl border border-border/60 bg-card/60 p-6">
                    <h3 className="font-display text-2xl font-semibold">Google Ads = Demand Capture</h3>
                    <p className="mt-4 text-muted-foreground">
                      Someone searches for "best CRM for small sales teams" or "AI meeting notes
                      software." They already know they have a problem and are actively looking for a
                      solution.
                    </p>
                    <p className="mt-4 font-semibold text-foreground">
                      Job: confirm they are in the right place and make the next step easy.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-card/60 p-6">
                    <h3 className="font-display text-2xl font-semibold">Meta Ads = Demand Creation</h3>
                    <p className="mt-4 text-muted-foreground">
                      Someone is scrolling, watching short videos, checking updates, or avoiding work
                      for five minutes. Then your ad appears.
                    </p>
                    <p className="mt-4 font-semibold text-foreground">
                      Job: create context, build trust, and make the problem worth solving.
                    </p>
                  </div>
                </div>
                <p className="mt-6 text-muted-foreground">
                  Google explains that Search ad quality considers landing page experience, including
                  how relevant and useful the page is to people who click the ad. Your page is not
                  separate from ad performance. It is part of the system.
                </p>
              </section>

              <section id="why-one-saas-landing-page-fails-across-google-and-meta">
                <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                  Why One SaaS Landing Page Fails Across Google and Meta
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  One landing page cannot serve two different levels of intent equally well. A Google
                  visitor wants speed. A Meta visitor needs context.
                </p>
                <div className="mt-8 grid gap-5 md:grid-cols-2">
                  <div>
                    <h3 className="font-display text-xl font-semibold">Google visitors ask:</h3>
                    <BulletList items={["Is this what I searched for?", "Can this solve my problem?", "Can I see proof?", "What do I do next?"]} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold">Meta visitors ask:</h3>
                    <BulletList items={["Why am I here?", "Is this relevant to me?", "What problem is this solving?", "Why should I trust this company?", "Is this worth my time?"]} />
                  </div>
                </div>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  If the page is short and direct, Meta traffic may bounce because it lacks education.
                  If the page is long and story-driven, Google traffic may lose patience because it
                  already had intent. The offer can be the same. The path to trust should not be.
                </p>
              </section>

              <section id="what-a-google-ads-landing-page-should-do-for-saas">
                <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                  What a Google Ads Landing Page Should Do for SaaS
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  A strong Google Ads landing page should be clear, fast, and tightly matched to the
                  search query. The visitor has intent. Do not make them work too hard.
                </p>
                <div className="mt-8 space-y-5">
                  {googlePageItems.map(([title, body]) => (
                    <div key={title} className="rounded-2xl border border-border/60 bg-card/50 p-6">
                      <h3 className="font-display text-xl font-semibold">{title}</h3>
                      <p className="mt-3 text-muted-foreground">{body}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section id="what-a-meta-ads-landing-page-should-do-for-saas">
                <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                  What a Meta Ads Landing Page Should Do for SaaS
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  A Meta Ads landing page needs more patience. This visitor did not search for you.
                  Your page must continue the conversation started by the ad.
                </p>
                <div className="mt-8 space-y-5">
                  {metaPageItems.map(([title, body]) => (
                    <div key={title} className="rounded-2xl border border-border/60 bg-card/50 p-6">
                      <h3 className="font-display text-xl font-semibold">{title}</h3>
                      <p className="mt-3 text-muted-foreground">{body}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section id="saas-example-crm-for-small-sales-teams">
                <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                  SaaS Example: CRM for Small Sales Teams
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  Let's say a B2B SaaS company sells a CRM for small sales teams. The offer is the
                  same. The landing page should not be.
                </p>
                <div className="mt-8 grid gap-5 md:grid-cols-2">
                  <div className="rounded-2xl border border-border/60 bg-card/60 p-6">
                    <h3 className="font-display text-2xl font-semibold">Google Ads page</h3>
                    <p className="mt-4 text-muted-foreground">
                      Search: "CRM for small sales team"
                    </p>
                    <p className="mt-4 font-semibold text-foreground">
                      Simple CRM Software for Small Sales Teams
                    </p>
                    <p className="mt-4 text-muted-foreground">
                      Show pipeline management, follow-up reminders, email tracking, easy setup,
                      pricing or demo CTA, and proof from small teams.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-card/60 p-6">
                    <h3 className="font-display text-2xl font-semibold">Meta Ads page</h3>
                    <p className="mt-4 text-muted-foreground">
                      Ad: "Your team is losing deals because follow-ups live in five different places."
                    </p>
                    <p className="mt-4 font-semibold text-foreground">
                      Stop Losing Deals Because Your Sales Process Is Scattered
                    </p>
                    <p className="mt-4 text-muted-foreground">
                      Explain why small teams outgrow spreadsheets, how missed follow-ups happen, and
                      what a clean sales workflow looks like.
                    </p>
                  </div>
                </div>
              </section>

              <section id="google-ads-landing-page-vs-meta-ads-landing-page">
                <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                  Google Ads Landing Page vs Meta Ads Landing Page
                </h2>
                <div className="mt-8 overflow-x-auto rounded-2xl border border-border/60">
                  <table className="w-full min-w-[680px] border-collapse bg-card/40 text-left">
                    <thead>
                      <tr className="border-b border-border/60">
                        <th className="p-4 text-sm uppercase tracking-[0.14em] text-primary">Element</th>
                        <th className="p-4 text-sm uppercase tracking-[0.14em] text-primary">Google Ads</th>
                        <th className="p-4 text-sm uppercase tracking-[0.14em] text-primary">Meta Ads</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonRows.map(([element, google, meta]) => (
                        <tr key={element} className="border-b border-border/40 last:border-b-0">
                          <td className="p-4 font-semibold text-foreground">{element}</td>
                          <td className="p-4 text-muted-foreground">{google}</td>
                          <td className="p-4 text-muted-foreground">{meta}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="founder-takeaway">
                <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                  Founder Takeaway
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  The goal is not to choose Google Ads or Meta Ads. The goal is to design the
                  post-click experience around intent.
                </p>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                  A good paid ads strategy does not end at the click. The click is only the handoff.
                  Your landing page has to finish the job.
                </p>
                <div className="mt-8 rounded-2xl border border-primary/30 bg-primary/10 p-6">
                  <h3 className="font-display text-2xl font-semibold">Before you scale paid ads, check the foundation.</h3>
                  <BulletList items={["Is the headline clear?", "Does the page match the visitor's intent?", "Is the CTA easy to find?", "Is there enough proof to build trust?", "Does the page load fast?", "Are you asking cold visitors to convert too soon?"]} />
                </div>
              </section>

              <section id="faq">
                <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">FAQ</h2>
                <div className="mt-8 space-y-5">
                  {faq.map(([question, answer]) => (
                    <div key={question} className="rounded-2xl border border-border/60 bg-card/50 p-6">
                      <h3 className="font-display text-xl font-semibold">{question}</h3>
                      <p className="mt-3 text-muted-foreground">{answer}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-border/60 bg-card/70 p-8 text-center">
                <h2 className="font-display text-3xl font-bold tracking-tight">
                  Audit your landing page before increasing ad spend.
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                  If the message is unclear, more traffic will only make the leak more expensive.
                </p>
                <div className="mt-7">
                  <Button variant="hero" size="lg" asChild>
                    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                      Book a 20-min Landing Page Audit
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </section>

              <section className="text-sm leading-relaxed text-muted-foreground">
                <p>
                  External source: Google explains that Quality Score for Search campaigns includes
                  expected clickthrough rate, ad relevance, and landing page experience.{" "}
                  <a
                    href="https://support.google.com/google-ads/answer/6167118"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80"
                  >
                    Read Google's Quality Score documentation
                  </a>
                  .
                </p>
              </section>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogSaasLandingPageAds;
