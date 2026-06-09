import { z } from "zod";

// One schema → runtime validation AND the inferred TS type (Part 70/1500).
export const newJobSchema = z.object({
  title: z.string().min(1, "Title is required").max(80),
  company: z.string().min(1, "Company is required"),
  location: z.string().min(1, "Location is required"),
  remote: z.boolean(),
  // z.number() (not z.coerce) keeps the form's input and output types identical
  // (number), so useForm<NewJob> types cleanly. The input is converted to a
  // number at the field via register(..., { valueAsNumber: true }).
  salary: z.number().int().positive("Salary must be a positive number"),
});

export type NewJob = z.infer<typeof newJobSchema>;

// Validated, typed URL search params for the jobs list (Part 70/0300, 1300).
export const jobsSearchSchema = z.object({
  q: z.string().default(""),
  remote: z.boolean().default(false),
  sort: z.enum(["title", "salary"]).default("title"),
});

export type JobsSearch = z.infer<typeof jobsSearchSchema>;
