import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { fetchJobs } from "../api.ts";
import { jobsRoute } from "../router.tsx";
import { useSavedJobs } from "../store/savedJobs.ts";

export function JobsPage() {
  // Server state via Query (Part 70/0600).
  const { data: jobs, isPending, isError, error } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });

  // Filter/sort state lives in the URL (Part 70/0300, 1300) — shareable + refresh-safe.
  const { q, remote, sort } = jobsRoute.useSearch();
  const navigate = useNavigate({ from: "/jobs" });
  const saved = useSavedJobs();

  if (isPending) return <p>Loading jobs…</p>;
  if (isError) return <p role="alert">Error: {error.message}</p>;

  // Derived in render — never stored as state.
  const visible = jobs
    .filter((j) => j.title.toLowerCase().includes(q.toLowerCase()))
    .filter((j) => (remote ? j.remote : true))
    .sort((a, b) =>
      sort === "salary" ? b.salary - a.salary : a.title.localeCompare(b.title)
    );

  return (
    <section>
      <h1>Open roles ({visible.length})</h1>

      <div className="controls">
        <input
          aria-label="Search jobs"
          value={q}
          placeholder="Search titles…"
          onChange={(e) =>
            navigate({ search: (prev) => ({ ...prev, q: e.target.value }) })
          }
        />
        <label>
          <input
            type="checkbox"
            checked={remote}
            onChange={(e) =>
              navigate({ search: (prev) => ({ ...prev, remote: e.target.checked }) })
            }
          />{" "}
          Remote only
        </label>
        <select
          aria-label="Sort by"
          value={sort}
          onChange={(e) =>
            navigate({
              search: (prev) => ({
                ...prev,
                sort: e.target.value as "title" | "salary",
              }),
            })
          }
        >
          <option value="title">Sort: Title</option>
          <option value="salary">Sort: Salary</option>
        </select>
      </div>

      {visible.length === 0 ? (
        <p>No jobs match your search.</p>
      ) : (
        <ul className="job-list">
          {visible.map((job) => (
            <li key={job.id} className="job-card">
              <Link to="/jobs/$jobId" params={{ jobId: String(job.id) }}>
                <strong>{job.title}</strong>
              </Link>
              <span>
                {job.company} · {job.remote ? "Remote" : job.location} · $
                {job.salary.toLocaleString()}
              </span>
              <button
                aria-pressed={saved.has(job.id)}
                onClick={() => saved.toggle(job.id)}
              >
                {saved.has(job.id) ? "★ Saved" : "☆ Save"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
