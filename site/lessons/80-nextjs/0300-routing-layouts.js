/* Lesson 80-nextjs/0300 — Routing: layouts, route groups, dynamic & parallel routes. */
registerLesson({
  meta: {
    id: "80-nextjs/0300-routing-layouts",
    title: "Layouts, Route Groups & Dynamic Routes",
    part: "80-nextjs",
    estMinutes: 17,
    level: "advanced",
    project: "next-saas",
    lede: "The App Router's conventions for structuring real apps: nested layouts that persist, route groups for organization, dynamic segments for data-driven URLs, and advanced parallel/intercepting routes.",
    objectives: [
      "Build nested, persistent layouts",
      "Organize routes with route groups",
      "Create dynamic and catch-all routes",
      "Understand parallel and intercepting routes",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Nested layouts</h2>
      <p>
        A <code>layout.tsx</code> wraps all pages in its folder and below. Layouts <strong>persist across
        navigation</strong> — they don't re-render when you move between their child pages, so shared chrome
        (sidebars, nav) keeps its state and doesn't flicker.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "app/dashboard/layout.tsx",
        readOnly: true,
        code: `export default function DashboardLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />                {/* persists across /dashboard/* pages */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
// Every page under /dashboard renders inside this. Layouts nest:
// root layout > dashboard layout > the page.`,
      })}

      <h2>Route groups: organize without affecting URLs</h2>
      ${h.codePane({
        lang: "bash",
        title: "Parentheses = route group",
        readOnly: true,
        code: `app/
├── (marketing)/        ← folder grouping, NOT in the URL
│   ├── layout.tsx      ← a layout just for marketing pages
│   ├── page.tsx        → "/"
│   └── pricing/page.tsx → "/pricing"
└── (app)/
    ├── layout.tsx      ← a different layout for the authed app
    └── dashboard/page.tsx → "/dashboard"
# (marketing) and (app) don't appear in URLs — they let you apply
# different layouts to different sections of the site.`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Route groups separate concerns",
        body: `<p>Route groups let you give your public marketing pages one layout (with a nav and footer) and your
        authenticated app another (with a sidebar), without the group name polluting the URL. This kind of
        structural organization — separating the "logged-out" and "logged-in" shells — is exactly how real SaaS
        apps are laid out. The folder structure becomes a clear map of the product's sections.</p>`,
      })}

      <h2>Dynamic routes</h2>
      ${h.codePane({
        lang: "tsx",
        title: "app/projects/[id]/page.tsx",
        readOnly: true,
        code: `// [id] captures a URL segment. In Next 16, params is a Promise:
export default async function ProjectPage({
  params,
}: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProject(id);
  return <h1>{project.name}</h1>;
}

// [...slug]   → catch-all (/docs/a/b/c)
// [[...slug]] → optional catch-all (also matches /docs)`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "params and searchParams are async in Next 16",
        body: `<p>In recent Next.js, <code>params</code> and <code>searchParams</code> are <strong>Promises</strong>
        you must <code>await</code> (this enables more streaming/optimization). So it's
        <code>const { id } = await params</code>, not <code>params.id</code>. If you see synchronous param access
        in older tutorials, that's the pre-15 API. Always <code>await</code> them now.</p>`,
      })}

      <h2>Parallel & intercepting routes (advanced)</h2>
      ${h.callout({
        kind: "note",
        body: `<p>Two powerful advanced features: <strong>parallel routes</strong> (<code>@slot</code> folders)
        render multiple pages in one layout simultaneously — great for dashboards with independent panels or
        showing a modal alongside the page. <strong>Intercepting routes</strong> (<code>(.)folder</code>) let a
        route render in the current layout's context — the classic example is clicking a photo to open it in a
        modal overlay while keeping the feed behind, with the URL still updating so it's shareable and
        refreshable. You won't need these on day one, but knowing they exist lets you build sophisticated,
        URL-driven UI when the time comes.</p>`,
      })}

      ${h.exercise({
        title: "Structure LaunchPad's routes",
        prompt: `<p>Organize LaunchPad with route groups: a <code>(marketing)</code> group (home, pricing) with a
        marketing layout, and an <code>(app)</code> group (dashboard, settings) with an app layout that has a
        persistent sidebar. Add a dynamic <code>projects/[id]</code> route that awaits its params. Navigate
        around and confirm the sidebar persists (keeps state) across dashboard pages while the URL stays
        clean.</p>`,
        runHint: "pnpm --filter next-saas dev",
      })}
    </section>
  `,
});
