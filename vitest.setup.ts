import "@testing-library/jest-dom";
import { vi } from "vitest";
import React from "react";

// Simple mocks for Next components used in tests
vi.mock("next/link", () => {
  return {
    default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) =>
      React.createElement("a", { href, ...props }, children),
  };
});

vi.mock("next/navigation", () => {
  return {
    notFound: () => {
      throw new Error("NOT_FOUND");
    },
  };
});
