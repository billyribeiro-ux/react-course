/* Lesson 30-react-fundamentals/0400 — Components & composition. */
registerLesson({
  meta: {
    id: "30-react-fundamentals/0400-components-composition",
    title: "Components & Composition",
    part: "30-react-fundamentals",
    estMinutes: 16,
    level: "beginner",
    project: "vite-fundamentals",
    lede: "Components are the unit of reuse in React. Learn how to define them, nest them, and split a UI into a clean component tree — the skill that keeps large apps maintainable.",
    objectives: [
      "Define components as functions returning JSX",
      "Compose components into a tree",
      "Split a UI into well-named components",
      "Apply the single-responsibility principle to UI",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Defining a component</h2>
      <p>
        A component is a function whose name <strong>starts with a capital letter</strong> and returns
        JSX. The capital letter is how React tells your components apart from regular HTML tags.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "A component",
        readOnly: true,
        code: `function Header() {
  return (
    <header>
      <h1>🍳 Recipe Finder</h1>
    </header>
  );
}

// Use it like a custom HTML tag — note the capital H:
// <Header />`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Capitalization is not optional",
        body: `<p><code>&lt;Header /&gt;</code> renders your component; <code>&lt;header /&gt;</code> renders
        the HTML element. Lowercase = HTML tag, Uppercase = your component. Forget the capital and React
        will quietly try to render an unknown HTML element — a silent bug. ESLint and TypeScript help, but
        the rule is on you.</p>`,
      })}

      <h2>Composition: components inside components</h2>
      <p>You build real UIs by nesting components, forming a <strong>component tree</strong>:</p>

      ${h.codePane({
        lang: "tsx",
        title: "Composing a page",
        readOnly: true,
        code: `function Header() {
  return <h1>🍳 Recipe Finder</h1>;
}

function SearchBar() {
  return <input placeholder="Search recipes…" />;
}

function Footer() {
  return <footer>Made with React</footer>;
}

export default function App() {
  return (
    <main className="app">
      <Header />
      <SearchBar />
      <Footer />
    </main>
  );
}`,
      })}

      <p>This produces a tree React understands and renders:</p>

      ${h.codePane({
        lang: "markdown",
        title: "The component tree",
        readOnly: true,
        code: `App
├── Header
├── SearchBar
└── Footer`,
      })}

      ${h.callout({
        kind: "principal",
        title: "One component, one job",
        body: `<p>Apply the <strong>single-responsibility principle</strong> to UI: each component should do
        one clear thing. A <code>RecipeCard</code> shows a recipe; it doesn't also fetch data or manage the
        whole page. Small, focused components are easier to name, test, reuse, and reason about — and they
        compose into anything. When a component starts doing several things or grows past a screen or two,
        that's your signal to split it. This judgment is a core part of senior front-end craft.</p>`,
      })}

      <h2>Where to put components</h2>
      <p>
        Small helper components can live in the same file. As they grow or get reused, give each its own
        file (one component per file is the common convention) and import it:
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "src/components/Header.tsx",
        readOnly: true,
        code: `export function Header() {
  return <h1>🍳 Recipe Finder</h1>;
}`,
      })}

      ${h.codePane({
        lang: "tsx",
        title: "src/App.tsx",
        readOnly: true,
        code: `import { Header } from "./components/Header.tsx";

export default function App() {
  return (
    <main className="app">
      <Header />
    </main>
  );
}`,
      })}

      ${h.callout({
        kind: "tip",
        title: "A pragmatic folder structure",
        body: `<p>A common, scalable layout: <code>src/components/</code> for reusable UI,
        <code>src/features/</code> for feature-specific pieces, <code>src/lib/</code> for utilities. Don't
        over-architect a small app — start simple and extract structure as it grows. Premature folder
        ceremony slows beginners down; we'll formalize real architecture in Part B0.</p>`,
      })}

      ${h.exercise({
        title: "Decompose the Recipe Finder",
        prompt: `<p>Refactor <code>App.tsx</code> into a small tree: a <code>Header</code>, a
        <code>SearchBar</code>, a <code>RecipeList</code> (placeholder for now), and a <code>Footer</code>.
        Put <code>Header</code> in its own file under <code>src/components/</code> and import it. Confirm the
        page still renders and <code>pnpm lint</code> stays clean. You've just structured a React app the
        way professionals do.</p>`,
        runHint: "pnpm vite",
      })}
    </section>
  `,
});
