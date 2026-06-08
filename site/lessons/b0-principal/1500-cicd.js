/* Lesson b0-principal/1500 — CI/CD & release engineering. */
registerLesson({
  meta: {
    id: "b0-principal/1500-cicd",
    title: "CI/CD & Release Engineering",
    part: "b0-principal",
    estMinutes: 14,
    level: "principal",
    project: "next-saas",
    lede: "How code safely and repeatably gets from a developer's commit to production. Mature CI/CD pipelines and release practices let teams ship many times a day with confidence instead of fear.",
    objectives: [
      "Design a full CI/CD pipeline",
      "Automate safe deployments",
      "Use preview environments and rollbacks",
      "Adopt trunk-based development",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The pipeline, end to end</h2>
      <p>
        Building on Part A0's CI: a mature pipeline takes a commit and, automatically: runs <strong>CI</strong>
        (typecheck, lint, test, build) → deploys a <strong>preview</strong> for PRs → on merge to <code>main</code>,
        deploys to <strong>production</strong> (often via staging) → runs <strong>post-deploy checks</strong> (smoke
        tests, health checks) → monitors. Humans review and approve; machines do the repetitive, error-prone work.
      </p>

      ${h.callout({
        kind: "principal",
        title: "Automate the path to production",
        body: `<p>Manual deploys are slow, inconsistent, and dangerous (someone forgets a step, deploys the wrong
        branch, skips migrations). <strong>Automating the entire path</strong> — build, test, deploy, verify — makes
        releases <strong>repeatable, fast, and safe</strong>, so the question "can we ship right now?" is always "yes,
        the pipeline handles it." This is what lets elite teams deploy dozens of times a day with low failure rates
        (the DORA metrics: deployment frequency, lead time, change-failure rate, recovery time — the research-backed
        measures of engineering performance). Investing in the pipeline pays back every single deploy, forever.</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Safe-deploy techniques",
        body: `<p>Reduce the blast radius of a bad deploy: <strong>staging</strong> (test in a prod-like environment
        first), <strong>canary / progressive rollout</strong> (release to 5% → 50% → 100%, halting if metrics
        degrade), <strong>blue-green deploys</strong> (switch traffic between two environments instantly),
        <strong>feature flags</strong> (ship code dark, enable gradually — next lesson), and most importantly a fast,
        reliable <strong>rollback</strong> (one click/command to revert to the last good version). The mindset:
        <em>assume a deploy might be bad</em> and design so that recovering is fast and cheap. Mean-time-to-recovery
        often matters more than preventing every failure.</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Trunk-based development",
        body: `<p>High-performing teams favor <strong>trunk-based development</strong>: short-lived branches merged into
        <code>main</code> frequently (often daily), behind feature flags for incomplete work, rather than long-lived
        feature branches that drift and cause painful "merge hell." Frequent integration surfaces conflicts early and
        keeps everyone close to <code>main</code>. Combined with a strong CI gate (Part A0) and feature flags, it
        enables continuous delivery. The release strategy, branching model, and flag strategy are interconnected
        decisions a senior engineer shapes for their team.</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Blameless incident response",
        body: `<p>Deploys will sometimes break things — what matters is the response. Mature teams practice
        <strong>blameless postmortems</strong>: when an incident happens, focus on <em>what in the system/process</em>
        allowed it (and how to prevent recurrence) rather than blaming a person. This builds a culture where people
        report issues openly and the system continuously improves. Leading incident response and postmortems calmly and
        constructively is a hallmark of senior technical leadership.</p>`,
      })}

      ${h.exercise({
        title: "Build a real pipeline",
        prompt: `<p>Extend the course's CI (Part A0) into a CD pipeline for LaunchPad: PRs get preview deploys, merges to
        <code>main</code> deploy to production (Vercel makes this easy), with the CI gate (typecheck/lint/test/build)
        required before merge. Document your rollback procedure. Then write a short note on the branching + release
        strategy you'd choose for a 10-person team and why. You now understand how software actually ships at scale.</p>`,
        runHint: "pnpm -r build",
      })}
    </section>
  `,
});
