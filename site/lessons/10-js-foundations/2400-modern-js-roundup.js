/* Lesson 10-js-foundations/2400 — Modern JS roundup. */
registerLesson({
  meta: {
    id: "10-js-foundations/2400-modern-js-roundup",
    title: "Modern JavaScript Roundup",
    part: "10-js-foundations",
    estMinutes: 17,
    level: "intermediate",
    project: "js-foundations",
    lede: "A tour of powerful modern features you'll meet in real codebases: Map and Set, iterators and generators, structuredClone, and the newest syntax additions. Awareness now, mastery as you need them.",
    objectives: [
      "Use Map and Set for the right jobs",
      "Recognize iterators and generators",
      "Deep-copy with structuredClone",
      "Know the modern conveniences that keep code clean",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2><code>Map</code> — keyed collections done right</h2>
      <p>
        An object works as a key/value store, but <code>Map</code> is purpose-built for it: keys can be
        <em>any</em> type (not just strings), it preserves insertion order, and <code>.size</code> is
        instant.
      </p>

      ${h.codePane({
        lang: "js",
        title: "Map",
        editable: true,
        code: `const scores = new Map();
scores.set("ada", 90);
scores.set("grace", 85);

console.log(scores.get("ada")); // 90
console.log(scores.has("alan")); // false
console.log(scores.size);        // 2

for (const [name, score] of scores) {
  console.log(\`\${name}: \${score}\`);
}`,
      })}

      <h2><code>Set</code> — collections of unique values</h2>
      ${h.codePane({
        lang: "js",
        title: "Set",
        editable: true,
        code: `const tags = new Set(["js", "react", "js", "css"]);
console.log(tags.size);        // 3 — duplicate "js" dropped
console.log(tags.has("react")); // true

// A classic trick: dedupe an array in one line
const unique = [...new Set([1, 1, 2, 3, 3, 3])];
console.log(unique); // [1, 2, 3]`,
      })}

      ${h.callout({
        kind: "principal",
        body: `<p>Reach for <code>Set</code> when you need uniqueness or fast membership checks, and
        <code>Map</code> when keys aren't strings or order matters. Using the right data structure often
        turns clumsy <code>O(n)</code> loops into clean <code>O(1)</code> lookups — a small choice with
        outsized impact on clarity and performance.</p>`,
      })}

      <h2>Iterators & generators (awareness level)</h2>
      <p>
        Things you can <code>for...of</code> over (arrays, strings, Maps, Sets) are
        <strong>iterable</strong>. <strong>Generators</strong> are special functions that can pause and
        resume, producing a sequence lazily with <code>yield</code>:
      </p>

      ${h.codePane({
        lang: "js",
        title: "A generator",
        editable: true,
        code: `function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++; // pause here, hand back a value, resume next call
  }
}

const ids = idGenerator();
console.log(ids.next().value); // 1
console.log(ids.next().value); // 2
console.log(ids.next().value); // 3`,
      })}

      ${h.callout({
        kind: "note",
        body: `<p>You won't write generators often in app code, but you'll <em>see</em> them in libraries
        and some advanced patterns. Recognizing the <code>function*</code> and <code>yield</code> syntax
        so it doesn't surprise you is enough for now.</p>`,
      })}

      <h2><code>structuredClone</code> — true deep copies</h2>
      ${h.codePane({
        lang: "js",
        title: "Deep copy",
        editable: true,
        code: `const original = { user: { name: "Ada", roles: ["admin"] } };

const shallow = { ...original };       // nested objects still shared
const deep = structuredClone(original); // fully independent copy

deep.user.name = "Grace";
console.log(original.user.name); // "Ada" — original safe
console.log(shallow.user === original.user); // true — shared!`,
      })}

      <h2>Conveniences worth knowing</h2>
      ${h.codePane({
        lang: "js",
        title: "Modern niceties",
        editable: true,
        code: `// Logical assignment operators:
let config = { theme: undefined };
config.theme ??= "light"; // assign only if null/undefined → "light"

// Numeric separators for readability:
const big = 1_000_000; // same as 1000000

// Array grouping, .at(), .findLast() and more keep arriving each year.
console.log([1, 2, 3, 4].findLast((n) => n % 2 === 0)); // 4`,
      })}

      ${h.callout({
        kind: "principal",
        title: "The language keeps evolving — and that's fine",
        body: `<p>JavaScript gets new features every year. You don't need them all memorized; you need
        the <em>fundamentals</em> solid (which you now have) and the habit of recognizing and looking up
        the rest. Principal engineers aren't walking encyclopedias — they have a strong core and know
        how to learn the edges on demand. You've built that core.</p>`,
      })}

      ${h.exercise({
        title: "Apply the right structure",
        prompt: `<p>In your dashboard, use a <code>Set</code> to store unique tags across all tasks and
        display the count of distinct tags. Use <code>structuredClone</code> to make a true backup of
        your tasks array before a "clear all," then add an "undo" button that restores it. Small touches,
        but they show you reaching for the right tool deliberately.</p>`,
        runHint: "pnpm js",
      })}
    </section>
  `,
});
