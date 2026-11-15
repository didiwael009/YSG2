import { describe, it, expect } from "vitest";
import * as agency from "@/content/agency";

const allStrings = (v: unknown): string[] =>
  typeof v === "string" ? [v] : Array.isArray(v) ? v.flatMap(allStrings)
  : v && typeof v === "object" ? Object.values(v).flatMap(allStrings) : [];

describe("agency content", () => {
  const text = allStrings(agency);
  it("has no em-dash and no bold markup", () => {
    for (const s of text) {
      expect(s).not.toContain("—");
      expect(s).not.toMatch(/\*\*|<b>|<strong>/);
    }
  });
  it("lists the three people in order", () => {
    expect(agency.AGENCY_TEAM.people.map((p) => p.name)).toEqual(["Sirine Aouididi", "Fedi Amami", "Wael Aouididi"]);
  });
  it("links each collaborator to their public portfolio", () => {
    const [sirine, fedi] = agency.AGENCY_TEAM.people;
    expect(sirine.link.href).toBe("https://www.figma.com/proto/UHJGcTDg637GiBYmO06m9b/portfolio");
    expect(fedi.link.href).toBe("https://www.behance.net/amamifedi");
  });
  it("has Fedi's four Behance projects", () => {
    expect(agency.AGENCY_WORK.fediProjects.map((p) => p.href)).toEqual([
      "https://www.behance.net/gallery/46196185/Ooredoo-Tunisie-Social-Media",
      "https://www.behance.net/gallery/46196829/Tunisair",
      "https://www.behance.net/gallery/95050249/Rebranding-ABIDA",
      "https://www.behance.net/gallery/47905535/Kitkat-The-game",
    ]);
  });
  it("has three steps", () => {
    expect(agency.AGENCY_PROCESS.steps).toHaveLength(3);
  });
});
