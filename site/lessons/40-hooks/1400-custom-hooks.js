/* Lesson 40-hooks/1400 — Writing custom hooks. */
registerLesson({
  meta: {
    id: "40-hooks/1400-custom-hooks",
    title: "Writing Custom Hooks",
    part: "40-hooks",
    estMinutes: 18,
    level: "advanced",
    project: "vite-hooks-lab",
    lede: "Custom hooks let you extract and reuse stateful logic. They're the primary way to share behavior in React — and writing good ones is a defining skill of strong React engineers.",
    objectives: [
      "Extract reusable logic into a custom hook",
      "Build typed, well-designed hook APIs",
      "Compose hooks from other hooks",
      "Know what belongs in a hook vs a component",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>What a custom hook is</h2>
      <p>
        A <strong>custom hook</strong> is just a function whose name starts with <code>use</code> and that
        calls other hooks. It lets you extract stateful logic out of a component so it can be reused. It
        shares <em>logic</em>, not <em>state</em> — each component that calls the hook gets its own
        independent state.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "A useLocalStorage hook",
        readOnly: true,
        code: `import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const; // tuple, like useState
}

// Usage — looks just like useState, but persists:
const [tasks, setTasks] = useLocalStorage<Task[]>("kanban.tasks", []);`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Custom hooks are React's composition unit",
        body: `<p>This is how you share behavior in React. Instead of inheritance or mixins (old paradigms),
        you extract logic into hooks and compose them. A great custom hook has a <strong>focused
        responsibility</strong> and a <strong>clean, well-typed API</strong> that reads like a built-in hook.
        Generic, reusable hooks (<code>useLocalStorage</code>, <code>useDebounce</code>,
        <code>useMediaQuery</code>) and feature-specific ones (<code>useBoard</code>,
        <code>useAuth</code>) both have their place. The ability to spot repeated stateful logic and factor
        it into a clean hook is one of the clearest signals of React seniority.</p>`,
      })}

      <h2>Composing hooks from hooks</h2>
      ${h.codePane({
        lang: "tsx",
        title: "A useDebouncedValue hook",
        readOnly: true,
        code: `import { useEffect, useState } from "react";

export function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(id); // cancel if value changes within the delay
  }, [value, delayMs]);

  return debounced;
}

// Compose it with state in a component:
function Search() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 300); // waits for typing to pause
  // ...use debouncedQuery to filter/fetch...
}`,
      })}

      ${h.callout({
        kind: "tip",
        title: "Return shape conventions",
        body: `<p>Return a <strong>tuple</strong> (<code>[value, setter] as const</code>) when mimicking
        <code>useState</code>, or an <strong>object</strong> (<code>{ data, isLoading, error }</code>) when
        returning several named things — objects let callers destructure only what they need and read
        clearly. The <code>as const</code> makes the tuple's types precise (Part 20). Design the return shape
        for the caller's convenience.</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Hooks can't be called conditionally — including yours",
        body: `<p>Because a custom hook calls hooks, the Rules of Hooks apply to it too: callers must invoke
        it unconditionally at the top level, and its name must start with <code>use</code> so the linter
        enforces this. A custom hook is not a way to escape the rules — it inherits them.</p>`,
      })}

      ${h.exercise({
        title: "Extract your Kanban logic into hooks",
        prompt: `<p>Refactor your Kanban app by extracting reusable hooks: <code>useLocalStorage</code> for
        persistence, <code>useDebouncedValue</code> for the search box, and a feature hook
        <code>useBoard()</code> that wraps your <code>useReducer</code> + context logic into a clean API
        (<code>{ tasks, addTask, moveTask, ... }</code>). Your components should become thin and readable,
        delegating logic to well-named hooks. This is professional React structure.</p>`,
        runHint: "pnpm --filter vite-hooks-lab dev",
      })}
    </section>
  `,
});
