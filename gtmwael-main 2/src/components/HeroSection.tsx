import { PrimaryCTA, SecondaryCTA } from "@/components/HeroCTA";
const founderImage = "/hero-portrait-256.webp";
const heroSrcSet = "/hero-portrait-256.webp 256w, /hero-portrait-320.webp 320w, /hero-portrait-420.webp 420w, /hero-portrait.webp 595w";
const heroSizes = "(min-width: 1024px) 420px, (min-width: 768px) 288px, 256px";
import zembraLogo from "@/assets/zembra-logo.svg";
import bottlenexusLogo from "@/assets/bottlenexus-logo-white.svg";
import shipzzerLogoWhite from "@/assets/shipzzer-logo-white.png";

const HeroSection = () => {
  const logos = [
    { src: zembraLogo, alt: "Zembra", invert: true, height: "22px", scrollTo: "experience" },
    { src: bottlenexusLogo, alt: "BottleNexus", invert: true, height: "22px", scrollTo: "experience" },
    { src: shipzzerLogoWhite, alt: "Shipzzer", invert: false, height: "20px", scrollTo: "experience" },
  ];

  const handleLogoClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-hero-gradient" style={{ overflow: 'visible' }}>

      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Background glow - z-0 */}
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[hsl(260_60%_50%/0.12)] rounded-full blur-[120px] animate-pulse-glow z-0" />
      
      <div className="container relative px-4 py-20 md:py-28 lg:py-0 lg:min-h-screen lg:flex lg:items-center lg:justify-center" style={{ overflow: 'visible' }}>
        <div className="w-full max-w-5xl mx-auto" style={{ overflow: 'visible' }}>
          {/* Editorial overlap composition */}
          <div className="relative flex flex-col lg:flex-row items-center lg:items-end justify-center gap-8 lg:gap-0" style={{ overflow: 'visible' }}>
            
            {/* Text column - z-2 */}
            <div className="relative z-[2] text-center lg:text-left order-2 lg:order-1 max-w-xl lg:max-w-lg">
               {/* Top Rated Upwork badge */}
               <a
                 href="https://www.upwork.com/freelancers/~0141da0e8c48042461"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 md:animate-fade-up md:opacity-0 group hover:brightness-110 transition-all"
                 style={{ animationDelay: '50ms', animationFillMode: 'forwards', background: 'linear-gradient(135deg, #14a800, #3c8224)' }}
               >
                 <svg viewBox="0 0 24 24" fill="#fff" className="w-3.5 h-3.5 flex-shrink-0">
                   <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.214-1.832-2.148-4.032-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
                 </svg>
                 <span className="text-xs font-semibold text-white">
                   Top Rated on Upwork
                 </span>
               </a>

               <h1 className="font-display font-bold tracking-[-0.03em] mb-4 text-left">
               <span 
                  className="block text-[1.8rem] md:text-[2.25rem] lg:text-[2.7rem] text-foreground leading-[1] md:animate-fade-up md:opacity-0 cursor-default transition-all duration-300 ease-out hover:tracking-[-0.01em] hover:brightness-110 relative group"
                  style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
                >
                  <span className="absolute inset-0 bg-[hsl(260_50%_45%/0.2)] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 scale-110" />
                  Not enough signups?
                </span>
                <span 
                  className="block text-[1.8rem] md:text-[2.25rem] lg:text-[2.7rem] text-gradient leading-[1] mt-1.5 md:animate-fade-up md:opacity-0 cursor-default"
                  style={{ animationDelay: '150ms', animationFillMode: 'forwards' }}
                >
                  I find what's broken — and fix it.
                </span>
              </h1>
              
              <p className="text-sm md:text-base text-muted-foreground mb-4 leading-[1.45] max-w-[55ch] md:animate-fade-up md:opacity-0" style={{ animationDelay: '250ms', animationFillMode: 'forwards' }}>
                I help SaaS teams fix unclear positioning, rebuild key pages, and improve conversion before scaling traffic.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-2.5 md:animate-fade-up md:opacity-0" style={{ animationDelay: '350ms', animationFillMode: 'forwards' }}>
                <PrimaryCTA href="/book">
                  Book a 20-min GTM Audit
                </PrimaryCTA>
                <SecondaryCTA href="/pricing">
                  See Offers
                </SecondaryCTA>
              </div>

              {/* Proof cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-6 md:animate-fade-up md:opacity-0" style={{ animationDelay: '450ms', animationFillMode: 'forwards' }}>
                {[
                  { stat: "4×", desc: "Revenue growth", tag: "ZEMBRA · B2B" },
                  { stat: "+300%", desc: "CVR lift", tag: "LANDING · CRO" },
                  { stat: "2×", desc: "SaaS founder", tag: "BUILT FROM ZERO" },
                ].map((card, i) => (
                  <div key={i} className="border border-border/30 rounded-lg px-2.5 py-1.5 flex items-center gap-2">
                    <p className="text-lg font-bold text-primary flex-shrink-0 whitespace-nowrap">{card.stat}</p>
                    <div className="min-w-0">
                      <p className="text-xs text-foreground/80 leading-tight truncate">{card.desc}</p>
                      <p className="text-[9px] text-primary/70 uppercase tracking-wider mt-0.5 truncate">{card.tag}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Logo strip */}
              <div className="mt-8 md:animate-fade-up md:opacity-0" style={{ animationDelay: '550ms', animationFillMode: 'forwards' }}>
                <p className="text-[10px] text-muted-foreground/60 uppercase tracking-widest mb-3">Trusted by founders at</p>
                <div className="flex items-center justify-center lg:justify-start gap-6 sm:gap-8 md:gap-10 overflow-x-auto scrollbar-hide pb-2 -mb-2">
                  {logos.map((logo, index) => (
                    <button
                      key={index}
                      onClick={() => handleLogoClick(logo.scrollTo)}
                      className="group flex-shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                      aria-label={`View ${logo.alt} case study`}
                    >
                      <img 
                        src={logo.src} 
                        alt={logo.alt} 
                        width={80}
                        height={22}
                        loading="lazy"
                        style={{ height: `calc(${logo.height} * 0.85)` }}
                        className={`w-auto opacity-50 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105 sm:scale-100 ${logo.invert ? 'brightness-0 invert grayscale group-hover:grayscale-0' : 'grayscale group-hover:grayscale-0'}`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Founder image - z-3, free-floating with editorial overlap */}
            <div 
              className="order-1 lg:order-2 relative z-[3] flex-shrink-0 md:animate-fade-up md:opacity-0 lg:-ml-16"
              style={{ animationDelay: '150ms', animationFillMode: 'forwards', overflow: 'visible' }}
            >
              {/* Purple radial glow behind head */}
              <div 
                className="absolute pointer-events-none z-0"
                style={{
                  top: '-10%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '380px',
                  height: '380px',
                  background: 'radial-gradient(circle, rgba(122, 92, 255, 0.35) 0%, rgba(122, 92, 255, 0.12) 40%, transparent 70%)',
                  borderRadius: '50%',
                }}
              />

              {/* Free-floating founder image with deep drop shadow */}
              <img 
                src={founderImage} 
                srcSet={heroSrcSet}
                sizes={heroSizes}
                alt="Wael Aouididi, fractional growth lead for b2b companies" 
                width={420}
                height={520}
                fetchPriority="high"
                decoding="async"
                className="relative z-[1] w-64 md:w-72 lg:w-[420px] h-auto block select-none"
                style={{
                  filter: 'drop-shadow(0 40px 60px rgba(0, 0, 0, 0.45)) drop-shadow(0 15px 25px rgba(0, 0, 0, 0.25))',
                }}
              />

            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
