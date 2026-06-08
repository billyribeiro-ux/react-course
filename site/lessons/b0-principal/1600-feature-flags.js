/* Lesson b0-principal/1600 — Feature flags, A/B testing & progressive delivery. */
registerLesson({
  meta: {
    id: "b0-principal/1600-feature-flags",
    title: "Feature Flags, A/B Testing & Progressive Delivery",
    part: "b0-principal",
    estMinutes: 13,
    level: "principal",
    project: "next-saas",
    lede: "Decouple deploying code from releasing features. Feature flags let you ship dark, roll out gradually, kill a bad feature instantly, and run experiments — fundamentally changing how teams release safely.",
    objectives: [
      "Use feature flags to control releases",
      "Roll out features progressively",
      "Run A/B tests and experiments",
      "Manage flag lifecycle and debt",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Decouple deploy from release</h2>
      <p>
        A <strong>feature flag</strong> is a runtime switch that turns a feature on or off without deploying new code.
        This decouples <strong>deploying</strong> (code is in production) from <strong>releasing</strong> (users can see
        it) — a profound shift. You can merge incomplete work safely (flag off), turn features on for specific users,
        roll out gradually, and <strong>kill a broken feature instantly</strong> (flip the flag) without an emergency
        deploy.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "A feature flag",
        readOnly: true,
        code: `import { useFlag } from "@/lib/flags"; // LaunchDarkly, Statsig, PostHog, etc.

function Dashboard() {
  const showNewChart = useFlag("new-analytics-chart");
  return showNewChart ? <NewChart /> : <OldChart />;
}
// Toggle 'new-analytics-chart' for 5% of users, then 50%, then 100% —
// from a dashboard, no deploy. If it misbehaves, flip it off instantly.`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Why flags transform releasing",
        body: `<p>Flags enable <strong>progressive delivery</strong>: ship to internal users → 1% of users → 10% →
        100%, watching metrics at each step and halting/reverting at the first sign of trouble — turning a risky "big
        bang" launch into a controlled, observable rollout. They also enable <strong>trunk-based development</strong>
        (merge incomplete features behind an off flag, Part 15), <strong>instant kill switches</strong> for incidents,
        and <strong>targeting</strong> (beta features for specific customers). Separating "is it deployed" from "is it
        released" is one of the highest-leverage practices in modern release engineering. It converts deployment from a
        scary event into a routine non-event.</p>`,
      })}

      <h2>A/B testing</h2>
      ${h.callout({
        kind: "principal",
        title: "Decide with data, not opinions",
        body: `<p>Flags power <strong>experiments</strong>: show variant A to half your users and variant B to the
        other half, measure which performs better on a real metric (conversion, engagement), and ship the winner. This
        replaces "the loudest person's opinion" with <strong>evidence</strong>. Done rigorously (proper sample sizes,
        statistical significance, one variable at a time, guarding against peeking), A/B testing is how data-driven
        product teams make decisions. Misused (tiny samples, p-hacking, testing trivial things), it's noise dressed as
        science — so understanding the statistics matters. The principal value: knowing when an experiment is worth
        running and how to interpret it honestly.</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Flags are debt — clean them up",
        body: `<p>Every flag adds a code path and conditional complexity. A codebase littered with stale flags (the
        feature shipped 100% a year ago but the flag and dead <code>else</code> branch remain) becomes a maze.
        <strong>Flags have a lifecycle</strong>: create → roll out → reach 100% → <strong>remove the flag and the dead
        code</strong>. Treat flag cleanup as part of the work, track flag age, and budget time to retire them. Unmanaged
        flag debt is a real maintenance burden — discipline here keeps the codebase clean.</p>`,
      })}

      ${h.exercise({
        title: "Add feature flags",
        prompt: `<p>Add a feature-flag system to LaunchPad (a simple env/config-based one, or a service like PostHog/
        Statsig). Put a new feature behind a flag, simulate a progressive rollout (10% → 100%), and demonstrate the kill
        switch (flip it off). Sketch how you'd A/B test a change (e.g. button copy) — the metric, the split, and how
        you'd decide a winner. Note your plan for retiring the flag afterward.</p>`,
        runHint: "pnpm --filter next-saas dev",
      })}
    </section>
  `,
});
