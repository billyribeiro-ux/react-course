/* Lesson 40-hooks/0100 — Rules of Hooks. */
registerLesson({
  meta: {
    id: "40-hooks/0100-rules-of-hooks",
    title: "What Hooks Are & the Rules of Hooks",
    part: "40-hooks",
    estMinutes: 15,
    level: "intermediate",
    project: "vite-hooks-lab",
    lede: "Hooks are functions that let components 'hook into' React features like state and lifecycle. They follow two strict rules — and understanding WHY those rules exist makes them obvious instead of arbitrary.",
    objectives: [
      "Define what a hook is",
      "State and apply the two Rules of Hooks",
      "Understand why the rules exist (call order)",
      "Rely on the linter to enforce them",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>What is a hook?</h2>
      <p>
        A <strong>hook</strong> is a special function, named <code>use…</code>, that lets a function
        component use React features — state (<code>useState</code>), side effects
        (<code>useEffect</code>), context (<code>useContext</code>), and more. Hooks are what make function
        components as powerful as the old class components, but far simpler.
      </p>

      <h2>The two Rules of Hooks</h2>
      <ol>
        <li><strong>Only call hooks at the top level.</strong> Never inside loops, conditions, or nested functions.</li>
        <li><strong>Only call hooks from React functions.</strong> Components, or your own custom hooks — not regular functions.</li>
      </ol>

      ${h.codePane({
        lang: "tsx",
        title: "Breaking and following the rules",
        readOnly: true,
        code: `function Component({ loggedIn }: { loggedIn: boolean }) {
  // ❌ RULE 1 broken — hook inside a condition
  if (loggedIn) {
    const [name, setName] = useState(""); // never do this
  }

  // ❌ hook inside a loop
  for (let i = 0; i < 3; i++) {
    const [x] = useState(0); // never do this
  }

  // ✅ Always at the top level, unconditionally:
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);

  // Put the CONDITION inside the effect/value, not around the hook:
  useEffect(() => {
    if (loggedIn) { /* ... */ }
  }, [loggedIn]);
}`,
      })}

      <h2>Why the rules exist</h2>
      ${h.callout({
        kind: "principal",
        title: "Hooks are matched by call order",
        body: `<p>React doesn't know your hooks by name — it tracks them by the <strong>order</strong> they're
        called on each render. The first <code>useState</code> is "state slot 1," the second is "slot 2," and
        so on. This must be <em>identical on every render</em>. If a hook is inside an <code>if</code>, the
        order shifts when the condition changes, and React hands back the wrong state — corrupting your
        component. The rules aren't bureaucracy; they're the contract that makes hooks work at all.
        Understanding this once means you'll never be confused by them again.</p>`,
      })}

      ${h.codePane({
        lang: "tsx",
        title: "Why order matters (conceptually)",
        readOnly: true,
        code: `// React internally keeps an ordered list per component:
//   render 1: [name, count, isOpen]   ← 3 hooks, in this order
//   render 2: [name, count, isOpen]   ← MUST be the same order
//
// If a hook were conditional, render 2 might be [name, isOpen] —
// now 'count' state is read as 'isOpen'. Chaos. Hence: top level only.`,
      })}

      <h2>The linter has your back</h2>
      ${h.callout({
        kind: "tip",
        title: "eslint-plugin-react-hooks",
        body: `<p>Your project already includes <code>eslint-plugin-react-hooks</code> (you saw it in the
        ESLint config). It flags any violation of these rules — and the missing-dependency mistakes you'll
        learn about with <code>useEffect</code>. Treat its warnings as errors. In every serious React
        codebase, this lint rule is on and enforced in CI. Run <code>pnpm lint</code> and trust it.</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Custom hooks must start with 'use'",
        body: `<p>When you write your own hooks (Lesson 14), their names <em>must</em> start with
        <code>use</code> — that's how React and the linter know to apply the Rules of Hooks to them. A
        function called <code>getUser</code> that calls <code>useState</code> inside is a bug the linter
        can't catch; rename it <code>useUser</code>.</p>`,
      })}

      ${h.exercise({
        title: "Spot the violations",
        prompt: `<p>In <code>vite-hooks-lab</code>, deliberately write a component that calls
        <code>useState</code> inside an <code>if</code> and inside a <code>map</code>, and run
        <code>pnpm lint</code> to see the errors. Then fix them by moving the hooks to the top level and
        putting the conditions <em>inside</em> the hook logic. Confirm lint passes. You've internalized the
        most fundamental rule in React.</p>`,
        runHint: "pnpm --filter vite-hooks-lab lint",
      })}
    </section>
  `,
});
