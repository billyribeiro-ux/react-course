/* Lesson 50-modern-react/1500 — Project: optimistic, suspense-driven UI. */
registerLesson({
  meta: {
    id: "50-modern-react/1500-project-optimistic-ui",
    title: "Project: An Optimistic, Suspense-Driven Board",
    part: "50-modern-react",
    estMinutes: 50,
    level: "advanced",
    project: "vite-hooks-lab",
    lede: "Upgrade your Kanban board to feel truly modern: Suspense + error boundaries for data, Actions + useActionState for forms, useOptimistic for instant feedback, Activity for tabs, and the compiler keeping it fast.",
    objectives: [
      "Integrate every React 19.2 feature into one app",
      "Replace manual loading/error code with boundaries",
      "Make mutations feel instant with optimistic UI",
      "Ship clean code that the compiler optimizes",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The goal</h2>
      <p>
        Take your Part 40 Kanban board and bring it to the 2026 state of the art. Same features, dramatically
        better feel and cleaner code — because the React 19.2 toolkit handles what used to be tedious.
      </p>

      ${h.callout({
        kind: "principal",
        title: "The upgrade checklist",
        body: `<p>You'll touch every Part 50 concept: <strong>Suspense + ErrorBoundary</strong> around data loads
        (delete the manual loading/error flags), <strong>Actions + useActionState</strong> for the add/edit
        forms (with validation), <strong>useOptimistic</strong> so cards appear instantly on add and move,
        <strong>useFormStatus</strong> for reusable submit buttons, <strong>&lt;Activity&gt;</strong> for
        state-preserving Board/Stats tabs, <strong>ViewTransition</strong> for smooth card moves, and the
        <strong>React Compiler</strong> (already enabled) keeping it all fast with no manual memoization.</p>`,
      })}

      <h2>Putting it together</h2>
      ${h.codePane({
        lang: "tsx",
        title: "The modern board shell",
        readOnly: true,
        code: `import { Suspense, Activity, ViewTransition, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function App() {
  const [tab, setTab] = useState<"board" | "stats">("board");

  return (
    <main className="app">
      <header>
        <h1>🗂️ Kanban</h1>
        <nav>
          <button onClick={() => setTab("board")}>Board</button>
          <button onClick={() => setTab("stats")}>Stats</button>
        </nav>
      </header>

      <ErrorBoundary fallback={<p role="alert">Something broke. Reload.</p>}>
        <Suspense fallback={<BoardSkeleton />}>
          <Activity mode={tab === "board" ? "visible" : "hidden"}>
            <ViewTransition>
              <Board />
            </ViewTransition>
          </Activity>
          <Activity mode={tab === "stats" ? "visible" : "hidden"}>
            <Stats />
          </Activity>
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}`,
      })}

      ${h.codePane({
        lang: "tsx",
        title: "An optimistic, action-driven add form",
        readOnly: true,
        code: `function AddCard({ column, addTask }: AddCardProps) {
  const [optimistic, addOptimistic] = useOptimistic<Task[], string>(
    /* current tasks */ tasksForColumn,
    (cur, title) => [...cur, { id: "temp", title, column, pending: true }]
  );

  const [state, formAction, isPending] = useActionState(
    async (_prev: FormState, fd: FormData) => {
      const title = String(fd.get("title") ?? "").trim();
      if (!title) return { error: "Required" };
      addOptimistic(title);          // instant feedback
      try { await addTask(column, title); return { ok: true }; }
      catch { return { error: "Failed to add" }; }
    },
    {}
  );

  return (
    <form action={formAction}>
      <input name="title" disabled={isPending} />
      <SubmitButton>Add</SubmitButton>
      {state.error && <p role="alert">{state.error}</p>}
      {/* render 'optimistic' so the new card shows immediately, dimmed */}
    </form>
  );
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Notice how much code disappeared",
        body: `<p>Compare this to what the same features would have taken in 2022: manual <code>isLoading</code>/
        <code>error</code> state in every component, hand-written optimistic rollback logic, prop-drilled
        pending flags, manual memoization everywhere. React 19.2 replaced all of it with declarative primitives.
        <strong>Writing less code that does more, more reliably</strong>, is the throughline of modern React —
        and recognizing that progression is part of thinking at a principal level about which tools and
        patterns to invest in.</p>`,
      })}

      ${h.exercise({
        title: "Ship the modern board",
        prompt: `<p>Implement the full upgrade in <code>vite-hooks-lab</code>: data via Suspense + ErrorBoundary,
        forms via Actions + useActionState + a useFormStatus SubmitButton, instant feel via useOptimistic,
        state-preserving tabs via Activity, and smooth moves via ViewTransition. Remove any now-redundant manual
        memoization (the compiler's got it). Ensure <code>pnpm lint</code>, <code>pnpm typecheck</code>, and
        <code>pnpm build</code> pass, then commit.</p>`,
        runHint: "pnpm --filter vite-hooks-lab build && pnpm --filter vite-hooks-lab lint",
      })}

      ${h.callout({
        kind: "principal",
        title: "You now know modern React — all of it",
        body: `<p>Parts 30–50 took you from "what is a component?" to wielding the complete React 19.2 feature
        set the way a senior engineer does in 2026. You understand the fundamentals, every hook, and the
        cutting-edge data/forms/concurrency model — and <em>why</em> each exists. From here, the course shifts
        to the ecosystem that surrounds React in real products: styling & design systems (Part 60), routing &
        data (Part 70), full-stack with Next.js (Part 80), and mobile (Part 90). The React core is yours. 🎉</p>`,
      })}
    </section>
  `,
});
