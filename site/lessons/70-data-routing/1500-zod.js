/* Lesson 70-data-routing/1500 — Validation & schemas with Zod. */
registerLesson({
  meta: {
    id: "70-data-routing/1500-zod",
    title: "Validation & Schemas with Zod",
    part: "70-data-routing",
    estMinutes: 16,
    level: "advanced",
    project: "data-routing-app",
    lede: "Zod lets you define a schema once and get both runtime validation AND a TypeScript type from it. It's the bridge between your typed code and the untyped outside world — and it pairs perfectly with React Hook Form.",
    objectives: [
      "Define schemas and infer types with Zod",
      "Validate form input with RHF + Zod",
      "Validate untrusted data at boundaries",
      "Share one schema across client and server",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>One schema, runtime + types</h2>
      <p>
        Recall from Part 20: TypeScript types vanish at runtime, so they can't validate data arriving from forms,
        APIs, or <code>localStorage</code>. <strong>Zod</strong> closes that gap — you define a schema that
        validates at runtime <em>and</em> infers a TypeScript type, so the two never drift apart.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "Schema → type + validation",
        readOnly: true,
        code: `import { z } from "zod";

const jobSchema = z.object({
  title: z.string().min(1, "Title is required").max(80),
  company: z.string().min(1, "Company is required"),
  location: z.string().min(1),
  remote: z.boolean(),
  salary: z.number().int().positive("Salary must be positive"),
});

// Infer the TypeScript type FROM the schema — single source of truth:
type JobForm = z.infer<typeof jobSchema>;
// { title: string; company: string; location: string; remote: boolean; salary: number }`,
      })}

      <h2>RHF + Zod: the canonical forms stack</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Wire Zod into React Hook Form",
        readOnly: true,
        code: `import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function NewJobForm() {
  const { register, handleSubmit, formState: { errors } } =
    useForm<JobForm>({ resolver: zodResolver(jobSchema) });
  // Now every validation rule lives in the schema, not scattered in JSX.
  // Errors come straight from Zod's messages, fully typed.
  return (
    <form onSubmit={handleSubmit((data) => createJob(data))}>
      <input {...register("title")} />
      {errors.title && <p role="alert">{errors.title.message}</p>}
      {/* ... */}
    </form>
  );
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Validate at every boundary",
        body: `<p>Zod isn't just for forms — it's for <strong>any untrusted input</strong>: API responses
        (<code>jobSchema.parse(await res.json())</code>), <code>localStorage</code> reads, URL params (you used it
        in TanStack Router's <code>validateSearch</code>!), environment variables, webhook payloads. TypeScript
        guards your code's <em>internal</em> consistency; Zod guards the <em>boundary</em> where unknown data
        enters. A principal-grade app validates external data at the edge and trusts it internally — turning
        <code>unknown</code> into a typed value safely (Part 20). This discipline prevents a whole class of
        runtime crashes from malformed data.</p>`,
      })}

      <h2>Parsing and safe parsing</h2>
      ${h.codePane({
        lang: "tsx",
        title: "parse vs safeParse",
        readOnly: true,
        code: `// parse: returns typed data or THROWS on invalid (use in try/catch):
const job = jobSchema.parse(unknownData); // job: JobForm

// safeParse: returns a result object, never throws:
const result = jobSchema.safeParse(unknownData);
if (result.success) {
  use(result.data);   // typed
} else {
  console.log(result.error.issues); // detailed validation errors
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "One schema, client AND server",
        body: `<p>The biggest payoff comes in full-stack apps (Part 80): define the schema <strong>once</strong> in
        shared code, validate the form with it on the client (instant feedback) <em>and</em> re-validate the same
        data on the server (never trust the client). Same rules, same types, no duplication, no drift. This
        client+server schema sharing is a defining pattern of modern TypeScript full-stack development, and Zod is
        the de-facto tool for it. You'll use exactly this in Next.js Server Actions.</p>`,
      })}

      ${h.exercise({
        title: "Bulletproof your form and boundaries",
        prompt: `<p>Refactor your "Post a Job" form to validate with a Zod <code>jobSchema</code> via
        <code>zodResolver</code>, inferring the form type from the schema. Then add Zod validation to one data
        boundary: <code>safeParse</code> the response from your fake API (or a real public one) before using it,
        handling invalid data gracefully. You now validate both what users type and what servers send — the full
        boundary discipline.</p>`,
        runHint: "pnpm --filter data-routing-app dev",
      })}
    </section>
  `,
});
