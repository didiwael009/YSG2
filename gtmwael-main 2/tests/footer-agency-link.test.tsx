import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import Footer from "@/components/Footer";

describe("site footer", () => {
  it("links to the /agency page", () => {
    const html = renderToString(<MemoryRouter><Footer /></MemoryRouter>);
    expect(html).toMatch(/<a [^>]*href="\/agency"[^>]*>Creative Team<\/a>/);
  });
});
