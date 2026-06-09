import { describe, it, expect } from "vitest";
import { boardReducer, type BoardState } from "./reducer.ts";

const empty: BoardState = { tasks: [] };

describe("boardReducer", () => {
  it("adds a task to a column", () => {
    const next = boardReducer(empty, { type: "added", title: "Test", column: "todo" });
    expect(next.tasks).toHaveLength(1);
    expect(next.tasks[0]).toMatchObject({ title: "Test", column: "todo" });
    expect(next.tasks[0]!.id).toBeTruthy();
  });

  it("does not mutate the previous state (immutability)", () => {
    boardReducer(empty, { type: "added", title: "X", column: "todo" });
    expect(empty.tasks).toHaveLength(0);
  });

  it("moves a task between columns", () => {
    const start = boardReducer(empty, { type: "added", title: "A", column: "todo" });
    const id = start.tasks[0]!.id;
    const moved = boardReducer(start, { type: "moved", id, column: "done" });
    expect(moved.tasks[0]!.column).toBe("done");
  });

  it("edits a task title", () => {
    const start = boardReducer(empty, { type: "added", title: "A", column: "todo" });
    const id = start.tasks[0]!.id;
    const edited = boardReducer(start, { type: "edited", id, title: "B" });
    expect(edited.tasks[0]!.title).toBe("B");
  });

  it("deletes a task", () => {
    const start = boardReducer(empty, { type: "added", title: "A", column: "todo" });
    const id = start.tasks[0]!.id;
    expect(boardReducer(start, { type: "deleted", id }).tasks).toHaveLength(0);
  });

  it("clears a single column only", () => {
    let s = boardReducer(empty, { type: "added", title: "A", column: "todo" });
    s = boardReducer(s, { type: "added", title: "B", column: "done" });
    const cleared = boardReducer(s, { type: "cleared", column: "todo" });
    expect(cleared.tasks).toHaveLength(1);
    expect(cleared.tasks[0]!.column).toBe("done");
  });
});
