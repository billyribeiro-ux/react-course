/* Lesson c0-capstone/0400 — Architecture review & performance budget. */
registerLesson({
  meta: {
    id: "c0-capstone/0400-architecture-review",
    title: "Architecture Review & Performance Budget",
    part: "c0-capstone",
    estMinutes: 16,
    level: "principal",
    project: "next-saas",
    lede: "A principal engineer doesn't just build — they critically review their own work. Conduct a rigorous architecture and performance review of your capstones, the way you'd review a teammate's system.",
    objectives: [
      "Critically review your own architecture",
      "Establish and verify a performance budget",
      "Audit for security, accessibility, and quality",
      "Practice self-review as a discipline",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Review your own work like a critic</h2>
      <p>
        The ability to step back and <strong>critically evaluate your own architecture</strong> — finding its weaknesses
        before someone else (or production) does — is a defining senior trait. Pretend you're a principal engineer
        reviewing this codebase for the first time, with no ego attached. Where would you push back?
      </p>

      ${h.callout({
        kind: "principal",
        title: "The architecture review checklist",
        body: `<p>Audit your capstones against the standards from across the course:</p>
        <ul>
          <li><strong>State:</strong> Is each piece in the right category/tool (Part B0)? Any server data hand-managed? Derived state stored? Over-globalized state?</li>
          <li><strong>Data flow:</strong> Clear ownership and one direction? Can you explain where any value comes from?</li>
          <li><strong>Boundaries:</strong> Server/client split optimal (small client islands)? Authorization at the data layer, every query scoped?</li>
          <li><strong>Components:</strong> Right altitude, single responsibility, good APIs, accessible?</li>
          <li><strong>Quality:</strong> Meaningful tests, CI gating, no flaky tests, types strict?</li>
          <li><strong>Security:</strong> Inputs validated, secrets server-only, no broken access control, deps audited?</li>
          <li><strong>What would you do differently</strong> if starting over? (There's always something — naming it is the skill.)</li>
        </ul>`,
      })}

      <h2>Set and verify a performance budget</h2>
      ${h.callout({
        kind: "principal",
        title: "Measure against explicit targets",
        body: `<p>Define a <strong>performance budget</strong> for your capstone and verify it: initial JS bundle under a
        target (e.g. 200KB), Core Web Vitals in the "good" range (LCP &lt; 2.5s, INP &lt; 200ms, CLS &lt; 0.1), Lighthouse
        scores above a threshold. Run a bundle analysis (find bloat), check real-user-ish metrics, and fix the worst
        offenders (Part B0). Crucially, <strong>encode the budget in CI</strong> so it can't silently regress. Measuring
        against explicit targets — rather than vibes — is the empirical performance discipline that separates "feels
        fine" from "is fast, proven." A budget makes performance a maintained property, not a one-time effort.</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Self-review is how you grow fastest",
        body: `<p>Most engineers ship and move on. The ones who improve fastest <strong>review their own work
        critically</strong> — "what would I change? where did I cut a corner? what did I learn?" This honest
        self-assessment, free of defensiveness, is how you internalize lessons and level up. Do an architecture review of
        every significant thing you build. Over time, you'll catch the weaknesses <em>while designing</em>, before they're
        built — which is what senior intuition actually is: pattern-matched experience from many reviews.</p>`,
      })}

      ${h.exercise({
        title: "Review and budget your capstones",
        prompt: `<p>Write an <strong>architecture review</strong> of your capstone(s) using the checklist above — be
        your own toughest critic, listing genuine weaknesses and what you'd do differently. Then set a
        <strong>performance budget</strong>, measure against it (bundle analysis, Lighthouse, Core Web Vitals), fix the
        biggest issues, and add a CI check to enforce it. Produce a short written report. This self-review artifact
        demonstrates exactly the judgment expected at principal level.</p>`,
        runHint: "pnpm --filter next-saas build",
      })}
    </section>
  `,
});
