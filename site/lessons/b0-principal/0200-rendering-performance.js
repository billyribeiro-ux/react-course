/* Lesson b0-principal/0200 — Rendering performance. */
registerLesson({
  meta: {
    id: "b0-principal/0200-rendering-performance",
    title: "Rendering Performance",
    part: "b0-principal",
    estMinutes: 15,
    level: "principal",
    project: "next-saas",
    lede: "Once you've measured, here's the toolkit for fixing slow React rendering: the Compiler, memoization (where still needed), state colocation, and concurrent features — applied surgically where the profiler points.",
    objectives: [
      "Eliminate unnecessary re-renders",
      "Colocate state to limit render scope",
      "Apply memoization judiciously",
      "Use concurrent features for responsiveness",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The biggest lever: the React Compiler</h2>
      <p>
        In 2026, your first answer to "too many re-renders" is the <strong>React Compiler</strong> (Part 50). It
        automatically memoizes components and values, eliminating most unnecessary re-renders without you writing
        <code>useMemo</code>/<code>useCallback</code>/<code>memo</code>. Enable it, write clean code, and a whole
        category of render-performance problems largely disappears.
      </p>

      ${h.callout({
        kind: "principal",
        title: "Structural fixes beat memoization",
        body: `<p>Even with the Compiler, the most powerful render optimizations are <strong>structural</strong>, not
        memoization patches: <strong>colocate state</strong> (keep state as low as possible so fewer components
        re-render when it changes — a fast-changing input's state shouldn't live at the app root), <strong>lift
        content out</strong> (pass expensive children as <code>props</code>/<code>children</code> so they don't
        re-render with the parent), and <strong>split components</strong> so a frequently-updating part doesn't drag a
        whole tree with it. These shape <em>how much</em> renders, which matters more than making each render cheaper.
        Reach for structure first; memoization is a targeted last resort for proven hotspots.</p>`,
      })}

      ${h.codePane({
        lang: "tsx",
        title: "Colocation: a fast input shouldn't re-render the whole page",
        readOnly: true,
        code: `// ❌ Search state at the top re-renders the entire page on each keystroke:
function App() {
  const [query, setQuery] = useState("");
  return <><Header /><SearchBar value={query} onChange={setQuery} /><HugeList query={query} /></>;
}

// ✅ Move the fast-changing state down into a small component, OR put it in
//    the URL (Part 70), so only what depends on it re-renders.`,
      })}

      <h2>When you still memoize manually</h2>
      ${h.callout({
        kind: "principal",
        title: "Targeted, measured memoization",
        body: `<p>On a non-Compiler codebase, or for a genuinely expensive computation, <code>useMemo</code> caches the
        result and <code>React.memo</code> skips re-rendering a component when its props are unchanged — but only
        helps if you've <em>measured</em> that the work is actually costly and the props are actually stable. Blanket
        memoization adds overhead and bugs (wrong dependency arrays) for no gain. The profiler tells you the specific
        component to target. "Measure, fix one thing, measure again" (Lesson 1) applies here precisely.</p>`,
      })}

      <h2>Responsiveness with concurrent features</h2>
      ${h.callout({
        kind: "principal",
        body: `<p>For interactions that <em>feel</em> slow even when total work is fine, use <strong>concurrent
        features</strong> (Part 50): <code>useTransition</code>/<code>useDeferredValue</code> keep the UI responsive
        during heavy updates by deprioritizing them. This doesn't reduce work — it reorders it so urgent updates
        (typing) never wait on non-urgent ones (filtering a big list). Perceived performance is what users actually
        experience; sometimes the fix is scheduling, not raw speed.</p>`,
      })}

      ${h.exercise({
        title: "Fix a measured bottleneck",
        prompt: `<p>Take the over-rendering component you found in Lesson 1. Fix it with the <em>least</em> invasive
        effective technique: colocate or lift state, restructure the component tree, or (if measured necessary)
        add targeted memoization. Re-profile to confirm the renders dropped. If an interaction feels janky, apply
        <code>useDeferredValue</code>. Document the before/after render counts — measured improvement, not a
        guess.</p>`,
        runHint: "pnpm --filter next-saas dev",
      })}
    </section>
  `,
});
