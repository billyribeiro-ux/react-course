/* Lesson a0-testing/0800 — Component testing in Vitest browser mode. */
registerLesson({
  meta: {
    id: "a0-testing/0800-browser-mode",
    title: "Component Testing in Vitest Browser Mode",
    part: "a0-testing",
    estMinutes: 12,
    level: "advanced",
    project: "vite-fundamentals",
    lede: "jsdom is a JavaScript simulation of a browser — fast, but not the real thing. Vitest Browser Mode runs your component tests in an actual browser via Playwright, for higher fidelity where it matters.",
    objectives: [
      "Understand jsdom's limitations",
      "Run tests in a real browser with Vitest browser mode",
      "Decide when real-browser testing is worth it",
      "Balance speed and fidelity",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>jsdom vs a real browser</h2>
      <p>
        Your tests so far run in <strong>jsdom</strong> — a fast, lightweight <em>simulation</em> of a browser in
        Node. It's perfect for most component logic. But jsdom doesn't do real layout, real CSS, real scrolling, or
        true browser APIs — so things involving actual rendering (visibility, dimensions, hover, focus quirks, some
        web APIs) can behave differently than in a real browser.
      </p>

      ${h.callout({
        kind: "principal",
        title: "jsdom is fast but it's a simulation",
        body: `<p>jsdom implements the DOM API but not a real rendering engine — <code>getBoundingClientRect</code>
        returns zeros, CSS doesn't actually lay out, and some APIs are stubbed or missing. For the vast majority of
        component behavior (does clicking show the right text?), this doesn't matter and jsdom's speed is a big win.
        But for tests that depend on <em>real rendering</em> — visibility based on layout, scroll behavior, focus
        management edge cases, CSS-driven logic — you want a real browser. Knowing this distinction prevents the
        frustration of a test passing in jsdom but the feature breaking in production (or vice versa).</p>`,
      })}

      <h2>Vitest Browser Mode</h2>
      ${h.codePane({
        lang: "ts",
        title: "vitest.config.ts — browser mode",
        readOnly: true,
        code: `export default defineConfig({
  test: {
    browser: {
      enabled: true,
      provider: "playwright",     // runs tests in a REAL browser
      instances: [{ browser: "chromium" }],
    },
  },
});
// Same RTL-style API, but rendering in an actual Chromium/Firefox/WebKit.`,
      })}

      ${h.callout({
        kind: "principal",
        title: "A spectrum, not a switch",
        body: `<p>The 2026 approach is a <strong>spectrum of fidelity vs speed</strong>: most component tests run in
        fast jsdom; a subset that genuinely need real rendering run in <strong>browser mode</strong> (powered by
        Playwright); and a few full-journey tests run as <strong>E2E</strong> (next lessons). You don't pick one — you
        use the cheapest tool that gives you confidence for each test. Browser mode fills the gap between "fast but
        simulated" jsdom and "realistic but heavy" full E2E: real-browser component tests. Reach for it when a test's
        correctness depends on actual browser rendering.</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Browser mode is slower — use it selectively",
        body: `<p>Real browsers are heavier than jsdom, so a full suite in browser mode is slower. Keep the bulk of
        your tests in jsdom and selectively run in the browser the tests that need it (visual/layout-dependent
        components, complex focus/scroll behavior). Over-using browser mode trades away the fast feedback loop that
        makes testing pleasant. Match the runtime to the need.</p>`,
      })}

      ${h.exercise({
        title: "Try browser mode",
        prompt: `<p>Configure Vitest browser mode (Playwright provider) in <code>vite-fundamentals</code> and run a
        component test that depends on real rendering — e.g. one asserting an element is actually visible/scrolled
        into view, or testing focus behavior. Compare it running in jsdom vs the browser. Decide which of your tests
        genuinely benefit from a real browser, and keep the rest in fast jsdom.</p>`,
        runHint: "pnpm --filter vite-fundamentals test",
      })}
    </section>
  `,
});
