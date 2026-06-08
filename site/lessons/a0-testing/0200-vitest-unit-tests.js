/* Lesson a0-testing/0200 — Vitest setup & unit tests. */
registerLesson({
  meta: {
    id: "a0-testing/0200-vitest-unit-tests",
    title: "Vitest Setup & Unit Tests",
    part: "a0-testing",
    estMinutes: 15,
    level: "advanced",
    project: "vite-fundamentals",
    lede: "Vitest is the modern test runner — Vite-native, fast, and with a Jest-compatible API. Set it up and write your first unit tests for pure logic, the foundation of the testing trophy.",
    objectives: [
      "Set up Vitest in a Vite project",
      "Write and run unit tests",
      "Use describe, it/test, and expect",
      "Master the assertion API",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Why Vitest</h2>
      <p>
        <strong>Vitest</strong> is the standard test runner for Vite projects in 2026: it reuses your Vite config and
        transforms (so tests run exactly like your app), starts in milliseconds, runs tests in parallel, and has an
        API nearly identical to Jest (the previous standard). It's dramatically faster than Jest and needs almost no
        configuration.
      </p>

      ${h.codePane({
        lang: "ts",
        title: "vitest.config.ts",
        readOnly: true,
        code: `import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",          // a DOM for component tests
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
  },
});`,
      })}

      <h2>Your first unit test</h2>
      <p>Unit tests verify a piece of logic in isolation. Test files end in <code>.test.ts</code> or
      <code>.spec.ts</code>:</p>

      ${h.codePane({
        lang: "ts",
        title: "formatPrice.test.ts",
        readOnly: true,
        code: `import { describe, it, expect } from "vitest";
import { formatPrice } from "./formatPrice";

describe("formatPrice", () => {
  it("formats whole dollars", () => {
    expect(formatPrice(1000)).toBe("$10.00"); // cents → dollars
  });

  it("handles zero", () => {
    expect(formatPrice(0)).toBe("$0.00");
  });

  it("rounds correctly", () => {
    expect(formatPrice(1599)).toBe("$15.99");
  });
});
// Run with: pnpm test`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Pure functions are a joy to test",
        body: `<p>Notice how easy this is — because <code>formatPrice</code> is a <strong>pure function</strong> (Part
        10): same input → same output, no side effects. Pure functions need no setup, no mocking, no DOM; you just
        assert input→output. This is a big reason to extract complex logic into pure functions: they become trivially
        testable. When testing something is hard, it's often a signal the code is doing too much or is too entangled —
        testability and good design reinforce each other.</p>`,
      })}

      <h2>The assertion API</h2>
      ${h.codePane({
        lang: "ts",
        title: "Common matchers",
        readOnly: true,
        code: `expect(value).toBe(3);                  // strict equality (===)
expect(obj).toEqual({ a: 1 });          // deep equality
expect(arr).toContain("x");
expect(value).toBeTruthy();             // / toBeFalsy / toBeNull / toBeUndefined
expect(fn).toThrow("error message");
expect(value).toBeGreaterThan(2);
expect(mockFn).toHaveBeenCalledWith(1, 2);
// Async: await expect(promise).resolves.toBe(...) / .rejects.toThrow(...)`,
      })}

      ${h.callout({
        kind: "tip",
        title: "Arrange, Act, Assert",
        body: `<p>Structure tests in three phases: <strong>Arrange</strong> (set up inputs/state), <strong>Act</strong>
        (run the thing), <strong>Assert</strong> (check the result). Keep each test focused on <em>one</em> behavior
        with a clear name describing what it verifies. A test name should read like a sentence: "formats whole
        dollars," "throws when the amount is negative." Good names make a failing test self-explanatory.</p>`,
      })}

      ${h.exercise({
        title: "Unit-test real logic",
        prompt: `<p>In <code>vite-fundamentals</code>, pick some pure logic (a price/tip calculator, a slug
        generator, a filter/sort function from your Recipe Finder) and write a <code>.test.ts</code> with several
        cases including edge cases (empty input, zero, boundaries). Run <code>pnpm --filter vite-fundamentals
        test</code> and watch them pass. Then deliberately break the function and watch the test catch it — that's
        the safety net working.</p>`,
        runHint: "pnpm --filter vite-fundamentals test",
      })}
    </section>
  `,
});
