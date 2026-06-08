/* Lesson 10-js-foundations/1100 — Array methods: map/filter/reduce/find. */
registerLesson({
  meta: {
    id: "10-js-foundations/1100-array-methods",
    title: "Array Methods: map, filter, reduce & friends",
    part: "10-js-foundations",
    estMinutes: 22,
    level: "intermediate",
    project: "js-foundations",
    lede: "These are the most important methods in this entire part. map, filter, and reduce are how modern JavaScript — and all of React — transforms data into UI. Slow down and truly get these.",
    objectives: [
      "Transform every item with map",
      "Keep a subset with filter",
      "Collapse a list to one value with reduce",
      "Locate items with find and test with some/every",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The big idea: describe the transformation</h2>
      <p>
        Instead of writing loops that build results step by step, these methods let you
        <strong>declare</strong> what you want: "a new list with each item doubled," "only the items
        that match." Each takes a function you supply and applies it across the array. This declarative
        style <em>is</em> how you'll render lists in React.
      </p>

      <h2><code>map</code> — transform every item</h2>
      <p><code>map</code> creates a <strong>new</strong> array by running each item through your
      function. Same length, transformed contents:</p>

      ${h.codePane({
        lang: "js",
        title: "map",
        editable: true,
        code: `const numbers = [1, 2, 3, 4];

const doubled = numbers.map((n) => n * 2);
console.log(doubled);  // [2, 4, 6, 8]
console.log(numbers);  // [1, 2, 3, 4] — original untouched

const names = ["ada", "grace"];
const caps = names.map((name) => name.toUpperCase());
console.log(caps);     // ["ADA", "GRACE"]`,
      })}

      ${h.callout({
        kind: "principal",
        title: "map is how React renders lists",
        body: `<p>In React you'll write <code>{todos.map(todo =&gt; &lt;Todo ... /&gt;)}</code> to turn an
        array of data into an array of UI elements. The exact <code>map</code> you're learning now is
        the single most-used method in React apps. If only one thing sticks from this part, make it this.</p>`,
      })}

      <h2><code>filter</code> — keep only what matches</h2>
      <p><code>filter</code> returns a new array containing only items for which your function returns
      <code>true</code>:</p>

      ${h.codePane({
        lang: "js",
        title: "filter",
        editable: true,
        code: `const numbers = [1, 2, 3, 4, 5, 6];

const evens = numbers.filter((n) => n % 2 === 0);
console.log(evens); // [2, 4, 6]

const todos = [
  { text: "Buy milk", done: false },
  { text: "Walk dog", done: true },
  { text: "Write code", done: false },
];
const remaining = todos.filter((t) => !t.done);
console.log(remaining.length); // 2`,
      })}

      <h2><code>find</code> — get the first match</h2>
      ${h.codePane({
        lang: "js",
        title: "find",
        editable: true,
        code: `const todos = [
  { id: 1, text: "Buy milk" },
  { id: 2, text: "Walk dog" },
];

const todo = todos.find((t) => t.id === 2);
console.log(todo.text);  // "Walk dog"
// find returns the ITEM (or undefined). filter returns an ARRAY.`,
      })}

      <h2><code>some</code> and <code>every</code> — quick tests</h2>
      ${h.codePane({
        lang: "js",
        title: "some / every",
        editable: true,
        code: `const scores = [80, 90, 100];
console.log(scores.some((s) => s < 60));   // false — any failing?
console.log(scores.every((s) => s >= 70)); // true  — all passing?`,
      })}

      <h2><code>reduce</code> — collapse a list to one value</h2>
      <p>
        <code>reduce</code> is the most powerful and the most intimidating. It walks the array carrying
        an "accumulator" — a running result — and returns it at the end. Use it to sum, count, or build
        anything from a list.
      </p>

      ${h.codePane({
        lang: "js",
        title: "reduce",
        editable: true,
        code: `const prices = [10, 20, 30];

// (runningTotal, currentItem) => newRunningTotal ; start at 0
const total = prices.reduce((sum, price) => sum + price, 0);
console.log(total); // 60

// Step by step: start 0 → 0+10=10 → 10+20=30 → 30+30=60`,
      })}

      ${h.callout({
        kind: "tip",
        body: `<p>Don't stress if <code>reduce</code> feels slippery — it's the last one to click for
        most people. Reach for <code>map</code> and <code>filter</code> first; use <code>reduce</code>
        when you specifically need to fold many values into one. You can chain them:
        <code>nums.filter(...).map(...).reduce(...)</code>.</p>`,
      })}

      <h2>Chaining: the real power</h2>
      ${h.codePane({
        lang: "js",
        title: "Chaining methods",
        editable: true,
        code: `const cart = [
  { name: "Book",  price: 12, inStock: true },
  { name: "Pen",   price: 2,  inStock: false },
  { name: "Mug",   price: 8,  inStock: true },
];

const total = cart
  .filter((item) => item.inStock)     // only in-stock
  .map((item) => item.price)          // just the prices
  .reduce((sum, price) => sum + price, 0); // add them up

console.log(total); // 20`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Prefer these over manual loops",
        body: `<p>Compared to a hand-written <code>for</code> loop, a <code>filter→map→reduce</code>
        pipeline reads like a sentence describing your intent, doesn't mutate anything, and has far less
        room for off-by-one bugs. This declarative, immutable style is exactly the mindset React rewards.
        Manual loops still matter, but in app code these methods are your daily drivers.</p>`,
      })}

      ${h.exercise({
        title: "Dashboard stats",
        prompt: `<p>With your array of task objects: use <code>filter</code> to get incomplete tasks,
        <code>map</code> to get just their text, and <code>reduce</code> (or <code>filter().length</code>)
        to count how many are done. Display "You've completed X of Y tasks" on the page. Then render the
        task list by mapping each task to an <code>&lt;li&gt;</code> string and <code>join("")</code>ing
        them — the precise pattern React automates next part.</p>`,
        runHint: "pnpm js",
      })}
    </section>
  `,
});
