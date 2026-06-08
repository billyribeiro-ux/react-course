/* Lesson 50-modern-react/0300 — Streaming & Suspense boundaries. */
registerLesson({
  meta: {
    id: "50-modern-react/0300-streaming-suspense",
    title: "Streaming & Suspense Boundaries",
    part: "50-modern-react",
    estMinutes: 14,
    level: "advanced",
    project: "vite-hooks-lab",
    lede: "Suspense isn't just spinners — it enables streaming, where the server sends HTML in chunks as data becomes ready. Understand the model now; you'll wield it fully with Next.js in Part 80.",
    objectives: [
      "Understand streaming SSR conceptually",
      "Design boundaries that reveal content progressively",
      "Avoid request waterfalls",
      "Connect Suspense to perceived performance",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>From 'wait for everything' to 'stream as ready'</h2>
      <p>
        Traditional server rendering had to wait for <em>all</em> data before sending any HTML. With
        Suspense-powered <strong>streaming</strong>, the server sends the shell immediately, streams in each
        Suspense boundary's content as its data resolves, and the page fills in progressively. Users see
        meaningful content far sooner.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "Boundaries become streaming units",
        readOnly: true,
        code: `function ProductPage() {
  return (
    <>
      <Header />                         {/* sent instantly */}
      <Suspense fallback={<ReviewsSkeleton />}>
        <Reviews />                      {/* streams in when reviews load */}
      </Suspense>
      <Suspense fallback={<RelatedSkeleton />}>
        <Related />                      {/* streams in independently */}
      </Suspense>
    </>
  );
}
// The header and skeletons arrive immediately; each section pops in as
// its data is ready — no waiting for the slowest query to show anything.`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Perceived performance is the real performance",
        body: `<p>Users don't experience total load time — they experience <em>time to meaningful content</em>.
        Streaming lets the important stuff appear in milliseconds while slow, secondary data fills in after.
        A Suspense boundary is both a loading-fallback declaration <em>and</em> a streaming unit. Designing
        these boundaries well is a high-leverage performance skill: you're literally choosing what users see
        first. This is a major reason the industry moved toward Server Components and frameworks like
        Next.js.</p>`,
      })}

      <h2>Avoiding waterfalls</h2>
      ${h.callout({
        kind: "gotcha",
        title: "Sequential data fetching is the enemy",
        body: `<p>A <strong>waterfall</strong> is when request B can't start until request A finishes, even
        though they're independent — each delay stacks. The fix is to <em>start independent requests in
        parallel</em> (hoist them, or let a framework do it) so they overlap. Suspense reveals each as it
        completes, but it can't fix a waterfall you created by fetching sequentially. Recognizing and
        flattening waterfalls is one of the most impactful performance optimizations in real apps — we drill
        it in Parts 70, 80, and B0.</p>`,
      })}

      <h2>Where you'll actually use this</h2>
      ${h.callout({
        kind: "note",
        body: `<p>Full streaming SSR requires a server — so the dramatic version lives in <strong>Next.js</strong>
        (Part 80), where <code>loading.tsx</code> files and Server Components make streaming nearly automatic.
        In a client-only Vite app, Suspense still gives you clean, progressive loading on the client. Either
        way, the mental model — boundaries as units of progressive reveal — is what you're building here.</p>`,
      })}

      ${h.exercise({
        title: "Design progressive loading",
        prompt: `<p>Sketch (on paper or in code comments) how you'd lay out Suspense boundaries for a complex
        page — say a dashboard with a header, a primary chart (fast), a data table (slow), and a
        recommendations panel (slowest). Decide what should appear instantly, what should share a boundary,
        and what should stream independently. Then implement a client-side version in hooks-lab with lazy
        components and staggered fake delays to feel the progressive reveal.</p>`,
        runHint: "pnpm --filter vite-hooks-lab dev",
      })}
    </section>
  `,
});
