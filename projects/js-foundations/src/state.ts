import type { Task } from "./types.ts";

const STORAGE_KEY = "dashboard.tasks";

function isTaskArray(value: unknown): value is Task[] {
  return (
    Array.isArray(value) &&
    value.every(
      (t) =>
        typeof t === "object" &&
        t !== null &&
        "id" in t &&
        "text" in t &&
        "done" in t
    )
  );
}

// Load on start with a safe fallback (Part 20: unknown → validate → trust).
export let tasks: Task[] = load();

function load(): Task[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return isTaskArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function save(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// All updates are immutable (new arrays) — the habit React will reward.
export function addTask(text: string): Task {
  const clean = text.trim();
  if (!clean) throw new Error("Task can't be empty");
  const task: Task = { id: Date.now(), text: clean, done: false };
  tasks = [...tasks, task];
  save();
  return task;
}

export function toggleTask(id: number): void {
  tasks = tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
  save();
}

export function deleteTask(id: number): void {
  tasks = tasks.filter((t) => t.id !== id);
  save();
}
