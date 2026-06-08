/* Lesson 70-data-routing/0900 — Prefetching & Suspense integration. */
registerLesson({
  meta: {
    id: "70-data-routing/0900-prefetching-suspense",
    title: "Prefetching & Suspense Integration",
    part: "70-data-routing",
    estMinutes: 14,
    level: "advanced",
    project: "data-routing-app",
    lede: "Make navigation feel instant by fetching data before the user needs it, and integrate TanStack Query with Suspense for clean declarative loading. The techniques that make apps feel ahead of the user.",
    objectives: [
      "Prefetch data on hover or in route loaders",
      "Use useSuspenseQuery with Suspense boundaries",
      "Combine router loaders with Query",
      "Make navigations feel instantaneous",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Prefetching: fetch before they click</h2>
      <p>
        If you know a user is likely to navigate somewhere (they're hovering a link), start fetching that data
        <em>now</em>, so it's cached and instant when they arrive. <code>prefetchQuery</code> warms the cache:
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "Prefetch on hover",
        readOnly: true,
        code: `function JobLink({ job }: { job: Job }) {
  const queryClient = useQueryClient();

  function prefetch() {
    queryClient.prefetchQuery({
      queryKey: ["job", job.id],
      queryFn: () => fetchJob(job.id),
    });
  }

  return (
    <Link to="/jobs/$jobId" params={{ jobId: String(job.id) }}
          onMouseEnter={prefetch} onFocus={prefetch}>
      {job.title}
    </Link>
  );
}
// By the time the click registers, the detail data is often already cached.`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Prefetching hides latency",
        body: `<p>Network latency is unavoidable, but you can often <em>move it earlier</em> — into the moment of
        intent (hover, focus) rather than the moment of action (click). Combined with Query's caching, prefetching
        makes navigations feel instantaneous because the data is already there. Route loaders (Lesson 3) do this
        at the route level; hover-prefetching does it speculatively. Used well, your app feels like it's reading
        the user's mind. This is a signature technique of high-quality, fast-feeling apps.</p>`,
      })}

      <h2>Suspense integration</h2>
      ${h.codePane({
        lang: "tsx",
        title: "useSuspenseQuery",
        readOnly: true,
        code: `import { useSuspenseQuery } from "@tanstack/react-query";

function JobDetail({ id }: { id: number }) {
  // Suspends until data is ready — no isPending check needed.
  // 'data' is guaranteed defined (never undefined).
  const { data: job } = useSuspenseQuery({
    queryKey: ["job", id],
    queryFn: () => fetchJob(id),
  });
  return <h1>{job.title}</h1>;
}

// The parent declares loading/error with boundaries (Part 50):
<ErrorBoundary fallback={<Error />}>
  <Suspense fallback={<Spinner />}>
    <JobDetail id={3} />
  </Suspense>
</ErrorBoundary>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "The cleanest data-fetching pattern in 2026",
        body: `<p><code>useSuspenseQuery</code> + Suspense + ErrorBoundary is arguably the nicest way to fetch in a
        client app: components just read data (always defined, fully typed), and loading/error are handled
        declaratively by boundaries — no <code>isPending</code>/<code>isError</code> branches in every component.
        It combines everything you've learned: Query's caching, Part 50's Suspense, and clean separation of
        concerns. The trade-off is you opt into Suspense's "throw to nearest boundary" model. For most apps it's a
        clear win in readability.</p>`,
      })}

      <h2>Router loaders + Query together</h2>
      ${h.callout({
        kind: "note",
        body: `<p>The best of both worlds: use a router <strong>loader</strong> to <code>prefetchQuery</code> on
        navigation (parallel, no waterfall), and <code>useSuspenseQuery</code> in the component to read from the
        now-warm cache. The router fetches early; Query caches and shares. TanStack Router and Query are built to
        compose exactly this way — and Next.js (Part 80) achieves the same with Server Components + Query
        hydration.</p>`,
      })}

      ${h.exercise({
        title: "Make the Job Board feel instant",
        prompt: `<p>Add hover/focus prefetching to the job links so detail pages load instantly. Convert the
        detail page to <code>useSuspenseQuery</code> wrapped in <code>&lt;Suspense&gt;</code> +
        <code>&lt;ErrorBoundary&gt;</code>, removing the manual <code>isPending</code>/<code>isError</code>
        branches. Wire a route loader to prefetch. Navigate around and notice how detail pages now appear with no
        visible loading after the first visit. That snappiness is the goal.</p>`,
        runHint: "pnpm --filter data-routing-app dev",
      })}
    </section>
  `,
});
