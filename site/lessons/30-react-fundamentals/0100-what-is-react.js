/* Lesson 30-react-fundamentals/0100 — What React is & the mental model. */
registerLesson({
  meta: {
    id: "30-react-fundamentals/0100-what-is-react",
    title: "What React Is & the Mental Model",
    part: "30-react-fundamentals",
    estMinutes: 16,
    level: "beginner",
    project: "vite-fundamentals",
    lede: "You've built UIs by hand in vanilla JS — finding elements, changing them, remembering to re-render. React replaces all that with one powerful idea: your UI is a function of your data. Let's make that idea concrete.",
    objectives: [
      "Explain React's core formula: UI = f(state)",
      "Understand declarative vs imperative UI",
      "Know what a component is at a high level",
      "See why this scales where manual DOM code doesn't",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Remember the pain</h2>
      <p>
        In Part 10 you built a dashboard by hand: keep data in a variable, write a <code>render()</code>
        that paints the DOM, and <em>remember</em> to call it after every change. That last part — keeping
        the screen in sync with your data — was tedious and easy to get wrong. As apps grow, it becomes
        unmanageable. <strong>React exists to do that syncing for you.</strong>
      </p>

      <h2>The one formula: UI = f(state)</h2>
      <p>
        React's entire philosophy fits in one line: <strong>your UI is a function of your state</strong>.
        You write a function that takes your data and returns a description of what the screen should look
        like. When the data changes, React calls your function again and efficiently updates the real DOM
        to match. You never touch the DOM directly.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "The idea, in miniature",
        readOnly: true,
        code: `// You describe WHAT the UI should be for the current data...
function Greeting({ name }: { name: string }) {
  return <h1>Hello, {name}!</h1>;
}

// ...React handles HOW to make the DOM show that, and keeps it
// in sync when 'name' changes. No querySelector, no manual updates.`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Declarative beats imperative",
        body: `<p>Vanilla DOM code is <strong>imperative</strong>: a list of commands ("find this element,
        change that text, append this node"). React is <strong>declarative</strong>: you declare the
        end-state you want, and the system figures out the steps. You experienced this exact shift with
        <code>map</code> vs hand-written loops in Part 10. Declarative code is shorter, less buggy, and —
        crucially — <em>composable</em>. This single mental shift is the heart of modern UI engineering,
        and it recurs in everything from CSS to infrastructure-as-code.</p>`,
      })}

      <h2>Components: the building blocks</h2>
      <p>
        A React app is built from <strong>components</strong> — reusable, self-contained pieces of UI.
        A component is just a function that returns what to display. You compose small components into
        bigger ones, the same way you composed small functions into programs in Part 10.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "Components compose",
        readOnly: true,
        code: `function Avatar() { return <img src="/me.png" alt="" />; }
function UserName() { return <span>Ada Lovelace</span>; }

function UserCard() {
  // Build bigger UI by combining smaller components:
  return (
    <div className="card">
      <Avatar />
      <UserName />
    </div>
  );
}`,
      })}

      ${h.callout({
        kind: "note",
        title: "A React component is a function",
        body: `<p>Everything you learned about functions in Part 10 applies: components take inputs
        (called <strong>props</strong>), return output (UI), and the best ones are <em>pure</em> — same
        inputs, same output, no surprises. React is, at its core, "functions that return UI." Your
        JavaScript foundation is doing real work here.</p>`,
      })}

      <h2>Why this scales</h2>
      <ul>
        <li><strong>You stop managing the DOM.</strong> No more "did I remember to update that element?" React diffs the old and new descriptions and patches only what changed.</li>
        <li><strong>UI becomes predictable.</strong> Given the same state, you get the same screen — easy to reason about and test.</li>
        <li><strong>Pieces are reusable.</strong> A <code>Button</code> or <code>UserCard</code> component is written once and used everywhere.</li>
      </ul>

      ${h.callout({
        kind: "principal",
        title: "React is a library, not a framework",
        body: `<p>React focuses on one thing: building user interfaces from components. It deliberately
        leaves routing, data fetching, and build tooling to other tools you'll add (and learn) — TanStack
        Query, a router, Vite, or a full framework like Next.js. This "do one thing well" design is why
        React is everywhere: web, mobile (React Native), even other surfaces. You're learning the
        foundation that the entire ecosystem builds on.</p>`,
      })}

      ${h.exercise({
        title: "Prime your mental model",
        prompt: `<p>Before writing any React, look at the <code>vite-fundamentals</code> project's
        <code>src/App.tsx</code>. Notice it's just a function returning UI — that's a component. In the
        next lesson you'll run it. For now, answer for yourself: in the formula <em>UI = f(state)</em>,
        what was the "f" and what was the "state" in your Part 10 dashboard? Recognizing that you already
        did this manually is the key that makes React feel familiar, not foreign.</p>`,
        runHint: "",
      })}
    </section>
  `,
});
