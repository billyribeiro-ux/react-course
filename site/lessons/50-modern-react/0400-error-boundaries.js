/* Lesson 50-modern-react/0400 — Error boundaries. */
registerLesson({
  meta: {
    id: "50-modern-react/0400-error-boundaries",
    title: "Error Boundaries",
    part: "50-modern-react",
    estMinutes: 14,
    level: "advanced",
    project: "vite-hooks-lab",
    lede: "When a component throws during render, an Error Boundary catches it and shows a fallback instead of crashing the whole app. Pairing them with Suspense gives you the complete loading/error/success story declaratively.",
    objectives: [
      "Catch render errors with an Error Boundary",
      "Use react-error-boundary for a clean API",
      "Pair error and Suspense boundaries",
      "Decide where to place boundaries",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The problem</h2>
      <p>
        If a component throws while rendering and nothing catches it, React unmounts the whole tree — a blank
        white screen. An <strong>Error Boundary</strong> is a component that catches errors from its children
        and renders a fallback UI instead, containing the damage to one region.
      </p>

      ${h.callout({
        kind: "note",
        title: "Use the library, skip the class",
        body: `<p>Error boundaries are the one feature that still technically requires a class component (React
        hasn't shipped a hook version yet). Rather than write the class by hand, use the small, well-typed
        <strong><code>react-error-boundary</code></strong> package — it's the community standard and gives you
        a clean component + hooks API.</p>`,
      })}

      ${h.codePane({
        lang: "tsx",
        title: "react-error-boundary",
        readOnly: true,
        code: `import { ErrorBoundary } from "react-error-boundary";

function Fallback({ error, resetErrorBoundary }: {
  error: Error; resetErrorBoundary: () => void;
}) {
  return (
    <div role="alert">
      <p>Something went wrong: {error.message}</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={Fallback}
      onError={(error) => logToSentry(error)}   // report it (Part 80/B0)
    >
      <RecipeBoard />
    </ErrorBoundary>
  );
}`,
      })}

      <h2>The full pattern: Error + Suspense together</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Loading, error, and success — declaratively",
        readOnly: true,
        code: `<ErrorBoundary FallbackComponent={Fallback}>
  <Suspense fallback={<Spinner />}>
    <Recipes />   {/* suspends while loading, throws on failure */}
  </Suspense>
</ErrorBoundary>
// Loading → Suspense fallback. Error → ErrorBoundary fallback.
// Success → the component. All three states, no isLoading/error flags.`,
      })}

      ${h.callout({
        kind: "principal",
        title: "This is the modern data-UI pattern",
        body: `<p>Compare this to the manual four-state component from Part 30. Here, loading and error are
        <em>declared as boundaries</em> rather than coded as branches in every component. Your data components
        just read data (with <code>use()</code> or a library) and render the happy path; the boundaries handle
        the rest. This separation — happy path in the component, edge cases in boundaries — scales beautifully
        and is how production React 19 apps are structured.</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "What error boundaries do NOT catch",
        body: `<p>Error boundaries catch errors during <strong>rendering</strong>. They do <em>not</em> catch
        errors in event handlers, async code (<code>setTimeout</code>, promises), or the server during SSR —
        those you handle with <code>try/catch</code> where they occur. So you still need normal error handling
        in handlers; boundaries are specifically for render-time failures.</p>`,
      })}

      <h2>Where to place boundaries</h2>
      ${h.callout({
        kind: "principal",
        body: `<p>Place an error boundary at each level where you want to <em>contain</em> failure: a
        top-level one so the whole app never goes fully blank, plus granular ones around independent features
        (a broken widget shouldn't take down the page). And always <strong>report</strong> caught errors to an
        observability tool (Sentry, Part B0) via <code>onError</code> — a swallowed error users hit silently is
        worse than a crash you can see. Resilience plus visibility is the principal standard.</p>`,
      })}

      ${h.exercise({
        title: "Make your app crash-proof",
        prompt: `<p>Install <code>react-error-boundary</code> in <code>vite-hooks-lab</code>. Wrap your Kanban
        board in an <code>&lt;ErrorBoundary&gt;</code> with a friendly fallback and a "try again" reset. Add a
        component that deliberately throws when given bad data, and confirm only that region shows the fallback
        while the rest of the app keeps working. Add an <code>onError</code> that <code>console.error</code>s
        (stand-in for Sentry).</p>`,
        runHint: "pnpm --filter vite-hooks-lab dev",
      })}
    </section>
  `,
});
