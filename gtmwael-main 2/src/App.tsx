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
import LandingPageConversion from "./pages/LandingPageConversion";

// Lazy load non-critical route pages
const Creative = lazy(() => import("./pages/Creative"));
const MetaAds = lazy(() => import("./pages/MetaAds"));
const CaseStudyWriteYourBook = lazy(() => import("./pages/CaseStudyWriteYourBook"));
const CaseStudyGrowapp = lazy(() => import("./pages/CaseStudyGrowapp"));
const CaseStudyScreenplay = lazy(() => import("./pages/CaseStudyScreenplay"));
const CaseStudyBottlenexus = lazy(() => import("./pages/CaseStudyBottlenexus"));
const CaseStudyICCenter = lazy(() => import("./pages/CaseStudyICCenter"));
const CommunityManagement = lazy(() => import("./pages/CommunityManagement"));
const Pricing = lazy(() => import("./pages/Pricing"));
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
      <Route path="/services/meta-ads" element={lazyRoute(<MetaAds />)} />
      <Route path="/case-studies" element={<CaseStudies />} />
      <Route path="/case-study/write-your-book" element={lazyRoute(<CaseStudyWriteYourBook />)} />
      <Route path="/case-study/growapp" element={lazyRoute(<CaseStudyGrowapp />)} />
      <Route path="/case-study/zembra" element={<CaseStudyZembra />} />
      <Route path="/case-study/pubrella" element={<CaseStudyPubrella />} />
      <Route path="/case-study/shipzzer" element={<CaseStudyShipzzer />} />
      <Route path="/case-study/screenplay" element={lazyRoute(<CaseStudyScreenplay />)} />
      <Route path="/case-study/bottlenexus" element={lazyRoute(<CaseStudyBottlenexus />)} />
      <Route path="/case-study/ic-center" element={lazyRoute(<CaseStudyICCenter />)} />
      <Route path="/creative/community-management" element={lazyRoute(<CommunityManagement />)} />
      <Route path="/services/landing-page" element={<LandingPageConversion />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogArticle />} />
      <Route path="/pricing" element={lazyRoute(<Pricing />)} />
      <Route path="/resume" element={lazyRoute(<Resume />)} />
      <Route path="/book" element={<Book />} />
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
