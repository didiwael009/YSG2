import { lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import SectionDivider from "@/components/SectionDivider";

// Lazy load below-the-fold sections
const ExperienceSection = lazy(() => import("@/components/ExperienceSection"));
const CaseStudyBar = lazy(() => import("@/components/CaseStudyBar"));
const TestimonialSection = lazy(() => import("@/components/TestimonialSection"));
const GTMSystemSection = lazy(() => import("@/components/GTMSystemSection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));

const Footer = lazy(() => import("@/components/Footer"));

const LazyFallback = () => <div className="min-h-[200px]" />;

const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <Suspense fallback={<LazyFallback />}>
        <SectionDivider variant="glow" />
        <ExperienceSection />
        <CaseStudyBar />
        <SectionDivider variant="curve-to-light" />
        <TestimonialSection />
        <SectionDivider variant="curve-to-dark" />
        <GTMSystemSection />
        <SectionDivider variant="curve-to-light" />
        <ServicesSection />
        <SectionDivider variant="curve-to-dark" />
        <Footer />
      </Suspense>
    </main>
  );
};

export default Index;
