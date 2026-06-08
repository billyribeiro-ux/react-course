/* Lesson 60-styling/0500 — Design tokens & theming. */
registerLesson({
  meta: {
    id: "60-styling/0500-design-tokens-theming",
    title: "Design Tokens & Theming (Light/Dark)",
    part: "60-styling",
    estMinutes: 16,
    level: "advanced",
    project: "design-system",
    lede: "Design tokens are the named, reusable values — colors, spacing, radii — that give a product visual consistency. Done right, they make theming (light/dark, brands) almost free.",
    objectives: [
      "Define semantic design tokens",
      "Implement light/dark theming with CSS variables",
      "Toggle themes without flashing or flicker",
      "Understand semantic vs primitive tokens",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>What are design tokens?</h2>
      <p>
        <strong>Design tokens</strong> are named design decisions: <code>--color-brand</code>,
        <code>--space-4</code>, <code>--radius-md</code>. Instead of scattering raw values
        (<code>#4f46e5</code>) across your code, you reference tokens. Change the token once and the whole
        product updates — and you can swap whole token sets to re-theme.
      </p>

      <h2>Primitive vs semantic tokens</h2>
      ${h.codePane({
        lang: "css",
        title: "Two layers of tokens",
        readOnly: true,
        code: `@theme {
  /* PRIMITIVE tokens — the raw palette */
  --color-blue-500: oklch(58% 0.18 255);
  --color-gray-900: oklch(25% 0.02 260);

  /* SEMANTIC tokens — meaning, mapped to primitives */
  --color-brand: var(--color-blue-500);   /* "the brand color" */
  --color-fg: var(--color-gray-900);       /* "default text" */
  --color-surface: oklch(100% 0 0);        /* "card background" */
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Semantic tokens are the key to theming",
        body: `<p>Components should reference <strong>semantic</strong> tokens (<code>bg-surface</code>,
        <code>text-fg</code>, <code>border-border</code>) — never raw colors or even primitives. Why? Because
        a theme is just a different mapping of semantic tokens to values. In dark mode, <code>--color-fg</code>
        becomes light and <code>--color-surface</code> becomes dark — and every component that used
        <code>text-fg</code> flips automatically, with zero component changes. This indirection (component →
        semantic token → value) is the single most important idea in scalable theming. Get it right and
        light/dark, high-contrast, and multi-brand themes all become trivial.</p>`,
      })}

      <h2>Implementing light/dark</h2>
      ${h.codePane({
        lang: "css",
        title: "Theme = remap semantic tokens",
        readOnly: true,
        code: `@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --color-fg: oklch(25% 0.02 260);     /* light theme */
  --color-surface: oklch(100% 0 0);
}

.dark {
  --color-fg: oklch(94% 0.01 260);     /* dark theme overrides */
  --color-surface: oklch(24% 0.02 260);
}
/* Components use bg-surface / text-fg — they don't know which theme is active. */`,
      })}

      <h2>Toggling the theme in React (no flicker)</h2>
      ${h.codePane({
        lang: "tsx",
        title: "A theme hook",
        readOnly: true,
        code: `function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(
    () => (localStorage.getItem("theme") as "light" | "dark") ?? "dark"
  );
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);
  return { theme, toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")) };
}`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Avoid the flash of wrong theme",
        body: `<p>If you read the theme only after React mounts, users briefly see the default theme then a
        flicker to their choice. The fix: set the <code>.dark</code> class in a tiny inline
        <code>&lt;script&gt;</code> in the HTML <em>before</em> the app renders (reading
        <code>localStorage</code> synchronously). This course's own site does exactly that — peek at the
        <code>&lt;head&gt;</code> of <code>lesson.html</code>. In Next.js you'll handle this with the same
        pattern or a library like <code>next-themes</code> (Part 80).</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Tokens are a contract with design",
        body: `<p>A shared token set is the bridge between design and engineering: designers work in tokens
        (in Figma), engineers consume the same tokens in code, and they stay in sync. Tools can even generate
        CSS tokens from a design file. At principal level, you think of the token layer as the product's
        visual API — stable, versioned, and the foundation everything else is built on.</p>`,
      })}

      ${h.exercise({
        title: "Build a real theme system",
        prompt: `<p>In the design-system project, structure your <code>@theme</code> into primitive and semantic
        tokens. Make every component reference only semantic tokens. Implement a flicker-free light/dark toggle
        (set the class in the HTML head pre-render, manage it with a hook). Confirm toggling re-themes the
        entire UI with no component edits. Bonus: add a third "high-contrast" theme by remapping the same
        semantic tokens.</p>`,
        runHint: "pnpm --filter design-system dev",
      })}
    </section>
  `,
});
