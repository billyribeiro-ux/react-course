import { describe, it, expect } from "vitest";
import { newProjectSchema } from "./schemas";

describe("newProjectSchema", () => {
  it("rejects an empty name", () => {
    expect(newProjectSchema.safeParse({ name: "", budget: 0 }).success).toBe(false);
  });

  it("rejects a negative budget", () => {
    expect(newProjectSchema.safeParse({ name: "X", budget: -5 }).success).toBe(false);
  });

  it("coerces a string budget (as FormData sends it) and accepts valid input", () => {
    const result = newProjectSchema.safeParse({ name: "X", budget: "100" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.budget).toBe(100);
  });
});
