/* Lesson 10-js-foundations/1000 — Arrays. */
registerLesson({
  meta: {
    id: "10-js-foundations/1000-arrays",
    title: "Arrays: Ordered Lists of Values",
    part: "10-js-foundations",
    estMinutes: 17,
    level: "beginner",
    project: "js-foundations",
    lede: "Almost every app is really a list of things — tasks, messages, products, users. Arrays are how you store ordered collections, and they're everywhere in React.",
    objectives: [
      "Create arrays and read items by index",
      "Add and remove items",
      "Use length and check membership",
      "Understand reference vs copy for arrays",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Creating and reading arrays</h2>
      ${h.codePane({
        lang: "js",
        title: "Basics",
        editable: true,
        code: `const tasks = ["Buy milk", "Walk dog", "Write code"];

console.log(tasks[0]);      // "Buy milk"  (first item — index 0)
console.log(tasks[2]);      // "Write code"
console.log(tasks.length);  // 3
console.log(tasks.at(-1));  // "Write code" (last item)

// Arrays can hold any type, even mixed (though usually keep them uniform):
const mixed = [1, "two", true, null];`,
      })}

      <h2>Adding and removing</h2>
      ${h.codePane({
        lang: "js",
        title: "Mutating methods",
        editable: true,
        code: `const stack = ["a", "b"];

stack.push("c");      // add to END    → ["a","b","c"]
stack.pop();          // remove from END → ["a","b"], returns "c"
stack.unshift("z");   // add to START  → ["z","a","b"]
stack.shift();        // remove from START → ["a","b"]

console.log(stack);   // ["a", "b"]`,
      })}

      ${h.callout({
        kind: "note",
        title: "const arrays can still change inside",
        body: `<p>Remember the earlier flag: <code>const tasks = [...]</code> means you can't reassign
        <code>tasks</code> to a whole new array, but you <em>can</em> <code>push</code>/<code>pop</code>
        its contents. <code>const</code> locks the box, not the items in it.</p>`,
      })}

      <h2>Finding things</h2>
      ${h.codePane({
        lang: "js",
        title: "Search",
        editable: true,
        code: `const fruits = ["apple", "banana", "cherry"];

console.log(fruits.includes("banana")); // true
console.log(fruits.indexOf("cherry"));   // 2  (-1 if not found)
console.log(fruits.join(", "));          // "apple, banana, cherry"`,
      })}

      <h2>The reference gotcha (important!)</h2>
      ${h.callout({
        kind: "gotcha",
        title: "Arrays are shared by reference, not copied",
        body: `<p>Assigning an array to a new variable does <strong>not</strong> copy it — both names
        point at the <em>same</em> array in memory. Changing one changes "both," because there's really
        only one. This trips up everyone, and it's central to how React decides when to re-render.</p>`,
      })}

      ${h.codePane({
        lang: "js",
        title: "Reference vs copy",
        editable: true,
        code: `const original = [1, 2, 3];
const alias = original;     // NOT a copy — same array
alias.push(4);
console.log(original);      // [1, 2, 3, 4]  😱 changed too!

// To truly copy, spread it into a new array:
const realCopy = [...original];
realCopy.push(5);
console.log(original);      // [1, 2, 3, 4]  — untouched
console.log(realCopy);      // [1, 2, 3, 4, 5]`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Copy-then-change is a core React habit",
        body: `<p>In React you'll almost always update lists by making a <em>new</em> array
        (<code>[...old, newItem]</code>) rather than mutating the existing one. The reference behavior
        you just saw is exactly why: React detects "this is a new array" to know something changed.
        Internalize <code>[...spread]</code> now — you'll use it daily.</p>`,
      })}

      <h2>Arrays of objects: the shape of real data</h2>
      ${h.codePane({
        lang: "js",
        title: "Realistic data",
        readOnly: true,
        code: `const todos = [
  { id: 1, text: "Buy milk", done: false },
  { id: 2, text: "Walk dog", done: true },
];
// This array-of-objects shape is how nearly all app data looks.
// You'll loop and transform it constantly — that's the next lesson.`,
      })}

      ${h.exercise({
        title: "A real task list",
        prompt: `<p>In your dashboard, replace your plain strings with an array of task <em>objects</em>:
        each with <code>id</code>, <code>text</code>, and <code>done</code>. Add one with
        <code>push</code> and a spread-copy version that adds without mutating. Log both
        <code>.length</code> and whether the list <code>.includes</code> a specific id (hint: you'll
        need a method that searches by a field — perfect lead-in to the next lesson).</p>`,
        runHint: "pnpm js",
      })}
    </section>
  `,
});
