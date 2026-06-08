/* Lesson 40-hooks/1100 — useTransition & useDeferredValue. */
registerLesson({
  meta: {
    id: "40-hooks/1100-usetransition-usedeferredvalue",
    title: "Concurrent UI: useTransition & useDeferredValue",
    part: "40-hooks",
    estMinutes: 16,
    level: "advanced",
    project: "vite-hooks-lab",
    lede: "React's concurrent features let you mark some updates as non-urgent, so typing stays snappy while an expensive list re-renders in the background. This is how you build interfaces that never feel janky.",
    objectives: [
      "Mark non-urgent updates with useTransition",
      "Keep inputs responsive during heavy renders",
      "Defer a value with useDeferredValue",
      "Understand urgent vs transition updates",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The problem: one slow update freezes everything</h2>
      <p>
        Imagine a search box that filters 10,000 items. Each keystroke updates the input <em>and</em>
        re-renders the giant list. If the list render is slow, the input feels laggy — it can't update until
        the list finishes. React's <strong>concurrent</strong> features fix this by letting you tell React
        "this update is not urgent; keep the UI interactive while you work on it."
      </p>

      <h2><code>useTransition</code></h2>
      ${h.codePane({
        lang: "tsx",
        title: "Mark the heavy update as a transition",
        readOnly: true,
        code: `import { useState, useTransition } from "react";

function SearchableList({ items }: { items: Item[] }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(items);
  const [isPending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value;
    setQuery(q);                       // URGENT — update the input immediately

    startTransition(() => {            // NON-URGENT — can be interrupted
      setResults(items.filter((i) => i.name.includes(q)));
    });
  }

  return (
    <>
      <input value={query} onChange={handleChange} />
      {isPending && <span>Updating…</span>}
      <List items={results} />
    </>
  );
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Urgent vs non-urgent updates",
        body: `<p>The key insight: not all state updates are equally urgent. Typing in an input must feel
        instant (urgent). The expensive list filtering it triggers can lag slightly without anyone noticing
        (non-urgent). <code>startTransition</code> tells React to prioritize the urgent update and render the
        transition in the background — interruptible if the user types again. <code>isPending</code> lets you
        show subtle "updating" feedback. This is a genuinely modern capability older UI frameworks simply
        can't do.</p>`,
      })}

      <h2><code>useDeferredValue</code></h2>
      <p>A simpler alternative when you receive a value (e.g. a prop) and want to defer rendering based on
      it, without restructuring your state updates:</p>

      ${h.codePane({
        lang: "tsx",
        title: "Defer a derived value",
        readOnly: true,
        code: `import { useDeferredValue, useState } from "react";

function Search({ items }: { items: Item[] }) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query); // "lags behind" query

  // Expensive render uses the deferred value, so typing stays instant:
  const results = items.filter((i) => i.name.includes(deferredQuery));

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <List items={results} />
    </>
  );
}`,
      })}

      ${h.callout({
        kind: "tip",
        title: "Which one?",
        body: `<p>Use <strong><code>useTransition</code></strong> when you control the state update and can wrap
        it (you have the setter). Use <strong><code>useDeferredValue</code></strong> when you only have a
        value (a prop, or state you don't want to restructure) and want to defer work derived from it. Both
        achieve the same "keep it responsive" goal from different angles.</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        body: `<p>These tools don't make the slow render <em>faster</em> — they make it <em>non-blocking</em>.
        If a render is genuinely expensive, also consider virtualization (Part B0) or reducing the work. And
        on a React Compiler project, many "slow re-render" problems disappear because unnecessary re-renders
        are eliminated. Reach for concurrent features for real, measured interactivity problems.</p>`,
      })}

      ${h.exercise({
        title: "Keep the board responsive",
        prompt: `<p>Generate a large list of tasks (say 5,000) in your Kanban app and add a live search/filter.
        First, feel the input lag with a naive implementation. Then apply <code>useDeferredValue</code> (or
        <code>useTransition</code>) so typing stays instant while the filtered results update in the
        background, with an <code>isPending</code> indicator. You've just built a professional-grade
        responsive search.</p>`,
        runHint: "pnpm --filter vite-hooks-lab dev",
      })}
    </section>
  `,
});
