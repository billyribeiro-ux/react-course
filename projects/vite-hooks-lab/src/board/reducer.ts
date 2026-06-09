export type ColumnId = "todo" | "doing" | "done";

export interface Task {
  id: string;
  title: string;
  column: ColumnId;
}

export interface BoardState {
  tasks: Task[];
}

// Actions as a discriminated union (Part 20) → exhaustive, type-safe (Part 40).
export type BoardAction =
  | { type: "added"; title: string; column: ColumnId }
  | { type: "moved"; id: string; column: ColumnId }
  | { type: "edited"; id: string; title: string }
  | { type: "deleted"; id: string }
  | { type: "cleared"; column: ColumnId };

export const COLUMNS: { id: ColumnId; title: string }[] = [
  { id: "todo", title: "To Do" },
  { id: "doing", title: "In Progress" },
  { id: "done", title: "Done" },
];

// A pure reducer: same input → same output, no side effects, immutable updates.
export function boardReducer(state: BoardState, action: BoardAction): BoardState {
  switch (action.type) {
    case "added":
      return {
        tasks: [
          ...state.tasks,
          { id: crypto.randomUUID(), title: action.title, column: action.column },
        ],
      };
    case "moved":
      return {
        tasks: state.tasks.map((t) =>
          t.id === action.id ? { ...t, column: action.column } : t
        ),
      };
    case "edited":
      return {
        tasks: state.tasks.map((t) =>
          t.id === action.id ? { ...t, title: action.title } : t
        ),
      };
    case "deleted":
      return { tasks: state.tasks.filter((t) => t.id !== action.id) };
    case "cleared":
      return { tasks: state.tasks.filter((t) => t.column !== action.column) };
    default: {
      // Exhaustiveness check: a new action type that isn't handled above
      // makes this a compile error (Part 20/1100).
      const _exhaustive: never = action;
      return _exhaustive;
    }
  }
}
