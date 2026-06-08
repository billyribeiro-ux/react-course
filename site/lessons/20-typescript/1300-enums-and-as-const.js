/* Lesson 20-typescript/1300 — Enums & as const. */
registerLesson({
  meta: {
    id: "20-typescript/1300-enums-and-as-const",
    title: "Enums & `as const`",
    part: "20-typescript",
    estMinutes: 13,
    level: "advanced",
    project: "js-foundations",
    lede: "Two ways to express a fixed set of named values. Learn enums, learn the modern `as const` alternative many teams now prefer, and learn when each fits.",
    objectives: [
      "Declare and use enums",
      "Understand the trade-offs of enums",
      "Use `as const` to freeze values into literal types",
      "Choose the right tool for fixed sets",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Enums: named constants</h2>
      ${h.codePane({
        lang: "ts",
        title: "enum",
        readOnly: true,
        code: `enum Status {
  Todo,        // 0
  InProgress,  // 1
  Done,        // 2
}

let s: Status = Status.InProgress;
console.log(s); // 1

// String enums are clearer (the value is the string, not a number):
enum Theme {
  Light = "light",
  Dark = "dark",
}
let t: Theme = Theme.Dark; // "dark"`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Enums are not purely a type",
        body: `<p>Unlike most TypeScript features, an <code>enum</code> compiles to real JavaScript code
        (an object) that exists at runtime — so it adds to your bundle and behaves a little unusually
        (numeric enums are "reverse-mapped," which can surprise you). This is why many modern teams prefer
        the <code>as const</code> approach below for simple cases.</p>`,
      })}

      <h2>The <code>as const</code> alternative</h2>
      <p>
        <code>as const</code> tells TypeScript "treat this value as deeply immutable and as specific as
        possible." It turns a regular object/array into precise literal types — no runtime overhead beyond
        the data itself:
      </p>

      ${h.codePane({
        lang: "ts",
        title: "as const object",
        readOnly: true,
        code: `const STATUS = {
  Todo: "todo",
  InProgress: "in-progress",
  Done: "done",
} as const;

// Derive the value union from the object:
type Status = typeof STATUS[keyof typeof STATUS];
// "todo" | "in-progress" | "done"

let s: Status = STATUS.Done; // "done"
s = "todo";                  // ✅ valid member
s = "nope";                  // ❌ not a Status`,
      })}

      ${h.codePane({
        lang: "ts",
        title: "as const array",
        readOnly: true,
        code: `const THEMES = ["light", "dark", "system"] as const;
type Theme = typeof THEMES[number]; // "light" | "dark" | "system"

// Bonus: you can iterate the real array AND have the literal type.
THEMES.forEach((theme) => console.log(theme));`,
      })}

      ${h.callout({
        kind: "principal",
        title: "What changes with as const",
        body: `<p>Without <code>as const</code>, <code>["light","dark"]</code> is inferred as
        <code>string[]</code> and the object values as <code>string</code> — losing the specific values.
        <code>as const</code> preserves them as exact literals and makes everything <code>readonly</code>.
        The combo "<code>as const</code> array + <code>typeof THEMES[number]</code>" is a widely loved
        idiom: one declaration gives you both the runtime list and the literal type, always in sync.</p>`,
      })}

      <h2>Which to use?</h2>
      <ul>
        <li><strong>Plain literal union</strong> (<code>type Theme = "light" | "dark"</code>) — when you only need the type.</li>
        <li><strong><code>as const</code> object/array</strong> — when you need both the values at runtime (to iterate, display) <em>and</em> the type.</li>
        <li><strong><code>enum</code></strong> — fine in existing codebases that use them; many new projects skip them in favor of the above.</li>
      </ul>

      ${h.exercise({
        title: "Modernize your constants",
        prompt: `<p>Define your dashboard's task statuses and themes as <code>as const</code> arrays, and
        derive their types with <code>typeof ...[number]</code>. Build a status-filter UI by iterating the
        real array, while keeping the type-safe union for your state. Compare writing the same thing as an
        <code>enum</code> and decide which you prefer — both are valid; knowing the trade-off is the
        point.</p>`,
        runHint: "pnpm --filter js-foundations typecheck",
      })}
    </section>
  `,
});
