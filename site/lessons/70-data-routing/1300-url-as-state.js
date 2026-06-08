/* Lesson 70-data-routing/1300 — URL as state. */
registerLesson({
  meta: {
    id: "70-data-routing/1300-url-as-state",
    title: "The URL as State",
    part: "70-data-routing",
    estMinutes: 12,
    level: "advanced",
    project: "data-routing-app",
    lede: "A short but mindset-shifting lesson: a huge amount of what beginners store in useState belongs in the URL. Mastering URL state makes apps shareable, robust, and simpler all at once.",
    objectives: [
      "Identify state that belongs in the URL",
      "Manage search params as the source of truth",
      "Reap shareability, refresh-safety, and back/forward",
      "Avoid duplicating URL state in useState",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The question to ask</h2>
      <p>
        For every piece of state, ask: <strong>"If the user refreshed or shared this link, should this persist?"</strong>
        If yes, it belongs in the URL. Current page, active filters, sort order, selected tab, search query, an
        open item's id — these are almost always better as URL state than <code>useState</code>.
      </p>

      ${h.callout({
        kind: "principal",
        title: "Why the URL is the best store for navigational state",
        body: `<p>State in the URL is automatically: <strong>shareable</strong> (paste the link, your colleague
        sees the same filtered view), <strong>bookmarkable</strong>, <strong>refresh-safe</strong> (reload keeps
        you exactly where you were), <strong>back/forward-compatible</strong> (the browser's history just works),
        and <strong>debuggable</strong> (the state is right there in the address bar). No other store gives you all
        that for free. Beginners reach for <code>useState</code> reflexively and then bolt on broken approximations
        of these features; experienced engineers put navigational state in the URL first and get them by default.
        This single habit makes apps dramatically more usable.</p>`,
      })}

      ${h.codePane({
        lang: "tsx",
        title: "URL state with TanStack Router",
        check: false,
        readOnly: true,
        code: `// Define + validate the search params (from Lesson 3):
validateSearch: z.object({
  q: z.string().default(""),
  sort: z.enum(["salary", "title"]).default("title"),
  page: z.number().default(1),
}),

// Read them (typed) — the URL is the single source of truth:
const { q, sort, page } = route.useSearch();

// Update them = navigate:
navigate({ search: (prev) => ({ ...prev, page: prev.page + 1 }) });`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Don't mirror URL state into useState",
        body: `<p>A common mistake: read a search param into a <code>useState</code> "to work with it," then they
        drift apart (the URL says page 3, your state says page 1). The URL <strong>is</strong> the state — read it
        directly and write to it directly. Mirroring creates two sources of truth, exactly the bug Part 30 warned
        about. If you need derived values, compute them during render from the URL params.</p>`,
      })}

      ${h.callout({
        kind: "tip",
        title: "What does NOT belong in the URL",
        body: `<p>Not everything — ephemeral or sensitive UI state stays local: whether a tooltip is showing, an
        in-progress (unsubmitted) form's keystrokes, transient animation state, or anything secret. The URL is for
        state you'd want to <em>share or restore</em>. Use judgment: navigational and view-defining state →
        URL; momentary or private UI state → local.</p>`,
      })}

      ${h.exercise({
        title: "Move state into the URL",
        prompt: `<p>Audit the Job Board: any filter, sort, search, or pagination currently in <code>useState</code>
        should move to validated URL search params as the single source of truth. Test the payoff: apply some
        filters, copy the URL, open it in a new tab — you should land on the identical filtered view. Use back/
        forward and confirm it navigates filter states. Feel how much more "real" the app becomes.</p>`,
        runHint: "pnpm --filter data-routing-app dev",
      })}
    </section>
  `,
});
