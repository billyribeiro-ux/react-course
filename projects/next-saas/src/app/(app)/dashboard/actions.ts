"use server";

import { revalidatePath } from "next/cache";
import { newProjectSchema, type FormState } from "@/lib/schemas";
import { createProject, deleteProject } from "@/data/projects";

// A Server Action: validates on the server (never trust the client), mutates
// via the authorized DAL, then revalidates the cached page (Part 80/0600-0700).
export async function createProjectAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = newProjectSchema.safeParse({
    name: formData.get("name"),
    budget: formData.get("budget"),
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      (fieldErrors[key] ??= []).push(issue.message);
    }
    return { fieldErrors };
  }

  try {
    await createProject(parsed.data);
  } catch {
    return { error: "Could not create the project." };
  }

  revalidatePath("/dashboard");
  return { ok: true };
}

export async function deleteProjectAction(id: string): Promise<void> {
  await deleteProject(id); // DAL authorizes + checks ownership
  revalidatePath("/dashboard");
}
