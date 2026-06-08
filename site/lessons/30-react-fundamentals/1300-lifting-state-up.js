/* Lesson 30-react-fundamentals/1300 — Lifting state up. */
registerLesson({
  meta: {
    id: "30-react-fundamentals/1300-lifting-state-up",
    title: "Lifting State Up",
    part: "30-react-fundamentals",
    estMinutes: 16,
    level: "intermediate",
    project: "vite-fundamentals",
    lede: "When two components need to share or coordinate state, you move it up to their nearest common parent. This pattern — lifting state up — is how React components communicate.",
    objectives: [
      "Recognize when state needs to be shared",
      "Move state to a common ancestor",
      "Pass state down as props and updates up as callbacks",
      "Decide where each piece of state should live",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The problem: siblings can't see each other's state</h2>
      <p>
        State inside a component is private to it. If a <code>SearchBar</code> holds the query but the
        <code>RecipeList</code> needs it to filter, they're stuck — siblings can't read each other's state.
        The solution: <strong>lift the state up</strong> to their nearest common parent, then pass it back
        down.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "Before: state trapped in a child",
        readOnly: true,
        code: `function SearchBar() {
  const [query, setQuery] = useState(""); // 😟 RecipeList can't see this
  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}`,
      })}

      <h2>The fix: lift it to the parent</h2>
      ${h.codePane({
        lang: "tsx",
        title: "After: parent owns the shared state",
        readOnly: true,
        code: `function RecipeFinder() {
  // State lives in the common parent of SearchBar and RecipeList:
  const [query, setQuery] = useState("");
  const [recipes] = useState<Recipe[]>(ALL_RECIPES);

  const visible = recipes.filter((r) =>
    r.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      {/* data DOWN as a prop, updates UP as a callback */}
      <SearchBar query={query} onQueryChange={setQuery} />
      <RecipeList recipes={visible} />
    </div>
  );
}

function SearchBar({
  query, onQueryChange,
}: { query: string; onQueryChange: (q: string) => void }) {
  return (
    <input value={query} onChange={(e) => onQueryChange(e.target.value)} />
  );
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Data down, events up",
        body: `<p>This is React's core communication pattern: the parent owns the state, passes the value
        <strong>down</strong> as a prop, and passes a setter/handler <strong>down</strong> too, which the
        child calls to send changes <strong>up</strong>. The child becomes a "controlled" component — it
        renders what it's given and reports events, holding no state of its own. This keeps a single source
        of truth and makes data flow easy to trace: there's exactly one place that owns each piece of
        state.</p>`,
      })}

      <h2>Where should state live?</h2>
      <p>A practical decision procedure used by experienced engineers:</p>
      <ol>
        <li>Find every component that needs to <em>read</em> or <em>change</em> the state.</li>
        <li>Find their <strong>nearest common parent</strong>.</li>
        <li>Put the state there (or higher, if multiple branches need it).</li>
        <li>Pass it down as props.</li>
      </ol>

      ${h.callout({
        kind: "principal",
        title: "Keep state as local as possible",
        body: `<p>Lift state <em>only as high as it needs to go</em> — no higher. State that's only used by
        one component should stay in that component. Over-lifting (hoisting everything to the top) makes the
        root a tangled god-component and causes needless re-renders. The art is putting each piece of state
        at exactly the right altitude: low enough to stay simple, high enough to be shared. When prop-passing
        gets painful across many levels, that's the signal for Context (Part 40) or a state library
        (Part 70) — not before.</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Avoid duplicating state",
        body: `<p>Don't copy a prop into a child's own state "to be safe" — now you have two sources of truth
        that drift apart. If a child needs to display a value, read the prop directly. Only introduce local
        state for data the child genuinely owns. Duplicated state is one of the most common React bugs.</p>`,
      })}

      ${h.exercise({
        title: "Make search actually filter",
        prompt: `<p>Lift your <code>query</code> state from the <code>SearchBar</code> up to the
        <code>RecipeFinder</code> parent. Pass <code>query</code> and <code>onQueryChange</code> down to the
        search bar, and pass the <em>filtered</em> recipes down to the list. Typing in the search box should
        now live-filter the recipes. You've connected two sibling components through their parent — the
        fundamental React communication pattern.</p>`,
        runHint: "pnpm vite",
      })}
    </section>
  `,
});
