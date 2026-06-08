/* Lesson 20-typescript/0900 — keyof, indexed access, typeof. */
registerLesson({
  meta: {
    id: "20-typescript/0900-keyof-indexed-typeof",
    title: "keyof, Indexed Access & typeof",
    part: "20-typescript",
    estMinutes: 14,
    level: "advanced",
    project: "js-foundations",
    lede: "Three operators that let types reference other types and even derive types from values. This is where TypeScript starts to feel genuinely powerful — types that stay in sync automatically.",
    objectives: [
      "Get the keys of a type with keyof",
      "Look up a property's type with indexed access",
      "Derive a type from a value with typeof",
      "Combine them for self-maintaining types",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2><code>keyof</code>: the union of a type's keys</h2>
      ${h.codePane({
        lang: "ts",
        title: "keyof",
        readOnly: true,
        code: `interface User {
  name: string;
  age: number;
  email: string;
}

type UserKey = keyof User; // "name" | "age" | "email"

let k: UserKey = "name"; // ✅
k = "phone";             // ❌ not a key of User`,
      })}

      <p>This shines in generic functions that access properties safely:</p>

      ${h.codePane({
        lang: "ts",
        title: "Type-safe property access",
        readOnly: true,
        code: `function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "Ada", age: 36 };
const name = getProp(user, "name"); // name: string
const age = getProp(user, "age");   // age: number
getProp(user, "phone");             // ❌ "phone" isn't a key — caught!`,
      })}

      <h2>Indexed access: look up a property's type</h2>
      ${h.codePane({
        lang: "ts",
        title: "T[K]",
        readOnly: true,
        code: `interface Task {
  id: number;
  text: string;
  status: "todo" | "done";
}

type TaskId = Task["id"];         // number
type TaskStatus = Task["status"]; // "todo" | "done"

// Element type of an array:
type TaskList = Task[];
type SingleTask = TaskList[number]; // Task`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Derive, don't duplicate",
        body: `<p>The theme here is "single source of truth for types." Instead of re-declaring that a
        status is <code>"todo" | "done"</code> in three places, derive it once with
        <code>Task["status"]</code>. When the original changes, everything derived updates automatically.
        Duplicated types drift out of sync; derived types can't. This instinct separates fragile codebases
        from robust ones.</p>`,
      })}

      <h2><code>typeof</code>: a type from a value</h2>
      <p>
        TypeScript's <code>typeof</code> (in a <em>type</em> position) captures the type of an existing
        value — great for deriving types from config objects and constants:
      </p>

      ${h.codePane({
        lang: "ts",
        title: "typeof in type position",
        readOnly: true,
        code: `const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3,
};

type Config = typeof config;
// { apiUrl: string; timeout: number; retries: number }

// Combine with keyof for the keys:
type ConfigKey = keyof typeof config; // "apiUrl" | "timeout" | "retries"`,
      })}

      ${h.callout({
        kind: "gotcha",
        body: `<p>Two different <code>typeof</code>s: the <em>JavaScript</em> <code>typeof</code> runs at
        runtime and returns a string (<code>"number"</code>); the <em>TypeScript</em> <code>typeof</code>
        works in type positions and produces a type. Same keyword, different worlds — context tells them
        apart.</p>`,
      })}

      ${h.exercise({
        title: "Derive types from your data",
        prompt: `<p>Define a <code>const THEMES = ["light", "dark", "system"] as const</code> (you'll
        learn <code>as const</code> soon) and derive <code>type Theme = typeof THEMES[number]</code>.
        Write a <code>getSetting&lt;K extends keyof Settings&gt;</code> helper for your settings object.
        Notice that adding a new theme to the array automatically updates the <code>Theme</code> type —
        zero duplication.</p>`,
        runHint: "pnpm --filter js-foundations typecheck",
      })}
    </section>
  `,
});
