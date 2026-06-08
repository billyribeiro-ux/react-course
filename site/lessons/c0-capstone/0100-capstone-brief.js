/* Lesson c0-capstone/0100 — Capstone brief & scoping. */
registerLesson({
  meta: {
    id: "c0-capstone/0100-capstone-brief",
    title: "The Capstones: Scoping an Ambitious Project",
    part: "c0-capstone",
    estMinutes: 14,
    level: "principal",
    project: null,
    lede: "You've learned everything. Now you prove it by building two substantial products end to end. First, the meta-skill that makes ambitious projects achievable instead of overwhelming: how to scope and plan them.",
    objectives: [
      "Understand the two capstone projects",
      "Scope an ambitious project into shippable phases",
      "Define an MVP and an iteration plan",
      "Plan like a principal engineer",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>What you'll build</h2>
      <p>Two capstones that exercise the entire course:</p>
      <ul>
        <li><strong>Capstone 1 — a production-grade full-stack SaaS</strong> (Next.js 16: RSC, Server Actions, database, auth, design system, tests, CI, observability, deployed). Extends LaunchPad to real quality.</li>
        <li><strong>Capstone 2 — a cross-platform product</strong>: a mobile app (Expo) sharing types, schemas, and logic with the web app — proving "build once, ship everywhere."</li>
      </ul>
      <p>These aren't tutorials to follow — they're <em>your</em> products, built with your judgment. That's the point.</p>

      ${h.callout({
        kind: "principal",
        title: "Scoping is the skill that makes big things possible",
        body: `<p>The difference between engineers who ship ambitious projects and those who stall isn't talent — it's
        <strong>scoping</strong>. A vague "build a SaaS" is paralyzing; a well-scoped "build auth + projects CRUD this
        week, then billing next week" is achievable. The principal skill is breaking a big vision into a sequence of
        <strong>small, shippable, independently-valuable phases</strong>, starting with a true MVP (the smallest thing
        that delivers real value) and iterating. This prevents the two failure modes: never shipping (scope too big) and
        building the wrong thing (no feedback). Scoping well is arguably <em>the</em> meta-skill of senior engineering.</p>`,
      })}

      <h2>How to scope</h2>
      <ol>
        <li><strong>Define the core value</strong> — what's the one thing this product must do? Everything else is secondary.</li>
        <li><strong>Find the MVP</strong> — the smallest version that delivers that value to a real user. Ruthlessly cut everything non-essential to v1.</li>
        <li><strong>Sequence the rest</strong> — order remaining features by value and dependency into phases, each shippable.</li>
        <li><strong>Identify risks early</strong> — tackle the scariest unknowns (a tricky integration, a performance question) first, while there's time to change course.</li>
        <li><strong>Plan to iterate</strong> — ship, get feedback, adjust. The plan is a hypothesis, not a contract.</li>
      </ol>

      ${h.callout({
        kind: "principal",
        title: "MVP doesn't mean low quality",
        body: `<p>A common misread: "MVP" means a janky prototype. It means <strong>minimal scope</strong>, not minimal
        <em>quality</em> — the MVP should be small but <em>solid</em> (tested, accessible, secure for what it does). You
        cut <em>features</em>, not <em>craftsmanship</em>. A focused, well-built small product beats a sprawling, broken
        big one every time. This balance — narrow scope, high quality — is exactly the pragmatism Part B0 emphasized,
        applied to shipping your own ambitious work.</p>`,
      })}

      ${h.exercise({
        title: "Scope your capstone",
        prompt: `<p>Choose your capstone product — extend LaunchPad, or invent your own (a habit tracker, a recipe
        manager, a small social app, a freelance-invoicing tool — something <em>you'd</em> use). Write a scoping doc:
        the core value in one sentence, the MVP feature list (ruthlessly minimal), the phased roadmap after MVP, the
        biggest risks to tackle first, and your tech stack choices with justification. This scoping doc is your project
        plan — and a principal-level artifact in itself.</p>`,
        runHint: "",
      })}
    </section>
  `,
});
