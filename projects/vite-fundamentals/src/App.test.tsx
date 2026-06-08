import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App.tsx";

// Integration tests for the reference Recipe Finder — behaviour, not
// implementation (Part A0). The local api resolves quickly so findBy works.
describe("Recipe Finder", () => {
  it("loads and shows recipes", async () => {
    render(<App />);
    expect(screen.getByText(/loading recipes/i)).toBeInTheDocument();
    expect(await screen.findByText("Margherita Pizza")).toBeInTheDocument();
  });

  it("filters recipes by the search box", async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByText("Margherita Pizza");

    await user.type(screen.getByLabelText(/search recipes/i), "soup");

    expect(screen.getByText("Miso Soup")).toBeInTheDocument();
    expect(screen.queryByText("Margherita Pizza")).not.toBeInTheDocument();
  });

  it("toggles a favorite and can filter to favorites only", async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByText("Miso Soup");

    // Favorite the first recipe (getAllByRole throws if none, so [0] exists).
    const [firstFav] = screen.getAllByRole("button", { name: /favorite/i });
    await user.click(firstFav!);

    await user.click(screen.getByLabelText(/favorites only/i));
    // Exactly one card remains (the favorited one).
    expect(screen.getAllByRole("button", { name: /favorited/i })).toHaveLength(1);
  });

  it("shows an empty state when nothing matches", async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByText("Margherita Pizza");
    await user.type(screen.getByLabelText(/search recipes/i), "zzzzz");
    expect(screen.getByText(/no recipes match/i)).toBeInTheDocument();
  });
});
