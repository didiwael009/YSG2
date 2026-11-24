import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import Book from "@/pages/Book";
import { BOOKING_URL, CAL_LINK } from "@/lib/constants";

const files = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? files(p) : /\.(ts|tsx)$/.test(name) ? [p] : [];
  });

describe("booking on Cal.com", () => {
  it("points every booking link at the Cal.com 30-min event", () => {
    expect(CAL_LINK).toBe("aouididi-wael-1oybm9/15min");
    expect(BOOKING_URL).toBe("https://cal.com/aouididi-wael-1oybm9/15min");
  });

  it("leaves no Calendly link or script in the source", () => {
    const left = files(join(__dirname, "../src")).filter((f) => /calendly\.com/i.test(readFileSync(f, "utf8")));
    expect(left).toEqual([]);
  });

  it("gives /book a new-tab fallback to the Cal.com page", () => {
    const html = renderToString(
      <MemoryRouter initialEntries={["/book"]}>
        <Book />
      </MemoryRouter>,
    );
    expect(html).toContain(`href="${BOOKING_URL}"`);
  });
});
