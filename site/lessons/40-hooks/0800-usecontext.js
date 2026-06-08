/* Lesson 40-hooks/0800 — useContext. */
registerLesson({
  meta: {
    id: "40-hooks/0800-usecontext",
    title: "useContext: Avoiding Prop Drilling",
    part: "40-hooks",
    estMinutes: 18,
    level: "advanced",
    project: "vite-hooks-lab",
    lede: "When data needs to reach deeply-nested components, threading props through every level (prop drilling) gets painful. Context provides a value to a whole subtree — used well, it's elegant; used poorly, it hurts performance.",
    objectives: [
      "Create, provide, and consume Context with full typing",
      "Combine Context with useReducer for app-wide state",
      "Know Context's performance characteristics",
      "Decide when Context is and isn't the right tool",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The problem: prop drilling</h2>
      <p>
        Passing a value from a top component down to a deeply-nested one means every component in between
        must accept and forward it, even if it doesn't use it. That's <strong>prop drilling</strong> —
        tedious and brittle. <strong>Context</strong> lets a provider make a value available to its entire
        subtree, so any descendant can read it directly.
      </p>

      <h2>Creating and typing a Context</h2>
      ${h.codePane({
        lang: "tsx",
        title: "A typed theme context",
        readOnly: true,
        code: `import { createContext, useContext, useState } from "react";

interface ThemeContextValue {
  theme: "light" | "dark";
  toggle: () => void;
}

// undefined default lets us detect "used outside a provider":
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  return (
    <ThemeContext value={{ theme, toggle }}>{children}</ThemeContext>
  );
}

// A custom hook that enforces correct usage and gives a clean API:
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}`,
      })}

      ${h.callout({
        kind: "note",
        title: "React 19: <Context> is the provider",
        body: `<p>In React 19 you can render the context object directly as a provider —
        <code>&lt;ThemeContext value={...}&gt;</code> — instead of the older
        <code>&lt;ThemeContext.Provider value={...}&gt;</code>. Both work; the new form is cleaner. You'll
        see both in the wild.</p>`,
      })}

      <h2>Consuming it anywhere in the subtree</h2>
      ${h.codePane({
        lang: "tsx",
        title: "No prop drilling",
        readOnly: true,
        code: `function App() {
  return (
    <ThemeProvider>
      <Header />   {/* deeply nested children can read theme directly */}
    </ThemeProvider>
  );
}

function ThemeToggle() {
  const { theme, toggle } = useTheme(); // reach the value with no props
  return <button onClick={toggle}>Theme: {theme}</button>;
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "The custom-hook wrapper pattern",
        body: `<p>Notice we never call <code>useContext(ThemeContext)</code> directly in components — we expose
        a <code>useTheme()</code> hook that throws a clear error if used outside its provider. This pattern
        is an enterprise standard: it gives consumers a clean, well-named, type-safe API; centralizes the
        "must be inside provider" check; and hides the context object as an implementation detail. Always
        wrap your contexts in a custom hook.</p>`,
      })}

      <h2>Performance: Context's one big caveat</h2>
      ${h.callout({
        kind: "gotcha",
        title: "Every consumer re-renders when the value changes",
        body: `<p>When a Context's value changes, <strong>all</strong> components consuming it re-render. If
        you put frequently-changing, large state in one global context, you can cause widespread re-renders.
        Mitigations: split contexts by concern (theme vs auth vs cart), keep context values stable (memoize
        the object), and don't reach for context for high-frequency state. For complex global state, a
        dedicated library like Zustand (Part 70) is often better — it lets components subscribe to <em>slices</em>
        and avoids this whole-subtree re-render.</p>`,
      })}

      <h2>When to use Context</h2>
      <ul>
        <li><strong>Good fits:</strong> theme, current user/auth, language/locale, a feature's shared state via <code>useReducer</code> — things that are read widely but change rarely.</li>
        <li><strong>Poor fits:</strong> high-frequency state (mouse position, every keystroke globally), or as a substitute for proper data-fetching tools.</li>
      </ul>

      ${h.callout({
        kind: "principal",
        body: `<p>Context solves <em>distribution</em> (getting a value to many places), not <em>state
        management</em> per se. A powerful pattern: pair <code>useReducer</code> (the state logic) with
        Context (the distribution) to build clean, app-wide feature state without external libraries — you'll
        do exactly this in the project.</p>`,
      })}

      ${h.exercise({
        title: "Add a board context",
        prompt: `<p>Wrap your Kanban app in a <code>BoardProvider</code> that holds the
        <code>useReducer</code> state and <code>dispatch</code> from the last lesson, exposed via a
        <code>useBoard()</code> custom hook (with the "must be inside provider" guard). Refactor columns and
        cards to read board state and dispatch from context instead of props. Add a separate
        <code>ThemeProvider</code> too — keeping them separate so a theme toggle doesn't re-render the whole
        board.</p>`,
        runHint: "pnpm --filter vite-hooks-lab dev",
      })}
    </section>
  `,
});
