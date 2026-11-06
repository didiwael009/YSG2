import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import CreativeWorkflowSection from "@/components/CreativeWorkflowSection";
import SectionDivider from "@/components/SectionDivider";
import ExperienceSection from "@/components/ExperienceSection";
import CaseStudyBar from "@/components/CaseStudyBar";
import TestimonialSection from "@/components/TestimonialSection";
import GTMSystemSection from "@/components/GTMSystemSection";
import ServicesSection from "@/components/ServicesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-clip">
      <Navigation />
      <HeroSection />
      <SectionDivider variant="glow" />
      <ExperienceSection />
      <SectionDivider variant="curve-to-light" />
      <ServicesSection />
      <SectionDivider variant="curve-to-dark" />
      <CreativeWorkflowSection variant="teaser" />
      <CaseStudyBar />
      <SectionDivider variant="curve-to-light" />
      <TestimonialSection />
      <SectionDivider variant="curve-to-dark" />
      <GTMSystemSection />
      <Footer />
    </main>
  );
};

export default Index;
