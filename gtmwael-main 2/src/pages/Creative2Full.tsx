import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FullPageCompare from "@/components/creative2/FullPageCompare";

/** Test page: the before/after slider over the whole page, not just the hero. */
const Creative2Full = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-clip">
      <Navigation />
      <FullPageCompare />
      <Footer />
    </main>
  );
};

export default Creative2Full;
