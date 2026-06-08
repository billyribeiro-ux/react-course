/* Lesson b0-principal/1800 — Micro-frontends & module federation. */
registerLesson({
  meta: {
    id: "b0-principal/1800-micro-frontends",
    title: "Micro-Frontends: When & When Not",
    part: "b0-principal",
    estMinutes: 12,
    level: "principal",
    project: null,
    lede: "Micro-frontends split a large app into independently-deployable pieces owned by different teams. They solve real organizational problems — and create real complexity. Knowing when NOT to use them is the senior skill.",
    objectives: [
      "Understand the micro-frontend architecture",
      "Know module federation and integration approaches",
      "Weigh the trade-offs honestly",
      "Recognize when they're (not) warranted",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>What and why</h2>
      <p>
        A <strong>micro-frontend</strong> architecture splits one large web app into multiple independently-built and
        -deployed applications, each owned by a different team, composed together at runtime or build time. The driver
        is usually <strong>organizational, not technical</strong>: many teams working on one app step on each other —
        shared releases, merge conflicts, coupled deploys. Micro-frontends let each team own, build, test, and deploy
        their piece on their own schedule.
      </p>

      ${h.callout({
        kind: "principal",
        title: "Conway's Law: architecture mirrors org structure",
        body: `<p>Micro-frontends are an answer to <strong>Conway's Law</strong> — that systems tend to mirror the
        communication structure of the org that builds them. When you have many autonomous teams, a single monolithic
        frontend forces coupling that fights their autonomy. Micro-frontends align the architecture with the teams,
        enabling independent deployment and tech-decision autonomy. Recognizing that an architecture problem is really
        an <em>organizational</em> problem — and choosing structure to fit how teams actually work — is genuinely
        principal/staff-level systems thinking.</p>`,
      })}

      <h2>Integration approaches</h2>
      ${h.callout({
        kind: "note",
        body: `<p>Common techniques: <strong>Module Federation</strong> (Webpack/Rspack — apps share and load each
        other's modules at runtime), <strong>build-time composition</strong> (each MFE is a package assembled into a
        shell), <strong>iframes</strong> (strong isolation, poor UX/integration), and <strong>route-based</strong>
        (different paths served by different apps behind a proxy). Frameworks/meta-frameworks and tools exist for each.
        A "shell" or "container" app handles routing and shared concerns (auth, design system).</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "The costs are substantial — usually not worth it",
        body: `<p>Be honest: micro-frontends add significant complexity — shared-dependency management (duplicate React
        versions bloat bundles), consistent UX across independently-built apps (you <em>need</em> a shared design
        system), cross-app communication, harder end-to-end testing, more infrastructure, and performance overhead. For
        <strong>most teams, this complexity isn't worth it</strong> — a well-structured monolith or monorepo (with
        clear module boundaries and good CI) serves better and is far simpler. Micro-frontends pay off mainly at
        <strong>large scale</strong>: many teams (think dozens), a huge app, genuine need for independent deploys and
        tech autonomy. The most senior take is often <em>"we don't need micro-frontends"</em> — resisting architectural
        fashion and choosing the simplest thing that solves the actual problem.</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Don't adopt them for technical novelty",
        body: `<p>Teams sometimes reach for micro-frontends because they sound modern, then drown in the operational
        overhead for a problem they didn't have. If you have one or a few teams, you almost certainly don't need them.
        Solve the actual pain (slow CI? → caching; merge conflicts? → better module boundaries; coupled deploys? →
        feature flags) with simpler tools first. Reach for micro-frontends only when org-scale autonomy genuinely
        demands it — and even then, deliberately.</p>`,
      })}

      ${h.exercise({
        title: "Make the architecture call",
        prompt: `<p>Write a brief decision memo for a hypothetical scenario: a company with 8 product teams all working
        in one large Next.js app, hitting constant merge conflicts and coupled release schedules. Would you recommend
        micro-frontends? Lay out the trade-offs, alternatives (better module boundaries, monorepo + Turborepo, feature
        flags, team-owned routes), and your recommendation with justification. Practicing this "should we adopt this
        architecture?" reasoning — including saying no — is core principal work.</p>`,
        runHint: "",
      })}
    </section>
  `,
});
