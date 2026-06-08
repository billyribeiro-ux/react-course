/* Lesson b0-principal/1700 — Rendering strategies decision guide. */
registerLesson({
  meta: {
    id: "b0-principal/1700-rendering-strategies",
    title: "Rendering Strategies: A Decision Guide",
    part: "b0-principal",
    estMinutes: 14,
    level: "principal",
    project: "next-saas",
    lede: "CSR, SSR, SSG, ISR, RSC, PPR, streaming — a confusing alphabet soup. This lesson is the unifying decision framework: given a page's requirements, which rendering strategy is right, and why.",
    objectives: [
      "Understand each rendering strategy's trade-offs",
      "Map page requirements to a strategy",
      "Reason about performance, freshness, and cost",
      "Make and defend rendering decisions",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The strategies, summarized</h2>
      <ul>
        <li><strong>CSR</strong> (Client-Side Rendering) — ship JS, render in the browser. Simple SPAs; bad initial load & SEO.</li>
        <li><strong>SSR</strong> (Server-Side Rendering) — render HTML per request. Fresh, personalized, good SEO; costs server time.</li>
        <li><strong>SSG</strong> (Static Site Generation) — render HTML at build, serve from CDN. Fastest & cheapest; not personalized/real-time.</li>
        <li><strong>ISR</strong> — SSG that regenerates periodically. Static speed + occasional freshness.</li>
        <li><strong>RSC</strong> (React Server Components) — render components on the server, ship zero JS for them. Less JS, direct data, security.</li>
        <li><strong>PPR</strong> (Partial Prerendering) — static shell + streamed dynamic holes. Best of static + dynamic on one page.</li>
        <li><strong>Streaming</strong> — send HTML progressively as data resolves. Faster perceived load.</li>
      </ul>

      ${h.callout({
        kind: "principal",
        title: "The decision framework",
        body: `<p>Don't memorize acronyms — reason from the page's requirements with three questions: <strong>(1) Is the
        content the same for everyone?</strong> If yes → static (SSG); add <strong>ISR</strong> if it changes
        periodically. <strong>(2) Is it personalized or real-time?</strong> → dynamic (SSR/RSC); isolate the dynamic
        parts as <strong>PPR</strong> holes within an otherwise static page. <strong>(3) How important are SEO and fast
        first paint?</strong> High → render on the server (SSR/SSG/RSC), not client-only CSR. The meta-principle:
        <strong>maximize what can be static/cached</strong> (fast, cheap, scalable) and <strong>isolate the genuinely
        dynamic</strong>. Modern frameworks (Next.js) let you mix strategies <em>per route and per component</em> —
        which is the whole point.</p>`,
      })}

      <h2>Worked examples</h2>
      ${h.codePane({
        lang: "markdown",
        title: "Strategy by page type",
        readOnly: true,
        code: `Marketing homepage      → SSG (static, CDN, instant, great SEO)
Blog post               → SSG or ISR (static; ISR if edited occasionally)
Product page (catalog)  → ISR (static-fast, refreshed on price/stock changes)
  ...with a live "X in cart" badge → PPR (static shell + dynamic hole)
User dashboard          → SSR/RSC (personalized, per-request, behind auth)
Highly interactive tool → CSR/SPA islands (client-heavy, post-login, SEO N/A)
Search results          → SSR (fresh, query-dependent) + streaming`,
      })}

      ${h.callout({
        kind: "principal",
        title: "This decision is a recurring senior conversation",
        body: `<p>"How should we render this?" comes up constantly, and the right answer depends on freshness needs,
        personalization, SEO, traffic, and cost. A principal engineer reasons through the trade-offs and makes a
        defensible call — and revisits it as requirements change (a page that was static may need to become PPR when a
        personalized element is added). Being able to explain <em>why</em> a page uses a given strategy — not just
        "Next.js does it" — is exactly the architectural judgment expected at senior levels. The framework above is the
        tool; the judgment is yours.</p>`,
      })}

      ${h.exercise({
        title: "Choose strategies for a product",
        prompt: `<p>For a product with these pages — homepage, pricing, blog, docs, user dashboard, a real-time
        notifications panel, and a search page — assign each a rendering strategy and justify it using the three-question
        framework. Then audit LaunchPad: is each route using the optimal strategy? Adjust one (e.g. make a static page
        PPR, or a CSR page server-rendered) and verify via the build output. This is the architectural reasoning that
        defines senior front-end work.</p>`,
        runHint: "pnpm --filter next-saas build",
      })}
    </section>
  `,
});
