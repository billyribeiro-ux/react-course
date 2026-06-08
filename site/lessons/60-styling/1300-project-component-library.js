/* Lesson 60-styling/1300 — Project: ship a component library. */
registerLesson({
  meta: {
    id: "60-styling/1300-project-component-library",
    title: "Project: Ship a Themed, Accessible Component Library",
    part: "60-styling",
    estMinutes: 60,
    level: "advanced",
    project: "design-system",
    lede: "Combine everything from Part 60 into a real, reusable component library: design tokens, themed Tailwind v4, accessible Radix-based primitives, typed cva variants, motion, and Storybook docs — packaged for reuse across apps.",
    objectives: [
      "Build a cohesive set of accessible, themed components",
      "Document them all in Storybook",
      "Package them for reuse as shared-ui",
      "Apply tokens, variants, a11y, and motion together",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The goal</h2>
      <p>
        Produce a small but real design system: a token layer, a themed Tailwind setup, and a set of
        accessible, documented, reusable components. The same library you build here (<code>shared-ui</code>)
        gets consumed by the full-stack app in Part 80 and the mobile app in Part 90 — this is foundational,
        not a throwaway.
      </p>

      ${h.callout({
        kind: "principal",
        title: "What 'a design system' really means",
        body: `<p>A design system isn't just components — it's <strong>tokens</strong> (the visual language),
        <strong>components</strong> (accessible, consistent building blocks), and <strong>documentation</strong>
        (so people actually use them). Get all three and you've created leverage: every future feature is faster
        to build and automatically on-brand and accessible. Building and maintaining a design system is often a
        principal/staff engineer's highest-impact work — it multiplies every other engineer's output.</p>`,
      })}

      <h2>The component checklist</h2>
      <p>Build (or refine) at least these, each meeting the full bar:</p>
      <ul>
        <li><strong>Button</strong> — cva variants (primary/secondary/danger/ghost/outline), sizes, loading state, icon support.</li>
        <li><strong>Input + Field</strong> — label association, error/hint via <code>aria-describedby</code>, <code>aria-invalid</code>.</li>
        <li><strong>Dialog</strong> — Radix-based, focus-trapped, Escape to close, themed.</li>
        <li><strong>DropdownMenu</strong> — Radix-based, full keyboard nav.</li>
        <li><strong>Badge</strong>, <strong>Card</strong>, <strong>Toast</strong> — themed, composable.</li>
      </ul>

      ${h.callout({
        kind: "principal",
        title: "The quality bar for every component",
        body: `<p>Each component must: use <strong>semantic HTML</strong> (or Radix), reference only
        <strong>semantic tokens</strong> (so it themes automatically), expose <strong>typed variant props</strong>
        via cva, accept and merge a <strong>className</strong> via <code>cn()</code>, spread native props, have a
        <strong>visible focus state</strong>, be <strong>fully keyboard operable</strong>, meet
        <strong>contrast</strong> requirements, and ship with <strong>Storybook stories</strong> covering its
        states. That checklist <em>is</em> the difference between a demo component and a production one.</p>`,
      })}

      <h2>Packaging for reuse: shared-ui</h2>
      ${h.codePane({
        lang: "ts",
        title: "shared/ui/src/index.ts — the public API",
        readOnly: true,
        code: `// Other apps import from "shared-ui":
//   import { Button, cn } from "shared-ui";
export { cn } from "./lib/cn.ts";
export { Button, buttonVariants, type ButtonProps } from "./Button.tsx";
// ...export each component + its types as you build them.`,
      })}

      ${h.callout({
        kind: "note",
        title: "How shared-ui works in this monorepo",
        body: `<p>The course's <code>shared/ui</code> package is a pnpm workspace package exporting its source
        directly (no build step) — so any app in the monorepo can <code>import { Button } from "shared-ui"</code>
        and Vite/Next compiles it in context. The companion <code>shared-ui/styles.css</code> ships the design
        tokens via <code>@theme</code>. This is a simple, real-world way to share UI across apps; larger orgs
        publish such a package to a private registry, versioned with changesets (Part B0).</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Tokens travel with the components",
        body: `<p>For components to look right in a consuming app, the app must include the design tokens. That's
        why <code>shared-ui</code> exports both the components <em>and</em> a <code>styles.css</code> with the
        <code>@theme</code> tokens. Apps import both and can remap the semantic tokens for their own brand or
        dark mode — the components don't change, only the token values do. This clean separation of
        component-behavior from theme-values is what makes a library reusable across products.</p>`,
      })}

      ${h.exercise({
        title: "Build and document the library",
        prompt: `<p>In the <code>design-system</code> project, build out the component set above to the full
        quality bar, then promote the stable ones into the <code>shared/ui</code> package's exports. Write
        Storybook stories for each (covering variants and edge states) and run
        <code>pnpm --filter design-system storybook</code> to review your living catalog. Verify the whole thing
        keyboard-navigates and passes <code>pnpm lint</code> + <code>pnpm typecheck</code> + <code>pnpm build</code>.
        Commit your design system.</p>`,
        runHint: "pnpm --filter design-system build && pnpm --filter design-system storybook",
      })}

      ${h.callout({
        kind: "principal",
        title: "You can build design systems now",
        body: `<p>You've built a themed, accessible, documented, reusable component library — the foundation
        serious product teams stand on. You understand tokens, Tailwind v4, headless primitives, variant systems,
        accessibility, motion, and Storybook. Next, Part 70 adds the other half of real apps: routing, server
        state with TanStack Query, and forms with React Hook Form + Zod — the data layer that brings your
        beautiful components to life with real information. 🎨→🔌</p>`,
      })}
    </section>
  `,
});
