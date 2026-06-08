/* Lesson 40-hooks/0900 — useMemo & useCallback (and the Compiler). */
registerLesson({
  meta: {
    id: "40-hooks/0900-usememo-usecallback",
    title: "useMemo, useCallback & the Compiler",
    part: "40-hooks",
    estMinutes: 18,
    level: "advanced",
    project: "vite-hooks-lab",
    lede: "These hooks cache values and functions between renders to avoid wasted work. Crucially, in 2026 the React Compiler often makes them unnecessary — so you'll learn both how they work AND when to stop writing them.",
    objectives: [
      "Understand referential identity and why it matters",
      "Use useMemo to cache expensive computations",
      "Use useCallback to keep function identity stable",
      "Know how the React Compiler changes this entire topic",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The problem they solve</h2>
      <p>
        Every render, your component function runs top to bottom — recreating objects, arrays, and functions
        fresh each time. Usually that's cheap and fine. But two cases matter: (1) a genuinely
        <strong>expensive calculation</strong> re-running needlessly, and (2) a new function/object identity
        breaking a downstream optimization or causing an Effect to re-run.
      </p>

      <h2><code>useMemo</code>: cache a computed value</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Memoize expensive work",
        readOnly: true,
        code: `function Board({ tasks, query }: { tasks: Task[]; query: string }) {
  // Only recompute when tasks or query actually change:
  const filtered = useMemo(
    () => tasks.filter((t) => t.title.includes(query)).sort(byPriority),
    [tasks, query]
  );

  return <List items={filtered} />;
}
// If 'filtered' is cheap to compute, you DON'T need useMemo. Reserve it
// for genuinely heavy work (large lists, complex transforms).`,
      })}

      <h2><code>useCallback</code>: stable function identity</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Keep a function reference stable",
        readOnly: true,
        code: `const handleAdd = useCallback(
  (title: string) => dispatch({ type: "added", title }),
  [dispatch]
);
// Same function reference across renders → useful when passing it to a
// memoized child or listing it as an Effect dependency.
// useCallback(fn, deps) is just useMemo(() => fn, deps) for functions.`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Referential identity — the real concept",
        body: `<p>The deep idea behind both hooks is <strong>referential identity</strong>: <code>{} !== {}</code>
        and <code>(() =&gt; {}) !== (() =&gt; {})</code> even when "the same." A new reference each render
        makes <code>React.memo</code> children re-render and makes Effect dependency arrays fire. <code>useMemo</code>/<code>useCallback</code>
        preserve identity so those optimizations hold. Understanding identity — not memorizing the hooks —
        is what matters.</p>`,
      })}

      <h2>The 2026 plot twist: the React Compiler</h2>
      ${h.callout({
        kind: "principal",
        title: "You probably shouldn't write these by hand anymore",
        body: `<p>The <strong>React Compiler</strong> (stable since late 2025) automatically memoizes your
        components and values at build time — doing what <code>useMemo</code>/<code>useCallback</code>/<code>React.memo</code>
        did manually, but everywhere, correctly, and without cluttering your code. On a compiler-enabled
        project, <strong>you rarely write these hooks at all</strong>. The official guidance is: write clean,
        straightforward code and let the compiler optimize it. We cover enabling and trusting the compiler in
        Part 50. So: learn what these hooks do (you'll read them in existing code and pre-compiler projects),
        but don't reflexively sprinkle them — that's an outdated habit.</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Premature memoization is a real cost",
        body: `<p>Manually memoizing everything "to be safe" adds complexity, can introduce bugs (wrong
        dependency arrays), and often doesn't help — the memoization itself has overhead. Without the
        compiler, measure first (Part B0's profiler) and memoize only proven hotspots. With the compiler,
        let it do the work. Either way, don't cargo-cult <code>useMemo</code> onto every value.</p>`,
      })}

      <h2>When you'd still reach for them manually</h2>
      <ul>
        <li>A project not yet using the React Compiler, with a measured performance problem.</li>
        <li>A genuinely expensive computation you want cached regardless.</li>
        <li>Stabilizing a value passed to a non-React API or a carefully optimized library.</li>
      </ul>

      ${h.exercise({
        title: "Measure before optimizing",
        prompt: `<p>In your Kanban app, add an artificially expensive derived value (e.g. a heavy sort over a
        large generated task list). Open React DevTools' Profiler and observe renders. Wrap the computation
        in <code>useMemo</code> and observe the difference. Then read the React Compiler section ahead and
        note how Part 50 will let you delete the manual memoization entirely. The lesson: optimize based on
        measurement and modern tooling, not reflex.</p>`,
        runHint: "pnpm --filter vite-hooks-lab dev",
      })}
    </section>
  `,
});
