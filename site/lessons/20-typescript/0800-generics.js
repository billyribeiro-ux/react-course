/* Lesson 20-typescript/0800 — Generics. */
registerLesson({
  meta: {
    id: "20-typescript/0800-generics",
    title: "Generics: Reusable, Type-Safe Code",
    part: "20-typescript",
    estMinutes: 18,
    level: "intermediate",
    project: "js-foundations",
    lede: "Generics let you write functions and types that work with any type while staying fully type-safe. They look intimidating but the core idea is simple — and you already use them every time you write an array.",
    objectives: [
      "Understand generics as 'type parameters'",
      "Write generic functions that preserve types",
      "Create generic types and constraints",
      "Recognize generics throughout React and libraries",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>You already use generics</h2>
      <p>
        <code>Array&lt;string&gt;</code> is a generic: <code>Array</code> is a type that takes another
        type (<code>string</code>) as a parameter. <code>Promise&lt;User&gt;</code> is "a promise that
        resolves to a User." The angle brackets pass a type, just like parentheses pass a value.
      </p>

      <h2>The problem generics solve</h2>
      ${h.codePane({
        lang: "ts",
        title: "Without generics",
        readOnly: true,
        code: `// We want a function that returns the first item of an array.
// Typed to one type — not reusable:
function firstString(arr: string[]): string { return arr[0]; }

// Typed with any — reusable but UNSAFE (loses the type):
function firstAny(arr: any[]): any { return arr[0]; }
const x = firstAny([1, 2, 3]); // x is 'any' — no help at all`,
      })}

      <h2>Generics: a placeholder for a type</h2>
      <p>
        A generic introduces a <strong>type parameter</strong> (conventionally <code>T</code>) that gets
        filled in when the function is called. The type flows through:
      </p>

      ${h.codePane({
        lang: "ts",
        title: "Generic function",
        readOnly: true,
        code: `function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

const a = first([1, 2, 3]);        // a: number     ✅
const b = first(["x", "y"]);       // b: string     ✅
const c = first([true, false]);    // c: boolean    ✅
// One function, fully type-safe for EVERY type. T becomes whatever
// you pass — TypeScript infers it from the argument.`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Generics = reuse without losing safety",
        body: `<p>The whole point: write logic <em>once</em> that works for any type, while the compiler
        still tracks the specific type at each call site. This is everywhere in well-built software —
        data structures, utilities, state containers. <code>useState&lt;T&gt;</code>,
        <code>useRef&lt;T&gt;</code>, and TanStack Query's <code>useQuery&lt;Data&gt;</code> are all
        generic. Understanding <code>&lt;T&gt;</code> demystifies a huge amount of React and library
        code.</p>`,
      })}

      <h2>Generic types</h2>
      ${h.codePane({
        lang: "ts",
        title: "Reusable generic shapes",
        readOnly: true,
        code: `// A generic "API response" wrapper for ANY data type:
type ApiResponse<T> = {
  data: T;
  status: number;
  error: string | null;
};

type UserResponse = ApiResponse<User>;    // data: User
type TasksResponse = ApiResponse<Task[]>; // data: Task[]

// A generic state container (a hand-rolled mini-useState):
type Box<T> = { value: T; set: (next: T) => void };`,
      })}

      <h2>Constraints: "any type, as long as…"</h2>
      <p>Use <code>extends</code> to require that the type has certain properties:</p>

      ${h.codePane({
        lang: "ts",
        title: "Constrained generics",
        readOnly: true,
        code: `// T can be anything that has an 'id' property:
function getById<T extends { id: number }>(items: T[], id: number): T | undefined {
  return items.find((item) => item.id === id);
}

getById(tasks, 1);  // ✅ tasks have id; returns Task | undefined
getById([1, 2, 3], 1); // ❌ numbers have no 'id' property`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Don't over-engineer with generics",
        body: `<p>Generics are powerful, which tempts beginners to use them everywhere. Reach for them when
        you're genuinely writing <em>reusable</em> code that should work across types. If a function only
        ever handles <code>Task</code>, just type it as <code>Task</code> — a needless <code>&lt;T&gt;</code>
        adds complexity without benefit. Clarity first.</p>`,
      })}

      ${h.exercise({
        title: "Write a generic helper",
        prompt: `<p>Write <code>function groupBy&lt;T&gt;(items: T[], key: (item: T) =&gt; string):
        Record&lt;string, T[]&gt;</code> that groups any array by a computed key. Use it to group your
        tasks by done/not-done. Then make a generic <code>loadJSON&lt;T&gt;(key: string): T | null</code>
        helper for reading typed data from localStorage. Feel how one generic function serves many shapes
        safely.</p>`,
        runHint: "pnpm --filter js-foundations typecheck",
      })}
    </section>
  `,
});
