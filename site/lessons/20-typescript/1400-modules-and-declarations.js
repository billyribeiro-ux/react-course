/* Lesson 20-typescript/1400 — Modules & declaration files. */
registerLesson({
  meta: {
    id: "20-typescript/1400-modules-and-declarations",
    title: "Modules, Imports & Declaration Files",
    part: "20-typescript",
    estMinutes: 13,
    level: "advanced",
    project: "js-foundations",
    lede: "How types travel between files and packages: exporting/importing types, the `import type` syntax, and what those `.d.ts` files are that make untyped libraries type-safe.",
    objectives: [
      "Export and import types across files",
      "Use `import type` and why it matters",
      "Understand declaration files (.d.ts) and @types packages",
      "Type the global window and module augmentation basics",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Exporting and importing types</h2>
      <p>Types use the same <code>export</code>/<code>import</code> as values (Part 10, Lesson 19):</p>

      ${h.codePane({
        lang: "ts",
        title: "types.ts + usage",
        readOnly: true,
        code: `// types.ts
export interface Task {
  id: number;
  text: string;
  done: boolean;
}
export type Theme = "light" | "dark";

// main.ts
import { Task, Theme } from "./types.js";
const task: Task = { id: 1, text: "Learn TS", done: false };`,
      })}

      <h2><code>import type</code>: make intent explicit</h2>
      <p>
        When you import something used <em>only</em> as a type, prefer <code>import type</code>. It tells
        TypeScript (and bundlers) this import vanishes at compile time, avoiding accidental runtime
        dependencies:
      </p>

      ${h.codePane({
        lang: "ts",
        title: "import type",
        readOnly: true,
        code: `import type { Task } from "./types.js";       // type-only
import { createTask } from "./tasks.js";        // runtime value

// Mixed in one line:
import { renderTask, type RenderOptions } from "./render.js";`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Why this matters at scale",
        body: `<p><code>import type</code> guarantees a "types only" import never pulls real code into your
        bundle, which prevents subtle circular-dependency and bundle-bloat problems in large apps. The
        course's <code>tsconfig.base.json</code> even sets <code>verbatimModuleSyntax</code>, which makes
        this explicit. It's a small habit with real payoff on big codebases.</p>`,
      })}

      <h2>Declaration files: <code>.d.ts</code></h2>
      <p>
        A <strong>declaration file</strong> describes the types of JavaScript code <em>without</em> any
        implementation — just shapes. They're how a plain-JS library can still be fully typed for you:
      </p>

      ${h.codePane({
        lang: "ts",
        title: "What a .d.ts looks like",
        readOnly: true,
        code: `// some-library.d.ts  (types only — no function bodies)
export declare function formatDate(date: Date): string;
export interface Config {
  locale: string;
  timezone: string;
}`,
      })}

      ${h.callout({
        kind: "note",
        title: "Where types come from",
        body: `<p>Modern libraries ship their own <code>.d.ts</code> files inside the package, so types
        "just work" after install. Older JS-only libraries get community types from a separate
        <code>@types/...</code> package (e.g. <code>npm i -D @types/lodash</code>). If your editor says
        "could not find a declaration file for module X," installing <code>@types/X</code> is usually the
        fix.</p>`,
      })}

      <h2>Typing globals (a peek)</h2>
      ${h.codePane({
        lang: "ts",
        title: "Augmenting global types",
        readOnly: true,
        code: `// Tell TypeScript about a custom global you set on window:
declare global {
  interface Window {
    myApp: { version: string };
  }
}
window.myApp = { version: "1.0.0" }; // now type-safe
export {}; // makes this file a module`,
      })}

      ${h.callout({
        kind: "gotcha",
        body: `<p>You'll rarely write declaration files by hand in app code — they're mostly a
        library-author and advanced-integration concern. But recognizing what a <code>.d.ts</code> is, and
        knowing the <code>@types/*</code> trick, saves real frustration when a dependency seems
        "untyped."</p>`,
      })}

      ${h.exercise({
        title: "Organize your types",
        prompt: `<p>Create a <code>src/types.ts</code> for your dashboard with <code>Task</code>,
        <code>Theme</code>, <code>FetchState</code>, and <code>QuoteState</code>. Import them across your
        modules using <code>import type</code>. Your codebase now has a clean, single home for its data
        contracts — exactly how real projects are structured.</p>`,
        runHint: "pnpm --filter js-foundations typecheck",
      })}
    </section>
  `,
});
