/* Lesson 40-hooks/0700 — useReducer. */
registerLesson({
  meta: {
    id: "40-hooks/0700-usereducer",
    title: "useReducer: State Transitions as Data",
    part: "40-hooks",
    estMinutes: 18,
    level: "advanced",
    project: "vite-hooks-lab",
    lede: "When state logic gets complex — many related fields, intricate transitions — useReducer centralizes it into one predictable function. It's the same model that powers Redux, and a discriminated-union showcase.",
    objectives: [
      "Move complex state logic into a reducer",
      "Type actions as a discriminated union",
      "Dispatch actions instead of calling many setters",
      "Decide between useState and useReducer",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The idea</h2>
      <p>
        <code>useReducer</code> consolidates all the ways your state can change into a single
        <strong>reducer</strong> function: <code>(state, action) => newState</code>. Components
        <strong>dispatch</strong> action objects describing <em>what happened</em>, and the reducer decides
        how state changes. This makes complex updates centralized, testable, and predictable.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "A typed reducer (discriminated-union actions)",
        readOnly: true,
        code: `import { useReducer } from "react";

interface Task { id: number; title: string; done: boolean; }
type State = { tasks: Task[] };

// Actions are a discriminated union (Part 20!) — exhaustive & type-safe:
type Action =
  | { type: "added"; title: string }
  | { type: "toggled"; id: number }
  | { type: "deleted"; id: number }
  | { type: "cleared" };

function tasksReducer(state: State, action: Action): State {
  switch (action.type) {
    case "added":
      return {
        tasks: [...state.tasks, { id: Date.now(), title: action.title, done: false }],
      };
    case "toggled":
      return {
        tasks: state.tasks.map((t) =>
          t.id === action.id ? { ...t, done: !t.done } : t
        ),
      };
    case "deleted":
      return { tasks: state.tasks.filter((t) => t.id !== action.id) };
    case "cleared":
      return { tasks: [] };
    default: {
      const _exhaustive: never = action; // compile error if a case is missed
      return state;
    }
  }
}`,
      })}

      <h2>Using it in a component</h2>
      ${h.codePane({
        lang: "tsx",
        title: "dispatch instead of many setters",
        readOnly: true,
        code: `function TaskBoard() {
  const [state, dispatch] = useReducer(tasksReducer, { tasks: [] });

  return (
    <>
      <button onClick={() => dispatch({ type: "added", title: "New task" })}>
        Add
      </button>
      {state.tasks.map((t) => (
        <div key={t.id}>
          <span onClick={() => dispatch({ type: "toggled", id: t.id })}>
            {t.done ? "✅" : "⬜"} {t.title}
          </span>
          <button onClick={() => dispatch({ type: "deleted", id: t.id })}>✕</button>
        </div>
      ))}
    </>
  );
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Why reducers are powerful",
        body: `<p>All state-change logic lives in <em>one pure function</em>, separate from the UI. That means
        you can unit-test every transition without rendering anything (Part A0), the component just
        "describes what happened" via actions, and the discriminated-union <code>Action</code> type with the
        <code>never</code> check guarantees you handle every case. This is the exact model behind Redux and
        Redux Toolkit (Part 70) — learning <code>useReducer</code> teaches you the whole family. It also
        scales: adding a new action is one case, in one place.</p>`,
      })}

      <h2>useState vs useReducer</h2>
      <ul>
        <li><strong>useState</strong> — a few independent, simple pieces of state. Most components.</li>
        <li><strong>useReducer</strong> — many related fields, complex transitions, "next state depends intricately on previous," or when several event handlers update the same state in different ways.</li>
      </ul>

      ${h.callout({
        kind: "tip",
        body: `<p>A reducer must be a <strong>pure function</strong>: no fetching, no mutation, no side effects
        — just compute and return the next state immutably (same spread/map/filter patterns). Side effects
        happen in event handlers or Effects, never in the reducer. Keep reducers pure and they stay
        trivially testable.</p>`,
      })}

      ${h.exercise({
        title: "Convert the Kanban to a reducer",
        prompt: `<p>Refactor your Kanban board's state to <code>useReducer</code>. Define an
        <code>Action</code> discriminated union covering: add task, move task between columns, edit title,
        delete task, and clear column. Implement the reducer purely with the <code>never</code> exhaustiveness
        check. Replace your scattered setters with <code>dispatch</code> calls. Your component logic should
        now read like a list of "what happened" events — much clearer.</p>`,
        runHint: "pnpm --filter vite-hooks-lab dev",
      })}
    </section>
  `,
});
