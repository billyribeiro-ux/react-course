/* Lesson 70-data-routing/0600 — TanStack Query: queries, caching, keys. */
registerLesson({
  meta: {
    id: "70-data-routing/0600-tanstack-query-basics",
    title: "TanStack Query: Queries, Caching & Keys",
    part: "70-data-routing",
    estMinutes: 18,
    level: "advanced",
    project: "data-routing-app",
    lede: "TanStack Query is the industry-standard tool for server state. With one useQuery call you get loading and error states, caching, deduping, and background refetching — replacing dozens of lines of manual code.",
    objectives: [
      "Fetch data with useQuery",
      "Understand query keys and the cache",
      "Configure staleTime and refetching",
      "Read query status correctly",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>One hook, everything handled</h2>
      <p>
        You provide a <strong>query key</strong> (a unique id for this data) and a <strong>query function</strong>
        (how to fetch it). TanStack Query gives you the data plus loading/error status — and caches the result,
        dedupes concurrent requests, and refetches in the background to keep it fresh.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "useQuery",
        readOnly: true,
        code: `import { useQuery } from "@tanstack/react-query";

function JobsPage() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["jobs"],        // the cache key
    queryFn: fetchJobs,        // returns a Promise<Job[]>
  });

  if (isPending) return <Spinner />;
  if (isError) return <p>Error: {error.message}</p>;
  return <JobList jobs={data} />; // data is typed Job[] here
}
// Compare this to the Part 30 useEffect version — and this also caches,
// dedupes, retries, and refetches. Dozens of lines became four.`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Query keys are the cache",
        body: `<p>The <code>queryKey</code> uniquely identifies a piece of server data in the cache. Two
        components using <code>["jobs"]</code> share one cached result and one network request (deduping). Keys
        are arrays so you can include variables: <code>["jobs", { remote: true }]</code> or
        <code>["job", jobId]</code> — change a key and it's a different cache entry that refetches. Designing good,
        hierarchical query keys is the core skill of using Query well; they're how you later <em>invalidate</em>
        exactly the right data after a mutation. Think of keys as the addresses of your cached server state.</p>`,
      })}

      <h2>Keys with variables</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Parameterized queries",
        readOnly: true,
        code: `// Each job id is cached separately and refetched when the id changes:
const { data: job } = useQuery({
  queryKey: ["job", jobId],
  queryFn: () => fetchJob(jobId),
});

// Filters in the key → changing filters fetches (and caches) per combination:
const { data } = useQuery({
  queryKey: ["jobs", { remote, sort }],
  queryFn: () => fetchJobs({ remote, sort }),
});`,
      })}

      <h2>Freshness: staleTime & background refetching</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Tuning freshness",
        readOnly: true,
        code: `const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,   // data is "fresh" 30s; no refetch within that window
      // After staleTime, Query refetches in the BACKGROUND on:
      //   - component mount, window refocus, network reconnect
      // ...and shows the cached data instantly while it does (no spinner flash).
    },
  },
});`,
      })}

      ${h.callout({
        kind: "principal",
        title: "stale-while-revalidate, for free",
        body: `<p>Query's default behavior is "show cached data instantly, refetch in the background, swap in
        fresh data seamlessly." Navigate to a page you visited before and it appears <em>immediately</em> (from
        cache) while quietly updating. This stale-while-revalidate model gives apps a fast, native feel with zero
        effort from you. Tuning <code>staleTime</code> (how long data is trusted) vs the default 0 is the main
        knob: longer for slow-changing data, short/zero for fast-changing. Understanding this lifecycle is what
        separates "using Query" from "using Query well."</p>`,
      })}

      ${h.callout({
        kind: "tip",
        title: "The DevTools are essential",
        body: `<p>Add <code>&lt;ReactQueryDevtools /&gt;</code> (installed in this project) to <em>see</em> your
        cache: every query, its key, status (fresh/stale/fetching), and data. It makes the cache concrete and is
        invaluable for debugging. Open it as you build.</p>`,
      })}

      ${h.exercise({
        title: "Query the Job Board",
        prompt: `<p>The Job Board already uses <code>useQuery</code> for the jobs list and detail. Add the React
        Query Devtools and watch the cache as you navigate. Experiment: set <code>staleTime</code> to 0 vs 60s and
        observe refetch-on-focus behavior. Add a query with a parameterized key (jobs filtered by remote) and
        confirm each filter combination caches separately. Make the detail page instant on revisit by ensuring it
        shares the cache.</p>`,
        runHint: "pnpm --filter data-routing-app dev",
      })}
    </section>
  `,
});
