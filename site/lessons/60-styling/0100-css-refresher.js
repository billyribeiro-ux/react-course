/* Lesson 60-styling/0100 — CSS refresher for app devs. */
registerLesson({
  meta: {
    id: "60-styling/0100-css-refresher",
    title: "CSS Refresher for App Developers",
    part: "60-styling",
    estMinutes: 18,
    level: "intermediate",
    project: "design-system",
    lede: "Before tools like Tailwind, you need the CSS fundamentals they're built on: the box model, flexbox, grid, and the cascade. Solid CSS is what separates UIs that look right from ones that almost do.",
    objectives: [
      "Understand the box model and sizing",
      "Lay out with flexbox and grid",
      "Grasp the cascade, specificity, and inheritance",
      "Know the properties you'll reach for daily",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The box model</h2>
      <p>
        Every element is a box: <strong>content</strong>, wrapped in <strong>padding</strong>, wrapped in a
        <strong>border</strong>, wrapped in <strong>margin</strong>. The universal fix everyone applies:
        <code>box-sizing: border-box</code> so width/height include padding and border (far more intuitive).
      </p>

      ${h.codePane({
        lang: "css",
        title: "Box sizing",
        readOnly: true,
        code: `* { box-sizing: border-box; }

.card {
  width: 300px;       /* includes padding + border, not added on top */
  padding: 1rem;
  border: 1px solid #ccc;
  margin: 0.5rem;     /* space OUTSIDE the box */
}`,
      })}

      <h2>Flexbox: one-dimensional layout</h2>
      <p>Flexbox arranges items in a row or column and distributes space. It's your default for most layout:</p>

      ${h.codePane({
        lang: "css",
        title: "Flexbox",
        readOnly: true,
        code: `.toolbar {
  display: flex;
  align-items: center;        /* vertical alignment (cross axis) */
  justify-content: space-between; /* horizontal distribution (main axis) */
  gap: 1rem;                  /* space between items — no margin hacks */
}`,
      })}

      <h2>Grid: two-dimensional layout</h2>
      ${h.codePane({
        lang: "css",
        title: "Grid",
        readOnly: true,
        code: `.board {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 equal columns */
  gap: 1rem;
}

/* Responsive auto-fit grid — fills as many columns as fit: */
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Flexbox vs Grid",
        body: `<p>Rule of thumb: <strong>Flexbox</strong> for laying out content in one direction (a row of
        buttons, a vertical stack); <strong>Grid</strong> for two-dimensional layouts (page structure, card
        galleries, dashboards). They compose — a grid cell can contain a flex row. Modern CSS layout is
        genuinely powerful; the float/clearfix hacks of the past are gone. Master these two and you can build
        any layout. Tailwind (next lessons) just gives you utility classes for these exact properties.</p>`,
      })}

      <h2>The cascade, specificity & inheritance</h2>
      <ul>
        <li><strong>Cascade:</strong> when rules conflict, later rules and more specific selectors win.</li>
        <li><strong>Specificity:</strong> inline styles &gt; ids &gt; classes &gt; elements. Higher specificity wins regardless of order.</li>
        <li><strong>Inheritance:</strong> some properties (color, font) pass from parent to child; layout properties don't.</li>
      </ul>

      ${h.callout({
        kind: "gotcha",
        title: "Specificity wars and !important",
        body: `<p>When styles "won't apply," it's usually a more specific selector overriding you. The bad fix
        is <code>!important</code> (which starts an escalation war); the good fix is keeping specificity low and
        flat. This is a major reason utility-class systems like <strong>Tailwind</strong> became popular — every
        utility has the same low specificity, so conflicts are predictable and the cascade stops being a
        battlefield. You'll feel this relief in the next lessons.</p>`,
      })}

      <h2>Units and modern values</h2>
      ${h.codePane({
        lang: "css",
        title: "Units worth knowing",
        readOnly: true,
        code: `.thing {
  padding: 1rem;        /* rem = relative to root font-size (scales nicely) */
  width: 50%;           /* relative to parent */
  max-width: 60ch;      /* ch = character width — great for readable text */
  height: 100dvh;       /* dynamic viewport height (mobile-safe) */
  font-size: clamp(1rem, 2.5vw, 1.5rem); /* fluid, bounded sizing */
}`,
      })}

      ${h.callout({
        kind: "principal",
        body: `<p>Prefer relative units (<code>rem</code>, <code>%</code>, <code>ch</code>,
        <code>fr</code>) over fixed pixels for layouts that scale and respect user font-size settings (an
        accessibility win). <code>clamp()</code> gives fluid-but-bounded sizing without media queries. These
        small choices compound into interfaces that work across devices and for all users.</p>`,
      })}

      ${h.exercise({
        title: "Rebuild a layout by hand",
        prompt: `<p>In a scratch HTML file (or the design-system project), build a simple card layout: a
        centered container with <code>max-width</code>, a flex header (title left, button right via
        <code>justify-content: space-between</code>), and a responsive grid of cards using
        <code>auto-fill</code>/<code>minmax</code>. Do it in plain CSS first — understanding the properties is
        what makes Tailwind's utility names meaningful rather than magic.</p>`,
        runHint: "pnpm --filter design-system dev",
      })}
    </section>
  `,
});
