/* Lesson 80-nextjs/1500 — PPR & rendering strategies. */
registerLesson({
  meta: {
    id: "80-nextjs/1500-ppr-rendering-strategies",
    title: "Partial Prerendering & Rendering Strategies",
    part: "80-nextjs",
    estMinutes: 15,
    level: "advanced",
    project: "next-saas",
    lede: "The full picture of how Next renders: static, dynamic, ISR, and the newest model — Partial Prerendering — which gives one page a static shell with dynamic holes. Choosing well is a performance superpower.",
    objectives: [
      "Map the rendering strategies (SSG/SSR/ISR/PPR)",
      "Understand Partial Prerendering",
      "Choose the right strategy per route",
      "Optimize the static/dynamic split",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The rendering strategies, unified</h2>
      <ul>
        <li><strong>Static (SSG)</strong> — rendered at build, served from CDN. Fastest. For content that's the same for everyone (marketing, docs, blog).</li>
        <li><strong>Dynamic (SSR)</strong> — rendered per request on the server. For personalized/real-time content (dashboards).</li>
        <li><strong>ISR (Incremental Static Regeneration)</strong> — static, but regenerated in the background on a schedule (<code>revalidate</code>). For content that changes occasionally but is the same for everyone (a product page, Lesson 17).</li>
        <li><strong>PPR (Partial Prerendering)</strong> — one page that's <em>mostly static</em> with <em>dynamic holes</em>. The newest, best-of-both model.</li>
      </ul>

      <h2>Partial Prerendering (PPR)</h2>
      <p>
        PPR's insight: most pages are mostly static (layout, nav, hero) with a few dynamic bits (the user's name,
        a cart count, live data). PPR serves the <strong>static shell instantly from the CDN</strong>, then
        <strong>streams in the dynamic parts</strong> — wrapped in Suspense — without making the whole page
        dynamic.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "A PPR page: static shell, dynamic holes",
        readOnly: true,
        code: `import { Suspense } from "react";

export default function ProductPage() {
  return (
    <>
      <Header />                    {/* static — instant from CDN */}
      <ProductDetails />            {/* static */}
      <Suspense fallback={<PriceSkeleton />}>
        <LivePrice />               {/* DYNAMIC hole — streams in per request */}
      </Suspense>
      <Suspense fallback={<CartSkeleton />}>
        <UserCart />                {/* DYNAMIC hole — personalized */}
      </Suspense>
    </>
  );
}
// The shell is prerendered; only the Suspense holes are dynamic.`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Why PPR is a big deal",
        body: `<p>Before PPR, a single dynamic element (the logged-in user's name in the header) forced the
        <em>entire</em> page to render dynamically, losing CDN-speed static delivery. PPR breaks that
        all-or-nothing trade-off: you get the instant first paint of a static page <em>and</em> the personalization
        of dynamic rendering, on the same page. The static shell ships in milliseconds; dynamic holes stream in.
        This is arguably the most important rendering advance in years, and it's why thinking in terms of "what's
        static vs dynamic on this page" (and wrapping dynamic bits in Suspense) is the modern performance skill.</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Choosing a strategy — a decision guide",
        body: `<p>Ask: <em>"Is this content the same for everyone?"</em> If yes and it rarely changes →
        <strong>static</strong>. If yes but changes periodically → <strong>ISR</strong>. If it's personalized or
        real-time → <strong>dynamic</strong>, ideally as <strong>PPR holes</strong> within an otherwise static
        page. The goal is always to maximize what can be static/cached (speed + low cost) while isolating the
        genuinely dynamic parts. This per-route, per-component reasoning is exactly what separates a fast, cheap
        app from a slow, expensive one — and it's a recurring principal-level conversation.</p>`,
      })}

      ${h.exercise({
        title: "Optimize LaunchPad's rendering",
        prompt: `<p>For each LaunchPad route, decide and configure its strategy: marketing pages static, a
        public pricing page perhaps ISR, the dashboard dynamic. On one page (e.g. a project detail with a static
        shell but a live "activity" widget), apply PPR by wrapping the dynamic widget in <code>&lt;Suspense&gt;</code>
        within an otherwise static page. Run <code>pnpm build</code> and read which routes are marked static (○),
        dynamic (ƒ), or partially prerendered. Understanding that output is real Next.js fluency.</p>`,
        runHint: "pnpm --filter next-saas build",
      })}
    </section>
  `,
});
