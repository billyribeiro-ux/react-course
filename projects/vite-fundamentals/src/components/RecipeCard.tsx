import type { Recipe } from "../types.ts";

interface Props {
  recipe: Recipe;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export function RecipeCard({ recipe, isFavorite, onToggleFavorite }: Props) {
  return (
    <article className="card">
      <h3>{recipe.name}</h3>
      <p className="meta">
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
}
