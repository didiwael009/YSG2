import { Link } from "react-router-dom";
import type { CardRef } from "@/content/blog/magazine";
import { Card, FOCUS, Kicker, SectionHead } from "./shared";

/** 3 guide cards, then every other guide as a text link so each keeps its link from /blog. */
const GuidesSection = ({ guides }: { guides: CardRef[] }) => {
  if (guides.length === 0) return null;
  const [cards, rest] = [guides.slice(0, 3), guides.slice(3)];
  return (
    <section className="pt-16">
      <SectionHead title="Guides" pill="See all" to="/blog?type=guides" />
      <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Card key={card.href} card={card} />
        ))}
      </div>
      {rest.length > 0 ? (
        <ul className="m-0 mt-10 grid list-none gap-x-8 gap-y-6 border-t border-border-light p-0 pt-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((card) => (
            <li key={card.href}>
              <Link to={card.href} className={`group block ${FOCUS}`}>
                <Kicker>{card.label}</Kicker>
                <span className="mt-1 block font-serif text-[17px] font-medium leading-snug text-heading-light group-hover:text-primary">
                  {card.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
};

export default GuidesSection;
