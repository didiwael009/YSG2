import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Mail, Target, FileText, Users, Home, BriefcaseBusiness, Search, Workflow, Repeat, BarChart3 } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const services = [
  {
    title: "Cold Emailing",
    description: "Outbound that opens qualified conversations without spam or poor-quality lists.",
    icon: Mail,
    href: "/services/cold-email",
    isPage: true,
  },
  {
    title: "Meta Ads (FB/IG)",
    description: "Creatives and targeting oriented toward rapid testing to achieve a viable CPA before discarding the channel.",
    icon: Target,
    href: "/services/meta-ads",
    isPage: true,
  },
  {
    title: "Landing Page – Conversion",
    description: "Message, structure and proof: achieve clarity before thinking about design.",
    icon: FileText,
    href: "/services/landing-page",
    isPage: true,
  },
  {
    title: "Community Management",
    description: "Engage where your users are already talking: useful content, rituals and pro-growth moderation.",
    icon: Users,
    href: "/creative/community-management",
    isPage: true,
  },
];

const navLinks = [
  { label: "Pricing", href: "/pricing", isPage: true },
  { label: "Folio", href: "/creative", isPage: true },
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
  
  const isInternalPage = location.pathname !== "/";

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);
        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
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
    <nav
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 opacity-100 translate-y-0"
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
              title="Back to Home"
            >
              <Home className="w-4 h-4" />
            </Link>
            <div className="w-px h-4 bg-border/50 mx-1" />
          </>
        )}

        {/* Services Dropdown */}
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
                <ul className="w-[320px] p-3 bg-popover border border-border rounded-xl shadow-xl">
                  {services.map((service) => (
                    <li key={service.title}>
                      {service.isPage ? (
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
                      ) : (
                        <button
                          onClick={() => handleLinkClick(service.href)}
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
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="w-px h-4 bg-border/50 mx-1" />

        {/* Case Studies Dropdown */}
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
                <ul className="w-[340px] p-3 bg-popover border border-border rounded-xl shadow-xl">
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

        <div className="w-px h-4 bg-border/50 mx-1" />

        {/* Other nav links */}
        {navLinks.map((link, index) => {
          const isActive = !link.isPage && activeSection === link.href.slice(1);
          const isLast = index === navLinks.length - 1;
          
          return (
            <div key={link.href} className="flex items-center">
              {link.isPage ? (
                <Link
                  to={link.href}
                  className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium transition-all duration-300 text-muted-foreground hover:text-primary whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  onClick={() => handleLinkClick(link.href)}
                  className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </button>
              )}
              {!isLast && (
                <div className="w-px h-4 bg-border/50 mx-1" />
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
