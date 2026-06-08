/* Lesson 80-nextjs/0800 — Route Handlers (APIs). */
registerLesson({
  meta: {
    id: "80-nextjs/0800-route-handlers",
    title: "Route Handlers: Building APIs",
    part: "80-nextjs",
    estMinutes: 14,
    level: "advanced",
    project: "next-saas",
    lede: "Server Actions cover mutations from your own UI, but sometimes you need a real HTTP API — for webhooks, mobile clients, or third parties. Route Handlers let you build REST/JSON endpoints in the App Router.",
    objectives: [
      "Create API endpoints with route.ts",
      "Handle GET/POST and read request data",
      "Return typed JSON responses",
      "Know when to use handlers vs Server Actions",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>route.ts = an HTTP endpoint</h2>
      <p>
        A <code>route.ts</code> file exports functions named after HTTP methods (<code>GET</code>,
        <code>POST</code>, etc.). It's a standard request/response handler built on the Web
        <code>Request</code>/<code>Response</code> APIs.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "app/api/projects/route.ts",
        readOnly: true,
        code: `import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET() {
  const projects = await db.query.projects.findMany();
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = z.object({ name: z.string().min(1) }).safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid" }, { status: 400 });
  }
  const [created] = await db.insert(projects).values(parsed.data).returning();
  return NextResponse.json(created, { status: 201 });
}`,
      })}

      ${h.codePane({
        lang: "tsx",
        title: "Dynamic API routes & params",
        readOnly: true,
        code: `// app/api/projects/[id]/route.ts
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;          // async params (Next 16)
  const project = await getProject(id);
  if (!project) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(project);
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Server Actions vs Route Handlers — when to use which",
        body: `<p><strong>Server Actions</strong> are for mutations triggered by <em>your own</em> UI — they're
        typed function calls, no manual fetch, perfect for forms and buttons. <strong>Route Handlers</strong> are
        for when you need a genuine HTTP API: receiving <strong>webhooks</strong> (Stripe, GitHub), serving a
        <strong>mobile app</strong> or third-party clients, building a <strong>public API</strong>, OAuth
        callbacks, cron endpoints, or streaming/file responses. Rule of thumb: internal app mutations → Server
        Actions; external/programmatic HTTP access → Route Handlers. Many apps use both. Choosing correctly is a
        common interview and architecture question.</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Same security rules apply",
        body: `<p>Route Handlers are public HTTP endpoints — validate input with Zod and check auth on every
        request, exactly like Server Actions. For webhooks, verify the signature (e.g. Stripe's signing secret)
        to confirm the request really came from the provider. Never assume a request is trustworthy because it
        hit your endpoint.</p>`,
      })}

      ${h.exercise({
        title: "Build a small API",
        prompt: `<p>Add a <code>GET /api/health</code> route handler that returns
        <code>{ status: "ok", time: ... }</code> as JSON, and a <code>GET/POST /api/projects</code> handler that
        lists and creates projects (with Zod validation and proper status codes). Test them with your browser and
        <code>curl</code>/fetch. Then write a note: which of LaunchPad's features should be Server Actions and
        which should be Route Handlers, and why?</p>`,
        runHint: "pnpm --filter next-saas dev",
      })}
    </section>
  `,
});
