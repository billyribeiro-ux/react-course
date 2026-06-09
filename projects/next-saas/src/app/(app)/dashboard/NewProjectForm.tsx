"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createProjectAction } from "./actions";
import type { FormState } from "@/lib/schemas";

function SubmitButton() {
  const { pending } = useFormStatus(); // reads the enclosing <form> (Part 50/0800)
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Adding…" : "Add project"}
    </button>
  );
}

export function NewProjectForm() {
  const [state, formAction] = useActionState<FormState, FormData>(
    createProjectAction,
    {}
  );

  return (
    <form action={formAction} className="new-project">
      <div>
        <input name="name" placeholder="Project name" aria-label="Project name" />
        {state.fieldErrors?.name && (
          <span role="alert">{state.fieldErrors.name[0]}</span>
        )}
      </div>
      <div>
        <input
          name="budget"
          type="number"
          placeholder="Budget"
          aria-label="Budget"
          defaultValue={0}
        />
        {state.fieldErrors?.budget && (
          <span role="alert">{state.fieldErrors.budget[0]}</span>
        )}
      </div>
      <SubmitButton />
      {state.error && <span role="alert">{state.error}</span>}
    </form>
  );
}
