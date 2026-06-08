/* Lesson 50-modern-react/0600 — useActionState. */
registerLesson({
  meta: {
    id: "50-modern-react/0600-useactionstate",
    title: "useActionState",
    part: "50-modern-react",
    estMinutes: 14,
    level: "advanced",
    project: "vite-hooks-lab",
    lede: "useActionState wraps an Action to give you its pending state, its return value (like validation errors), and a wired-up action — the cleanest way to handle form submission results in React 19.",
    objectives: [
      "Track pending state and results with useActionState",
      "Return and display validation errors from an action",
      "Wire the returned action to a form",
      "Build a complete, robust form flow",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>One hook for the whole form lifecycle</h2>
      <p>
        <code>useActionState</code> takes an action function and an initial state. It returns the latest
        <strong>state</strong> (whatever your action returns — e.g. errors or a success message), a wrapped
        <strong>action</strong> to pass to the form, and an <strong>isPending</strong> boolean. One hook
        replaces several pieces of manual state.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "A form with validation errors",
        readOnly: true,
        code: `import { useActionState } from "react";

interface FormState { error?: string; success?: boolean; }

function AddTaskForm({ onAdd }: { onAdd: (title: string) => Promise<void> }) {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    async (_prev, formData) => {
      const title = String(formData.get("title") ?? "").trim();
      if (!title) return { error: "Title is required" };
      if (title.length > 80) return { error: "Title is too long" };
      try {
        await onAdd(title);
        return { success: true };
      } catch {
        return { error: "Could not add task. Try again." };
      }
    },
    {} // initial state
  );

  return (
    <form action={formAction}>
      <input name="title" disabled={isPending} />
      <button type="submit" disabled={isPending}>
        {isPending ? "Adding…" : "Add task"}
      </button>
      {state.error && <p role="alert">{state.error}</p>}
      {state.success && <p>Added! ✅</p>}
    </form>
  );
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Validation and pending state, solved",
        body: `<p>This single hook gives you the three things every real form needs: a place to run logic and
        return errors, an automatic <code>isPending</code> for disabling inputs and showing "Adding…", and a
        form-ready action. No separate <code>error</code>, <code>loading</code>, and <code>success</code>
        states to juggle and keep in sync. The action's <em>return value</em> becomes your form state — a
        clean, unidirectional flow. This is the React 19 answer to a problem every app has, and it's far less
        code than the Part 30 manual approach.</p>`,
      })}

      ${h.callout({
        kind: "note",
        title: "The (prev, formData) signature",
        body: `<p>The action receives the <strong>previous state</strong> as its first argument and the
        <strong>FormData</strong> as its second. The previous state is handy for multi-step or accumulating
        forms; ignore it (<code>_prev</code>) when you don't need it. Whatever you return becomes the new
        state for the next render.</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Pairs perfectly with Zod (Part 70)",
        body: `<p>Right now we validate by hand. In Part 70 you'll validate the <code>FormData</code> with a
        <strong>Zod</strong> schema and return its parsed errors as the form state — one schema validating both
        client and server. And in Next.js (Part 80), this exact pattern runs your validation <em>on the
        server</em> via Server Actions, with the same <code>useActionState</code> on the client. What you're
        learning here scales straight to production full-stack forms.</p>`,
      })}

      ${h.exercise({
        title: "Add robust validation",
        prompt: `<p>Upgrade your Kanban add-task form to use <code>useActionState</code>. Return clear error
        messages for empty and over-long titles, disable the input and button while pending (with an "Adding…"
        label), and show a success confirmation. Throw inside the action occasionally to confirm the error path
        works. You now have a production-quality form flow.</p>`,
        runHint: "pnpm --filter vite-hooks-lab dev",
      })}
    </section>
  `,
});
