/* Lesson b0-principal/0100 — Profiling with the React DevTools profiler. */
registerLesson({
  meta: {
    id: "b0-principal/0100-profiling",
    title: "Profiling: Measure Before You Optimize",
    part: "b0-principal",
    estMinutes: 14,
    level: "principal",
    project: "next-saas",
    lede: "The first rule of performance: measure, don't guess. Most 'optimizations' target the wrong thing. Learn to profile React apps with the DevTools Profiler and find what's actually slow.",
    objectives: [
      "Profile renders with the React DevTools Profiler",
      "Identify unnecessary and slow renders",
      "Measure before and after a change",
      "Adopt a data-driven performance mindset",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Measure first, always</h2>
      <p>
        Performance intuition is famously unreliable — the slow part is rarely where you'd guess. Before optimizing
        anything, <strong>profile to find the actual bottleneck</strong>. Optimizing code that wasn't slow adds
        complexity for zero benefit (and can introduce bugs). "Premature optimization is the root of all evil" is a
        cliché because it's true.
      </p>

      ${h.callout({
        kind: "principal",
        title: "The optimization loop",
        body: `<p>The disciplined loop: <strong>(1) Measure</strong> to find the real bottleneck → <strong>(2)
        Hypothesize</strong> a cause → <strong>(3) Fix</strong> one thing → <strong>(4) Measure again</strong> to
        confirm it helped. Skipping step 1 means you're guessing; skipping step 4 means you don't know if your "fix"
        worked. Principal engineers are rigorous here — they bring data to performance discussions, not hunches. A
        change that "should be faster" but isn't measured is just added complexity. This empirical loop applies to
        every performance topic in this part.</p>`,
      })}

      <h2>The React DevTools Profiler</h2>
      <p>React DevTools (browser extension) has a <strong>Profiler</strong> tab: hit record, interact with your app,
      stop, and it shows every render — which components rendered, how long each took, and <em>why</em> they rendered.</p>

      ${h.callout({
        kind: "principal",
        title: "Hunt unnecessary renders",
        body: `<p>The Profiler's flame graph and ranked chart reveal two problems: components that render <strong>too
        often</strong> (re-rendering when their data didn't change — wasted work) and components that render
        <strong>too slowly</strong> (expensive work per render). Turn on "Record why each component rendered" to see
        the cause (props changed, state changed, parent re-rendered). On a React Compiler project, many unnecessary
        re-renders are already gone — but the Profiler confirms it and finds what remains. This tool turns
        "the app feels slow" into "this specific component renders 200 times when it should render twice."</p>`,
      })}

      <h2>Beyond React: the browser tools</h2>
      ${h.callout({
        kind: "note",
        body: `<p>Complement the React Profiler with the browser's <strong>Performance</strong> panel (records the main
        thread, paint, layout — find long tasks and jank), the <strong>Network</strong> panel (slow/large requests,
        waterfalls), and <strong>Lighthouse</strong> (an audit of performance, accessibility, SEO, best practices).
        Different tools reveal different bottlenecks: React renders vs network vs main-thread work vs asset size.
        Knowing which tool answers which question is part of the skill.</p>`,
      })}

      ${h.exercise({
        title: "Profile a real interaction",
        prompt: `<p>Open one of your apps with React DevTools, go to the Profiler, record a typical interaction (typing
        in a search, opening a list, toggling a filter), and analyze it: which components rendered, how often, and why?
        Find one component that renders more than it should. Form a hypothesis about the cause — but don't fix it yet.
        Run Lighthouse on the page too. You're building the measurement habit that every later optimization depends
        on.</p>`,
        runHint: "pnpm --filter next-saas dev",
      })}
    </section>
  `,
});
