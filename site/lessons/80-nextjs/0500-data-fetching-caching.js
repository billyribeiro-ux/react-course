/* Lesson 80-nextjs/0500 — Data fetching & the caching model. */
registerLesson({
  meta: {
    id: "80-nextjs/0500-data-fetching-caching",
    title: "Data Fetching & the Caching Model",
    part: "80-nextjs",
    estMinutes: 17,
    level: "advanced",
    project: "next-saas",
    lede: "Server Components fetch data by just awaiting it — no hooks, no loading state in the component. But the real depth is Next's caching model, which decides whether a page is static, dynamic, or revalidated.",
    objectives: [
      "Fetch data directly in Server Components",
      "Understand static vs dynamic rendering",
      "Control caching and revalidation",
      "Fetch in parallel to avoid waterfalls",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Just await your data</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Data fetching in a Server Component",
        readOnly: true,
        code: `export default async function ProjectsPage() {
  // Fetch directly — runs on the server. No useEffect, no useState,
  // no loading flag in the component (loading.tsx handles that).
  const projects = await db.query.projects.findMany();
  return <ProjectList projects={projects} />;
}

// Or fetch from an external API:
async function getData() {
  const res = await fetch("https://api.example.com/data");
  return res.json();
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "The model is dramatically simpler",
        body: `<p>Compare this to the Part 30 client fetch (useEffect + 3 states + race-condition guards) or even
        TanStack Query: in a Server Component you just <code>await</code>. The data is fetched on the server,
        close to your database, and the finished HTML streams to the user. No client-side loading flicker for the
        initial render, no JS for the fetching logic. For data that's read on page load, Server Component
        fetching is the simplest and fastest approach. (You still use TanStack Query for <em>client-side</em>
        interactivity — they coexist.)</p>`,
      })}

      <h2>Static vs dynamic rendering</h2>
      <p>Next decides how to render each route:</p>
      <ul>
        <li><strong>Static</strong> — rendered at build time into HTML, served from a CDN. Blazing fast. Used when a page doesn't depend on the request (no cookies, no dynamic params, cached data).</li>
        <li><strong>Dynamic</strong> — rendered per request on the server. Used when the page needs request-specific data (the logged-in user, cookies, uncached data, search params).</li>
      </ul>

      ${h.codePane({
        lang: "tsx",
        title: "Controlling rendering",
        readOnly: true,
        code: `// Force a route to render dynamically (per request):
export const dynamic = "force-dynamic";

// Or opt into caching with revalidation (ISR — Lesson 17):
export const revalidate = 3600; // re-generate at most once an hour

// Reading cookies/headers automatically makes a route dynamic:
import { cookies } from "next/headers";
const session = (await cookies()).get("session");`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Static where you can, dynamic where you must",
        body: `<p>A marketing page or a blog post can be <strong>static</strong> — built once, served from a CDN,
        instant worldwide. A user's dashboard must be <strong>dynamic</strong> — it depends on who's logged in.
        The art is making as much static as possible (for speed and cost) while rendering only the truly
        request-specific parts dynamically. Next 16's <strong>Partial Prerendering</strong> (Lesson 15) takes
        this further: one page can be <em>mostly</em> static with dynamic holes. Understanding what makes a route
        dynamic (cookies, headers, <code>searchParams</code>, uncached fetches, <code>force-dynamic</code>) is
        key to performance.</p>`,
      })}

      <h2>Parallel fetching</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Avoid server-side waterfalls",
        readOnly: true,
        code: `// ❌ Sequential — each await waits for the previous (slow):
const user = await getUser();
const projects = await getProjects();

// ✅ Parallel — both start at once, await together:
const [user, projects] = await Promise.all([getUser(), getProjects()]);
// Waterfalls hurt on the server too. Promise.all (Part 10!) is the fix.`,
      })}

      ${h.exercise({
        title: "Fetch and tune caching",
        prompt: `<p>In LaunchPad, make a Server Component page that fetches data (use a local async function or a
        public API). Fetch two independent pieces of data with <code>Promise.all</code>. Experiment with
        <code>export const revalidate</code> and <code>export const dynamic = "force-dynamic"</code> and observe
        the difference in the build output (<code>pnpm --filter next-saas build</code> shows which routes are
        static ○ vs dynamic ƒ). Understanding that output is a real Next.js skill.</p>`,
        runHint: "pnpm --filter next-saas build",
      })}
    </section>
  `,
});
