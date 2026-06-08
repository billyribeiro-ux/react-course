/* Lesson 20-typescript/0700 — interface vs type. */
registerLesson({
  meta: {
    id: "20-typescript/0700-interface-vs-type",
    title: "interface vs type",
    part: "20-typescript",
    estMinutes: 13,
    level: "intermediate",
    project: "js-foundations",
    lede: "Two ways to name a shape, with 90% overlap and a few differences. Learn what each does best and the simple rule teams use to stay consistent.",
    objectives: [
      "Declare reusable shapes with interface and type",
      "Extend and compose both",
      "Know the real differences (declaration merging, unions)",
      "Adopt a practical convention",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Both name a shape</h2>
      ${h.codePane({
        lang: "ts",
        title: "Two ways, same result",
        readOnly: true,
        code: `// interface
interface User {
  name: string;
  age: number;
}

// type alias
type UserAlias = {
  name: string;
  age: number;
};

// Both used identically:
const a: User = { name: "Ada", age: 36 };
const b: UserAlias = { name: "Grace", age: 40 };`,
      })}

      <h2>Extending / composing</h2>
      ${h.codePane({
        lang: "ts",
        title: "Building on shapes",
        readOnly: true,
        code: `// interface extends interface
interface Animal { name: string; }
interface Dog extends Animal { bark(): void; }

// type composes with intersection
type AnimalT = { name: string };
type DogT = AnimalT & { bark(): void };

// interfaces can extend types and vice-versa — they interoperate.`,
      })}

      <h2>The real differences</h2>
      <ul>
        <li><strong>Only <code>type</code> can express unions, tuples, and primitives:</strong>
        <code>type ID = string | number</code>, <code>type Pair = [number, number]</code>. Interfaces
        can only describe object shapes.</li>
        <li><strong>Only <code>interface</code> supports "declaration merging":</strong> declaring the
        same interface twice merges them. This is how libraries let you augment their types — powerful,
        but occasionally surprising.</li>
      </ul>

      ${h.codePane({
        lang: "ts",
        title: "type-only and interface-only powers",
        readOnly: true,
        code: `// Only 'type' can do these:
type Status = "on" | "off";       // union
type Point = [number, number];    // tuple
type Name = string;               // alias a primitive

// Only 'interface' merges (used to extend library types):
interface Window { myAppVersion: string; }
// now window.myAppVersion is typed everywhere`,
      })}

      ${h.callout({
        kind: "principal",
        title: "A simple, common convention",
        body: `<p>You can be productive with either. A widely used rule of thumb: use
        <strong><code>interface</code> for object shapes you might extend</strong> (especially public
        APIs and React component props), and <strong><code>type</code> for everything else</strong> —
        unions, tuples, function types, mapped/conditional types. Most importantly: <em>pick one
        convention per project and be consistent.</em> The bike-shedding over which is "better" is not
        worth your energy; consistency is.</p>`,
      })}

      ${h.callout({
        kind: "note",
        body: `<p>You'll see both heavily in React code. <code>interface Props { ... }</code> for component
        props is extremely common, while <code>type</code> dominates for state unions like
        <code>type View = "list" | "grid"</code>. Being fluent reading both is what matters.</p>`,
      })}

      ${h.exercise({
        title: "Give your shapes names",
        prompt: `<p>Refactor your dashboard: define an <code>interface Task</code> and an
        <code>interface User</code>, and a <code>type Theme = "light" | "dark"</code> and
        <code>type FetchState = "idle" | "loading" | "success" | "error"</code>. Replace the inline object
        types from earlier lessons with these names. Notice how much more readable your function
        signatures become when the shapes have names.</p>`,
        runHint: "pnpm --filter js-foundations typecheck",
      })}
    </section>
  `,
});
