/* Lesson 20-typescript/0400 — Functions: params, returns, overloads. */
registerLesson({
  meta: {
    id: "20-typescript/0400-functions",
    title: "Typing Functions",
    part: "20-typescript",
    estMinutes: 16,
    level: "beginner",
    project: "js-foundations",
    lede: "Functions are where types earn their keep — they document exactly what goes in and what comes out. This is the single most valuable place to add annotations.",
    objectives: [
      "Type parameters and return values",
      "Handle optional and default parameters",
      "Type function values and callbacks",
      "Understand void and never return types",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Parameters and return types</h2>
      ${h.codePane({
        lang: "ts",
        title: "Typed functions",
        readOnly: true,
        code: `function add(a: number, b: number): number {
  return a + b;
}

// Arrow function form:
const multiply = (a: number, b: number): number => a * b;

add(2, 3);        // ✅ 5
add(2, "3");      // ❌ string not assignable to number
const x: string = add(2, 3); // ❌ number not assignable to string`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Type the inputs; let returns infer (mostly)",
        body: `<p>Always type parameters — TypeScript can't guess what callers will pass. Return types are
        often safely inferred, but <strong>annotating the return type of important functions</strong> is
        a pro move: it makes the function's contract explicit and catches mistakes <em>inside</em> the
        function (if your code accidentally returns the wrong thing, you find out here, not at the call
        site).</p>`,
      })}

      <h2>Optional & default parameters</h2>
      ${h.codePane({
        lang: "ts",
        title: "Optional and default",
        readOnly: true,
        code: `// Optional parameter with ?
function greet(name: string, title?: string): string {
  return title ? \`\${title} \${name}\` : name;
}
greet("Ada");          // ✅ "Ada"
greet("Ada", "Dr.");   // ✅ "Dr. Ada"

// Default parameter (type inferred from the default)
function createUser(name: string, role = "member") {
  return { name, role }; // role: string
}`,
      })}

      <h2>Typing function values & callbacks</h2>
      <p>Functions are values, so they have types too. This matters when passing callbacks (like to
      <code>map</code> or event handlers):</p>

      ${h.codePane({
        lang: "ts",
        title: "Function types",
        readOnly: true,
        code: `// A variable holding a function:
let formatter: (value: number) => string;
formatter = (n) => n.toFixed(2); // n is inferred as number!

// A function that takes a callback:
function repeat(times: number, action: (i: number) => void): void {
  for (let i = 0; i < times; i++) action(i);
}
repeat(3, (i) => console.log(i)); // i inferred as number`,
      })}

      ${h.callout({
        kind: "tip",
        title: "Inference flows into callbacks",
        body: `<p>Notice you didn't annotate <code>n</code> or <code>i</code> in the callbacks — TypeScript
        infers them from the function type they're passed to. This "contextual typing" is why typing your
        APIs well makes everything downstream type itself. You'll feel this constantly in React event
        handlers: <code>onChange={(e) =&gt; ...}</code> already knows <code>e</code>'s type.</p>`,
      })}

      <h2><code>void</code> and <code>never</code></h2>
      ${h.codePane({
        lang: "ts",
        title: "Special return types",
        readOnly: true,
        code: `// void — returns nothing useful (does its work via side effects)
function logMessage(msg: string): void {
  console.log(msg);
}

// never — never returns at all (always throws or loops forever)
function fail(message: string): never {
  throw new Error(message);
}`,
      })}

      ${h.callout({
        kind: "note",
        body: `<p><code>void</code> means "ignore the return value" — most event handlers and loggers are
        <code>void</code>. <code>never</code> is rarer: a function that always throws or never finishes.
        <code>never</code> also powers exhaustiveness checking in discriminated unions (Lesson 11), a
        genuinely elegant safety pattern.</p>`,
      })}

      ${h.exercise({
        title: "Type your dashboard's functions",
        prompt: `<p>Add full types to the helpers you wrote in Part 10: <code>getGreeting(name: string,
        hour: number): string</code>, <code>pluralize(count: number, word: string): string</code>, and
        <code>addTask(text: string): Task</code>. Try calling one with a wrong argument type and confirm
        the error. Notice how the signatures now <em>document</em> each function at a glance.</p>`,
        runHint: "pnpm --filter js-foundations typecheck",
      })}
    </section>
  `,
});
