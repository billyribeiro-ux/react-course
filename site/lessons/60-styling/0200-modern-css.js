/* Lesson 60-styling/0200 — Modern CSS. */
registerLesson({
  meta: {
    id: "60-styling/0200-modern-css",
    title: "Modern CSS: Container Queries, :has(), OKLCH & Nesting",
    part: "60-styling",
    estMinutes: 16,
    level: "advanced",
    project: "design-system",
    lede: "CSS in 2026 is dramatically more capable than the CSS of a few years ago. These features change how you build responsive, themeable, component-driven UIs — and Tailwind v4 embraces all of them.",
    objectives: [
      "Use container queries for truly modular components",
      "Style based on content with :has()",
      "Work in the OKLCH color space",
      "Use native nesting and custom properties",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Container queries: components that adapt to their container</h2>
      <p>
        Media queries respond to the <em>viewport</em>. But a component might live in a wide main area or a
        narrow sidebar — its layout should depend on <em>its own</em> space, not the whole screen.
        <strong>Container queries</strong> make that possible, which is what truly modular components need.
      </p>

      ${h.codePane({
        lang: "css",
        title: "Container queries",
        readOnly: true,
        code: `.card-list {
  container-type: inline-size;   /* establish a query container */
}

/* The card restyles based on the CONTAINER's width, not the viewport: */
@container (min-width: 400px) {
  .card { display: grid; grid-template-columns: auto 1fr; }
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Why this matters for design systems",
        body: `<p>A reusable component shouldn't care where it's placed — drop it in a sidebar or a full-width
        page and it should adapt. Container queries finally make components <em>self-contained</em> in their
        responsiveness, which is exactly the modularity a design system demands. This is a genuine leap;
        before container queries, "responsive components" always leaked assumptions about the page layout.</p>`,
      })}

      <h2><code>:has()</code> — the "parent selector"</h2>
      ${h.codePane({
        lang: "css",
        title: ":has()",
        readOnly: true,
        code: `/* Style a card differently if it CONTAINS an image: */
.card:has(img) { padding: 0; }

/* Style a label when its checkbox is checked (no JS!): */
label:has(input:checked) { font-weight: bold; }

/* A form row that has an invalid input: */
.field:has(:invalid) { border-color: red; }`,
      })}

      ${h.callout({
        kind: "tip",
        body: `<p><code>:has()</code> was long the most-requested CSS feature — selecting an element based on
        what's <em>inside</em> it. It enables interactions and conditional styling that previously required
        JavaScript. Combined with <code>:checked</code>, <code>:focus-within</code>, and form pseudo-classes,
        a surprising amount of "interactive" UI is now pure CSS.</p>`,
      })}

      <h2>OKLCH: a better color space</h2>
      ${h.codePane({
        lang: "css",
        title: "OKLCH color",
        readOnly: true,
        code: `:root {
  /* oklch(Lightness Chroma Hue) — perceptually uniform */
  --brand: oklch(58% 0.18 255);

  /* Create consistent variations by adjusting ONE value: */
  --brand-hover: oklch(50% 0.18 255);  /* same hue, darker */
  --brand-subtle: oklch(95% 0.03 255); /* same hue, light tint */
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Why OKLCH over hex/RGB",
        body: `<p>In OKLCH, the lightness value actually matches <em>perceived</em> brightness, so two colors
        with the same L look equally bright — unlike HSL, where yellow at 50% looks far brighter than blue at
        50%. This makes generating consistent palettes, accessible contrast, and hover/active states
        predictable: tweak one channel and get a sensible result. It also accesses a wider gamut on modern
        displays. Our design-system tokens (and Tailwind v4's defaults) use OKLCH for exactly these reasons.</p>`,
      })}

      <h2>Native nesting & custom properties</h2>
      ${h.codePane({
        lang: "css",
        title: "Nesting + variables",
        readOnly: true,
        code: `.card {
  --pad: 1rem;            /* custom property (CSS variable) */
  padding: var(--pad);

  & .title { font-weight: 700; }   /* native nesting — no preprocessor */
  &:hover { box-shadow: 0 4px 12px oklch(0% 0 0 / 0.1); }
}`,
      })}

      ${h.callout({
        kind: "note",
        body: `<p>CSS now has <strong>native nesting</strong> (no Sass needed) and <strong>custom
        properties</strong> that update at runtime (great for theming — change a variable, everything using it
        updates). These power the token system you'll build. Tailwind v4 leans on custom properties heavily,
        which is why its theming is so flexible.</p>`,
      })}

      ${h.exercise({
        title: "Apply modern CSS",
        prompt: `<p>In the design-system project, add a card component that uses a <strong>container query</strong>
        to switch between stacked and side-by-side layouts based on its container width, and a
        <code>:has()</code> rule that changes styling when the card contains a badge. Define its colors with
        OKLCH custom properties. Notice how much you can do with zero JavaScript.</p>`,
        runHint: "pnpm --filter design-system dev",
      })}
    </section>
  `,
});
