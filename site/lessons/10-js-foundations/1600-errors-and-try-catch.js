/* Lesson 10-js-foundations/1600 — Errors & try/catch. */
registerLesson({
  meta: {
    id: "10-js-foundations/1600-errors-and-try-catch",
    title: "Errors & try / catch",
    part: "10-js-foundations",
    estMinutes: 15,
    level: "intermediate",
    project: "js-foundations",
    lede: "Things go wrong: a network drops, input is invalid, a file is missing. Handling errors gracefully — instead of letting your app crash — is what separates a demo from a real product.",
    objectives: [
      "Understand how errors propagate and stop programs",
      "Catch and handle errors with try/catch/finally",
      "Throw your own meaningful errors",
      "Adopt a healthy philosophy of failure handling",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>What an error does</h2>
      <p>
        When JavaScript hits an error it can't continue past, it <strong>throws</strong> — execution
        stops and the error bubbles up. Unhandled, it halts that chunk of work and logs to the console
        (and in a real app, can break the page):
      </p>

      ${h.codePane({
        lang: "js",
        title: "An uncaught error",
        editable: true,
        code: `function getLength(value) {
  return value.length; // crashes if value is null/undefined
}

console.log(getLength("hello")); // 5
console.log(getLength(null));    // 💥 throws — code below won't run
console.log("This line never runs");`,
      })}

      <h2><code>try</code> / <code>catch</code></h2>
      <p>Wrap risky code in <code>try</code>; if anything throws, control jumps to <code>catch</code>
      with the error object, and your program keeps going:</p>

      ${h.codePane({
        lang: "js",
        title: "Catching errors",
        editable: true,
        code: `function safeParse(text) {
  try {
    return JSON.parse(text);     // throws on invalid JSON
  } catch (error) {
    console.log("Couldn't parse:", error.message);
    return null;                 // a sensible fallback
  }
}

console.log(safeParse('{"ok":true}')); // { ok: true }
console.log(safeParse("not json"));     // logs the error, returns null
console.log("Program continues normally");`,
      })}

      <h2><code>finally</code>: always runs</h2>
      ${h.codePane({
        lang: "js",
        title: "finally",
        editable: true,
        code: `function load() {
  let loading = true;
  try {
    // ... do risky work ...
    return "data";
  } catch (e) {
    return "error";
  } finally {
    loading = false; // runs whether we succeeded OR failed
    console.log("Loading flag cleared");
  }
}
console.log(load());`,
      })}

      <h2>Throwing your own errors</h2>
      <p>You can <code>throw</code> deliberately to signal "this should not happen" with a clear
      message — far better than letting bad data flow silently downstream:</p>

      ${h.codePane({
        lang: "js",
        title: "throw",
        editable: true,
        code: `function withdraw(balance, amount) {
  if (amount <= 0) {
    throw new Error("Amount must be positive");
  }
  if (amount > balance) {
    throw new Error("Insufficient funds");
  }
  return balance - amount;
}

try {
  withdraw(100, 150);
} catch (e) {
  console.log("Blocked:", e.message); // "Blocked: Insufficient funds"
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "A philosophy of failure",
        body: `<p>Good engineers don't try to prevent every possible error — they decide, for each
        failure, whether to <strong>handle</strong> it (recover, show a friendly message),
        <strong>propagate</strong> it (let a higher layer deal with it), or <strong>fail loudly</strong>
        (crash early on a true bug so it gets fixed). Catching an error just to ignore it
        (<code>catch (e) {}</code>) is usually a trap — it hides problems until they're worse. Handle
        errors at the layer that can actually do something useful about them.</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        body: `<p><code>try/catch</code> only catches errors thrown <em>synchronously</em> inside the
        try block. Errors inside callbacks that run later, or in promises, need their own handling —
        which is exactly why <code>async/await</code> (a few lessons ahead) pairs so nicely with
        <code>try/catch</code> for network calls.</p>`,
      })}

      ${h.exercise({
        title: "Validate dashboard input",
        prompt: `<p>Write an <code>addTask(text)</code> that <code>throw</code>s an Error if
        <code>text</code> is empty or only whitespace, and otherwise returns a new task object. Call it
        inside a <code>try/catch</code> from a "form handler" function: on success, log the task; on
        failure, log a friendly message. You've just built the validation backbone every real form
        needs.</p>`,
        runHint: "pnpm js",
      })}
    </section>
  `,
});
