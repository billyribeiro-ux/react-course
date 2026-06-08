/* Lesson b0-principal/0800 — Component API design & composition patterns. */
registerLesson({
  meta: {
    id: "b0-principal/0800-component-api-design",
    title: "Component API Design & Composition Patterns",
    part: "b0-principal",
    estMinutes: 16,
    level: "principal",
    project: "design-system",
    lede: "Designing a component's API — its props, its flexibility, how it composes — is one of the most consequential and subtle skills in React. Learn the patterns that make components a joy to use and easy to evolve.",
    objectives: [
      "Design clear, flexible component APIs",
      "Apply compound components and the 'asChild' pattern",
      "Build headless/controlled-vs-uncontrolled components",
      "Balance flexibility against simplicity",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The API is the contract</h2>
      <p>
        A component's props are its API — and like any API, it's hard to change once people depend on it. Good
        component design makes the common case easy, the complex case possible, and misuse hard. This is where the
        composition principles from Part 60 deepen into deliberate patterns.
      </p>

      <h2>Compound components</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Related parts that share implicit state",
        readOnly: true,
        code: `// Instead of a mega-prop API, expose composable parts:
<Tabs defaultValue="account">
  <Tabs.List>
    <Tabs.Trigger value="account">Account</Tabs.Trigger>
    <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="account"><AccountPanel /></Tabs.Content>
  <Tabs.Content value="billing"><BillingPanel /></Tabs.Content>
</Tabs>
// The parts share state via context; the consumer composes them freely.
// This is how Radix and shadcn structure complex components.`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Compound components scale where prop-explosion fails",
        body: `<p>A configuration-heavy component accretes props forever (<code>tabTitles</code>, <code>tabIcons</code>,
        <code>tabDisabled</code>, <code>renderTabContent</code>…) and never quite fits every case. <strong>Compound
        components</strong> invert this: the parent manages shared state via context, and the consumer composes the
        parts (<code>Tabs.Trigger</code>, <code>Tabs.Content</code>) however they need. This gives near-infinite
        flexibility with a small, stable API. It's the pattern behind every great primitive library. Recognizing when a
        component should be compound vs simple-props is a core design-engineering judgment.</p>`,
      })}

      <h2>Controlled vs uncontrolled</h2>
      ${h.callout({
        kind: "principal",
        title: "Support both, default to uncontrolled",
        body: `<p>A well-designed input/widget supports <strong>both</strong> modes: <em>uncontrolled</em> (it manages
        its own state, with an optional <code>defaultValue</code> — easy for the common case) and <em>controlled</em>
        (the parent owns state via <code>value</code> + <code>onChange</code> — for when you need full control). The
        pattern: if a <code>value</code> prop is provided, be controlled; otherwise manage internally. This flexibility
        is why native inputs and Radix components feel so usable — they don't force one mode. Designing for both is a
        mark of a mature component API.</p>`,
      })}

      <h2>Headless & the asChild pattern</h2>
      ${h.callout({
        kind: "principal",
        title: "Separate behavior from presentation",
        body: `<p>The most flexible pattern is <strong>headless</strong>: a component (or hook) provides behavior/state/
        accessibility but no markup, letting consumers render whatever they want (Radix, TanStack Table/Query work this
        way). The <code>asChild</code> pattern (Part 60) lets a component lend its behavior to <em>your</em> element
        rather than rendering its own. Together they maximize reuse: the hard, universal part (behavior, a11y) is
        shared, and the infinitely-variable part (look) is yours. When designing a reusable component, ask "could the
        behavior be headless?" — it often leads to a more flexible, longer-lived API.</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Don't over-engineer simple components",
        body: `<p>Not every component needs compound parts, controlled/uncontrolled modes, and headless flexibility — a
        simple <code>&lt;Button&gt;</code> with a few props is perfect as-is. Reserve the advanced patterns for
        components that are <strong>genuinely reused widely and need flexibility</strong>. Applying heavy patterns to a
        one-off component is its own anti-pattern. Match the API's sophistication to the component's actual reuse and
        variability.</p>`,
      })}

      ${h.exercise({
        title: "Design a flexible component",
        prompt: `<p>In your <code>design-system</code>, build one component using an advanced pattern: a
        <strong>compound</strong> <code>Tabs</code> or <code>Accordion</code> (parts sharing context), OR a
        <strong>controlled/uncontrolled</strong> input that works both ways. Write Storybook stories showing both the
        simple and advanced usage. Critique your API: is the common case easy? Is misuse hard? Could it be more
        composable? This design judgment is the heart of building a great component library.</p>`,
        runHint: "pnpm --filter design-system storybook",
      })}
    </section>
  `,
});
