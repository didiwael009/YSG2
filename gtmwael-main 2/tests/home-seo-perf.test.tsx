import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { AppRoutes } from "@/App";
import standingBw480 from "@/assets/wael-standing-bw-480.webp";
import standingColor480 from "@/assets/wael-standing-color-480.webp";

const home = () => renderToString(<MemoryRouter initialEntries={["/"]}><AppRoutes /></MemoryRouter>);
const heroImgs = (html: string) => html.match(/<img[^>]*wael-standing[^>]*>/g) ?? [];

describe("homepage technical SEO and speed", () => {
  it("has exactly one h1", () => {
    expect(home().match(/<h1[\s>]/g)?.length).toBe(1);
  });

  it("gives the skip link a #main target", () => {
    expect(home()).toMatch(/<main[^>]*id="main"/);
  });

  it("serves the hero photos responsively, at high priority", () => {
    const imgs = heroImgs(home());
    expect(imgs).toHaveLength(2);
    for (const img of imgs) {
      expect(img).toMatch(/srcSet="[^"]*480w[^"]*840w"/i);
      expect(img).toContain('sizes="(min-width: 1024px) 420px, (min-width: 768px) 288px, 256px"');
      expect(img).toContain('fetchpriority="high"');
    }
    expect(imgs.join(" ")).toContain(standingBw480);
    expect(imgs.join(" ")).toContain(standingColor480);
  });

  it("loads the creative hero fonts from index.html, not after hydration", () => {
    const indexHtml = readFileSync("index.html", "utf8");
    expect(indexHtml).toContain("family=Newsreader:ital,wght@1,500");
    expect(indexHtml).toMatch(/family=Inter:wght@[\d;]*800/);
  });

  it("keeps the footer legal line at full muted contrast", () => {
    expect(home()).not.toContain("text-muted-foreground/60");
  });
});
