/* Lesson a0-testing/0300 — Testing pure logic & custom hooks. */
registerLesson({
  meta: {
    id: "a0-testing/0300-testing-hooks",
    title: "Testing Custom Hooks & Reducers",
    part: "a0-testing",
    estMinutes: 13,
    level: "advanced",
    project: "vite-fundamentals",
    lede: "The logic you extracted into custom hooks and reducers (Part 40) is testable in isolation — no UI needed. renderHook runs a hook in a test, and reducers are just pure functions.",
    objectives: [
      "Test reducers as pure functions",
      "Test custom hooks with renderHook",
      "Use act for state updates",
      "See why extracted logic is easy to test",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Reducers: pure functions, trivial tests</h2>
      <p>A reducer (Part 40) is <code>(state, action) => newState</code> — pure, so you test it with no React at all:</p>

      ${h.codePane({
        lang: "ts",
        title: "tasksReducer.test.ts",
        readOnly: true,
        code: `import { describe, it, expect } from "vitest";
import { tasksReducer } from "./tasksReducer";

describe("tasksReducer", () => {
  it("adds a task", () => {
    const state = { tasks: [] };
    const next = tasksReducer(state, { type: "added", title: "Test" });
    expect(next.tasks).toHaveLength(1);
    expect(next.tasks[0].title).toBe("Test");
  });

  it("does not mutate the previous state", () => {
    const state = { tasks: [] };
    tasksReducer(state, { type: "added", title: "X" });
    expect(state.tasks).toHaveLength(0); // original untouched (immutability!)
  });
});`,
      })}

      ${h.callout({
        kind: "principal",
        title: "This is why you extract logic",
        body: `<p>All those state transitions — add, move, delete, toggle — are tested here <em>without rendering a
        single component</em>, in milliseconds, covering every edge case including the immutability guarantee. This
        is the payoff of putting logic in pure reducers and functions (Parts 40, 50): the hard, bug-prone part of
        your app becomes the easiest to test thoroughly. Components then just need lighter integration tests to verify
        they wire up correctly. Designing for testability — pure logic separated from UI — is a senior habit that
        makes test suites both comprehensive and fast.</p>`,
      })}

      <h2>Testing custom hooks with renderHook</h2>
      ${h.codePane({
        lang: "tsx",
        title: "useCounter.test.ts",
        readOnly: true,
        code: `import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCounter } from "./useCounter";

describe("useCounter", () => {
  it("starts at the initial value and increments", () => {
    const { result } = renderHook(() => useCounter(5));

    expect(result.current.count).toBe(5);

    // State updates must be wrapped in act():
    act(() => result.current.increment());

    expect(result.current.count).toBe(6);
  });
});`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Wrap state updates in act()",
        body: `<p><code>renderHook</code> returns <code>result.current</code> — the hook's latest return value. When you
        call a function that updates state, wrap it in <code>act()</code> so React flushes the update before you
        assert. Forgetting <code>act()</code> gives a warning and stale assertions. (Testing Library's
        <code>userEvent</code> wraps act for you in component tests, but for direct hook calls you do it yourself.)</p>`,
      })}

      ${h.callout({
        kind: "tip",
        title: "Test the hook's contract, not its internals",
        body: `<p>Test what a hook <em>returns and does</em> (its public API: values and functions), not how it stores
        state internally. If you refactor <code>useCounter</code> from <code>useState</code> to
        <code>useReducer</code>, the test shouldn't change — because the behavior didn't. Behavior over
        implementation applies to hooks too.</p>`,
      })}

      ${h.exercise({
        title: "Test your hooks and reducers",
        prompt: `<p>Write tests for logic from your earlier projects: the Kanban <code>boardReducer</code> (cover
        every action and immutability), and a custom hook like <code>useDebouncedValue</code> or
        <code>useLocalStorage</code> with <code>renderHook</code> + <code>act</code>. Notice how thoroughly you can
        cover complex logic without any UI — fast, focused, and resilient to refactoring.</p>`,
        runHint: "pnpm --filter vite-fundamentals test",
      })}
    </section>
  `,
});
