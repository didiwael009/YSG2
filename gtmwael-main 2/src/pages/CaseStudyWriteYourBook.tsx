import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, Target, MousePointerClick, Eye, Star, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const CaseStudyWriteYourBook = () => {
  const campaigns = [
    { name: "Wael 1st Campaign", ctr: "2.86%", cpc: "£0.19", lpView: "£0.22", highlight: true },
    { name: "New Years Campaign - 1", ctr: "1.15%", cpc: "£0.30", lpView: "£0.32", highlight: false },
    { name: "New Years Campaign - 2", ctr: "1.04%", cpc: "£0.75", lpView: "£1.28", highlight: false },
    { name: "Weekday 35-65", ctr: "0.75%", cpc: "£0.99", lpView: "£1.82", highlight: false },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/meta-ads-for-saas" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Meta Ads
          </Link>
          
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
            Case Study
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            "Write Your Book" Funnel
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            How we hit <span className="text-primary font-semibold">£0.22</span> per landing-page view and <span className="text-primary font-semibold">2.86% CTR</span>
          </p>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <Eye className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-3xl font-bold text-primary">£0.22</div>
              <div className="text-sm text-muted-foreground">Cost per LP View</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-3xl font-bold text-primary">2.86%</div>
              <div className="text-sm text-muted-foreground">Click-through Rate</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <MousePointerClick className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-3xl font-bold text-primary">£0.19</div>
              <div className="text-sm text-muted-foreground">Cost per Click</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <Target className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-3xl font-bold text-primary">317</div>
              <div className="text-sm text-muted-foreground">Landing Page Views</div>
            </div>
          </div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="py-16 px-4 bg-card/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">The Challenge</h2>
          
          <p className="text-lg text-muted-foreground mb-6">
            A course that helps people write their book in one afternoon had a problem:
          </p>
          
          <p className="text-xl font-semibold mb-8">
            People saw the ads. They didn't click.
          </p>
          
          <div className="bg-background border border-border rounded-xl p-6 mb-6">
            <h3 className="font-semibold mb-4">Before we started:</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-destructive rounded-full" />
                Cost per click: around £0.75+
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-destructive rounded-full" />
                Click-through rate: under 1%
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-destructive rounded-full" />
                Landing-page views: expensive and inconsistent
              </li>
            </ul>
          </div>
          
          <p className="text-muted-foreground italic">
            The ads weren't bad. They just didn't make cold scrollers stop and think: "This is for me, right now."
          </p>
        </div>
      </section>

      {/* What We Did */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">What We Did</h2>
          
          {/* Step 1 */}
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">1</span>
              Changed the angle
            </h3>
            <p className="text-muted-foreground mb-6">
              Instead of explaining how the system works, we led with the promise and crushed the main doubt upfront.
            </p>
            <div className="bg-card border border-border rounded-xl p-6">
              <h4 className="font-semibold mb-4">New structure:</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li><span className="text-primary font-semibold">Promise first:</span> "Write your book in one afternoon"</li>
                <li><span className="text-primary font-semibold">Proof:</span> Show the system in action (8-second demo)</li>
                <li><span className="text-primary font-semibold">Kill the objection:</span> "No experience needed—our template guides every chapter"</li>
              </ul>
            </div>
          </div>

          {/* Step 2 */}
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">2</span>
              Created 4 new video ads
            </h3>
            <p className="text-muted-foreground mb-6">
              All shot on phone. Simple. Scroll-stopping.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mb-3" />
                <h4 className="font-semibold mb-2">Yellow "System" ad</h4>
                <p className="text-sm text-muted-foreground">Big, bold headline. Promise in the first 2 seconds.</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="w-3 h-3 bg-purple-500 rounded-full mb-3" />
                <h4 className="font-semibold mb-2">Purple "System" ad</h4>
                <p className="text-sm text-muted-foreground">Same offer, authority angle. Clean and professional.</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="w-3 h-3 bg-primary rounded-full mb-3" />
                <h4 className="font-semibold mb-2">Comparison panel</h4>
                <p className="text-sm text-muted-foreground">"Traditional way: 2 years. Our way: 1 afternoon."</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full mb-3" />
                <h4 className="font-semibold mb-2">Desk scene</h4>
                <p className="text-sm text-muted-foreground">Pattern interrupt. Different visual to catch different people.</p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">3</span>
              Fixed the tracking
            </h3>
            <p className="text-muted-foreground mb-4">
              We rebuilt the account structure and wired up clean tracking (Meta Pixel + Conversions API through Google Tag Manager).
            </p>
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
              <p className="text-sm">
                <span className="font-semibold">Why this mattered:</span> Before, attribution was messy. After, we could see exactly which ads worked and scale the winners with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Results */}
      <section className="py-16 px-4 bg-card/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">The Results</h2>
          <p className="text-muted-foreground mb-8">
            Campaign duration: December 2022 – January 2026<br />
            Audience: UK/US writers and aspiring authors (lookalike + interest targeting)
          </p>

          {/* Best Performing */}
          <div className="bg-primary/10 border-2 border-primary rounded-xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary">Best-performing campaign</span>
            </div>
            <h3 className="text-xl font-bold mb-4">"Wael 1st Campaign"</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">CTR (all)</div>
                <div className="text-xl font-bold">2.86%</div>
              </div>
              <div>
                <div className="text-muted-foreground">CTR (link clicks)</div>
                <div className="text-xl font-bold">1.71%</div>
              </div>
              <div>
                <div className="text-muted-foreground">CPC (link)</div>
                <div className="text-xl font-bold">£0.19</div>
              </div>
              <div>
                <div className="text-muted-foreground">CPC (all)</div>
                <div className="text-xl font-bold">£0.11</div>
              </div>
              <div>
                <div className="text-muted-foreground">Total clicks</div>
                <div className="text-xl font-bold">616</div>
              </div>
              <div>
                <div className="text-muted-foreground">LP views</div>
                <div className="text-xl font-bold">317</div>
              </div>
            </div>
          </div>

          {/* Campaign Comparison */}
          <h3 className="font-semibold mb-4">Performance across campaigns:</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">Campaign</th>
                  <th className="text-right py-3 px-4 font-semibold">CTR</th>
                  <th className="text-right py-3 px-4 font-semibold">CPC</th>
                  <th className="text-right py-3 px-4 font-semibold">Cost/LP View</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign) => (
                  <tr 
                    key={campaign.name} 
                    className={`border-b border-border ${campaign.highlight ? 'bg-primary/5' : ''}`}
                  >
                    <td className={`py-3 px-4 ${campaign.highlight ? 'font-semibold text-primary' : ''}`}>
                      {campaign.name}
                    </td>
                    <td className="text-right py-3 px-4">{campaign.ctr}</td>
                    <td className="text-right py-3 px-4">{campaign.cpc}</td>
                    <td className="text-right py-3 px-4">{campaign.lpView}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-muted-foreground text-sm italic">
            Bottom line: The Wael campaign delivered the lowest cost per landing-page view (£0.22) and highest engagement (2.86% CTR all, 1.71% link CTR).
          </p>
        </div>
      </section>

      {/* Why It Worked */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Why It Worked</h2>
          
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-bold mb-2">The promise stopped the scroll</h3>
              <p className="text-muted-foreground">
                "Write your book in one afternoon—no experience, no overwhelm" answered the two biggest objections in the first 3 seconds.
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-bold mb-2">The demo made it real</h3>
              <p className="text-muted-foreground">
                Viewers saw the template in action. Instant proof: "I could actually do this."
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-bold mb-2">Clean tracking meant fast decisions</h3>
              <p className="text-muted-foreground">
                We tested multiple campaigns side-by-side. The data was clear: Wael's angle and creative crushed the others. We scaled it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We're Testing Next */}
      <section className="py-16 px-4 bg-card/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">What We're Testing Next</h2>
          
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-0.5">→</span>
              <span className="text-muted-foreground">Add a trust badge to the winning creative ("Used by 1,200+ first-time authors")</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-0.5">→</span>
              <span className="text-muted-foreground">Open the video with 3 seconds of demo before the headline</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-0.5">→</span>
              <span className="text-muted-foreground">Drop one line of social proof on the comparison panel</span>
            </li>
          </ul>
        </div>
      </section>

      {/* One-Sentence Version */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-4">Write Your Book Campaign in One Sentence</h2>
            <p className="text-lg">
              I make scroll-stopping video ads and set up clean tracking so you know what's working—in one "Write Your Book" funnel, I delivered <span className="text-primary font-semibold">317 landing-page views at £0.22 each</span> with a <span className="text-primary font-semibold">2.86% CTR</span> and <span className="text-primary font-semibold">£0.19 cost per link click</span>.
            </p>
          </div>
        </div>
      </section>

      {/* What This Means for You */}
      <section className="py-16 px-4 bg-card/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">What This Means for You</h2>
          
          <p className="text-lg text-muted-foreground mb-6">If you're running ads and:</p>
          
          <ul className="inline-block text-left space-y-3 mb-8">
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-destructive rounded-full" />
              Your landing-page views cost more than £0.50
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-destructive rounded-full" />
              Your CTR is under 1.5%
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-destructive rounded-full" />
              You're not sure which creative is actually working
            </li>
          </ul>
          
          <p className="text-lg mb-8">…then you have the same problem this client had.</p>
          
          <div className="bg-card border border-border rounded-xl p-8 mb-8">
            <p className="text-xl font-semibold mb-4">The fix isn't complicated:</p>
            <p className="text-primary text-lg">Better hook. Clearer promise. Clean tracking. Test every week.</p>
            <p className="text-muted-foreground mt-2">That's it.</p>
          </div>
          
          <Button variant="hero" size="xl" asChild>
            <Link to="/meta-ads-for-saas#audit">Get Your Free Audit</Link>
          </Button>
        </div>
      </section>

      {/* Client Review Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Write Your Book Client Review</h2>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-orange-400 text-orange-400" />
              ))}
              <span className="ml-2 text-lg font-semibold">5.0</span>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8">
            <p className="text-lg text-foreground/90 leading-relaxed italic mb-6">
              "Wael is solid. He's a rare Upwork contractor who goes the extra mile and delivers more than originally promised. He was constantly thinking about my funnel improvements and how to get more customers and clicks—sharing ideas and insights proactively. He gave me some great ideas to optimise my funnel and was very thorough. I'd recommend him if you want to optimise your Meta ad spend or your funnel. You want him on your team."
            </p>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <p className="text-muted-foreground font-medium">— Upwork Client</p>
              <a 
                href="https://www.upwork.com/freelancers/~0172dd07fc1cdd655c?promobnr=1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
              >
                Verify on Upwork
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudyWriteYourBook;
