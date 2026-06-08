/* Lesson 10-js-foundations/0800 — Functions. */
registerLesson({
  meta: {
    id: "10-js-foundations/0800-functions",
    title: "Functions: Reusable Blocks of Logic",
    part: "10-js-foundations",
    estMinutes: 20,
    level: "beginner",
    project: "js-foundations",
    lede: "Functions are the single most important building block in JavaScript — and React components are just functions. Master parameters, return values, and arrow syntax here, and React will feel familiar later.",
    objectives: [
      "Define and call functions with parameters and return values",
      "Write arrow functions, the style used throughout React",
      "Use default parameters and understand return",
      "Think in terms of inputs → output (pure functions)",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Why functions exist</h2>
      <p>
        A <strong>function</strong> is a named, reusable recipe: you define a set of steps once, then
        run ("call") it whenever you need, possibly with different inputs. They eliminate copy-paste,
        give chunks of logic a meaningful name, and let you build big programs from small understandable
        pieces.
      </p>

      ${h.codePane({
        lang: "js",
        title: "Define and call",
        editable: true,
        code: `function greet() {
  console.log("Hello!");
}

greet(); // "Hello!"  — the () actually runs it
greet(); // call it as many times as you like`,
      })}

      <h2>Parameters and arguments</h2>
      <p>
        <strong>Parameters</strong> are named inputs in the definition; <strong>arguments</strong> are
        the actual values you pass when calling. (People use the words interchangeably — that's fine.)
      </p>

      ${h.codePane({
        lang: "js",
        title: "Inputs",
        editable: true,
        code: `function greet(name) {           // name is a parameter
  console.log(\`Hello, \${name}!\`);
}

greet("Ada");   // Hello, Ada!   ("Ada" is the argument)
greet("Grace"); // Hello, Grace!

function add(a, b) {
  console.log(a + b);
}
add(2, 3); // 5`,
      })}

      <h2><code>return</code>: handing a value back</h2>
      <p>
        Most useful functions <strong>compute and return</strong> a value rather than just printing.
        <code>return</code> sends a result back to whoever called the function, and immediately ends it.
      </p>

      ${h.codePane({
        lang: "js",
        title: "return",
        editable: true,
        code: `function add(a, b) {
  return a + b;
}

const sum = add(2, 3);     // capture what comes back
console.log(sum);          // 5
console.log(add(10, 5));   // 15  — or use it directly

// A function with no return gives back \`undefined\`.`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Printing is not returning",
        body: `<p><code>console.log</code> shows a value to <em>you</em>; <code>return</code> hands it
        back to the <em>program</em> so other code can use it. A function that logs but doesn't return
        gives back <code>undefined</code>. Beginners mix these up constantly — when you need the result
        elsewhere, you need <code>return</code>.</p>`,
      })}

      <h2>Arrow functions: the modern, React-friendly style</h2>
      <p>
        There's a shorter syntax called the <strong>arrow function</strong>. It's what you'll see in
        nearly all modern React code, so get comfortable now. These are equivalent:
      </p>

      ${h.codePane({
        lang: "js",
        title: "Arrow functions",
        editable: true,
        code: `// Traditional:
function double(n) {
  return n * 2;
}

// Arrow:
const double = (n) => {
  return n * 2;
};

// Arrow with implicit return (one expression, no braces, no 'return'):
const triple = (n) => n * 3;

console.log(double(4)); // 8
console.log(triple(4)); // 12`,
      })}

      ${h.callout({
        kind: "tip",
        body: `<p>When an arrow function's body is a single expression, drop the braces and the
        <code>return</code> — the expression is returned automatically. <code>n =&gt; n * 3</code> is
        as small as it gets, and you'll see this exact shape inside <code>map</code>, event handlers,
        and React components everywhere.</p>`,
      })}

      <h2>Default parameters</h2>
      ${h.codePane({
        lang: "js",
        title: "Defaults",
        editable: true,
        code: `const greet = (name = "friend") => \`Hello, \${name}!\`;

console.log(greet("Ada")); // "Hello, Ada!"
console.log(greet());      // "Hello, friend!"  — used the default`,
      })}

      <h2>The principal-engineer way to think about functions</h2>
      ${h.callout({
        kind: "principal",
        title: "Aim for small, pure functions",
        body: `<p>The best functions are <strong>pure</strong>: given the same inputs, they always
        return the same output and don't secretly change anything outside themselves. Pure functions
        are trivial to test, reuse, and reason about. React leans hard on this idea — a component is
        ideally a pure function of its inputs that returns what to display. Every time you write a
        function, ask: "could this just be inputs → output, with no surprises?"</p>`,
      })}

      ${h.exercise({
        title: "Refactor your dashboard into functions",
        prompt: `<p>Pull your greeting logic into a function <code>getGreeting(name, hour)</code> that
        <em>returns</em> the greeting string (doesn't log it). Write a second function
        <code>pluralize(count, word)</code> that returns e.g. <code>"3 tasks"</code> or
        <code>"1 task"</code>. Call them where you build the page. Notice how naming the logic makes
        <code>main.js</code> read like a summary of what your app does.</p>`,
        runHint: "pnpm js",
      })}
    </section>
  `,
});
