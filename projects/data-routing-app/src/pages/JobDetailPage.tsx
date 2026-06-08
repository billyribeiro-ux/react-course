import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { fetchJob } from "../api.ts";

export function JobDetailPage() {
  // Params are fully typed thanks to the registered router.
  const { jobId } = useParams({ from: "/jobs/$jobId" });
  const id = Number(jobId);

  const { data: job, isPending, isError, error } = useQuery({
    queryKey: ["jobs", id], // keyed by id — each job is cached separately
    queryFn: () => fetchJob(id),
  });

  if (isPending) return <p>Loading…</p>;
  if (isError) return <p role="alert">Error: {error.message}</p>;

  return (
    <section>
      <Link to="/jobs">← Back to jobs</Link>
      <h1>{job.title}</h1>
      <p>
        {job.company} · {job.remote ? "Remote" : job.location}
      </p>
      <p>Salary: ${job.salary.toLocaleString()}</p>
    </section>
  );
}
