/* Lesson 70-data-routing/1600 — Project: the full Job Board. */
registerLesson({
  meta: {
    id: "70-data-routing/1600-project-job-board",
    title: "Project: The Full Job Board",
    part: "70-data-routing",
    estMinutes: 60,
    level: "advanced",
    project: "data-routing-app",
    lede: "Bring Part 70 together into a complete, production-shaped client app: type-safe routing, server state with TanStack Query, URL-driven filters, a Zustand store, and a validated RHF + Zod form.",
    objectives: [
      "Integrate routing, server state, client state, and forms",
      "Apply the right tool to each kind of state",
      "Handle loading, error, and empty states throughout",
      "Ship a clean, lint-passing data-driven app",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The goal</h2>
      <p>
        A real Job Board: browse and search jobs (server state via Query), filter/sort/paginate via the URL,
        view typed detail pages with prefetching, save jobs to a persisted Zustand store, and post a new job
        through a validated RHF + Zod form that mutates and invalidates the cache.
      </p>

      ${h.callout({
        kind: "principal",
        title: "The architecture is the lesson",
        body: `<p>This project's value is wiring each kind of state to the <em>right</em> tool — the central skill
        of Part 70:</p>
        <ul>
          <li><strong>Server state</strong> (jobs, details) → <strong>TanStack Query</strong> (cache, loading/error, invalidation).</li>
          <li><strong>Navigational/filter state</strong> (search, sort, page, current job) → <strong>the URL</strong> (TanStack Router search params, validated by Zod).</li>
          <li><strong>Global client state</strong> (saved jobs) → <strong>Zustand</strong> (persisted).</li>
          <li><strong>Local UI state</strong> (is a menu open) → <strong>useState</strong>.</li>
          <li><strong>Form state + validation</strong> → <strong>React Hook Form + Zod</strong>.</li>
        </ul>
        <p>Notice there's almost no "global app state" in the old sense — Query + URL absorbed most of it. That's
        the modern architecture working.</p>`,
      })}

      <h2>Putting it together</h2>
      ${h.codePane({
        lang: "tsx",
        title: "The jobs page: every tool in its place",
        readOnly: true,
        code: `function JobsPage() {
  // URL = source of truth for filters (shareable, refresh-safe):
  const { q, sort, page } = jobsRoute.useSearch();
  const navigate = useNavigate();

  // Server state via Query, keyed by the URL params (cache per filter combo):
  const { data, isPending, isError } = useQuery({
    queryKey: ["jobs", { q, sort, page }],
    queryFn: () => fetchJobs({ q, sort, page }),
    placeholderData: keepPreviousData,  // no flicker when paging
  });

  // Global client state for saved jobs:
  const savedCount = useSaved((s) => s.ids.size);

  if (isPending) return <JobsSkeleton />;
  if (isError) return <ErrorState />;
  if (data.items.length === 0) return <EmptyState query={q} />;

  return (
    <>
      <Filters value={{ q, sort }} onChange={(next) =>
        navigate({ search: (p) => ({ ...p, ...next, page: 1 }) })} />
      <JobList jobs={data.items} />
      <Pagination page={page} total={data.total} />
    </>
  );
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Production-quality details to include",
        body: `<p>To make it real: handle <strong>loading/error/empty</strong> for every data view; <strong>prefetch</strong>
        detail pages on hover; <strong>validate</strong> URL params and form input with Zod; make filters
        <strong>shareable</strong> via the URL; <strong>persist</strong> saved jobs; keep components
        <strong>accessible</strong> (your Part 60 a11y habits); and let the <strong>React Compiler</strong> handle
        performance. Every one of these is a habit you've built — this project is where they all converge.</p>`,
      })}

      ${h.exercise({
        title: "Build and ship the Job Board",
        prompt: `<p>Complete the Job Board in <code>data-routing-app</code>: search + filters + sort + pagination
        driven by validated URL params; jobs and details via TanStack Query with prefetching and Suspense; a
        persisted Zustand saved-jobs store with a nav badge; and a "Post a Job" form with React Hook Form + Zod
        that mutates and invalidates. Handle every loading/error/empty state. Ensure <code>pnpm lint</code>,
        <code>pnpm typecheck</code>, and <code>pnpm build</code> pass, then commit.</p>`,
        runHint: "pnpm --filter data-routing-app build && pnpm --filter data-routing-app lint",
      })}

      ${h.callout({
        kind: "principal",
        title: "You can architect real client apps now",
        body: `<p>You've built a properly-architected, data-driven React application — routing, server state, client
        state, and forms each handled by the right tool, with every edge case covered. This is the shape of real
        front-end work. Next, Part 80 takes you full-stack with Next.js 16: Server Components, Server Actions, a
        database, and authentication — where many of these same patterns (Query, Zod, forms) move partly to the
        server. The client mastery you just earned is the foundation. 🔌→🗄️</p>`,
      })}
    </section>
  `,
});
