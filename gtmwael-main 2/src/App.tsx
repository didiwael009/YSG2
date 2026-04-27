import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import SeoManager from "./components/SeoManager";
import Index from "./pages/Index";

// Lazy load non-critical route pages
const Creative = lazy(() => import("./pages/Creative"));
const ColdEmail = lazy(() => import("./pages/ColdEmail"));
const MetaAds = lazy(() => import("./pages/MetaAds"));
const CaseStudyWriteYourBook = lazy(() => import("./pages/CaseStudyWriteYourBook"));
const CaseStudyGrowapp = lazy(() => import("./pages/CaseStudyGrowapp"));
const CaseStudyZembra = lazy(() => import("./pages/CaseStudyZembra"));
const CaseStudyPubrella = lazy(() => import("./pages/CaseStudyPubrella"));
const CaseStudyShipzzer = lazy(() => import("./pages/CaseStudyShipzzer"));
const CaseStudyScreenplay = lazy(() => import("./pages/CaseStudyScreenplay"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const CaseStudyBottlenexus = lazy(() => import("./pages/CaseStudyBottlenexus"));
const CaseStudyICCenter = lazy(() => import("./pages/CaseStudyICCenter"));
const CommunityManagement = lazy(() => import("./pages/CommunityManagement"));
const LandingPageConversion = lazy(() => import("./pages/LandingPageConversion"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Resume = lazy(() => import("./pages/Resume"));
const Book = lazy(() => import("./pages/Book"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <SeoManager />
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/creative" element={<Creative />} />
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
        <Route path="/creative/community-management" element={<CommunityManagement />} />
        <Route path="/services/landing-page" element={<LandingPageConversion />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/book" element={<Book />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default App;
