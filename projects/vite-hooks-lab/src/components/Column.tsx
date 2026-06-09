import { useBoard } from "../board/BoardProvider.tsx";
import type { ColumnId } from "../board/reducer.ts";
import { AddCard } from "./AddCard.tsx";

export function Column({ id, title }: { id: ColumnId; title: string }) {
  const { state, dispatch } = useBoard();
  const tasks = state.tasks.filter((t) => t.column === id); // derived in render

  return (
    <section
      className="column"
      aria-label={title}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const taskId = e.dataTransfer.getData("text/plain");
        if (taskId) dispatch({ type: "moved", id: taskId, column: id });
      }}
    >
      <h2>
        {title} <span className="badge">{tasks.length}</span>
      </h2>

      {tasks.map((task) => (
        <article
          key={task.id}
          className="card"
          draggable
          onDragStart={(e) => e.dataTransfer.setData("text/plain", task.id)}
        >
          <span>{task.title}</span>
          <button
            aria-label={`Delete ${task.title}`}
            onClick={() => dispatch({ type: "deleted", id: task.id })}
          >
            ✕
          </button>
        </article>
      ))}

      <AddCard column={id} />
    </section>
  );
}
