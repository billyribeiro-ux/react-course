/* Lesson c0-capstone/0200 — Capstone 1: full-stack SaaS. */
registerLesson({
  meta: {
    id: "c0-capstone/0200-capstone-saas",
    title: "Capstone 1: A Production-Grade Full-Stack SaaS",
    part: "c0-capstone",
    estMinutes: 120,
    level: "principal",
    project: "next-saas",
    lede: "Build (or finish) a complete, deployed, production-quality SaaS using everything from Parts 00–B0. This is the project that proves you can ship real products at a high standard, on your own.",
    objectives: [
      "Build a complete full-stack product end to end",
      "Apply every quality discipline from the course",
      "Deploy it live with monitoring",
      "Have a portfolio centerpiece you fully understand",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The brief</h2>
      <p>
        A real SaaS, scoped per the last lesson, built to production quality and <strong>deployed live</strong>. Pick
        something with genuine substance: a project/task manager, a CRM, an analytics tool, a content platform, a
        booking system — or your own idea. It must have authentication, a database, meaningful features, and the polish
        of a real product.
      </p>

      ${h.callout({
        kind: "principal",
        title: "The full-stack quality bar",
        body: `<p>This capstone integrates the entire course. Hold it to the professional standard you've learned:</p>
        <ul>
          <li><strong>Foundations:</strong> clean TypeScript, well-structured components, the right state in the right place.</li>
          <li><strong>Full-stack (Next.js 16):</strong> Server Components, Server Actions with Zod validation, a Drizzle/Postgres database behind an authorized DAL, auth with sessions, proper rendering strategies (static/dynamic/PPR).</li>
          <li><strong>Design (Part 60):</strong> a cohesive, accessible, themed UI built on your design system.</li>
          <li><strong>Data (Part 70):</strong> TanStack Query / RSC where each fits, URL state, validated forms.</li>
          <li><strong>Quality (Part A0):</strong> a real test suite (unit + integration + a couple E2E) and CI gating merges.</li>
          <li><strong>Principal (Part B0):</strong> performance budget, security hardening, observability (Sentry), env hygiene, and a clean deploy with preview environments.</li>
        </ul>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "This is the difference between knowing and doing",
        body: `<p>You can learn every concept and still freeze on a blank repo — building a complete product yourself is
        a distinct skill that only comes from doing it. This capstone is where all the pieces stop being separate
        lessons and become one coherent thing you built. Expect it to be hard in a productive way: you'll hit problems
        no lesson covered exactly, and you'll solve them with the judgment you've developed. That experience — "I took
        an idea and shipped a real, polished, deployed product" — is what genuinely makes you a principal-level
        engineer, and it's the centerpiece of any portfolio or interview.</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Ship it for real",
        body: `<p>Don't let it live only on localhost. <strong>Deploy it</strong> with a real database and auth, on a real
        domain, with monitoring on. Use it yourself. Share it. A deployed product you can hand someone is worth
        infinitely more than a half-finished one in a folder. The act of shipping — handling the production-only issues,
        the deploy config, the "it works on my machine but not in prod" moments — teaches lessons nothing else does. A
        principal engineer ships.</p>`,
      })}

      ${h.exercise({
        title: "Build and ship Capstone 1",
        prompt: `<p>Build your full-stack SaaS to the quality bar above and <strong>deploy it live</strong>. Follow your
        scoping plan: MVP first (auth + core feature, solid and tested), then iterate through your phased roadmap. Hold
        every quality gate green (typecheck, lint, test, build) and wire CI. Add observability and a performance budget.
        When the MVP is live and real, you've completed the single most important deliverable of this entire course.
        Commit, push, deploy, and use it.</p>`,
        runHint: "pnpm --filter next-saas build && pnpm --filter next-saas start",
      })}
    </section>
  `,
});
