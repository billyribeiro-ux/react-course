/* Lesson 40-hooks/0600 — useRef & the DOM. */
registerLesson({
  meta: {
    id: "40-hooks/0600-useref",
    title: "useRef: Escaping Render & Reaching the DOM",
    part: "40-hooks",
    estMinutes: 15,
    level: "intermediate",
    project: "vite-hooks-lab",
    lede: "useRef is for values that should persist across renders WITHOUT triggering a re-render, and for getting direct access to DOM elements. Know when a ref is the right tool — and when it's the wrong one.",
    objectives: [
      "Store mutable values that don't trigger renders",
      "Access DOM elements with a ref",
      "Distinguish refs from state",
      "Avoid overusing refs",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Two jobs for one hook</h2>
      <p><code>useRef</code> returns a mutable object <code>{ current: ... }</code> that <strong>persists
      across renders</strong> and <strong>does not trigger a re-render when changed</strong>. It's used
      for two things: a "box" for mutable values, and a handle to a DOM element.</p>

      <h2>Job 1: a mutable value that survives renders</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Holding a value without rendering",
        readOnly: true,
        code: `function Stopwatch() {
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<number | null>(null); // survives renders

  function start() {
    if (intervalRef.current !== null) return;
    intervalRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
  }
  function stop() {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }
  // intervalRef holds the timer id between renders, but changing it
  // does NOT cause a re-render (which is exactly what we want).
}`,
      })}

      <h2>Job 2: accessing a DOM element</h2>
      ${h.codePane({
        lang: "tsx",
        title: "A ref to a DOM node",
        readOnly: true,
        code: `function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null);

  function focusInput() {
    inputRef.current?.focus(); // imperatively focus the real input
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus the search box</button>
    </>
  );
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "ref vs state — the key distinction",
        body: `<p>Use <strong>state</strong> for anything that, when changed, should update the UI — React
        re-renders. Use a <strong>ref</strong> for values that should persist but are <em>not</em> part of
        the visual output: a timer id, a previous value, a scroll position, a "has this run before" flag, or
        a DOM handle. Rule of thumb: <em>if changing it should change what's on screen, it's state; if not,
        it's a ref.</em> Mutating a ref is the one place React tolerates direct mutation, precisely because
        it's outside the render cycle.</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Don't read/write refs during render",
        body: `<p>Reading or writing <code>ref.current</code> <em>during</em> rendering breaks React's model
        (rendering must be pure). Touch refs in event handlers and Effects, not in the render body. Also:
        because changing a ref doesn't re-render, never use a ref for data you want displayed — the screen
        won't update.</p>`,
      })}

      <h2>React 19: ref as a prop</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Forwarding refs (modernized)",
        readOnly: true,
        code: `// In React 19, function components can accept 'ref' as a normal prop —
// no more forwardRef boilerplate for most cases:
function TextInput({ ref, ...props }: React.ComponentProps<"input">) {
  return <input ref={ref} {...props} />;
}

// Parent can now do <TextInput ref={myRef} /> directly.`,
      })}

      ${h.callout({
        kind: "note",
        body: `<p>React 19 lets you pass <code>ref</code> as a regular prop to function components, retiring
        most uses of the old <code>forwardRef</code> wrapper. If you see <code>forwardRef</code> in older
        code, it's the pre-19 way to do the same thing — still works, just no longer necessary for new
        components.</p>`,
      })}

      ${h.exercise({
        title: "Auto-focus and a render counter",
        prompt: `<p>In your Kanban app, add a "new task" input that auto-focuses when its column's add button
        is clicked (using a DOM ref + <code>.focus()</code>). Then, for learning, add a ref that counts how
        many times a component rendered (increment <code>renderCount.current</code> in an Effect) and log it
        — proving the ref persists across renders without causing them. Notice you could never do the counter
        with state (it would loop forever).</p>`,
        runHint: "pnpm --filter vite-hooks-lab dev",
      })}
    </section>
  `,
});
