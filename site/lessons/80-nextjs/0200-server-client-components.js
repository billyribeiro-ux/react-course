/* Lesson 80-nextjs/0200 — Server vs Client Components. */
registerLesson({
  meta: {
    id: "80-nextjs/0200-server-client-components",
    title: "Server vs Client Components: The Boundary",
    part: "80-nextjs",
    estMinutes: 18,
    level: "advanced",
    project: "next-saas",
    lede: "The most important skill in Next.js: knowing which components run on the server and which on the client, and how to compose them. Get the boundary right and everything else falls into place.",
    objectives: [
      "Decide when a component must be a Client Component",
      "Compose Server and Client Components correctly",
      "Pass data across the boundary",
      "Keep client bundles small",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The two worlds, recapped</h2>
      <ul>
        <li><strong>Server Components</strong> (default) — render on the server, can be <code>async</code> and
        fetch data directly, ship zero JS. Can't use state, effects, event handlers, or browser APIs.</li>
        <li><strong>Client Components</strong> (<code>"use client"</code>) — render in the browser, can use
        <code>useState</code>/<code>useEffect</code>/events. Ship JS to the browser.</li>
      </ul>

      ${h.codePane({
        lang: "tsx",
        title: "The 'use client' directive",
        readOnly: true,
        code: `"use client"; // ← this file (and its imports) run on the client

import { useState } from "react";

export function Counter() {
  const [n, setN] = useState(0);
  return <button onClick={() => setN(n + 1)}>{n}</button>;
}`,
      })}

      <h2>When do you need a Client Component?</h2>
      <p>Add <code>"use client"</code> only when you need:</p>
      <ul>
        <li>State or lifecycle: <code>useState</code>, <code>useEffect</code>, <code>useReducer</code>.</li>
        <li>Event handlers: <code>onClick</code>, <code>onChange</code>, etc.</li>
        <li>Browser-only APIs: <code>localStorage</code>, <code>window</code>, geolocation.</li>
        <li>Most third-party libraries that use the above (many UI libs).</li>
      </ul>

      ${h.callout({
        kind: "principal",
        title: "Push the boundary down — keep client islands small",
        body: `<p>The goal is to keep most of your tree as Server Components and make the interactive pieces small,
        leaf-level Client Components. A whole page doesn't need <code>"use client"</code> because one button is
        interactive — extract the button into its own client component and keep the page on the server. Smaller
        client islands mean less JavaScript shipped, faster pages, and more data/logic kept safely server-side.
        "How small can my client components be?" is a question senior Next.js engineers ask constantly.</p>`,
      })}

      <h2>Composing: Server renders Client</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Server Component using a Client Component",
        readOnly: true,
        code: `// app/dashboard/page.tsx — Server Component (no directive)
import { LikeButton } from "./LikeButton"; // a Client Component

export default async function Page() {
  const post = await db.query.posts.findFirst(); // server data fetch
  return (
    <article>
      <h1>{post.title}</h1>
      {/* Pass server data DOWN to a small interactive client island: */}
      <LikeButton postId={post.id} initialLikes={post.likes} />
    </article>
  );
}`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "The rules of crossing the boundary",
        body: `<p>A Server Component can <strong>render</strong> a Client Component and pass it
        <strong>serializable props</strong> (strings, numbers, objects, arrays — things that survive being sent
        over the network). It <strong>cannot</strong> pass functions, class instances, or Dates-as-behavior. A
        Client Component <strong>cannot import</strong> a Server Component directly, but it <em>can</em> receive
        one as <code>children</code> (a powerful pattern: a client wrapper around server content). And once you're
        in a <code>"use client"</code> file, everything it imports is client too.</p>`,
      })}

      ${h.codePane({
        lang: "tsx",
        title: "The children pattern (client wrapping server)",
        readOnly: true,
        code: `"use client";
// A client component (e.g. a theme provider or animated wrapper) can wrap
// server-rendered children passed to it — the children stay server-rendered:
export function Card({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return <div onClick={() => setOpen(!open)}>{open && children}</div>;
}
// Used from a Server Component: <Card><ServerContent /></Card>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Never put secrets in client components",
        body: `<p>Code in a Client Component (and anything it imports) is sent to the browser — so API keys,
        database URLs, and secret logic must <strong>never</strong> live there. Keep them in Server Components,
        Server Actions, or server-only modules (mark with <code>import "server-only"</code> to make leaks a build
        error). This security boundary is a core reason the server/client split matters, and getting it wrong
        leaks credentials. Treat the boundary as a security boundary, always.</p>`,
      })}

      ${h.exercise({
        title: "Find the right boundary",
        prompt: `<p>In LaunchPad, build a dashboard page as a Server Component that renders some data, plus one
        small interactive Client Component (e.g. a "favorite" toggle or a collapsible panel) that receives server
        data as props. Confirm the page itself has no <code>"use client"</code> and only the interactive leaf
        does. Open the Network tab and notice how little JS the page ships. You're practicing the most important
        Next.js skill.</p>`,
        runHint: "pnpm --filter next-saas dev",
      })}
    </section>
  `,
});
