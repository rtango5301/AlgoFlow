import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AlgorithmList } from "@/components/AlgorithmList";
import { AlgorithmPlayer } from "@/components/AlgorithmPlayer";
import { Visualizer } from "@/components/Visualizer";
import { CodeTabs } from "@/components/CodeTabs";
import { algorithms } from "@/lib/algorithms";

describe("AlgorithmList", () => {
  it("renders algorithm cards", () => {
    render(<AlgorithmList algorithms={algorithms.filter((a) => a.category === "Sorting")} />);
    expect(screen.getByText("Bubble Sort")).toBeInTheDocument();
    expect(screen.getByText("Insertion Sort")).toBeInTheDocument();
    expect(screen.getByText("Selection Sort")).toBeInTheDocument();
    expect(screen.getByText("Merge Sort")).toBeInTheDocument();
  });
});

describe("AlgorithmPlayer", () => {
  it("steps through an algorithm and highlights pseudocode", async () => {
    const algo = algorithms.find((a) => a.slug === "bubble-sort")!;
    render(<AlgorithmPlayer algorithm={algo} />);

    expect(screen.getAllByText(/Step 1/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Start/)).toBeInTheDocument();

    await userEvent.click(screen.getByText(/Next/));
    expect(screen.getByText(/Compare first pair/)).toBeInTheDocument();

    const nextButton = screen.getByRole("button", { name: /Next/ });
    for (let i = 0; i < 5; i++) {
      await userEvent.click(nextButton);
    }
    expect(screen.getByText(/Next pass/)).toBeInTheDocument();
  });
});

describe("Visualizer", () => {
  it("displays array values and pointers", () => {
    const step = algorithms[0].steps[0];
    render(<Visualizer step={step} totalSteps={algorithms[0].steps.length} index={0} />);
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("i")).toBeInTheDocument();
  });
});

describe("CodeTabs", () => {
  it("switches between language tabs", async () => {
    render(
      <CodeTabs
        samples={[
          { language: "TS", snippet: "const a = 1;" },
          { language: "Python", snippet: "a = 1" },
        ]}
      />,
    );
    expect(screen.getByText("const a = 1;")).toBeInTheDocument();
    await userEvent.click(screen.getByText("Python"));
    expect(screen.getByText("a = 1")).toBeInTheDocument();
  });
});
