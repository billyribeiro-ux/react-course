/* Lesson 00-intro/0500 — HTML, CSS, JS: the three roles. */
registerLesson({
  meta: {
    id: "00-intro/0500-html-css-js",
    title: "HTML, CSS & JavaScript — The Three Roles",
    part: "00-intro",
    estMinutes: 15,
    level: "beginner",
    project: null,
    lede: "Every web page is built from three technologies, each with one job: structure, style, and behavior. Knowing which is which keeps you oriented for the entire course.",
    objectives: [
      "Name the single responsibility of HTML, CSS, and JavaScript",
      "Read a basic HTML document and CSS rule",
      "See how the three combine into one page",
      "Understand where React sits among them",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Structure, style, behavior</h2>
      <p>There's a classic analogy. A web page is like a person:</p>
      <ul>
        <li><strong>HTML</strong> is the <em>skeleton</em> — the structure and content. What's actually there: headings, paragraphs, buttons, images.</li>
        <li><strong>CSS</strong> is the <em>clothing and appearance</em> — colors, fonts, spacing, layout. How it looks.</li>
        <li><strong>JavaScript</strong> is the <em>brain and muscles</em> — behavior and interactivity. What happens when you click, type, or scroll.</li>
      </ul>

      ${h.callout({
        kind: "principal",
        title: "Separation of concerns",
        body: `<p>Keeping <em>structure</em>, <em>presentation</em>, and <em>behavior</em> separate is
        an example of "separation of concerns" — giving each piece one clear job. It's one of the
        oldest, most durable principles in software. React actually blends HTML and JS back together
        on purpose (you'll see why), but the underlying discipline of "one responsibility per thing"
        never goes away.</p>`,
      })}

      <h2>HTML — the content and structure</h2>
      <p>
        HTML uses <strong>tags</strong> wrapped in angle brackets to label content. Most come in
        pairs: an opening tag <code>&lt;p&gt;</code> and a closing tag <code>&lt;/p&gt;</code>, with
        content in between. Tags nest to form the tree you saw in the last lesson.
      </p>

      ${h.codePane({
        lang: "html",
        title: "page.html",
        readOnly: true,
        code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>My First Page</title>
  </head>
  <body>
    <h1>Welcome</h1>
    <p>This is a paragraph of text.</p>
    <button>Click me</button>
  </body>
</html>`,
      })}

      <p>
        <code>&lt;h1&gt;</code> is a top-level heading, <code>&lt;p&gt;</code> a paragraph,
        <code>&lt;button&gt;</code> a button. The <code>&lt;head&gt;</code> holds information
        <em>about</em> the page (like its title); the <code>&lt;body&gt;</code> holds what you
        actually see.
      </p>

      <h2>CSS — the appearance</h2>
      <p>
        CSS attaches visual styles to HTML elements. A CSS <strong>rule</strong> picks elements with a
        <strong>selector</strong> and lists style <strong>declarations</strong> (property: value):
      </p>

      ${h.codePane({
        lang: "css",
        title: "styles.css",
        readOnly: true,
        code: `/* Select every <h1> and style it */
h1 {
  color: rebeccapurple;   /* property: value */
  font-size: 40px;
}

button {
  background: black;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
}`,
      })}

      ${h.callout({
        kind: "note",
        body: `<p>You'll go deep on CSS in Part 60 (including modern Tailwind v4). For now you just
        need to recognize the shape: <em>"pick some elements, then describe how they should look."</em></p>`,
      })}

      <h2>JavaScript — the behavior</h2>
      <p>
        JavaScript makes the page <em>do</em> things. It's the only one of the three that's a full
        programming language with logic, decisions, and data — and it's the heart of this course.
      </p>

      ${h.codePane({
        lang: "js",
        title: "script.js",
        readOnly: true,
        code: `const button = document.querySelector("button");
let clicks = 0;

button.addEventListener("click", () => {
  clicks = clicks + 1;
  button.textContent = "Clicked " + clicks + " times";
});`,
      })}

      <h2>The three together</h2>
      <p>
        A real page wires all three: the HTML links to the CSS and JS files. The browser loads the
        HTML, applies the CSS, and runs the JS:
      </p>

      ${h.codePane({
        lang: "html",
        title: "index.html (wiring it all up)",
        readOnly: true,
        code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>All three</title>
    <link rel="stylesheet" href="styles.css" />  <!-- the CSS -->
  </head>
  <body>
    <h1>Welcome</h1>
    <button>Click me</button>
    <script src="script.js"></script>             <!-- the JS -->
  </body>
</html>`,
      })}

      ${h.callout({
        kind: "tip",
        body: `<p>Notice the <code>&lt;script&gt;</code> sits at the <em>bottom</em> of the body. That's
        a classic habit so the HTML elements exist in the DOM before the JavaScript tries to find them.
        Tools handle this for us now, but the reasoning is good to know.</p>`,
      })}

      <h2>Where React fits</h2>
      <p>
        React is a <strong>JavaScript library</strong> — so it lives in the "behavior" layer. But its
        twist is that you write your HTML structure <em>inside</em> your JavaScript, using a syntax
        called <strong>JSX</strong> that looks like HTML. Styling can be plain CSS, Tailwind, or other
        approaches you'll learn. So React doesn't replace HTML, CSS, and JS — it's a powerful way to
        <em>organize and generate</em> them. Everything you learn here about the three roles stays
        true.
      </p>

      ${h.exercise({
        title: "Build a page with all three",
        prompt: `<p>You don't have your tools installed yet, but you can preview the idea: many online
        playgrounds (search "CodePen" or "online HTML editor") give you three boxes — HTML, CSS, JS —
        and a live preview. Type a heading and a button in the HTML box, color them in the CSS box, and
        make the button change its own text in the JS box. Seeing the three layers click together once,
        by hand, makes everything ahead feel natural. (We install proper local tools in the next two
        lessons.)</p>`,
        runHint: "",
      })}
    </section>
  `,
});
