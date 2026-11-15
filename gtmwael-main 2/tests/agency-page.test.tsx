import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import Agency from "@/pages/Agency";

const html = renderToString(<MemoryRouter initialEntries={["/agency"]}><Agency /></MemoryRouter>)
  .replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&");

describe("/agency page", () => {
  it("shows the headline and the three people", () => {
    for (const s of ["We create.", "I scale it.", "Three designers.", "Designer, automation", "Design graduate.", "Sirine Aouididi", "Fedi Amami", "Wael Aouididi"]) expect(html).toContain(s);
  });
  it("does not cut Wael down to automation only", () => {
    for (const s of ["They create.", "I automate.", "Two creatives."]) expect(html).not.toContain(s);
  });
  it("links to /book", () => {
    expect(html).toContain('href="/book"');
  });
  it("opens external links in a new tab, safely", () => {
    const external = [...html.matchAll(/<a [^>]*href="https?:[^"]*"[^>]*>/g)].map((m) => m[0]);
    expect(external.length).toBeGreaterThan(0);
    for (const a of external) {
      expect(a).toContain('target="_blank"');
      expect(a).toContain('rel="noopener noreferrer"');
    }
  });
  it("gives every image an alt attribute", () => {
    for (const img of html.match(/<img [^>]*>/g) ?? []) expect(img).toMatch(/ alt="/);
  });
  it("shows Pilau and Fedi's four Behance projects", () => {
    expect(html).toContain("Swimwear");
    for (const id of ["46196185", "46196829", "95050249", "47905535"]) expect(html).toContain(`behance.net/gallery/${id}/`);
  });
  it("shows the automation proof and the three steps", () => {
    for (const s of ["One system.", "134 posts.", "01", "02", "03", "We set the look", "I build the system", "Content ships at volume", "Get the look. Then the volume."]) expect(html).toContain(s);
    expect(html.match(/href="\/book"/g)?.length ?? 0).toBeGreaterThanOrEqual(2);
  });
  it("keeps pill links at least 44px tall and clears the fixed nav", () => {
    const main = html.slice(html.indexOf("<main"), html.indexOf("</main>"));
    const pills = [...main.matchAll(/<a [^>]*class="[^"]*rounded-full[^"]*"[^>]*>/g)].map((m) => m[0]);
    expect(pills.length).toBeGreaterThanOrEqual(5);
    for (const a of pills) expect(a).toMatch(/min-h-\[(44|52)px\]/);
    expect(main).toMatch(/<section id="top"[^>]*class="[^"]*\bpt-28\b/);
  });
  it("hides the site footer's generic CTA, the page has its own", () => {
    expect(html).not.toContain("Ready to");
  });
  it("gives the hero, team and work sections real side padding", () => {
    for (const id of ["top", "team", "work"]) {
      const tag = html.match(new RegExp(`<section id="${id}"[^>]*>\\s*(<div[^>]*>)?`))?.[0] ?? "";
      expect(tag, id).toMatch(/sm:px-10/);
      expect(tag, id).not.toMatch(/\bpx-4\b/);
    }
  });
  it("shows Fedi's photo", () => {
    expect(html).toMatch(/<img [^>]*src="[^"]*fedi-portrait[^"]*"[^>]*alt="Fedi Amami"/);
  });
  it("shows Wael's own selected projects, internal ones as site links", () => {
    const work = html.slice(html.indexOf('<section id="work"'));
    expect(work).toContain("Wael Aouididi");
    for (const s of ["SambaLingo", "InTheLoop", "Pubrella"]) expect(work).toContain(s);
    for (const href of ["/content-automation", "/case-study/pubrella"]) expect(work).toMatch(new RegExp(`<a [^>]*href="${href}"`));
    expect(work).not.toMatch(/<a [^>]*href="\/(content-automation|case-study\/pubrella)"[^>]*target="_blank"/);
  });
  it("has no em-dash", () => {
    expect(html).not.toContain("—");
  });
});
