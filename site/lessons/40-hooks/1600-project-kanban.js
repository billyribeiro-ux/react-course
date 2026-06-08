/* Lesson 40-hooks/1600 — Project: Kanban board. */
registerLesson({
  meta: {
    id: "40-hooks/1600-project-kanban",
    title: "Project: Build the Kanban Board",
    part: "40-hooks",
    estMinutes: 55,
    level: "advanced",
    project: "vite-hooks-lab",
    lede: "Combine every hook from Part 40 into a polished Kanban board: reducer-driven state, context distribution, custom hooks, persistence, drag-and-drop, and responsive, accessible UI. Your hooks mastery, proven.",
    objectives: [
      "Integrate useReducer, useContext, useRef, and custom hooks",
      "Build a real drag-and-drop board",
      "Persist state and keep the UI responsive",
      "Ship clean, lint-passing, well-structured React",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>What you're building</h2>
      <p>
        A Kanban board with columns (To Do / In Progress / Done), draggable cards, add/edit/delete, search,
        and persistence — architected the professional way: a reducer for logic, context for distribution,
        custom hooks for reuse, and components kept thin.
      </p>

      ${h.callout({
        kind: "principal",
        title: "Architecture first",
        body: `<p>The point of this project isn't just "make a board" — it's to <em>structure</em> one well.
        Logic in a reducer + hooks, distribution via context, components that mostly render. This separation
        is what makes apps maintainable as they grow. Build it the disciplined way even though a quick hack
        would "work" — the discipline is the skill.</p>`,
      })}

      <h2>1. State: reducer + types</h2>
      ${h.codePane({
        lang: "tsx",
        title: "src/board/reducer.ts",
        readOnly: true,
        code: `export type ColumnId = "todo" | "doing" | "done";
export interface Task { id: string; title: string; column: ColumnId; }
export interface BoardState { tasks: Task[]; }

export type BoardAction =
  | { type: "added"; title: string; column: ColumnId }
  | { type: "moved"; id: string; column: ColumnId }
  | { type: "edited"; id: string; title: string }
  | { type: "deleted"; id: string };

export function boardReducer(state: BoardState, action: BoardAction): BoardState {
  switch (action.type) {
    case "added":
      return { tasks: [...state.tasks, {
        id: crypto.randomUUID(), title: action.title, column: action.column,
      }]};
    case "moved":
      return { tasks: state.tasks.map((t) =>
        t.id === action.id ? { ...t, column: action.column } : t) };
    case "edited":
      return { tasks: state.tasks.map((t) =>
        t.id === action.id ? { ...t, title: action.title } : t) };
    case "deleted":
      return { tasks: state.tasks.filter((t) => t.id !== action.id) };
    default: {
      const _exhaustive: never = action;
      return state;
    }
  }
}`,
      })}

      <h2>2. Context + custom hook</h2>
      ${h.codePane({
        lang: "tsx",
        title: "src/board/BoardProvider.tsx",
        readOnly: true,
        code: `import { createContext, useContext, useEffect, useReducer } from "react";
import { boardReducer, type BoardAction, type BoardState } from "./reducer.ts";

interface BoardContextValue {
  state: BoardState;
  dispatch: React.Dispatch<BoardAction>;
}
const BoardContext = createContext<BoardContextValue | undefined>(undefined);

const KEY = "kanban.board";
const loadInitial = (): BoardState => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as BoardState) : { tasks: [] };
  } catch {
    return { tasks: [] };
  }
};

export function BoardProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(boardReducer, undefined, loadInitial);
  useEffect(() => localStorage.setItem(KEY, JSON.stringify(state)), [state]);
  return <BoardContext value={{ state, dispatch }}>{children}</BoardContext>;
}

export function useBoard() {
  const ctx = useContext(BoardContext);
  if (!ctx) throw new Error("useBoard must be used within a BoardProvider");
  return ctx;
}`,
      })}

      <h2>3. Components stay thin</h2>
      ${h.codePane({
        lang: "tsx",
        title: "src/board/Column.tsx (drag target)",
        readOnly: true,
        code: `import { useBoard } from "./BoardProvider.tsx";
import type { ColumnId } from "./reducer.ts";

export function Column({ id, title }: { id: ColumnId; title: string }) {
  const { state, dispatch } = useBoard();
  const tasks = state.tasks.filter((t) => t.column === id); // derived

  return (
    <section
      className="column"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const taskId = e.dataTransfer.getData("text/plain");
        dispatch({ type: "moved", id: taskId, column: id });
      }}
    >
      <h2>{title} ({tasks.length})</h2>
      {tasks.map((t) => (
        <article
          key={t.id}
          className="card"
          draggable
          onDragStart={(e) => e.dataTransfer.setData("text/plain", t.id)}
        >
          {t.title}
          <button onClick={() => dispatch({ type: "deleted", id: t.id })}>✕</button>
        </article>
      ))}
    </section>
  );
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Every Part 40 concept, working together",
        body: `<p>This project uses: <strong>useReducer</strong> (board logic), <strong>useContext</strong> +
        a guarded <strong>custom hook</strong> (distribution), derived state during render (no redundant
        state), <strong>localStorage</strong> persistence via an Effect that <em>synchronizes</em> with an
        external system, the native drag-and-drop API, and the <code>never</code> exhaustiveness check. It's
        a complete, idiomatic React feature. With the React Compiler (next part) you won't even need manual
        memoization to keep it fast.</p>`,
      })}

      ${h.exercise({
        title: "Build it and extend it",
        prompt: `<p>Build the full Kanban board in <code>vite-hooks-lab</code>. Then add <strong>two
        extensions</strong>: e.g. a <code>useDebouncedValue</code>-powered live search that highlights or
        filters cards, a <code>useMediaQuery</code> hook (from Lesson 12) to stack columns on mobile, inline
        title editing with an auto-focused input (<code>useRef</code>), or a <code>useTransition</code> for a
        large board. Ensure <code>pnpm lint</code>, <code>pnpm typecheck</code>, and <code>pnpm build</code>
        all pass, then commit.</p>`,
        runHint: "pnpm --filter vite-hooks-lab lint && pnpm --filter vite-hooks-lab build",
      })}

      ${h.callout({
        kind: "principal",
        title: "You've mastered hooks",
        body: `<p>You now understand every hook React offers — what each does, when to use it, when not to, and
        how to compose them into clean architecture. This is the engine room of React. Part 50 turns to the
        cutting edge: Actions, the <code>use()</code> hook, Suspense, and the React Compiler — the React 19.2
        features that define modern, 2026-grade React. Onward. 🚀</p>`,
      })}
    </section>
  `,
});
