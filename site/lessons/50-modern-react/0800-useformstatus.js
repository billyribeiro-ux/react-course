/* Lesson 50-modern-react/0800 — useFormStatus. */
registerLesson({
  meta: {
    id: "50-modern-react/0800-useformstatus",
    title: "useFormStatus",
    part: "50-modern-react",
    estMinutes: 10,
    level: "advanced",
    project: "vite-hooks-lab",
    lede: "useFormStatus lets a child component read its parent form's submission status without prop-drilling — perfect for reusable submit buttons that know when they're pending.",
    objectives: [
      "Read pending status from a parent form",
      "Build a reusable SubmitButton component",
      "Understand the component-placement requirement",
      "Compose form UI cleanly",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The use case: a smart submit button</h2>
      <p>
        You want a reusable <code>&lt;SubmitButton&gt;</code> that disables itself and shows "Submitting…"
        while the form is pending — without threading an <code>isPending</code> prop through. <code>useFormStatus</code>
        reads the status of the nearest parent <code>&lt;form&gt;</code> directly.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "A reusable SubmitButton",
        readOnly: true,
        code: `import { useFormStatus } from "react-dom";

function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus(); // status of the enclosing <form>
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Submitting…" : children}
    </button>
  );
}

// Drop it into ANY form — it just works, no props needed:
function AddTaskForm({ action }: { action: (fd: FormData) => Promise<void> }) {
  return (
    <form action={action}>
      <input name="title" />
      <SubmitButton>Add task</SubmitButton>
    </form>
  );
}`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "It must be INSIDE the form",
        body: `<p><code>useFormStatus</code> reads the <em>parent</em> form's status, so the component calling
        it must be rendered <strong>inside</strong> a <code>&lt;form&gt;</code> — not in the same component
        that renders the form. That's why <code>SubmitButton</code> is its own component placed within the
        form's JSX. If you call <code>useFormStatus</code> in the component that owns the <code>&lt;form&gt;</code>
        itself, it won't see the submission. Also note it's imported from <code>react-dom</code>, not
        <code>react</code>.</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Composition without coupling",
        body: `<p><code>useFormStatus</code> is a small but elegant example of React's composition philosophy: a
        child reads context from its position in the tree (the enclosing form) rather than receiving explicit
        props. This lets you build a design-system <code>SubmitButton</code> once and reuse it across every form
        in the app, each automatically reflecting its own form's pending state. Reusable, decoupled UI pieces
        like this are what make a component library feel cohesive — a theme we develop fully in Part 60.</p>`,
      })}

      ${h.callout({
        kind: "note",
        body: `<p><code>useFormStatus</code> also exposes the pending <code>data</code> (the <code>FormData</code>
        being submitted), the <code>method</code>, and the <code>action</code> — useful for advanced cases like
        showing which item is being submitted. Most of the time you just need <code>pending</code>.</p>`,
      })}

      ${h.exercise({
        title: "Build a reusable SubmitButton",
        prompt: `<p>Create a <code>SubmitButton</code> component using <code>useFormStatus</code> and use it in
        all the forms across your Kanban app (add task, edit, etc.). Confirm each button independently shows its
        own form's pending state. You've built your first genuinely reusable, context-aware design-system
        component — a preview of the component library you'll build in Part 60.</p>`,
        runHint: "pnpm --filter vite-hooks-lab dev",
      })}
    </section>
  `,
});
