/* Lesson 30-react-fundamentals/1700 — Fetching data the right way (preview). */
registerLesson({
  meta: {
    id: "30-react-fundamentals/1700-fetching-data-preview",
    title: "Fetching Data (and the useEffect Caveat)",
    part: "30-react-fundamentals",
    estMinutes: 16,
    level: "intermediate",
    project: "vite-fundamentals",
    lede: "Apps need data from servers. Here's the honest picture: the naive useEffect approach you'll see in old tutorials, why it's fragile, and what professionals actually use today.",
    objectives: [
      "Fetch data into a component and render loading/error/success",
      "Understand why manual useEffect fetching is error-prone",
      "Know the modern alternatives (TanStack Query, RSC)",
      "Set realistic expectations for Parts 40, 70, and 80",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The data-fetching states</h2>
      <p>
        Loading data is asynchronous (Part 10), so a component must handle three states:
        <strong>loading</strong>, <strong>error</strong>, and <strong>success</strong>. You already know how
        to render each (the four-state pattern). The question is <em>how to trigger the fetch</em>.
      </p>

      <h2>The naive approach (you'll see this everywhere)</h2>
      ${h.codePane({
        lang: "tsx",
        title: "useEffect fetching — the classic tutorial code",
        readOnly: true,
        code: `import { useState, useEffect } from "react";

function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;                 // guard against race conditions
    setLoading(true);
    fetch("/api/recipes")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load");
        return r.json();
      })
      .then((data) => { if (active) { setRecipes(data); setError(null); } })
      .catch((e) => { if (active) setError(e.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };  // cleanup on unmount/refetch
  }, []);

  if (loading) return <Spinner />;
  if (error) return <ErrorBox message={error} />;
  return <RecipeList recipes={recipes} />;
}`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Why this is harder than it looks",
        body: `<p>That code already has to handle <strong>race conditions</strong> (the <code>active</code>
        flag, so a slow earlier request doesn't overwrite a newer one), cleanup, and three pieces of state —
        and it still doesn't do caching, retries, refetching on focus, or deduping. Real apps need all of
        that. Hand-rolling it correctly for every fetch is tedious and bug-prone. You'll learn
        <code>useEffect</code> properly in Part 40, but its <em>misuse</em> for data fetching is one of the
        most common sources of bugs in React codebases.</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "What professionals actually do",
        body: `<p>In modern React, you rarely fetch with raw <code>useEffect</code>. Instead:</p>
        <ul>
          <li><strong>TanStack Query</strong> (Part 70) — handles caching, loading/error state, retries,
          refetching, and deduping in a few lines. The industry standard for client-side data.</li>
          <li><strong>React Server Components + Server Actions</strong> (Part 80, with Next.js) — fetch on the
          server, before the component reaches the browser, with no loading flicker at all.</li>
          <li><strong>Suspense + the <code>use()</code> hook</strong> (Part 50) — React's built-in way to read
          async data declaratively.</li>
        </ul>
        <p>Knowing the manual version makes you appreciate (and correctly configure) these tools — but don't
        build production apps on hand-rolled <code>useEffect</code> fetching.</p>`,
      })}

      <h2>For now: a simple, honest version</h2>
      <p>
        To keep momentum in Part 30 without a backend, fetch from a public API or load local data. The
        rendering logic — loading, error, success — is exactly what you've practiced. The
        <em>fetching mechanism</em> is what graduates over the next parts.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "A pragmatic Part 30 fetch",
        readOnly: true,
        code: `useEffect(() => {
  const controller = new AbortController(); // modern cancellation
  fetch("https://dummyjson.com/recipes?limit=12", { signal: controller.signal })
    .then((r) => r.json())
    .then((data) => setRecipes(data.recipes))
    .catch((e) => { if (e.name !== "AbortError") setError(String(e)); });
  return () => controller.abort();
}, []);`,
      })}

      ${h.exercise({
        title: "Load real recipes",
        prompt: `<p>Fetch recipes from a free public API (e.g. <code>https://dummyjson.com/recipes</code>) into
        your Recipe Finder using the pattern above, and render the loading, error, and success states you
        built earlier. Make your search box filter the fetched results. It works — and you now understand
        both <em>why</em> it's more fragile than it looks and <em>what</em> you'll replace it with in Parts
        50, 70, and 80.</p>`,
        runHint: "pnpm vite",
      })}
    </section>
  `,
});
