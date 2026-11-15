import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import C2Services from "@/components/creative2/C2Services";
import C2Experience from "@/components/creative2/C2Experience";
import { CREATIVE2_COPY } from "@/content/creative2";

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
});
