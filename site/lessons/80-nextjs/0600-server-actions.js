/* Lesson 80-nextjs/0600 — Mutations with Server Actions. */
registerLesson({
  meta: {
    id: "80-nextjs/0600-server-actions",
    title: "Mutations with Server Actions",
    part: "80-nextjs",
    estMinutes: 18,
    level: "advanced",
    project: "next-saas",
    lede: "Server Actions are functions that run on the server but are called from the client like normal functions. They're how you mutate data in Next.js — no API endpoint, no fetch, just a typed function call across the network.",
    objectives: [
      "Write Server Actions with 'use server'",
      "Call actions from forms and event handlers",
      "Revalidate data after a mutation",
      "Understand the security model",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>What is a Server Action?</h2>
      <p>
        A <strong>Server Action</strong> is an async function marked <code>"use server"</code>. Next creates a
        hidden, secure endpoint for it automatically — so you can call it from a Client Component as if it were
        local, but it actually runs on the server (where it can touch the database, read secrets, etc.). It's
        the React Actions model (Part 50) extended across the network.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "A Server Action",
        readOnly: true,
        code: `// app/projects/actions.ts
"use server"; // marks every export as a Server Action

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createSchema = z.object({ name: z.string().min(1).max(100) });

export async function createProject(formData: FormData) {
  const parsed = createSchema.parse({ name: formData.get("name") });
  await db.insert(projects).values({ name: parsed.name }); // runs on server
  revalidatePath("/dashboard"); // refresh the cached page that lists projects
}`,
      })}

      ${h.codePane({
        lang: "tsx",
        title: "Calling it from a form",
        readOnly: true,
        code: `import { createProject } from "./actions";

// This can even be a Server Component — no client JS needed for a basic form!
export default function NewProjectForm() {
  return (
    <form action={createProject}>   {/* pass the action to the form */}
      <input name="name" required />
      <button type="submit">Create</button>
    </form>
  );
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "The API layer disappears",
        body: `<p>Traditionally, mutating data meant: write an API route, define request/response types, fetch from
        the client, handle JSON, wire CORS, keep client and server types in sync. Server Actions collapse all of
        that into <strong>a typed function call</strong>. You call <code>createProject(formData)</code> and it
        runs on the server with full type safety end to end. This is a profound simplification of full-stack
        development — and it works even without client-side JavaScript (progressive enhancement: the form submits
        the old-fashioned way if JS hasn't loaded). It's one of the most important shifts in modern React.</p>`,
      })}

      <h2>Revalidation: keeping the UI fresh</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Refresh after mutating",
        readOnly: true,
        code: `import { revalidatePath, revalidateTag } from "next/cache";

// After a mutation, tell Next which cached data is now stale:
revalidatePath("/dashboard");        // re-render this route's data
revalidateTag("projects");           // re-fetch anything tagged "projects"
// The page updates automatically with fresh server data — the Server Actions
// equivalent of TanStack Query's invalidateQueries.`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Always validate and authorize inside the action",
        body: `<p>A Server Action is a public endpoint — anyone can call it with any input. So <strong>never trust
        its arguments</strong>: validate every input with Zod (Part 70) and check authorization (is this user
        allowed to do this?) <em>inside</em> the action, every time. "The form only sends valid data" is false —
        an attacker can call the action directly. Treat each action like the secure API endpoint it actually is.
        We cover auth in Lessons 11–12; the habit of "validate + authorize at the top of every action" starts
        now.</p>`,
      })}

      <h2>Calling actions from event handlers</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Not just forms",
        readOnly: true,
        code: `"use client";
import { deleteProject } from "./actions";
import { useTransition } from "react";

export function DeleteButton({ id }: { id: string }) {
  const [pending, start] = useTransition();
  return (
    <button disabled={pending}
      onClick={() => start(() => deleteProject(id))}>
      {pending ? "Deleting…" : "Delete"}
    </button>
  );
}`,
      })}

      ${h.exercise({
        title: "Add a Server Action",
        prompt: `<p>In LaunchPad, create <code>actions.ts</code> with a <code>"use server"</code>
        <code>createProject(formData)</code> action that validates input with Zod and (for now) stores it in a
        simple in-memory array or logs it, then <code>revalidatePath</code>s the dashboard. Wire a form to it.
        Add a <code>deleteProject</code> action called from a client delete button via
        <code>useTransition</code>. Notice you wrote zero fetch code and zero API routes.</p>`,
        runHint: "pnpm --filter next-saas dev",
      })}
    </section>
  `,
});
