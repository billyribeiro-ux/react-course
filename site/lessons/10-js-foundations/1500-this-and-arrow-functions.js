/* Lesson 10-js-foundations/1500 — this, arrow vs regular functions. */
registerLesson({
  meta: {
    id: "10-js-foundations/1500-this-and-arrow-functions",
    title: "`this`, Arrow vs Regular Functions",
    part: "10-js-foundations",
    estMinutes: 16,
    level: "intermediate",
    project: "js-foundations",
    lede: "`this` is JavaScript's most notorious source of confusion. The good news: modern code (and React) sidesteps most of the pain with arrow functions. Let's make `this` finally make sense.",
    objectives: [
      "Understand what `this` refers to and why it varies",
      "Know the key difference: arrows don't have their own `this`",
      "Avoid the classic 'this is undefined' callback bug",
      "Choose the right function style for the situation",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>What is <code>this</code>?</h2>
      <p>
        <code>this</code> is a special keyword whose value depends on <strong>how a function is
        called</strong>, not where it's written. In a method called on an object, <code>this</code> is
        that object:
      </p>

      ${h.codePane({
        lang: "js",
        title: "this in a method",
        editable: true,
        code: `const user = {
  name: "Ada",
  greet() {
    return \`Hi, I'm \${this.name}\`; // this === user
  },
};

console.log(user.greet()); // "Hi, I'm Ada"`,
      })}

      <h2>The classic bug</h2>
      <p>
        The trouble starts when a method gets detached from its object — for example, passed as a
        callback. Then <code>this</code> loses its connection:
      </p>

      ${h.codePane({
        lang: "js",
        title: "this gets lost",
        editable: true,
        code: `const user = {
  name: "Ada",
  greetLater() {
    // A regular function callback has its OWN this (not user):
    setTimeout(function () {
      console.log(\`Hi, I'm \${this.name}\`); // this.name → undefined 💥
    }, 100);
  },
};
user.greetLater(); // "Hi, I'm undefined"`,
      })}

      <h2>Arrow functions to the rescue</h2>
      <p>
        Arrow functions <strong>don't have their own <code>this</code></strong> — they use
        <code>this</code> from the surrounding code where they were defined. That's exactly what you
        want for callbacks:
      </p>

      ${h.codePane({
        lang: "js",
        title: "Arrow keeps this",
        editable: true,
        code: `const user = {
  name: "Ada",
  greetLater() {
    // Arrow inherits this from greetLater → user:
    setTimeout(() => {
      console.log(\`Hi, I'm \${this.name}\`); // "Hi, I'm Ada" ✅
    }, 100);
  },
};
user.greetLater();`,
      })}

      ${h.callout({
        kind: "principal",
        title: "The practical rule for modern code",
        body: `<p>Use <strong>arrow functions for callbacks</strong> (inside <code>map</code>,
        <code>setTimeout</code>, event handlers) so <code>this</code> behaves predictably. Use a
        <strong>regular method</strong> when you define a function <em>on</em> an object and want
        <code>this</code> to be that object. In modern React you write function components and rarely
        touch <code>this</code> at all — which is a big reason React code feels cleaner than old
        class-based code.</p>`,
      })}

      <h2>Other arrow vs regular differences</h2>
      <ul>
        <li><strong>Syntax</strong> — arrows are shorter, with implicit return for one-liners.</li>
        <li><strong><code>this</code></strong> — arrows inherit it; regular functions get their own.</li>
        <li><strong>Hoisting</strong> — <code>function foo(){}</code> declarations can be called before
        their line; arrow functions assigned to <code>const</code> cannot.</li>
        <li>Arrows can't be used as object constructors (with <code>new</code>) — rarely an issue in app code.</li>
      </ul>

      ${h.codePane({
        lang: "js",
        title: "Hoisting difference",
        editable: true,
        code: `sayHi();              // ✅ works — declarations are hoisted
function sayHi() { console.log("hi"); }

sayBye();             // ❌ ReferenceError — not yet defined
const sayBye = () => console.log("bye");`,
      })}

      ${h.callout({
        kind: "gotcha",
        body: `<p>You don't need to memorize every rule of <code>this</code> to be productive. Most modern
        React code avoids the hard cases entirely. Learn the "arrows for callbacks, methods on objects"
        heuristic, and revisit the deeper rules only when a specific bug forces you to. Don't let
        <code>this</code> intimidate you.</p>`,
      })}

      ${h.exercise({
        title: "Fix a broken callback",
        prompt: `<p>Create a <code>timer</code> object with a <code>seconds: 0</code> property and a
        <code>start()</code> method that uses <code>setInterval</code> to increment
        <code>this.seconds</code> every second and log it. First write the callback as a regular
        <code>function</code> and watch <code>this.seconds</code> break; then switch it to an arrow
        function and watch it work. Feeling the difference firsthand makes the rule stick.</p>`,
        runHint: "pnpm js",
      })}
    </section>
  `,
});
