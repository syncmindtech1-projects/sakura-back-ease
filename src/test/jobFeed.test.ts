import { describe, it, expect } from "vitest";
import { timeAgo, stripHtml } from "@/hooks/useJobFeed";
describe("job feed helpers", () => {
  it("shows '2 days ago'", () => { const now = Date.parse("2026-11-05T12:00:00Z"); expect(timeAgo("2026-11-03T11:00:00Z", now)).toBe("2 days ago"); });
  it("strips HTML tags", () => { expect(stripHtml("<p>Hello <b>world</b></p>")).toBe("Hello world"); });
});
