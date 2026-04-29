import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import SectionDivider from "@/components/SectionDivider";
import DeferredSection from "@/components/DeferredSection";
import ExperienceSection from "@/components/ExperienceSection";
import CaseStudyBar from "@/components/CaseStudyBar";
import TestimonialSection from "@/components/TestimonialSection";
import GTMSystemSection from "@/components/GTMSystemSection";
import ServicesSection from "@/components/ServicesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <SectionDivider variant="glow" />
      <DeferredSection fallbackHeight={760} idleDelay={8000}>
        <ExperienceSection />
      </DeferredSection>
      <DeferredSection fallbackHeight={420} idleDelay={8500}>
        <CaseStudyBar />
      </DeferredSection>
      <SectionDivider variant="curve-to-light" />
      <DeferredSection fallbackHeight={540} idleDelay={9000}>
        <TestimonialSection />
      </DeferredSection>
      <SectionDivider variant="curve-to-dark" />
      <DeferredSection fallbackHeight={820} idleDelay={9500}>
        <GTMSystemSection />
      </DeferredSection>
      <SectionDivider variant="curve-to-light" />
      <DeferredSection fallbackHeight={720} idleDelay={10000}>
        <ServicesSection />
      </DeferredSection>
      <SectionDivider variant="curve-to-dark" />
      <DeferredSection fallbackHeight={360} idleDelay={10500}>
        <Footer />
      </DeferredSection>
    </main>
  );
};

export default Index;
