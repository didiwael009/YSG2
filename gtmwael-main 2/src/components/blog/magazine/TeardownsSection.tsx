import type { CroTeardownPost } from "@/content/cro-teardown/types";
import { sortTeardowns, toCard } from "@/content/blog/magazine";
import { Card, SectionHead } from "./shared";

/** 6 newest teardowns, link to the full list. */
const TeardownsSection = ({ teardowns }: { teardowns: CroTeardownPost[] }) => (
  <section className="pt-16">
    <SectionHead title="Teardowns" pill={`All ${teardowns.length}`} to="/cro-teardowns" />
    <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {sortTeardowns(teardowns)
        .slice(0, 6)
        .map(toCard)
        .map((card) => (
          <Card key={card.href} card={card} />
        ))}
    </div>
  </section>
);

export default TeardownsSection;
