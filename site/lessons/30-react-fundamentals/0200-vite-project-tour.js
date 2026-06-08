/* Lesson 30-react-fundamentals/0200 — Create a Vite app, tour the files. */
registerLesson({
  meta: {
    id: "30-react-fundamentals/0200-vite-project-tour",
    title: "Your First React App: A Tour",
    part: "30-react-fundamentals",
    estMinutes: 18,
    level: "beginner",
    project: "vite-fundamentals",
    lede: "Let's run a real React app and understand every file in it. Knowing how a project is wired — from index.html to your first component — removes all the mystery before we write code.",
    objectives: [
      "Run the Vite + React + TypeScript dev server",
      "Understand how the app boots from index.html to App.tsx",
      "Know what each config file is for",
      "Recognize the standard project structure you'll see everywhere",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>How a React project is created</h2>
      <p>
        In a fresh project you'd scaffold one with <code>pnpm create vite@latest my-app --template
        react-ts</code>. We've already done that for you — the <code>vite-fundamentals</code> project is a
        production-grade Vite 8 + React 19.2 + TypeScript setup with ESLint and Prettier. Let's run it.
      </p>

      ${h.codePane({
        lang: "bash",
        title: "Terminal — from the repo root",
        readOnly: true,
        code: `pnpm install   # once, installs everything
pnpm vite      # starts the dev server (alias for: --filter vite-fundamentals dev)`,
      })}

      <p>
        Vite prints a local URL (like <code>http://localhost:5173</code>). Open it — you'll see the Recipe
        Finder placeholder. Edit <code>src/App.tsx</code>, save, and the browser updates <em>instantly</em>
        without a full reload. That's <strong>Hot Module Replacement</strong>, and it's what makes React
        development feel fast and fun.
      </p>

      ${h.callout({
        kind: "principal",
        title: "Why Vite?",
        body: `<p>Vite is the modern build tool the React ecosystem standardized on. It gives near-instant
        startup and updates by serving your code as native ES modules during development, and bundles an
        optimized build for production. The old tool (Create React App) is deprecated. Vite's speed isn't
        a luxury — a tight feedback loop measurably improves the quality and quantity of what you build.</p>`,
      })}

      <h2>The boot sequence: how the app starts</h2>
      <p>Follow the chain — it's only three steps:</p>

      ${h.codePane({
        lang: "html",
        title: "1. index.html — the single page",
        readOnly: true,
        code: `<body>
  <!-- One empty div. React fills it with your entire app. -->
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>`,
      })}

      ${h.codePane({
        lang: "tsx",
        title: "2. src/main.tsx — the entry point",
        readOnly: true,
        code: `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Find the #root div and render <App/> into it.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);`,
      })}

      ${h.codePane({
        lang: "tsx",
        title: "3. src/App.tsx — your first component",
        readOnly: true,
        code: `export default function App() {
  return (
    <main className="app">
      <h1>🍳 Recipe Finder</h1>
    </main>
  );
}`,
      })}

      ${h.callout({
        kind: "note",
        title: "What is StrictMode?",
        body: `<p><code>&lt;StrictMode&gt;</code> is a development-only helper that intentionally
        double-invokes certain functions to surface bugs (like impure components or missing effect
        cleanup) early. It does nothing in production. If you ever see something run twice in dev, that's
        StrictMode helping you — leave it on. It's an enterprise default for a reason.</p>`,
      })}

      <h2>The files you'll touch vs. the ones you won't</h2>
      <ul>
        <li><strong><code>src/</code></strong> — your code lives here. You'll spend ~all your time in this folder.</li>
        <li><strong><code>index.html</code></strong> — the host page. Rarely changes.</li>
        <li><strong><code>vite.config.ts</code></strong> — build/dev config and plugins (the React plugin lives here).</li>
        <li><strong><code>tsconfig*.json</code></strong> — TypeScript settings (you met these in Part 20).</li>
        <li><strong><code>eslint.config.js</code></strong> — code-quality rules, including the Rules of Hooks.</li>
        <li><strong><code>package.json</code></strong> — dependencies and scripts.</li>
        <li><strong><code>node_modules/</code></strong> — installed libraries. Never edit; never commit (it's in <code>.gitignore</code>).</li>
      </ul>

      ${h.callout({
        kind: "principal",
        title: "Quality gates from day one",
        body: `<p>This project ships with <code>pnpm lint</code> (ESLint), <code>pnpm typecheck</code>
        (TypeScript), and <code>pnpm build</code>. Professional teams run exactly these in CI to block
        broken code from merging. Get in the habit of running them before you commit — treating "it
        type-checks and lints clean" as the minimum bar is a principal-level discipline that prevents
        whole categories of bugs from ever reaching review.</p>`,
      })}

      ${h.exercise({
        title: "Run it and make it yours",
        prompt: `<p>Start the dev server with <code>pnpm vite</code> and open the URL. Change the
        <code>&lt;h1&gt;</code> text in <code>src/App.tsx</code> and watch it hot-reload. Then run the
        quality gates and confirm they pass. Finally, deliberately introduce a TypeScript error (e.g.
        <code>const x: number = "oops"</code>) and watch both your editor and <code>pnpm typecheck</code>
        catch it — your safety net is live.</p>`,
        runHint: "pnpm vite",
      })}
    </section>
  `,
});
