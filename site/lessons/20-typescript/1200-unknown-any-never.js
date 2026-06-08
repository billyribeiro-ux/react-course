/* Lesson 20-typescript/1200 — unknown vs any vs never. */
registerLesson({
  meta: {
    id: "20-typescript/1200-unknown-any-never",
    title: "unknown vs any vs never",
    part: "20-typescript",
    estMinutes: 12,
    level: "advanced",
    project: "js-foundations",
    lede: "Three special types that confuse people. Once you see the spectrum — any (anything, unsafe), unknown (anything, safe), never (nothing) — they click into place.",
    objectives: [
      "Use unknown for safely-typed external data",
      "Understand why unknown beats any",
      "Recognize what never means and where it appears",
      "Handle errors in catch blocks correctly",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The spectrum</h2>
      <ul>
        <li><strong><code>any</code></strong> — "anything, and I turn off all checks." Unsafe.</li>
        <li><strong><code>unknown</code></strong> — "anything, but you must check before using it." Safe.</li>
        <li><strong><code>never</code></strong> — "no value is possible here."</li>
      </ul>

      <h2><code>unknown</code>: the safe <code>any</code></h2>
      <p>
        <code>unknown</code> can hold any value (like <code>any</code>), but TypeScript won't let you
        <em>do</em> anything with it until you've narrowed it to a known type. It forces the checks
        <code>any</code> skips:
      </p>

      ${h.codePane({
        lang: "ts",
        title: "any vs unknown",
        readOnly: true,
        code: `let a: any = "hello";
a.toFixed(2);  // no complaint... CRASHES at runtime

let u: unknown = "hello";
u.toFixed(2);  // ❌ TypeScript blocks this — u might not be a number

if (typeof u === "string") {
  u.toUpperCase(); // ✅ allowed — you proved it's a string first
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Reach for unknown at every boundary",
        body: `<p>Data from the network, <code>JSON.parse</code>, <code>localStorage</code>, or any
        untyped source is genuinely <em>unknown</em> — TypeScript can't verify it. Typing it
        <code>unknown</code> (not <code>any</code>) forces you to validate before trusting it, which is
        exactly the safety you want at the edge of your program. <code>any</code> at a boundary is a lie
        you tell the compiler that the runtime later exposes. (Zod, in Part 70, turns <code>unknown</code>
        into validated types elegantly.)</p>`,
      })}

      <h2>Errors are <code>unknown</code></h2>
      ${h.codePane({
        lang: "ts",
        title: "Typing catch",
        readOnly: true,
        code: `try {
  doRisky();
} catch (error) {
  // 'error' is 'unknown' — anything can be thrown, not just Errors!
  if (error instanceof Error) {
    console.log(error.message); // ✅ safe after narrowing
  } else {
    console.log("Unknown error", error);
  }
}`,
      })}

      <h2><code>never</code>: the impossible type</h2>
      ${h.codePane({
        lang: "ts",
        title: "never",
        readOnly: true,
        code: `// A function that never returns normally:
function crash(msg: string): never {
  throw new Error(msg);
}

// The empty intersection — no value can be both string AND number:
type Impossible = string & number; // never

// Used for exhaustiveness checks (last lesson) and to mark
// code paths that should be unreachable.`,
      })}

      ${h.callout({
        kind: "gotcha",
        body: `<p>Don't confuse <code>never</code> with <code>void</code>. <code>void</code> means "returns,
        but with nothing useful." <code>never</code> means "doesn't return at all" (throws or loops
        forever). A logger is <code>void</code>; a function that always throws is <code>never</code>.</p>`,
      })}

      ${h.exercise({
        title: "Harden your boundaries",
        prompt: `<p>Rewrite your <code>localStorage</code> loader to type the parsed result as
        <code>unknown</code>, then use the <code>isTask</code> guard from Lesson 6 to validate it before
        use — so corrupt saved data can never crash your app. Update every <code>catch</code> in your
        dashboard to treat the error as <code>unknown</code> and narrow with <code>instanceof Error</code>.
        Your app is now resilient at exactly the points real apps break.</p>`,
        runHint: "pnpm --filter js-foundations typecheck",
      })}
    </section>
  `,
});
