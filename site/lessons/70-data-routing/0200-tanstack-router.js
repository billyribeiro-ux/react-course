/* Lesson 70-data-routing/0200 — TanStack Router: type-safe routes & params. */
registerLesson({
  meta: {
    id: "70-data-routing/0200-tanstack-router",
    title: "TanStack Router: Type-Safe Routes & Params",
    part: "70-data-routing",
    estMinutes: 18,
    level: "advanced",
    project: "data-routing-app",
    lede: "TanStack Router's superpower is end-to-end type safety: typo a route path or forget a param and TypeScript stops you at compile time. Learn its model — routes, links, and typed params.",
    objectives: [
      "Define routes (code-based and file-based)",
      "Navigate with the fully-typed Link",
      "Read typed path params",
      "Appreciate compile-time routing safety",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Why type-safe routing matters</h2>
      <p>
        Most routers treat URLs as strings: <code>navigate("/jobs/" + id)</code>. Typo the path, forget a
        required param, or rename a route, and you find out at <em>runtime</em> (a blank page in production).
        TanStack Router makes routes <strong>fully typed</strong> — <code>&lt;Link to="/jobs/$jobId"&gt;</code>
        autocompletes valid paths and <em>requires</em> the <code>jobId</code> param, all checked by the
        compiler.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "Type-safe navigation",
        readOnly: true,
        code: `// ✅ autocompleted path, required typed params:
<Link to="/jobs/$jobId" params={{ jobId: "3" }}>View</Link>

<Link to="/jobz">Oops</Link>          // ❌ no such route — compile error
<Link to="/jobs/$jobId" />            // ❌ missing required 'jobId' param

// Programmatic navigation is typed too:
const navigate = useNavigate();
navigate({ to: "/jobs/$jobId", params: { jobId: "3" } });`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Routes as a typed contract",
        body: `<p>When routes are typed, refactoring is fearless: rename a route or change a param and every
        broken link is a compile error you fix in minutes — versus hunting runtime 404s. The router
        <em>registers</em> its types globally (the <code>declare module</code> block in
        <code>router.tsx</code>), so every <code>Link</code>, <code>useParams</code>, and
        <code>useNavigate</code> across the app knows your exact route shape. This is the Part 20 "make invalid
        states unrepresentable" philosophy applied to navigation. It's a genuine productivity multiplier on
        large apps.</p>`,
      })}

      <h2>Reading typed params</h2>
      ${h.codePane({
        lang: "tsx",
        title: "useParams",
        readOnly: true,
        code: `function JobDetailPage() {
  // 'jobId' is typed because we tell it which route we're in:
  const { jobId } = useParams({ from: "/jobs/$jobId" });
  // jobId: string  — guaranteed to exist
  return <h1>Job #{jobId}</h1>;
}`,
      })}

      <h2>Code-based vs file-based routing</h2>
      <p>TanStack Router supports two styles:</p>
      <ul>
        <li><strong>Code-based</strong> (what the scaffold uses): define routes with <code>createRoute</code> and assemble a tree. Explicit, no codegen.</li>
        <li><strong>File-based</strong>: a <code>src/routes/</code> folder where file names <em>are</em> the routes (<code>routes/jobs/$jobId.tsx</code>). The router plugin generates the typed tree for you. The recommended approach for most apps — less boilerplate, same type safety.</li>
      </ul>

      ${h.codePane({
        lang: "bash",
        title: "File-based structure",
        readOnly: true,
        code: `src/routes/
├── __root.tsx          → the root layout (nav + <Outlet/>)
├── index.tsx           → "/"
├── jobs/
│   ├── index.tsx       → "/jobs"
│   └── $jobId.tsx      → "/jobs/:jobId"  (typed param)
# The @tanstack/router-plugin watches these and generates routeTree.gen.ts`,
      })}

      ${h.callout({
        kind: "tip",
        body: `<p>File-based routing mirrors what you'll see in Next.js (Part 80), so learning it here transfers
        directly. We use code-based in the scaffold to keep the build dependency-light and the routing explicit
        for learning, but in a new app you'd typically choose file-based for the ergonomics.</p>`,
      })}

      ${h.exercise({
        title: "Add a typed route",
        prompt: `<p>In the Job Board, add a new route — e.g. <code>/companies/$companyName</code> showing jobs at
        that company — defining it in <code>router.tsx</code> and linking to it from the job cards with a typed
        <code>&lt;Link&gt;</code> and <code>useParams</code>. Try misspelling the path or omitting the param to
        watch TypeScript catch it. Feel how routing mistakes become compile errors, not production bugs.</p>`,
        runHint: "pnpm --filter data-routing-app dev",
      })}
    </section>
  `,
});
