/* Lesson 60-styling/0400 — Tailwind CSS v4. */
registerLesson({
  meta: {
    id: "60-styling/0400-tailwind-v4",
    title: "Tailwind CSS v4: Setup & the CSS-First @theme",
    part: "60-styling",
    estMinutes: 18,
    level: "intermediate",
    project: "design-system",
    lede: "Tailwind is a utility-first CSS framework: you style by composing small classes in your markup. v4 reimagined configuration around CSS itself. Learn the model, the workflow, and why it scales.",
    objectives: [
      "Set up Tailwind v4 with the Vite plugin",
      "Style components with utility classes",
      "Configure the theme in CSS with @theme",
      "Build responsive, state-aware styles inline",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Utility-first, briefly</h2>
      <p>
        Instead of writing CSS rules and naming classes, you compose pre-made <strong>utility classes</strong>
        directly in your JSX: <code>flex</code>, <code>p-4</code>, <code>bg-brand</code>,
        <code>rounded-md</code>. It feels verbose at first and then becomes remarkably fast — no context-switching
        to a CSS file, no naming, consistent spacing/colors by construction.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "Utilities in markup",
        readOnly: true,
        code: `<button className="inline-flex items-center gap-2 rounded-md
                   bg-brand px-4 py-2 font-semibold text-white
                   hover:bg-brand-hover focus-visible:outline-2">
  Save
</button>`,
      })}

      <h2>Setup in v4 (it's tiny)</h2>
      <p>Tailwind v4 is a Vite plugin and a single CSS import — no <code>tailwind.config.js</code>, no PostCSS
      file needed:</p>

      ${h.codePane({
        lang: "ts",
        title: "vite.config.ts",
        readOnly: true,
        code: `import tailwindcss from "@tailwindcss/vite";
export default defineConfig({ plugins: [react(), tailwindcss()] });`,
      })}

      ${h.codePane({
        lang: "css",
        title: "src/index.css",
        readOnly: true,
        code: `@import "tailwindcss";   /* that's the whole import */`,
      })}

      ${h.callout({
        kind: "principal",
        title: "v4's big shift: CSS-first configuration",
        body: `<p>Tailwind v3 configured everything in a JavaScript <code>tailwind.config.js</code>. v4 moves
        configuration into <strong>CSS</strong> via the <code>@theme</code> block, where you declare design
        tokens as CSS variables and Tailwind generates utilities from them. This is faster (a new
        Rust/Oxide engine), simpler (one less config language), and aligns with the platform (your tokens are
        real CSS custom properties usable anywhere). It's the modern, recommended setup.</p>`,
      })}

      <h2>Defining your theme with <code>@theme</code></h2>
      ${h.codePane({
        lang: "css",
        title: "Design tokens drive utilities",
        readOnly: true,
        code: `@theme {
  --color-brand: oklch(58% 0.18 255);   /* generates bg-brand, text-brand... */
  --color-brand-hover: oklch(50% 0.2 255);
  --radius-md: 0.625rem;                 /* generates rounded-md */
  --font-display: "Inter", sans-serif;   /* generates font-display */
}
/* Now className="bg-brand rounded-md font-display" just works. */`,
      })}

      <h2>Responsive & state variants</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Variants are prefixes",
        readOnly: true,
        code: `<div className="
  grid grid-cols-1       /* mobile: 1 column (mobile-first default) */
  md:grid-cols-2         /* >= md breakpoint: 2 columns */
  lg:grid-cols-3         /* >= lg: 3 columns */
  gap-4
  hover:shadow-lg        /* on hover */
  dark:bg-surface        /* in dark mode */
  focus-within:ring-2    /* when a child is focused */
">...</div>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Why this scales (the cascade objection answered)",
        body: `<p>The common first reaction is "this clutters my markup!" But consider what you <em>gain</em>:
        every utility has identical low specificity (no cascade wars), styles are colocated with markup (delete
        the element, the styles go too — no orphaned CSS), spacing/colors come from a constrained scale (visual
        consistency by default), and there are no class names to invent. For repeated patterns you extract a
        <em>component</em> (a React <code>&lt;Button&gt;</code>), not a CSS class — which you're already doing.
        At team scale, these properties matter more than terse markup. That's the trade Tailwind makes
        deliberately.</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Don't fight it with @apply everywhere",
        body: `<p>Tailwind has an <code>@apply</code> directive to inline utilities into a CSS class. Overusing
        it recreates the naming/cascade problems Tailwind solves. The idiomatic v4 approach is utilities in
        markup, abstracted into <em>components</em> (and variant systems like cva — Lesson 8) when repeated.
        Reserve <code>@apply</code> for rare cases like styling third-party markup you don't control.</p>`,
      })}

      ${h.exercise({
        title: "Style with Tailwind",
        prompt: `<p>In the design-system project (Tailwind v4 is already set up), build a profile card using only
        utility classes: a responsive layout (<code>flex</code>/<code>grid</code> with breakpoint variants),
        your <code>@theme</code> brand colors, hover and focus states, and dark-mode variants. Add a new token
        to <code>@theme</code> and use its generated utility. You'll feel the speed once it clicks.</p>`,
        runHint: "pnpm --filter design-system dev",
      })}
    </section>
  `,
});
