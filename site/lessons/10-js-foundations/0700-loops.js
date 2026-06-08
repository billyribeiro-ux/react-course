/* Lesson 10-js-foundations/0700 — Loops. */
registerLesson({
  meta: {
    id: "10-js-foundations/0700-loops",
    title: "Loops: Doing Things Repeatedly",
    part: "10-js-foundations",
    estMinutes: 16,
    level: "beginner",
    project: "js-foundations",
    lede: "Computers shine at repetition. Loops let you run the same code many times — over a list of users, the rows of a table, the days of a month — without copy-pasting.",
    objectives: [
      "Repeat work with for and while loops",
      "Iterate cleanly with for...of",
      "Control loops with break and continue",
      "Recognize when a different tool fits better",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The classic <code>for</code> loop</h2>
      <p>A <code>for</code> loop has three parts: a start, a condition to keep going, and a step.</p>

      ${h.codePane({
        lang: "js",
        title: "for",
        editable: true,
        code: `for (let i = 0; i < 5; i++) {
  console.log("Count:", i);
}
// Count: 0
// Count: 1 ... up to 4

//   let i = 0   → start
//   i < 5       → keep looping while this is true
//   i++         → after each pass, add 1`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Off-by-one and infinite loops",
        body: `<p>Two classic traps: using <code>&lt;=</code> when you meant <code>&lt;</code> (running one
        time too many), and forgetting the <code>i++</code> step so the condition never becomes false —
        an <strong>infinite loop</strong> that freezes the page. If your tab hangs, suspect a loop that
        never ends.</p>`,
      })}

      <h2><code>for...of</code>: loop over a list's items</h2>
      <p>When you just want each item of an array (or characters of a string), <code>for...of</code> is
      cleaner — no index bookkeeping:</p>

      ${h.codePane({
        lang: "js",
        title: "for...of",
        editable: true,
        code: `const fruits = ["apple", "banana", "cherry"];

for (const fruit of fruits) {
  console.log(fruit);
}
// apple
// banana
// cherry`,
      })}

      <h2><code>while</code>: loop until a condition changes</h2>
      <p>Use <code>while</code> when you don't know the count in advance — keep going until something
      becomes false:</p>

      ${h.codePane({
        lang: "js",
        title: "while",
        editable: true,
        code: `let energy = 5;

while (energy > 0) {
  console.log("Working... energy:", energy);
  energy--;          // must move toward the exit, or it loops forever
}
console.log("Out of energy 😴");`,
      })}

      <h2>Steering a loop: <code>break</code> and <code>continue</code></h2>
      ${h.codePane({
        lang: "js",
        title: "break & continue",
        editable: true,
        code: `for (const n of [1, 2, 3, 4, 5, 6]) {
  if (n === 4) break;       // stop the whole loop at 4
  console.log(n);           // 1, 2, 3
}

for (const n of [1, 2, 3, 4, 5, 6]) {
  if (n % 2 === 0) continue; // skip evens, go to next
  console.log(n);            // 1, 3, 5
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "You'll soon loop less by hand",
        body: `<p>Manual loops are fundamental, but in real React code you'll usually reach for
        <strong>array methods</strong> like <code>map</code> and <code>filter</code> (next lessons) —
        they're more declarative and less error-prone. Learn loops to understand the machinery, then
        graduate to the higher-level tools. Knowing both, and when each fits, is the mark of fluency.</p>`,
      })}

      ${h.exercise({
        title: "Generate dashboard content",
        prompt: `<p>In <code>main.js</code>, make an array of 3–5 task strings. Use a
        <code>for...of</code> loop to build one big HTML string of <code>&lt;li&gt;</code> items, then
        set it as the contents of a list element on the page. (Hint: start with
        <code>let html = ""</code> and do <code>html += \`&lt;li&gt;\${task}&lt;/li&gt;\`</code> each
        pass.) You just rendered a list — the core thing React will soon do for you.</p>`,
        runHint: "pnpm js",
      })}
    </section>
  `,
});
