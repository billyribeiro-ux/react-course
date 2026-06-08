/* Lesson 20-typescript/0300 — Arrays, tuples, objects. */
registerLesson({
  meta: {
    id: "20-typescript/0300-arrays-tuples-objects",
    title: "Typing Arrays, Tuples & Objects",
    part: "20-typescript",
    estMinutes: 16,
    level: "beginner",
    project: "js-foundations",
    lede: "Real data is arrays and objects. Learn to describe their shapes so TypeScript can guarantee you access them correctly — the everyday bread and butter of typed code.",
    objectives: [
      "Type arrays of a given element type",
      "Describe object shapes inline",
      "Mark optional and readonly properties",
      "Use tuples for fixed-shape arrays",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Arrays</h2>
      ${h.codePane({
        lang: "ts",
        title: "Array types",
        readOnly: true,
        code: `const names: string[] = ["Ada", "Grace"];
const scores: number[] = [90, 85, 100];

names.push("Alan");  // ✅
names.push(42);      // ❌ number not assignable to string

// Alternative generic syntax (identical meaning):
const tags: Array<string> = ["js", "ts"];`,
      })}

      <h2>Object shapes</h2>
      <p>Describe an object's expected properties inline with <code>{ }</code>:</p>

      ${h.codePane({
        lang: "ts",
        title: "Object types",
        readOnly: true,
        code: `const user: { name: string; age: number } = {
  name: "Ada",
  age: 36,
};

user.age = 37;       // ✅
user.age = "old";    // ❌ string not assignable to number
user.email = "...";  // ❌ 'email' does not exist on this type
console.log(user.naem); // ❌ typo caught — no such property!`,
      })}

      ${h.callout({
        kind: "principal",
        body: `<p>That last line is the everyday magic: <code>user.naem</code> is underlined instantly
        instead of becoming a silent <code>undefined</code> bug that surfaces three screens later. Inline
        object types get repetitive fast, though — the next lesson on <code>interface</code>/<code>type</code>
        gives them reusable names.</p>`,
      })}

      <h2>Optional and readonly properties</h2>
      ${h.codePane({
        lang: "ts",
        title: "Optional ? and readonly",
        readOnly: true,
        code: `type Task = {
  readonly id: number;   // can't be reassigned after creation
  text: string;
  done: boolean;
  dueDate?: string;      // optional — may be undefined
};

const task: Task = { id: 1, text: "Write code", done: false };
// dueDate omitted → fine, it's optional

task.done = true;  // ✅
task.id = 2;       // ❌ Cannot assign to 'id' (readonly)
console.log(task.dueDate?.length); // optional → use ?. to access safely`,
      })}

      ${h.callout({
        kind: "tip",
        title: "Optional and undefined",
        body: `<p>An optional <code>dueDate?: string</code> has type <code>string | undefined</code>, so
        TypeScript forces you to handle the "not there" case (e.g. with <code>?.</code>) — exactly the
        defensive habit from Part 10, now enforced by the compiler. <code>readonly</code> documents and
        protects values that should never change after creation, like an <code>id</code>.</p>`,
      })}

      <h2>Arrays of objects</h2>
      ${h.codePane({
        lang: "ts",
        title: "The shape of real app data",
        readOnly: true,
        code: `type Task = { id: number; text: string; done: boolean };

const tasks: Task[] = [
  { id: 1, text: "Buy milk", done: false },
  { id: 2, text: "Walk dog", done: true },
];

// Now map/filter/find are fully type-checked:
const titles = tasks.map((t) => t.text);     // string[]
const remaining = tasks.filter((t) => !t.done); // Task[]
const found = tasks.find((t) => t.id === 1); // Task | undefined`,
      })}

      <h2>Tuples: fixed-length, fixed-type arrays</h2>
      ${h.codePane({
        lang: "ts",
        title: "Tuples",
        readOnly: true,
        code: `// A tuple fixes the length and the type at each position:
let point: [number, number] = [10, 20];
point = [1, 2, 3]; // ❌ too many elements

// This is exactly the shape React's useState returns:
type State = [number, (n: number) => void];
// const [count, setCount] = useState(0)  →  [number, setter]`,
      })}

      ${h.callout({
        kind: "note",
        body: `<p>You'll rarely declare tuples by hand, but recognizing them matters because React hooks
        return them. When you write <code>const [value, setValue] = useState(...)</code>, you're
        destructuring a tuple whose types TypeScript knows precisely.</p>`,
      })}

      ${h.exercise({
        title: "Type the dashboard's data model",
        prompt: `<p>Define a <code>Task</code> type with <code>readonly id</code>, <code>text</code>,
        <code>done</code>, and an optional <code>tags?: string[]</code>. Type your tasks array as
        <code>Task[]</code>. Confirm that <code>map</code>/<code>filter</code> infer the right types
        (hover them in your editor) and that a typo'd property is flagged. Your data layer is now
        self-documenting.</p>`,
        runHint: "pnpm --filter js-foundations typecheck",
      })}
    </section>
  `,
});
