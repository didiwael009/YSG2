import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CreativeWorkflowSection from "@/components/CreativeWorkflowSection";

const ContentAutomation = () => (
  <main className="min-h-screen bg-background overflow-x-hidden">
    <Navigation />
    <CreativeWorkflowSection variant="full" />
    <Footer />
  </main>
);

export default ContentAutomation;
