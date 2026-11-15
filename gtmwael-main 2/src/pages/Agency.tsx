import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CREAM, INK } from "@/components/agency/style";
import { useNewsreader } from "@/components/agency/useNewsreader";

/** Hidden page (noindex, not linked): Sirine and Fedi create, Wael automates. */
const Agency = () => {
  useNewsreader();
  return (
    <div className="min-h-screen overflow-x-hidden font-body" style={{ background: CREAM, color: INK }}>
      <Navigation />
      <main></main>
      <Footer />
    </div>
  );
};

export default Agency;
