/* Lesson 10-js-foundations/0300 — Numbers & math. */
registerLesson({
  meta: {
    id: "10-js-foundations/0300-numbers-and-math",
    title: "Numbers & Math",
    part: "10-js-foundations",
    estMinutes: 15,
    level: "beginner",
    project: "js-foundations",
    lede: "Numbers power scores, prices, counts, and positions. Learn the operators, the order they run in, and the one floating-point gotcha that surprises everyone.",
    objectives: [
      "Use the arithmetic operators and operator precedence",
      "Apply the remainder (%) operator for real patterns",
      "Use shorthand like += and ++",
      "Understand floating-point rounding and how to handle it",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Arithmetic operators</h2>
      ${h.codePane({
        lang: "js",
        title: "The basics",
        editable: true,
        code: `console.log(7 + 2);   // 9   addition
console.log(7 - 2);   // 5   subtraction
console.log(7 * 2);   // 14  multiplication
console.log(7 / 2);   // 3.5 division
console.log(7 % 2);   // 1   remainder ("modulo")
console.log(7 ** 2);  // 49  exponent (7 to the power 2)`,
      })}

      <h2>Order of operations</h2>
      <p>
        Just like math class, multiplication and division run before addition and subtraction, and
        parentheses override everything. When in doubt, add parentheses — they cost nothing and make
        intent obvious.
      </p>

      ${h.codePane({
        lang: "js",
        title: "Precedence",
        editable: true,
        code: `console.log(2 + 3 * 4);     // 14, not 20
console.log((2 + 3) * 4);   // 20
console.log(10 - 2 - 3);    // 5  (left to right)`,
      })}

      <h2>The remainder operator is secretly everywhere</h2>
      <p>
        <code>%</code> gives the remainder after division. It looks niche but powers tons of real
        patterns — the most common being "is this number even?" and "cycle through a fixed set."
      </p>

      ${h.codePane({
        lang: "js",
        title: "% in practice",
        editable: true,
        code: `console.log(10 % 2); // 0  → even (remainder 0)
console.log(7 % 2);  // 1  → odd
console.log(14 % 5); // 4

// "Is n even?"  →  n % 2 === 0
// Wrap an index around a list of 3 →  i % 3  cycles 0,1,2,0,1,2...`,
      })}

      <h2>Shorthand you'll use daily</h2>
      ${h.codePane({
        lang: "js",
        title: "Compound assignment & increment",
        editable: true,
        code: `let score = 10;

score += 5;   // same as: score = score + 5  → 15
score -= 3;   // → 12
score *= 2;   // → 24

let count = 0;
count++;      // add 1 → 1   (super common in loops)
count--;      // subtract 1 → 0`,
      })}

      <h2>Handy <code>Math</code> tools</h2>
      ${h.codePane({
        lang: "js",
        title: "Math",
        editable: true,
        code: `console.log(Math.round(3.7));   // 4
console.log(Math.floor(3.7));   // 3  (round down)
console.log(Math.ceil(3.2));    // 4  (round up)
console.log(Math.max(4, 9, 1)); // 9
console.log(Math.min(4, 9, 1)); // 1

// A random whole number from 1 to 6 (like a die):
console.log(Math.floor(Math.random() * 6) + 1);`,
      })}

      <h2>The floating-point gotcha</h2>
      ${h.callout({
        kind: "gotcha",
        title: "0.1 + 0.2 is not exactly 0.3",
        body: `<p>Computers store decimals in binary, which can't represent some fractions exactly —
        so <code>0.1 + 0.2</code> gives <code>0.30000000000000004</code>. This isn't a JavaScript bug;
        nearly every language does it. For money, work in the smallest unit (cents as whole numbers),
        and when displaying, round with <code>toFixed</code>.</p>`,
      })}

      ${h.codePane({
        lang: "js",
        title: "Working around it",
        editable: true,
        code: `console.log(0.1 + 0.2);            // 0.30000000000000004
console.log((0.1 + 0.2).toFixed(2)); // "0.30"  (a string, rounded)

// Special non-number result:
console.log(0 / 0);                // NaN  ("Not a Number")
console.log(typeof NaN);           // "number"  (yes, really)`,
      })}

      ${h.callout({
        kind: "principal",
        body: `<p><code>NaN</code> ("Not a Number") appears when a math operation makes no sense, like
        dividing zero by zero or doing math on text. Seeing <code>NaN</code> downstream usually means
        "somewhere upstream, a value that should've been a number wasn't." Trace it back to the source —
        that's the real fix, not patching the symptom.</p>`,
      })}

      ${h.exercise({
        title: "A dice-roll widget",
        prompt: `<p>In your dashboard's <code>main.js</code>, write a function-free snippet that logs a
        random dice roll (1–6) and whether it's even or odd using <code>%</code>. Bonus: compute a
        20% tip on a <code>const bill = 47.5</code> and print it rounded to 2 decimals with
        <code>toFixed(2)</code>.</p>`,
        runHint: "pnpm js",
      })}
    </section>
  `,
});
