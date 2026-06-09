import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { fetchJob } from "../api.ts";
import { useSavedJobs } from "../store/savedJobs.ts";

export function JobDetailPage() {
  const { jobId } = useParams({ from: "/jobs/$jobId" });
  const id = Number(jobId);
  const saved = useSavedJobs();

  const { data: job, isPending, isError, error } = useQuery({
    queryKey: ["jobs", id],
    queryFn: () => fetchJob(id),
  });

  if (isPending) return <p>Loading…</p>;
  if (isError) return <p role="alert">Error: {error.message}</p>;

  return (
    <section>
      <Link to="/jobs" search={{ q: "", remote: false, sort: "title" }}>
        ← Back to jobs
      </Link>
      <h1>{job.title}</h1>
      <p>
        {job.company} · {job.remote ? "Remote" : job.location}
      </p>
      <p>Salary: ${job.salary.toLocaleString()}</p>
      <button aria-pressed={saved.has(job.id)} onClick={() => saved.toggle(job.id)}>
        {saved.has(job.id) ? "★ Saved" : "☆ Save this job"}
      </button>
    </section>
  );
}
