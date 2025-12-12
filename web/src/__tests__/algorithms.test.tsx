import { describe, expect, it } from "vitest";
import { algorithms, getAlgorithm } from "@/lib/algorithms";

describe("algorithms data", () => {
  it("has unique slugs and ids", () => {
    const slugs = new Set<string>();
    const ids = new Set<string>();
    for (const algo of algorithms) {
      expect(slugs.has(algo.slug)).toBe(false);
      expect(ids.has(algo.id)).toBe(false);
      slugs.add(algo.slug);
      ids.add(algo.id);
    }
  });

  it("getAlgorithm returns matching item", () => {
    const sample = algorithms[0];
    expect(getAlgorithm(sample.slug)).toBe(sample);
    expect(getAlgorithm("non-existent")).toBeUndefined();
  });
});
