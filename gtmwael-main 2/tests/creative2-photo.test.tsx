import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import SliderHero from "@/components/creative2/SliderHero";
import standingBw from "@/assets/wael-standing-bw.webp";
import standingColor from "@/assets/wael-standing-color.webp";

const layerImg = (html: string, layer: "saas" | "creative") => {
  const part = layer === "saas" ? html.split('data-layer="creative"')[0] : html.split('data-layer="creative"')[1];
  return part.match(/<img[^>]*src="([^"]*wael[^"]*)"/)?.[1];
};

describe("creative-2 hero photo", () => {
  it("shows the same standing pose, in colour on the SaaS side and in black and white on the creative side", () => {
    const html = renderToString(<MemoryRouter><SliderHero /></MemoryRouter>);
    expect(layerImg(html, "saas")).toBe(standingColor);
    expect(layerImg(html, "creative")).toBe(standingBw);
  });
  it("draws the halftone halos from the black and white photo's outline", () => {
    const html = renderToString(<MemoryRouter><SliderHero /></MemoryRouter>);
    expect(html.split('data-layer="creative"')[1]).toContain(`url(${standingBw}) center bottom/contain`);
  });
});
