/* Lesson 40-hooks/0200 — useState deeply. */
registerLesson({
  meta: {
    id: "40-hooks/0200-usestate-deeply",
    title: "useState, Deeply",
    part: "40-hooks",
    estMinutes: 16,
    level: "intermediate",
    project: "vite-hooks-lab",
    lede: "You've used useState; now master it. Lazy initialization, the updater form, structuring state well, and the subtle behaviors that separate confident React developers from confused ones.",
    objectives: [
      "Use lazy initialization for expensive initial state",
      "Structure state: when to split vs combine",
      "Apply the updater form correctly",
      "Reset and derive state cleanly",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Lazy initialization</h2>
      <p>
        The argument to <code>useState</code> is only used on the <em>first</em> render, but it's still
        <em>evaluated</em> every render. If computing the initial value is expensive, pass a
        <strong>function</strong> instead — React calls it only once:
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "Lazy initial state",
        readOnly: true,
        code: `// ❌ readFromLocalStorage() runs on EVERY render (wasteful)
const [tasks, setTasks] = useState(readFromLocalStorage());

// ✅ Pass a function — runs ONCE, on mount only
const [tasks, setTasks] = useState(() => readFromLocalStorage());`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Initializer vs updater — both take functions, different jobs",
        body: `<p><code>useState(() =&gt; expensiveInit())</code> computes the <em>initial</em> value lazily.
        <code>setState(prev =&gt; next)</code> computes the <em>next</em> value from the previous. Same
        "pass a function" shape, completely different purposes — don't confuse them.</p>`,
      })}

      <h2>Splitting vs combining state</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Two valid structures",
        readOnly: true,
        code: `// Split — independent values that change separately:
const [name, setName] = useState("");
const [email, setEmail] = useState("");

// Combined — values that change together / belong together:
const [form, setForm] = useState({ name: "", email: "" });
// update one field:
setForm((prev) => ({ ...prev, name: "Ada" }));`,
      })}

      ${h.callout({
        kind: "principal",
        title: "How to decide",
        body: `<p>Use <strong>separate</strong> <code>useState</code>s for values that are independent and
        change at different times — it's simpler and avoids accidental clobbering. Use a <strong>single
        object</strong> when values always update together or represent one cohesive thing (a form, a
        coordinate). Avoid the extremes: a dozen loosely-related <code>useState</code>s is noisy; one giant
        object for everything makes every update a deep spread. When a single object's updates get complex,
        that's the signal to reach for <code>useReducer</code> (Lesson 7). Good state shape is a design
        decision, not an afterthought.</p>`,
      })}

      <h2>The updater form, revisited</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Always-safe updates",
        readOnly: true,
        code: `// When next state depends on previous, use the function form:
setCount((c) => c + 1);
setItems((items) => [...items, newItem]);
setFlags((f) => ({ ...f, dirty: true }));

// This is correct even across async gaps and multiple calls,
// because each updater receives the latest committed value.`,
      })}

      <h2>Resetting state with a key</h2>
      ${h.callout({
        kind: "tip",
        title: "key to reset, not effects",
        body: `<p>To reset a component's state when some identity changes (e.g. switching which task you're
        editing), don't write an effect that clears state — change the component's <code>key</code>:
        <code>&lt;TaskEditor key={taskId} task={task} /&gt;</code>. A new key re-mounts the component with
        fresh state. This is cleaner and less bug-prone than syncing state in effects (you'll see why in
        Lesson 5).</p>`,
      })}

      <h2>Don't put derived values in state</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Derive during render",
        readOnly: true,
        code: `const [tasks, setTasks] = useState<Task[]>([]);

// ❌ redundant state that can drift out of sync:
const [doneCount, setDoneCount] = useState(0);

// ✅ just compute it during render:
const doneCount = tasks.filter((t) => t.done).length;`,
      })}

      ${h.callout({
        kind: "principal",
        body: `<p>This rule from Part 30 is worth repeating because violating it causes endless bugs: if a
        value can be calculated from existing state or props, calculate it during render — don't store it.
        Every extra piece of state is another thing that can get out of sync. The best state is the minimal
        state.</p>`,
      })}

      ${h.exercise({
        title: "Start the Kanban state",
        prompt: `<p>In <code>vite-hooks-lab</code>, model a Kanban board's state: a typed array of task
        objects (id, title, column) loaded lazily from <code>localStorage</code> via the function form of
        <code>useState</code>. Add functions to add a task and move a task between columns, both using the
        updater form and immutable updates. Derive the per-column counts during render rather than storing
        them.</p>`,
        runHint: "pnpm --filter vite-hooks-lab dev",
      })}
    </section>
  `,
});
