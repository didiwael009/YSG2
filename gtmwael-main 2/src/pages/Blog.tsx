import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { blogPosts } from "@/content/blog";
import { croTeardownPosts } from "@/content/cro-teardown";
import {
  getAllGuideCards,
  getLeadGuide,
  getNewsItems,
  parseTab,
  type MagazineTab,
} from "@/content/blog/magazine";
import { ProfileBand } from "@/components/blog/WaelProfile";
import MagazineTabs from "@/components/blog/magazine/MagazineTabs";
import LeadBand from "@/components/blog/magazine/LeadBand";
import NewsSection from "@/components/blog/magazine/NewsSection";
import TeardownsSection from "@/components/blog/magazine/TeardownsSection";
import GuidesSection from "@/components/blog/magazine/GuidesSection";
import { BLOG_CONTAINER, Card, FOCUS, Kicker, formatShortDate } from "@/components/blog/magazine/shared";

const NewsList = () => {
  const items = getNewsItems(blogPosts);
  if (items.length === 0) {
    return <p className="py-10 font-serif text-lg text-body-light">No AI News issue yet.</p>;
  }
  return (
    <ul className="m-0 list-none p-0">
      {items.map((item) => (
        <li key={item.href} className="border-b border-border-light py-5">
          <Kicker>{`${item.label} · ${formatShortDate(item.date)}`}</Kicker>
          <Link to={item.href} className={`mt-1 block font-serif text-[22px] font-medium leading-snug text-heading-light hover:text-primary ${FOCUS}`}>
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const GuidesGrid = () => (
  <div className="grid gap-x-8 gap-y-10 py-10 sm:grid-cols-2 lg:grid-cols-3">
    {getAllGuideCards(blogPosts).map((card) => (
      <Card key={card.href} card={card} />
    ))}
  </div>
);

const Blog = () => {
  const [searchParams] = useSearchParams();
  // The prerendered HTML is always the Latest view; the tab is read after hydration so both renders match.
  const [tab, setTab] = useState<MagazineTab>("latest");
  useEffect(() => setTab(parseTab(searchParams.get("type"))), [searchParams]);

  const lead = getLeadGuide(blogPosts);
  const guides = getAllGuideCards(blogPosts).filter((card) => card.href !== lead?.path);

  return (
    <div className="min-h-screen bg-background-light">
      <Navigation variant="blog" />
      <main className="pb-20">
        <div className={`${BLOG_CONTAINER} pt-24 md:pt-28`}>
          <h1 className="mb-5 font-serif text-[26px] font-medium leading-tight text-heading-light md:text-[30px]">
            Growth, AI and Content Blog
          </h1>
          <MagazineTabs active={tab} />

          {tab === "latest" ? (
            <>
              <div className="pt-10">
                <LeadBand posts={blogPosts} teardowns={croTeardownPosts} />
              </div>
              <NewsSection items={getNewsItems(blogPosts)} />
              <TeardownsSection teardowns={croTeardownPosts} />
              <GuidesSection guides={guides} />
            </>
          ) : tab === "news" ? (
            <NewsList />
          ) : (
            <GuidesGrid />
          )}
        </div>
      </main>
      <ProfileBand />
      <div className="bg-background text-foreground">
        <Footer />
      </div>
    </div>
  );
};

export default Blog;
