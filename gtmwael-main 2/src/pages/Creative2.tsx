import Navigation from "@/components/Navigation";
import SectionDivider from "@/components/SectionDivider";
import Footer from "@/components/Footer";
import { useNewsreader } from "@/components/creative2/useNewsreader";

const Creative2 = () => {
  useNewsreader();
  return (
    <main className="min-h-screen bg-background overflow-x-clip">
      <Navigation />
      <section aria-label="Hero" />
      <SectionDivider variant="glow" />
      <section id="experience" />
      <SectionDivider variant="curve-to-light" />
      <section id="services" />
      <SectionDivider variant="curve-to-dark" />
      <section id="creative-workflow" />
      <SectionDivider variant="curve-to-light" />
      <section id="proof" />
      <SectionDivider variant="curve-to-dark" />
      <section id="how-it-works" />
      <Footer />
    </main>
  );
};

export default Creative2;
