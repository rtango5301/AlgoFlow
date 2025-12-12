import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import AlgorithmPage, { generateStaticParams } from "@/app/algorithms/[slug]/page";

describe("AlgorithmPage", () => {
  it("generates static params for slugs", async () => {
    const params = await generateStaticParams();
    expect(params).toEqual(
      expect.arrayContaining([expect.objectContaining({ slug: "bubble-sort" })]),
    );
  });

  it("renders algorithm detail for valid slug", async () => {
    const element = await AlgorithmPage({ params: Promise.resolve({ slug: "bubble-sort" }) });
    render(element);
    expect(screen.getByText(/Bubble Sort/)).toBeInTheDocument();
    expect(screen.getAllByText(/Step/i).length).toBeGreaterThan(0);
  });

  it("throws notFound for invalid slug", async () => {
    await expect(
      AlgorithmPage({ params: Promise.resolve({ slug: "does-not-exist" }) }),
    ).rejects.toThrow("NOT_FOUND");
  });
});
