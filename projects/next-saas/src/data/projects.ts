import "server-only";
import { requireUser } from "@/lib/session";
import type { NewProject } from "@/lib/schemas";

// The Data Access Layer (Part 80/1000): the ONE place data is accessed, and
// EVERY function authorizes + scopes to the current user. Swap the in-memory
// store for Drizzle/Postgres and the call sites don't change.

export interface Project {
  id: string;
  ownerId: string;
  name: string;
  budget: number;
  createdAt: number;
}

// In-memory store (resets when the server restarts). Seeded so the demo isn't
// empty. A real app uses a database with migrations (Part 80/0900).
const store: Project[] = [
  { id: "p1", ownerId: "ada", name: "Marketing Site", budget: 5000, createdAt: Date.now() },
  { id: "p2", ownerId: "ada", name: "Mobile App", budget: 20000, createdAt: Date.now() },
  { id: "p3", ownerId: "grace", name: "Compiler", budget: 0, createdAt: Date.now() },
];

export async function getMyProjects(): Promise<Project[]> {
  const user = await requireUser();
  // Scoped to the owner — a user can never see another user's projects.
  return store
    .filter((p) => p.ownerId === user.id)
    .sort((a, b) => b.createdAt - a.createdAt);
}

export async function createProject(data: NewProject): Promise<Project> {
  const user = await requireUser();
  const project: Project = {
    id: crypto.randomUUID(),
    ownerId: user.id,
    name: data.name,
    budget: data.budget,
    createdAt: Date.now(),
  };
  store.unshift(project);
  return project;
}

export async function deleteProject(id: string): Promise<void> {
  const user = await requireUser();
  const idx = store.findIndex((p) => p.id === id && p.ownerId === user.id);
  if (idx === -1) throw new Error("Not found or not allowed"); // ownership check
  store.splice(idx, 1);
}
