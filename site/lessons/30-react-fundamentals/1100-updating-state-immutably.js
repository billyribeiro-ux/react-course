/* Lesson 30-react-fundamentals/1100 — Updating objects & arrays immutably. */
registerLesson({
  meta: {
    id: "30-react-fundamentals/1100-updating-state-immutably",
    title: "Updating Objects & Arrays in State",
    part: "30-react-fundamentals",
    estMinutes: 18,
    level: "intermediate",
    project: "vite-fundamentals",
    lede: "Most real state is objects and arrays. Updating them in React means producing new copies, never mutating in place. Master the handful of immutable-update patterns and complex state becomes easy.",
    objectives: [
      "Update object state with spread",
      "Add, remove, and update array items immutably",
      "Handle nested updates correctly",
      "Recognize when to reach for a reducer or Immer",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The golden rule, restated</h2>
      <p>
        React detects changes by comparing references. So every state update must create a <strong>new</strong>
        object or array — the spread patterns from Part 10 are now daily tools. Here's the full toolkit.
      </p>

      <h2>Updating objects</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Object updates",
        readOnly: true,
        code: `const [user, setUser] = useState({ name: "Ada", age: 36, city: "London" });

// Change one field — copy the rest:
setUser({ ...user, age: 37 });

// Update from a form field dynamically:
function handleChange(field: string, value: string) {
  setUser((prev) => ({ ...prev, [field]: value })); // computed key!
}`,
      })}

      <h2>Updating arrays</h2>
      ${h.codePane({
        lang: "tsx",
        title: "The four array operations",
        readOnly: true,
        code: `const [recipes, setRecipes] = useState<Recipe[]>([]);

// ADD — spread plus the new item:
setRecipes((prev) => [...prev, newRecipe]);

// REMOVE — filter out by id:
setRecipes((prev) => prev.filter((r) => r.id !== idToRemove));

// UPDATE one item — map, replacing the match with a new object:
setRecipes((prev) =>
  prev.map((r) => (r.id === id ? { ...r, favorite: !r.favorite } : r))
);

// All return NEW arrays. No push, splice, or direct index assignment.`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Memorize these three: spread / filter / map",
        body: `<p><strong>Add → spread</strong>, <strong>Remove → filter</strong>, <strong>Update → map</strong>.
        These three patterns cover the overwhelming majority of array state updates in every React app you'll
        ever write. They're pure (no mutation), they create new references React can detect, and they read
        declaratively. Internalize them and "complex state" stops being complex.</p>`,
      })}

      <h2>Nested updates</h2>
      <p>For nested structures, spread at each level you change. It gets verbose — which is a signal:</p>

      ${h.codePane({
        lang: "tsx",
        title: "Nested (verbose) update",
        readOnly: true,
        code: `const [state, setState] = useState({
  user: { name: "Ada", settings: { theme: "light" } },
});

// Flip the nested theme — spread every level on the path:
setState((prev) => ({
  ...prev,
  user: {
    ...prev.user,
    settings: { ...prev.user.settings, theme: "dark" },
  },
}));`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Deeply nested state is a smell",
        body: `<p>If you're spreading three levels deep, consider restructuring: flatten your state, split it
        into multiple <code>useState</code>s, or move to <code>useReducer</code> (Part 40) for complex
        transitions. Many teams use <strong>Immer</strong> (often via Zustand or Redux Toolkit in Part 70)
        to write "mutating-looking" code that produces immutable updates under the hood. The deeper lesson:
        <em>shape your state to make updates easy.</em> Awkward updates usually mean the state shape is
        wrong, not that you need cleverer spreading.</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Copy before sorting/reversing",
        body: `<p><code>array.sort()</code> and <code>array.reverse()</code> <strong>mutate in place</strong> —
        calling them on state directly is a bug. Copy first: <code>[...recipes].sort(...)</code>. (Modern JS
        also offers <code>toSorted()</code> and <code>toReversed()</code> which return new arrays — even
        cleaner.)</p>`,
      })}

      ${h.exercise({
        title: "A favorites + filter feature",
        prompt: `<p>In the Recipe Finder, add a <code>favorite</code> boolean to each recipe in state. Wire a
        heart button that toggles it immutably with <code>map</code>. Add a "show favorites only" toggle that
        <code>filter</code>s the displayed list. Add a "sort by time" button using <code>toSorted()</code> (or
        a copied <code>sort</code>). Confirm every update produces a new array — and that the UI stays
        perfectly in sync. You're now managing real, non-trivial state correctly.</p>`,
        runHint: "pnpm vite",
      })}
    </section>
  `,
});
