import { lazy, Suspense, type ReactNode } from "react";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import SeoManager from "./components/SeoManager";
// Homepage is eager so the prerender hydration has no async boundary
import Index from "./pages/Index";

// All other pages are lazy — code-split per route
const Blog = lazy(() => import("./pages/Blog"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const Book = lazy(() => import("./pages/Book"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const CaseStudyPubrella = lazy(() => import("./pages/CaseStudyPubrella"));
const CaseStudyShipzzer = lazy(() => import("./pages/CaseStudyShipzzer"));
const CaseStudyZembra = lazy(() => import("./pages/CaseStudyZembra"));
const ColdEmail = lazy(() => import("./pages/ColdEmail"));
const ColdEmailForSaas = lazy(() => import("./pages/ColdEmailForSaas"));
const ConversionRateOptimisationSpecialist = lazy(() => import("./pages/ConversionRateOptimisationSpecialist"));
const LandingPageConversion = lazy(() => import("./pages/LandingPageConversion"));
const LandingPageForSaas = lazy(() => import("./pages/LandingPageForSaas"));
const MetaAds = lazy(() => import("./pages/MetaAds"));
const MetaAdsForSaas = lazy(() => import("./pages/MetaAdsForSaas"));
const SaasMarketingAgency = lazy(() => import("./pages/SaasMarketingAgency"));
const SaasMarketingPlan = lazy(() => import("./pages/SaasMarketingPlan"));
const B2bSaasMarketingStrategy = lazy(() => import("./pages/B2bSaasMarketingStrategy"));
const OptimizeSaasLandingPage = lazy(() => import("./pages/OptimizeSaasLandingPage"));
const GoogleAdsVsMetaAdsSaas = lazy(() => import("./pages/GoogleAdsVsMetaAdsSaas"));
const SaasColdEmailStrategy = lazy(() => import("./pages/SaasColdEmailStrategy"));
const LandingPageForLeadGeneration = lazy(() => import("./pages/LandingPageForLeadGeneration"));
const LinkedinOutreachForSaas = lazy(() => import("./pages/LinkedinOutreachForSaas"));
const CaseStudyWriteYourBook = lazy(() => import("./pages/CaseStudyWriteYourBook"));
const CaseStudyGrowapp = lazy(() => import("./pages/CaseStudyGrowapp"));
const CaseStudyScreenplay = lazy(() => import("./pages/CaseStudyScreenplay"));
const CaseStudyBottlenexus = lazy(() => import("./pages/CaseStudyBottlenexus"));
const CaseStudyICCenter = lazy(() => import("./pages/CaseStudyICCenter"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Creative = lazy(() => import("./pages/Creative"));
const Resume = lazy(() => import("./pages/Resume"));
const CommunityManagement = lazy(() => import("./pages/CommunityManagement"));
const CroTeardownIndex = lazy(() => import("./pages/CroTeardownIndex"));
const CroTeardownArticle = lazy(() => import("./pages/CroTeardownArticle"));
const NotFound = lazy(() => import("./pages/NotFound"));

/** Redirects /cro-teardown/:slug → /cro-teardowns/:slug (legacy singular → plural) */
const RedirectSlug = ({ prefix }: { prefix: string }) => {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={`${prefix}/${slug ?? ""}`} replace />;
};

const RouteFallback = () => <div className="min-h-screen bg-background" />;
const lazyRoute = (element: ReactNode) => (
  <Suspense fallback={<RouteFallback />}>{element}</Suspense>
);

export const AppRoutes = () => (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/creative" element={lazyRoute(<Creative />)} />
      <Route path="/services/cold-email" element={lazyRoute(<ColdEmail />)} />
      <Route path="/services/meta-ads" element={lazyRoute(<MetaAds />)} />
      <Route path="/case-studies" element={lazyRoute(<CaseStudies />)} />
      <Route path="/case-study/write-your-book" element={lazyRoute(<CaseStudyWriteYourBook />)} />
      <Route path="/case-study/growapp" element={lazyRoute(<CaseStudyGrowapp />)} />
      <Route path="/case-study/zembra" element={lazyRoute(<CaseStudyZembra />)} />
      <Route path="/case-study/pubrella" element={lazyRoute(<CaseStudyPubrella />)} />
      <Route path="/case-study/shipzzer" element={lazyRoute(<CaseStudyShipzzer />)} />
      <Route path="/case-study/screenplay" element={lazyRoute(<CaseStudyScreenplay />)} />
      <Route path="/case-study/bottlenexus" element={lazyRoute(<CaseStudyBottlenexus />)} />
      <Route path="/case-study/ic-center" element={lazyRoute(<CaseStudyICCenter />)} />
      <Route path="/creative/community-management" element={lazyRoute(<CommunityManagement />)} />
      <Route path="/services/landing-page" element={lazyRoute(<LandingPageConversion />)} />
      <Route path="/saas-marketing-agency" element={lazyRoute(<SaasMarketingAgency />)} />
      <Route path="/cold-email-for-saas" element={lazyRoute(<ColdEmailForSaas />)} />
      <Route path="/landing-page-for-saas" element={lazyRoute(<LandingPageForSaas />)} />
      <Route path="/conversion-rate-optimisation-specialist" element={lazyRoute(<ConversionRateOptimisationSpecialist />)} />
      <Route path="/meta-ads-for-saas" element={lazyRoute(<MetaAdsForSaas />)} />
      <Route path="/blog" element={lazyRoute(<Blog />)} />
      <Route path="/blog/:slug" element={lazyRoute(<BlogArticle />)} />
      <Route path="/pricing" element={lazyRoute(<Pricing />)} />
      <Route path="/resume" element={lazyRoute(<Resume />)} />
      <Route path="/book" element={lazyRoute(<Book />)} />
      <Route path="/saas-marketing-plan" element={lazyRoute(<SaasMarketingPlan />)} />
      <Route path="/optimize-saas-landing-page" element={lazyRoute(<OptimizeSaasLandingPage />)} />
      <Route path="/google-ads-vs-meta-ads-saas" element={lazyRoute(<GoogleAdsVsMetaAdsSaas />)} />
      <Route path="/saas-cold-email-strategy" element={lazyRoute(<SaasColdEmailStrategy />)} />
      <Route path="/b2b-saas-marketing-strategy" element={lazyRoute(<B2bSaasMarketingStrategy />)} />
      <Route path="/landing-page-for-lead-generation" element={lazyRoute(<LandingPageForLeadGeneration />)} />
      <Route path="/linkedin-outreach-for-saas" element={lazyRoute(<LinkedinOutreachForSaas />)} />
      {/* CRO teardowns hub — plural canonical */}
      <Route path="/cro-teardowns" element={lazyRoute(<CroTeardownIndex />)} />
      <Route path="/cro-teardowns/:slug" element={lazyRoute(<CroTeardownArticle />)} />
      {/* Legacy singular redirects (keep until old URLs age out of index) */}
      <Route path="/cro-teardown" element={<Navigate to="/cro-teardowns" replace />} />
      <Route path="/cro-teardown/:slug" element={<RedirectSlug prefix="/cro-teardowns" />} />
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
