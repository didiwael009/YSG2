import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CREAM, INK } from "@/components/agency/style";
import { useNewsreader } from "@/components/agency/useNewsreader";
import AgencyHero from "@/components/agency/AgencyHero";
import AgencyTeam from "@/components/agency/AgencyTeam";
import AgencyWork from "@/components/agency/AgencyWork";
import AgencyAutomation from "@/components/agency/AgencyAutomation";
import AgencyProcess from "@/components/agency/AgencyProcess";

/** Hidden page (noindex, not linked): Sirine and Fedi create, Wael automates. */
const Agency = () => {
  useNewsreader();
  return (
    <div className="min-h-screen overflow-x-hidden font-body" style={{ background: CREAM, color: INK }}>
      <Navigation />
      <main>
        <AgencyHero />
        <AgencyTeam />
        <AgencyWork />
        <AgencyAutomation />
        <AgencyProcess />
      </main>
      <Footer />
    </div>
  );
};

export default Agency;
