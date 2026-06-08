/* Lesson 10-js-foundations/0200 — Variables (let / const) & the TDZ. */
registerLesson({
  meta: {
    id: "10-js-foundations/0200-variables",
    title: "Variables: let, const & Naming",
    part: "10-js-foundations",
    estMinutes: 16,
    level: "beginner",
    project: "js-foundations",
    lede: "Variables are labeled boxes that hold values so you can reuse and change them. Choosing between const and let — and naming things well — is a habit that marks good engineers.",
    objectives: [
      "Declare variables with const and let",
      "Know when to use const vs let (and why const is the default)",
      "Reassign values and understand what that means",
      "Name variables clearly and follow JS conventions",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>A variable is a named box</h2>
      <p>
        A <strong>variable</strong> gives a value a name so you can refer back to it. Instead of
        repeating <code>3.14159</code> everywhere, you store it once as <code>pi</code> and use the
        name. You <strong>declare</strong> a variable with a keyword (<code>const</code> or
        <code>let</code>), a name, and a starting value:
      </p>

      ${h.codePane({
        lang: "js",
        title: "Declaring variables",
        editable: true,
        code: `const pi = 3.14159;
let score = 0;

console.log(pi);    // 3.14159
console.log(score); // 0`,
      })}

      <p>The <code>=</code> here is <strong>assignment</strong> ("put the value on the right into the
      name on the left"), <em>not</em> mathematical equality. Read it as "score gets 0."</p>

      <h2><code>const</code> vs <code>let</code></h2>
      <ul>
        <li><strong><code>const</code></strong> — a constant. Once set, the name can't be reassigned to a different value.</li>
        <li><strong><code>let</code></strong> — a variable whose value you intend to change later.</li>
      </ul>

      ${h.codePane({
        lang: "js",
        title: "Reassigning",
        editable: true,
        code: `let score = 0;
score = 10;        // fine — let allows reassignment
score = score + 5; // now 15
console.log(score);

const name = "Ada";
name = "Grace";    // ❌ TypeError: Assignment to constant variable.`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Reach for const first",
        body: `<p>Make <strong><code>const</code> your default</strong> and only switch to
        <code>let</code> when you actually need to reassign. Code where most things can't change is
        easier to reason about — you can trust that a <code>const</code> means what it said. Senior
        engineers minimize "moving parts," and <code>const</code> is the simplest version of that
        discipline. You'll rarely need a third keyword, <code>var</code> — it's the old way with
        confusing rules; avoid it.</p>`,
      })}

      <h2>"Changing a constant"? A crucial distinction</h2>
      <p>
        <code>const</code> means the <em>name</em> can't be pointed at a new value. It does <strong>not</strong>
        mean the value itself is frozen. With objects and arrays (coming soon), you can still change
        <em>what's inside</em> — you just can't replace the whole thing. We'll revisit this; flag it now.
      </p>

      ${h.callout({
        kind: "gotcha",
        title: "Use a variable before declaring it",
        body: `<p>If you try to read a <code>let</code>/<code>const</code> variable on a line
        <em>before</em> its declaration, you get a <code>ReferenceError</code> (the variable is in its
        "temporal dead zone"). The fix is simple: declare things before you use them, top to bottom.
        This is a feature — it catches typos and ordering mistakes.</p>`,
      })}

      <h2>Naming things well</h2>
      <p>Naming is one of the genuinely hard, genuinely important parts of programming. Conventions:</p>
      <ul>
        <li>Use <strong>camelCase</strong>: <code>firstName</code>, <code>totalScore</code>, <code>isLoggedIn</code>.</li>
        <li>Names must start with a letter, <code>$</code>, or <code>_</code> — not a number — and can't contain spaces.</li>
        <li>Make names <strong>descriptive</strong>: <code>userAge</code> beats <code>a</code>. Booleans read well as questions: <code>isReady</code>, <code>hasAccess</code>.</li>
        <li>JavaScript is <strong>case-sensitive</strong>: <code>score</code> and <code>Score</code> are different variables.</li>
      </ul>

      ${h.codePane({
        lang: "js",
        title: "Good vs unclear names",
        readOnly: true,
        code: `// 👍 clear intent
const maxRetries = 3;
let isMenuOpen = false;

// 👎 forces the reader to guess
const m = 3;
let x = false;`,
      })}

      ${h.callout({
        kind: "tip",
        body: `<p>"There are only two hard things in computer science: cache invalidation and
        <strong>naming things</strong>." It's a joke, but real. Spending three seconds on a clearer name
        saves your future self (and teammates) minutes of confusion every time they read it.</p>`,
      })}

      ${h.exercise({
        title: "Wire up your dashboard's data",
        prompt: `<p>In <code>projects/js-foundations/src/main.js</code>, declare a few variables at the
        top describing <em>you</em>: a <code>const userName</code> with your name, a
        <code>let taskCount</code> starting at 0, and a <code>const favoriteColor</code>. Then update
        the greeting line to include your name, e.g.
        <code>\`Good \${partOfDay}, \${userName}!\`</code>. Save and watch the page update.</p>`,
        runHint: "pnpm js",
      })}
    </section>
  `,
});
