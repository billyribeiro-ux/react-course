/* Lesson 30-react-fundamentals/1800 — Project: build the Recipe Finder. */
registerLesson({
  meta: {
    id: "30-react-fundamentals/1800-project-recipe-finder",
    title: "Project: Build the Recipe Finder",
    part: "30-react-fundamentals",
    estMinutes: 50,
    level: "intermediate",
    project: "vite-fundamentals",
    lede: "Assemble everything from Part 30 into a complete, polished Recipe Finder: a typed component tree, live search and filters, favorites, real data, and proper loading/empty/error states. Your first real React app.",
    objectives: [
      "Apply the full 'Thinking in React' process end to end",
      "Build a clean, typed component hierarchy",
      "Manage shared state with lifting and derived values",
      "Ship a polished app with all states handled",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>What you're building</h2>
      <p>
        A Recipe Finder that fetches recipes, lets the user search and filter them live, mark favorites, and
        handles loading/error/empty states gracefully — all in well-structured, typed, lint-clean React.
      </p>

      ${h.callout({
        kind: "principal",
        title: "Run the process",
        body: `<p>Don't freestyle this. Follow the five steps from <em>Thinking in React</em>: component tree
        → static version → minimal state → state location → inverse data flow. Building deliberately is the
        habit that lets you tackle <em>any</em> feature. We'll move through them.</p>`,
      })}

      <h2>1. Types & component tree</h2>
      ${h.codePane({
        lang: "tsx",
        title: "src/types.ts",
        readOnly: true,
        code: `export interface Recipe {
  id: number;
  name: string;
  cuisine: string;
  prepTimeMinutes: number;
  difficulty: "Easy" | "Medium" | "Hard";
  image?: string;
}

export type LoadState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; recipes: Recipe[] };`,
      })}

      <h2>2. The leaf components (static, props-driven)</h2>
      ${h.codePane({
        lang: "tsx",
        title: "src/components/RecipeCard.tsx",
        readOnly: true,
        code: `import type { Recipe } from "../types.ts";

interface Props {
  recipe: Recipe;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export function RecipeCard({ recipe, isFavorite, onToggleFavorite }: Props) {
  return (
    <article className="card">
      <h3>{recipe.name}</h3>
      <p>
        {recipe.cuisine} · {recipe.prepTimeMinutes} min · {recipe.difficulty}
      </p>
      <button
        aria-pressed={isFavorite}
        onClick={() => onToggleFavorite(recipe.id)}
      >
        {isFavorite ? "★ Favorited" : "☆ Favorite"}
      </button>
    </article>
  );
}`,
      })}

      <h2>3. The container: state, fetching, derived values</h2>
      ${h.codePane({
        lang: "tsx",
        title: "src/App.tsx",
        readOnly: true,
        code: `import { useEffect, useState } from "react";
import type { LoadState, Recipe } from "./types.ts";
import { RecipeCard } from "./components/RecipeCard.tsx";

export default function App() {
  const [state, setState] = useState<LoadState>({ status: "loading" });
  const [query, setQuery] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  useEffect(() => {
    const controller = new AbortController();
    fetch("https://dummyjson.com/recipes?limit=30", { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error(\`Server error \${r.status}\`);
        return r.json();
      })
      .then((data: { recipes: Recipe[] }) =>
        setState({ status: "success", recipes: data.recipes })
      )
      .catch((e: unknown) => {
        if (e instanceof Error && e.name === "AbortError") return;
        setState({ status: "error", message: "Could not load recipes." });
      });
    return () => controller.abort();
  }, []);

  function toggleFavorite(id: number) {
    setFavorites((prev) => {
      const next = new Set(prev);          // copy — immutable update
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  if (state.status === "loading") return <p className="app">Loading recipes…</p>;
  if (state.status === "error")
    return <p className="app">⚠️ {state.message}</p>;

  // Derived during render — never stored as state:
  const visible = state.recipes
    .filter((r) => r.name.toLowerCase().includes(query.toLowerCase()))
    .filter((r) => (favoritesOnly ? favorites.has(r.id) : true));

  return (
    <main className="app">
      <h1>🍳 Recipe Finder</h1>

      <div className="controls">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search recipes…"
        />
        <label>
          <input
            type="checkbox"
            checked={favoritesOnly}
            onChange={(e) => setFavoritesOnly(e.target.checked)}
          />
          Favorites only
        </label>
      </div>

      <p>{visible.length} recipe(s) · {favorites.size} favorited</p>

      {visible.length === 0 ? (
        <p>No recipes match your search.</p>
      ) : (
        <div className="grid">
          {visible.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isFavorite={favorites.has(recipe.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </main>
  );
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Notice the enterprise-grade details",
        body: `<p>Every state is handled (loading/error/empty/success). Data flows down, events flow up.
        Favorites use a <code>Set</code> updated immutably. The filtered list is derived, not stored.
        Fetching is cancelled on unmount. Errors are narrowed from <code>unknown</code>. The
        <code>aria-pressed</code> makes the favorite button accessible. None of this is incidental — these
        are the habits that distinguish production code from a tutorial demo, and you've now practiced every
        one.</p>`,
      })}

      ${h.exercise({
        title: "Build it, polish it, ship it",
        prompt: `<p>Build the full Recipe Finder in <code>vite-fundamentals</code>. Then add
        <strong>two enhancements of your own</strong>: e.g. a cuisine <code>&lt;select&gt;</code> filter, a
        "sort by prep time" control (use <code>toSorted</code>), persisting favorites to
        <code>localStorage</code>, or a difficulty badge with color. Make sure <code>pnpm lint</code>,
        <code>pnpm typecheck</code>, and <code>pnpm build</code> all pass, then commit.</p>`,
        runHint: "pnpm --filter vite-fundamentals lint && pnpm --filter vite-fundamentals build",
      })}

      ${h.callout({
        kind: "principal",
        title: "You can build React apps now",
        body: `<p>Pause and appreciate this: you've built a real, data-driven, interactive React application
        with clean architecture and every edge case handled. Components, props, state, lists, forms, lifting,
        composition, and data — the complete fundamentals. Part 40 goes deep on hooks (the machinery behind
        <code>useState</code> and <code>useEffect</code>), turning your working knowledge into true mastery.
        The hard part — getting started — is behind you. 🎉</p>`,
      })}
    </section>
  `,
});
