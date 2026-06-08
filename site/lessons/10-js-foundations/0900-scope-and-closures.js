/* Lesson 10-js-foundations/0900 — Scope, hoisting, closures. */
registerLesson({
  meta: {
    id: "10-js-foundations/0900-scope-and-closures",
    title: "Scope & Closures",
    part: "10-js-foundations",
    estMinutes: 18,
    level: "intermediate",
    project: "js-foundations",
    lede: "Where a variable 'lives' and what can see it is called scope. Closures — functions remembering the variables around them — sound advanced but underpin how React hooks work. Let's demystify both.",
    objectives: [
      "Explain block, function, and global scope",
      "Understand how inner code can see outer variables",
      "Define a closure and recognize one",
      "See why closures matter for React",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Scope: who can see what</h2>
      <p>
        <strong>Scope</strong> is the region of code where a variable is accessible. A variable
        declared with <code>let</code>/<code>const</code> inside a <code>{ }</code> block only exists
        inside that block. Inner scopes can see outward; outer scopes can't see in.
      </p>

      ${h.codePane({
        lang: "js",
        title: "Block scope",
        editable: true,
        code: `const outer = "I'm visible everywhere below me";

if (true) {
  const inner = "I only exist inside this block";
  console.log(outer); // ✅ inner code can see outer
  console.log(inner); // ✅
}

console.log(inner); // ❌ ReferenceError — inner is gone out here`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Smaller scope = fewer bugs",
        body: `<p>Declare variables in the <strong>narrowest scope</strong> that works. The less code
        that can touch a variable, the less can break it, and the easier your program is to reason
        about. This is the same "minimize moving parts" instinct behind preferring <code>const</code> —
        a recurring theme in well-built software.</p>`,
      })}

      <h2>The scope chain</h2>
      <p>When code uses a name, JavaScript looks in the current scope, then the scope around it, then
      outward, until it finds the variable or runs out (a <code>ReferenceError</code>):</p>

      ${h.codePane({
        lang: "js",
        title: "Looking outward",
        editable: true,
        code: `const appName = "Dashboard";

function showHeader() {
  const prefix = "Welcome to";
  function render() {
    // render can see prefix (its parent) AND appName (global)
    console.log(\`\${prefix} \${appName}\`);
  }
  render();
}

showHeader(); // "Welcome to Dashboard"`,
      })}

      <h2>Closures: functions that remember</h2>
      <p>
        A <strong>closure</strong> happens when a function keeps access to variables from where it was
        <em>created</em>, even after that outer function has finished. The inner function "closes over"
        those variables. This is the engine behind a lot of React.
      </p>

      ${h.codePane({
        lang: "js",
        title: "A counter via closure",
        editable: true,
        code: `function makeCounter() {
  let count = 0;            // private to this counter

  return function () {
    count++;                // remembers & updates 'count'
    return count;
  };
}

const next = makeCounter();
console.log(next()); // 1
console.log(next()); // 2
console.log(next()); // 3  — 'count' survived between calls!

const other = makeCounter();
console.log(other()); // 1  — a separate, independent count`,
      })}

      ${h.callout({
        kind: "note",
        body: `<p>Each call to <code>makeCounter()</code> creates a fresh, private <code>count</code>
        that only its returned function can touch. That's encapsulation — data hidden behind a
        function — achieved purely with closures.</p>`,
      })}

      <h2>Why this matters for React</h2>
      ${h.callout({
        kind: "principal",
        title: "useState is closures in disguise",
        body: `<p>When you later write <code>const [count, setCount] = useState(0)</code> in a React
        component, you're relying on closures: your event handlers "remember" the state and setter from
        the render they were created in. Understanding closures now turns React's most confusing
        moments ("why is my value stale?") into something you can actually reason about. This lesson
        pays off big later.</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        body: `<p>Closures capture the <em>variable</em>, not a snapshot of its value at creation time —
        so a closure created in a loop can surprise you if it shares one variable. Using
        <code>let</code>/<code>const</code> (block-scoped) inside loops mostly avoids the classic bug
        that plagued the old <code>var</code>.</p>`,
      })}

      ${h.exercise({
        title: "Build a private tally",
        prompt: `<p>Write a <code>makeTaskTracker()</code> function that holds a private
        <code>tasks</code> array and returns an object with two methods: <code>add(task)</code> and
        <code>count()</code>. Create a tracker, add a few tasks, and log the count. The array should be
        <em>impossible</em> to reach except through your two methods — that's a closure protecting your
        data, a pattern you'll see in real libraries.</p>`,
        runHint: "pnpm js",
      })}
    </section>
  `,
});
