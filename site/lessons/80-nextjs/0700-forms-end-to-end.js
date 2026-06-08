/* Lesson 80-nextjs/0700 — Forms end-to-end with Actions + useActionState + Zod. */
registerLesson({
  meta: {
    id: "80-nextjs/0700-forms-end-to-end",
    title: "Forms End-to-End: Actions + useActionState + Zod",
    part: "80-nextjs",
    estMinutes: 18,
    level: "advanced",
    project: "next-saas",
    lede: "Combine everything: a form that validates on the server with Zod, returns typed errors via useActionState, shows pending state, and updates optimistically — the complete, production-grade full-stack form.",
    objectives: [
      "Build a full-stack form with progressive enhancement",
      "Return validation errors from a Server Action",
      "Wire useActionState for pending and errors",
      "Share one Zod schema across client and server",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The complete pattern</h2>
      <p>
        This ties together React 19 Actions (Part 50), Zod (Part 70), and Next Server Actions into the canonical
        full-stack form. The Server Action validates and returns a typed result; <code>useActionState</code> on
        the client surfaces errors and pending state.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "The Server Action returns a typed result",
        readOnly: true,
        code: `// app/projects/actions.ts
"use server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  budget: z.coerce.number().int().positive("Budget must be positive"),
});

export type FormState = { error?: string; fieldErrors?: Record<string, string[]> };

export async function createProject(
  _prev: FormState, formData: FormData,
): Promise<FormState> {
  const result = schema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return { fieldErrors: result.error.flatten().fieldErrors };
  }
  // ... authorize, then insert into the DB ...
  await db.insert(projects).values(result.data);
  revalidatePath("/dashboard");
  return {}; // success
}`,
      })}

      ${h.codePane({
        lang: "tsx",
        title: "The client form with useActionState",
        readOnly: true,
        code: `"use client";
import { useActionState } from "react";
import { createProject, type FormState } from "./actions";

export function NewProjectForm() {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    createProject, {}
  );

  return (
    <form action={formAction}>
      <input name="name" disabled={isPending} />
      {state.fieldErrors?.name && <p role="alert">{state.fieldErrors.name[0]}</p>}

      <input name="budget" type="number" disabled={isPending} />
      {state.fieldErrors?.budget && <p role="alert">{state.fieldErrors.budget[0]}</p>}

      <SubmitButton />  {/* useFormStatus button from Part 50 */}
    </form>
  );
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "One schema, validated twice — correctly",
        body: `<p>The Zod schema lives in shared code and runs on the <strong>server</strong> (the source of truth —
        never trust the client) inside the action. You can <em>also</em> run it on the client for instant feedback
        (with React Hook Form + <code>zodResolver</code>), but the server validation is the one that protects your
        data. Same schema, same types, no duplication. This "validate on the client for UX, on the server for
        security" pattern — with a single shared schema — is the gold standard for full-stack forms and a direct
        payoff of everything you learned in Parts 20, 50, and 70.</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Progressive enhancement for free",
        body: `<p>Because the form uses <code>action={formAction}</code>, it <strong>works without JavaScript</strong>
        — submit it before the JS loads and the browser posts to the Server Action the old-fashioned way; the
        server validates and responds. When JS is present, you get the enhanced experience (no full reload,
        pending state, inline errors). Building on web fundamentals means your app is resilient by default —
        a hallmark of thoughtful engineering.</p>`,
      })}

      ${h.callout({
        kind: "tip",
        title: "Add optimism where it helps",
        body: `<p>For snappy lists, layer <code>useOptimistic</code> (Part 50) on top: show the new project
        instantly while the action runs, reconciling when revalidation completes. Full-stack + optimistic +
        validated + progressively enhanced is the complete package.</p>`,
      })}

      ${h.exercise({
        title: "Build the full-stack form",
        prompt: `<p>Build LaunchPad's "New Project" form end-to-end: a shared Zod schema, a Server Action that
        <code>safeParse</code>s and returns <code>fieldErrors</code>, a client form using
        <code>useActionState</code> that shows inline errors and a pending state, and a <code>SubmitButton</code>
        using <code>useFormStatus</code>. Disable JS in DevTools and confirm the form still submits and validates
        (progressive enhancement). This is a real production form.</p>`,
        runHint: "pnpm --filter next-saas dev",
      })}
    </section>
  `,
});
