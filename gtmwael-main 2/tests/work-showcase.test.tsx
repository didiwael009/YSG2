import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import SaasMarketingAgency from "@/pages/SaasMarketingAgency";
import Creative from "@/pages/Creative";
import { ADS_URL, adSamples } from "@/lib/creative-samples";
import { rebrandingProjects } from "@/lib/rebrand-data";

const render = (path: string, page: JSX.Element) =>
  renderToString(<MemoryRouter initialEntries={[path]}>{page}</MemoryRouter>);

describe("work showcase on the agency page and the Folio", () => {
  it("agency page shows every SaaS ad and links the Behance gallery", () => {
    const html = render("/saas-marketing-agency", <SaasMarketingAgency />);
    for (const ad of adSamples) expect(html).toContain(`src="${ad.src}"`);
    expect(html).toContain(`href="${ADS_URL}"`);
  });

  it("agency page shows the 5 landing pages with their links", () => {
    const html = render("/saas-marketing-agency", <SaasMarketingAgency />);
    for (const p of rebrandingProjects) {
      expect(html).toContain(`>${p.title}<`);
      expect(html).toContain(`href="${p.link}"`);
    }
  });

  it("agency page keeps the look-alike landing pages apart", () => {
    const html = render("/saas-marketing-agency", <SaasMarketingAgency />);
    const pages = html.slice(html.indexOf('id="agency-pages-title"'));
    const order = ["Pubrella", "Zembra", "Shipzzer", "BottleNexus", "Clarrio.ai"];
    const at = order.map((t) => pages.indexOf(`>${t}<`));
    for (const i of at) expect(i).toBeGreaterThan(-1);
    expect(at).toEqual([...at].sort((a, b) => a - b));
  });

  it("Folio shows every SaaS ad and links the Behance gallery", () => {
    const html = render("/creative", <Creative />);
    for (const ad of adSamples) expect(html).toContain(`src="${ad.src}"`);
    expect(html).toContain(`href="${ADS_URL}"`);
  });
});
