import { lazy, Suspense, type ReactNode } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import SectionDivider from "@/components/SectionDivider";
import DeferredSection from "@/components/DeferredSection";

// Lazy load below-the-fold sections
const ExperienceSection = lazy(() => import("@/components/ExperienceSection"));
const CaseStudyBar = lazy(() => import("@/components/CaseStudyBar"));
const TestimonialSection = lazy(() => import("@/components/TestimonialSection"));
const GTMSystemSection = lazy(() => import("@/components/GTMSystemSection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));

const Footer = lazy(() => import("@/components/Footer"));

const LazyFallback = () => <div className="min-h-[200px]" />;
const DeferredLazySection = ({
  children,
  fallbackHeight,
  idleDelay,
}: {
  children: ReactNode;
  fallbackHeight?: number;
  idleDelay?: number;
}) => (
  <DeferredSection fallbackHeight={fallbackHeight} idleDelay={idleDelay}>
    <Suspense fallback={<LazyFallback />}>{children}</Suspense>
  </DeferredSection>
);

const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <SectionDivider variant="glow" />
      <DeferredLazySection fallbackHeight={760} idleDelay={8000}>
        <ExperienceSection />
      </DeferredLazySection>
      <DeferredLazySection fallbackHeight={420} idleDelay={8500}>
        <CaseStudyBar />
      </DeferredLazySection>
      <SectionDivider variant="curve-to-light" />
      <DeferredLazySection fallbackHeight={540} idleDelay={9000}>
        <TestimonialSection />
      </DeferredLazySection>
      <SectionDivider variant="curve-to-dark" />
      <DeferredLazySection fallbackHeight={820} idleDelay={9500}>
        <GTMSystemSection />
      </DeferredLazySection>
      <SectionDivider variant="curve-to-light" />
      <DeferredLazySection fallbackHeight={720} idleDelay={10000}>
        <ServicesSection />
      </DeferredLazySection>
      <SectionDivider variant="curve-to-dark" />
      <DeferredLazySection fallbackHeight={360} idleDelay={10500}>
        <Footer />
      </DeferredLazySection>
    </main>
  );
};

export default Index;
