/* Lesson 30-react-fundamentals/1400 — Thinking in React. */
registerLesson({
  meta: {
    id: "30-react-fundamentals/1400-thinking-in-react",
    title: "Thinking in React",
    part: "30-react-fundamentals",
    estMinutes: 18,
    level: "intermediate",
    project: "vite-fundamentals",
    lede: "A repeatable, professional process for turning any design or idea into a working React app. This is the meta-skill that lets you build things you've never built before.",
    objectives: [
      "Break a UI into a component hierarchy",
      "Identify the minimal state your app needs",
      "Decide where state lives and how data flows",
      "Apply the process to a real feature",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>A process, not a guess</h2>
      <p>
        Faced with a blank file and a feature to build, beginners freeze. Professionals follow a process.
        This is React's official method, refined — five steps from idea to working app.
      </p>

      <h2>Step 1 — Break the UI into components</h2>
      <p>
        Look at the design and draw boxes around pieces. Each box is a candidate component. Use the
        single-responsibility principle: one component, one job. Group related boxes into a hierarchy.
      </p>

      ${h.codePane({
        lang: "markdown",
        title: "Recipe Finder component tree",
        readOnly: true,
        code: `RecipeFinder            (owns shared state)
├── SearchBar           (search + filters)
├── RecipeStats         ("12 recipes, 3 favorites")
└── RecipeList
    └── RecipeCard       (one per recipe)
        └── FavoriteButton`,
      })}

      <h2>Step 2 — Build a static version first</h2>
      ${h.callout({
        kind: "principal",
        title: "Static before interactive",
        body: `<p>Build the components to render <em>hardcoded data via props</em> first — no state, no
        interactivity. This lets you nail the component structure and JSX without juggling behavior at the
        same time. It's the "make it work, then make it dynamic" discipline. Separating "what it looks like"
        from "how it behaves" is a powerful way to tame complexity, and it's exactly how senior engineers
        approach an unfamiliar build.</p>`,
      })}

      <h2>Step 3 — Find the minimal state</h2>
      <p>
        List every piece of data in your app. Then ruthlessly cut it down to the <strong>minimal set</strong>
        from which everything else can be <em>computed</em>. Ask of each: does it change over time? Is it
        passed in via props? Can it be derived from other state? If yes to any, it's <em>not</em> state.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "State vs. derived",
        readOnly: true,
        code: `// STATE (the irreducible source of truth):
const [recipes, setRecipes] = useState<Recipe[]>(ALL);
const [query, setQuery] = useState("");
const [favoritesOnly, setFavoritesOnly] = useState(false);

// DERIVED — compute during render, do NOT store as state:
const visible = recipes
  .filter((r) => r.title.toLowerCase().includes(query.toLowerCase()))
  .filter((r) => (favoritesOnly ? r.favorite : true));
const favoriteCount = recipes.filter((r) => r.favorite).length;`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Don't store what you can derive",
        body: `<p>Putting <code>visibleRecipes</code> or <code>favoriteCount</code> in their own
        <code>useState</code> is a classic mistake — now you must remember to update them whenever the
        sources change, and they'll drift out of sync. <strong>Calculate derived values during render</strong>
        instead. Less state means fewer bugs. This single principle eliminates a huge fraction of real React
        bugs.</p>`,
      })}

      <h2>Step 4 — Decide where state lives</h2>
      <p>For each piece of state, apply last lesson's procedure: find the components that need it, put it in
      their nearest common parent, pass it down.</p>

      <h2>Step 5 — Add inverse data flow</h2>
      <p>Wire the events: pass callbacks down so children can update the parent's state. Now it's
      interactive.</p>

      ${h.callout({
        kind: "principal",
        title: "This process scales to anything",
        body: `<p>These five steps — components → static → minimal state → state location → inverse flow —
        work for a to-do list and for a trading dashboard. When you face something you've never built, you
        won't guess; you'll run the process. <em>This</em> is what "able to build whatever you can imagine"
        actually means: not memorizing every UI, but having a reliable method to derive any of them. Internalize
        it and revisit it for every feature you build from here on.</p>`,
      })}

      ${h.exercise({
        title: "Apply the full process",
        prompt: `<p>On paper, run all five steps for a new feature: a "meal planner" that lets users add
        recipes to days of the week. Draw the component tree, list the data, separate state from derived
        values, decide where state lives, and sketch the callbacks. Then, in code, refactor your Recipe Finder
        so that <em>all</em> derived values (visible list, counts) are computed during render rather than
        stored. Confirm nothing breaks. You're now thinking like a React engineer.</p>`,
        runHint: "pnpm vite",
      })}
    </section>
  `,
});
