import { Link } from "react-router-dom";
import type { MagazineTab } from "@/content/blog/magazine";

const TABS: { key: MagazineTab | "teardowns"; label: string; to: string }[] = [
  { key: "latest", label: "Latest", to: "/blog" },
  { key: "news", label: "AI News", to: "/blog?type=news" },
  { key: "guides", label: "Guides", to: "/blog?type=guides" },
  { key: "teardowns", label: "Teardowns", to: "/cro-teardowns" },
];

const MagazineTabs = ({ active }: { active: MagazineTab }) => (
  <nav aria-label="Blog sections" className="overflow-x-auto border-b border-border-light">
    <ul className="m-0 flex list-none gap-7 p-0 font-mono text-[12px] uppercase tracking-[0.08em]">
      {TABS.map((tab) => {
        const on = tab.key === active;
        return (
          <li key={tab.key} className="shrink-0">
            <Link
              to={tab.to}
              aria-current={on ? "page" : undefined}
              className={`block border-b-2 pb-3 pt-1 transition-colors focus-visible:bg-primary/10 focus-visible:text-primary focus-visible:outline-none ${
                on ? "border-primary text-heading-light" : "border-transparent text-body-light hover:text-heading-light"
              }`}
            >
              {tab.label}
            </Link>
          </li>
        );
      })}
    </ul>
  </nav>
);

export default MagazineTabs;
