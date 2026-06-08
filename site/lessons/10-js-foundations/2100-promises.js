/* Lesson 10-js-foundations/2100 — Async II: Promises. */
registerLesson({
  meta: {
    id: "10-js-foundations/2100-promises",
    title: "Async II: Promises",
    part: "10-js-foundations",
    estMinutes: 16,
    level: "intermediate",
    project: "js-foundations",
    lede: "A promise is a placeholder for a value that isn't ready yet — the modern foundation of all async JavaScript. Understand promises and async/await becomes trivial.",
    objectives: [
      "Explain what a promise represents and its three states",
      "Consume promises with .then() and .catch()",
      "Handle multiple promises with Promise.all",
      "See how promises flatten callback hell",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>A promise is an IOU</h2>
      <p>
        A <strong>promise</strong> represents a value that will exist <em>eventually</em> — like a
        receipt you can hold now and exchange for the result later. It's in one of three states:
      </p>
      <ul>
        <li><strong>pending</strong> — still working.</li>
        <li><strong>fulfilled</strong> — done, with a value.</li>
        <li><strong>rejected</strong> — failed, with an error.</li>
      </ul>

      <h2>Consuming a promise: <code>.then()</code> / <code>.catch()</code></h2>
      <p>Many functions return promises. You attach <code>.then()</code> for success and
      <code>.catch()</code> for failure:</p>

      ${h.codePane({
        lang: "js",
        title: ".then / .catch",
        readOnly: true,
        code: `// fetch() returns a promise — it's the browser's way to call a server
fetch("https://api.example.com/user")
  .then((response) => response.json()) // .json() ALSO returns a promise
  .then((user) => {
    console.log("Got user:", user.name);
  })
  .catch((error) => {
    console.log("Something failed:", error.message);
  });

console.log("Request started..."); // runs first — fetch is async`,
      })}

      ${h.callout({
        kind: "note",
        title: "Chaining flattens the pyramid",
        body: `<p>Each <code>.then()</code> returns a new promise, so you chain them in a flat line
        instead of nesting. Return a value (or another promise) from one <code>.then</code> and the next
        receives it. One <code>.catch()</code> at the end handles errors from the whole chain — a huge
        improvement over callback hell.</p>`,
      })}

      <h2>The chain vs. the pyramid</h2>
      ${h.codePane({
        lang: "js",
        title: "Dependent steps, flat",
        readOnly: true,
        code: `fetchUser(1)
  .then((user) => fetchPosts(user.id))   // return another promise
  .then((posts) => fetchComments(posts[0].id))
  .then((comments) => console.log(comments))
  .catch((err) => console.log("Failed somewhere:", err.message));
// Compare to the nested callback version — same logic, far clearer.`,
      })}

      <h2>Running promises in parallel: <code>Promise.all</code></h2>
      <p>When tasks don't depend on each other, run them together and wait for all to finish — much
      faster than one-after-another:</p>

      ${h.codePane({
        lang: "js",
        title: "Promise.all",
        readOnly: true,
        code: `const results = await Promise.all([
  fetch("/api/user").then((r) => r.json()),
  fetch("/api/posts").then((r) => r.json()),
  fetch("/api/notifications").then((r) => r.json()),
]);
// results is an array: [user, posts, notifications]
// All three requests fly at once; you wait only for the slowest.
// (Promise.allSettled waits for all even if some reject.)`,
      })}

      <h2>Creating a promise (occasionally useful)</h2>
      ${h.codePane({
        lang: "js",
        title: "new Promise",
        editable: true,
        code: `function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms); // resolve when the timer fires
  });
}

wait(1000).then(() => console.log("1 second passed"));
// A handy 'sleep' you can await. You'll mostly CONSUME promises
// from libraries rather than create them by hand.`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Promises are the bedrock",
        body: `<p>Nearly every modern async API — <code>fetch</code>, file access, databases, timers —
        is promise-based. <code>async/await</code> (next lesson) is just nicer syntax <em>on top of</em>
        promises; under the hood it's still these three states. And React's newest features
        (Suspense, the <code>use()</code> hook) consume promises directly. This concept pays dividends
        for the rest of the course.</p>`,
      })}

      ${h.exercise({
        title: "Fetch real data",
        prompt: `<p>In your dashboard, use <code>fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")</code>
        with <code>.then(r =&gt; r.json())</code> to load 5 sample todos, then <code>.then()</code> to
        render their titles into your list, and <code>.catch()</code> to show an error message. You just
        pulled live data from the internet into your app — a milestone.</p>`,
        runHint: "pnpm js",
      })}
    </section>
  `,
});
