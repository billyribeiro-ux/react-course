/* Lesson 40-hooks/1000 — useId. */
registerLesson({
  meta: {
    id: "40-hooks/1000-useid",
    title: "useId: Stable Unique IDs",
    part: "40-hooks",
    estMinutes: 10,
    level: "intermediate",
    project: "vite-hooks-lab",
    lede: "A small but important hook for accessibility: generating unique IDs to connect form labels and inputs, that stay stable and don't clash — even with server rendering.",
    objectives: [
      "Generate unique IDs with useId",
      "Connect labels to inputs accessibly",
      "Understand why not to use random or counter IDs",
      "Know when (and when not) to use it",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The problem</h2>
      <p>
        Accessible forms link a <code>&lt;label&gt;</code> to its input via matching
        <code>htmlFor</code>/<code>id</code>. But a reusable component might be rendered many times on a
        page — hardcoding <code>id="email"</code> would create duplicate IDs, which is invalid HTML and
        breaks screen readers. <code>useId</code> generates a unique, stable id per component instance.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "useId for label/input pairs",
        readOnly: true,
        code: `import { useId } from "react";

function LabeledInput({ label }: { label: string }) {
  const id = useId(); // unique & stable for this instance

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} />
    </div>
  );
}

// Render it 5 times → 5 distinct, non-colliding ids. Screen readers
// correctly associate each label with its input.`,
      })}

      <h2>One id, many related fields</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Deriving several ids from one",
        readOnly: true,
        code: `function Field() {
  const id = useId();
  return (
    <>
      <label htmlFor={\`\${id}-name\`}>Name</label>
      <input id={\`\${id}-name\`} aria-describedby={\`\${id}-hint\`} />
      <p id={\`\${id}-hint\`}>Your full name</p>
    </>
  );
}`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "useId is NOT for list keys",
        body: `<p>Don't use <code>useId</code> to generate <code>key</code> props for list items — keys must
        come from your <em>data</em> (a stable id on each item), not from a hook. <code>useId</code> is
        specifically for associating DOM elements (labels, ARIA attributes) within a single component. Using
        it for keys is a category error.</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Why a hook, not Math.random()?",
        body: `<p>A random id would differ between the server-rendered HTML and the client (causing hydration
        mismatches in SSR apps — Part 80), and a global counter would be fragile. <code>useId</code> produces
        ids that are <em>deterministic and matching</em> across server and client. It's a small hook, but it
        reflects a principal-level value: accessibility and SSR-correctness are not optional polish, they're
        part of doing the job right.</p>`,
      })}

      ${h.exercise({
        title: "Make your forms accessible",
        prompt: `<p>Audit the "add task" forms in your Kanban app. Use <code>useId</code> to properly
        associate every <code>&lt;label&gt;</code> with its input via <code>htmlFor</code>/<code>id</code>.
        Add an <code>aria-describedby</code> hint to at least one field. Tab through the form with your
        keyboard and confirm labels are announced — a first taste of the accessibility work we go deep on in
        Part 60.</p>`,
        runHint: "pnpm --filter vite-hooks-lab dev",
      })}
    </section>
  `,
});
