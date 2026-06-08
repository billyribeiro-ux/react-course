/* Lesson 80-nextjs/1700 — Caching, revalidation & ISR. */
registerLesson({
  meta: {
    id: "80-nextjs/1700-caching-revalidation",
    title: "Caching, Revalidation & ISR",
    part: "80-nextjs",
    estMinutes: 16,
    level: "advanced",
    project: "next-saas",
    lede: "Caching is what makes apps fast and cheap — and getting it wrong shows users stale data. Next's caching is powerful but subtle. Learn the model: what's cached, how to revalidate, and ISR.",
    objectives: [
      "Understand Next's caching layers",
      "Revalidate by time, path, and tag",
      "Use ISR for periodically-updated static pages",
      "Avoid stale-data and over-caching pitfalls",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The caching mental model</h2>
      <p>
        Next can cache the result of data fetches and rendered routes so it doesn't redo work on every request.
        The key questions for any data: <strong>is it cached, and when does it become stale?</strong> You control
        this explicitly — modern Next defaults to <em>not</em> caching fetches unless you opt in, making behavior
        more predictable.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "Controlling fetch caching",
        readOnly: true,
        code: `// Cache this fetch and revalidate it at most once an hour (ISR-style):
await fetch(url, { next: { revalidate: 3600 } });

// Tag a fetch so you can invalidate it on demand later:
await fetch(url, { next: { tags: ["projects"] } });

// Never cache (always fresh):
await fetch(url, { cache: "no-store" });`,
      })}

      <h2>On-demand revalidation</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Revalidate after a mutation",
        readOnly: true,
        code: `import { revalidatePath, revalidateTag } from "next/cache";

// In a Server Action, after changing data:
revalidatePath("/dashboard");   // re-render this route on next visit
revalidateTag("projects");      // re-fetch everything tagged "projects"

// Or from a webhook (e.g. your CMS publishes) via a Route Handler:
// POST /api/revalidate -> revalidateTag("blog")`,
      })}

      <h2>ISR: static that updates</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Incremental Static Regeneration",
        readOnly: true,
        code: `// A page that's static but regenerates in the background periodically:
export const revalidate = 3600; // re-generate at most hourly

export default async function PricingPage() {
  const plans = await getPlans(); // fetched at build, refreshed hourly
  return <PlanGrid plans={plans} />;
}
// Users always get a fast static page; it quietly refreshes on a schedule.`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Caching is a correctness AND performance concern",
        body: `<p>Caching makes apps fast and cheap, but stale data is a real bug — a user updates their profile
        and still sees the old name because a cache wasn't revalidated. The discipline: <strong>cache aggressively
        what's safe to cache, and revalidate precisely after mutations</strong> (by path or tag). Tag-based
        revalidation is especially powerful — tag related data and invalidate it all with one call after a change.
        Reasoning carefully about "what's cached and when does it refresh" for each piece of data is a defining
        senior skill. Both over-caching (stale data) and under-caching (slow, expensive) are failures; the art is
        the right boundary.</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Dynamic APIs opt out of caching",
        body: `<p>Using <code>cookies()</code>, <code>headers()</code>, <code>searchParams</code>, or
        <code>cache: "no-store"</code> makes a route dynamic and uncached. That's correct for personalized pages,
        but a stray dynamic API can accidentally de-optimize a page you wanted static. Check the build output (○
        static vs ƒ dynamic) to confirm each route renders as you intend — surprises there are common.</p>`,
      })}

      ${h.exercise({
        title: "Tune LaunchPad's caching",
        prompt: `<p>Make LaunchPad's public pricing page ISR (<code>export const revalidate</code>). Tag your
        project data fetches and have your create/update/delete Server Actions <code>revalidateTag</code> them so
        the dashboard updates immediately after mutations. Verify: change a project, see it update without a stale
        flash; reload the pricing page repeatedly and confirm it's served fast/static. Inspect the build output to
        confirm each route's strategy.</p>`,
        runHint: "pnpm --filter next-saas build",
      })}
    </section>
  `,
});
