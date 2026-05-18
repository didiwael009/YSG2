import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingDown, Target, Zap, Check, Star } from "lucide-react";
import { Link } from "react-router-dom";
import ResponsiveImage from "@/components/ResponsiveImage";
import growappLogo from "@/assets/growapp-logo.jpeg";
import growappDashboard from "@/assets/growapp-meta-dashboard.png";

const CaseStudyGrowapp = () => {
  const campaignData = [
    { name: "Retargeting (Visitors)", status: "Active", statusColor: "text-green-400", results: "—", resultType: "Website lead", reach: "—", frequency: "—", cost: "—", costType: "Per lead" },
    { name: "Lead Gen (Landing Page)", status: "Off", statusColor: "text-muted-foreground", results: "1", resultType: "Website lead", reach: "2,946", frequency: "1.58", cost: "£34.31", costType: "Per lead", highlight: "bad" },
    { name: "Trial Offer (Broad)", status: "Off", statusColor: "text-muted-foreground", results: "10", resultType: "Website leads", reach: "2,905", frequency: "1.52", cost: "£3.47", costType: "Per lead", highlight: "good" },
    { name: "New Year Push (Warm)", status: "Off", statusColor: "text-muted-foreground", results: "115", resultType: "Landing page views", reach: "10,654", frequency: "1.01", cost: "£0.32", costType: "Per landing page view", highlight: "good" },
    { name: "Founder Audience (Interest)", status: "Off", statusColor: "text-muted-foreground", results: "317", resultType: "Landing page views", reach: "13,590", frequency: "1.58", cost: "£0.22", costType: "Per landing page view", highlight: "good" },
    { name: "Lookalike (Customers)", status: "Off", statusColor: "text-muted-foreground", results: "—", resultType: "Landing page view", reach: "—", frequency: "—", cost: "—", costType: "Per landing page view" },
    { name: "Weekday Trial (Test)", status: "Completed", statusColor: "text-blue-400", results: "10", resultType: "Website leads", reach: "6,581", frequency: "1.47", cost: "£7.00", costType: "Per lead", highlight: "good" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/services/meta-ads" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Meta Ads
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <ResponsiveImage
              src={growappLogo} 
              alt="Growapp" 
              sizes="48px"
              className="w-12 h-12 rounded-xl object-cover"
            />
            <div className="inline-block px-3 py-1 bg-cyan-400/10 text-cyan-400 text-sm font-medium rounded-full">
              Case Study
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            GrowApp — <span className="text-cyan-400">$30K+ MRR</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-2">
            Built and scaled my own B2B SaaS from zero to <span className="text-cyan-400 font-semibold">$30K+ MRR</span>
          </p>
          <p className="text-lg text-muted-foreground">
            Not a client gig — my product.
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {["Bootstrapped SaaS", "AppSumo Launch", "Founder & CMO"].map((tag) => (
              <span key={tag} className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground border border-border rounded-md">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* The Win */}
      <section className="py-16 px-4 bg-card/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">GrowApp Campaign Results</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-cyan-400/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <TrendingDown className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">Cut CPL by 73%</p>
                <p className="text-muted-foreground">From £30+ down to £3–£7 per qualified lead</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-cyan-400/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Target className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">Consistent performance over 30 days</p>
                <p className="text-muted-foreground">December 11, 2025 – January 9, 2026</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-cyan-400/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Zap className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">Multi-stage funnel optimization</p>
                <p className="text-muted-foreground">Warm traffic re-engagement at £0.20–£0.32 per landing page view</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Proof */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">GrowApp Meta Ads Proof</h2>
          <p className="text-muted-foreground mb-8 text-center">Real Meta Ads Manager dashboard showing Growapp campaign performance</p>
          
          <div className="bg-card/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden mb-12">
            {/* macOS-style window title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-sm text-muted-foreground ml-2">Meta Ads Manager — Growapp Campaigns</span>
            </div>
            
            {/* Dashboard content */}
            <div className="p-2">
              <ResponsiveImage
                src={growappDashboard} 
                alt="Meta Ads Manager dashboard showing Growapp campaigns with £3-£7 CPL" 
                loading="lazy"
                decoding="async"
                sizes="100vw"
                className="w-full rounded-lg"
              />
            </div>
          </div>

          {/* Campaign Performance Table */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-2">Campaign Performance (Dec 11, 2025 - Jan 9, 2026)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-3 font-semibold">Campaign</th>
                    <th className="text-left py-3 px-3 font-semibold">Status</th>
                    <th className="text-right py-3 px-3 font-semibold">Results</th>
                    <th className="text-right py-3 px-3 font-semibold">Reach</th>
                    <th className="text-right py-3 px-3 font-semibold">Frequency</th>
                    <th className="text-right py-3 px-3 font-semibold">Cost Per Result</th>
                  </tr>
                </thead>
                <tbody>
                  {campaignData.map((campaign) => (
                    <tr 
                      key={campaign.name} 
                      className={`border-b border-border/50 ${campaign.highlight === 'good' ? 'bg-cyan-400/5' : campaign.highlight === 'bad' ? 'bg-destructive/5' : ''}`}
                    >
                      <td className="py-3 px-3">
                        <span className="font-medium">{campaign.name}</span>
                      </td>
                      <td className={`py-3 px-3 ${campaign.statusColor}`}>
                        {campaign.status}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span className="font-medium">{campaign.results}</span>
                        <span className="text-muted-foreground text-xs block">{campaign.resultType}</span>
                      </td>
                      <td className="py-3 px-3 text-right text-muted-foreground">{campaign.reach}</td>
                      <td className="py-3 px-3 text-right text-muted-foreground">{campaign.frequency}</td>
                      <td className="py-3 px-3 text-right">
                        <span className={`font-semibold ${campaign.highlight === 'good' ? 'text-cyan-400' : campaign.highlight === 'bad' ? 'text-destructive' : 'text-muted-foreground'}`}>
                          {campaign.cost}
                        </span>
                        <span className="text-muted-foreground text-xs block">{campaign.costType}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground mt-4">Total campaigns tracked: 7 campaigns</p>
          </div>
        </div>
      </section>

      {/* What I Did */}
      <section className="py-16 px-4 bg-card/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">What I Built for GrowApp</h2>
          
          {/* Step 1 */}
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-cyan-400 text-background rounded-full flex items-center justify-center text-sm font-bold">1</span>
              Killed the generic lead form
            </h3>
            <div className="bg-background border border-border rounded-xl p-6">
              <div className="flex items-center gap-4 justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground line-through">Generic lead form</p>
                  <p className="text-destructive font-semibold text-xl">£30+ CPL</p>
                </div>
                <div className="text-3xl text-muted-foreground">→</div>
                <div className="text-center">
                  <p className="text-foreground font-semibold">Direct Trial offer</p>
                  <p className="text-cyan-400 font-semibold text-xl">£3–£7 CPL</p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-cyan-400 text-background rounded-full flex items-center justify-center text-sm font-bold">2</span>
              Split campaigns cleanly
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-background border border-border rounded-xl p-5">
                <div className="w-3 h-3 bg-orange-500 rounded-full mb-3" />
                <h4 className="font-semibold mb-2">Warm</h4>
                <p className="text-sm text-muted-foreground">Retargeting past visitors at £0.20–£0.32 per LP view</p>
              </div>
              <div className="bg-background border border-border rounded-xl p-5">
                <div className="w-3 h-3 bg-blue-500 rounded-full mb-3" />
                <h4 className="font-semibold mb-2">Prospecting</h4>
                <p className="text-sm text-muted-foreground">Cold audience with direct Trial offer at £3.47</p>
              </div>
              <div className="bg-background border border-border rounded-xl p-5">
                <div className="w-3 h-3 bg-purple-500 rounded-full mb-3" />
                <h4 className="font-semibold mb-2">Tests</h4>
                <p className="text-sm text-muted-foreground">New angles and seasonal messages (Weekday timing test at £7.00 CPL)</p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-cyan-400 text-background rounded-full flex items-center justify-center text-sm font-bold">3</span>
              Fixed what broke
            </h3>
            <div className="space-y-4">
              <div className="bg-background border border-border rounded-xl p-5">
                <h4 className="font-semibold mb-2">Repaired tracking setup</h4>
                <p className="text-sm text-muted-foreground">Clean Pixel + CAPI implementation with 7-day click, 1-day view attribution</p>
              </div>
              <div className="bg-background border border-border rounded-xl p-5">
                <h4 className="font-semibold mb-2">Monitored frequency caps</h4>
                <p className="text-sm text-muted-foreground">Avoided ad fatigue by keeping frequency between 1.01–1.58</p>
              </div>
              <div className="bg-background border border-border rounded-xl p-5">
                <h4 className="font-semibold mb-2">Weekly optimization</h4>
                <p className="text-sm text-muted-foreground">Killed underperformers, scaled winners slowly (+30% every 2 days while CPL stayed under £7)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What This Unlocked */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">What GrowApp Unlocked</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-cyan-400/20 rounded-xl flex items-center justify-center mb-4">
                <Check className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="font-bold mb-2">Predictable lead flow</h3>
              <p className="text-muted-foreground text-sm">No more feast-or-famine months</p>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-cyan-400/20 rounded-xl flex items-center justify-center mb-4">
                <Check className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="font-bold mb-2">Consistent CPL performance</h3>
              <p className="text-muted-foreground text-sm">Maintained £3–£7 range even during testing periods</p>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-cyan-400/20 rounded-xl flex items-center justify-center mb-4">
                <Check className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="font-bold mb-2">73% lower CAC</h3>
              <p className="text-muted-foreground text-sm">Vs. previous generic campaigns (from £30+ to £3–£7)</p>
            </div>
          </div>
        </div>
      </section>

      {/* One-Sentence Version */}
      <section className="py-16 px-4 bg-card/50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-cyan-400/20 to-cyan-400/5 border border-cyan-400/30 rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-4">One-Sentence Version</h2>
            <p className="text-lg">
              I replaced the generic lead form with a direct Trial offer, split campaigns by intent, and fixed tracking — delivering consistent leads at <span className="text-cyan-400 font-semibold">£3–£7 CPL</span> while the industry average sat at <span className="text-cyan-400 font-semibold">£30+</span>.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Want Results Like This?</h2>
          
          <p className="text-lg text-muted-foreground mb-6">If your SaaS is paying more than £10 per trial request, you're leaving money on the table.</p>
          
          <div className="bg-card border border-border rounded-xl p-8 mb-8 max-w-xl mx-auto">
            <p className="text-xl font-semibold mb-4">The playbook:</p>
            <p className="text-cyan-400 text-lg">Direct offer. Clean segmentation. Ruthless optimization.</p>
            <p className="text-muted-foreground mt-2">That's what gets you to £3–£7 CPL.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" size="xl" asChild>
              <a href="https://appsumo.com/products/growapp/" target="_blank" rel="noopener noreferrer">
                View AppSumo Listing
              </a>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <a href="https://calendly.com/waeli/gtm-intro" target="_blank" rel="noopener noreferrer">
                Book a Call
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Client Review */}
      <section className="py-16 px-4 bg-card/50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
              ))}
            </div>
          </div>
          
          <blockquote className="text-center">
            <p className="text-xl md:text-2xl text-foreground mb-6 leading-relaxed">
              "Wael turned our Meta Ads around completely. We went from burning budget on £30+ leads to getting qualified trials at £3–£7. The sales team finally has enough pipeline to work with."
            </p>
            <footer className="flex items-center justify-center gap-4">
              <ResponsiveImage
                src={growappLogo} 
                alt="Growapp" 
                sizes="48px"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="text-left">
                <cite className="not-italic font-semibold text-foreground">Growapp Team</cite>
                <p className="text-sm text-muted-foreground">SaaS B2B</p>
              </div>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Ready to Scale */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Scale?</h2>
          <p className="text-lg text-muted-foreground mb-8">Let's build a GTM system that actually converts.</p>
          
          <Button variant="hero" size="xl" asChild>
            <Link to="/services/meta-ads#audit">Get Your Free GTM Audit</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudyGrowapp;
