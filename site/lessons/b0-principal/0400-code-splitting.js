/* Lesson b0-principal/0400 — Code splitting & lazy loading. */
registerLesson({
  meta: {
    id: "b0-principal/0400-code-splitting",
    title: "Code Splitting & Lazy Loading",
    part: "b0-principal",
    estMinutes: 13,
    level: "principal",
    project: "next-saas",
    lede: "Shipping your entire app as one giant JavaScript bundle makes the first load slow. Code splitting breaks it into chunks loaded on demand, so users download only what they need, when they need it.",
    objectives: [
      "Split code with lazy and Suspense",
      "Load heavy components on demand",
      "Understand route-level splitting",
      "Balance splitting against waterfalls",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The bundle-size problem</h2>
      <p>
        Every kilobyte of JavaScript must be downloaded, parsed, and executed before it runs — and on mobile/slow
        connections that's expensive. If your whole app is one bundle, users wait for code they may never use (the
        admin panel, a charting library, a rarely-opened modal) just to see the homepage. <strong>Code splitting</strong>
        breaks the bundle into chunks loaded on demand.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "React.lazy + Suspense",
        readOnly: true,
        code: `import { lazy, Suspense } from "react";

// This component's code is a SEPARATE chunk, downloaded only when rendered:
const Analytics = lazy(() => import("./Analytics"));

function Dashboard({ showAnalytics }: { showAnalytics: boolean }) {
  return (
    <>
      <Overview />
      {showAnalytics && (
        <Suspense fallback={<Spinner />}>
          <Analytics />   {/* heavy charts load only when this is shown */}
        </Suspense>
      )}
    </>
  );
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Split at the right boundaries",
        body: `<p>The highest-value split points: <strong>routes</strong> (each page is a chunk — you only download the
        dashboard's code when you visit it), <strong>heavy below-the-fold or conditional components</strong> (modals,
        rich editors, charts, maps), and <strong>large dependencies</strong> used in one place. Frameworks help: Next.js
        <strong>automatically code-splits by route</strong>, and TanStack Router lazy-loads routes too — so you get
        much of this for free. The skill is identifying the few <em>large, rarely-needed</em> pieces worth lazy-loading
        explicitly, using bundle analysis (next lesson) to find them.</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Don't over-split into a waterfall",
        body: `<p>Too much splitting creates its own problem: a chain of "load chunk A, which needs chunk B, which
        needs chunk C" — a request waterfall that's slower than one bundle. And tiny chunks have per-request overhead.
        Split at meaningful boundaries (routes, big optional features), not every component. Also <strong>preload</strong>
        chunks you know you'll need soon (e.g. on hover/intent, like the prefetching from Part 70) so the load happens
        before the user clicks. Balance is the art.</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "The goal: fast first load",
        body: `<p>The point of code splitting is a fast <strong>initial</strong> experience — get the user to interactive
        content quickly, then stream in the rest as needed. Combined with Server Components (which ship zero JS for
        server parts) and the Compiler, modern React apps can be remarkably lean on initial JS. Measuring and shrinking
        the initial bundle is one of the most impactful performance levers, because it affects every single
        first-time visit.</p>`,
      })}

      ${h.exercise({
        title: "Split a heavy feature",
        prompt: `<p>Find a heavy or rarely-used part of one of your apps (a chart, a rich editor, an admin section,
        a big library) and lazy-load it with <code>lazy</code> + <code>&lt;Suspense&gt;</code> (or a dynamic import in
        Next.js). Use the Network panel to confirm its chunk only downloads when the feature is opened. Add hover-
        preloading so it feels instant. Measure the initial bundle before and after.</p>`,
        runHint: "pnpm --filter next-saas build",
      })}
    </section>
  `,
});
