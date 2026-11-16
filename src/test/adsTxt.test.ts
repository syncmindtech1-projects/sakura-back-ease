import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("AdSense publisher authorization", () => {
  it("contains only the authorized publisher record", () => {
    const contents = readFileSync("public/ads.txt", "utf8");
    expect(contents).toBe("google.com, pub-4419312922428541, DIRECT, f08c47fec0942fa0");
  });

  it("excludes ads.txt from the HTML fallback while retaining page routing", () => {
    const config = JSON.parse(readFileSync("vercel.json", "utf8"));
    const fallback = new RegExp(`^${config.rewrites[0].source}$`);
    expect(fallback.test("/ads.txt")).toBe(false);
    expect(fallback.test("/jobs/123")).toBe(true);
    expect(config.headers[0].headers).toContainEqual({ key: "Content-Type", value: "text/plain" });
  });
});