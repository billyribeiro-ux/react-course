export interface Recipe {
  id: number;
  name: string;
  cuisine: string;
  prepTimeMinutes: number;
  difficulty: "Easy" | "Medium" | "Hard";
}

// A discriminated union models the data-loading lifecycle (Part 30/0700).
export type LoadState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; recipes: Recipe[] };
