/* Lesson 20-typescript/0200 — Primitive & literal types. */
registerLesson({
  meta: {
    id: "20-typescript/0200-primitive-and-literal-types",
    title: "Primitive & Literal Types",
    part: "20-typescript",
    estMinutes: 15,
    level: "beginner",
    project: "js-foundations",
    lede: "Start with the building blocks: annotating the basic types, letting TypeScript infer them, and the surprisingly powerful idea of literal types that say 'this exact value.'",
    objectives: [
      "Annotate variables with primitive types",
      "Rely on type inference where it's clearer",
      "Use literal types to constrain to specific values",
      "Understand any and why to avoid it",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Basic annotations</h2>
      <p>Add a type with a colon after the name. The primitives mirror Part 10's types:</p>

      ${h.codePane({
        lang: "ts",
        title: "Primitive types",
        readOnly: true,
        code: `let title: string = "Dashboard";
let count: number = 0;
let isActive: boolean = true;
let nothing: null = null;
let missing: undefined = undefined;

count = "five"; // ❌ Error: 'string' is not assignable to 'number'`,
      })}

      <h2>Inference: let TypeScript do the work</h2>
      <p>
        You usually <em>don't</em> need to write the type. TypeScript <strong>infers</strong> it from
        the value. Idiomatic TypeScript annotates function inputs and boundaries, but lets inference
        handle obvious locals:
      </p>

      ${h.codePane({
        lang: "ts",
        title: "Inference",
        readOnly: true,
        code: `let title = "Dashboard"; // inferred as string
let count = 0;           // inferred as number

count = 10;     // ✅
count = "ten";  // ❌ still caught — TS knows count is a number

// Redundant annotation (not wrong, just noisy):
let name: string = "Ada"; // the ': string' adds nothing here`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Annotate boundaries, infer the rest",
        body: `<p>The pro style: explicitly type <strong>function parameters, return types of public
        functions, and data shapes</strong> (your "contracts"), but let inference handle local variables.
        This keeps code clean while documenting the important interfaces. Over-annotating everything is a
        beginner habit that adds noise without adding safety.</p>`,
      })}

      <h2>Literal types: "this exact value"</h2>
      <p>
        A type can be a <em>specific value</em>, not just a category. <code>"dark"</code> is a type that
        only accepts the string <code>"dark"</code>. Combine literals with <code>|</code> (union, next
        lesson) to model "one of these few options":
      </p>

      ${h.codePane({
        lang: "ts",
        title: "Literal & union types",
        readOnly: true,
        code: `type Theme = "light" | "dark";       // only these two strings allowed
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;

let theme: Theme = "dark"; // ✅
theme = "blue";            // ❌ Error: not "light" | "dark"

function setTheme(t: Theme) { /* ... */ }
setTheme("light"); // ✅ — and your editor autocompletes the options!`,
      })}

      ${h.callout({
        kind: "tip",
        body: `<p>Literal unions are one of TypeScript's best features: they turn "magic strings" into a
        documented, autocompleted, typo-proof set of choices. You'll use them constantly for things like
        status (<code>"idle" | "loading" | "success" | "error"</code>), sizes, and variants.</p>`,
      })}

      <h2><code>any</code>: the escape hatch to avoid</h2>
      <p>
        <code>any</code> means "turn off type checking for this." It makes TypeScript behave like plain
        JavaScript — defeating the entire purpose. Avoid it.
      </p>

      ${h.codePane({
        lang: "ts",
        title: "any disables safety",
        readOnly: true,
        code: `let data: any = "hello";
data.toFixed(2);     // no error... but CRASHES at runtime (string!)
data = 42;
data.toUpperCase();  // no error... but CRASHES at runtime (number!)
// 'any' silences TypeScript and lets real bugs through.`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "any is contagious",
        body: `<p>Once a value is <code>any</code>, anything derived from it tends to become
        <code>any</code> too, quietly spreading "no checking" through your code. When you genuinely don't
        know a type, prefer <code>unknown</code> (Lesson 12), which forces you to check before using it.
        Treat every <code>any</code> as a small debt to pay back.</p>`,
      })}

      ${h.exercise({
        title: "Type your dashboard's settings",
        prompt: `<p>In a <code>.ts</code> file, define a <code>Theme</code> literal union and a
        <code>settings</code> object typed with a theme and a numeric <code>fontSize</code>. Try
        assigning an invalid theme and a string font size and watch TypeScript flag both. Then remove
        redundant annotations where inference already covers you.</p>`,
        runHint: "pnpm --filter js-foundations typecheck",
      })}
    </section>
  `,
});
