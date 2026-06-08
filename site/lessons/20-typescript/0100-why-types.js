/* Lesson 20-typescript/0100 — Why types. */
registerLesson({
  meta: {
    id: "20-typescript/0100-why-types",
    title: "Why TypeScript? The Cost of Bugs",
    part: "20-typescript",
    estMinutes: 15,
    level: "beginner",
    project: "js-foundations",
    lede: "TypeScript is JavaScript with a safety net: it catches a whole class of bugs before your code ever runs. For anything beyond a toy, it's the professional default — and React loves it.",
    objectives: [
      "Explain what TypeScript adds to JavaScript",
      "See how types catch bugs at write-time, not run-time",
      "Understand the compile step and that types vanish at runtime",
      "Set up TypeScript in the dashboard project",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>JavaScript's freedom is also its danger</h2>
      <p>
        In JavaScript, a variable can hold anything, and nothing stops you from misusing it until the
        code actually runs — possibly in front of a user. Remember <code>"5" + 3 === "53"</code>? That's
        a type bug. So is calling <code>user.naem</code> (typo) or passing a string where a number was
        expected. These slip through silently.
      </p>

      ${h.codePane({
        lang: "js",
        title: "Bugs JavaScript happily allows",
        readOnly: true,
        code: `function getDiscount(price, percent) {
  return price - price * (percent / 100);
}

getDiscount(100, 20);      // 80 ✅
getDiscount("100", "20");  // "100-..." → NaN 💥 (strings!)
getDiscount(100);          // NaN 💥 (percent is undefined)
// JavaScript runs all of these without a single warning.`,
      })}

      <h2>What TypeScript adds</h2>
      <p>
        <strong>TypeScript</strong> is JavaScript plus a <strong>type system</strong>. You annotate
        what kinds of values things should be, and a tool (the TypeScript compiler) checks your code for
        violations <em>as you type</em> — underlining mistakes in your editor before you ever run it.
      </p>

      ${h.codePane({
        lang: "ts",
        title: "The same function, typed",
        readOnly: true,
        code: `function getDiscount(price: number, percent: number): number {
  return price - price * (percent / 100);
}

getDiscount(100, 20);       // ✅ fine
getDiscount("100", "20");   // ❌ Error: string is not assignable to number
getDiscount(100);           // ❌ Error: expected 2 arguments, but got 1
// You see these RED SQUIGGLES in your editor immediately.`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Types are the cheapest tests you'll ever write",
        body: `<p>Every type annotation is a tiny, always-on check that runs the instant you type. They
        catch the boring-but-common bugs (typos, wrong shapes, missing arguments) for free, so your
        actual tests and your brain can focus on real logic. Studies and experience agree: on any
        non-trivial codebase, TypeScript pays for itself many times over. This is why essentially all
        serious React work is TypeScript today.</p>`,
      })}

      <h2>Types disappear at runtime</h2>
      <p>
        Crucial mental model: TypeScript is a <strong>development-time</strong> tool. Before running,
        your <code>.ts</code> code is <strong>compiled</strong> to plain <code>.js</code> with all the
        type annotations <em>stripped out</em>. The browser never sees types — it runs ordinary
        JavaScript. Types help <em>you</em> while writing; they add zero weight to the final app.
      </p>

      ${h.codePane({
        lang: "ts",
        title: "Before (TypeScript) → After (JavaScript)",
        readOnly: true,
        code: `// You write:
const name: string = "Ada";
function greet(n: string): string { return "Hi " + n; }

// The compiler outputs (types erased):
const name = "Ada";
function greet(n) { return "Hi " + n; }`,
      })}

      ${h.callout({
        kind: "gotcha",
        body: `<p>Because types vanish at runtime, TypeScript can't validate data arriving from a server
        — that's real data the type system never sees. For runtime validation of external data you use a
        library like <strong>Zod</strong> (Part 70). TypeScript guards <em>your code's internal
        consistency</em>; Zod guards <em>the boundary with the outside world</em>. Different jobs.</p>`,
      })}

      <h2>The good news for you</h2>
      <p>
        You already know JavaScript — and <strong>all valid JavaScript is valid TypeScript</strong>.
        TypeScript is JS with optional extra annotations. You can adopt it gradually, and everything you
        learned in Part 10 still applies. We'll add just enough types to make your dashboard bulletproof.
      </p>

      ${h.exercise({
        title: "Turn on TypeScript",
        prompt: `<p>Your <code>js-foundations</code> project now includes TypeScript (a
        <code>tsconfig.json</code> and the <code>typescript</code> dev dependency). Run
        <code>pnpm install</code> from the repo root, then rename one small file from <code>.js</code> to
        <code>.ts</code> (update its import path) and run the type checker. Watch the editor start helping
        you. The rest of Part 20 layers on the type knowledge.</p>`,
        runHint: "pnpm install && pnpm --filter js-foundations typecheck",
      })}
    </section>
  `,
});
