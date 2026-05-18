import { ArrowRight, FileText, TrendingUp, Target, BarChart3, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { blogPosts } from "@/lib/blog";

const Blog = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,hsl(var(--primary)/0.18),transparent_34%),radial-gradient(circle_at_16%_34%,hsl(var(--accent)/0.11),transparent_28%)]" />
          <div className="container relative z-10 mx-auto px-6">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              Blog
            </p>
            <h1 className="font-display max-w-4xl text-5xl font-bold leading-[1.05] md:text-7xl">
              SaaS Growth, GTM, and CRO Guides
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Practical guides for B2B SaaS founders who need clearer positioning, stronger landing pages, better conversion paths, and acquisition that turns into pipeline.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Link
                to="/b2b-saas-marketing-strategy"
                className="group rounded-2xl border border-border/60 bg-card/70 p-7 shadow-lg shadow-background/20 transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-primary/10"
              >
                <div className="mb-6 flex items-center justify-between gap-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    B2B SaaS Growth
                  </p>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <FileText className="h-5 w-5" />
                  </span>
                </div>
                <h2 className="font-display text-2xl font-semibold leading-snug">
                  B2B SaaS Marketing Strategy: What to Fix Before Scaling Traffic
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Most B2B SaaS teams do not fail because they picked the wrong channel. They fail because they scale before the strategy is clear. A framework for fixing ICP, positioning, buyer journey, and conversion before adding spend.
                </p>
                <div className="mt-7 flex items-center justify-between border-t border-border/60 pt-6">
                  <span className="text-sm text-muted-foreground">16 min read</span>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Read article
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
              <Link
                to="/saas-marketing-plan"
                className="group rounded-2xl border border-border/60 bg-card/70 p-7 shadow-lg shadow-background/20 transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-primary/10"
              >
                <div className="mb-6 flex items-center justify-between gap-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    SaaS GTM
                  </p>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <FileText className="h-5 w-5" />
                  </span>
                </div>
                <h2 className="font-display text-2xl font-semibold leading-snug">
                  SaaS Marketing Plan: A Practical Framework for Founders
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Most SaaS marketing plans are built backwards — channel first, strategy second. This framework covers the six-step order that actually works: positioning, landing page, conversion path, tracking, then channels.
                </p>
                <div className="mt-7 flex items-center justify-between border-t border-border/60 pt-6">
                  <span className="text-sm text-muted-foreground">14 min read</span>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Read article
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
              {blogPosts.map((post) => (
                <Link
                  key={post.path}
                  to={post.path}
                  className="group rounded-2xl border border-border/60 bg-card/70 p-7 shadow-lg shadow-background/20 transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-primary/10"
                >
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                      {post.category}
                    </p>
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                      <FileText className="h-5 w-5" />
                    </span>
                  </div>
                  <h2 className="font-display text-2xl font-semibold leading-snug">
                    {post.title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <div className="mt-7 flex items-center justify-between border-t border-border/60 pt-6">
                    <span className="text-sm text-muted-foreground">{post.readTime}</span>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      Read article
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border/60 bg-card/30 py-20 md:py-28">
          <div className="container mx-auto px-6">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              What these guides cover
            </p>
            <h2 className="font-display max-w-3xl text-3xl font-bold leading-tight tracking-tight md:text-5xl">
              Practical SaaS growth resources, not generic marketing advice
            </h2>
            <p className="mt-6 max-w-4xl text-lg leading-relaxed text-muted-foreground">
              Every article on this blog is written for B2B SaaS founders who are past the theory stage and need specific decisions explained. The focus is on the order of operations — what to fix first before scaling traffic, spend, or outreach.
            </p>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {[
                {
                  icon: Target,
                  title: "Landing pages and conversion",
                  body: "Why most SaaS landing pages lose visitors in the first scroll, how to fix hero clarity, where to place proof, and how to structure a CTA hierarchy that earns the demo request before asking for it. These guides apply whether your traffic is coming from paid ads, cold email, or organic search.",
                  link: { to: "/landing-page-for-saas", label: "SaaS landing page strategy service" },
                },
                {
                  icon: TrendingUp,
                  title: "Paid ads and channel strategy",
                  body: "When to use Google Ads vs Meta Ads for SaaS, why sending both channels to the same landing page costs more per acquisition, and how to match the page experience to the visitor's intent. Includes guidance on offer angles, creative testing, and knowing when a campaign problem is actually a messaging problem.",
                  link: { to: "/meta-ads-for-saas", label: "Meta Ads for SaaS service" },
                },
                {
                  icon: BarChart3,
                  title: "Conversion rate optimisation",
                  body: "How to diagnose weak SaaS conversion rates without guessing, where visitors are most likely dropping off in the funnel, and which fixes produce the fastest lift. Covers trust signals, friction removal, analytics visibility, and the difference between a CRO problem and a positioning problem.",
                  link: { to: "/conversion-rate-optimisation-specialist", label: "SaaS CRO specialist service" },
                },
                {
                  icon: Mail,
                  title: "GTM strategy and cold outbound",
                  body: "How to sequence a SaaS go-to-market system so positioning, acquisition, and conversion work together. Includes cold email infrastructure, ICP targeting, offer framing, and the order in which to layer acquisition channels once the conversion path is working.",
                  link: { to: "/saas-marketing-agency", label: "SaaS GTM strategy service" },
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-border/60 bg-card/70 p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">{item.body}</p>
                  <Link
                    to={item.link.to}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                  >
                    {item.link.label}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6">
            <div className="rounded-2xl border border-border/60 bg-card/70 p-8 md:p-12">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                Where to start
              </p>
              <h2 className="font-display max-w-3xl text-2xl font-bold leading-tight tracking-tight md:text-4xl">
                Not sure where your SaaS growth is leaking?
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
                The most common place to start is the landing page. If you are getting traffic but no signups, the{" "}
                <Link to="/blog/saas-traffic-but-no-signups" className="text-primary hover:underline">
                  SaaS traffic but no signups guide
                </Link>{" "}
                walks through the five most common causes before you spend more on acquisition. For a faster diagnosis, the{" "}
                <Link to="/book" className="text-primary hover:underline">
                  20-minute GTM audit
                </Link>{" "}
                is the fastest way to identify which part of the system to fix first.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/book"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  Book a 20-min GTM Audit
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/case-studies"
                  className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-card/70 px-6 py-3 text-sm font-semibold hover:border-primary/40 hover:text-primary"
                >
                  View SaaS case studies
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
