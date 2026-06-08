/* Lesson 10-js-foundations/0600 — if/else, switch, ternary. */
registerLesson({
  meta: {
    id: "10-js-foundations/0600-control-flow",
    title: "Making Decisions: if, else, switch & ternary",
    part: "10-js-foundations",
    estMinutes: 16,
    level: "beginner",
    project: "js-foundations",
    lede: "Programs get interesting when they make choices. Learn to branch your code based on conditions — the moment your dashboard starts to feel alive.",
    objectives: [
      "Branch with if / else if / else",
      "Use the ternary operator for concise choices",
      "Choose between many options with switch",
      "Write conditions that read clearly",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2><code>if</code> / <code>else if</code> / <code>else</code></h2>
      <p>An <code>if</code> runs a block only when its condition is truthy. Chain alternatives:</p>

      ${h.codePane({
        lang: "js",
        title: "Branching",
        editable: true,
        code: `const score = 78;

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else if (score >= 70) {
  console.log("Grade: C");
} else {
  console.log("Grade: F");
}
// Logs: Grade: C  — the FIRST matching branch wins, then it stops.`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "= vs ===",
        body: `<p>Inside a condition, always use <code>===</code> for comparison. Writing
        <code>if (x = 5)</code> with one equals sign <em>assigns</em> 5 to x and is almost always a bug.
        Linters catch it, but train your eyes now.</p>`,
      })}

      <h2>Conditions can be any boolean expression</h2>
      ${h.codePane({
        lang: "js",
        title: "Combined conditions",
        editable: true,
        code: `const age = 20;
const hasLicense = true;

if (age >= 18 && hasLicense) {
  console.log("Can drive");
}

// Guard clauses keep code flat and readable:
const username = "";
if (!username) {
  console.log("Please enter a username");
}`,
      })}

      <h2>The ternary operator: a one-line if/else</h2>
      <p>
        When you need to pick between two values, the ternary is compact:
        <code>condition ? valueIfTrue : valueIfFalse</code>. You'll use this <em>constantly</em> in
        React to choose what to show.
      </p>

      ${h.codePane({
        lang: "js",
        title: "Ternary",
        editable: true,
        code: `const age = 16;

const status = age >= 18 ? "adult" : "minor";
console.log(status); // "minor"

// Great for building text:
const count = 1;
console.log(\`You have \${count} \${count === 1 ? "item" : "items"}.\`);`,
      })}

      ${h.callout({
        kind: "principal",
        body: `<p>Use a ternary when you're <em>choosing a value</em>; use <code>if/else</code> when
        you're <em>running different blocks of work</em>. Don't nest ternaries deeply — a triple-nested
        <code>? :</code> is a readability crime. Clarity beats cleverness every time.</p>`,
      })}

      <h2><code>switch</code> for many discrete cases</h2>
      <p>When comparing one value against many fixed options, <code>switch</code> can read cleaner:</p>

      ${h.codePane({
        lang: "js",
        title: "switch",
        editable: true,
        code: `const day = "Tue";

switch (day) {
  case "Sat":
  case "Sun":
    console.log("Weekend! 🎉");
    break;            // stop here
  case "Fri":
    console.log("Almost there");
    break;
  default:
    console.log("A weekday");
}`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Don't forget break",
        body: `<p>Without <code>break</code>, execution "falls through" into the next case and keeps
        going — occasionally useful (stacking <code>case "Sat": case "Sun":</code>), usually a bug.
        Each independent case needs its own <code>break</code>.</p>`,
      })}

      ${h.exercise({
        title: "A smarter greeting",
        prompt: `<p>In your dashboard, replace the simple greeting with branching logic: if it's before
        6am or after 10pm, say "Working late, \${userName}?"; otherwise greet by part of day. Then add a
        ternary that shows <code>"\${taskCount} task\${taskCount === 1 ? "" : "s"}"</code> so the wording
        is always grammatically correct.</p>`,
        runHint: "pnpm js",
      })}
    </section>
  `,
});
