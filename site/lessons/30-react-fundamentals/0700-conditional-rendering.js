/* Lesson 30-react-fundamentals/0700 — Conditional rendering. */
registerLesson({
  meta: {
    id: "30-react-fundamentals/0700-conditional-rendering",
    title: "Conditional Rendering",
    part: "30-react-fundamentals",
    estMinutes: 14,
    level: "beginner",
    project: "vite-fundamentals",
    lede: "Real UIs show different things in different situations — a spinner while loading, an error message on failure, content on success. Learn the clean patterns for choosing what to render.",
    objectives: [
      "Render conditionally with && and ternaries",
      "Return early for whole-component branches",
      "Render loading / empty / error / success states",
      "Keep conditional JSX readable",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The three main techniques</h2>
      <p>Because JSX uses expressions, you render conditionally with plain JavaScript: <code>&&</code>,
      ternaries, and early <code>return</code>s.</p>

      <h3>1. <code>&&</code> — show something or nothing</h3>
      ${h.codePane({
        lang: "tsx",
        title: "Logical AND",
        readOnly: true,
        code: `function Inbox({ unread }: { unread: number }) {
  return (
    <div>
      <h1>Inbox</h1>
      {unread > 0 && <span className="badge">{unread} new</span>}
    </div>
  );
}
// When unread is 0, nothing renders. Note: 'unread > 0', not just
// 'unread' — remember the {0} gotcha from the JSX lesson!`,
      })}

      <h3>2. Ternary — choose between two things</h3>
      ${h.codePane({
        lang: "tsx",
        title: "Ternary",
        readOnly: true,
        code: `function AuthButton({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <button>
      {isLoggedIn ? "Log out" : "Log in"}
    </button>
  );
}

// Choosing between whole blocks:
function Status({ online }: { online: boolean }) {
  return online ? <p>🟢 Online</p> : <p>⚪ Offline</p>;
}`,
      })}

      <h3>3. Early return — branch the whole component</h3>
      ${h.codePane({
        lang: "tsx",
        title: "Guard clauses",
        readOnly: true,
        code: `function RecipeList({ recipes }: { recipes: Recipe[] }) {
  if (recipes.length === 0) {
    return <p>No recipes found.</p>;   // bail out early, keep the rest flat
  }

  return (
    <ul>
      {recipes.map((r) => <RecipeCard key={r.id} recipe={r} />)}
    </ul>
  );
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Model all your states explicitly",
        body: `<p>The mark of a robust component is that it handles every state, not just success. For data,
        that's typically <strong>loading → error → empty → content</strong>. Remember discriminated unions
        from Part 20? They're the perfect tool: a single <code>status</code> field drives an exhaustive set
        of renders, and the compiler ensures you handled each. Thinking in states — rather than toggling a
        pile of booleans — is what separates flaky UIs from solid ones.</p>`,
      })}

      ${h.codePane({
        lang: "tsx",
        title: "The four-state pattern (you'll use this constantly)",
        readOnly: true,
        code: `type State =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; recipes: Recipe[] };

function RecipePanel({ state }: { state: State }) {
  if (state.status === "loading") return <Spinner />;
  if (state.status === "error") return <ErrorBox message={state.message} />;
  if (state.recipes.length === 0) return <p>No recipes found.</p>;

  return (
    <ul>
      {state.recipes.map((r) => <RecipeCard key={r.id} recipe={r} />)}
    </ul>
  );
}`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Don't nest ternaries deeply",
        body: `<p>A ternary inside a ternary inside a ternary is unreadable. When branching gets complex,
        prefer early returns or extract a small helper component. Optimize for the next person reading it
        (often future-you). If you can't tell at a glance what renders when, simplify.</p>`,
      })}

      ${h.exercise({
        title: "Handle every state",
        prompt: `<p>Add a <code>loading</code> boolean and an <code>error</code> string to your Recipe
        Finder (fake them with variables for now). Render a "Loading…" message, an error box, the
        "No recipes found" empty state, or the list — using early returns. Toggle the variables and confirm
        each state appears correctly. In Part 70 you'll wire these to real data fetching, but the rendering
        logic is identical.</p>`,
        runHint: "pnpm vite",
      })}
    </section>
  `,
});
