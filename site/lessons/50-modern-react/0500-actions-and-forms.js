/* Lesson 50-modern-react/0500 — Actions & form actions. */
registerLesson({
  meta: {
    id: "50-modern-react/0500-actions-and-forms",
    title: "Actions & Form Actions",
    part: "50-modern-react",
    estMinutes: 16,
    level: "advanced",
    project: "vite-hooks-lab",
    lede: "Actions are React 19's built-in way to handle data mutations — especially form submissions — including pending states and errors, with far less boilerplate. They're the foundation for the modern form hooks.",
    objectives: [
      "Pass a function to a form's action prop",
      "Read form data and perform async work",
      "Understand how Actions manage pending state",
      "See the path to Server Actions (Part 80)",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>What is an Action?</h2>
      <p>
        An <strong>Action</strong> is a function (often async) that you pass to a form's <code>action</code>
        prop (or trigger from a transition) to perform a mutation — adding a task, saving a profile. React
        wires up pending state, error handling, and form reset around it, replacing a pile of manual
        <code>useState</code> flags.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "A form action",
        readOnly: true,
        code: `function AddTaskForm({ onAdd }: { onAdd: (title: string) => Promise<void> }) {
  async function addAction(formData: FormData) {
    const title = formData.get("title") as string;
    if (!title.trim()) return;
    await onAdd(title);   // async mutation — React tracks it as pending
    // form is automatically reset on success
  }

  return (
    <form action={addAction}>
      <input name="title" placeholder="New task" />
      <button type="submit">Add</button>
    </form>
  );
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Forms get their power back",
        body: `<p>For years, React forms meant controlled inputs, manual <code>onSubmit</code>,
        <code>preventDefault</code>, and hand-rolled pending/error state. Actions bring back the simplicity of
        HTML forms while keeping React's power: pass a function to <code>action</code>, read the
        <code>FormData</code>, do async work. React handles the submission lifecycle. Combined with the hooks
        in the next three lessons (<code>useActionState</code>, <code>useOptimistic</code>,
        <code>useFormStatus</code>), this is a dramatically cleaner forms story — and it's the <em>same model</em>
        that powers Server Actions in Next.js (Part 80).</p>`,
      })}

      <h2>FormData: reading inputs without controlling them</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Uncontrolled, but easy",
        readOnly: true,
        code: `async function action(formData: FormData) {
  const title = formData.get("title");      // by the input's name attribute
  const priority = formData.get("priority");
  const urgent = formData.get("urgent") === "on"; // checkbox
  // ...use the values...
}
// No useState per field! The form is uncontrolled; you read values on submit.
// Great for simple forms; controlled inputs (Part 30) still win when you need
// live validation or to react to every keystroke.`,
      })}

      ${h.callout({
        kind: "note",
        title: "Actions run in a transition",
        body: `<p>Actions are processed as <strong>transitions</strong> (Part 40) under the hood, which is how
        React knows a submission is "pending" and keeps the UI responsive. That's also why the companion hooks
        (<code>useFormStatus</code>, <code>useActionState</code>) can report pending state automatically — the
        transition machinery is doing the tracking for you.</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        body: `<p>The <code>action</code> prop on a <code>&lt;form&gt;</code> accepting a <em>function</em> is a
        React feature, distinct from HTML's <code>action="/url"</code> (which navigates). When you pass a
        function, React intercepts the submit and runs your Action client-side (or, in Next.js, can run it on
        the server). Same attribute name, supercharged behavior.</p>`,
      })}

      ${h.exercise({
        title: "Convert a form to an Action",
        prompt: `<p>Rewrite your Kanban "add task" form to use a <code>form action</code> function instead of
        a controlled <code>onSubmit</code>. Read the title from <code>FormData</code>, dispatch the add, and
        let React reset the form. Make the action <code>async</code> (await a fake 500ms delay) so you can feel
        the pending behavior the next lessons will surface. Notice how much state you just deleted.</p>`,
        runHint: "pnpm --filter vite-hooks-lab dev",
      })}
    </section>
  `,
});
