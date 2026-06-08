/* Lesson 60-styling/0700 — shadcn/ui: the own-your-components model. */
registerLesson({
  meta: {
    id: "60-styling/0700-shadcn",
    title: "shadcn/ui: The Own-Your-Components Model",
    part: "60-styling",
    estMinutes: 14,
    level: "advanced",
    project: "design-system",
    lede: "shadcn/ui isn't a dependency you install — it's a collection of beautifully-built, accessible components you copy into your project and own. This distribution model has reshaped how teams build design systems.",
    objectives: [
      "Understand the copy-in (not install) model",
      "Add components with the shadcn CLI",
      "Customize freely because you own the code",
      "Know the trade-offs vs a packaged library",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>A different kind of component library</h2>
      <p>
        Traditional libraries (Material UI, Ant) are npm packages: you install them and theme around their
        constraints. <strong>shadcn/ui</strong> flips this — it's a registry of components (built on Radix +
        Tailwind) that you <strong>copy directly into your codebase</strong>. They become <em>your</em> files,
        which you can read, understand, and modify without limits.
      </p>

      ${h.codePane({
        lang: "bash",
        title: "Adding a component",
        readOnly: true,
        code: `# Initialize shadcn in your project (configures paths, Tailwind, cn())
pnpm dlx shadcn@latest init

# Add components — they're copied into src/components/ui/
pnpm dlx shadcn@latest add button dialog dropdown-menu

# Now src/components/ui/button.tsx is YOURS — edit it however you like.`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Why 'own the code' is powerful",
        body: `<p>With a packaged library, customizing beyond its theming options means fighting the library or
        ejecting. With shadcn, there's nothing to fight — the component is your code (Radix for behavior, cva +
        Tailwind for variants, the <code>cn()</code> helper you already wrote). Need a new variant? Edit the
        file. Need to change behavior? It's right there. You get a professional starting point <em>and</em> full
        control. This model has become the default way modern teams bootstrap a design system: start from
        shadcn, then evolve it into your own. It's also why understanding Radix and cva (which shadcn is built
        from) matters — you're not using a black box, you're owning the building blocks.</p>`,
      })}

      <h2>What a shadcn component looks like</h2>
      ${h.callout({
        kind: "note",
        body: `<p>The <code>Button</code> you built earlier in this project — Radix-compatible, cva variants,
        <code>cn()</code> merging, typed props — is essentially a shadcn-style component. That's intentional:
        you've already learned to build exactly what shadcn gives you. shadcn just provides a polished,
        accessible starting set so you don't author every primitive from zero.</p>`,
      })}

      <h2>Trade-offs (be honest)</h2>
      <ul>
        <li><strong>Pro:</strong> total control, no version-lock, easy customization, great defaults, accessible (Radix-based).</li>
        <li><strong>Pro:</strong> no opaque dependency; you can read and debug every line.</li>
        <li><strong>Con:</strong> you "own" the code — including keeping it updated (no <code>npm update</code> for bug fixes; you re-pull or patch manually).</li>
        <li><strong>Con:</strong> components live in your repo, so your codebase is a bit larger.</li>
      </ul>

      ${h.callout({
        kind: "principal",
        title: "When to use what",
        body: `<p>For most product teams building a branded experience, shadcn's own-it model is ideal — you want
        control and a custom look. A fully-packaged library (MUI) can still make sense for internal tools or
        when you want batteries-included theming and don't need bespoke design. There's no universally "right"
        answer; the principal move is matching the tool to the project's needs and being able to articulate
        <em>why</em>. Knowing how shadcn works under the hood (which you now do) means you can adopt it without
        it being magic.</p>`,
      })}

      ${h.exercise({
        title: "Extend your owned components",
        prompt: `<p>Treat your design-system's <code>Button</code> as a shadcn-style owned component: add a new
        <code>"outline"</code> variant and a <code>"icon"</code> size by editing its cva config directly —
        notice there's nothing to fight, it's your file. Then sketch which shadcn components you'd
        <code>add</code> for a real app (button, dialog, dropdown, input, card, toast) and how you'd theme them
        with your tokens. You're now equipped to bootstrap a production design system.</p>`,
        runHint: "pnpm --filter design-system dev",
      })}
    </section>
  `,
});
