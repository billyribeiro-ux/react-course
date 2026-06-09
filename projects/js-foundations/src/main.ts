import { tasks, addTask, toggleTask, deleteTask } from "./state.ts";

// --- typed DOM access (Part 20/1600): elements may not exist, so we check ---
function need<T extends Element>(selector: string): T {
  const el = document.querySelector<T>(selector);
  if (!el) throw new Error(`Missing element: ${selector}`);
  return el;
}

const greeting = need<HTMLHeadingElement>("#greeting");
const clock = need<HTMLTimeElement>("#clock");
const quote = need<HTMLParagraphElement>("#quote");
const form = need<HTMLFormElement>("#task-form");
const input = need<HTMLInputElement>("#task-input");
const list = need<HTMLUListElement>("#task-list");
const stats = need<HTMLParagraphElement>("#stats");

// --- greeting that knows the time of day ---
function partOfDay(hour: number): string {
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "evening";
}
greeting.textContent = `Good ${partOfDay(new Date().getHours())}! 👋`;

// --- a live clock (setInterval + cleanup mindset) ---
function tick(): void {
  clock.textContent = new Date().toLocaleTimeString();
}
tick();
setInterval(tick, 1000);

// --- render the task list from state (the data → render loop) ---
function render(): void {
  list.innerHTML = tasks
    .map(
      (t) => `
      <li data-id="${t.id}" class="${t.done ? "done" : ""}">
        <input type="checkbox" ${t.done ? "checked" : ""} aria-label="Toggle ${t.text}" />
        <span>${escapeHtml(t.text)}</span>
        <button data-delete aria-label="Delete ${escapeHtml(t.text)}">✕</button>
      </li>`
    )
    .join("");
  const done = tasks.filter((t) => t.done).length;
  stats.textContent = `${done} of ${tasks.length} done`;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]!);
}

// --- events: change data, then re-render ---
form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  try {
    addTask(input.value);
    input.value = "";
    render();
  } catch (err) {
    alert(err instanceof Error ? err.message : "Something went wrong");
  }
});

// One listener for the whole list (event delegation).
list.addEventListener("click", (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const li = target.closest("li");
  if (!li) return;
  const id = Number(li.dataset.id);
  if (target.matches("[data-delete]")) deleteTask(id);
  else toggleTask(id);
  render();
});

// --- a quote-of-the-day widget loaded from a public API ---
async function loadQuote(): Promise<void> {
  try {
    const res = await fetch("https://dummyjson.com/quotes/random");
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data: unknown = await res.json();
    if (data && typeof data === "object" && "quote" in data && "author" in data) {
      const d = data as { quote: string; author: string };
      quote.textContent = `"${d.quote}" — ${d.author}`;
    }
  } catch {
    quote.textContent = "Could not load a quote right now.";
  }
}

render();
void loadQuote();
