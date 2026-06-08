/* Lesson 20-typescript/0600 — Narrowing & type guards. */
registerLesson({
  meta: {
    id: "20-typescript/0600-narrowing-and-guards",
    title: "Narrowing & Type Guards",
    part: "20-typescript",
    estMinutes: 15,
    level: "intermediate",
    project: "js-foundations",
    lede: "Narrowing is how TypeScript follows your runtime checks to know a value's exact type at each point. It's the everyday flow of working with unions — and it feels like the compiler reading your mind.",
    objectives: [
      "Narrow unions with typeof, instanceof, and in",
      "Use truthiness and equality checks to narrow",
      "Write custom type-guard functions",
      "Guarantee all cases are handled",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The compiler follows your checks</h2>
      <p>
        When you check a value at runtime, TypeScript <strong>narrows</strong> its type inside that
        branch. After <code>if (typeof x === "string")</code>, TS knows <code>x</code> is a string
        there — and lets you use string methods safely.
      </p>

      ${h.codePane({
        lang: "ts",
        title: "typeof narrowing",
        readOnly: true,
        code: `function format(value: string | number): string {
  if (typeof value === "number") {
    return value.toFixed(2); // value: number here
  }
  return value.trim();       // value: string here
}`,
      })}

      <h2>Truthiness and equality narrowing</h2>
      ${h.codePane({
        lang: "ts",
        title: "Narrowing away null",
        readOnly: true,
        code: `function greet(name: string | null) {
  if (!name) {
    return "Hello, guest";   // name is null here
  }
  return \`Hello, \${name.toUpperCase()}\`; // name: string — safe!
}

// Equality narrowing with literal unions:
type Dir = "up" | "down";
function move(dir: Dir) {
  if (dir === "up") { /* dir is "up" */ }
  else { /* dir is "down" */ }
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Narrowing replaces defensive guessing",
        body: `<p>In plain JavaScript you scatter <code>if (x)</code> checks hoping you covered the cases.
        In TypeScript, the compiler <em>tracks</em> exactly what's possible at each line and won't let you
        use a value unsafely. Your runtime checks and your type checks become one and the same — this is
        the deep payoff of the type system, and it makes refactoring fearless.</p>`,
      })}

      <h2>The <code>in</code> operator and <code>instanceof</code></h2>
      ${h.codePane({
        lang: "ts",
        title: "Narrowing objects",
        readOnly: true,
        code: `type Dog = { bark: () => void };
type Cat = { meow: () => void };

function speak(pet: Dog | Cat) {
  if ("bark" in pet) {
    pet.bark(); // pet: Dog
  } else {
    pet.meow(); // pet: Cat
  }
}

// instanceof narrows class instances and built-ins:
function handle(err: unknown) {
  if (err instanceof Error) {
    console.log(err.message); // err: Error — .message is safe
  }
}`,
      })}

      <h2>Custom type guards</h2>
      <p>For your own complex checks, write a function returning <code>arg is Type</code> — a
      <strong>type predicate</strong> — and TypeScript trusts it for narrowing:</p>

      ${h.codePane({
        lang: "ts",
        title: "Type predicates",
        readOnly: true,
        code: `type User = { name: string; email: string };

function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "name" in value &&
    "email" in value
  );
}

function process(data: unknown) {
  if (isUser(data)) {
    console.log(data.email); // data: User — fully safe
  }
}`,
      })}

      ${h.callout({
        kind: "gotcha",
        body: `<p>A type guard is a promise <em>you</em> make to the compiler — it trusts your
        <code>value is User</code> claim without verifying the logic. So make the runtime check actually
        match the type, or you've just reintroduced the unsafety you were avoiding. (For validating
        external data robustly, Zod in Part 70 generates guards <em>and</em> the runtime checks together.)</p>`,
      })}

      ${h.exercise({
        title: "Safe quote handling",
        prompt: `<p>Your quote widget holds <code>quote: string | null</code>. Write a render function
        that narrows: if <code>quote</code> is null show "Loading…", otherwise show it (TypeScript should
        let you call string methods only in the second branch). Then write an <code>isTask(value:
        unknown): value is Task</code> guard and use it to safely process data loaded from
        <code>localStorage</code> (which is really <code>unknown</code> until validated).</p>`,
        runHint: "pnpm --filter js-foundations typecheck",
      })}
    </section>
  `,
});
