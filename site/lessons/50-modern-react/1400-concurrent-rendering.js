/* Lesson 50-modern-react/1400 — Concurrent rendering mental model. */
registerLesson({
  meta: {
    id: "50-modern-react/1400-concurrent-rendering",
    title: "The Concurrent Rendering Mental Model",
    part: "50-modern-react",
    estMinutes: 13,
    level: "advanced",
    project: "vite-hooks-lab",
    lede: "Tie together everything from Part 50 with the unifying idea beneath it: concurrent rendering. Understanding it explains why Suspense, transitions, and Activity work the way they do.",
    objectives: [
      "Understand what 'concurrent' means in React",
      "See how rendering can be interrupted and prioritized",
      "Connect concurrency to the features you've learned",
      "Avoid impure code that concurrency exposes",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Rendering used to be all-or-nothing</h2>
      <p>
        Before React 18, once React started rendering an update, it ran to completion, blocking the main
        thread — a big update could freeze the page. <strong>Concurrent rendering</strong> changed the engine:
        React can now <em>pause</em> a render, work on something more urgent, and resume or discard the paused
        work. Rendering became interruptible and prioritizable.
      </p>

      ${h.callout({
        kind: "principal",
        title: "The unifying idea behind Part 50",
        body: `<p>Concurrency is the foundation everything in this part stands on. <strong>Transitions</strong>
        let you mark work as interruptible (low priority). <strong>Suspense</strong> lets React pause a subtree
        that isn't ready and show a fallback, then resume when data arrives. <strong>Streaming</strong> sends
        ready parts while others are still pending. <strong>&lt;Activity&gt;</strong> pre-renders hidden content
        at low priority. They're all expressions of one capability: React can do rendering work in pieces,
        prioritize, pause, and resume. Seeing this connective tissue turns a list of features into a coherent
        system.</p>`,
      })}

      <h2>Urgent vs non-urgent, revisited</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Priorities in action",
        readOnly: true,
        code: `// Urgent updates (typing, clicking) render immediately:
setQuery(text);

// Non-urgent updates can be interrupted by urgent ones:
startTransition(() => setResults(filterHugeList(text)));

// React keeps the UI responsive by always letting urgent work jump ahead.
// If the user types again mid-filter, React throws away the in-progress
// filter render and starts fresh — no wasted frames shown to the user.`,
      })}

      <h2>The crucial requirement: purity</h2>
      ${h.callout({
        kind: "gotcha",
        title: "Concurrency exposes impure components",
        body: `<p>Because React may render a component multiple times, pause it, or discard the work before
        committing, your components <strong>must be pure</strong>: rendering should not mutate external
        variables, must not have side effects, and must produce the same output for the same props/state. An
        impure component that "worked" in the old synchronous model can break subtly under concurrency (this is
        exactly why StrictMode double-renders in dev — to catch impurity early). Side effects belong in event
        handlers and Effects, never in the render body.</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "You mostly get this for free",
        body: `<p>The good news: you rarely interact with concurrency's internals. You use the high-level
        features (<code>useTransition</code>, <code>Suspense</code>, <code>&lt;Activity&gt;</code>), follow the
        Rules of React (which the compiler and ESLint enforce), and React's scheduler handles prioritization.
        The mental model matters not because you'll configure it, but because it explains the <em>why</em>
        behind the modern APIs — and the <em>why</em> behind the purity rules that make the compiler and
        concurrent features safe. Understanding the system, not just the syntax, is the principal-engineer
        difference.</p>`,
      })}

      ${h.exercise({
        title: "Connect the dots",
        prompt: `<p>Write a short summary (in notes or comments) explaining, in your own words, how
        <code>useTransition</code>, <code>Suspense</code>, streaming, and <code>&lt;Activity&gt;</code> are all
        manifestations of concurrent rendering. Then audit your hooks-lab components for any impurity (mutating
        a module variable during render, side effects in the render body) and fix them. You now understand
        React not as a bag of features but as a coherent concurrent system.</p>`,
        runHint: "pnpm --filter vite-hooks-lab dev",
      })}
    </section>
  `,
});
