/* Lesson 50-modern-react/0700 — useOptimistic. */
registerLesson({
  meta: {
    id: "50-modern-react/0700-useoptimistic",
    title: "useOptimistic",
    part: "50-modern-react",
    estMinutes: 14,
    level: "advanced",
    project: "vite-hooks-lab",
    lede: "Optimistic UI shows the result of an action instantly — before the server confirms — then reconciles. useOptimistic makes this pattern trivial, and it's what makes great apps feel instant.",
    objectives: [
      "Show an optimistic state during an async action",
      "Let React auto-revert if the action fails",
      "Combine useOptimistic with Actions",
      "Understand when optimistic UI is appropriate",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Why optimistic UI?</h2>
      <p>
        When a user adds a task, waiting for a server round-trip before showing it feels sluggish. <strong>
        Optimistic UI</strong> shows the change immediately — assuming success — then quietly confirms (or
        reverts on failure). It's the difference between an app that feels instant and one that feels laggy.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "useOptimistic with an action",
        readOnly: true,
        code: `import { useOptimistic } from "react";

function TaskList({ tasks, addTask }: {
  tasks: Task[];
  addTask: (title: string) => Promise<void>;
}) {
  // optimisticTasks = real tasks + any pending optimistic ones
  const [optimisticTasks, addOptimistic] = useOptimistic(
    tasks,
    (current, newTitle: string) => [
      ...current,
      { id: "temp", title: newTitle, pending: true }, // temporary placeholder
    ]
  );

  async function action(formData: FormData) {
    const title = String(formData.get("title"));
    addOptimistic(title);      // show it INSTANTLY
    await addTask(title);      // then do the real (slow) mutation
    // when tasks updates for real, the optimistic entry is replaced.
    // If addTask throws, React discards the optimistic state automatically.
  }

  return (
    <>
      <form action={action}>
        <input name="title" />
        <button>Add</button>
      </form>
      <ul>
        {optimisticTasks.map((t) => (
          <li key={t.id} style={{ opacity: t.pending ? 0.5 : 1 }}>
            {t.title}{t.pending && " (saving…)"}
          </li>
        ))}
      </ul>
    </>
  );
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Auto-revert is the magic",
        body: `<p>The key feature: if the real action fails or completes, React automatically <strong>discards
        the optimistic state</strong> and shows the true state. You don't manually roll back — you describe the
        optimistic version, run the real mutation, and React reconciles. This removes the historically painful
        part of optimistic UI (correctly undoing on failure). The result is apps that feel instant <em>and</em>
        stay correct — a combination that used to require a lot of careful code.</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Mark optimistic items visually",
        body: `<p>Give pending optimistic items a visual cue (reduced opacity, a "saving…" tag) and a temporary
        id. This sets honest expectations and avoids key collisions when the real item arrives. Don't let an
        optimistic item look identical to a confirmed one — users (and your keys) need to tell them apart.</p>`,
      })}

      <h2>When to use it</h2>
      ${h.callout({
        kind: "principal",
        body: `<p>Optimistic UI fits actions that <em>almost always succeed</em> and where instant feedback
        matters: likes, adding items, toggling, sending messages. It's less appropriate for high-stakes
        operations (payments, irreversible deletes) where you want explicit confirmation. Choosing where to be
        optimistic is a UX judgment — instant feedback vs. certainty. Match the pattern to the stakes.</p>`,
      })}

      ${h.exercise({
        title: "Make adding tasks feel instant",
        prompt: `<p>Add <code>useOptimistic</code> to your Kanban board so new tasks appear immediately (dimmed,
        with a "saving…" indicator) while the simulated async save runs, then settle into their normal state.
        Make the fake save reject ~20% of the time and confirm the optimistic task disappears cleanly on
        failure (and show an error). Your board now feels like a top-tier app.</p>`,
        runHint: "pnpm --filter vite-hooks-lab dev",
      })}
    </section>
  `,
});
