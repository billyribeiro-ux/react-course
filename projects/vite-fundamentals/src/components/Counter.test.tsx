import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Counter } from "./Counter.tsx";

// Tests describe BEHAVIOR from the user's perspective — find elements the way
// a user (or screen reader) would, interact, and assert on what they'd see.
describe("Counter", () => {
  it("renders the starting count", () => {
    render(<Counter start={3} />);
    expect(screen.getByText("Count: 3")).toBeInTheDocument();
  });

  it("increments when the button is clicked", async () => {
    const user = userEvent.setup();
    render(<Counter />);

    expect(screen.getByText("Count: 0")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /increment/i }));
    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });
});
