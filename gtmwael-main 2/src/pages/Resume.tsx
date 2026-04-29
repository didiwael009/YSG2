import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Printer, MapPin, Mail, Phone, Globe, Linkedin } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";

const Resume = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Print button */}
      <div className="fixed bottom-8 right-8 z-50 print:hidden">
        <Button variant="hero" size="lg" onClick={() => window.print()} className="group shadow-xl">
          <Printer className="w-5 h-5 mr-2" />
          Print / Save PDF
        </Button>
      </div>

      <div className="pt-28 pb-20 print:pt-0 print:pb-0">
        <div className="container max-w-5xl px-4">

          {/* HEADER */}
          <AnimateIn>
            <div className="mb-12 print:mb-8">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-6 border-b border-border">
                <div>
                  <h1 className="font-display text-5xl md:text-6xl font-black tracking-tight text-foreground leading-none">
                    WAEL <span className="text-gradient">AOUIDIDI</span>
                  </h1>
                  <div className="mt-3 flex items-center gap-3 flex-wrap">
                    <span className="text-xs tracking-[0.18em] uppercase text-muted-foreground font-medium">Digital Marketing Executive</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-xs tracking-[0.18em] uppercase text-muted-foreground font-medium">Entrepreneur</span>
                    <span className="text-xs tracking-wider font-semibold bg-primary text-primary-foreground px-2 py-0.5 rounded-sm">10+ YRS</span>
                  </div>
                </div>
                <div className="flex flex-col items-start md:items-end gap-1 text-sm text-muted-foreground">
                  <ContactItem icon={<Mail className="w-3.5 h-3.5" />} text="wael.aouididi@gmail.com" />
                  <ContactItem icon={<Phone className="w-3.5 h-3.5" />} text="+216 22 560 310" />
                  <ContactItem icon={<MapPin className="w-3.5 h-3.5" />} text="Tunis, Tunisia" />
                  <ContactItem icon={<Globe className="w-3.5 h-3.5" />} text="yoursaasgrowth.com" href="https://yoursaasgrowth.com" />
                  <ContactItem icon={<Linkedin className="w-3.5 h-3.5" />} text="linkedin.com/in/aouididi-wael" href="https://www.linkedin.com/in/aouididi-wael-81b7037a/" />
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* BODY */}
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10 md:gap-12">

            {/* LEFT COLUMN */}
            <AnimateIn delay={100} className="space-y-8">

              <ResumeSection label="Profile">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Dynamic digital marketing executive and entrepreneur with a decade of experience transforming SaaS companies through strategic leadership and innovation. Known for solving complex business challenges, building high-performing teams, and delivering exceptional results in competitive markets.
                </p>
              </ResumeSection>

              <ResumeSection label="Impact">
                <div className="grid grid-cols-2 gap-4">
                  <ImpactCard stat="4×" desc="Revenue growth" />
                  <ImpactCard stat="4M+" desc="Views generated" />
                  <ImpactCard stat="30+" desc="Enterprise clients" />
                  <ImpactCard stat="10+" desc="Team members led" />
                </div>
              </ResumeSection>

              <ResumeSection label="Expertise">
                <div className="space-y-3">
                  <ExpertiseItem title="Full-Stack Marketing" desc="Concept to execution — images, video, copy that convert" />
                  <ExpertiseItem title="Creative & Data" desc="Artistic vision meets analytical performance optimization" />
                  <ExpertiseItem title="Paid Media & Growth" desc="Meta Ads, Google Ads, SEO, cold email funnels, automation" />
                  <ExpertiseItem title="Multi-Format Content" desc="Ads, landing pages, video scripts, social media storytelling" />
                  <ExpertiseItem title="SaaS & B2B Growth" desc="Product launches, retention strategy, market positioning" />
                </div>
              </ResumeSection>

              <ResumeSection label="Skills">
                <div className="flex flex-wrap gap-1.5">
                  {["Meta Ads", "Google Ads", "SEO"].map(s => <SkillPill key={s} label={s} highlight />)}
                  {["AI in Marketing", "Performance Analytics", "CRM", "Growth Hacking", "UI/UX Design", "Brand Strategy", "Video Editing", "Cold Email Funnels", "Market Analysis"].map(s => <SkillPill key={s} label={s} />)}
                </div>
              </ResumeSection>

              <ResumeSection label="Languages">
                <div className="space-y-2">
                  <LanguageRow name="Arabic" level="Native" dots={5} />
                  <LanguageRow name="English" level="Fluent" dots={5} />
                  <LanguageRow name="French" level="Fluent" dots={5} />
                </div>
              </ResumeSection>

              <ResumeSection label="Education">
                <div className="space-y-3">
                  <EduItem year="2004 – 2009" degree="National Diploma in Advertising" school="Higher School of Design Sciences & Technologies, Tunis" />
                  <EduItem year="2004" degree="Bachelor of Mathematics" />
                  <EduItem year="Certification" degree="Google & Growth Hacking" school="by Kyrill Krystallis" />
                </div>
              </ResumeSection>
            </AnimateIn>

            {/* RIGHT COLUMN */}
            <AnimateIn delay={200}>
              <ResumeSection label="Experience">
                <div className="space-y-0">
                  <ExpItem
                    role="Digital Marketing Manager"
                    period="APR 2025 — PRESENT"
                    company="Shipzzer"
                    tag="REMOTE"
                    current
                    bullets={[
                      "Ranked in the top 3 on Google through targeted SEO strategy and content optimization",
                      "Achieved 50%+ email open rates via highly personalized outreach campaigns",
                      "Produced and managed social media content driving consistent brand growth",
                      "Optimized landing pages for conversion, improving user flow and lead generation",
                    ]}
                  />
                  <ExpItem
                    role="Head of Creative"
                    period="SEP 2024 — MAR 2025"
                    company="Bottlenexus"
                    tag="USA · REMOTE"
                    bullets={[
                      "Led complete rebranding and website redesign with cohesive, modern brand identity",
                      "Created reels and thumbnails, enhancing Instagram engagement and brand visibility",
                      "Redesigned all digital assets — reports, pitch decks — to align with brand guidelines",
                      "Designed new UI/UX for checkout, improving user flow and conversion rates",
                    ]}
                  />
                  <ExpItem
                    role="Digital Marketing Specialist"
                    period="MAY 2023 — JUN 2024"
                    company="Zembra Tech"
                    tag="USA · REMOTE"
                    bullets={[
                      "Quadrupled revenue through innovative marketing strategies and rapid problem-solving",
                      "Led comprehensive rebranding initiative, adapting messaging to evolving market demands",
                      "Optimized conversion through data-driven decision making and iterative testing",
                    ]}
                  />
                  <ExpItem
                    role="CEO & Chief Marketing Officer"
                    period="AUG 2020 — DEC 2022"
                    company="Growapp, LTD"
                    tag="UK · REMOTE"
                    bullets={[
                      "Transformed concept into successful B2B SaaS platform through strategic leadership",
                      "Achieved industry-leading retention rates through customer-centric problem solving",
                      "Built and led distributed teams across multiple countries",
                    ]}
                  />
                  <ExpItem
                    role="Business Development & Comm. Manager"
                    period="JUN 2019 — JUN 2020"
                    company="Focus Technologie Services"
                    bullets={[
                      "Pioneered Tunisia's first VMware cloud service through strategic market analysis",
                      "Developed innovative go-to-market strategy in challenging conditions",
                      "Led cross-functional teams to deliver complex technical solutions on schedule",
                    ]}
                  />
                  <ExpItem
                    role="CEO & Chief Marketing Officer"
                    period="APR 2016 — FEB 2019"
                    company="Kpeiz.digital"
                    bullets={[
                      "Scaled startup from concept to funded company through strategic leadership",
                      "Built a diverse team of 10+ professionals, fostering a culture of innovation",
                      "Secured 30+ enterprise clients through a solution-focused sales approach",
                    ]}
                  />
                  <ExpItem
                    role="Social Media & Digital Project Manager"
                    period="JUL 2014 — MAY 2016"
                    company="KNSD Digital Communication Agency"
                    bullets={[
                      "Led award-winning campaigns through creative problem-solving for major brands",
                      "Managed multi-disciplinary teams delivering results across competitive accounts",
                      "Achieved top market position through innovative social media strategies",
                    ]}
                    last
                  />
                </div>
              </ResumeSection>
            </AnimateIn>
          </div>
        </div>
      </div>

      <Footer hideCTA />
    </div>
  );
};

/* ── Sub-components ── */

const ContactItem = ({ icon, text, href }: { icon: React.ReactNode; text: string; href?: string }) => (
  <div className="flex items-center gap-2">
    <span className="text-primary">{icon}</span>
    {href ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{text}</a>
    ) : (
      <span>{text}</span>
    )}
  </div>
);

const ResumeSection = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <div className="flex items-center gap-3 mb-4">
      <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary font-display">{label}</span>
      <span className="flex-1 h-px bg-border" />
    </div>
    {children}
  </div>
);

const ImpactCard = ({ stat, desc }: { stat: string; desc: string }) => (
  <div className="glass-card rounded-lg p-3 text-center">
    <div className="font-display text-2xl font-black text-primary">{stat}</div>
    <div className="text-xs text-muted-foreground mt-1">{desc}</div>
  </div>
);

const ExpertiseItem = ({ title, desc }: { title: string; desc: string }) => (
  <div className="pb-3 border-b border-border/50 last:border-b-0 last:pb-0">
    <div className="text-sm font-semibold text-foreground">{title}</div>
    <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
  </div>
);

const SkillPill = ({ label, highlight }: { label: string; highlight?: boolean }) => (
  <span className={`text-xs font-medium px-2.5 py-1 rounded-md border transition-colors ${
    highlight
      ? "bg-primary/15 text-primary border-primary/30"
      : "bg-secondary/50 text-muted-foreground border-border/50"
  }`}>
    {label}
  </span>
);

const LanguageRow = ({ name, level, dots }: { name: string; level: string; dots: number }) => (
  <div className="flex justify-between items-center py-1.5 border-b border-border/30 last:border-b-0">
    <span className="text-sm font-medium text-foreground">{name}</span>
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`w-2 h-2 rounded-full ${i < dots ? "bg-primary" : "bg-border"}`} />
      ))}
    </div>
    <span className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">{level}</span>
  </div>
);

const EduItem = ({ year, degree, school }: { year: string; degree: string; school?: string }) => (
  <div>
    <div className="text-xs font-semibold text-primary tracking-wider">{year}</div>
    <div className="text-sm font-medium text-foreground">{degree}</div>
    {school && <div className="text-xs text-muted-foreground">{school}</div>}
  </div>
);

const ExpItem = ({ role, period, company, tag, current, bullets, last }: {
  role: string; period: string; company: string; tag?: string; current?: boolean; bullets: string[]; last?: boolean;
}) => (
  <div className={`relative ${current ? "pl-4 border-l-2 border-primary" : "pl-4 border-l border-border/40"} ${!last ? "pb-6 mb-0" : ""}`}>
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1">
      <h3 className="text-base font-bold text-foreground font-display">{role}</h3>
      <span className="text-xs text-muted-foreground tracking-wider whitespace-nowrap">{period}</span>
    </div>
    <div className="flex items-center gap-2 mb-2">
      <span className="text-sm font-semibold text-accent">{company}</span>
      {tag && (
        <span className="text-[10px] font-medium text-muted-foreground border border-border/50 px-1.5 py-0.5 rounded-sm bg-secondary/30">{tag}</span>
      )}
    </div>
    <ul className="space-y-1">
      {bullets.map((b, i) => (
        <li key={i} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
          <span className="text-primary mt-0.5 flex-shrink-0">—</span>
          <span>{b}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default Resume;
