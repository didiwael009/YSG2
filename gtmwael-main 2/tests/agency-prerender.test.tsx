import { describe, it, expect } from "vitest";
// @ts-expect-error plain .mjs build constants, no types
import { prerenderRoutePaths } from "../scripts/seo/constants.mjs";
import { render } from "@/entry-prerender";

describe("/agency prerender", () => {
  it("is prerendered like the other noindex pages", () => {
    expect(prerenderRoutePaths).toContain("/agency");
  });
  it("renders the real page on the server, not a fallback", async () => {
    // Same as scripts/seo/build-blog-html.mjs: the first render lets React.lazy resolve.
    render("/agency");
    await new Promise((r) => setTimeout(r, 400));
    const html = render("/agency");
    expect(html).toContain("We create.");
    expect(html).toContain("Sirine Aouididi");
  });
});
