/* Lesson 80-nextjs/2100 — Project: ship LaunchPad. */
registerLesson({
  meta: {
    id: "80-nextjs/2100-project-launchpad",
    title: "Project: Ship LaunchPad (Full-Stack SaaS)",
    part: "80-nextjs",
    estMinutes: 90,
    level: "advanced",
    project: "next-saas",
    lede: "Assemble all of Part 80 into a complete, deployed, production-quality SaaS: auth, a database, Server Components and Actions, a dashboard, billing-ready structure, SEO, observability, and a real deployment.",
    objectives: [
      "Integrate every Next.js 16 capability into one product",
      "Apply security, performance, and SEO best practices",
      "Ship a deployed, working full-stack app",
      "Have a portfolio-grade project you understand fully",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>What you're shipping</h2>
      <p>
        <strong>LaunchPad</strong>: a multi-tenant SaaS where users sign up, log in, and manage their projects.
        Marketing pages (static), an authenticated dashboard (dynamic/PPR), full CRUD via Server Actions, a real
        Postgres database via Drizzle behind an authorized DAL, file uploads, SEO, error tracking, and a live
        deployment with preview environments.
      </p>

      ${h.callout({
        kind: "principal",
        title: "This is a real product, built the real way",
        body: `<p>Everything here is how production SaaS is actually built in 2026. By completing it you'll have done
        — end to end — what many engineers only do pieces of: authentication, authorization, a database with
        migrations, server-rendered and streamed UI, mutations with validation, file handling, SEO, observability,
        and deployment. This is the project that proves you can ship full products, not just components. Build it
        carefully and it's the centerpiece of your portfolio.</p>`,
      })}

      <h2>The build checklist</h2>
      <ul>
        <li><strong>Auth</strong> — sign up / log in (credentials + OAuth), sessions via httpOnly cookies, protected routes.</li>
        <li><strong>Data</strong> — Drizzle + Postgres schema, migrations, an authorized <code>server-only</code> DAL scoping every query to the user.</li>
        <li><strong>Structure</strong> — route groups for marketing vs app, nested layouts with a persistent sidebar.</li>
        <li><strong>CRUD</strong> — create/update/delete projects via Server Actions with Zod validation and revalidation; optimistic UI where it helps.</li>
        <li><strong>Rendering</strong> — static marketing, dynamic dashboard, PPR where useful, <code>loading.tsx</code>/<code>error.tsx</code> everywhere.</li>
        <li><strong>Files</strong> — avatar/attachment upload to object storage; <code>next/image</code> throughout.</li>
        <li><strong>Polish</strong> — metadata/SEO, sitemap, your Part 60 design system (shared-ui), full accessibility.</li>
        <li><strong>Ops</strong> — validated env config, Sentry error tracking, and a real deployment with preview deploys.</li>
      </ul>

      ${h.codePane({
        lang: "tsx",
        title: "The shape of a LaunchPad dashboard page",
        readOnly: true,
        code: `// app/(app)/dashboard/page.tsx — Server Component
import { getMyProjects } from "@/data/projects"; // authorized DAL
import { NewProjectForm } from "./NewProjectForm"; // client island
import { Suspense } from "react";

export default async function DashboardPage() {
  const projects = await getMyProjects(); // scoped to the logged-in user
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Your projects</h1>
      <NewProjectForm />                 {/* Server Action + useActionState */}
      <Suspense fallback={<ProjectsSkeleton />}>
        <ProjectGrid projects={projects} />
      </Suspense>
    </div>
  );
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Every quality gate, green",
        body: `<p>Hold the project to a professional bar: <code>pnpm typecheck</code>, <code>pnpm lint</code>, and
        <code>pnpm build</code> all pass; the React Compiler optimizes it; every query is authorized and scoped;
        secrets are server-only and validated; images are optimized; pages handle loading/error/empty; metadata is
        set; errors are tracked. These aren't extras — they're what "production-quality" means. You've practiced
        each one; now they converge in a single product.</p>`,
      })}

      ${h.exercise({
        title: "Build and deploy LaunchPad",
        prompt: `<p>Complete LaunchPad to the checklist above and <strong>deploy it live</strong> with a real
        database and auth. Add <strong>one signature feature of your own</strong> — team invitations, a billing
        integration stub, an activity feed, API keys for users, anything. Ensure all quality gates pass, then ship
        it and use the production URL yourself. Commit and push. You have built and deployed a real full-stack
        SaaS.</p>`,
        runHint: "pnpm --filter next-saas build",
      })}

      ${h.callout({
        kind: "principal",
        title: "You're a full-stack engineer now",
        body: `<p>Pause and recognize what you've done: you took an idea and shipped a complete, secure, fast,
        deployed product — frontend, backend, database, auth, and ops. That's the full arc of building software.
        Many people call themselves "React developers" and can't do this; you can. Next, Part 90 takes React to
        phones with React Native + Expo, reusing your shared types and design system on mobile. Then testing
        (A0), principal-level architecture (B0), and the capstones. You're deep into L7++ territory now. 🚀</p>`,
      })}
    </section>
  `,
});
