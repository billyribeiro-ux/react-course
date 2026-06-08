/* Lesson 60-styling/0300 — CSS Modules in React. */
registerLesson({
  meta: {
    id: "60-styling/0300-css-modules",
    title: "CSS Modules & Styling Approaches in React",
    part: "60-styling",
    estMinutes: 14,
    level: "intermediate",
    project: "design-system",
    lede: "Before Tailwind, understand the styling landscape: global CSS, CSS Modules (locally-scoped classes), and where each fits. Knowing the trade-offs lets you make an informed choice, not a fashionable one.",
    objectives: [
      "Use CSS Modules for locally-scoped styles",
      "Understand the global-CSS scaling problem",
      "Compare the main styling approaches",
      "Choose an approach deliberately",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The problem with global CSS</h2>
      <p>
        Plain CSS is global: a class name defined anywhere applies everywhere. In a large app this leads to
        name collisions, fear of deleting styles ("is this used somewhere?"), and specificity wars. Several
        solutions emerged to <em>scope</em> styles to components.
      </p>

      <h2>CSS Modules: automatic scoping</h2>
      <p>
        A <strong>CSS Module</strong> is a <code>.module.css</code> file whose class names are automatically
        made unique at build time, so they can't collide. You import them as a JS object:
      </p>

      ${h.codePane({
        lang: "css",
        title: "Button.module.css",
        readOnly: true,
        code: `.button {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background: var(--brand);
}
.primary { font-weight: 700; }`,
      })}

      ${h.codePane({
        lang: "tsx",
        title: "Button.tsx",
        readOnly: true,
        code: `import styles from "./Button.module.css";

export function Button({ primary }: { primary?: boolean }) {
  // 'styles.button' becomes something like "Button_button_a1b2c3" — unique
  return (
    <button className={\`\${styles.button} \${primary ? styles.primary : ""}\`}>
      Click
    </button>
  );
}`,
      })}

      ${h.callout({
        kind: "note",
        title: "Vite supports CSS Modules out of the box",
        body: `<p>Any file named <code>*.module.css</code> is treated as a CSS Module by Vite (and Next.js) —
        no configuration. The imported object maps your class names to their generated unique versions. This
        gives you locally-scoped, collision-free styles while writing normal CSS.</p>`,
      })}

      <h2>The landscape of approaches</h2>
      <ul>
        <li><strong>Global CSS</strong> — simple, but scales poorly. Fine for resets, tokens, base styles.</li>
        <li><strong>CSS Modules</strong> — scoped, plain CSS, zero runtime. Great default for component styles.</li>
        <li><strong>Utility-first (Tailwind)</strong> — compose styles from utility classes in markup. Fast, consistent, no naming. The dominant choice in 2026 (next lessons).</li>
        <li><strong>CSS-in-JS</strong> (styled-components, Emotion) — styles in JS with dynamic props. Powerful but has runtime cost and tension with Server Components; declining for new projects.</li>
      </ul>

      ${h.callout({
        kind: "principal",
        title: "Why the industry consolidated on Tailwind",
        body: `<p>For most product teams in 2026, <strong>Tailwind</strong> won because it eliminates the two
        hardest parts of CSS at scale: <em>naming things</em> and <em>the cascade</em>. Utilities have flat
        specificity, live next to the markup they style (so you delete a component and its styles vanish with
        it), and enforce a consistent design scale. CSS-in-JS, popular in the 2018–2022 era, fell out of favor
        partly because its runtime cost and dynamic nature clash with Server Components (Part 80). That said,
        CSS Modules remain a perfectly good, zero-runtime choice — and knowing the trade-offs is what lets you
        defend a decision rather than follow a trend.</p>`,
      })}

      ${h.callout({
        kind: "tip",
        body: `<p>These approaches aren't mutually exclusive. A common real setup: Tailwind for most styling,
        a global stylesheet for tokens/resets, and the occasional CSS Module for a complex component that's
        awkward in utilities. Pragmatism over purity.</p>`,
      })}

      ${h.exercise({
        title: "Try CSS Modules",
        prompt: `<p>In the design-system project, create one component styled with a CSS Module
        (<code>Badge.module.css</code> + <code>Badge.tsx</code>) and confirm the generated class names are
        scoped (inspect them in DevTools). Then note how the Tailwind-based <code>Button</code> compares in
        authoring experience. You'll spend the rest of this part in Tailwind, but you now understand the
        alternative and why teams choose between them.</p>`,
        runHint: "pnpm --filter design-system dev",
      })}
    </section>
  `,
});
