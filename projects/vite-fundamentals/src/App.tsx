import { useEffect, useState } from "react";
import type { LoadState, Recipe } from "./types.ts";
import { fetchRecipes } from "./api.ts";
import { RecipeCard } from "./components/RecipeCard.tsx";

// The complete Part 30 reference: data fetching with loading/error/empty
// states, live search, a favorites Set updated immutably, and a "favorites
// only" filter. Everything derived (the visible list) is computed in render.
export default function App() {
  const [state, setState] = useState<LoadState>({ status: "loading" });
  const [query, setQuery] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  useEffect(() => {
    const controller = new AbortController();
    fetchRecipes(controller.signal)
      .then((recipes: Recipe[]) => setState({ status: "success", recipes }))
      .catch((e: unknown) => {
        if (e instanceof DOMException && e.name === "AbortError") return;
        setState({ status: "error", message: "Could not load recipes." });
      });
    return () => controller.abort();
  }, []);

  function toggleFavorite(id: number) {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  if (state.status === "loading")
    return <main className="app"><p>Loading recipes…</p></main>;
  if (state.status === "error")
    return <main className="app"><p role="alert">⚠️ {state.message}</p></main>;

  const visible = state.recipes
    .filter((r) => r.name.toLowerCase().includes(query.toLowerCase()))
    .filter((r) => (favoritesOnly ? favorites.has(r.id) : true));

  return (
    <main className="app">
      <h1>🍳 Recipe Finder</h1>

      <div className="controls">
        <input
          aria-label="Search recipes"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search recipes…"
        />
        <label>
          <input
            type="checkbox"
            checked={favoritesOnly}
            onChange={(e) => setFavoritesOnly(e.target.checked)}
          />{" "}
          Favorites only
        </label>
      </div>

      <p className="count">
        {visible.length} recipe(s) · {favorites.size} favorited
      </p>

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
}
