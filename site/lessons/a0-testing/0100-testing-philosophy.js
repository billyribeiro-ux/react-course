/* Lesson a0-testing/0100 — Testing philosophy & the trophy. */
registerLesson({
  meta: {
    id: "a0-testing/0100-testing-philosophy",
    title: "Testing Philosophy & the Testing Trophy",
    part: "a0-testing",
    estMinutes: 15,
    level: "advanced",
    project: "vite-fundamentals",
    lede: "Tests give you the confidence to change code without breaking it. But not all tests are equal — learn what to test, what kinds of tests to write, and the mindset that makes testing a productivity boost, not a chore.",
    objectives: [
      "Understand why we test (confidence to change)",
      "Know the testing trophy and its layers",
      "Decide what's worth testing",
      "Adopt a behavior-focused testing mindset",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Why test at all?</h2>
      <p>
        Tests aren't about proving code works once — they're about <strong>confidence to change code later</strong>.
        A good test suite lets you refactor, upgrade dependencies, and add features knowing that if you break
        something, a test will tell you <em>immediately</em>, not a user in production. Tests are how codebases stay
        changeable as they grow.
      </p>

      ${h.callout({
        kind: "principal",
        title: "Tests are an enabler of speed, not a tax on it",
        body: `<p>Beginners see tests as extra work that slows them down. Experienced engineers see them as what
        <em>lets</em> them move fast: without tests, every change risks silent breakage, so teams become afraid to
        touch anything (and ship slowly and nervously). With good tests, you change boldly and find out instantly if
        something's wrong. On any codebase that lives longer than a few weeks or has more than one contributor,
        tests pay for themselves many times over. The goal isn't 100% coverage for its own sake — it's
        <strong>confidence</strong>.</p>`,
      })}

      <h2>The Testing Trophy</h2>
      <p>The modern shape of a test suite (Kent C. Dodds' "trophy"), from most to fewest:</p>
      <ul>
        <li><strong>Static</strong> (the base) — TypeScript + ESLint. Catch typos and type errors with zero test-writing. You already have this!</li>
        <li><strong>Unit</strong> — test pure functions and hooks in isolation. Fast, focused.</li>
        <li><strong>Integration</strong> (the biggest layer) — test components/features the way they're used, with their pieces working together. The highest-value tests.</li>
        <li><strong>End-to-End (E2E)</strong> (the top) — drive the real app in a browser through critical flows. Slow but high-confidence; keep few.</li>
      </ul>

      ${h.diagram({
        label:
          "The testing trophy: a wide static-analysis base, then unit tests, the largest integration layer, and a small end-to-end cap.",
        caption:
          "Lean on free static typing, write plenty of integration tests, and keep E2E tests few.",
        svg: `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg">
  <rect class="d-accent" x="210" y="20" width="100" height="34" rx="6"/>
  <text class="d-text" x="260" y="42" text-anchor="middle">E2E (few)</text>
  <rect class="d-box" x="120" y="64" width="280" height="56" rx="6"/>
  <text class="d-text" x="260" y="97" text-anchor="middle" font-weight="700">Integration (most value)</text>
  <rect class="d-box" x="160" y="130" width="200" height="48" rx="6"/>
  <text class="d-text" x="260" y="159" text-anchor="middle">Unit</text>
  <rect class="d-box" x="60" y="188" width="400" height="48" rx="6"/>
  <text class="d-text" x="260" y="217" text-anchor="middle">Static (TypeScript + ESLint — free)</text>
  <text class="d-muted" x="500" y="44" text-anchor="end">↑ more confidence</text>
  <text class="d-muted" x="500" y="232" text-anchor="end">↑ faster · cheaper ↓</text>
</svg>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Favor integration tests",
        body: `<p>The trophy's key insight (vs the older "testing pyramid") is that <strong>integration tests give the
        best confidence-per-effort</strong>. A test that renders a component and interacts with it the way a user
        does catches real bugs while being resilient to refactoring. Pure unit tests are great for complex logic but
        can test implementation details that change. E2E tests are the most realistic but slow and flaky if overused.
        So: lean on static typing (free), write plenty of integration tests, unit-test tricky logic, and reserve E2E
        for a few critical user journeys. This distribution is what efficient teams actually use.</p>`,
      })}

      <h2>Test behavior, not implementation</h2>
      ${h.callout({
        kind: "principal",
        title: "The golden rule",
        body: `<p>"The more your tests resemble the way your software is used, the more confidence they give you." Test
        <strong>what the user experiences</strong> (clicking a button shows a result), not <em>how it's built</em>
        (this function called that one with these args). Implementation-detail tests break every time you refactor —
        even when nothing's actually broken — which trains people to ignore or delete tests. Behavior-focused tests
        survive refactors and catch real regressions. This principle, more than any tool, determines whether your
        test suite helps or hurts. Everything in this part flows from it.</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Don't test everything",
        body: `<p>Chasing 100% coverage leads to testing trivial code (a getter that returns a field) and writing
        brittle tests for their own sake. Test what <strong>matters and could break in a way that hurts</strong>:
        business logic, critical user flows, edge cases, bug fixes (write a test that reproduces the bug). Skip
        testing the framework, trivial wiring, or things TypeScript already guarantees. Judgment about <em>what</em>
        to test is more valuable than the ability to write any test.</p>`,
      })}

      ${h.exercise({
        title: "Plan a test strategy",
        prompt: `<p>For your Recipe Finder (or Job Board), list what you'd test at each trophy layer: which pure
        logic deserves unit tests, which components/features deserve integration tests, and which 1–3 user journeys
        deserve E2E tests. Note what you'd <em>not</em> test and why. Then look at the verified
        <code>Counter.test.tsx</code> in <code>vite-fundamentals</code> — a behavior-focused integration test you'll
        build on this part.</p>`,
        runHint: "pnpm --filter vite-fundamentals test",
      })}
    </section>
  `,
});
