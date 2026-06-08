/* Lesson 20-typescript/1600 — Project: fully typed dashboard. */
registerLesson({
  meta: {
    id: "20-typescript/1600-project-typed-dashboard",
    title: "Project: Convert the Dashboard to TypeScript",
    part: "20-typescript",
    estMinutes: 45,
    level: "advanced",
    project: "js-foundations",
    lede: "Upgrade your Part 10 dashboard from JavaScript to fully-typed TypeScript. You'll feel the compiler catch real mistakes as you go — and end with code that's safer, clearer, and ready for React.",
    objectives: [
      "Migrate a real JS project to TypeScript incrementally",
      "Define a clean, typed data model",
      "Apply unions, generics, and utility types in context",
      "Reach zero type errors with strict mode on",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The migration plan</h2>
      <p>
        Migrating to TypeScript is best done <strong>incrementally</strong>, one file at a time. You don't
        rewrite logic — you rename <code>.js</code> → <code>.ts</code> and add types until the compiler is
        happy. Each error it surfaces is a potential bug you're fixing before it ever ships.
      </p>

      ${h.callout({
        kind: "principal",
        title: "How real teams migrate",
        body: `<p>Big codebases adopt TypeScript gradually: rename files, let some <code>any</code>s exist
        temporarily, then tighten over time. The strategy "make it compile, then make it strict, then make
        it elegant" keeps you shipping instead of stuck. You're practicing a genuinely valuable
        professional skill here — TS migrations are a common real-world project.</p>`,
      })}

      <h2>1. The typed data model</h2>
      ${h.codePane({
        lang: "ts",
        title: "src/types.ts",
        readOnly: true,
        code: `export interface Task {
  readonly id: number;
  text: string;
  done: boolean;
  tags?: string[];
}

export type Theme = "light" | "dark";

export type QuoteState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; content: string; author: string }
  | { status: "error"; message: string };`,
      })}

      <h2>2. Typed state module</h2>
      ${h.codePane({
        lang: "ts",
        title: "src/state.ts",
        readOnly: true,
        code: `import type { Task } from "./types.js";

const STORAGE_KEY = "dashboard.tasks";

function isTaskArray(value: unknown): value is Task[] {
  return (
    Array.isArray(value) &&
    value.every(
      (t) =>
        typeof t === "object" && t !== null && "id" in t && "text" in t
    )
  );
}

function load(): Task[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return isTaskArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export let tasks: Task[] = load();

export function save(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

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
}`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "The DOM needs types too",
        body: `<p><code>document.querySelector("#x")</code> returns <code>Element | null</code> in
        TypeScript — you must handle null and often assert the specific element type, e.g.
        <code>querySelector&lt;HTMLInputElement&gt;("#task-input")</code> to get <code>.value</code>. The
        compiler is reminding you that an element might not exist — exactly the kind of real bug strict
        mode prevents.</p>`,
      })}

      <h2>3. Typed DOM access</h2>
      ${h.codePane({
        lang: "ts",
        title: "src/main.ts (DOM, typed)",
        readOnly: true,
        code: `const form = document.querySelector<HTMLFormElement>("#task-form");
const input = document.querySelector<HTMLInputElement>("#task-input");
const list = document.querySelector<HTMLUListElement>("#task-list");

if (!form || !input || !list) {
  throw new Error("Dashboard markup is missing required elements");
}

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  try {
    addTask(input.value);  // input is HTMLInputElement → .value is typed
    input.value = "";
    render();
  } catch (err) {
    alert(err instanceof Error ? err.message : "Something went wrong");
  }
});`,
      })}

      <h2>4. Typed quote widget with a discriminated union</h2>
      ${h.codePane({
        lang: "ts",
        title: "src/quote.ts",
        readOnly: true,
        code: `import type { QuoteState } from "./types.js";

export async function fetchQuote(): Promise<QuoteState> {
  try {
    const res = await fetch("https://api.quotable.io/random");
    if (!res.ok) {
      return { status: "error", message: \`Status \${res.status}\` };
    }
    const data: unknown = await res.json();
    // narrow the unknown response before trusting it:
    if (
      typeof data === "object" && data !== null &&
      "content" in data && "author" in data
    ) {
      const d = data as { content: string; author: string };
      return { status: "success", content: d.content, author: d.author };
    }
    return { status: "error", message: "Unexpected response shape" };
  } catch {
    return { status: "error", message: "Network error" };
  }
}`,
      })}

      ${h.exercise({
        title: "Complete the migration",
        prompt: `<p>Convert your entire <code>js-foundations</code> project to TypeScript: rename all
        files to <code>.ts</code>, add the types above, and resolve every compiler error until
        <code>pnpm --filter js-foundations typecheck</code> passes clean with strict mode on. Then build it
        to confirm it still runs. Commit your work.</p>`,
        runHint: "pnpm --filter js-foundations typecheck && pnpm --filter js-foundations build",
      })}

      ${h.callout({
        kind: "principal",
        title: "You're ready for React",
        body: `<p>You now have a typed, validated, resilient application — and you understand the full
        toolchain that produced it. Everything from here is TypeScript: React components, Next.js Server
        Actions, Expo screens. The unions, generics, and utility types you just practiced are the exact
        ones you'll use to type props, hooks, and state. The foundations phase is <strong>complete</strong>.
        Part 30 begins React — and thanks to this groundwork, it'll feel less like magic and more like a
        natural next step. 🎉</p>`,
      })}
    </section>
  `,
});
