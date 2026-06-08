/* Lesson 70-data-routing/1400 — Forms with React Hook Form. */
registerLesson({
  meta: {
    id: "70-data-routing/1400-react-hook-form",
    title: "Forms with React Hook Form",
    part: "70-data-routing",
    estMinutes: 16,
    level: "advanced",
    project: "data-routing-app",
    lede: "Controlled inputs (Part 30) are great for learning but re-render on every keystroke and get verbose for big forms. React Hook Form is the production standard: performant, minimal, and built for real forms.",
    objectives: [
      "Build a form with React Hook Form",
      "Register fields and handle submission",
      "Display validation errors",
      "Understand uncontrolled performance",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Why a form library?</h2>
      <p>
        Part 30's controlled inputs put every field in state, so the whole form re-renders on every keystroke and
        you write a lot of <code>value</code>/<code>onChange</code> boilerplate. <strong>React Hook Form (RHF)</strong>
        uses <em>uncontrolled</em> inputs with refs — minimal re-renders, less code, and great validation — which is
        why it dominates production forms.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "A React Hook Form",
        readOnly: true,
        code: `import { useForm } from "react-hook-form";

interface JobFormValues { title: string; company: string; salary: number; }

function NewJobForm({ onSubmit }: { onSubmit: (v: JobFormValues) => void }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<JobFormValues>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("title", { required: "Title is required" })} />
      {errors.title && <p role="alert">{errors.title.message}</p>}

      <input {...register("company", { required: true })} />

      <input type="number"
             {...register("salary", { valueAsNumber: true, min: 0 })} />

      <button disabled={isSubmitting}>Post job</button>
    </form>
  );
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Uncontrolled = fast",
        body: `<p>RHF lets the DOM hold the input values (via <code>register</code>'s ref) and only reads them when
        needed (on submit, or on validation). So typing in one field doesn't re-render the whole form — a big deal
        for large forms where controlled inputs cause lag. You get performance <em>and</em> less code. The
        trade-off vs controlled inputs is that you don't react to every keystroke by default — but when you need
        a live value, RHF's <code>watch</code> gives it to you surgically. For the vast majority of real forms,
        RHF is the right default.</p>`,
      })}

      <h2>Submission, errors, and state</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Form state you get for free",
        readOnly: true,
        code: `const { formState } = useForm();
formState.errors        // per-field validation errors
formState.isSubmitting  // disable the button, show a spinner
formState.isDirty       // has the user changed anything?
formState.isValid       // are all validations passing?

// handleSubmit validates first, then calls your onSubmit only if valid:
<form onSubmit={handleSubmit(onValid, onInvalid)}>`,
      })}

      ${h.callout({
        kind: "tip",
        title: "Controlled libraries need the Controller",
        body: `<p>Native inputs work with <code>register</code> directly. For custom/3rd-party components that don't
        forward refs (a fancy select, a date picker), RHF provides the <code>&lt;Controller&gt;</code> wrapper to
        bridge them. Your shadcn/Radix inputs from Part 60 integrate this way. Know <code>Controller</code> exists
        for when <code>register</code> alone isn't enough.</p>`,
      })}

      ${h.callout({
        kind: "principal",
        body: `<p>RHF handles the <em>mechanics</em> of forms (registration, submission, performance, error display).
        For the <em>rules</em> of validation, you'll plug in a schema with Zod (next lesson) instead of inline
        <code>required</code>/<code>min</code> options — giving you one typed schema that validates the form
        <em>and</em> types your data. RHF + Zod is the canonical 2026 forms stack.</p>`,
      })}

      ${h.exercise({
        title: "Build a real form",
        prompt: `<p>In the Job Board, build a "Post a Job" form with React Hook Form: title, company, location,
        a remote checkbox, and salary (as a number). Show validation errors inline, disable the submit button
        while submitting, and on submit call a <code>useMutation</code> (Lesson 7) that adds the job and
        invalidates the list. Notice how little re-rendering happens as you type. Next lesson you'll add Zod for
        bulletproof validation.</p>`,
        runHint: "pnpm --filter data-routing-app dev",
      })}
    </section>
  `,
});
