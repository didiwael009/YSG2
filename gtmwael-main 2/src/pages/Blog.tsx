import { ArrowRight, FileText } from "lucide-react";
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
              SaaS Growth Articles
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Practical notes on SaaS landing pages, paid ads strategy, conversion optimization,
              cold email, and GTM systems for founders who want fewer leaks before more traffic.
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
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
