import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

import cmShipzzerCollage from "@/assets/cm-shipzzer-collage.jpg";
import cmShipzzerRow from "@/assets/cm-shipzzer-row.png";
import cmShipzzerInvoices from "@/assets/cm-shipzzer-invoices.jpg";
import cmShipzzerTracking from "@/assets/cm-shipzzer-tracking.png";
import cmShipzzerRepair from "@/assets/cm-shipzzer-repair.jpg";
import cmClarrio1 from "@/assets/cm-clarrio-1.png";
import cmClarrio2 from "@/assets/cm-clarrio-2.png";
import cmFoodcost from "@/assets/cm-foodcost.jpg";
import cmPublrella1 from "@/assets/cm-pubrella-1.jpg";
import cmPublrella2 from "@/assets/cm-pubrella-2.jpg";

const clients = [
  {
    name: "Shipzzer",
    category: "Logistics SaaS",
    description: "B2B social content for a container depot management platform — product storytelling, feature launches, and brand awareness posts designed to educate and convert depot managers.",
    images: [
      { src: cmShipzzerCollage, alt: "Shipzzer content collage", aspect: "aspect-[16/9]" },
      { src: cmShipzzerRow, alt: "Shipzzer social posts", aspect: "aspect-[16/5]" },
      { src: cmShipzzerInvoices, alt: "Shipzzer invoices feature post", aspect: "aspect-square" },
      { src: cmShipzzerTracking, alt: "Shipzzer tracking feature post", aspect: "aspect-square" },
      { src: cmShipzzerRepair, alt: "Shipzzer repair time post", aspect: "aspect-square" },
    ],
  },
  {
    name: "Clarrio.ai",
    category: "HealthTech AI",
    description: "Brand storytelling for a healthcare AI platform — character-driven visuals and rebranding narratives that humanize complex medical technology.",
    images: [
      { src: cmClarrio1, alt: "Clarrio character post", aspect: "aspect-square" },
      { src: cmClarrio2, alt: "Clarrio rebrand announcement", aspect: "aspect-[16/9]" },
    ],
  },
  {
    name: "Pubrella",
    category: "Content SaaS",
    description: "Scroll-stopping creatives for a long-form writing tool — bold hooks and punchy messaging to stand out against AI-writing noise.",
    images: [
      { src: cmPublrella1, alt: "Pubrella ad creative", aspect: "aspect-[3/4]" },
      { src: cmPublrella2, alt: "Pubrella boxing ad", aspect: "aspect-[3/4]" },
    ],
  },
  {
    name: "Live Inventory",
    category: "FoodTech",
    description: "Launch content for a food cost automation tool — clean, trust-building visuals that explain a complex product in one glance.",
    images: [
      { src: cmFoodcost, alt: "Live Inventory food cost post", aspect: "aspect-square" },
    ],
  },
];

const CommunityManagement = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />

        <div className="container relative z-10 mx-auto px-6 text-center">
          <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">
            B2B Content Creation
          </p>
          <h1 className="font-display font-bold mb-6">
            <span className="block text-5xl md:text-6xl lg:text-7xl text-foreground">Content That</span>
            <span className="block text-6xl md:text-7xl lg:text-8xl text-gradient">Builds Trust</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            B2B social content that educates, builds credibility, and drives pipeline — designed for SaaS founders who need their LinkedIn and socials to actually work.
          </p>
        </div>
      </section>

      {/* Client Sections */}
      {clients.map((client, ci) => {
        const isLight = ci % 2 === 0;
        return (
          <section
            key={client.name}
            className={`py-16 md:py-24 ${isLight ? "bg-section-light" : ""}`}
          >
            <div className="container mx-auto px-6">
              {/* Client header */}
              <div className="mb-10">
                <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-2 block">
                  {client.category}
                </span>
                <h2 className={`text-3xl md:text-4xl font-display font-bold mb-3 ${isLight ? "text-[hsl(240,20%,15%)]" : "text-foreground"}`}>
                  {client.name}
                </h2>
                <p className={`text-lg max-w-2xl ${isLight ? "text-[hsl(240,10%,40%)]" : "text-muted-foreground"}`}>
                  {client.description}
                </p>
              </div>

              {/* Images grid */}
              {client.name === "Shipzzer" ? (
                <div className="space-y-6">
                  {/* Wide collage images */}
                  <div className="rounded-2xl overflow-hidden border border-border/30">
                    <img src={client.images[0].src} alt={client.images[0].alt} className="w-full h-auto" loading="lazy" />
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-border/30">
                    <img src={client.images[1].src} alt={client.images[1].alt} className="w-full h-auto" loading="lazy" />
                  </div>
                  {/* Square grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {client.images.slice(2).map((img, i) => (
                      <div key={i} className="rounded-2xl overflow-hidden border border-border/30 aspect-square">
                        <img src={img.src} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : client.name === "Pubrella" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
                  {client.images.map((img, i) => (
                    <div key={i} className="rounded-2xl overflow-hidden border border-border/30 aspect-[3/4]">
                      <img src={img.src} alt={img.alt} className="w-full h-full object-cover object-top" loading="lazy" />
                    </div>
                  ))}
                </div>
              ) : client.name === "Clarrio.ai" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="rounded-2xl overflow-hidden border border-border/30 aspect-square">
                    <img src={client.images[0].src} alt={client.images[0].alt} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-border/30 aspect-square md:aspect-auto">
                    <img src={client.images[1].src} alt={client.images[1].alt} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                </div>
              ) : (
                <div className="max-w-lg">
                  <div className="rounded-2xl overflow-hidden border border-border/30 aspect-square">
                    <img src={client.images[0].src} alt={client.images[0].alt} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                </div>
              )}
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 border border-primary/20 p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Need B2B Content That Converts?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Let's build a content engine that positions your brand and drives pipeline.
            </p>
            <Button asChild variant="hero" size="lg">
              <a href="/book">
                Book a Call
              </a>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CommunityManagement;
