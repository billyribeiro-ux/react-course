/* Lesson 40-hooks/0500 — When NOT to use Effects. */
registerLesson({
  meta: {
    id: "40-hooks/0500-when-not-to-use-effects",
    title: "You Might Not Need an Effect",
    part: "40-hooks",
    estMinutes: 17,
    level: "advanced",
    project: "vite-hooks-lab",
    lede: "The most senior thing you can learn about Effects is when to delete them. A huge share of Effects in real codebases are unnecessary and cause bugs. Here are the patterns to remove.",
    objectives: [
      "Recognize Effects that should be deleted",
      "Replace 'derived state' Effects with render calculations",
      "Handle user events in handlers, not Effects",
      "Know the few cases Effects are actually for",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Effects are an escape hatch, not a default</h2>
      <p>
        Effects exist to synchronize with <em>external</em> systems. Using them for ordinary data flow —
        transforming data, responding to clicks, updating state from other state — is an anti-pattern that
        causes extra renders, flicker, and bugs. The React team literally published a guide titled "You
        Might Not Need an Effect." Let's internalize it.
      </p>

      <h2>Anti-pattern 1: deriving state in an Effect</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Don't sync derived state",
        readOnly: true,
        code: `// ❌ Effect that mirrors derived data into state — redundant, laggy
const [tasks, setTasks] = useState<Task[]>([]);
const [doneCount, setDoneCount] = useState(0);
useEffect(() => {
  setDoneCount(tasks.filter((t) => t.done).length);
}, [tasks]); // extra render, can flicker, easy to desync

// ✅ Just calculate it during render
const doneCount = tasks.filter((t) => t.done).length;`,
      })}

      <h2>Anti-pattern 2: handling events in an Effect</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Put event logic in the handler",
        readOnly: true,
        code: `// ❌ Reacting to a state change in an Effect to do an event's job
useEffect(() => {
  if (submitted) {
    showToast("Saved!");
    setSubmitted(false);
  }
}, [submitted]);

// ✅ Do it directly where the event happens
function handleSubmit() {
  saveTask();
  showToast("Saved!"); // no Effect, no extra state, no round-trip
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "The litmus test",
        body: `<p>Ask: "Is this caused by a <strong>specific user interaction</strong>, or by the component
        simply being <strong>displayed</strong>?" Interaction-caused logic belongs in the <strong>event
        handler</strong>. Display-caused synchronization with an external system belongs in an
        <strong>Effect</strong>. Most "Effects" beginners write are actually event logic in disguise — move
        them into handlers and the code gets simpler and faster. This single question resolves the majority
        of Effect misuse.</p>`,
      })}

      <h2>Anti-pattern 3: chains of Effects</h2>
      ${h.callout({
        kind: "gotcha",
        title: "Effects that trigger Effects",
        body: `<p>If you have Effect A that sets state, which triggers Effect B that sets more state, which
        triggers Effect C… you've built a fragile cascade with multiple re-renders and hard-to-trace flow.
        Collapse the logic: compute everything you can during render, and do the rest in the one event
        handler that started it all. Effect chains are a strong smell.</p>`,
      })}

      <h2>What Effects ARE for</h2>
      <ul>
        <li>Connecting to a non-React system: WebSocket, browser API, third-party widget, <code>localStorage</code> sync.</li>
        <li>Subscribing to an external store (or use <code>useSyncExternalStore</code>, Lesson 12).</li>
        <li>Starting/stopping timers and intervals.</li>
        <li>Imperatively controlling the DOM in ways React doesn't (focus, scroll, measuring).</li>
      </ul>

      ${h.callout({
        kind: "principal",
        title: "A principal-level instinct",
        body: `<p>When you find yourself reaching for <code>useEffect</code>, pause and ask "do I actually
        need this?" Often the answer is no, and removing it makes the code simpler and more correct.
        Experienced React engineers write <em>fewer</em> Effects than beginners, not more. Fewer Effects =
        fewer renders, fewer race conditions, fewer bugs. This restraint is a hallmark of mastery.</p>`,
      })}

      ${h.exercise({
        title: "Delete unnecessary Effects",
        prompt: `<p>Audit your Kanban app. Find any place where you store derived data in state via an Effect
        (counts, filtered lists, formatted strings) and replace it with a render-time calculation. Find any
        Effect that reacts to a state flag to perform what is really event logic, and move it into the
        handler. Confirm the app behaves identically with fewer Effects — and feels snappier.</p>`,
        runHint: "pnpm --filter vite-hooks-lab dev",
      })}
    </section>
  `,
});
