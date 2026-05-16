import { ArrowRight, Linkedin, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { CALENDLY_URL } from "@/lib/constants";
import { Button } from "@/components/ui/button";

const BehanceIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
  </svg>
);

const UpworkIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.214-1.832-2.148-4.032-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
  </svg>
);

const Footer = ({ hideCTA = false }: { hideCTA?: boolean }) => {
  const services = [
    { label: "SaaS Marketing", to: "/saas-marketing-agency" },
    { label: "Meta Ads", to: "/services/meta-ads" },
    { label: "Cold Email", to: "/services/cold-email" },
    { label: "Landing Pages", to: "/services/landing-page" },
    { label: "Community", to: "/creative/community-management" },
  ];

  const pages = [
    { label: "Creative Folio", to: "/creative" },
    { label: "Case Studies", to: "/case-studies" },
    { label: "Blog", to: "/blog" },
    { label: "Pricing", to: "/pricing" },
    { label: "Resume", to: "/resume" },
  ];

  const useCases = [
    { label: "All Use Cases", to: "/case-studies" },
    { label: "Shipzzer", to: "/case-study/shipzzer" },
    { label: "Screenplay", to: "/case-study/screenplay" },
    { label: "Zembra", to: "/case-study/zembra" },
    { label: "Pubrella", to: "/case-study/pubrella" },
  ];

  const socials = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/aouididi-wael-81b7037a/", icon: <Linkedin className="w-4 h-4" /> },
    { label: "Behance", href: "https://www.behance.net/waelaouididi/", icon: <BehanceIcon /> },
    { label: "Upwork", href: "https://www.upwork.com/freelancers/~0141da0e8c48042461", icon: <UpworkIcon /> },
  ];

  return (
    <footer className="py-16 border-t border-border">
      <div className="container px-4">
        {!hideCTA && (
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Ready to <span className="text-gradient">Scale?</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Let's build a GTM system that actually converts.
            </p>
            <Button variant="hero" size="lg" className="group" asChild>
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                Get Your Free GTM Audit
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-10 max-w-5xl mx-auto">
          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Services</h3>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.to}>
                  <Link to={s.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Pages</h3>
            <ul className="space-y-2.5">
              {pages.map((p) => (
                <li key={p.to}>
                  <Link to={p.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Use Cases */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Use Cases</h3>
            <ul className="space-y-2.5">
              {useCases.map((u) => (
                <li key={u.to}>
                  <Link to={u.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {u.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Connect</h3>
            <ul className="space-y-2.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                  >
                    {s.icon}
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Contact */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/resume" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  My Resume
                </Link>
              </li>
              <li>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Book a Call
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 mt-10 border-t border-border text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Wael Aouididi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
