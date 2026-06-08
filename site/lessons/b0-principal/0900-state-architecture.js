/* Lesson b0-principal/0900 — State architecture at scale. */
registerLesson({
  meta: {
    id: "b0-principal/0900-state-architecture",
    title: "State Architecture at Scale",
    part: "b0-principal",
    estMinutes: 15,
    level: "principal",
    project: "next-saas",
    lede: "In a large app, where each piece of state lives — and how data flows — determines whether the codebase stays comprehensible or becomes a tangle. A principal's framework for organizing state across a whole product.",
    objectives: [
      "Categorize state by kind and choose the right tool",
      "Minimize and colocate state deliberately",
      "Design clear data flow at scale",
      "Avoid the common state anti-patterns",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The state taxonomy (the master framework)</h2>
      <p>Every piece of state in any app falls into one of these — and each has a best-fit tool:</p>
      <ul>
        <li><strong>Server state</strong> (data borrowed from a backend) → <strong>TanStack Query</strong> / RSC fetching. Never hand-manage in a store.</li>
        <li><strong>URL state</strong> (navigation, filters, the current entity) → <strong>the router / search params</strong>.</li>
        <li><strong>Global client state</strong> (cart, theme, cross-tree UI) → <strong>Zustand / Jotai / Context</strong>.</li>
        <li><strong>Local UI state</strong> (a dropdown open, form drafts) → <strong>useState / useReducer</strong>.</li>
        <li><strong>Form state</strong> → <strong>React Hook Form + Zod</strong>.</li>
        <li><strong>Derived state</strong> → <strong>compute during render</strong> (never store).</li>
      </ul>

      ${h.callout({
        kind: "principal",
        title: "Most 'state management' problems are categorization problems",
        body: `<p>The single most clarifying realization (built up across Parts 70 and on): teams that struggle with
        state usually <strong>mis-categorized</strong> it — they put server data in Redux and hand-synced it, kept
        filter state in component state instead of the URL, stored derived values that drift out of sync, or hoisted
        everything to a global store. Once each piece is in its correct category with its proper tool, "state
        management" mostly dissolves. The principal skill isn't mastering one library — it's <strong>routing each piece
        of state to its right home</strong>. Do that, and even huge apps stay tractable.</p>`,
      })}

      <h2>Minimize and colocate</h2>
      ${h.callout({
        kind: "principal",
        title: "The least state in the lowest place",
        body: `<p>Two reinforcing principles: <strong>minimize</strong> (derive everything you can; every stored value
        is a thing that can desync) and <strong>colocate</strong> (keep state as low/local as possible; lift only when
        genuinely shared — Part 30). At scale, over-globalizing state is the cardinal sin: it couples unrelated features,
        causes wide re-renders, and makes the app hard to reason about. The best large-app architectures have
        surprisingly little global state — most lives close to where it's used, with Query and the URL absorbing the
        rest. "Global by default" is a smell; "local until proven shared" is the discipline.</p>`,
      })}

      <h2>Event-driven and unidirectional flow</h2>
      ${h.callout({
        kind: "principal",
        title: "One direction, clear ownership",
        body: `<p>Keep data flow <strong>unidirectional and ownership clear</strong>: one source of truth per piece of
        state, data flowing down, events flowing up (Part 30) — at the scale of a whole app, not just a component. For
        complex domains, an <strong>event-driven</strong> model (components dispatch "what happened" — like reducers/
        Redux, Part 40/70 — rather than imperatively setting scattered state) keeps logic centralized and auditable. The
        goal is that anyone can answer "where does this value come from and who can change it?" instantly. When that
        answer is murky, bugs and fear follow. Clear ownership is the foundation of a maintainable large codebase.</p>`,
      })}

      ${h.exercise({
        title: "Audit and architect",
        prompt: `<p>Take LaunchPad (or a larger imagined app) and write a <strong>state map</strong>: list every piece of
        state and categorize each (server/URL/global-client/local/form/derived) with its assigned tool. Find any
        miscategorizations — server data in a store, filters in useState that should be in the URL, stored derived
        values — and note the fix. This audit <em>is</em> state architecture, and doing it well is a principal-level
        deliverable.</p>`,
        runHint: "pnpm --filter next-saas dev",
      })}
    </section>
  `,
});
