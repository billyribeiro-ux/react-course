/* Lesson 20-typescript/0500 — Union & intersection types. */
registerLesson({
  meta: {
    id: "20-typescript/0500-unions-and-intersections",
    title: "Union & Intersection Types",
    part: "20-typescript",
    estMinutes: 15,
    level: "intermediate",
    project: "js-foundations",
    lede: "Model 'this OR that' with unions and 'this AND that' with intersections. Unions especially are how you describe the real, messy possibilities your data can take.",
    objectives: [
      "Combine types with | (union) and & (intersection)",
      "Model values that can be one of several types",
      "Compose object types with intersections",
      "Prepare for narrowing in the next lesson",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Union types: one of several</h2>
      <p>A <strong>union</strong> (<code>|</code>) says a value can be any of the listed types:</p>

      ${h.codePane({
        lang: "ts",
        title: "Unions",
        readOnly: true,
        code: `let id: number | string;
id = 42;       // ✅
id = "abc-42"; // ✅
id = true;     // ❌ boolean not allowed

// Very common: a value that might not be there yet
let user: User | null = null;
// later... user = { name: "Ada" };

// Literal unions (from Lesson 2) are just unions of exact values:
type Status = "idle" | "loading" | "success" | "error";`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Unions model reality",
        body: `<p>Real values are often "a string or null", "loading or loaded", "a success result or an
        error". Unions let you describe these honestly instead of pretending values are always present.
        This forces you to handle every case — which is precisely how typed code prevents the
        <code>undefined is not a function</code> family of crashes.</p>`,
      })}

      <h2>You must handle every member</h2>
      <p>With a union, you can only safely use what's common to <em>all</em> members until you narrow it:</p>

      ${h.codePane({
        lang: "ts",
        title: "The catch (and the point)",
        readOnly: true,
        code: `function printId(id: number | string) {
  // id.toUpperCase()  ❌ — numbers don't have toUpperCase
  // You must first check which type it is (narrowing, next lesson):
  if (typeof id === "string") {
    console.log(id.toUpperCase()); // ✅ here TS knows id is string
  } else {
    console.log(id.toFixed(0));    // ✅ here TS knows id is number
  }
}`,
      })}

      <h2>Intersection types: combine shapes</h2>
      <p>An <strong>intersection</strong> (<code>&</code>) merges multiple object types into one that has
      <em>all</em> their properties:</p>

      ${h.codePane({
        lang: "ts",
        title: "Intersections",
        readOnly: true,
        code: `type HasId = { id: number };
type HasTimestamps = { createdAt: string; updatedAt: string };

type Entity = HasId & HasTimestamps;
// Entity must have id, createdAt, AND updatedAt

const record: Entity = {
  id: 1,
  createdAt: "2026-01-01",
  updatedAt: "2026-06-08",
};

type User = Entity & { name: string; email: string };
// Compose bigger types from small reusable pieces`,
      })}

      ${h.callout({
        kind: "tip",
        title: "Compose small types",
        body: `<p>Intersections let you build complex types from small, reusable building blocks —
        <code>HasId</code>, <code>HasTimestamps</code>, <code>SoftDeletable</code> — and combine them as
        needed. This mirrors good software design generally: small pieces, composed. (In React, you'll
        intersect your own props with a library's props this way.)</p>`,
      })}

      <h2>Union vs intersection, intuitively</h2>
      ${h.callout({
        kind: "gotcha",
        body: `<p>It feels backwards at first: <strong>union (<code>|</code>) is more permissive about
        values but more restrictive about usage</strong> (the value could be either type, so you can only
        do what works for both). <strong>Intersection (<code>&</code>) is more demanding about values</strong>
        (must satisfy all types) <strong>but gives you all their properties</strong>. "Or" widens the
        possibilities; "and" combines the requirements.</p>`,
      })}

      ${h.exercise({
        title: "Model loading state",
        prompt: `<p>Define <code>type FetchState = "idle" | "loading" | "success" | "error"</code> and a
        <code>quote: string | null</code> for your dashboard's quote widget. Write a function that takes
        the state and returns a message for each case. Then make an <code>Entity</code> intersection and
        give your <code>Task</code> type timestamps by intersecting it with a <code>HasTimestamps</code>
        type. You're now modeling realistic, evolving data.</p>`,
        runHint: "pnpm --filter js-foundations typecheck",
      })}
    </section>
  `,
});
