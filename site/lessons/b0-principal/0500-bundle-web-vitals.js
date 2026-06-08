/* Lesson b0-principal/0500 — Bundle analysis & Core Web Vitals. */
registerLesson({
  meta: {
    id: "b0-principal/0500-bundle-web-vitals",
    title: "Bundle Analysis & Core Web Vitals",
    part: "b0-principal",
    estMinutes: 15,
    level: "principal",
    project: "next-saas",
    lede: "What you ship and how it performs for real users, measured. Learn to analyze your bundle for bloat, and to understand and optimize Core Web Vitals — the metrics Google and users actually judge you on.",
    objectives: [
      "Analyze bundle size and find bloat",
      "Understand the Core Web Vitals (LCP, INP, CLS)",
      "Measure real-user performance",
      "Set and enforce performance budgets",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Bundle analysis: see what you ship</h2>
      <p>
        A <strong>bundle analyzer</strong> visualizes what's in your JavaScript bundles — which dependencies take how
        much space. It's how you find bloat: a giant date library imported for one function, a charting lib loaded
        everywhere, duplicate copies of a package, a moment.js-sized dependency you could replace.
      </p>

      ${h.callout({
        kind: "principal",
        title: "Common bundle wins",
        body: `<p>Analysis reliably surfaces a few culprits: <strong>oversized dependencies</strong> (replace a 300KB
        library with a 5KB alternative or native API), <strong>non-tree-shaken imports</strong> (importing all of a
        library when you use one function — import the specific path), <strong>duplicate packages</strong> (multiple
        versions bundled), and <strong>accidentally-bundled server code or large data</strong>. Each can shave
        meaningful weight. Pair analysis with the code splitting from the last lesson. The discipline: periodically
        check what you ship — bundles creep up silently as dependencies are added, and a quarterly audit prevents the
        slow bloat that degrades every user's experience.</p>`,
      })}

      <h2>Core Web Vitals</h2>
      <p>Google's user-centric performance metrics — they affect both UX and search ranking:</p>
      <ul>
        <li><strong>LCP (Largest Contentful Paint)</strong> — how fast the main content appears. Target &lt; 2.5s. Driven by server response, render-blocking resources, and image/font loading.</li>
        <li><strong>INP (Interaction to Next Paint)</strong> — how responsive the page feels to interactions. Target &lt; 200ms. Driven by main-thread work / heavy JS.</li>
        <li><strong>CLS (Cumulative Layout Shift)</strong> — how much the page jumps around as it loads. Target &lt; 0.1. Caused by images/ads/fonts without reserved space.</li>
      </ul>

      ${h.callout({
        kind: "principal",
        title: "Measure real users, not just your laptop",
        body: `<p>Your fast laptop on fast wifi is not your users. <strong>Field data</strong> (Real User Monitoring —
        RUM) from actual visitors on real devices and networks is what matters. Tools: the <code>web-vitals</code>
        library (report metrics from real sessions to your analytics), Vercel Analytics / Speed Insights, the Chrome
        UX Report, and Lighthouse for lab testing. The pattern from earlier holds: measure where it counts. A page
        that's fast for you but has poor field LCP for users on mid-range Android phones is a page that's actually
        slow — and you'd never know without RUM. Optimizing the metrics real users experience is the goal.</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Performance budgets prevent regression",
        body: `<p>A <strong>performance budget</strong> is a limit you enforce in CI — e.g. "the main bundle must stay
        under 200KB" or "LCP must stay under 2.5s." Without a budget, performance erodes gradually as features pile up
        ("just one more dependency"), and one day the app is slow with no single cause. A budget makes the regression
        a <em>failed check</em> on the PR that introduced it, when it's cheap to fix. Treating performance as an
        enforced, ongoing constraint — not a one-time cleanup — is how high-performing teams stay fast. This is the
        same "gate quality in CI" discipline from Part A0, applied to performance.</p>`,
      })}

      ${h.exercise({
        title: "Analyze and budget",
        prompt: `<p>Run a bundle analyzer on LaunchPad (Next.js has <code>@next/bundle-analyzer</code>) and identify
        the largest dependencies — find one to trim or lazy-load. Add the <code>web-vitals</code> library to report
        LCP/INP/CLS, and run Lighthouse. Note your current numbers, make one improvement (optimize an image, trim a
        dep, reserve image space for CLS), and re-measure. Sketch a performance budget you'd enforce in CI.</p>`,
        runHint: "pnpm --filter next-saas build",
      })}
    </section>
  `,
});
