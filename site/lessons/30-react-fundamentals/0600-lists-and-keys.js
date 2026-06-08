/* Lesson 30-react-fundamentals/0600 — Rendering lists & keys. */
registerLesson({
  meta: {
    id: "30-react-fundamentals/0600-lists-and-keys",
    title: "Rendering Lists & Keys",
    part: "30-react-fundamentals",
    estMinutes: 16,
    level: "beginner",
    project: "vite-fundamentals",
    lede: "Most UI is lists — of recipes, messages, rows. In React you render a list by mapping data to JSX. The map() you mastered in Part 10 is now your superpower, with one new rule: keys.",
    objectives: [
      "Render arrays of data with .map()",
      "Provide stable, unique keys and know why",
      "Extract list items into their own component",
      "Avoid the index-as-key anti-pattern",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Lists are just map()</h2>
      <p>
        Remember turning data into <code>&lt;li&gt;</code> strings with <code>map</code> in Part 10? In
        React you do the same, but map to <strong>JSX elements</strong> instead of strings — and React
        renders them. No <code>innerHTML</code>, no <code>join</code>:
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "Mapping data to elements",
        readOnly: true,
        code: `const recipes = ["Pasta", "Soup", "Salad"];

function RecipeList() {
  return (
    <ul>
      {recipes.map((recipe) => (
        <li key={recipe}>{recipe}</li>
      ))}
    </ul>
  );
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "This is THE React pattern",
        body: `<p>"Take an array, <code>map</code> it to components" is the most common thing you'll do in
        React. Combined with <code>filter</code> and <code>sort</code>, it's how every feed, table, grid,
        and list is built. The declarative data-to-UI transformation you practiced in vanilla JS is now
        first-class. Notice the new <code>key</code> prop — that's the one piece React adds.</p>`,
      })}

      <h2>Keys: how React tracks list items</h2>
      <p>
        Each element in a mapped list needs a <strong>unique <code>key</code></strong> prop. React uses
        keys to identify which items changed, were added, or removed between renders — so it can update the
        DOM surgically instead of rebuilding the whole list.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "Keys with real data",
        readOnly: true,
        code: `interface Recipe { id: number; title: string; }

const recipes: Recipe[] = [
  { id: 1, title: "Pasta" },
  { id: 2, title: "Soup" },
];

function RecipeList() {
  return (
    <ul>
      {recipes.map((recipe) => (
        <li key={recipe.id}>{recipe.title}</li>  {/* stable, unique id */}
      ))}
    </ul>
  );
}`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Don't use the array index as key (usually)",
        body: `<p>It's tempting to write <code>key={index}</code>, and React even warns if you omit keys. But
        index keys cause real bugs when the list can reorder, filter, or have items inserted/removed: React
        mismatches items, and component state (like an input's text) attaches to the wrong row. <strong>Use
        a stable unique id from your data</strong> (a database id, or one you generate when creating the
        item). Index keys are only safe for static lists that never change order. This is a classic
        interview question and a real source of production bugs.</p>`,
      })}

      <h2>Extract the item into a component</h2>
      <p>As list items get complex, give them their own component and pass data via props:</p>

      ${h.codePane({
        lang: "tsx",
        title: "A clean list",
        readOnly: true,
        code: `function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <li className="card">
      <h3>{recipe.title}</h3>
    </li>
  );
}

function RecipeList({ recipes }: { recipes: Recipe[] }) {
  if (recipes.length === 0) {
    return <p>No recipes found.</p>;   // always handle the empty state!
  }
  return (
    <ul>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </ul>
  );
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Always design the empty state",
        body: `<p>Notice the <code>recipes.length === 0</code> check. Beginners render only the "happy path"
        with data; professionals always handle <strong>empty</strong> (and later, <strong>loading</strong>
        and <strong>error</strong>) states. An app that shows a thoughtful "No recipes found" instead of a
        blank void feels finished and trustworthy. Designing for the absence of data is a senior habit.</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Put the key on the outermost mapped element",
        body: `<p>The <code>key</code> goes on the element returned directly by <code>map</code> — here, the
        <code>&lt;RecipeCard&gt;</code>, not the <code>&lt;li&gt;</code> inside it. The key belongs at the
        point of repetition.</p>`,
      })}

      ${h.exercise({
        title: "Render a recipe list",
        prompt: `<p>Define an array of recipe objects (each with a unique <code>id</code>, <code>title</code>,
        and <code>minutes</code>) in <code>App</code>. Build a <code>RecipeList</code> that maps them to
        <code>RecipeCard</code> components with proper keys, and shows "No recipes found" when the array is
        empty. Test the empty state by starting with an empty array. Open the console — there should be no
        "missing key" warnings.</p>`,
        runHint: "pnpm vite",
      })}
    </section>
  `,
});
