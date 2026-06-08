/* Lesson a0-testing/1300 — Coverage, flake & what NOT to test. */
registerLesson({
  meta: {
    id: "a0-testing/1300-coverage-flake",
    title: "Coverage, Flake & What NOT to Test",
    part: "a0-testing",
    estMinutes: 13,
    level: "advanced",
    project: "vite-fundamentals",
    lede: "The nuanced wisdom that separates good testers from cargo-cult testers: how to read coverage without worshipping it, how to eliminate flaky tests, and the discipline of testing the right things.",
    objectives: [
      "Use coverage as a guide, not a goal",
      "Diagnose and fix flaky tests",
      "Decide what's not worth testing",
      "Write a test for every bug you fix",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Coverage: useful signal, terrible target</h2>
      ${h.codePane({
        lang: "bash",
        title: "Measuring coverage",
        readOnly: true,
        code: `pnpm test -- --coverage     # shows % of lines/branches/functions tested
# Vitest uses @vitest/coverage-v8 to report what your tests exercise.`,
      })}

      ${h.callout({
        kind: "principal",
        title: "100% coverage is a trap",
        body: `<p>Coverage tells you what code your tests <em>execute</em>, not whether your tests are <em>good</em>. You
        can have 100% coverage with tests that assert nothing meaningful, and you can have a well-tested app at 70%
        because the untested 30% is trivial. Chasing 100% leads to writing pointless tests for getters and wiring,
        and to brittle implementation-detail tests. <strong>Use coverage to find <em>gaps</em></strong> ("this entire
        error-handling branch is untested — should it be?") rather than as a score to maximize. A team obsessed with a
        coverage number often has worse tests than one focused on testing the right behaviors. Quality over
        quantity.</p>`,
      })}

      <h2>Flaky tests: the trust killer</h2>
      ${h.callout({
        kind: "principal",
        title: "A flaky test is worse than no test",
        body: `<p>A <strong>flaky</strong> test passes sometimes and fails other times without code changes. It's
        insidious: people learn to re-run failures and eventually <em>ignore</em> red builds entirely — at which
        point a real failure slips through. <strong>Fix or delete flaky tests immediately.</strong> Common causes:
        arbitrary <code>sleep</code>s (use <code>findBy</code>/auto-wait instead), tests depending on order or shared
        state (isolate them), real network/time/randomness (mock them), and race conditions. A test suite is only
        valuable if the team <em>trusts</em> it; one flaky test erodes trust in all of them. Reliability is a feature
        of your tests, not an afterthought.</p>`,
      })}

      <h2>What NOT to test</h2>
      <ul>
        <li><strong>The framework/library</strong> — React, Next, the router already test themselves.</li>
        <li><strong>Trivial code</strong> — a getter, a one-line passthrough, static config.</li>
        <li><strong>Implementation details</strong> — internal function calls, private state.</li>
        <li><strong>Things TypeScript guarantees</strong> — you don't need a test that a typed function rejects a string.</li>
        <li><strong>Third-party UI internals</strong> — test <em>your</em> usage, not their component.</li>
      </ul>

      ${h.callout({
        kind: "principal",
        title: "Write a test for every bug",
        body: `<p>One discipline worth adopting universally: <strong>when you fix a bug, first write a test that
        reproduces it</strong> (it fails), then fix the code (it passes). This guarantees the bug never silently
        returns (regression protection), documents the edge case, and naturally grows your suite around the parts that
        <em>actually break</em> — which is exactly where coverage is most valuable. Bug-driven tests are some of the
        highest-value tests you'll write, because they target proven failure points.</p>`,
      })}

      ${h.exercise({
        title: "Audit your suite",
        prompt: `<p>Run coverage on <code>vite-fundamentals</code> and look at the report — not to hit a number, but to
        spot meaningful <em>gaps</em> (untested error paths, edge cases) vs trivial code you can ignore. Then practice
        bug-driven testing: introduce a subtle bug, write a failing test that catches it, then fix the bug to make it
        pass. Finally, review your tests for any reliance on timing or order and make them deterministic.</p>`,
        runHint: "pnpm --filter vite-fundamentals test -- --coverage",
      })}
    </section>
  `,
});
