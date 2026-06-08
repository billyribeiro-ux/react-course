/* Lesson 40-hooks/0400 — Effect dependencies & cleanup. */
registerLesson({
  meta: {
    id: "40-hooks/0400-effect-dependencies-cleanup",
    title: "Effect Dependencies & Cleanup",
    part: "40-hooks",
    estMinutes: 17,
    level: "advanced",
    project: "vite-hooks-lab",
    lede: "The dependency array is where most Effect bugs live. Learn to get it exactly right, why you must never lie to it, and how cleanup prevents race conditions in real data fetching.",
    objectives: [
      "List dependencies correctly (and never omit them)",
      "Understand the three dependency-array forms",
      "Prevent race conditions with cleanup",
      "Trust the lint rule instead of fighting it",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The three forms of the dependency array</h2>
      ${h.codePane({
        lang: "tsx",
        title: "deps control re-runs",
        readOnly: true,
        code: `useEffect(() => { /* ... */ });        // no array → runs after EVERY render
useEffect(() => { /* ... */ }, []);    // empty → runs once (on mount)
useEffect(() => { /* ... */ }, [a, b]); // runs when a or b changes`,
      })}

      <h2>The golden rule: don't lie about dependencies</h2>
      <p>
        Your dependency array must include <strong>every reactive value the Effect reads</strong> — props,
        state, and anything derived from them. Omitting a dependency to "make it run less" creates stale
        bugs where the Effect uses outdated values.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "Stale closure from a missing dep",
        readOnly: true,
        code: `function Search({ query }: { query: string }) {
  useEffect(() => {
    fetchResults(query); // reads 'query'
  }, []); // ❌ LIE — query is missing. Effect keeps using the FIRST query
          //    forever, even as the prop changes. Classic stale bug.

  // ✅ Tell the truth:
  useEffect(() => {
    fetchResults(query);
  }, [query]); // re-runs whenever query changes
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "The lint rule is right; you are (probably) wrong",
        body: `<p><code>eslint-plugin-react-hooks</code> tells you exactly which dependencies you're missing.
        When you're tempted to silence it with <code>// eslint-disable</code>, stop — that warning is almost
        always pointing at a real bug. If an Effect re-runs too often, the fix isn't to remove a dependency;
        it's to remove the Effect's <em>need</em> for that dependency (use the updater form, move logic out,
        or use <code>useEffectEvent</code> — Lesson 13). Lying to the dependency array is the single most
        common source of subtle React bugs in production. Don't.</p>`,
      })}

      <h2>Cleanup prevents race conditions</h2>
      <p>
        When an Effect re-runs because a dependency changed, React runs the <em>previous</em> cleanup first.
        For data fetching this is essential: a slow earlier request must not overwrite a newer one.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "Race-safe fetching with cleanup",
        readOnly: true,
        code: `function Results({ query }: { query: string }) {
  const [data, setData] = useState<Item[]>([]);

  useEffect(() => {
    let active = true; // this run's flag

    fetchResults(query).then((items) => {
      if (active) setData(items); // ignore if a newer run superseded us
    });

    return () => { active = false; }; // cleanup: mark this run stale
  }, [query]);
  // Type fast: query "a" → "ab" → "abc". Without the flag, a slow "a"
  // response could land last and overwrite "abc". The flag prevents it.
}`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Objects & functions as dependencies",
        body: `<p>Objects, arrays, and functions are compared by <em>reference</em>. If you create one inside
        the component body and list it as a dependency, it's "new" every render, so the Effect runs every
        render. Fixes: move the value outside the component if it's constant, compute it with
        <code>useMemo</code>/<code>useCallback</code> (Lesson 9), or — better — restructure so the Effect
        depends on primitive values instead. The React Compiler (Part 50) also helps here automatically.</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Modern reality check",
        body: `<p>This race-condition dance is exactly why the React team recommends a data-fetching library
        (TanStack Query, Part 70) or framework data loading (Next.js, Part 80) over hand-written fetch
        Effects. You're learning the mechanics so you understand what those tools do for you — not so you'll
        write this by hand in every app.</p>`,
      })}

      ${h.exercise({
        title: "Write a race-safe Effect",
        prompt: `<p>Add a feature to your Kanban app that loads board templates from a public API based on a
        selected category. Write the Effect with the category in its dependency array and an
        <code>active</code> flag (or <code>AbortController</code>) in the cleanup. Switch categories quickly
        and confirm the displayed data always matches the latest selection. Then run <code>pnpm lint</code>
        and ensure there are zero hook-dependency warnings.</p>`,
        runHint: "pnpm --filter vite-hooks-lab lint",
      })}
    </section>
  `,
});
