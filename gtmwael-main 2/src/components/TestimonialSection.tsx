import { Quote, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import AnimateIn from "./AnimateIn";
import ResponsiveImage from "@/components/ResponsiveImage";
const khoubeibPhoto = "/khoubeib-96.webp";

const testimonials = [
  {
    name: "Khoubeib Bouthour",
    role: "CEO · Zembra · B2B SaaS · May 2024",
    photo: khoubeibPhoto,
    quote: "Wael has been instrumental in driving our revenue growth at Zembra through his expertise in email outreach automation and strategic rebranding.",
    highlight: "He is an exemplary growth marketer, capable of exceeding expectations and delivering remarkable results.",
    linkLabel: "View on LinkedIn",
    linkUrl: "https://www.linkedin.com/in/aouididi-wael-81b7037a/details/recommendations/",
  },
  {
    name: "Felix W",
    role: "Founder · Pubrella.com",
    photo: null,
    quote: "Wael acted as a growth partner. We started with positioning, brand messaging and copy; then traffic (Meta Ads) with clean tracking; then analytics-led CRO.",
    highlight: "With this trust–traffic–analytics approach and a refreshed landing, our visit→signup conversion improved by about 3×. Easy to work with and fast.",
    linkLabel: "View on Upwork",
    linkUrl: "https://www.upwork.com/freelancers/waelaouididi",
  },
];

const TestimonialSection = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[active];

  return (
    <section id="proof" className="py-16 md:py-24 relative bg-section-light">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <AnimateIn delay={100} className="mb-8">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">
              Trusted by Founders
            </p>
            <h2 className="font-display font-bold">
              <span className="block text-5xl md:text-6xl lg:text-7xl text-heading-light">Proof</span>
              <span className="block text-6xl md:text-7xl lg:text-8xl text-gradient">after execution</span>
            </h2>
          </AnimateIn>

          <div
            className="relative rounded-2xl p-[1px] animate-fade-up opacity-0"
            style={{
              animationDelay: '200ms',
              animationFillMode: 'forwards',
              background: 'linear-gradient(135deg, hsl(260 50% 45% / 0.3), hsl(240 20% 85% / 0.4), hsl(240 15% 90% / 0.3))'
            }}
          >
            <div className="bg-white rounded-2xl p-6 md:p-10 relative overflow-hidden shadow-lg">
              <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-[hsl(260_50%_70%/0.1)] rounded-full blur-[80px]" />

              {/* Header with avatar — slides with content */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-border-light relative z-10">
                <div className="flex items-center gap-3 transition-opacity duration-500" key={`header-${active}`}>
                  {t.photo ? (
                    <ResponsiveImage
                      src={t.photo}
                      alt={t.name}
                      width={48}
                      height={48}
                      loading="lazy"
                      decoding="async"
                      sizes="48px"
                      className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full border-2 border-primary/30 bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                      {t.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="font-display text-lg font-semibold text-heading-light">{t.name}</h3>
                    <p className="text-body-light text-sm">{t.role}</p>
                  </div>
                </div>
                <Quote className="w-10 h-10 text-primary/40 hidden sm:block" />
              </div>

              {/* Sliding text content */}
              <div className="relative z-10 min-h-[120px]" key={`content-${active}`} style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
                <p className="text-body-light-strong text-base md:text-lg leading-relaxed mb-4">
                  {t.quote}
                </p>
                <p className="text-primary font-medium text-base md:text-lg leading-relaxed">
                  {t.highlight}
                </p>
              </div>

              {/* Footer link */}
              <div className="mt-8 pt-6 border-t border-border-light relative z-10 flex items-center justify-between">
                <a
                  href={t.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                >
                  {t.linkLabel}
                  <ExternalLink className="w-4 h-4" />
                </a>

                {/* Dots */}
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        i === active ? 'bg-primary scale-110' : 'bg-primary/25 hover:bg-primary/40'
                      }`}
                      aria-label={`Show testimonial ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default TestimonialSection;
