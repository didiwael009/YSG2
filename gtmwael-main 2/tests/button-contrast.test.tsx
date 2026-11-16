import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { renderToString } from "react-dom/server";
import { Button } from "@/components/ui/button";

describe("filled orange buttons pass WCAG AA with white text", () => {
  it("defines a darker button orange in both themes", () => {
    const css = readFileSync("src/index.css", "utf8");
    expect(css.match(/--primary-button: 16 90% 42%;/g)).toHaveLength(2);
  });

  it("keeps the text orange unchanged", () => {
    const css = readFileSync("src/index.css", "utf8");
    expect(css).toContain("--primary: 16 90% 50%;");
  });

  it.each(["default", "hero"] as const)("%s variant fills with the darker orange", (variant) => {
    const html = renderToString(<Button variant={variant}>Book a Call</Button>);
    expect(html).toContain("bg-primary-button");
    expect(html).not.toMatch(/(^|\s|")bg-primary(\s|")/);
  });
});
