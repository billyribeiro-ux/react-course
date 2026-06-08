/* Lesson 50-modern-react/1100 — Server Components concept. */
registerLesson({
  meta: {
    id: "50-modern-react/1100-server-components-concept",
    title: "Server Components: The Concept",
    part: "50-modern-react",
    estMinutes: 16,
    level: "advanced",
    project: "vite-hooks-lab",
    lede: "React Server Components run on the server, render to a special format, and ship zero JavaScript to the browser. It's the biggest architectural shift in React's history — here's the mental model before we build with it in Part 80.",
    objectives: [
      "Explain what a Server Component is and isn't",
      "Distinguish Server from Client Components",
      "Understand the benefits: less JS, direct data access, security",
      "Set expectations for the Next.js deep dive",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Two kinds of components</h2>
      <p>
        Everything you've built so far is a <strong>Client Component</strong> — it runs in the browser, can use
        state and effects, and responds to user interaction. React 19 stabilizes a second kind:
        <strong>Server Components</strong>, which run <em>only on the server</em>, render once, and send their
        output to the browser as data — shipping <strong>no JavaScript</strong> for themselves.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "A Server Component (runs on the server)",
        readOnly: true,
        code: `// This component runs on the server. It can be async and talk
// directly to a database or filesystem — no API layer needed.
async function RecipeList() {
  const recipes = await db.recipe.findMany(); // direct data access!
  return (
    <ul>
      {recipes.map((r) => <li key={r.id}>{r.name}</li>)}
    </ul>
  );
}
// No useState, no useEffect, no onClick — it's not interactive.
// It renders ONCE on the server and sends the result to the browser.`,
      })}

      ${h.codePane({
        lang: "tsx",
        title: "A Client Component (runs in the browser)",
        readOnly: true,
        code: `"use client"; // ← this directive marks it as a Client Component

import { useState } from "react";

function LikeButton() {
  const [liked, setLiked] = useState(false); // interactivity needs the client
  return <button onClick={() => setLiked(!liked)}>{liked ? "♥" : "♡"}</button>;
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "The mental model: server by default, client when needed",
        body: `<p>In a Server-Components app (like Next.js, Part 80), components are <strong>Server Components by
        default</strong>. You opt into the client with <code>"use client"</code> only where you need
        interactivity, state, effects, or browser APIs. The art is keeping interactive "islands" small and
        pushing data-fetching and static rendering to the server. This inverts the old model (everything ships
        to the browser) and is the single biggest reason apps built this way are faster and lighter.</p>`,
      })}

      ${h.diagram({
        label:
          "A component tree where most nodes are Server Components shipping no JavaScript, with a small interactive Client Component island marked use client.",
        caption:
          "Server Components by default (0 JS); opt into small Client Component islands only where you need interactivity.",
        svg: `<svg viewBox="0 0 560 250" xmlns="http://www.w3.org/2000/svg">
  <rect class="d-box" x="200" y="20" width="160" height="46" rx="6"/>
  <text class="d-text" x="280" y="41" text-anchor="middle" font-weight="700">Page (Server)</text>
  <text class="d-muted" x="280" y="58" text-anchor="middle">ships 0 JS</text>

  <path class="d-line" d="M280 66 V90 H120 V110"/>
  <path class="d-line" d="M280 66 V90 H440 V110"/>
  <path class="d-line" d="M280 66 V110"/>

  <rect class="d-box" x="40" y="110" width="160" height="44" rx="6"/>
  <text class="d-text" x="120" y="137" text-anchor="middle">Header (Server)</text>
  <rect class="d-box" x="360" y="110" width="160" height="44" rx="6"/>
  <text class="d-text" x="440" y="137" text-anchor="middle">RecipeList (Server)</text>

  <rect class="d-accent" x="200" y="110" width="160" height="60" rx="6"/>
  <text class="d-text" x="280" y="133" text-anchor="middle" font-weight="700">LikeButton</text>
  <text class="d-muted" x="280" y="151" text-anchor="middle">"use client"</text>
  <text class="d-muted" x="280" y="165" text-anchor="middle">ships JS (island)</text>

  <text class="d-muted" x="280" y="210" text-anchor="middle">data + props flow down → from Server into the Client island</text>
</svg>`,
      })}

      <h2>Why this matters</h2>
      <ul>
        <li><strong>Less JavaScript</strong> — server components ship zero JS, so pages are lighter and faster to load and become interactive.</li>
        <li><strong>Direct data access</strong> — fetch from a database or read files <em>inside</em> the component, no separate API endpoints, no client-side loading spinners.</li>
        <li><strong>Security</strong> — secrets, API keys, and heavy logic stay on the server, never exposed to the browser.</li>
        <li><strong>Automatic code-splitting</strong> — only the interactive parts become client bundles.</li>
      </ul>

      ${h.callout({
        kind: "gotcha",
        title: "Server Components can't use hooks or interactivity",
        body: `<p>Because they render once on the server, Server Components can't use <code>useState</code>,
        <code>useEffect</code>, event handlers, or browser APIs. Need those? That subtree is a Client Component
        (<code>"use client"</code>). Server Components <em>can</em> render Client Components (passing data as
        props), composing the two. Getting this boundary right is the core skill of Part 80.</p>`,
      })}

      ${h.callout({
        kind: "note",
        title: "You need a framework for RSC",
        body: `<p>Server Components require a server runtime and bundler integration — they don't run in a plain
        Vite SPA. The standard way to use them is a framework: <strong>Next.js</strong> (Part 80) or
        <strong>React Router/Remix</strong>, and even <strong>Expo</strong> on mobile (Part 90). That's why
        this lesson is conceptual — you'll <em>build</em> with Server Components extensively once we reach
        Next.js. For now, lock in the mental model: server by default, client islands for interactivity.</p>`,
      })}

      ${h.exercise({
        title: "Map the boundary",
        prompt: `<p>Take your Recipe Finder or Kanban app and, on paper, label each component as it would be in
        a Server-Components world: which could be Server Components (lists, layout, data display) and which
        <em>must</em> be Client Components (anything with <code>useState</code>, <code>onClick</code>, drag).
        Aim to keep the client islands as small as possible. This exercise builds the instinct you'll rely on
        throughout Part 80.</p>`,
        runHint: "",
      })}
    </section>
  `,
});
