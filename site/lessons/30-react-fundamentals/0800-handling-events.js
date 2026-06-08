/* Lesson 30-react-fundamentals/0800 — Handling events. */
registerLesson({
  meta: {
    id: "30-react-fundamentals/0800-handling-events",
    title: "Handling Events",
    part: "30-react-fundamentals",
    estMinutes: 15,
    level: "beginner",
    project: "vite-fundamentals",
    lede: "Events are how users talk to your app. React's event handling mirrors the DOM events you learned in Part 10 — same mental model, cleaner syntax, fully typed.",
    objectives: [
      "Attach event handlers in JSX",
      "Pass arguments to handlers correctly",
      "Type events with TypeScript",
      "Avoid the common 'called immediately' mistake",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Handlers are props</h2>
      <p>
        You attach an event handler by passing a function to a camelCase prop like <code>onClick</code>,
        <code>onChange</code>, or <code>onSubmit</code>. This is the same idea as
        <code>addEventListener</code> from Part 10, but declarative — you describe the handler right where
        the element is:
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "onClick",
        readOnly: true,
        code: `function LikeButton() {
  function handleClick() {
    console.log("Liked!");
  }

  return <button onClick={handleClick}>Like</button>;
  //                    ^ pass the function — do NOT call it
}`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Pass the function, don't call it",
        body: `<p><code>onClick={handleClick}</code> passes the function for React to call <em>later</em>, on
        click. <code>onClick={handleClick()}</code> <strong>calls it immediately</strong> during render and
        passes the result — a bug that usually shows as "it ran once on load and never again," or an
        infinite loop if it sets state. Pass the reference; add parentheses only inside an arrow wrapper
        (next).</p>`,
      })}

      <h2>Passing arguments</h2>
      <p>To pass data to a handler, wrap it in an arrow function so the call happens on the event, not
      during render:</p>

      ${h.codePane({
        lang: "tsx",
        title: "Arrow wrappers for arguments",
        readOnly: true,
        code: `function RecipeList({ recipes }: { recipes: Recipe[] }) {
  function handleSelect(id: number) {
    console.log("Selected recipe", id);
  }

  return (
    <ul>
      {recipes.map((r) => (
        <li key={r.id}>
          {r.title}
          {/* arrow defers the call until click, with the id baked in */}
          <button onClick={() => handleSelect(r.id)}>View</button>
        </li>
      ))}
    </ul>
  );
}`,
      })}

      <h2>The event object, typed</h2>
      <p>
        Handlers receive a <strong>synthetic event</strong> — React's cross-browser wrapper around the
        native event, with the same <code>target</code>, <code>preventDefault()</code>, etc. you learned.
        TypeScript types it precisely:
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "Typed events",
        readOnly: true,
        code: `function SearchBar() {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value); // fully typed as string
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();          // stop the page reload (Part 10!)
    console.log("Searching…");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} placeholder="Search…" />
    </form>
  );
}`,
      })}

      ${h.callout({
        kind: "tip",
        title: "Inline handlers often infer their types",
        body: `<p>When you write the handler inline — <code>onChange={(e) =&gt; setText(e.target.value)}</code>
        — TypeScript usually infers <code>e</code>'s type from the element automatically (contextual typing
        from Part 20). You only need the explicit <code>React.ChangeEvent&lt;...&gt;</code> annotation when
        you define the handler as a separate named function. Prefer whichever reads clearer.</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Events go up; data comes down",
        body: `<p>Event handlers are where the "events up" half of React's data flow happens. A child button
        calls a function its parent passed via props (<code>onSelect</code>, <code>onDelete</code>), letting
        the parent update state. Keep handlers small — ideally they just call a well-named function or a
        state setter. Fat handlers stuffed with logic are a smell; extract the logic into named functions
        so the JSX stays readable.</p>`,
      })}

      ${h.exercise({
        title: "Wire up interactions",
        prompt: `<p>Add a "View" button to each <code>RecipeCard</code> that calls an <code>onView(id)</code>
        prop, and a search <code>&lt;form&gt;</code> whose <code>onSubmit</code> calls
        <code>preventDefault()</code> and logs the input value. Make sure clicking logs the correct recipe
        id (proving your arrow wrappers work) and that submitting doesn't reload the page. Next lesson, these
        interactions will actually change what's on screen — with state.</p>`,
        runHint: "pnpm vite",
      })}
    </section>
  `,
});
