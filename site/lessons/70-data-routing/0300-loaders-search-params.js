/* Lesson 70-data-routing/0300 — Loaders, search params, nested layouts. */
registerLesson({
  meta: {
    id: "70-data-routing/0300-loaders-search-params",
    title: "Loaders, Search Params & Nested Layouts",
    part: "70-data-routing",
    estMinutes: 17,
    level: "advanced",
    project: "data-routing-app",
    lede: "The features that make a router powerful: loading data before a route renders, managing the query string as typed state, and composing shared layouts. These eliminate loading waterfalls and messy state.",
    objectives: [
      "Load route data with loaders (avoiding waterfalls)",
      "Read and write typed search params",
      "Compose nested layouts with outlets",
      "Keep filters and sorting in the URL",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Loaders: fetch before render</h2>
      <p>
        A route <strong>loader</strong> fetches the route's data <em>as navigation begins</em>, in parallel with
        rendering — so data is often ready by the time the component shows, avoiding the "render, then start
        fetching, then show spinner" waterfall of the naive <code>useEffect</code> approach (Part 30).
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "A route loader",
        readOnly: true,
        code: `const jobRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jobs/$jobId",
  // Loader runs when navigation to this route starts:
  loader: ({ params }) => fetchJob(Number(params.jobId)),
  component: JobDetail,
});

function JobDetail() {
  const job = jobRoute.useLoaderData(); // data is already here, typed
  return <h1>{job.title}</h1>;
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Loaders kill waterfalls",
        body: `<p>With component-level fetching, a parent renders → its child renders → <em>then</em> the child
        starts fetching — each step adds latency (a waterfall). Loaders let the router kick off data fetching for
        the whole matched route tree <strong>in parallel, immediately</strong>. Pair loaders with TanStack
        Query (next lessons) and you get parallel loading <em>plus</em> caching. Eliminating waterfalls is one
        of the highest-impact performance wins in real apps, and route-level loaders are how modern routers
        (TanStack, React Router, Next.js) make it the default.</p>`,
      })}

      <h2>Search params as typed state</h2>
      <p>The query string (<code>?sort=salary&remote=true</code>) is perfect for filters, sorting, and
      pagination — it's shareable and survives reloads. TanStack Router makes it typed and validated:</p>

      ${h.codePane({
        lang: "tsx",
        title: "Validated search params",
        readOnly: true,
        code: `import { z } from "zod";

const jobsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jobs",
  // Validate + type the search params (invalid values get defaults):
  validateSearch: z.object({
    sort: z.enum(["salary", "title"]).default("title"),
    remote: z.boolean().default(false),
  }),
  component: JobsPage,
});

function JobsPage() {
  const { sort, remote } = jobsRoute.useSearch(); // fully typed
  const navigate = useNavigate();
  // Update a filter = update the URL:
  const setSort = (s: "salary" | "title") =>
    navigate({ search: (prev) => ({ ...prev, sort: s }) });
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Filters belong in the URL",
        body: `<p>Storing sort/filter/page in <code>useState</code> means a refresh loses them and you can't share
        a filtered view. Storing them in <strong>search params</strong> makes the view shareable, bookmarkable,
        and back/forward-friendly — and TanStack Router validates them with Zod so bad URLs can't crash you. This
        is the "URL is state" principle made concrete. Whenever you build a filterable list, default to URL
        search params over local state.</p>`,
      })}

      <h2>Nested layouts</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Layouts via Outlet",
        readOnly: true,
        code: `// The root route renders persistent chrome and an outlet for children:
function Root() {
  return (
    <div>
      <Nav />
      <main><Outlet /></main>   {/* the matched child route renders here */}
    </div>
  );
}
// You can nest further: a /jobs layout with its own sidebar wrapping
// /jobs (list) and /jobs/$jobId (detail). Layouts compose like components.`,
      })}

      ${h.exercise({
        title: "Add URL-driven filtering",
        prompt: `<p>Add typed search params to the Job Board's <code>/jobs</code> route: a <code>sort</code>
        (salary/title) and a <code>remoteOnly</code> boolean, validated with Zod. Wire filter controls that
        update the URL via <code>navigate({ search })</code>, and filter/sort the list from
        <code>useSearch()</code>. Confirm that reloading the page or copying the URL preserves the filters. Add a
        loader to prefetch the jobs. You've built shareable, refresh-proof filtering.</p>`,
        runHint: "pnpm --filter data-routing-app dev",
      })}
    </section>
  `,
});
