/* Lesson 30-react-fundamentals/0300 — JSX in depth. */
registerLesson({
  meta: {
    id: "30-react-fundamentals/0300-jsx-in-depth",
    title: "JSX in Depth",
    part: "30-react-fundamentals",
    estMinutes: 18,
    level: "beginner",
    project: "vite-fundamentals",
    lede: "JSX is the HTML-like syntax inside your components. It looks like HTML but it's really JavaScript in disguise — and understanding what it compiles to makes its quirks obvious instead of mysterious.",
    objectives: [
      "Write JSX and embed JavaScript expressions with { }",
      "Know what JSX compiles to under the hood",
      "Master JSX's rules: one root, className, self-closing tags",
      "Avoid the most common JSX mistakes",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>JSX is JavaScript wearing an HTML costume</h2>
      <p>
        JSX lets you write markup directly in your JavaScript. It isn't a string and it isn't really HTML —
        it's syntax that the build tool <strong>compiles into function calls</strong>. This is real, valid
        JSX:
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "JSX",
        readOnly: true,
        code: `const element = <h1 className="title">Hello, React!</h1>;`,
      })}

      <p>Behind the scenes, that compiles to roughly:</p>

      ${h.codePane({
        lang: "tsx",
        title: "What JSX becomes",
        readOnly: true,
        code: `import { jsx } from "react/jsx-runtime";

const element = jsx("h1", { className: "title", children: "Hello, React!" });
// JSX is just a nicer way to write these function calls that
// describe UI. The element is a plain JavaScript object.`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Why this matters",
        body: `<p>Once you see that JSX is "JavaScript that returns objects describing UI," its rules stop
        feeling arbitrary. You can use JSX anywhere a value is allowed — store it in variables, return it
        from functions, put it in arrays. It's not a template language with special powers; it's
        expressions. That realization is what lets you wield it fluently.</p>`,
      })}

      <h2>Embedding JavaScript with <code>{ }</code></h2>
      <p>Curly braces drop you out of "markup mode" and into "JavaScript mode." Anything that produces a
      value goes inside:</p>

      ${h.codePane({
        lang: "tsx",
        title: "Expressions in JSX",
        readOnly: true,
        code: `function Welcome() {
  const name = "Ada";
  const hour = new Date().getHours();
  const tasks = ["Code", "Test", "Ship"];

  return (
    <div>
      <h1>Hello, {name}!</h1>                {/* a variable */}
      <p>It is {hour < 12 ? "morning" : "later"}.</p>  {/* a ternary */}
      <p>You have {tasks.length} tasks.</p>  {/* an expression */}
      <p>{name.toUpperCase()}</p>            {/* a method call */}
    </div>
  );
}`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Expressions only — not statements",
        body: `<p>Inside <code>{ }</code> you can put anything that <em>evaluates to a value</em>: variables,
        ternaries, function calls, <code>.map(...)</code>. You <strong>cannot</strong> put statements like
        <code>if</code>, <code>for</code>, or <code>let</code> there. Need an <code>if</code>? Use a ternary
        in the JSX, or compute the value in a normal statement <em>above</em> the <code>return</code>. This
        is the #1 JSX confusion, and "expressions vs statements" (Part 10) is exactly why.</p>`,
      })}

      <h2>JSX's rules</h2>
      <p>A handful of rules, each with a clear reason:</p>

      ${h.codePane({
        lang: "tsx",
        title: "The rules",
        check: false,
        readOnly: true,
        code: `// 1) Return ONE root element. Wrap siblings in a parent or a Fragment <>...</>:
function Bad() {
  return <h1>Title</h1><p>Text</p>; // ❌ two roots
}
function Good() {
  return (
    <>
      <h1>Title</h1>
      <p>Text</p>
    </>           {/* <> </> is a "Fragment": groups without adding a DOM node */}
  );
}

// 2) class → className (because 'class' is a reserved word in JS)
<div className="card" />

// 3) Every tag must close. Self-close void elements:
<img src="x.png" alt="" />   {/* not <img> */}
<br />

// 4) camelCase for most attributes & events:
<button onClick={handleClick} tabIndex={0} />`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "className, not class",
        body: `<p><code>class</code> is a reserved JavaScript keyword, so JSX uses <code>className</code>.
        Similarly <code>for</code> (on labels) becomes <code>htmlFor</code>. Forgetting this is a rite of
        passage — your editor and ESLint will remind you.</p>`,
      })}

      <h2>Comments, booleans, null</h2>
      ${h.codePane({
        lang: "tsx",
        title: "What renders and what doesn't",
        readOnly: true,
        code: `function Demo({ show }: { show: boolean }) {
  return (
    <div>
      {/* this is a JSX comment */}
      {show && <p>Visible only when show is true</p>}
      {null}      {/* null, undefined, false, true render NOTHING */}
      {0}         {/* but 0 DOES render as "0" — a classic gotcha! */}
    </div>
  );
}`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "The {0} trap",
        body: `<p><code>{items.length && &lt;List/&gt;}</code> looks fine until <code>items.length</code> is
        <code>0</code> — then it renders "0" on screen instead of nothing, because <code>0</code> is a
        renderable value. Use a real boolean: <code>{items.length > 0 && &lt;List/&gt;}</code>. This bites
        nearly everyone; remember it from Part 10's truthiness lesson.</p>`,
      })}

      ${h.exercise({
        title: "Build a profile card in JSX",
        prompt: `<p>In <code>App.tsx</code>, create a component that declares a few variables (name, a
        number of recipes, a list of cuisines) and renders them using <code>{ }</code> — including a
        ternary for a greeting and a <code>.map</code> over the cuisines into <code>&lt;li&gt;</code>
        elements. Deliberately try a two-root return and a <code>class</code> attribute to see the errors,
        then fix them. You're now reading and writing JSX fluently.</p>`,
        runHint: "pnpm vite",
      })}
    </section>
  `,
});
