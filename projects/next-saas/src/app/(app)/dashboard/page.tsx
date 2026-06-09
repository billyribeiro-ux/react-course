import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { getMyProjects } from "@/data/projects";
import { signOutAction } from "../actions";
import { NewProjectForm } from "./NewProjectForm";
import { DeleteButton } from "./DeleteButton";

// A Server Component (default): fetches authorized, user-scoped data directly,
// ships zero JS for itself. Reading the session cookie makes it dynamic.
export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const projects = await getMyProjects();

  return (
    <main className="container">
      <header className="dash-head">
        <div>
          <h1>Your projects</h1>
          <p className="muted">Signed in as {user.name}</p>
        </div>
        <form action={signOutAction}>
          <button>Sign out</button>
        </form>
      </header>

      <NewProjectForm />

      {projects.length === 0 ? (
        <p className="muted">No projects yet — add your first above.</p>
      ) : (
        <ul className="project-list">
          {projects.map((p) => (
            <li key={p.id} className="project">
              <div>
                <strong>{p.name}</strong>
                <span className="muted"> · ${p.budget.toLocaleString()}</span>
              </div>
              <DeleteButton id={p.id} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
