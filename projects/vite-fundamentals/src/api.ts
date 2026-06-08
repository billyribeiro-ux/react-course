import type { Recipe } from "./types.ts";

// A local, in-memory "API" with artificial latency so the reference app runs
// and tests deterministically with no network. The lessons show swapping this
// for a real fetch() — the components don't change.
const RECIPES: Recipe[] = [
  { id: 1, name: "Margherita Pizza", cuisine: "Italian", prepTimeMinutes: 30, difficulty: "Medium" },
  { id: 2, name: "Pad Thai", cuisine: "Thai", prepTimeMinutes: 25, difficulty: "Medium" },
  { id: 3, name: "Caesar Salad", cuisine: "American", prepTimeMinutes: 15, difficulty: "Easy" },
  { id: 4, name: "Beef Wellington", cuisine: "British", prepTimeMinutes: 120, difficulty: "Hard" },
  { id: 5, name: "Tacos al Pastor", cuisine: "Mexican", prepTimeMinutes: 40, difficulty: "Medium" },
  { id: 6, name: "Miso Soup", cuisine: "Japanese", prepTimeMinutes: 10, difficulty: "Easy" },
  { id: 7, name: "Croissant", cuisine: "French", prepTimeMinutes: 180, difficulty: "Hard" },
  { id: 8, name: "Hummus", cuisine: "Lebanese", prepTimeMinutes: 10, difficulty: "Easy" },
];

export function fetchRecipes(signal?: AbortSignal): Promise<Recipe[]> {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => resolve(RECIPES), 400);
    signal?.addEventListener("abort", () => {
      clearTimeout(t);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });
}
