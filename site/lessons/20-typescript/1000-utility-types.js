/* Lesson 20-typescript/1000 — Utility types. */
registerLesson({
  meta: {
    id: "20-typescript/1000-utility-types",
    title: "Utility Types: Partial, Pick, Omit, Record…",
    part: "20-typescript",
    estMinutes: 16,
    level: "advanced",
    project: "js-foundations",
    lede: "TypeScript ships built-in 'type functions' that transform existing types into new ones. They save enormous duplication and are used constantly in real codebases and React.",
    objectives: [
      "Transform types with Partial, Required, Readonly",
      "Select or remove keys with Pick and Omit",
      "Build dictionaries with Record",
      "Extract types with ReturnType and Parameters",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Why utility types?</h2>
      <p>
        You often need a variation of an existing type: "the same User but every field optional," "just
        the name and email of a User," "a User without its id." Rewriting these by hand duplicates the
        shape and drifts out of sync. <strong>Utility types</strong> derive them automatically.
      </p>

      ${h.codePane({
        lang: "ts",
        title: "Partial, Required, Readonly",
        readOnly: true,
        code: `interface User {
  id: number;
  name: string;
  email: string;
}

// Partial<T> — all properties optional (great for "update" functions)
function updateUser(id: number, changes: Partial<User>) { /* ... */ }
updateUser(1, { name: "New Name" }); // ✅ only the fields you change

// Required<T> — all properties required (opposite of Partial)
// Readonly<T> — all properties readonly
type FrozenUser = Readonly<User>;`,
      })}

      <h2>Pick and Omit: select keys</h2>
      ${h.codePane({
        lang: "ts",
        title: "Pick & Omit",
        readOnly: true,
        code: `// Pick<T, Keys> — keep only the listed properties
type UserPreview = Pick<User, "id" | "name">;
// { id: number; name: string }

// Omit<T, Keys> — everything EXCEPT the listed properties
type NewUser = Omit<User, "id">;
// { name: string; email: string }  — for creating before an id exists

function createUser(data: Omit<User, "id">): User {
  return { id: Date.now(), ...data };
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "These appear everywhere",
        body: `<p><code>Omit&lt;User, "id"&gt;</code> for "the data needed to create a user (the server
        assigns the id)" and <code>Partial&lt;T&gt;</code> for "the fields being updated" are everyday
        patterns in real APIs and forms. In React you'll constantly use <code>Omit</code> to take a
        component's props and remove or override a few. Mastering these four — Partial, Pick, Omit, Record
        — covers the vast majority of real-world type transformations.</p>`,
      })}

      <h2>Record: typed dictionaries</h2>
      ${h.codePane({
        lang: "ts",
        title: "Record<Keys, Value>",
        readOnly: true,
        code: `// An object whose keys are specific strings and values a given type:
type Roles = Record<"admin" | "editor" | "viewer", string[]>;
const permissions: Roles = {
  admin: ["read", "write", "delete"],
  editor: ["read", "write"],
  viewer: ["read"],
};

// A lookup keyed by any string:
type ScoreBoard = Record<string, number>;
const scores: ScoreBoard = { ada: 90, grace: 85 };`,
      })}

      <h2>Extract types from functions</h2>
      ${h.codePane({
        lang: "ts",
        title: "ReturnType & Parameters",
        readOnly: true,
        code: `function createTask(text: string, done: boolean) {
  return { id: Date.now(), text, done };
}

type Task = ReturnType<typeof createTask>;
// { id: number; text: string; done: boolean } — derived from the function!

type Args = Parameters<typeof createTask>; // [text: string, done: boolean]`,
      })}

      ${h.callout({
        kind: "tip",
        body: `<p>You don't need to memorize every utility type — there are a few dozen. Know the core five
        (<code>Partial</code>, <code>Required</code>, <code>Pick</code>, <code>Omit</code>,
        <code>Record</code>) cold, recognize <code>ReturnType</code>/<code>Parameters</code>, and look up
        the rest (<code>Exclude</code>, <code>Extract</code>, <code>NonNullable</code>,
        <code>Awaited</code>) when a situation calls for them.</p>`,
      })}

      ${h.exercise({
        title: "Apply utility types",
        prompt: `<p>For your dashboard: write <code>createTask(data: Omit&lt;Task, "id" | "done"&gt;):
        Task</code>, an <code>updateTask(id: number, changes: Partial&lt;Task&gt;)</code>, and a
        <code>Record&lt;FetchState, string&gt;</code> mapping each loading state to a user-facing message.
        Derive at least one type with <code>ReturnType</code>. You're now transforming types like a pro
        instead of hand-writing variations.</p>`,
        runHint: "pnpm --filter js-foundations typecheck",
      })}
    </section>
  `,
});
