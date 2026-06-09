import { useRef, useState } from "react";
import { useBoard } from "../board/BoardProvider.tsx";
import type { ColumnId } from "../board/reducer.ts";

export function AddCard({ column }: { column: ColumnId }) {
  const { dispatch } = useBoard();
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const clean = title.trim();
    if (!clean) return;
    dispatch({ type: "added", title: clean, column });
    setTitle("");
    inputRef.current?.focus(); // keep focus to add several quickly (useRef)
  }

  if (!adding) {
    return (
      <button
        className="add-trigger"
        onClick={() => {
          setAdding(true);
          // focus the input once it renders
          queueMicrotask(() => inputRef.current?.focus());
        }}
      >
        + Add a card
      </button>
    );
  }

  return (
    <form onSubmit={submit} className="add-form">
      <input
        ref={inputRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={() => !title && setAdding(false)}
        placeholder="Card title…"
        aria-label={`Add a card to ${column}`}
      />
      <button type="submit">Add</button>
    </form>
  );
}
