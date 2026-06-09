import { z } from "zod";

// Shared schema → validates on the server AND types the data (Parts 70/80).
export const newProjectSchema = z.object({
  name: z.string().min(1, "Name is required").max(80),
  budget: z.coerce.number().int().nonnegative("Budget can't be negative"),
});

export type NewProject = z.infer<typeof newProjectSchema>;

// The result a Server Action returns to useActionState (Parts 50/80).
export interface FormState {
  error?: string;
  fieldErrors?: Record<string, string[]>;
  ok?: boolean;
}
