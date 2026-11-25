import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import C2Services from "@/components/creative2/C2Services";
import C2Experience from "@/components/creative2/C2Experience";
import C2Work from "@/components/creative2/C2Work";
import C2Testimonials from "@/components/creative2/C2Testimonials";
import C2Process from "@/components/creative2/C2Process";
import { CREATIVE2_COPY } from "@/content/creative2";
import { videoProjects } from "@/lib/video-data";
import { rebrandingProjects } from "@/lib/rebrand-data";
import { adSamples, postSamples, appSamples } from "@/lib/creative-samples";

const render = (el: JSX.Element) => renderToString(<MemoryRouter>{el}</MemoryRouter>);

describe("creative-2 sections", () => {
  it("services lists the 4 creative services", () => {
    const html = render(<C2Services />);
    expect(CREATIVE2_COPY.services).toHaveLength(4);
    for (const s of CREATIVE2_COPY.services) expect(html).toContain(s.title);
    expect(html).toContain('id="services"');
  });
  it("experience keeps the homepage id", () => {
    const html = render(<C2Experience />);
    expect(html).toContain('id="experience"');
    expect(html).toContain('aria-labelledby="experience-title"');
  });
  it("work shows every real project", () => {
    const html = render(<C2Work />);
    expect(videoProjects).toHaveLength(3);
    expect(rebrandingProjects).toHaveLength(5);
    for (const v of videoProjects) expect(html).toContain(v.title);
    for (const r of rebrandingProjects) expect(html).toContain(r.title);
    expect(html).toContain('id="creative-workflow"');
  });
  it("work shows the ads, the posts and the apps, each linked to its source", () => {
    const html = render(<C2Work />);
    expect(adSamples).toHaveLength(9);
    expect(postSamples).toHaveLength(6);
    for (const s of [...adSamples, ...postSamples]) {
      expect(html).toContain(`src="${s.src}"`);
      expect(s.alt.length).toBeGreaterThan(10);
    }
    expect(html).toContain('href="https://www.behance.net/gallery/234607371/Saas-B2B-Content-Creation"');
    expect(html).toContain('href="https://www.behance.net/gallery/219845367/Social-Media-contents"');
    expect(appSamples.map((a) => a.name)).toEqual(["GymVoice", "SambaLingo"]);
    for (const a of appSamples) {
      expect(html).toContain(a.name);
      expect(html).toContain(`src="${a.icon}"`);
      for (const sc of a.screens) expect(html).toContain(`src="${sc.src}"`);
    }
    expect(html).toContain('href="https://sambalingo.app"');
    expect(html).not.toContain("on the way");
  });
  it("work keeps the look-alike brand pages apart", () => {
    const html = render(<C2Work />);
    const brands = html.slice(html.indexOf('id="c2-brands-title"'));
    const at = (t: string) => brands.indexOf(`>${t}<`);
    const order = ["Pubrella", "Shipzzer", "Zembra", "BottleNexus", "Clarrio.ai"];
    for (const t of order) expect(at(t)).toBeGreaterThan(-1);
    expect(order.map(at)).toEqual([...order.map(at)].sort((a, b) => a - b));
  });
  it("testimonials keep the homepage id", () => {
    const html = render(<C2Testimonials />);
    expect(html).toContain('id="proof"');
    for (const t of CREATIVE2_COPY.testimonials.items) expect(html).toContain(t.name);
  });
  it("process ends on the booking link", () => {
    const html = render(<C2Process />);
    expect(html).toContain('id="how-it-works"');
    expect(html).toContain("cal.com/aouididi-wael-1oybm9/15min");
  });
});
