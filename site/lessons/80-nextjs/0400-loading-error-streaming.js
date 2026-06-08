/* Lesson 80-nextjs/0400 — loading.tsx, error.tsx & streaming. */
registerLesson({
  meta: {
    id: "80-nextjs/0400-loading-error-streaming",
    title: "loading.tsx, error.tsx & Streaming",
    part: "80-nextjs",
    estMinutes: 15,
    level: "advanced",
    project: "next-saas",
    lede: "Next.js turns the Suspense and error-boundary concepts from Part 50 into simple file conventions. Drop in a loading.tsx and your slow pages stream with instant feedback — no manual boilerplate.",
    objectives: [
      "Add instant loading UI with loading.tsx",
      "Catch route errors with error.tsx",
      "Stream slow content with Suspense",
      "Design progressive loading for real pages",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>loading.tsx — automatic Suspense fallback</h2>
      <p>
        Create a <code>loading.tsx</code> next to a <code>page.tsx</code> and Next automatically wraps the page
        in a Suspense boundary using it as the fallback. While the page's server data loads, the user instantly
        sees your loading UI (and the shared layout stays put). Zero wiring.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "app/dashboard/loading.tsx",
        readOnly: true,
        code: `// Shown instantly while dashboard/page.tsx fetches its data.
export default function Loading() {
  return <DashboardSkeleton />;
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Streaming, made trivial",
        body: `<p>Because the page is a Server Component that may <code>await</code> data, Next streams the
        response: the shell + your <code>loading.tsx</code> arrive immediately, then the finished page streams in
        when its data resolves. This is the Part 50 streaming model, but you get it by <em>creating a file</em> —
        no <code>&lt;Suspense&gt;</code> boilerplate. Good loading UI dramatically improves perceived performance;
        Next makes it the path of least resistance, which is exactly how good defaults should work.</p>`,
      })}

      <h2>error.tsx — route-level error boundary</h2>
      ${h.codePane({
        lang: "tsx",
        title: "app/dashboard/error.tsx",
        readOnly: true,
        code: `"use client"; // error boundaries must be Client Components

export default function Error({
  error, reset,
}: { error: Error; reset: () => void }) {
  return (
    <div role="alert">
      <h2>Something went wrong</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
// Catches errors thrown while rendering this route segment, isolating
// the failure to this section instead of crashing the whole app.`,
      })}

      <h2>Granular streaming with Suspense</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Stream parts of a page independently",
        readOnly: true,
        code: `import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <Header />  {/* instant */}
      <Suspense fallback={<StatsSkeleton />}>
        <Stats />        {/* awaits its own data, streams in */}
      </Suspense>
      <Suspense fallback={<FeedSkeleton />}>
        <ActivityFeed /> {/* streams independently — no waterfall */}
      </Suspense>
    </>
  );
}
// Fast content shows immediately; each slow section reveals when ready.`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Design your loading boundaries",
        body: `<p>Page-level <code>loading.tsx</code> is the easy win, but the real craft is placing
        <code>&lt;Suspense&gt;</code> boundaries <em>within</em> a page so fast content (header, primary data)
        appears immediately while slow widgets (analytics, recommendations) stream in. This requires fetching
        independent data in parallel (each Suspense child kicks off its own fetch) — avoiding the waterfall trap
        from Part 70. The result is a page that feels instant even when some data is slow. Thinking in
        boundaries, not spinners, is the senior approach.</p>`,
      })}

      ${h.exercise({
        title: "Make LaunchPad stream",
        prompt: `<p>Add a <code>loading.tsx</code> to your dashboard route with a skeleton, and an
        <code>error.tsx</code> that offers a retry. Then split the dashboard into independent
        <code>&lt;Suspense&gt;</code>-wrapped sections (e.g. stats and a recent-activity list) that each fetch
        their own data with artificial delays — watch them stream in separately while the header shows instantly.
        Throw an error in one section and confirm only it shows the error UI.</p>`,
        runHint: "pnpm --filter next-saas dev",
      })}
    </section>
  `,
});
