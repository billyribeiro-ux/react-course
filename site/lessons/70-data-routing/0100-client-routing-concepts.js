/* Lesson 70-data-routing/0100 — Client routing concepts. */
registerLesson({
  meta: {
    id: "70-data-routing/0100-client-routing-concepts",
    title: "Client-Side Routing Concepts",
    part: "70-data-routing",
    estMinutes: 14,
    level: "intermediate",
    project: "data-routing-app",
    lede: "Real apps have multiple pages, but React itself has no routing. A router maps URLs to components and lets you navigate without full page reloads. Understand the model before picking a library.",
    objectives: [
      "Understand single-page-app navigation",
      "Map URLs to components conceptually",
      "Know the pieces: routes, links, params, nested layouts",
      "See why URL-as-state matters",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>What a router does</h2>
      <p>
        In a traditional website, clicking a link makes the browser request a whole new HTML page. In a
        React <strong>single-page app (SPA)</strong>, the page never fully reloads — a <strong>router</strong>
        watches the URL and swaps which components render, updating the address bar via the browser's History
        API. Navigation feels instant because no new document is fetched.
      </p>

      ${h.callout({
        kind: "principal",
        title: "The URL is application state",
        body: `<p>A crucial mental shift: the <strong>URL is a piece of state</strong> — arguably your most
        important one. <code>/jobs/3?sort=salary</code> encodes "which job, what sort." Putting state in the
        URL makes it <strong>shareable</strong> (send a link), <strong>bookmarkable</strong>,
        <strong>refreshable</strong> (reload keeps you in place), and gives you <strong>back/forward</strong> for
        free. Beginners stuff everything in <code>useState</code>; experienced engineers ask "should this live
        in the URL?" first. Routing is really URL-state management.</p>`,
      })}

      <h2>The pieces every router has</h2>
      <ul>
        <li><strong>Routes</strong> — map a URL path to a component: <code>/jobs</code> → <code>&lt;JobsPage/&gt;</code>.</li>
        <li><strong>Links</strong> — navigate without reload: a <code>&lt;Link&gt;</code> instead of <code>&lt;a&gt;</code>.</li>
        <li><strong>Params</strong> — dynamic segments: <code>/jobs/$jobId</code> captures the id.</li>
        <li><strong>Search params</strong> — the query string: <code>?sort=salary&remote=true</code>.</li>
        <li><strong>Nested layouts</strong> — shared chrome (nav, sidebar) wrapping child routes via an outlet.</li>
        <li><strong>Loaders</strong> — fetch a route's data <em>before</em> it renders (modern routers).</li>
      </ul>

      ${h.codePane({
        lang: "tsx",
        title: "The shape of routing (TanStack Router)",
        readOnly: true,
        code: `// A route maps a path to a component:
const jobsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jobs",
  component: JobsPage,
});

// A Link navigates client-side (no reload):
<Link to="/jobs/$jobId" params={{ jobId: "3" }}>View job</Link>

// The root layout renders shared chrome + an <Outlet/> for children:
function Root() {
  return <div><Nav /><main><Outlet /></main></div>;
}`,
      })}

      <h2>The landscape in 2026</h2>
      ${h.callout({
        kind: "principal",
        body: `<p>Three serious choices: <strong>TanStack Router</strong> (best-in-class type safety, this
        part's focus), <strong>React Router v7</strong> (the merged Remix line, great for full-stack), and
        framework-built-in routing like <strong>Next.js</strong>'s file-based App Router (Part 80). For SPAs
        where type-safe URLs and data loading matter, TanStack Router is exceptional; for full-stack apps you'll
        often use a framework's router. We teach TanStack Router deeply and contrast React Router so you can
        choose well. The <em>concepts</em> — routes, params, nested layouts, loaders — transfer across all of
        them.</p>`,
      })}

      ${h.exercise({
        title: "Explore the Job Board's routes",
        prompt: `<p>Run <code>pnpm --filter data-routing-app dev</code> and explore the scaffolded app. Open
        <code>src/router.tsx</code> and trace how each route maps a path to a page component, how the root route
        renders shared nav + an <code>&lt;Outlet/&gt;</code>, and how the dynamic <code>/jobs/$jobId</code> route
        is declared. Click around and watch the URL change without full reloads (no browser spinner). You're
        looking at the skeleton you'll flesh out this part.</p>`,
        runHint: "pnpm --filter data-routing-app dev",
      })}
    </section>
  `,
});
