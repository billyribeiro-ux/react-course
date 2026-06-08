/* Lesson 80-nextjs/1000 — The Data Access Layer pattern. */
registerLesson({
  meta: {
    id: "80-nextjs/1000-data-access-layer",
    title: "The Data Access Layer (DAL) Pattern",
    part: "80-nextjs",
    estMinutes: 14,
    level: "advanced",
    project: "next-saas",
    lede: "Scattering database queries throughout your components works until it doesn't. A Data Access Layer centralizes data access behind a clean, authorized, testable API — a principal-grade architecture decision.",
    objectives: [
      "Centralize data access in a DAL",
      "Co-locate authorization with data access",
      "Keep components free of raw queries",
      "Make data access testable and consistent",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The problem with scattered queries</h2>
      <p>
        It's tempting to write <code>db.query...</code> directly in every Server Component and Action. At small
        scale it's fine; as the app grows, query logic and authorization checks get duplicated and inconsistent,
        and it's hard to reason about "who can access what." A <strong>Data Access Layer (DAL)</strong> fixes
        this: a dedicated module that owns all data access, with authorization baked in.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "src/data/projects.ts — the DAL",
        readOnly: true,
        code: `import "server-only"; // ensures this never ends up in a client bundle
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { getCurrentUser } from "@/auth";

// Every function authorizes, then queries. Components never see raw SQL.
export async function getMyProjects() {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");
  return db.select().from(projects).where(eq(projects.ownerId, user.id));
}

export async function getProject(id: number) {
  const user = await getCurrentUser();
  const [project] = await db.select().from(projects)
    .where(and(eq(projects.id, id), eq(projects.ownerId, user.id))); // scoped!
  return project ?? null;
}`,
      })}

      ${h.codePane({
        lang: "tsx",
        title: "Components stay clean",
        readOnly: true,
        code: `// app/dashboard/page.tsx
import { getMyProjects } from "@/data/projects";

export default async function Dashboard() {
  const projects = await getMyProjects(); // authorized + typed, no SQL here
  return <ProjectList projects={projects} />;
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Authorize at the data layer, not just the page",
        body: `<p>The most important benefit: <strong>authorization lives next to data access</strong>. Every DAL
        function checks "who is asking, and are they allowed?" and scopes queries to that user (<code>where
        ownerId = currentUser</code>). This is far safer than checking permissions in the page or middleware
        alone — because <em>every</em> path to the data goes through the DAL, you can't forget a check in some
        new component. The Next.js team explicitly recommends this pattern for security. A leaked record almost
        always traces back to data access that wasn't scoped to the user; centralizing it makes that bug nearly
        impossible.</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "server-only and separation of concerns",
        body: `<p>Marking the DAL <code>import "server-only"</code> makes it a <strong>build error</strong> if it's
        ever imported into client code — a hard guarantee your queries and secrets stay server-side. The DAL also
        gives you one place to add caching, logging, and consistent error handling, and it makes data access
        <strong>testable</strong> in isolation (Part A0). Separating "how we get data" from "how we display it" is
        a timeless architectural principle; the DAL is its expression in a Next.js app.</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        body: `<p>Don't over-build the DAL on day one — start with a simple module of functions and let it grow.
        The pattern is about <em>centralizing and authorizing</em> data access, not about heavy abstraction.
        Premature layering (repositories, services, etc.) for a small app is its own anti-pattern. Match the
        structure to the app's real complexity.</p>`,
      })}

      ${h.exercise({
        title: "Build LaunchPad's DAL",
        prompt: `<p>Refactor LaunchPad so all database access goes through a <code>src/data/</code> module marked
        <code>server-only</code>. Each function should authorize the current user and scope queries to them
        (<code>ownerId = user.id</code>). Update your Server Components and Actions to call the DAL instead of
        querying directly. Now there's exactly one place that controls data access — and it's always
        authorized.</p>`,
        runHint: "pnpm --filter next-saas dev",
      })}
    </section>
  `,
});
