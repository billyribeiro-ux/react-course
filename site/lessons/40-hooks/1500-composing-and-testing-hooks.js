/* Lesson 40-hooks/1500 — Composing & testing hooks. */
registerLesson({
  meta: {
    id: "40-hooks/1500-composing-and-testing-hooks",
    title: "Composing & Testing Hooks",
    part: "40-hooks",
    estMinutes: 15,
    level: "advanced",
    project: "vite-hooks-lab",
    lede: "Great hooks compose into bigger hooks, and because they hold real logic, you can and should test them. A preview of the testing discipline we formalize in Part A0 — applied to your hooks now.",
    objectives: [
      "Compose multiple hooks into a feature hook",
      "Structure a project's hooks for reuse",
      "Understand how hooks are tested (preview)",
      "Recognize over-abstraction and avoid it",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Composition all the way up</h2>
      <p>
        Custom hooks compose like functions: small hooks become building blocks for feature hooks. A
        <code>useBoard</code> might internally use <code>useReducer</code>, <code>useLocalStorage</code>, and
        <code>useDebouncedValue</code> — presenting one clean API to components.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "A composed feature hook",
        readOnly: true,
        code: `function useBoard() {
  const [state, dispatch] = useReducer(boardReducer, undefined, loadInitial);

  // Persist on every change (composing another hook's idea):
  useEffect(() => saveBoard(state), [state]);

  // Expose a clean, intention-revealing API:
  return {
    columns: state.columns,
    addTask: (col: string, title: string) =>
      dispatch({ type: "added", col, title }),
    moveTask: (id: number, toCol: string) =>
      dispatch({ type: "moved", id, toCol }),
    deleteTask: (id: number) => dispatch({ type: "deleted", id }),
  } as const;
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Hooks are your app's logic layer",
        body: `<p>A well-structured React app pushes logic <em>down</em> into hooks and keeps components focused
        on <em>rendering</em>. Components become "dumb and declarative"; hooks hold the smarts. This separation
        — UI vs logic — makes both easier to change, test, and reason about. It's the React expression of a
        timeless principle: separate what something looks like from how it works.</p>`,
      })}

      <h2>Testing hooks (a preview of Part A0)</h2>
      <p>
        Because hooks contain real logic, they're worth testing. The React Testing Library provides
        <code>renderHook</code> to run a hook in a test and assert on its output and how it changes when you
        call its functions:
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "Testing a hook with Vitest + Testing Library",
        readOnly: true,
        code: `import { renderHook, act } from "@testing-library/react";
import { expect, test } from "vitest";
import { useCounter } from "./useCounter";

test("increments the count", () => {
  const { result } = renderHook(() => useCounter(0));

  expect(result.current.count).toBe(0);

  act(() => result.current.increment()); // state updates wrapped in act()

  expect(result.current.count).toBe(1);
});`,
      })}

      ${h.callout({
        kind: "note",
        body: `<p>We set up Vitest and Testing Library properly in <strong>Part A0</strong>. The point here:
        logic extracted into hooks is <em>testable in isolation</em>, without rendering a full UI. That
        testability is a major payoff of the "logic in hooks" structure — it's much harder to test logic
        tangled inside component JSX.</p>`,
      })}

      <h2>Don't over-abstract</h2>
      ${h.callout({
        kind: "gotcha",
        title: "Abstraction has a cost",
        body: `<p>Not every piece of logic needs its own hook. A hook used in exactly one place, that just
        wraps a single <code>useState</code>, may be premature abstraction — it adds indirection without
        reuse. Extract a hook when logic is <strong>repeated</strong>, <strong>complex</strong>, or
        <strong>worth testing in isolation</strong>. "Rule of three": once you've written similar logic three
        times, extract it. Senior engineers abstract <em>deliberately</em>, not reflexively — the wrong
        abstraction is costlier than a little duplication.</p>`,
      })}

      ${h.exercise({
        title: "Compose and (mentally) test",
        prompt: `<p>Finalize a <code>useBoard()</code> hook for your Kanban app that composes your reducer,
        persistence, and any helpers into one clean API. Then write down (as comments or notes) three tests
        you'd want for it: e.g. "adding a task increases that column's count," "moving a task changes its
        column," "deleting removes it." You'll implement real versions in Part A0 — but designing for
        testability now shapes better hooks.</p>`,
        runHint: "pnpm --filter vite-hooks-lab dev",
      })}
    </section>
  `,
});
