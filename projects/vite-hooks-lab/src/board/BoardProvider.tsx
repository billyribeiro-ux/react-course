import {
  createContext,
  use,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import { boardReducer, type BoardAction, type BoardState } from "./reducer.ts";

interface BoardContextValue {
  state: BoardState;
  dispatch: React.Dispatch<BoardAction>;
}

const BoardContext = createContext<BoardContextValue | undefined>(undefined);

const STORAGE_KEY = "kanban.board";

// Lazy initializer (Part 40/0200): runs once, reads persisted state safely.
function loadInitial(): BoardState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seed();
    const parsed: unknown = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && "tasks" in parsed) {
      return parsed as BoardState;
    }
    return seed();
  } catch {
    return seed();
  }
}

function seed(): BoardState {
  return {
    tasks: [
      { id: crypto.randomUUID(), title: "Learn the Rules of Hooks", column: "done" },
      { id: crypto.randomUUID(), title: "Build the reducer", column: "doing" },
      { id: crypto.randomUUID(), title: "Wire up drag & drop", column: "todo" },
    ],
  };
}

export function BoardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(boardReducer, undefined, loadInitial);

  // Persist on change — an Effect that SYNCHRONIZES with an external system
  // (localStorage), the correct use of useEffect (Part 40/0300).
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return <BoardContext value={{ state, dispatch }}>{children}</BoardContext>;
}

// Custom-hook wrapper with a "must be inside provider" guard (Part 40/0800).
export function useBoard(): BoardContextValue {
  const ctx = use(BoardContext);
  if (!ctx) throw new Error("useBoard must be used within a BoardProvider");
  return ctx;
}
