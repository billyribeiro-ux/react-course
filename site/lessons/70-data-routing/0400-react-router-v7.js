/* Lesson 70-data-routing/0400 — React Router v7 comparison. */
registerLesson({
  meta: {
    id: "70-data-routing/0400-react-router-v7",
    title: "React Router v7 — When & Why",
    part: "70-data-routing",
    estMinutes: 12,
    level: "advanced",
    project: "data-routing-app",
    lede: "TanStack Router isn't the only option. React Router v7 (the merged Remix line) is a hugely popular, full-stack-capable router. Know how it compares so you can choose the right tool for a project.",
    objectives: [
      "Recognize React Router v7's model",
      "Compare it with TanStack Router",
      "Understand the Remix merge and framework mode",
      "Choose a router deliberately",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>React Router v7</h2>
      <p>
        <strong>React Router</strong> is the longest-standing React router. In v7 it merged with
        <strong>Remix</strong>, gaining loaders, actions, and an optional full-stack "framework mode" with
        server rendering. It can run as a simple SPA router or as a full framework — a flexible spectrum.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "React Router v7 (loader + component)",
        readOnly: true,
        code: `// Routes can be defined via config or file-based conventions.
// A loader fetches data; useLoaderData reads it:
export async function loader({ params }: LoaderFunctionArgs) {
  return fetchJob(params.jobId);
}

export default function Job() {
  const job = useLoaderData<typeof loader>();
  return <h1>{job.title}</h1>;
}

// Mutations use 'actions' (a precursor to React's Server Actions concept):
export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  // ...handle the mutation...
}`,
      })}

      <h2>How they compare</h2>
      <ul>
        <li><strong>Type safety:</strong> TanStack Router is the gold standard (typed paths, params, search). React Router v7 has improved types but isn't as exhaustively type-safe.</li>
        <li><strong>Full-stack:</strong> React Router v7 / Remix has first-class SSR and a framework mode; TanStack pairs with <strong>TanStack Start</strong> for full-stack.</li>
        <li><strong>Philosophy:</strong> TanStack Router is SPA-first with peerless types; React Router v7 leans web-standards and full-stack (forms, progressive enhancement).</li>
        <li><strong>Both</strong> have loaders, nested routes, and great DX. Neither is wrong.</li>
      </ul>

      ${h.callout({
        kind: "principal",
        title: "How to choose (a senior framing)",
        body: `<p>There's no single winner — there's fit. <strong>Building a client-heavy SPA</strong> where
        type-safe URLs and search-param state matter most? TanStack Router shines. <strong>Want full-stack with
        SSR, forms, and web-standards</strong> in one tool? React Router v7 (or Remix) is excellent.
        <strong>Already committed to Next.js?</strong> Use its built-in App Router (Part 80). The principal move
        is to evaluate against the project's real needs — type-safety depth, SSR requirements, team familiarity,
        ecosystem — and to recognize that the <em>concepts</em> (routes, loaders, nested layouts, actions) are
        shared, so switching later is mostly mechanical. Don't dogmatically pick a router; pick for the
        project.</p>`,
      })}

      ${h.callout({
        kind: "note",
        title: "The big picture",
        body: `<p>Routing in React has converged on a common model: nested routes with loaders for data and
        actions for mutations. TanStack Router, React Router v7, and Next.js all express this. Master the model
        (which this part teaches via TanStack) and any specific router is a syntax detail you can pick up in an
        afternoon.</p>`,
      })}

      ${h.exercise({
        title: "Compare and decide",
        prompt: `<p>Skim the React Router v7 docs' "loaders" and "actions" pages and compare them mentally to the
        TanStack Router loaders you used last lesson. Write a short decision note: for the Job Board (a client
        SPA), which would you choose and why? For a content-heavy site needing SSR and SEO, which? Practicing
        this "choose the right tool, justify it" reasoning is exactly what distinguishes senior engineers.</p>`,
        runHint: "",
      })}
    </section>
  `,
});
