/* Lesson 10-js-foundations/2500 — Project: ship the vanilla dashboard. */
registerLesson({
  meta: {
    id: "10-js-foundations/2500-project-dashboard",
    title: "Project: Ship the Personal Dashboard",
    part: "10-js-foundations",
    estMinutes: 40,
    level: "intermediate",
    project: "js-foundations",
    lede: "Time to assemble everything from Part 10 into one complete, working app — a Personal Dashboard with a live clock, a persistent to-do list, and live data from the internet. No frameworks, just you and JavaScript.",
    objectives: [
      "Combine variables, functions, arrays, objects, events, and async into one app",
      "Structure code into modules with a clear render loop",
      "Persist state with localStorage and load remote data with fetch",
      "Have a real project you built and understand entirely",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>What you're building</h2>
      <p>A single-page Personal Dashboard with:</p>
      <ul>
        <li>A <strong>time-aware greeting</strong> and a <strong>live clock</strong> that updates every second.</li>
        <li>A <strong>to-do list</strong>: add, toggle complete, delete — fully persistent via <code>localStorage</code>.</li>
        <li>A <strong>stats line</strong> ("3 of 7 done") computed with array methods.</li>
        <li>A <strong>"quote of the day"</strong> widget that <code>fetch</code>es from a public API.</li>
      </ul>
      <p>
        Everything here uses only what you learned in Part 10. This is your proof — to yourself — that
        you can now build real things in JavaScript.
      </p>

      ${h.callout({
        kind: "principal",
        title: "How to approach a project",
        body: `<p>Don't try to write it all at once. Build <strong>one small feature end-to-end</strong>,
        confirm it works, commit, then move to the next. "Make it work, then make it clean" beats trying
        to be perfect from line one. This incremental rhythm is how professionals ship — and it keeps you
        from drowning. Breaking a big goal into small working steps is itself the skill.</p>`,
      })}

      <h2>1. The data and render loop</h2>
      <p>Start with the architecture you've internalized: state at the top, one render function, events
      that change state then re-render.</p>

      ${h.codePane({
        lang: "js",
        title: "src/state.js",
        readOnly: true,
        code: `const STORAGE_KEY = "dashboard.tasks";

export let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

export function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function addTask(text) {
  const clean = text.trim();
  if (!clean) throw new Error("Task can't be empty");
  tasks = [...tasks, { id: Date.now(), text: clean, done: false }];
  save();
}

export function toggleTask(id) {
  tasks = tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
  save();
}

export function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  save();
}`,
      })}

      <h2>2. Rendering the UI</h2>
      ${h.codePane({
        lang: "js",
        title: "src/render.js",
        readOnly: true,
        code: `import { tasks } from "./state.js";

export function render() {
  const list = document.querySelector("#task-list");
  const stats = document.querySelector("#stats");

  list.innerHTML = tasks
    .map(
      (t) => \`
      <li data-id="\${t.id}" class="\${t.done ? "done" : ""}">
        <input type="checkbox" \${t.done ? "checked" : ""} />
        <span>\${t.text}</span>
        <button data-delete>✕</button>
      </li>\`
    )
    .join("");

  const done = tasks.filter((t) => t.done).length;
  stats.textContent = \`\${done} of \${tasks.length} done\`;
}`,
      })}

      <h2>3. Wiring up events</h2>
      ${h.codePane({
        lang: "js",
        title: "src/main.js (events)",
        readOnly: true,
        code: `import { addTask, toggleTask, deleteTask } from "./state.js";
import { render } from "./render.js";

const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  try {
    addTask(input.value);
    input.value = "";
    render();
  } catch (err) {
    alert(err.message);
  }
});

// Event delegation: one listener on the list handles all rows
document.querySelector("#task-list").addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;
  const id = Number(li.dataset.id);
  if (e.target.matches("[data-delete]")) deleteTask(id);
  else toggleTask(id);
  render();
});

render(); // initial paint`,
      })}

      ${h.callout({
        kind: "tip",
        title: "Event delegation",
        body: `<p>Instead of attaching a listener to every task row, we put <em>one</em> on the list and
        use <code>e.target.closest("li")</code> to find which row was clicked. This handles rows added
        later automatically and is far more efficient — a genuinely professional pattern.</p>`,
      })}

      <h2>4. The clock and the quote widget</h2>
      ${h.codePane({
        lang: "js",
        title: "src/widgets.js",
        readOnly: true,
        code: `// Live clock
export function startClock() {
  const el = document.querySelector("#clock");
  const tick = () => (el.textContent = new Date().toLocaleTimeString());
  tick();
  setInterval(tick, 1000);
}

// Quote of the day from a public API
export async function loadQuote() {
  const el = document.querySelector("#quote");
  el.textContent = "Loading…";
  try {
    const res = await fetch("https://api.quotable.io/random");
    if (!res.ok) throw new Error("Status " + res.status);
    const data = await res.json();
    el.textContent = \`"\${data.content}" — \${data.author}\`;
  } catch {
    el.textContent = "Could not load a quote right now.";
  }
}`,
      })}

      ${h.callout({
        kind: "gotcha",
        body: `<p>If a public API is down or blocks the request, your <code>catch</code> shows a friendly
        message instead of breaking the app — exactly the resilience Lesson 16 and 22 taught. Swap in any
        free API you like; the pattern is identical.</p>`,
      })}

      ${h.exercise({
        title: "Build and ship it",
        prompt: `<p>Assemble the dashboard in <code>projects/js-foundations</code> following the modules
        above. Make all four features work. Then add <strong>one feature of your own</strong> — a filter
        (all/active/done), a task counter badge, a theme toggle saved to localStorage, anything. Finally,
        commit your work with Git:</p>`,
        runHint: 'git add . && git commit -m "Complete Part 10 dashboard project"',
      })}

      ${h.callout({
        kind: "principal",
        title: "Look how far you've come",
        body: `<p>You started Part 10 having never written code. You just built a persistent, data-driven,
        network-connected application — and you understand <em>every single line</em>. That deep
        foundation is exactly why your React will be strong: React isn't magic to you, it's a better way
        to do things you can already do by hand. Next, Part 20 adds TypeScript to make this code safer,
        then Part 30 rebuilds these very patterns in React. Onward. 🚀</p>`,
      })}
    </section>
  `,
});
