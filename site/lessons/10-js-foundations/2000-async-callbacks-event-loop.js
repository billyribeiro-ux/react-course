/* Lesson 10-js-foundations/2000 — Async I: callbacks & the event loop. */
registerLesson({
  meta: {
    id: "10-js-foundations/2000-async-callbacks-event-loop",
    title: "Async I: Callbacks & the Event Loop",
    part: "10-js-foundations",
    estMinutes: 16,
    level: "intermediate",
    project: "js-foundations",
    lede: "Some things take time — fetching data, timers, file reads. JavaScript handles waiting without freezing, using an idea called the event loop. Understanding it demystifies async code for good.",
    objectives: [
      "Explain why JavaScript is single-threaded yet non-blocking",
      "Use callbacks for work that finishes later",
      "Build a correct mental model of the event loop",
      "Recognize why 'callback hell' motivated promises",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>One thread, but never frozen</h2>
      <p>
        JavaScript runs your code on a <strong>single thread</strong> — one thing at a time. So how does
        a page stay responsive while waiting 2 seconds for data from a server? The trick: slow
        operations are handed off to the environment (the browser/Node), and JavaScript keeps going.
        When the slow thing finishes, a function you provided — a <strong>callback</strong> — is queued
        to run.
      </p>

      ${h.codePane({
        lang: "js",
        title: "setTimeout: run later",
        editable: true,
        code: `console.log("1: First");

setTimeout(() => {
  console.log("3: Runs after ~1 second");
}, 1000);

console.log("2: Second");

// Output order:
// 1: First
// 2: Second
// 3: Runs after ~1 second   ← didn't block lines 1 and 2`,
      })}

      ${h.callout({
        kind: "note",
        title: "Asynchronous = 'not right now'",
        body: `<p>"Synchronous" code runs top-to-bottom, each line finishing before the next.
        "Asynchronous" code starts something that finishes <em>later</em>, letting the rest of the
        program continue meanwhile. That second line in the output is the whole point: JS didn't sit
        and wait.</p>`,
      })}

      <h2>The event loop, simply</h2>
      <p>Here's the model that explains it all:</p>
      <ol>
        <li>JavaScript runs your code on the <strong>call stack</strong>, one thing at a time.</li>
        <li>Slow operations (timers, network) are handed to the browser/Node to manage in the background.</li>
        <li>When one finishes, its callback waits in a <strong>queue</strong>.</li>
        <li>The <strong>event loop</strong> takes queued callbacks and runs them — but only when the
        call stack is empty (the current code has finished).</li>
      </ol>

      ${h.callout({
        kind: "gotcha",
        title: "Even setTimeout(fn, 0) waits",
        body: `<p><code>setTimeout(fn, 0)</code> doesn't run <code>fn</code> immediately — it queues it
        to run <em>after</em> the current code finishes. That's why "0ms" timers still print after your
        synchronous logs. The delay is a <em>minimum</em>, not a guarantee.</p>`,
      })}

      <h2>Callbacks for "when it's done"</h2>
      ${h.codePane({
        lang: "js",
        title: "Callback pattern",
        editable: true,
        code: `function fetchUser(id, onDone) {
  // pretend this takes time (e.g. a network request)
  setTimeout(() => {
    onDone({ id, name: "Ada" }); // call back with the result
  }, 500);
}

fetchUser(1, (user) => {
  console.log("Got user:", user.name); // runs after ~500ms
});
console.log("Request sent..."); // runs first`,
      })}

      <h2>Callback hell</h2>
      <p>When async steps depend on each other, nested callbacks pyramid sideways into something hard
      to read and error-handle:</p>

      ${h.codePane({
        lang: "js",
        title: "The problem promises solve",
        readOnly: true,
        code: `fetchUser(1, (user) => {
  fetchPosts(user.id, (posts) => {
    fetchComments(posts[0].id, (comments) => {
      // 😵 deeply nested, and error handling is a nightmare here
      console.log(comments);
    });
  });
});`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Why this history matters",
        body: `<p>You'll rarely write raw callbacks like this today — but understanding <em>why</em> they
        were painful is exactly why <strong>promises</strong> and <strong>async/await</strong> (the next
        two lessons) feel like such an upgrade. And the event-loop model you just built explains real
        React puzzles later: why state updates feel "delayed," why effects run after render, why some
        code runs "on the next tick." This is foundational, not trivia.</p>`,
      })}

      ${h.exercise({
        title: "Predict the order",
        prompt: `<p>Without running it, predict the output order of:
        <code>console.log("A"); setTimeout(() =&gt; console.log("B"), 0); console.log("C");</code>.
        Then run it in the console to check. (It's A, C, B.) Explain to yourself <em>why</em> B comes
        last even with a 0ms delay — that explanation is your event-loop understanding made real.</p>`,
        runHint: "pnpm js   # then use the console",
      })}
    </section>
  `,
});
