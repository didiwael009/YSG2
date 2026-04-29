import { renderToString } from "react-dom/server";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Book from "@/pages/Book";
import Blog from "@/pages/Blog";
import BlogArticle from "@/pages/BlogArticle";
import CaseStudies from "@/pages/CaseStudies";
import CaseStudyPubrella from "@/pages/CaseStudyPubrella";
import CaseStudyShipzzer from "@/pages/CaseStudyShipzzer";
import CaseStudyZembra from "@/pages/CaseStudyZembra";
import ColdEmail from "@/pages/ColdEmail";
import Index from "@/pages/Index";
import LandingPageConversion from "@/pages/LandingPageConversion";

export const render = (path: string) =>
  renderToString(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogArticle />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/case-study/shipzzer" element={<CaseStudyShipzzer />} />
        <Route path="/case-study/zembra" element={<CaseStudyZembra />} />
        <Route path="/case-study/pubrella" element={<CaseStudyPubrella />} />
        <Route path="/services/landing-page" element={<LandingPageConversion />} />
        <Route path="/services/cold-email" element={<ColdEmail />} />
        <Route path="/book" element={<Book />} />
      </Routes>
    </MemoryRouter>
  );
