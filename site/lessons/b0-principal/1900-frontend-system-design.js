/* Lesson b0-principal/1900 — Frontend system design. */
registerLesson({
  meta: {
    id: "b0-principal/1900-frontend-system-design",
    title: "Frontend System Design",
    part: "b0-principal",
    estMinutes: 18,
    level: "principal",
    project: null,
    lede: "Designing a large frontend system — a feed, a chat, a collaborative editor, a dashboard — is the capstone skill of senior engineering and a staple of principal interviews. Learn the framework for approaching any of them.",
    objectives: [
      "Apply a structured system-design approach",
      "Reason about data flow, state, and performance at scale",
      "Make and defend architectural trade-offs",
      "Communicate a design clearly",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>What frontend system design is</h2>
      <p>
        Given an open-ended prompt — "design a Twitter feed," "design Google Docs," "design a notifications system" —
        you architect the frontend: components, data flow, state, API/real-time strategy, performance, edge cases, and
        trade-offs. It's the synthesis of everything in this course, and it's how senior/staff/principal candidates are
        evaluated (and how real ambitious features actually get planned).
      </p>

      ${h.callout({
        kind: "principal",
        title: "A repeatable framework",
        body: `<p>Approach any system-design prompt structurally: <strong>(1) Clarify requirements</strong> — functional
        (what it does) and non-functional (scale, latency, offline, devices, accessibility). Never start coding/drawing
        before scoping. <strong>(2) High-level architecture</strong> — component tree, data flow, client/server split.
        <strong>(3) Data model & API</strong> — what data, fetched how (REST/GraphQL/RSC), real-time needs (polling/
        WebSocket/SSE), caching. <strong>(4) State</strong> — apply the Part 70/B0 categorization (server/URL/global/
        local). <strong>(5) Performance & scale</strong> — virtualization, pagination, code splitting, optimistic UI,
        the rendering strategy. <strong>(6) Edge cases</strong> — loading/error/empty/offline, race conditions,
        accessibility, i18n. <strong>(7) Trade-offs</strong> — state them explicitly. This framework keeps you organized
        and demonstrates senior thinking.</p>`,
      })}

      <h2>Worked example: a real-time feed</h2>
      ${h.codePane({
        lang: "markdown",
        title: "Designing a social feed",
        readOnly: true,
        code: `Requirements: infinite feed, likes/comments, real-time updates, images, mobile.
Architecture:  Feed (virtualized list) → Post (memoized) → interactions.
Data:          cursor-paginated API (infinite query); WebSocket/SSE for new posts.
State:         server state → TanStack Query (cache, optimistic likes);
               feed scroll/position → local; current post → URL.
Performance:   virtualize the list; lazy-load images (next/image); optimistic
               likes; prefetch on scroll; code-split heavy media viewers.
Edge cases:    empty feed, load errors, offline (cached feed), new-post banner
               vs auto-insert (don't jump the user's scroll), duplicate posts.
Trade-offs:    WebSocket (instant, costly) vs polling (simpler, laggier);
               optimistic (snappy, needs rollback) vs pessimistic (simpler).`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Trade-offs are the whole point",
        body: `<p>There's no single "correct" design — senior engineering is about <strong>navigating trade-offs and
        justifying choices</strong> for the context. WebSocket vs polling, optimistic vs pessimistic, virtualization
        complexity vs simplicity, normalized vs nested cache, build-time vs runtime. The strong answer isn't "use X";
        it's "for these requirements, X because [reasons], accepting [costs], and I'd revisit if [conditions change]."
        Articulating trade-offs clearly — showing you see the whole landscape and chose deliberately — is exactly what
        distinguishes a principal engineer. The framework organizes your thinking; the trade-off reasoning demonstrates
        your judgment.</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Communication is half the skill",
        body: `<p>A great design poorly communicated fails — in interviews and in real RFCs (next lesson). Practice
        explaining your design clearly: start high-level, drill into the interesting parts, draw simple diagrams, state
        assumptions, and invite discussion. The ability to take a fuzzy prompt and produce a clear, well-reasoned,
        well-communicated architecture is the signature principal skill. It's also how big features actually get aligned
        on and built by teams.</p>`,
      })}

      ${h.exercise({
        title: "Design a system",
        prompt: `<p>Pick a non-trivial system — a chat app, a Kanban with real-time collaboration, an analytics
        dashboard, or a collaborative editor — and design its frontend using the 7-step framework. Write it up
        (1–2 pages) with a component diagram, data/state plan, performance strategy, edge cases, and explicit
        trade-offs. This is the exact deliverable expected of a senior engineer planning an ambitious feature — and a
        staple of principal-level interviews. Do a few of these and the skill becomes second nature.</p>`,
        runHint: "",
      })}
    </section>
  `,
});
