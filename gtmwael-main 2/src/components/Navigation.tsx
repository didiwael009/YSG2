import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Mail, Target, FileText, Users, Home, BriefcaseBusiness, Search, Workflow, Repeat, BarChart3, Menu, ChevronDown } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const services = [
  {
    title: "Cold Email for SaaS",
    description: "Portfolio service page with outreach references, workflows, and execution examples.",
    icon: Mail,
    href: "/services/cold-email",
  },
  {
    title: "Meta Ads for SaaS",
    description: "Portfolio service page with paid social references, creative tests, and dashboards.",
    icon: Target,
    href: "/services/meta-ads",
  },
  {
    title: "Landing Page Conversion",
    description: "Portfolio service page with page rebuilds, UX references, and conversion examples.",
    icon: FileText,
    href: "/services/landing-page",
  },
  {
    title: "Community Management",
    description: "Engage where your users are already talking: useful content, rituals and pro-growth moderation.",
    icon: Users,
    href: "/creative/community-management",
  },
];

const navLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
  { label: "Folio", href: "/creative" },
];

const caseStudies = [
  {
    title: "All Case Studies",
    description: "Browse the full SaaS growth portfolio.",
    icon: BriefcaseBusiness,
    href: "/case-studies",
  },
  {
    title: "Shipzzer",
    description: "SEO architecture and cold email for a freight forwarding SaaS.",
    icon: Search,
    href: "/case-study/shipzzer",
  },
  {
    title: "Screenplay",
    description: "From confusing AI tool to guided product funnel.",
    icon: Workflow,
    href: "/case-study/screenplay",
  },
  {
    title: "Zembra",
    description: "SaaS rebrand and outbound revamp that drove 4× revenue.",
    icon: Repeat,
    href: "/case-study/zembra",
  },
  {
    title: "Pubrella",
    description: "Landing page positioning and CRO for 3× conversion.",
    icon: BarChart3,
    href: "/case-study/pubrella",
  },
];

const Navigation = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [caseStudiesOpen, setCaseStudiesOpen] = useState(false);

  const isInternalPage = location.pathname !== "/";

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    let ticking = false;
    let lastScrolled = window.scrollY > 50;
    setIsScrolled(lastScrolled);

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const nextScrolled = window.scrollY > 50;
        if (nextScrolled !== lastScrolled) {
          lastScrolled = nextScrolled;
          setIsScrolled(nextScrolled);
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/" || !("IntersectionObserver" in window)) return;

    const sections = ["services", "how-it-works", "experience"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0, 0.1, 0.25, 0.5],
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  const handleLinkClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header>
    <nav
      aria-label="Primary navigation"
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 opacity-100 translate-y-0 max-w-[calc(100vw-16px)]"
    >
      <div
        className={`flex items-center bg-card/80 backdrop-blur-xl rounded-full px-2 py-2 border border-border/50 shadow-lg shadow-background/30 ${
          isScrolled ? "bg-card/90" : ""
        }`}
      >
        {/* Home button for internal pages */}
        {isInternalPage && (
          <>
            <Link
              to="/"
              className="px-3 py-1.5 text-muted-foreground hover:text-primary transition-colors"
              aria-label="Home"
            >
              <Home className="w-4 h-4" />
              <span className="sr-only">Home</span>
            </Link>
            <div className="w-px h-4 bg-border/50 mx-1" />
          </>
        )}

        {/* Services Dropdown — desktop */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium bg-transparent hover:bg-transparent data-[state=open]:bg-transparent ${
                  activeSection === "services"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Services
              </NavigationMenuTrigger>
              <NavigationMenuContent className="data-[state=open]:animate-dropdown-in data-[state=closed]:animate-dropdown-out">
                <ul className="w-[320px] max-w-[calc(100vw-24px)] p-3 bg-popover border border-border rounded-xl shadow-xl">
                  {services.map((service) => (
                    <li key={service.title}>
                      <Link
                        to={service.href}
                        className="flex items-start gap-3 w-full p-3 rounded-lg hover:bg-muted/50 transition-colors text-left group"
                      >
                        <div className="icon-container-sm flex-shrink-0 mt-0.5">
                          <service.icon className="icon-primary-sm" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                            {service.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="w-px h-4 bg-border/50 mx-1" />

        {/* Case Studies Dropdown — desktop */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium bg-transparent hover:bg-transparent data-[state=open]:bg-transparent ${
                  location.pathname.startsWith("/case-study") || location.pathname === "/case-studies"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Case Studies
              </NavigationMenuTrigger>
              <NavigationMenuContent className="data-[state=open]:animate-dropdown-in data-[state=closed]:animate-dropdown-out">
                <ul className="w-[340px] max-w-[calc(100vw-24px)] p-3 bg-popover border border-border rounded-xl shadow-xl">
                  {caseStudies.map((study) => (
                    <li key={study.href}>
                      <Link
                        to={study.href}
                        className="flex items-start gap-3 w-full p-3 rounded-lg hover:bg-muted/50 transition-colors text-left group"
                      >
                        <div className="icon-container-sm flex-shrink-0 mt-0.5">
                          <study.icon className="icon-primary-sm" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                            {study.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                            {study.description}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Blog / Pricing / Folio — desktop only */}
        <div className="hidden sm:flex items-center">
          <div className="w-px h-4 bg-border/50 mx-1" />
          {navLinks.map((link, index) => (
            <div key={link.href} className="flex items-center">
              <Link
                to={link.href}
                className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium transition-all duration-300 text-muted-foreground hover:text-primary whitespace-nowrap"
              >
                {link.label}
              </Link>
              {index < navLinks.length - 1 && (
                <div className="w-px h-4 bg-border/50 mx-1" />
              )}
            </div>
          ))}
        </div>

        {/* Hamburger — mobile only */}
        <div className="sm:hidden flex items-center">
          <div className="w-px h-4 bg-border/50 mx-1" />
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                className="px-3 py-1.5 text-muted-foreground hover:text-primary transition-colors"
                aria-label="Open navigation menu"
              >
                <Menu className="w-4 h-4" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] p-0 overflow-y-auto">
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>

              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="px-6 py-5 border-b border-border/50">
                  <Link
                    to="/"
                    className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    Your SaaS Growth
                  </Link>
                </div>

                {/* Nav content */}
                <nav aria-label="Mobile navigation" className="flex-1 px-4 py-4 space-y-1">

                  {/* Services section */}
                  <button
                    onClick={() => setServicesOpen((v) => !v)}
                    className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 rounded-lg transition-colors"
                    aria-expanded={servicesOpen}
                  >
                    Services
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {servicesOpen && (
                    <div className="pl-3 space-y-0.5">
                      {services.map((service) => (
                        <Link
                          key={service.href}
                          to={service.href}
                          className="flex items-center gap-3 px-3 py-2.5 text-sm text-muted-foreground hover:text-primary hover:bg-muted/40 rounded-lg transition-colors"
                        >
                          <service.icon className="w-4 h-4 flex-shrink-0" />
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Case Studies section */}
                  <button
                    onClick={() => setCaseStudiesOpen((v) => !v)}
                    className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 rounded-lg transition-colors"
                    aria-expanded={caseStudiesOpen}
                  >
                    Case Studies
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${caseStudiesOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {caseStudiesOpen && (
                    <div className="pl-3 space-y-0.5">
                      {caseStudies.map((study) => (
                        <Link
                          key={study.href}
                          to={study.href}
                          className="flex items-center gap-3 px-3 py-2.5 text-sm text-muted-foreground hover:text-primary hover:bg-muted/40 rounded-lg transition-colors"
                        >
                          <study.icon className="w-4 h-4 flex-shrink-0" />
                          {study.title}
                        </Link>
                      ))}
                    </div>
                  )}

                  <div className="h-px bg-border/50 my-2" />

                  {/* Blog / Pricing / Folio */}
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="flex items-center px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted/40 rounded-lg transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                {/* CTA */}
                <div className="px-4 py-5 border-t border-border/50">
                  <Link
                    to="/book"
                    className="block w-full text-center bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold px-4 py-3 rounded-full transition-colors"
                  >
                    Book a GTM Audit
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
    </header>
  );
};

export default Navigation;
