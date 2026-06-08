/* Lesson 00-intro/0800 — Reading docs, errors, and asking good questions. */
registerLesson({
  meta: {
    id: "00-intro/0800-reading-docs-and-errors",
    title: "Reading Docs, Errors & Asking Good Questions",
    part: "00-intro",
    estMinutes: 18,
    level: "beginner",
    project: null,
    lede: "The single highest-leverage skill in programming isn't memorizing syntax — it's debugging and finding answers. Error messages are help, not failure. Let's learn to read them.",
    objectives: [
      "Reframe errors as useful information instead of failure",
      "Read a stack trace and find the line that matters",
      "Use official docs effectively (and trust them over random blogs)",
      "Ask questions that actually get answered",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Errors are your best friend (really)</h2>
      <p>
        Beginners see a red error message and feel they did something wrong. Flip that completely: an
        error is the computer <strong>helpfully telling you exactly where it got stuck</strong>. A
        program that fails loudly with a clear message is far kinder than one that silently does the
        wrong thing. You will read thousands of errors. Learning to read them calmly is a real skill —
        and a fast one to acquire.
      </p>

      ${h.callout({
        kind: "principal",
        title: "Debugging is the job",
        body: `<p>Professional developers spend more time reading and fixing code than writing new
        code. Senior engineers aren't people who never hit errors — they hit them constantly and
        resolve them quickly and methodically. The goal isn't to avoid errors; it's to get
        <em>great</em> at responding to them.</p>`,
      })}

      <h2>Anatomy of an error message</h2>
      <p>Here's a typical JavaScript error. It looks scary; it's actually a precise map:</p>

      ${h.codePane({
        lang: "bash",
        title: "A real error message",
        readOnly: true,
        code: `TypeError: Cannot read properties of undefined (reading 'name')
    at showUser (app.js:14:23)
    at handleClick (app.js:31:5)
    at HTMLButtonElement.onclick (index.html:1:1)`,
      })}

      <p>Read it top-to-bottom:</p>
      <ul>
        <li><strong>The first line is the <em>what</em>:</strong> "Cannot read properties of undefined
        (reading 'name')." Translation: you tried to read <code>.name</code> from something that was
        <code>undefined</code> (i.e. didn't exist).</li>
        <li><strong>The lines below are the <em>where</em></strong> — the "stack trace." The
        <strong>top</strong> one, <code>app.js:14:23</code>, is the most specific: file
        <code>app.js</code>, line <code>14</code>, column <code>23</code>. <em>Start there.</em></li>
        <li>The rest shows the chain of calls that led there — useful context, but read it later.</li>
      </ul>

      ${h.callout({
        kind: "tip",
        body: `<p>A method for every error: <strong>(1)</strong> read the first line and translate it to
        plain English, <strong>(2)</strong> jump to the top file:line in the trace, <strong>(3)</strong>
        look at that exact line and the values feeding into it. 80% of bugs are solved by just
        <em>actually reading</em> the message instead of panicking.</p>`,
      })}

      <h2>Use the official docs</h2>
      <p>
        For everything in this course there is an authoritative source. Prefer these over random blog
        posts, which can be outdated or wrong:
      </p>
      <ul>
        <li><strong>MDN Web Docs</strong> (developer.mozilla.org) — the bible for HTML, CSS, and JavaScript.</li>
        <li><strong>react.dev</strong> — the official React docs, with interactive examples.</li>
        <li><strong>nextjs.org/docs</strong>, <strong>docs.expo.dev</strong>, and each library's own site.</li>
      </ul>

      ${h.callout({
        kind: "gotcha",
        body: `<p>The web is full of <strong>outdated</strong> tutorials. A 2019 React article may teach
        class components and patterns we no longer use. Always check the date, and when in doubt, trust
        the official docs — they match the version you're actually running.</p>`,
      })}

      <h2>How to search effectively</h2>
      <p>Good searches get good answers. Some habits:</p>
      <ul>
        <li><strong>Paste the error message</strong> (minus your specific filenames) straight into a search engine.</li>
        <li>Include the <strong>technology and version</strong>: "react 19 useEffect cleanup" beats "react effect not working."</li>
        <li>Skim multiple results; cross-check rather than trusting the first hit.</li>
      </ul>

      ${h.callout({
        kind: "note",
        title: "On AI assistants",
        body: `<p>AI tools (including me) are fantastic accelerators — for explaining errors, generating
        examples, and exploring ideas. But they can confidently state wrong things, especially about the
        newest releases. Use them to learn faster, then <strong>verify against official docs and by
        running the code yourself.</strong> The goal is to build your own understanding, not to outsource
        it.</p>`,
      })}

      <h2>Asking a question that gets answered</h2>
      <p>When you ask a human (or an AI) for help, include four things:</p>
      <ol>
        <li><strong>What you're trying to do</strong> (the goal).</li>
        <li><strong>What you tried</strong> (the relevant code).</li>
        <li><strong>What happened</strong> (the exact error message).</li>
        <li><strong>What you expected</strong> instead.</li>
      </ol>
      <p>
        Often, the act of writing this up clearly makes you spot the answer yourself — that's the famous
        "rubber duck debugging": explaining the problem out loud, even to a rubber duck, untangles it.
      </p>

      ${h.exercise({
        title: "Decode an error",
        prompt: `<p>Read this error and answer three questions in your head: What went wrong? Which file
        and line should you look at first? What value was probably missing?</p>
        <p><code>ReferenceError: total is not defined &nbsp; at calculateCart (cart.js:8:10)</code></p>
        <p>(Answer: a name <code>total</code> was used before it was created/defined; look at
        <code>cart.js</code> line 8; you likely forgot to declare <code>total</code> or misspelled it.)</p>`,
        runHint: "",
      })}
    </section>
  `,
});
