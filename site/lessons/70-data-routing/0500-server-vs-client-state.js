/* Lesson 70-data-routing/0500 — Server state vs client state. */
registerLesson({
  meta: {
    id: "70-data-routing/0500-server-vs-client-state",
    title: "Server State vs Client State",
    part: "70-data-routing",
    estMinutes: 13,
    level: "advanced",
    project: "data-routing-app",
    lede: "The most clarifying distinction in front-end architecture: data that lives on a server is fundamentally different from data your UI owns. Confusing the two is the root of most state-management pain.",
    objectives: [
      "Distinguish server state from client state",
      "Understand why each needs different tools",
      "Stop putting server data in useState/Redux",
      "Set up the case for TanStack Query",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Two completely different kinds of state</h2>
      <ul>
        <li><strong>Server state</strong> — data that lives on a server and you <em>borrow</em>: the list of
        jobs, a user's profile, search results. You don't own it; it can change without you; it can be stale;
        fetching it is async and can fail.</li>
        <li><strong>Client state</strong> — data your UI <em>owns</em>: is the menu open, the current form input,
        the selected tab, the theme. It's synchronous, always available, and only you change it.</li>
      </ul>

      ${h.callout({
        kind: "principal",
        title: "This distinction reorganizes everything",
        body: `<p>For years, teams dumped <em>all</em> state into one bucket (Redux), then wrote mountains of
        boilerplate to fetch, cache, and sync server data manually — loading flags, error flags, refetch logic,
        cache invalidation, all by hand. The insight that <strong>server state is a fundamentally different
        problem</strong> — it's a <em>cache</em> of remote data, not local UI state — led to dedicated tools
        (TanStack Query) that handle it brilliantly, leaving client-state libraries (Zustand) to do the small
        job they're actually good at. Recognizing which kind of state you have tells you which tool to reach
        for. This is one of the highest-leverage mental models in front-end engineering.</p>`,
      })}

      <h2>Why server state is hard</h2>
      <p>Borrowed remote data brings problems local state never has:</p>
      <ul>
        <li>It's <strong>asynchronous</strong> — loading and error states everywhere.</li>
        <li>It can be <strong>stale</strong> — the server's copy may have changed since you fetched.</li>
        <li>It needs <strong>caching</strong> — don't re-fetch the same data on every render or navigation.</li>
        <li>It needs <strong>deduping</strong> — two components wanting the same data shouldn't make two requests.</li>
        <li>It needs <strong>invalidation</strong> — after a mutation, refetch what changed.</li>
        <li>It benefits from <strong>background refetching</strong> — keep it fresh on focus/reconnect.</li>
      </ul>

      ${h.callout({
        kind: "gotcha",
        title: "Don't manage server state with useState/useEffect/Redux",
        body: `<p>The Part 30 pattern (<code>useEffect</code> + three <code>useState</code>s per fetch) and "put
        the API response in Redux" both reimplement caching, deduping, and invalidation badly, by hand, in every
        component. It's a huge amount of fragile code. The fix isn't more discipline — it's the <em>right
        tool</em>. That tool is TanStack Query, and the rest of this part's data lessons are about it.</p>`,
      })}

      <h2>The modern division of labor</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Right tool for each kind",
        readOnly: true,
        code: `// SERVER state → TanStack Query (cache, loading, refetch, invalidation):
const { data: jobs } = useQuery({ queryKey: ["jobs"], queryFn: fetchJobs });

// CLIENT state → useState / Zustand / URL (small, synchronous, yours):
const [isFilterOpen, setFilterOpen] = useState(false);
const { sort } = useSearch(); // URL state for filters`,
      })}

      ${h.callout({
        kind: "principal",
        body: `<p>A surprising consequence: once TanStack Query owns server state and the URL owns navigation/
        filter state, the amount of "global client state" you actually need shrinks dramatically — often to just
        a few UI flags. Many apps that used to need Redux for "everything" now need almost no global client
        state at all. We'll prove this as the part unfolds.</p>`,
      })}

      ${h.exercise({
        title: "Categorize your state",
        prompt: `<p>For the Job Board (and your earlier projects), list every piece of state and label each as
        <strong>server</strong> (jobs, job details, search results) or <strong>client</strong> (is a modal open,
        form inputs, selected sort). Notice how much is actually server state — and how that's exactly what
        you've been hand-managing with <code>useEffect</code>. Next lesson, TanStack Query takes it over.</p>`,
        runHint: "",
      })}
    </section>
  `,
});
