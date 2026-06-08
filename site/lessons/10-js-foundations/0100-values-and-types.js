/* Lesson 10-js-foundations/0100 — Values & types. */
registerLesson({
  meta: {
    id: "10-js-foundations/0100-values-and-types",
    title: "Values & Types",
    part: "10-js-foundations",
    estMinutes: 16,
    level: "beginner",
    project: "js-foundations",
    lede: "Everything a program works with is a value, and every value has a type. This is the atom of programming — get it solid and everything else has something to stand on.",
    objectives: [
      "Define what a 'value' and a 'type' are",
      "Recognize JavaScript's core primitive types",
      "Use the console and typeof to inspect values",
      "Understand why types matter for behavior",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Programs push values around</h2>
      <p>
        A <strong>value</strong> is a single piece of data: the number <code>42</code>, the text
        <code>"hello"</code>, the idea of <code>true</code>. Programs are mostly just machines for
        creating, combining, and moving values around. If you can think clearly about values, you can
        think clearly about code.
      </p>
      <p>
        Every value has a <strong>type</strong> — a category that decides what you can do with it. You
        can multiply numbers but not glue them like text; you can make text uppercase but not divide
        it. The type <em>is</em> the behavior.
      </p>

      <h2>JavaScript's primitive types</h2>
      <p>JavaScript has a small set of basic ("primitive") types. The ones you'll use constantly:</p>
      <ul>
        <li><strong>number</strong> — any number: <code>42</code>, <code>-7</code>, <code>3.14</code>. (JS has just one number type, no separate "integer".)</li>
        <li><strong>string</strong> — text, always in quotes: <code>"hello"</code>, <code>'JS'</code>, <code>\`hi\`</code>.</li>
        <li><strong>boolean</strong> — a yes/no value: <code>true</code> or <code>false</code>.</li>
        <li><strong>undefined</strong> — "no value has been set yet." JS's default for emptiness.</li>
        <li><strong>null</strong> — "intentionally empty." You set this on purpose to mean "nothing."</li>
      </ul>
      <p>(Two more — <code>bigint</code> and <code>symbol</code> — are specialized; we'll meet them much later.)</p>

      ${h.callout({
        kind: "note",
        title: "undefined vs null",
        body: `<p>Both mean "empty," but with different intent: <code>undefined</code> is the system
        saying "nothing's here yet," while <code>null</code> is <em>you</em> saying "I deliberately put
        nothing here." Subtle now, useful later.</p>`,
      })}

      <h2>The console: your experimentation lab</h2>
      <p>
        The browser's <strong>console</strong> is where you can type JavaScript and instantly see
        results. Open Developer Tools (<kbd>F12</kbd>) and click <strong>Console</strong>. Type
        expressions and press Enter:
      </p>

      ${h.codePane({
        lang: "js",
        title: "Console — try each line",
        editable: true,
        code: `42
"hello world"
true
3 + 4
"Java" + "Script"`,
      })}

      <p>
        <code>console.log(...)</code> prints a value on purpose — you'll use it everywhere to peek at
        what your code is doing:
      </p>

      ${h.codePane({
        lang: "js",
        title: "console.log",
        readOnly: true,
        code: `console.log("The answer is", 42);
console.log(true);
// Logs:  The answer is 42
//        true`,
      })}

      <h2>Inspecting a value's type with <code>typeof</code></h2>
      <p>The <code>typeof</code> operator tells you the type of any value as a string:</p>

      ${h.codePane({
        lang: "js",
        title: "typeof",
        editable: true,
        code: `console.log(typeof 42);        // "number"
console.log(typeof "hello");   // "string"
console.log(typeof true);      // "boolean"
console.log(typeof undefined); // "undefined"`,
      })}

      ${h.callout({
        kind: "gotcha",
        body: `<p>One famous JavaScript quirk: <code>typeof null</code> returns <code>"object"</code>,
        not <code>"null"</code>. It's a decades-old bug that can never be fixed without breaking the
        web. Just remember it exists; it occasionally trips people up.</p>`,
      })}

      <h2>Types decide what operations mean</h2>
      <p>The same symbol can do different things depending on the types involved:</p>

      ${h.codePane({
        lang: "js",
        title: "+ depends on type",
        editable: true,
        code: `console.log(5 + 3);          // 8      (number addition)
console.log("5" + "3");      // "53"   (string joining!)
console.log("5" + 3);        // "53"   (number becomes text)`,
      })}

      ${h.callout({
        kind: "principal",
        title: "This is why types matter",
        body: `<p>That <code>"5" + 3 === "53"</code> surprise is a whole class of real-world bugs:
        data arriving as text when you assumed numbers. It's also exactly why we add TypeScript in
        Part 20 — to catch these mismatches <em>before</em> the program runs. For now, just build the
        habit of asking "what type is this value, really?"</p>`,
      })}

      ${h.exercise({
        title: "Explore types in the console",
        prompt: `<p>Open your browser console and predict-then-check each of these before pressing
        Enter:</p>
        <ul>
          <li><code>typeof "42"</code> — number or string?</li>
          <li><code>10 + "0"</code> — what do you get?</li>
          <li><code>typeof (3 > 2)</code> — what type is a comparison's result?</li>
        </ul>
        <p>Predicting first (even when wrong) is what builds real intuition.</p>`,
        runHint: "pnpm js   # then open the browser console",
      })}
    </section>
  `,
});
