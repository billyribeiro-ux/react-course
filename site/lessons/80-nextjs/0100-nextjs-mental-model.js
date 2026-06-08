/* Lesson 80-nextjs/0100 — Next.js mental model & the App Router. */
registerLesson({
  meta: {
    id: "80-nextjs/0100-nextjs-mental-model",
    title: "The Next.js Mental Model & App Router",
    part: "80-nextjs",
    estMinutes: 16,
    level: "advanced",
    project: "next-saas",
    lede: "Next.js is the most popular way to build full-stack React apps. It's React plus a server, a router, and a build system — turning your client skills into the ability to ship complete products. Here's the model.",
    objectives: [
      "Understand what Next.js adds to React",
      "Grasp the App Router's file-based routing",
      "Know the server/client split at a high level",
      "Run the LaunchPad project",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>React is a library; Next.js is a framework</h2>
      <p>
        React renders UI. A real product also needs routing, data fetching on a server, a build pipeline,
        an API layer, SEO, and deployment. <strong>Next.js</strong> provides all of that around React. Most
        importantly, it runs React <em>on the server</em> (Server Components, Part 50) so you can fetch data
        and render HTML before it reaches the browser — faster, more secure, better for SEO.
      </p>

      ${h.callout({
        kind: "principal",
        title: "Why full-stack React matters",
        body: `<p>For years, "front-end" and "back-end" were separate worlds with an API boundary between them.
        Next.js (with Server Components and Server Actions) <strong>blurs that boundary</strong>: you write a
        component that fetches from the database directly, and a function that mutates it — all in one
        TypeScript codebase, with types flowing end to end. This is one of the biggest shifts in web
        development, and it's why "React engineer" increasingly means "can ship a whole product." Your client
        skills don't go away — they become half of a much more powerful whole.</p>`,
      })}

      <h2>File-based routing: the App Router</h2>
      <p>In Next's <strong>App Router</strong>, the <code>app/</code> folder structure <em>is</em> your routes.
      Special filenames have special roles:</p>

      ${h.codePane({
        lang: "bash",
        title: "app/ directory = routes",
        readOnly: true,
        code: `src/app/
├── layout.tsx          → shared shell wrapping everything (root layout)
├── page.tsx            → "/"
├── globals.css
├── dashboard/
│   ├── layout.tsx      → shell for all /dashboard/* pages
│   ├── page.tsx        → "/dashboard"
│   └── settings/
│       └── page.tsx    → "/dashboard/settings"
├── jobs/
│   └── [id]/
│       └── page.tsx    → "/jobs/:id"  (dynamic segment)
└── api/
    └── health/
        └── route.ts    → "/api/health"  (an API endpoint)`,
      })}

      ${h.callout({
        kind: "note",
        title: "The special files",
        body: `<p><code>page.tsx</code> = a route's UI. <code>layout.tsx</code> = shared wrapper (persists across
        navigation). <code>loading.tsx</code> = Suspense fallback. <code>error.tsx</code> = error boundary.
        <code>route.ts</code> = an API endpoint. <code>[id]</code> folders = dynamic params. You'll learn each;
        for now, internalize that <strong>the folder structure declares your app's routes and behavior</strong>,
        no router config needed.</p>`,
      })}

      <h2>Server-first by default</h2>
      ${h.codePane({
        lang: "tsx",
        title: "A page is a Server Component by default",
        readOnly: true,
        code: `// app/dashboard/page.tsx — runs on the SERVER
export default async function DashboardPage() {
  const projects = await db.query.projects.findMany(); // direct DB access!
  return (
    <ul>
      {projects.map((p) => <li key={p.id}>{p.name}</li>)}
    </ul>
  );
}
// No useEffect, no API call, no loading spinner — the data is fetched
// on the server and the finished HTML is sent to the browser.`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Server by default, client when needed",
        body: `<p>Every component in <code>app/</code> is a Server Component unless you add <code>"use client"</code>.
        This inverts the old model: instead of shipping everything to the browser, you keep data-fetching and
        static rendering on the server and only send JavaScript for the interactive "islands." The result is
        less JS, faster loads, and secrets that never leave the server. Mastering <em>where</em> the
        server/client boundary goes (next lesson) is the central skill of Next.js.</p>`,
      })}

      ${h.exercise({
        title: "Run LaunchPad",
        prompt: `<p>Run <code>pnpm --filter next-saas dev</code> and open the app. Look at
        <code>src/app/layout.tsx</code> (the root shell, a Server Component) and <code>src/app/page.tsx</code>.
        Add a new route by creating <code>src/app/about/page.tsx</code> that exports a component returning some
        JSX — visit <code>/about</code> and watch it just work, no route config. You're building full-stack
        now.</p>`,
        runHint: "pnpm --filter next-saas dev",
      })}
    </section>
  `,
});
