/* Lesson a0-testing/1500 — Project: a full test suite. */
registerLesson({
  meta: {
    id: "a0-testing/1500-project-test-pyramid",
    title: "Project: Build a Full Test Suite",
    part: "a0-testing",
    estMinutes: 75,
    level: "advanced",
    project: "next-saas",
    lede: "Apply the whole testing trophy to LaunchPad: unit tests for logic, integration tests for components and features, mocked-network tests, E2E for critical flows, and CI enforcing it all. Make your app trustworthy.",
    objectives: [
      "Build a complete, layered test suite",
      "Test the right things at the right layer",
      "Mock the network and test failures",
      "Enforce quality with CI",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The goal</h2>
      <p>
        Add a real, layered test suite to LaunchPad (and your other projects) following the testing trophy: lots of
        fast static + unit + integration tests, a few critical E2E tests, all running in CI on every change.
      </p>

      ${h.callout({
        kind: "principal",
        title: "What to test, by layer",
        body: `<p><strong>Static</strong> (free): TypeScript + ESLint, already enforced. <strong>Unit</strong>: pure
        logic — Zod schemas, the DAL's authorization, reducers, formatters, custom hooks. <strong>Integration</strong>
        (the bulk): components and features rendered with RTL and mocked network (MSW) — forms, lists, loading/error/
        empty states, the create/edit/delete flows. <strong>E2E</strong> (a few): sign up → log in → create a project
        → see it; the must-never-break journeys. This distribution gives maximum confidence per unit of effort.</p>`,
      })}

      <h2>The checklist</h2>
      <ul>
        <li><strong>Unit</strong> — Zod schemas (valid + invalid), DAL authorization (owner allowed, non-owner denied — the security test), reducers, utilities.</li>
        <li><strong>Integration</strong> — key components/features with RTL + user-event + MSW; assert behavior by role/text; cover error and empty states.</li>
        <li><strong>E2E</strong> — 2–4 Playwright tests on the critical journeys, with an auth fixture and page objects.</li>
        <li><strong>Visual</strong> — snapshot the design-system components (optional but valuable).</li>
        <li><strong>CI</strong> — a workflow running typecheck + lint + test + build on every PR, gating merges.</li>
        <li><strong>Discipline</strong> — no flaky tests, behavior over implementation, a test for every bug.</li>
      </ul>

      ${h.callout({
        kind: "principal",
        title: "A tested codebase is a confident codebase",
        body: `<p>When you finish, you'll have something genuinely valuable: an app you can <strong>change without
        fear</strong>. Refactor a component, upgrade a dependency, add a feature — the suite tells you instantly if you
        broke anything, and CI won't let a regression merge. This confidence is what lets teams move fast over the long
        haul. It's also what employers mean by "writes well-tested code" — a core expectation at senior and principal
        levels. You're not just making tests pass; you're making the whole project trustworthy and maintainable.</p>`,
      })}

      ${h.exercise({
        title: "Make LaunchPad trustworthy",
        prompt: `<p>Build the full test suite for LaunchPad to the checklist above: unit tests (especially the DAL
        authorization and Zod schemas), integration tests with MSW for the main features and their error/empty states,
        2–4 Playwright E2E tests on critical flows (with a fixture + page object), and a CI workflow enforcing
        everything on each PR. Aim for meaningful coverage, zero flaky tests, and behavior-focused assertions. Confirm
        the whole suite is green, then commit.</p>`,
        runHint: "pnpm -r test && pnpm --filter next-saas exec playwright test",
      })}

      ${h.callout({
        kind: "principal",
        title: "Quality is a discipline you now own",
        body: `<p>You can now make any React/Next/RN codebase trustworthy: the right tests at the right layers, network
        mocking, E2E on what matters, visual safety nets, and CI enforcement — with the judgment to test the right
        things and avoid the traps (coverage worship, flakiness, implementation-detail tests). This quality discipline
        is exactly what's expected at staff/principal level. The final teaching part, B0, is the capstone of seniority:
        performance at scale, architecture, system design, and engineering leadership. You're almost there. 🧪→🏛️</p>`,
      })}
    </section>
  `,
});
