/* Lesson 10-js-foundations/1900 — ES Modules (import/export). */
registerLesson({
  meta: {
    id: "10-js-foundations/1900-modules",
    title: "ES Modules: import & export",
    part: "10-js-foundations",
    estMinutes: 14,
    level: "intermediate",
    project: "js-foundations",
    lede: "Real apps aren't one giant file — they're many small files that share code. ES Modules are how files export pieces and import each other. Every React project is built from them.",
    objectives: [
      "Split code across files with export and import",
      "Distinguish named exports from default exports",
      "Understand module scope and why it's good",
      "Read the import lines at the top of any React file",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Why modules?</h2>
      <p>
        As programs grow, one file becomes unmanageable. <strong>Modules</strong> let you split code
        into focused files, each <strong>exporting</strong> the pieces it wants to share and
        <strong>importing</strong> what it needs from others. Each file has its own private scope —
        nothing leaks unless explicitly exported.
      </p>

      <h2>Named exports</h2>
      <p>Export as many named things as you like; import them by the same names in curly braces:</p>

      ${h.codePane({
        lang: "js",
        title: "math.js — exporting",
        readOnly: true,
        code: `export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}

export const multiply = (a, b) => a * b;`,
      })}

      ${h.codePane({
        lang: "js",
        title: "main.js — importing",
        readOnly: true,
        code: `import { add, PI } from "./math.js";

console.log(add(2, 3)); // 5
console.log(PI);        // 3.14159

// Rename on import if needed:
import { multiply as times } from "./math.js";
console.log(times(2, 4)); // 8`,
      })}

      <h2>Default exports</h2>
      <p>A file can have one <strong>default</strong> export — its "main thing." Import it with any
      name you choose, no braces:</p>

      ${h.codePane({
        lang: "js",
        title: "Button.js + usage",
        readOnly: true,
        code: `// Button.js
export default function Button(label) {
  return \`<button>\${label}</button>\`;
}

// main.js — you pick the name, no braces:
import Button from "./Button.js";
console.log(Button("Save"));`,
      })}

      ${h.callout({
        kind: "principal",
        title: "The conventions you'll see in React",
        body: `<p>React components are typically <strong>default exports</strong> (one component per
        file), while utilities and hooks are usually <strong>named exports</strong>. A file might mix
        both. When you open any React file, the <code>import</code> lines at the top are a table of
        contents of its dependencies — reading them tells you what the file relies on before you read a
        single line of logic.</p>`,
      })}

      <h2>Module scope keeps things clean</h2>
      ${h.codePane({
        lang: "js",
        title: "Privacy by default",
        readOnly: true,
        code: `// helpers.js
const secret = "internal only";   // NOT exported → invisible elsewhere
export const greeting = "Hi!";    // exported → importable

// Other files can import 'greeting' but can never see 'secret'.`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Modules need the right setup",
        body: `<p>In the browser, modules require <code>&lt;script type="module"&gt;</code> (which your
        Vite project already uses). In Node, you enable them with <code>"type": "module"</code> in
        <code>package.json</code> (also already set). Build tools like Vite handle the
        <code>./path.js</code> resolution and bundling for you — you just write <code>import</code> and
        it works.</p>`,
      })}

      ${h.callout({
        kind: "note",
        body: `<p>You'll also see imports with no <code>./</code>, like
        <code>import React from "react"</code>. Those pull from installed packages in
        <code>node_modules</code> rather than your own files. Same syntax, different source.</p>`,
      })}

      ${h.exercise({
        title: "Modularize your dashboard",
        prompt: `<p>Split your growing <code>main.js</code>: move helper functions like
        <code>getGreeting</code> and <code>pluralize</code> into a new <code>utils.js</code> and
        <code>export</code> them; move task logic into <code>tasks.js</code>. Then <code>import</code>
        them into <code>main.js</code>. Your entry file should now read like a clean summary that wires
        modules together — exactly how professional codebases are organized.</p>`,
        runHint: "pnpm js",
      })}
    </section>
  `,
});
