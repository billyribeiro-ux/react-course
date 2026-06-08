import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { fetchJobs } from "../api.ts";

export function JobsPage() {
  // useQuery handles loading, error, caching, and background refetching for us.
  const { data: jobs, isPending, isError, error } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });

  if (isPending) return <p>Loading jobs…</p>;
  if (isError) return <p role="alert">Error: {error.message}</p>;

  return (
    <section>
      <h1>Open roles ({jobs.length})</h1>
      <ul className="job-list">
        {jobs.map((job) => (
          <li key={job.id} className="job-card">
            <Link to="/jobs/$jobId" params={{ jobId: String(job.id) }}>
              <strong>{job.title}</strong>
            </Link>
            <span>
              {job.company} · {job.remote ? "Remote" : job.location}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
