/* Lesson 50-modern-react/0100 — Suspense fundamentals. */
registerLesson({
  meta: {
    id: "50-modern-react/0100-suspense",
    title: "Suspense Fundamentals",
    part: "50-modern-react",
    estMinutes: 15,
    level: "advanced",
    project: "vite-hooks-lab",
    lede: "Suspense lets you declaratively show a fallback (like a spinner) while a component waits for something — usually data. It replaces scattered isLoading flags with a clean, composable boundary.",
    objectives: [
      "Wrap components in a Suspense boundary with a fallback",
      "Understand what it means for a component to 'suspend'",
      "Place boundaries thoughtfully for good UX",
      "See how Suspense unifies loading states",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The idea</h2>
      <p>
        Instead of every data-loading component managing its own <code>isLoading</code> boolean and
        rendering its own spinner, <strong>Suspense</strong> lets a parent declare: "while anything inside
        me is still loading, show this fallback." A component "suspends" by throwing a promise React knows
        how to wait for; React shows the nearest fallback until it resolves.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "A Suspense boundary",
        readOnly: true,
        code: `import { Suspense } from "react";

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      {/* While <Recipes/> is loading its data, <Spinner/> shows.
          When ready, React swaps in the real content. */}
      <Recipes />
    </Suspense>
  );
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Declarative loading states",
        body: `<p>Suspense applies React's core declarative philosophy to <em>loading</em>. You don't write
        "if loading show spinner else show data" in every component — you declare a boundary and a fallback,
        and React coordinates. Multiple components inside one boundary share its fallback; the UI appears
        together when all are ready (no waterfall of individual spinners). This composability — loading as a
        first-class, nestable concern — is a genuine architectural improvement over manual flags.</p>`,
      })}

      <h2>Boundaries nest and compose</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Granular vs coarse boundaries",
        readOnly: true,
        code: `<Suspense fallback={<PageSkeleton />}>
  <Header />
  <Suspense fallback={<RecipeSkeleton />}>
    <Recipes />   {/* this can load independently of the sidebar */}
  </Suspense>
  <Suspense fallback={<SidebarSkeleton />}>
    <Sidebar />
  </Suspense>
</Suspense>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Where to place boundaries is a UX decision",
        body: `<p>One boundary around everything = the whole region waits for the slowest part (simple, but a
        big "pop"). Many granular boundaries = each piece reveals as it's ready (smoother, more skeletons to
        design). The right granularity is a deliberate UX choice: group content that should appear together,
        separate independent regions. Thinking about loading <em>boundaries</em> instead of loading
        <em>flags</em> is a more mature way to design interfaces.</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Suspense needs a Suspense-enabled data source",
        body: `<p>A component only "suspends" if it reads data in a Suspense-compatible way — via the
        <code>use()</code> hook (next lesson), a framework's data loading (Next.js, Part 80), or a library
        like TanStack Query configured for Suspense (Part 70). A plain <code>useEffect</code> + fetch does
        <em>not</em> trigger Suspense. So Suspense and modern data fetching go hand in hand.</p>`,
      })}

      <h2>Suspense also powers other features</h2>
      ${h.callout({
        kind: "note",
        body: `<p>Beyond data, Suspense underpins <strong>lazy-loaded components</strong>
        (<code>React.lazy</code>, for code-splitting — Part B0) and <strong>streaming server rendering</strong>
        (Part 80). It's a foundational primitive that several modern React capabilities build on, which is
        why it's worth understanding well even before you wire it to real data.</p>`,
      })}

      ${h.exercise({
        title: "Add a Suspense boundary",
        prompt: `<p>In <code>vite-hooks-lab</code>, wrap a section of your Kanban app (e.g. a lazily-loaded
        "board analytics" panel) in a <code>&lt;Suspense&gt;</code> with a skeleton fallback. Use
        <code>React.lazy(() =&gt; import("./Analytics"))</code> to code-split it so it suspends while the
        chunk loads. Watch the fallback appear, then the real component. Next lesson, you'll suspend on
        <em>data</em> with the <code>use()</code> hook.</p>`,
        runHint: "pnpm --filter vite-hooks-lab dev",
      })}
    </section>
  `,
});
