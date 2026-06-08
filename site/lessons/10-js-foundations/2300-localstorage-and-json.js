/* Lesson 10-js-foundations/2300 — localStorage & JSON. */
registerLesson({
  meta: {
    id: "10-js-foundations/2300-localstorage-and-json",
    title: "localStorage & JSON",
    part: "10-js-foundations",
    estMinutes: 14,
    level: "intermediate",
    project: "js-foundations",
    lede: "Make your dashboard remember things between visits. localStorage saves data in the browser, and JSON is the universal format for turning objects into storable, sendable text.",
    objectives: [
      "Save and load data with localStorage",
      "Convert between objects and text with JSON",
      "Persist your dashboard's state across reloads",
      "Understand JSON's central role on the web",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>JSON: objects as text</h2>
      <p>
        <strong>JSON</strong> (JavaScript Object Notation) is a text format for representing data. It
        looks almost exactly like a JavaScript object, but it's a <em>string</em> — which means it can
        be saved to disk, stored in a browser, or sent across the internet. It's the lingua franca of
        web APIs.
      </p>

      ${h.codePane({
        lang: "js",
        title: "stringify & parse",
        editable: true,
        code: `const user = { name: "Ada", age: 36, hobbies: ["math"] };

// Object → JSON text
const text = JSON.stringify(user);
console.log(text);
// '{"name":"Ada","age":36,"hobbies":["math"]}'

// JSON text → Object
const back = JSON.parse(text);
console.log(back.name); // "Ada"

// Pretty-print with indentation (great for debugging):
console.log(JSON.stringify(user, null, 2));`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "JSON's rules are stricter than JS",
        body: `<p>JSON requires <strong>double quotes</strong> on all keys and strings, allows no
        trailing commas, and can't hold functions, <code>undefined</code>, or comments. Those get
        dropped or cause errors. <code>JSON.parse</code> on malformed text throws — which is why you
        often wrap it in <code>try/catch</code> (remember Lesson 16).</p>`,
      })}

      <h2>localStorage: a tiny persistent store</h2>
      <p>
        <code>localStorage</code> saves string key/value pairs in the browser that survive reloads and
        even closing the tab. Since it only stores <em>strings</em>, you pair it with JSON for objects:
      </p>

      ${h.codePane({
        lang: "js",
        title: "Save & load",
        editable: true,
        code: `// Save (object → JSON string):
const tasks = ["Buy milk", "Walk dog"];
localStorage.setItem("tasks", JSON.stringify(tasks));

// Load (string → object); may be null on first ever visit:
const saved = localStorage.getItem("tasks");
const loadedTasks = saved ? JSON.parse(saved) : [];
console.log(loadedTasks); // ["Buy milk", "Walk dog"]

// Remove:
localStorage.removeItem("tasks");`,
      })}

      <h2>The persistence pattern</h2>
      ${h.codePane({
        lang: "js",
        title: "Load on start, save on change",
        readOnly: true,
        code: `// 1) Load saved tasks when the app starts (with a fallback):
let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 2) After every change to tasks, call saveTasks() then render():
function addTask(text) {
  tasks = [...tasks, { id: Date.now(), text, done: false }];
  saveTasks();
  render();
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "The right tool for the right data",
        body: `<p><code>localStorage</code> is perfect for small, non-sensitive, per-device data:
        theme choice, draft text, a simple to-do list. It's <strong>not</strong> for secrets (it's
        readable by any script on the page), big data, or anything that must sync across devices — that
        needs a real backend and database (Part 80). Knowing the boundaries of each storage tool is a
        genuinely senior skill. Fun fact: this very course uses <code>localStorage</code> to remember
        your progress and theme.</p>`,
      })}

      ${h.exercise({
        title: "Make your dashboard remember",
        prompt: `<p>Wire persistence into your task app: load tasks from <code>localStorage</code> on
        startup (with a <code>"[]"</code> fallback), and call a <code>saveTasks()</code> after every
        add/delete/toggle. Reload the page — your tasks should still be there. Also persist the user's
        name and a theme toggle. Your dashboard now feels like a real app that respects the user's data.</p>`,
        runHint: "pnpm js",
      })}
    </section>
  `,
});
