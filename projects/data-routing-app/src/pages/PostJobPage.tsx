import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { createJob } from "../api.ts";
import { newJobSchema, type NewJob } from "../lib/schemas.ts";

export function PostJobPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // React Hook Form + Zod — the canonical 2026 forms stack (Part 70/1400-1500).
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewJob>({
    resolver: zodResolver(newJobSchema),
    defaultValues: { title: "", company: "", location: "", remote: false, salary: 100000 },
  });

  const mutation = useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      // Invalidate so the list refetches with the new job (Part 70/0700).
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      navigate({ to: "/jobs", search: { q: "", remote: false, sort: "title" } });
    },
  });

  return (
    <section>
      <h1>Post a job</h1>
      <form className="form" onSubmit={handleSubmit((data) => mutation.mutate(data))}>
        <label>
          Title
          <input {...register("title")} />
          {errors.title && <span role="alert">{errors.title.message}</span>}
        </label>
        <label>
          Company
          <input {...register("company")} />
          {errors.company && <span role="alert">{errors.company.message}</span>}
        </label>
        <label>
          Location
          <input {...register("location")} />
          {errors.location && <span role="alert">{errors.location.message}</span>}
        </label>
        <label className="row">
          <input type="checkbox" {...register("remote")} /> Remote
        </label>
        <label>
          Salary (USD)
          <input type="number" {...register("salary", { valueAsNumber: true })} />
          {errors.salary && <span role="alert">{errors.salary.message}</span>}
        </label>
        <button type="submit" disabled={isSubmitting || mutation.isPending}>
          {mutation.isPending ? "Posting…" : "Post job"}
        </button>
        {mutation.isError && <p role="alert">Could not post the job.</p>}
      </form>
    </section>
  );
}
