/* Lesson 10-js-foundations/2200 — Async III: async/await & fetch. */
registerLesson({
  meta: {
    id: "10-js-foundations/2200-async-await-fetch",
    title: "Async III: async / await & fetch",
    part: "10-js-foundations",
    estMinutes: 18,
    level: "intermediate",
    project: "js-foundations",
    lede: "async/await lets you write asynchronous code that reads top-to-bottom like ordinary code. Paired with fetch, it's how you'll talk to servers for the rest of your career.",
    objectives: [
      "Write async functions and await promises",
      "Handle errors with try/catch around await",
      "Fetch and parse JSON from an API end to end",
      "Avoid the common await pitfalls",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Promises, but readable</h2>
      <p>
        <code>async/await</code> is syntax built on promises. Mark a function <code>async</code>, then
        use <code>await</code> to pause until a promise resolves and get its value directly — no
        <code>.then()</code> nesting. The same logic from the last lesson, written like a story:
      </p>

      ${h.codePane({
        lang: "js",
        title: ".then chain vs async/await",
        readOnly: true,
        code: `// Promise chain:
function loadUser() {
  return fetch("/api/user")
    .then((r) => r.json())
    .then((user) => console.log(user.name));
}

// async/await — same thing, linear:
async function loadUser() {
  const response = await fetch("/api/user");
  const user = await response.json();
  console.log(user.name);
}`,
      })}

      ${h.callout({
        kind: "note",
        title: "await pauses, it doesn't block",
        body: `<p><code>await</code> pauses <em>this async function</em> until the promise settles, but
        the rest of your app keeps running (remember the event loop). It only looks like blocking code —
        under the hood it's still promises and the queue.</p>`,
      })}

      <h2>Error handling with try/catch</h2>
      <p>
        The <code>.catch()</code> of the chain world becomes a familiar <code>try/catch</code> — one of
        the nicest things about async/await:
      </p>

      ${h.codePane({
        lang: "js",
        title: "Robust fetching",
        readOnly: true,
        code: `async function loadTodos() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");

    if (!res.ok) {
      // fetch only rejects on network failure, NOT on 404/500 —
      // you must check res.ok yourself:
      throw new Error(\`Server responded \${res.status}\`);
    }

    const todos = await res.json();
    return todos;
  } catch (error) {
    console.log("Failed to load todos:", error.message);
    return []; // a safe fallback
  }
}`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "fetch doesn't throw on 404/500",
        body: `<p>This surprises everyone: <code>fetch</code> only rejects on a <em>network</em> failure
        (offline, DNS). A <code>404</code> or <code>500</code> is still a "successful" response as far as
        <code>fetch</code> is concerned — so you must check <code>response.ok</code> (or
        <code>response.status</code>) and throw yourself. (Libraries like TanStack Query in Part 70
        handle this for you, but know the raw behavior.)</p>`,
      })}

      <h2>Using an async function</h2>
      ${h.codePane({
        lang: "js",
        title: "Calling it",
        readOnly: true,
        code: `async function init() {
  const todos = await loadTodos();
  renderTodos(todos);
}
init();

// Note: an async function ALWAYS returns a promise.
// To get its value elsewhere, await it (inside another async fn)
// or use .then(). You can't 'await' at the top level of every file —
// though modern modules do allow top-level await.`,
      })}

      <h2>await in loops vs in parallel</h2>
      ${h.codePane({
        lang: "js",
        title: "Don't await sequentially when you can parallelize",
        readOnly: true,
        code: `// ❌ Slow — each await waits for the previous (3x the time):
for (const id of [1, 2, 3]) {
  const user = await fetchUser(id);
  console.log(user.name);
}

// ✅ Fast — fire all, await together:
const users = await Promise.all([1, 2, 3].map((id) => fetchUser(id)));
users.forEach((u) => console.log(u.name));`,
      })}

      ${h.callout({
        kind: "principal",
        title: "This is how all data fetching works",
        body: `<p>Async/await + fetch is the literal foundation of talking to servers: loading a user's
        profile, submitting a form, saving data. In React you'll do this inside effects, event handlers,
        and Server Components — but it's always this. Mastering it here means data fetching in React is
        already familiar, not a new mountain to climb.</p>`,
      })}

      ${h.exercise({
        title: "Refactor your fetch to async/await",
        prompt: `<p>Rewrite the todo-loading from the previous lesson using an <code>async</code>
        function with <code>try/catch</code> and a <code>res.ok</code> check. Add a "loading…" message
        before the await and clear it after. Then add a deliberate typo to the URL and confirm your
        <code>catch</code> shows a graceful error instead of crashing. Real apps live or die on this
        loading/error handling.</p>`,
        runHint: "pnpm js",
      })}
    </section>
  `,
});
