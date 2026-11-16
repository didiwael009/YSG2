import Navigation from "@/components/Navigation";
import SectionDivider from "@/components/SectionDivider";
import Footer from "@/components/Footer";
import SliderHero from "@/components/creative2/SliderHero";
import C2Experience from "@/components/creative2/C2Experience";
import C2Services from "@/components/creative2/C2Services";
import C2Work from "@/components/creative2/C2Work";
import C2Testimonials from "@/components/creative2/C2Testimonials";
import C2Process from "@/components/creative2/C2Process";

const Creative2 = () => {
  return (
    <main id="main" className="min-h-screen bg-background overflow-x-clip">
      <Navigation />
      <SliderHero />
      <SectionDivider variant="glow" />
      <C2Experience />
      <SectionDivider variant="curve-to-light" />
      <C2Services />
      <SectionDivider variant="curve-to-dark" />
      <C2Work />
      <SectionDivider variant="curve-to-light" />
      <C2Testimonials />
      <SectionDivider variant="curve-to-dark" />
      <C2Process />
      <Footer />
    </main>
  );
};

export default Creative2;
