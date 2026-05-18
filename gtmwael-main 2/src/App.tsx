import { lazy, Suspense, type ReactNode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import SeoManager from "./components/SeoManager";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import Book from "./pages/Book";
import CaseStudies from "./pages/CaseStudies";
import CaseStudyPubrella from "./pages/CaseStudyPubrella";
import CaseStudyShipzzer from "./pages/CaseStudyShipzzer";
import CaseStudyZembra from "./pages/CaseStudyZembra";
import ColdEmail from "./pages/ColdEmail";
import ColdEmailForSaas from "./pages/ColdEmailForSaas";
import ConversionRateOptimisationSpecialist from "./pages/ConversionRateOptimisationSpecialist";
import LandingPageConversion from "./pages/LandingPageConversion";
import LandingPageForSaas from "./pages/LandingPageForSaas";
import MetaAds from "./pages/MetaAds";
import MetaAdsForSaas from "./pages/MetaAdsForSaas";
import SaasMarketingAgency from "./pages/SaasMarketingAgency";
// SEO-critical article pages — direct imports so renderToString can prerender them
import SaasMarketingPlan from "./pages/SaasMarketingPlan";
import B2bSaasMarketingStrategy from "./pages/B2bSaasMarketingStrategy";
import OptimizeSaasLandingPage from "./pages/OptimizeSaasLandingPage";
import GoogleAdsVsMetaAdsSaas from "./pages/GoogleAdsVsMetaAdsSaas";
import SaasColdEmailStrategy from "./pages/SaasColdEmailStrategy";
import LandingPageForLeadGeneration from "./pages/LandingPageForLeadGeneration";
import LinkedinOutreachForSaas from "./pages/LinkedinOutreachForSaas";

// SEO-critical case studies and pricing — direct imports so renderToString can prerender them
import CaseStudyWriteYourBook from "./pages/CaseStudyWriteYourBook";
import CaseStudyGrowapp from "./pages/CaseStudyGrowapp";
import CaseStudyScreenplay from "./pages/CaseStudyScreenplay";
import CaseStudyBottlenexus from "./pages/CaseStudyBottlenexus";
import CaseStudyICCenter from "./pages/CaseStudyICCenter";
import Pricing from "./pages/Pricing";

// Lazy load non-critical / non-prerendered pages only
const Creative = lazy(() => import("./pages/Creative"));
const CommunityManagement = lazy(() => import("./pages/CommunityManagement"));
const Resume = lazy(() => import("./pages/Resume"));
const NotFound = lazy(() => import("./pages/NotFound"));
const RouteFallback = () => <div className="min-h-screen bg-background" />;
const lazyRoute = (element: ReactNode) => (
  <Suspense fallback={<RouteFallback />}>{element}</Suspense>
);

export const AppRoutes = () => (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/creative" element={lazyRoute(<Creative />)} />
      <Route path="/services/cold-email" element={<ColdEmail />} />
      <Route path="/services/meta-ads" element={<MetaAds />} />
      <Route path="/case-studies" element={<CaseStudies />} />
      <Route path="/case-study/write-your-book" element={<CaseStudyWriteYourBook />} />
      <Route path="/case-study/growapp" element={<CaseStudyGrowapp />} />
      <Route path="/case-study/zembra" element={<CaseStudyZembra />} />
      <Route path="/case-study/pubrella" element={<CaseStudyPubrella />} />
      <Route path="/case-study/shipzzer" element={<CaseStudyShipzzer />} />
      <Route path="/case-study/screenplay" element={<CaseStudyScreenplay />} />
      <Route path="/case-study/bottlenexus" element={<CaseStudyBottlenexus />} />
      <Route path="/case-study/ic-center" element={<CaseStudyICCenter />} />
      <Route path="/creative/community-management" element={lazyRoute(<CommunityManagement />)} />
      <Route path="/services/landing-page" element={<LandingPageConversion />} />
      <Route path="/saas-marketing-agency" element={<SaasMarketingAgency />} />
      <Route path="/cold-email-for-saas" element={<ColdEmailForSaas />} />
      <Route path="/landing-page-for-saas" element={<LandingPageForSaas />} />
      <Route path="/conversion-rate-optimisation-specialist" element={<ConversionRateOptimisationSpecialist />} />
      <Route path="/meta-ads-for-saas" element={<MetaAdsForSaas />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogArticle />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/resume" element={lazyRoute(<Resume />)} />
      <Route path="/book" element={<Book />} />
      <Route path="/saas-marketing-plan" element={<SaasMarketingPlan />} />
      <Route path="/optimize-saas-landing-page" element={<OptimizeSaasLandingPage />} />
      <Route path="/google-ads-vs-meta-ads-saas" element={<GoogleAdsVsMetaAdsSaas />} />
      <Route path="/saas-cold-email-strategy" element={<SaasColdEmailStrategy />} />
      <Route path="/b2b-saas-marketing-strategy" element={<B2bSaasMarketingStrategy />} />
      <Route path="/landing-page-for-lead-generation" element={<LandingPageForLeadGeneration />} />
      <Route path="/linkedin-outreach-for-saas" element={<LinkedinOutreachForSaas />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={lazyRoute(<NotFound />)} />
    </Routes>
);

const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <SeoManager />
    <AppRoutes />
  </BrowserRouter>
);

export default App;
