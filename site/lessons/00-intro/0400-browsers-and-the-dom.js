/* Lesson 00-intro/0400 — Browsers, the DOM, and the render pipeline. */
registerLesson({
  meta: {
    id: "00-intro/0400-browsers-and-the-dom",
    title: "Browsers, the DOM & the Render Pipeline",
    part: "00-intro",
    estMinutes: 16,
    level: "beginner",
    project: null,
    lede: "React's entire job is to manage what you see in the browser. To understand React, you first need to understand the thing it controls: the DOM, and how a browser turns code into pixels.",
    objectives: [
      "Describe what a browser does with HTML, CSS, and JavaScript",
      "Explain what the DOM is and why it's a tree",
      "Understand how JavaScript can change a page live",
      "See, at a high level, the problem React was invented to solve",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>A browser is a rendering engine</h2>
      <p>
        A web browser takes the files a server sends — HTML, CSS, JavaScript — and turns them into
        the visual, interactive page on your screen. It does this in stages, often called the
        <strong>render pipeline</strong>:
      </p>
      <ol>
        <li><strong>Parse the HTML</strong> into a tree of objects (the DOM — more on this in a second).</li>
        <li><strong>Parse the CSS</strong> to figure out how each element should look.</li>
        <li><strong>Layout</strong> — calculate where every element goes and how big it is.</li>
        <li><strong>Paint</strong> — fill in the actual pixels: colors, text, images.</li>
        <li><strong>Run JavaScript</strong>, which can change any of the above — triggering parts of the pipeline to run again.</li>
      </ol>

      <h2>The DOM: your page as a tree of objects</h2>
      <p>
        When the browser parses HTML, it doesn't keep it as text. It builds a living model of the
        page in memory called the <strong>DOM</strong> — the <strong>D</strong>ocument
        <strong>O</strong>bject <strong>M</strong>odel. Every tag becomes a node, and because tags
        nest inside each other, the result is a <strong>tree</strong>.
      </p>
      <p>This HTML…</p>

      ${h.codePane({
        lang: "html",
        title: "index.html",
        readOnly: true,
        code: `<body>
  <header>
    <h1>My Page</h1>
  </header>
  <main>
    <p>Hello <strong>world</strong>!</p>
  </main>
</body>`,
      })}

      <p>…becomes this tree in the browser's memory:</p>

      ${h.codePane({
        lang: "markdown",
        title: "The DOM tree",
        readOnly: true,
        code: `body
├── header
│   └── h1  ("My Page")
└── main
    └── p   ("Hello ")
        └── strong  ("world")`,
      })}

      ${h.callout({
        kind: "note",
        body: `<p>"DOM" gets used loosely to mean "the page as the browser sees it right now." When
        someone says "update the DOM," they mean "change what's on the page." The DOM is the
        <em>live</em> version — it can differ from the original HTML once JavaScript starts editing it.</p>`,
      })}

      <h2>JavaScript can rewrite the page live</h2>
      <p>
        Here's the magic that makes web apps possible: JavaScript can reach into the DOM and change
        it after the page has loaded — add elements, remove them, change text, respond to clicks.
        The page updates instantly, no reload needed.
      </p>
      <p>This is "vanilla" DOM code — no React yet — that changes a heading when a button is clicked:</p>

      ${h.codePane({
        lang: "js",
        title: "vanilla-dom.js",
        readOnly: true,
        code: `// Find elements in the DOM tree
const heading = document.querySelector("h1");
const button = document.querySelector("button");

// When the button is clicked, change the heading's text
button.addEventListener("click", () => {
  heading.textContent = "You clicked it! 🎉";
});`,
      })}

      <p>
        That works fine for one heading and one button. But imagine an app like Instagram or a
        spreadsheet, where thousands of elements depend on data that's constantly changing. Manually
        finding the right elements and updating each one — in the right order, without missing any —
        becomes a nightmare of fragile, buggy code.
      </p>

      <h2>The problem React solves (in one paragraph)</h2>
      <p>
        Instead of you writing step-by-step instructions to <em>change</em> the DOM, React lets you
        <strong>describe what the page should look like for the current data</strong>, and React
        figures out the minimal set of DOM changes needed to make that true. You write the
        "what it should be"; React handles the tedious, error-prone "how to get there." When your
        data changes, you just describe the new picture, and React efficiently updates the DOM to
        match.
      </p>

      ${h.callout({
        kind: "principal",
        title: "Declarative vs. imperative — the idea under all of React",
        body: `<p>The vanilla code above is <strong>imperative</strong>: a list of commands ("find
        this, then change that"). React is <strong>declarative</strong>: you declare the end result
        and let the system reach it. This single shift — from <em>how</em> to <em>what</em> — is the
        most important mental change in the whole course, and it shows up again in CSS, data fetching,
        and infrastructure. Start noticing it everywhere.</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        body: `<p>The DOM is famously <strong>slow</strong> to change in big batches, which is partly
        why naive "just update everything" code feels janky. React minimizes and batches DOM updates
        for you — but it's not magic, and in Part B0 you'll learn to profile and tune exactly this.</p>`,
      })}

      ${h.exercise({
        title: "Edit a real page by hand",
        prompt: `<p>Go to any website, open Developer Tools (<kbd>F12</kbd>), and click the
        <strong>Elements</strong> (or "Inspector") tab. This is the DOM tree, live. Double-click some
        text and change it, or right-click a node and delete it. The page updates instantly. You're
        editing the DOM directly — exactly the thing React will soon manage for you. (Reloading
        restores everything; you're only changing your local copy.)</p>`,
        runHint: "",
      })}
    </section>
  `,
});
