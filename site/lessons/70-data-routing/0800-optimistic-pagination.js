/* Lesson 70-data-routing/0800 — Optimistic updates, pagination & infinite queries. */
registerLesson({
  meta: {
    id: "70-data-routing/0800-optimistic-pagination",
    title: "Optimistic Updates, Pagination & Infinite Queries",
    part: "70-data-routing",
    estMinutes: 18,
    level: "advanced",
    project: "data-routing-app",
    lede: "The features that make data-heavy apps feel professional: instant optimistic mutations, paginated lists that don't flicker, and infinite-scroll feeds — all handled elegantly by TanStack Query.",
    objectives: [
      "Implement optimistic updates with rollback",
      "Paginate with placeholderData to avoid flicker",
      "Build infinite scroll with useInfiniteQuery",
      "Choose the right pattern for the UX",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Optimistic updates (Query's way)</h2>
      <p>
        Like React's <code>useOptimistic</code> (Part 50), Query can update the cache <em>before</em> the server
        confirms, then roll back on error — but at the cache level, so all components sharing that data update at
        once.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "Optimistic mutation with rollback",
        readOnly: true,
        code: `const mutation = useMutation({
  mutationFn: toggleFavorite,
  onMutate: async (jobId) => {
    await queryClient.cancelQueries({ queryKey: ["jobs"] });
    const previous = queryClient.getQueryData(["jobs"]);     // snapshot
    queryClient.setQueryData(["jobs"], (old) =>              // optimistic edit
      old.map((j) => j.id === jobId ? { ...j, fav: !j.fav } : j)
    );
    return { previous }; // context passed to onError
  },
  onError: (_err, _jobId, context) => {
    queryClient.setQueryData(["jobs"], context.previous);    // roll back
  },
  onSettled: () => queryClient.invalidateQueries({ queryKey: ["jobs"] }),
});`,
      })}

      ${h.callout({
        kind: "principal",
        title: "The cancel → snapshot → patch → rollback pattern",
        body: `<p>Optimistic cache updates follow a precise recipe: <strong>cancel</strong> in-flight refetches (so
        they don't overwrite your optimistic edit), <strong>snapshot</strong> the current data, <strong>patch</strong>
        the cache optimistically, <strong>roll back</strong> to the snapshot on error, and <strong>invalidate</strong>
        on settle to sync with the server's truth. It's more involved than React's <code>useOptimistic</code>, but
        it updates <em>every</em> component reading that cache and survives navigation. For simple single-component
        cases, <code>useOptimistic</code> is lighter; for shared server data, Query's approach is the tool.</p>`,
      })}

      <h2>Pagination without flicker</h2>
      ${h.codePane({
        lang: "tsx",
        title: "placeholderData keeps the old page visible",
        readOnly: true,
        code: `import { keepPreviousData } from "@tanstack/react-query";

const { data, isPlaceholderData } = useQuery({
  queryKey: ["jobs", { page }],
  queryFn: () => fetchJobs({ page }),
  placeholderData: keepPreviousData, // show page N while page N+1 loads
});
// Without this, paging blanks the list then re-shows it (jarring flicker).
// With it, the previous page stays until the next is ready. Smooth.`,
      })}

      <h2>Infinite scroll</h2>
      ${h.codePane({
        lang: "tsx",
        title: "useInfiniteQuery",
        readOnly: true,
        code: `const {
  data, fetchNextPage, hasNextPage, isFetchingNextPage,
} = useInfiniteQuery({
  queryKey: ["jobs", "infinite"],
  queryFn: ({ pageParam }) => fetchJobs({ cursor: pageParam }),
  initialPageParam: 0,
  getNextPageParam: (lastPage) => lastPage.nextCursor, // null = no more
});

// data.pages is an array of pages; flatten to render:
const jobs = data?.pages.flatMap((p) => p.items) ?? [];
// Call fetchNextPage() when a sentinel scrolls into view (IntersectionObserver).`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Pagination vs infinite scroll — a UX decision",
        body: `<p>Numbered <strong>pagination</strong> is better for findable, linkable content (search results,
        tables) where users want to jump and bookmark a page. <strong>Infinite scroll</strong> suits exploratory
        feeds (social, image galleries). Infinite scroll has real downsides — no footer access, hard to find a
        spot again, accessibility/performance concerns at scale (pair with virtualization, Part B0). Choose based
        on the content and user goal, not novelty. Query supports both cleanly; the harder part is the UX
        judgment.</p>`,
      })}

      ${h.exercise({
        title: "Add paging and an optimistic toggle",
        prompt: `<p>In the Job Board: add a "favorite" toggle implemented as an <strong>optimistic</strong> Query
        mutation (cancel → snapshot → patch → rollback → invalidate). Then add pagination to the jobs list using
        <code>keepPreviousData</code> so paging doesn't flicker. (Stretch: build an infinite-scroll variant with
        <code>useInfiniteQuery</code> + an <code>IntersectionObserver</code> sentinel.) Compare how each feels.</p>`,
        runHint: "pnpm --filter data-routing-app dev",
      })}
    </section>
  `,
});
