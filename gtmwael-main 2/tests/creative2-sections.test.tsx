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
  it("testimonials keep the homepage id", () => {
    const html = render(<C2Testimonials />);
    expect(html).toContain('id="proof"');
    for (const t of CREATIVE2_COPY.testimonials.items) expect(html).toContain(t.name);
  });
  it("process ends on the booking link", () => {
    const html = render(<C2Process />);
    expect(html).toContain('id="how-it-works"');
    expect(html).toContain("cal.com/aouididi-wael-4jw03z/30min");
  });
});
