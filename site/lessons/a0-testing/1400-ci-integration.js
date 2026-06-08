/* Lesson a0-testing/1400 — Wiring tests into CI. */
registerLesson({
  meta: {
    id: "a0-testing/1400-ci-integration",
    title: "Wiring Tests into CI",
    part: "a0-testing",
    estMinutes: 13,
    level: "advanced",
    project: "next-saas",
    lede: "Tests only protect you if they run automatically. Continuous Integration runs your full quality suite on every push and blocks broken code from merging — turning tests from optional into a guarantee.",
    objectives: [
      "Run tests automatically on every push/PR",
      "Set up a CI pipeline with GitHub Actions",
      "Gate merges on green checks",
      "Optimize CI for speed",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Why CI?</h2>
      <p>
        Tests on your laptop help only if you remember to run them. <strong>Continuous Integration (CI)</strong> runs
        your whole quality suite — typecheck, lint, tests, build — automatically on every push and pull request, on a
        clean server. If anything fails, the PR is blocked. This makes "all checks pass" a <em>guarantee</em>, not a
        hope.
      </p>

      ${h.codePane({
        lang: "yaml",
        title: ".github/workflows/ci.yml",
        readOnly: true,
        code: `name: CI
on: [push, pull_request]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm -r typecheck      # type-check every project
      - run: pnpm -r lint           # lint every project
      - run: pnpm -r test           # run all unit/integration tests
      - run: pnpm -r build          # ensure everything builds
  # A separate job can run Playwright E2E (slower, needs a browser).`,
      })}

      ${h.callout({
        kind: "principal",
        title: "CI is the team's safety net",
        body: `<p>CI turns your test suite into an enforced quality gate that no one can bypass — broken code literally
        <strong>cannot merge</strong>. This is transformative for teams: every change is verified the same way, on a
        clean environment, regardless of who wrote it or what's on their machine ("works on my machine" dies here).
        Combined with branch protection (require green checks + review before merge), it means <code>main</code> is
        always deployable. The whole testing investment pays off through CI — without it, tests are just suggestions.
        Setting up CI is one of the highest-leverage things you can do for a project's long-term health.</p>`,
      })}

      <h2>Optimizing CI</h2>
      <ul>
        <li><strong>Cache dependencies</strong> — don't reinstall from scratch every run.</li>
        <li><strong>Run jobs in parallel</strong> — typecheck, lint, and tests can run simultaneously.</li>
        <li><strong>Only test what changed</strong> — tools like <strong>Turborepo</strong> (Part B0) skip unchanged packages.</li>
        <li><strong>Fail fast</strong> — surface failures quickly; put the cheapest checks (typecheck, lint) first.</li>
        <li><strong>Shard slow E2E</strong> — split across multiple machines for speed.</li>
      </ul>

      ${h.callout({
        kind: "principal",
        title: "Fast CI keeps the team moving",
        body: `<p>If CI takes 30 minutes, people batch changes, context-switch, and grow frustrated; a tight 3–5 minute
        CI keeps everyone in flow. Speed isn't vanity — it directly affects how often people integrate and how quickly
        they ship. Caching, parallelism, and only-test-what-changed (a key benefit of monorepo tooling) are worth the
        setup. The same "tight feedback loop improves output" principle from local dev applies to CI. Treat CI
        performance as a real engineering concern, not infrastructure you set once and ignore.</p>`,
      })}

      ${h.exercise({
        title: "Set up CI",
        prompt: `<p>Add a GitHub Actions workflow to this course repo (or your own) that, on every push and PR, runs
        <code>pnpm install --frozen-lockfile</code>, then typecheck, lint, test, and build across the workspace. Push
        a branch with a deliberate type error and confirm CI fails and would block the merge; fix it and confirm it
        goes green. Enable branch protection requiring the check to pass. You now have an enforced quality gate.</p>`,
        runHint: "pnpm -r test",
      })}
    </section>
  `,
});
