/* Lesson 20-typescript/1100 — Discriminated unions. */
registerLesson({
  meta: {
    id: "20-typescript/1100-discriminated-unions",
    title: "Discriminated Unions & Exhaustiveness",
    part: "20-typescript",
    estMinutes: 16,
    level: "advanced",
    project: "js-foundations",
    lede: "The single most useful pattern in real TypeScript: model 'a value that's one of several distinct shapes' so the compiler forces you to handle every case. This is how you make impossible states impossible.",
    objectives: [
      "Build discriminated unions with a shared tag field",
      "Narrow them cleanly with switch",
      "Guarantee all cases are handled with never",
      "Model loading/error/success states correctly",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The shape of real state</h2>
      <p>
        Consider data loading. Many apps store <code>{ isLoading, data, error }</code> — but that allows
        nonsense like "loading AND has an error AND has data." A <strong>discriminated union</strong>
        models the truth: it's <em>exactly one</em> of a few distinct states, each with its own relevant
        fields.
      </p>

      ${h.codePane({
        lang: "ts",
        title: "A discriminated union",
        readOnly: true,
        code: `type RequestState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: Task[] }   // only success has data
  | { status: "error"; error: string };   // only error has error

// The shared 'status' field is the "discriminant" (the tag).`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Make impossible states impossible",
        body: `<p>This is a profound idea: instead of validating against bad combinations at runtime, you
        <em>design the type</em> so bad combinations can't be expressed at all. There's no way to have
        <code>data</code> while <code>status</code> is <code>"loading"</code>. Bugs you can't represent
        are bugs you can't ship. This single pattern eliminates a whole category of UI glitches and is a
        hallmark of senior-level modeling.</p>`,
      })}

      <h2>Narrowing on the tag</h2>
      <p>Switch on the discriminant and TypeScript narrows each branch to that exact shape:</p>

      ${h.codePane({
        lang: "ts",
        title: "Exhaustive switch",
        readOnly: true,
        code: `function render(state: RequestState): string {
  switch (state.status) {
    case "idle":
      return "Nothing loaded yet.";
    case "loading":
      return "Loading…";
    case "success":
      return \`Loaded \${state.data.length} tasks\`; // data is available here
    case "error":
      return \`Error: \${state.error}\`;             // error is available here
  }
}`,
      })}

      <h2>Exhaustiveness checking with <code>never</code></h2>
      <p>
        Add a <code>default</code> that assigns to a <code>never</code>. If you ever add a new state to
        the union and forget to handle it, the compiler errors — a free reminder you can't miss:
      </p>

      ${h.codePane({
        lang: "ts",
        title: "The never trick",
        readOnly: true,
        code: `function render(state: RequestState): string {
  switch (state.status) {
    case "idle":    return "Idle";
    case "loading": return "Loading…";
    case "success": return \`\${state.data.length} tasks\`;
    case "error":   return state.error;
    default: {
      // If a new case is added and not handled above, 'state' won't be
      // 'never' here, and this line becomes a compile error:
      const _exhaustive: never = state;
      return _exhaustive;
    }
  }
}`,
      })}

      ${h.callout({
        kind: "tip",
        body: `<p>This is one of the most satisfying patterns in TypeScript: the compiler becomes your
        teammate, refusing to let you forget a case during a refactor. You'll use discriminated unions for
        UI state, reducer actions (Part 40's <code>useReducer</code>), API results, and form modes
        constantly.</p>`,
      })}

      ${h.exercise({
        title: "Model your quote widget properly",
        prompt: `<p>Replace your dashboard's ad-hoc quote loading flags with a discriminated union
        <code>QuoteState</code> (<code>idle | loading | success (with quote) | error (with message)</code>).
        Write a <code>renderQuote(state)</code> with an exhaustive switch and the <code>never</code> guard.
        Then add a new <code>"empty"</code> state and watch the compiler point you to exactly where you
        need to handle it. That's design preventing bugs.</p>`,
        runHint: "pnpm --filter js-foundations typecheck",
      })}
    </section>
  `,
});
