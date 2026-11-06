import { Link } from "react-router-dom";
import type { CardRef } from "@/content/blog/magazine";
import { Card, FOCUS, Kicker, SectionHead } from "./shared";

/** AI News on the home: 3 cards, then up to 3 text items. Hidden when there is no news. */
const NewsSection = ({ items }: { items: CardRef[] }) => {
  if (items.length === 0) return null;
  const [cards, textOnly] = [items.slice(0, 3), items.slice(3, 6)];
  return (
    <section className="pt-16">
      <SectionHead title="AI News" pill="See all" to="/blog?type=news" />
      <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((item) => (
          <Card key={item.href} card={item} />
        ))}
      </div>
      {textOnly.length > 0 ? (
        <div className="mt-10 grid gap-x-8 gap-y-6 border-t border-border-light pt-6 sm:grid-cols-2 lg:grid-cols-3">
          {textOnly.map((item) => (
            <Link key={item.href} to={item.href} className={`group block ${FOCUS}`}>
              <Kicker>{item.label}</Kicker>
              <h3 className="mt-1 font-serif text-[17px] font-medium leading-snug text-heading-light group-hover:text-primary">
                {item.title}
              </h3>
            </Link>
          ))}
        </div>
      ) : null}
    </section>
  );
};

export default NewsSection;
