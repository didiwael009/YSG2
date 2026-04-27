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
  rootMargin,
}: {
  children: ReactNode;
  fallbackHeight?: number;
  rootMargin?: string;
}) => (
  <DeferredSection fallbackHeight={fallbackHeight} rootMargin={rootMargin}>
    <Suspense fallback={<LazyFallback />}>{children}</Suspense>
  </DeferredSection>
);

const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <SectionDivider variant="glow" />
      <DeferredLazySection fallbackHeight={760} rootMargin="300px 0px">
        <ExperienceSection />
      </DeferredLazySection>
      <DeferredLazySection fallbackHeight={420} rootMargin="200px 0px">
        <CaseStudyBar />
      </DeferredLazySection>
      <SectionDivider variant="curve-to-light" />
      <DeferredLazySection fallbackHeight={540} rootMargin="250px 0px">
        <TestimonialSection />
      </DeferredLazySection>
      <SectionDivider variant="curve-to-dark" />
      <DeferredLazySection fallbackHeight={820} rootMargin="250px 0px">
        <GTMSystemSection />
      </DeferredLazySection>
      <SectionDivider variant="curve-to-light" />
      <DeferredLazySection fallbackHeight={720} rootMargin="250px 0px">
        <ServicesSection />
      </DeferredLazySection>
      <SectionDivider variant="curve-to-dark" />
      <DeferredLazySection fallbackHeight={360} rootMargin="250px 0px">
        <Footer />
      </DeferredLazySection>
    </main>
  );
};

export default Index;
