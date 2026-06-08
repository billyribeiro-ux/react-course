/* Lesson 10-js-foundations/1800 — Events & event handling. */
registerLesson({
  meta: {
    id: "10-js-foundations/1800-events",
    title: "Events: Responding to the User",
    part: "10-js-foundations",
    estMinutes: 17,
    level: "intermediate",
    project: "js-foundations",
    lede: "Clicks, typing, submitting forms — events are how your app hears from the user. The patterns you learn here map almost one-to-one onto React event handlers.",
    objectives: [
      "Listen for events with addEventListener",
      "Read information from the event object",
      "Handle form submissions and input changes",
      "Connect events to your render() to build interactivity",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Listening for events</h2>
      <p>
        <code>addEventListener</code> runs a function whenever a named event fires on an element. The
        function (the "handler" or "callback") receives an <strong>event object</strong> with details:
      </p>

      ${h.codePane({
        lang: "js",
        title: "A click handler",
        readOnly: true,
        code: `const button = document.querySelector("#add-btn");

button.addEventListener("click", (event) => {
  console.log("Clicked!", event);
});

// Common events: "click", "input", "change", "submit",
// "keydown", "mouseover", "focus", "blur"`,
      })}

      <h2>Reading from inputs</h2>
      <p>The <code>"input"</code> event fires on every keystroke; <code>event.target</code> is the
      element, and <code>.value</code> holds its current text:</p>

      ${h.codePane({
        lang: "js",
        title: "Live input",
        readOnly: true,
        code: `const field = document.querySelector("#task-input");

field.addEventListener("input", (event) => {
  console.log("Current value:", event.target.value);
});`,
      })}

      ${h.callout({
        kind: "principal",
        title: "This is the seed of controlled inputs",
        body: `<p>"Listen to the input event, read <code>event.target.value</code>" becomes, in React, a
        <em>controlled component</em>: <code>onChange={(e) =&gt; setText(e.target.value)}</code>. The
        event object and <code>.target.value</code> are identical. Everything you learn about DOM events
        transfers directly — React just gives it a tidier home.</p>`,
      })}

      <h2>Handling form submission</h2>
      <p>
        Forms fire a <code>"submit"</code> event. By default the browser reloads the page on submit —
        a relic of the old web. Call <code>event.preventDefault()</code> to stop that and handle it
        with JavaScript instead:
      </p>

      ${h.codePane({
        lang: "js",
        title: "Form handling",
        readOnly: true,
        code: `const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");

form.addEventListener("submit", (event) => {
  event.preventDefault();        // stop the page reload
  const text = input.value.trim();
  if (!text) return;             // ignore empty
  tasks.push(text);              // update data
  input.value = "";              // clear the field
  render();                      // re-paint the list
});`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Forgetting preventDefault",
        body: `<p>If your form-handling code seems to "flash and reset," you probably forgot
        <code>event.preventDefault()</code> — the page is reloading and wiping your JavaScript state.
        It's one of the most common beginner head-scratchers.</p>`,
      })}

      <h2>The full interactive loop</h2>
      <p>Putting it together, you now have the complete cycle of an interactive app, by hand:</p>
      <ol>
        <li><strong>Data</strong> lives in variables (e.g. a <code>tasks</code> array).</li>
        <li><strong>render()</strong> paints the DOM from that data.</li>
        <li><strong>Events</strong> change the data, then call <code>render()</code> again.</li>
      </ol>

      ${h.callout({
        kind: "principal",
        title: "You just described React's architecture",
        body: `<p>Data → render → events change data → render again. That loop <em>is</em> React's model:
        state drives the UI, user events update state, the UI re-renders. The difference is that React
        does step 2 and the "call render again" plumbing for you, efficiently and automatically. You're
        building the exact mental model that makes React click — not memorizing magic.</p>`,
      })}

      ${h.exercise({
        title: "Make your task list interactive",
        prompt: `<p>Add a form (<code>#task-form</code> with an <code>#task-input</code> and a submit
        button) to your dashboard. On submit: prevent default, read and trim the value, push it to
        <code>tasks</code>, clear the input, and re-render. Bonus: add a "clear all" button with a
        <code>click</code> handler that empties the array and re-renders. You've built a working to-do
        app in pure JavaScript — and you understand every line.</p>`,
        runHint: "pnpm js",
      })}
    </section>
  `,
});
