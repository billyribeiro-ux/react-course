/* Lesson b0-principal/1100 — Design systems at scale. */
registerLesson({
  meta: {
    id: "b0-principal/1100-design-systems-scale",
    title: "Design Systems at Scale",
    part: "b0-principal",
    estMinutes: 13,
    level: "principal",
    project: "design-system",
    lede: "A design system used by many teams across many products is an organizational system, not just a component library. Learn versioning, governance, documentation, and the practices that make a design system actually adopted.",
    objectives: [
      "Version and publish a design system",
      "Govern contributions and breaking changes",
      "Drive adoption across teams",
      "Treat the design system as a product",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>From component library to product</h2>
      <p>
        You built a design system in Part 60. At organizational scale, it becomes a <strong>product with internal
        customers</strong> (other engineers and designers). Its success is measured not by how nice the components are,
        but by how widely and consistently they're <strong>adopted</strong>. That requires versioning, documentation,
        governance, and treating consumers as users.
      </p>

      ${h.callout({
        kind: "principal",
        title: "Versioning and breaking changes",
        body: `<p>Once multiple teams depend on your design system, you can't just change a component — you'd break
        their apps. You need <strong>semantic versioning</strong> and a release process (tools like
        <strong>changesets</strong> automate version bumps and changelogs in a monorepo). Breaking changes need
        deprecation paths, migration guides, and codemods where possible. The discipline of "this is a published API
        others depend on" — backward compatibility, careful deprecation, clear changelogs — is what separates a
        maintainable shared system from one that causes constant breakage and erodes trust.</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Adoption is the real metric",
        body: `<p>A beautiful design system nobody uses is a failure. Adoption is driven by: excellent
        <strong>documentation</strong> (Storybook + usage guides — people use what they can discover and understand),
        making the system <strong>easier than rolling their own</strong> (great DX, sensible defaults, escape hatches
        for edge cases), <strong>involving consumers</strong> (a contribution model so teams can add what they need
        rather than going around it), and visible <strong>support</strong>. The principal running a design system
        thinks like a product manager: who are my users, what do they need, why might they bypass the system, and how
        do I make adoption the path of least resistance?</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Tokens, theming, and multi-brand at scale",
        body: `<p>At scale, the <strong>token layer</strong> (Part 60) becomes critical infrastructure: it's how one
        system supports multiple brands, themes, and platforms (web + mobile) without forking components. Tokens are
        often generated from design tools (Figma) so design and code share a single source of truth. Investing in a
        robust, well-structured token system pays off enormously as the number of products and themes grows — it's the
        foundation that lets the design system scale across an organization.</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Governance prevents drift and chaos",
        body: `<p>Without governance, a "design system" fragments: teams copy-paste-modify components, add one-off
        variants, and consistency erodes. Lightweight governance — contribution guidelines, design + code review for
        additions, a clear owner, a roadmap, and deprecation policies — keeps it coherent. Too <em>much</em> process,
        though, and teams route around it. The balance (enabling contribution while maintaining quality and coherence)
        is a leadership challenge as much as a technical one. Running a design system well is genuinely staff/principal
        work because it's as much about people and process as code.</p>`,
      })}

      ${h.exercise({
        title: "Treat your design system as a product",
        prompt: `<p>For your <code>design-system</code>, set up <strong>versioning</strong> with changesets and write a
        short <strong>contribution guide</strong> and a <strong>deprecation policy</strong>. Document the components in
        Storybook as if for an audience of other teams. Then write a one-page "adoption strategy": how would you get
        five teams to actually use it, and how would you handle a breaking change to the Button? This product-and-people
        thinking is principal-level design-system work.</p>`,
        runHint: "pnpm --filter design-system storybook",
      })}
    </section>
  `,
});
