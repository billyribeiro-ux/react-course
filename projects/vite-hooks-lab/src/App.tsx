import { BoardProvider } from "./board/BoardProvider.tsx";
import { COLUMNS } from "./board/reducer.ts";
import { Column } from "./components/Column.tsx";

// The complete Part 40 reference: reducer + context + custom hook architecture,
// derived state, localStorage persistence, and native drag-and-drop.
export default function App() {
  return (
    <BoardProvider>
      <main className="app">
        <h1>🗂️ Kanban Board</h1>
        <p>Drag cards between columns. Your board persists across reloads.</p>
        <div className="board">
          {COLUMNS.map((col) => (
            <Column key={col.id} id={col.id} title={col.title} />
          ))}
        </div>
      </main>
    </BoardProvider>
  );
}
