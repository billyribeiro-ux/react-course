/* Lesson 10-js-foundations/1700 — The DOM: selecting & changing elements. */
registerLesson({
  meta: {
    id: "10-js-foundations/1700-the-dom",
    title: "The DOM: Selecting & Changing Elements",
    part: "10-js-foundations",
    estMinutes: 18,
    level: "intermediate",
    project: "js-foundations",
    lede: "Now we make pages actually change. You'll find elements, read and write their content, toggle classes, and build elements from data — the manual version of everything React will later automate.",
    objectives: [
      "Select elements with querySelector",
      "Read and change text, HTML, and attributes",
      "Add, remove, and create elements",
      "Appreciate why doing this by hand gets painful (motivating React)",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Selecting elements</h2>
      <p>
        <code>document.querySelector</code> finds the first element matching a CSS selector;
        <code>querySelectorAll</code> finds all of them. CSS selectors: <code>"#id"</code> for an id,
        <code>".class"</code> for a class, <code>"tag"</code> for a tag name.
      </p>

      ${h.codePane({
        lang: "js",
        title: "Finding elements",
        readOnly: true,
        code: `const title = document.querySelector("h1");        // first <h1>
const intro = document.querySelector("#intro");     // element with id="intro"
const cards = document.querySelectorAll(".card");   // all elements class="card"

console.log(title.textContent); // whatever text is inside the h1`,
      })}

      <h2>Reading and writing content</h2>
      ${h.codePane({
        lang: "js",
        title: "Changing what's shown",
        readOnly: true,
        code: `const intro = document.querySelector("#intro");

intro.textContent = "Updated text!";   // safe: sets plain text
intro.innerHTML = "<strong>Bold!</strong>"; // parses HTML (use with care)

// Attributes & styles:
const link = document.querySelector("a");
link.setAttribute("href", "https://react.dev");
intro.style.color = "tomato";
intro.classList.add("highlight");      // add a CSS class
intro.classList.toggle("hidden");      // add if absent, remove if present`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "textContent vs innerHTML",
        body: `<p>Prefer <code>textContent</code> for plain text. <code>innerHTML</code> parses its
        string as HTML, so if you ever insert <em>user-provided</em> text with it, an attacker could
        inject a <code>&lt;script&gt;</code> — a vulnerability called <strong>XSS</strong>. React
        protects you from this by default, one of many reasons it exists. We cover XSS properly in
        Part B0.</p>`,
      })}

      <h2>Creating elements from data</h2>
      <p>To render a list, you create elements and append them. Here's the manual pattern — watch how
      much ceremony it takes:</p>

      ${h.codePane({
        lang: "js",
        title: "Building a list by hand",
        readOnly: true,
        code: `const tasks = ["Buy milk", "Walk dog", "Write code"];
const list = document.querySelector("#task-list"); // a <ul>

list.innerHTML = ""; // clear existing

for (const task of tasks) {
  const li = document.createElement("li");
  li.textContent = task;
  list.appendChild(li);
}`,
      })}

      <h2>The render function pattern</h2>
      <p>
        A clean approach: write one <code>render()</code> function that rebuilds the UI from your data,
        and call it whenever the data changes. This is a hand-rolled version of React's core idea.
      </p>

      ${h.codePane({
        lang: "js",
        title: "Data-driven rendering",
        readOnly: true,
        code: `let tasks = ["Buy milk", "Walk dog"];
const list = document.querySelector("#task-list");

function render() {
  list.innerHTML = tasks
    .map((task) => \`<li>\${task}</li>\`)
    .join("");
}

render();                 // initial paint
tasks.push("Write code"); // change the data...
render();                 // ...and re-render to reflect it`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Feel the pain — it's the point",
        body: `<p>Manually keeping the DOM in sync with your data — remembering to call
        <code>render()</code> after every change, rebuilding everything or surgically patching pieces —
        is tedious and bug-prone at scale. <strong>This exact pain is why React was created.</strong>
        You declare what the UI should be for the current data, and React handles the syncing,
        efficiently. Experiencing the manual version now is what will make you appreciate (and
        correctly use) React later.</p>`,
      })}

      ${h.exercise({
        title: "Render your dashboard from data",
        prompt: `<p>In <code>index.html</code> add a <code>&lt;ul id="task-list"&gt;&lt;/ul&gt;</code>.
        In <code>main.js</code>, keep your tasks in an array and write a single <code>render()</code>
        that paints them via <code>map().join("")</code>. Add a task to the array and call
        <code>render()</code> again. Notice every place you had to remember to re-render — that mental
        overhead is what React removes.</p>`,
        runHint: "pnpm js",
      })}
    </section>
  `,
});
