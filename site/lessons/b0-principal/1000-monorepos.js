/* Lesson b0-principal/1000 — Monorepos with Turborepo + pnpm. */
registerLesson({
  meta: {
    id: "b0-principal/1000-monorepos",
    title: "Monorepos with Turborepo & pnpm",
    part: "b0-principal",
    estMinutes: 14,
    level: "principal",
    project: "next-saas",
    lede: "When you have a web app, a mobile app, and shared packages (like this course!), a monorepo keeps them together with shared code and tooling. Turborepo makes the builds and CI fast through caching.",
    objectives: [
      "Structure a monorepo with pnpm workspaces",
      "Share code across apps and packages",
      "Speed up tasks with Turborepo caching",
      "Weigh monorepo trade-offs",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Why a monorepo?</h2>
      <p>
        A <strong>monorepo</strong> holds multiple apps and packages in one repository. For a product with a web app,
        a mobile app, and shared code (types, validation schemas, UI, API clients — exactly the sharing you've built
        toward), a monorepo lets them <strong>share code directly</strong>, evolve together atomically (one PR changes
        a schema <em>and</em> both apps that use it), and share tooling/config. This course itself is a pnpm-workspace
        monorepo.
      </p>

      ${h.codePane({
        lang: "yaml",
        title: "pnpm-workspace.yaml (you've seen this)",
        readOnly: true,
        code: `packages:
  - "apps/*"        # web (Next.js), mobile (Expo)
  - "packages/*"    # shared-ui, shared-core (types/schemas/api client), config

# Apps import shared packages by name:
#   import { Button } from "@acme/ui";
#   import { projectSchema } from "@acme/core";
# Change a schema once; every app re-types against it.`,
      })}

      ${h.callout({
        kind: "principal",
        title: "The shared package is the payoff",
        body: `<p>The killer benefit is a <strong>shared core</strong>: put your Zod schemas, TypeScript types, and API
        client in a package consumed by the Next.js app, the Expo app, and even the backend. Change a validation rule
        once and <em>every</em> consumer updates and re-type-checks together — no drift between web, mobile, and server.
        This is what makes a multi-platform product (Parts 80 & 90) maintainable by a small team. The monorepo isn't
        bureaucracy; it's the structure that makes "build once, ship everywhere" real.</p>`,
      })}

      <h2>Turborepo: make it fast</h2>
      ${h.callout({
        kind: "principal",
        title: "Caching and task orchestration",
        body: `<p>As a monorepo grows, naively running "build/test/lint everything" gets slow. <strong>Turborepo</strong>
        (and Nx) fix this with <strong>caching</strong> and a <strong>task graph</strong>: it only re-runs tasks for
        packages that actually changed (and their dependents), and caches results so unchanged work is skipped
        instantly — locally and in CI (via a <em>remote cache</em> shared across the team and CI machines). A CI run
        that touches one package doesn't rebuild the other twenty. This is what keeps large-monorepo CI fast (the Part
        A0 "fast CI" principle at scale). Turborepo also runs tasks in the right order based on dependencies and in
        parallel where possible.</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Monorepos have real trade-offs",
        body: `<p>They're not free: tooling is more complex, the repo is larger, versioning shared packages needs
        thought (often <strong>changesets</strong> for publishing), and React Native/Metro can be finicky inside one
        (which is why this course's Expo app is standalone). They shine for <strong>tightly-coupled</strong> projects
        that share lots of code and ship together; for <strong>independent</strong> products with separate teams and
        release cycles, separate repos can be simpler. The principal move is matching repo strategy to how the code and
        teams actually relate — not cargo-culting "monorepo" or "polyrepo."</p>`,
      })}

      ${h.exercise({
        title: "Add Turborepo and a shared package",
        prompt: `<p>This course is already a pnpm monorepo with a <code>shared/ui</code> package. Extend it: create a
        <code>shared/core</code> package holding the Zod schemas and types used by LaunchPad (web) and LaunchPad Mobile,
        and import from it in both. Then add <strong>Turborepo</strong> with a <code>turbo.json</code> defining build/
        test/lint/typecheck tasks, and run them — observe the caching skip unchanged work on the second run. You've
        built a real scalable monorepo.</p>`,
        runHint: "pnpm dlx turbo run typecheck lint test",
      })}
    </section>
  `,
});
