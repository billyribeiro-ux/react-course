/* Lesson 30-react-fundamentals/1000 — State is a snapshot / batching. */
registerLesson({
  meta: {
    id: "30-react-fundamentals/1000-state-as-snapshot",
    title: "State as a Snapshot & Batching",
    part: "30-react-fundamentals",
    estMinutes: 16,
    level: "intermediate",
    project: "vite-fundamentals",
    lede: "The single most misunderstood thing about React: state doesn't change instantly. Each render sees a frozen snapshot. Grasp this and a whole class of confusing bugs disappears.",
    objectives: [
      "Understand that state is fixed for a given render",
      "Explain why setState doesn't update the variable immediately",
      "Use the updater function form to avoid stale state",
      "Know how React batches multiple updates",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Each render is a snapshot</h2>
      <p>
        When React renders a component, it runs your function and the state values are <strong>fixed for
        that render</strong> — like a photograph. Calling the setter doesn't change the existing variable;
        it asks React to render <em>again</em> with a new value. The current render keeps seeing the old
        value.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "The classic surprise",
        readOnly: true,
        code: `function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    console.log(count); // logs 0, NOT 3 — count is frozen this render
  }
  // After the click, count becomes 1 (not 3). All three calls used
  // the same snapshot value of count (0), computing 0 + 1 each time.

  return <button onClick={handleClick}>{count}</button>;
}`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "setState is a request, not an assignment",
        body: `<p><code>setCount(count + 1)</code> does not change <code>count</code> on the spot — the line
        right after still sees the old value. It schedules a re-render with the new value. Treating
        <code>setState</code> like a normal variable assignment is the #1 source of "why is my state one
        step behind?" confusion. It isn't behind; you're reading the snapshot.</p>`,
      })}

      <h2>The updater function: read the latest value</h2>
      <p>
        When the new state depends on the previous state, pass a <strong>function</strong> to the setter.
        React calls it with the most up-to-date value, so updates stack correctly:
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "Updater form",
        readOnly: true,
        code: `function handleClick() {
  setCount((prev) => prev + 1);
  setCount((prev) => prev + 1);
  setCount((prev) => prev + 1);
  // Now count becomes 3 — each updater receives the result of the last.
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Rule of thumb",
        body: `<p>If your new state is computed from the old state, <strong>use the updater function</strong>
        (<code>setX(prev =&gt; ...)</code>). If you're setting a fresh, independent value, the direct form
        (<code>setX(newValue)</code>) is fine. When in doubt, the updater form is always safe — it's the
        professional default for counters, toggles, and any "based on what it was" update. This also
        prevents subtle bugs with async code and stale closures later.</p>`,
      })}

      <h2>Batching: multiple updates, one render</h2>
      <p>
        React <strong>batches</strong> state updates that happen in the same event — it collects them and
        re-renders once, for performance. So setting three pieces of state in one handler causes a single
        re-render, not three:
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "Batched updates",
        readOnly: true,
        code: `function handleSubmit() {
  setLoading(true);
  setError(null);
  setQuery("");
  // React batches these → one re-render with all three changes applied,
  // not three separate renders. Efficient and consistent.
}`,
      })}

      ${h.callout({
        kind: "note",
        title: "React 19 batches everywhere",
        body: `<p>Modern React batches updates in all contexts — event handlers, promises,
        <code>setTimeout</code>, native handlers — automatically. You rarely think about it; just know that
        several <code>setState</code> calls together are efficient and that the screen reflects the final
        combined result.</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Why this design is good",
        body: `<p>"State is immutable per render" is what makes React predictable: a render is a pure
        function of its props and state at that moment, with no mid-render surprises. It's the same
        snapshot guarantee that makes the UI reproducible and debuggable. Fighting it (trying to read state
        "right after" setting it) leads to pain; embracing it — derive everything from the current snapshot,
        use updaters for dependent changes — leads to clean code. This is a genuinely deep idea worth
        sitting with.</p>`,
      })}

      ${h.exercise({
        title: "Feel the snapshot",
        prompt: `<p>Build a counter with a "+3" button that calls <code>setCount(count + 1)</code> three
        times — watch it only go up by 1. Then switch to the updater form and watch it go up by 3. Add a
        <code>console.log(count)</code> right after a setter and confirm it logs the <em>old</em> value.
        Experiencing this directly cements one of React's most important concepts.</p>`,
        runHint: "pnpm vite",
      })}
    </section>
  `,
});
