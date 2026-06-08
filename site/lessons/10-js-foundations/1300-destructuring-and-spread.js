/* Lesson 10-js-foundations/1300 — Destructuring, spread, rest. */
registerLesson({
  meta: {
    id: "10-js-foundations/1300-destructuring-and-spread",
    title: "Destructuring, Spread & Rest",
    part: "10-js-foundations",
    estMinutes: 18,
    level: "intermediate",
    project: "js-foundations",
    lede: "Three modern syntaxes you'll see on nearly every line of React code: pulling values out (destructuring), copying/merging (spread), and gathering the rest. Learn them now and React's syntax stops looking cryptic.",
    objectives: [
      "Destructure values out of objects and arrays",
      "Copy and merge with the spread operator",
      "Gather remaining items with rest",
      "Connect these to everyday React patterns",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Object destructuring</h2>
      <p>Destructuring pulls properties out of an object into their own variables in one line:</p>

      ${h.codePane({
        lang: "js",
        title: "Object destructuring",
        editable: true,
        code: `const user = { name: "Ada", age: 36, city: "London" };

// Old way:
const name1 = user.name;
const age1 = user.age;

// Destructuring — same result, one line:
const { name, age } = user;
console.log(name, age); // "Ada" 36

// Rename and add defaults while destructuring:
const { city: hometown, role = "user" } = user;
console.log(hometown, role); // "London" "user"`,
      })}

      ${h.callout({
        kind: "principal",
        title: "This is everywhere in React",
        body: `<p>React components receive a single <code>props</code> object and almost always
        destructure it: <code>function Button({ label, onClick }) { ... }</code>. Hooks return arrays
        you destructure: <code>const [count, setCount] = useState(0)</code>. You will read and write
        destructuring thousands of times — this lesson is high-leverage.</p>`,
      })}

      <h2>Array destructuring</h2>
      <p>Same idea, but by position instead of by name:</p>

      ${h.codePane({
        lang: "js",
        title: "Array destructuring",
        editable: true,
        code: `const coords = [10, 20];
const [x, y] = coords;
console.log(x, y); // 10 20

// Skip items with commas:
const [first, , third] = ["a", "b", "c"];
console.log(first, third); // "a" "c"

// This is exactly the useState shape:
// const [value, setValue] = useState(0);`,
      })}

      <h2>The spread operator <code>...</code></h2>
      <p>Spread "unpacks" an array or object's contents into a new one. It's the clean way to copy and
      merge <em>without mutating</em> the original — the immutable-update style React loves.</p>

      ${h.codePane({
        lang: "js",
        title: "Spread to copy & merge",
        editable: true,
        code: `// Arrays
const nums = [1, 2, 3];
const more = [...nums, 4, 5];     // [1, 2, 3, 4, 5]  (new array)
const copy = [...nums];           // a real copy

// Objects
const user = { name: "Ada", age: 36 };
const updated = { ...user, age: 37 };  // copy, override age
console.log(updated); // { name: "Ada", age: 37 }
console.log(user);    // { name: "Ada", age: 36 } — untouched

// Merge two objects (later keys win):
const defaults = { theme: "light", size: "md" };
const settings = { ...defaults, theme: "dark" };
console.log(settings); // { theme: "dark", size: "md" }`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Spread copies one level deep",
        body: `<p><code>{ ...user }</code> copies the top-level properties, but nested objects/arrays are
        still shared by reference. For nested updates you spread at each level, or use
        <code>structuredClone(obj)</code> for a deep copy. This "shallow copy" detail matters a lot when
        updating nested React state.</p>`,
      })}

      <h2>Rest: gather the leftovers</h2>
      <p>The same <code>...</code> on the <em>left</em> side collects whatever's remaining into one
      variable:</p>

      ${h.codePane({
        lang: "js",
        title: "Rest",
        editable: true,
        code: `// In destructuring:
const [winner, ...others] = ["gold", "silver", "bronze"];
console.log(winner); // "gold"
console.log(others); // ["silver", "bronze"]

const { id, ...rest } = { id: 1, name: "Ada", age: 36 };
console.log(rest); // { name: "Ada", age: 36 }

// In function parameters — accept any number of args:
const sum = (...numbers) => numbers.reduce((a, b) => a + b, 0);
console.log(sum(1, 2, 3, 4)); // 10`,
      })}

      ${h.callout({
        kind: "tip",
        body: `<p>Same three dots, two jobs: <strong>spread</strong> <em>expands</em> a collection out;
        <strong>rest</strong> <em>collects</em> items in. Which one it is depends on context — spreading
        when building a value, gathering when destructuring or in parameters.</p>`,
      })}

      ${h.exercise({
        title: "Immutable updates",
        prompt: `<p>Given your dashboard's <code>user</code> object, write an
        <code>updateSetting(user, key, value)</code> function that returns a <em>new</em> user with the
        setting changed (using nested spread), leaving the original untouched. Add a task to the tasks
        array with <code>[...user.tasks, newTask]</code> instead of <code>push</code>. Log before/after
        to prove the original never changed — this is precisely how you'll update React state.</p>`,
        runHint: "pnpm js",
      })}
    </section>
  `,
});
