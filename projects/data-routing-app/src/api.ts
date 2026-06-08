import type { Job } from "./types.ts";

// A tiny in-memory "API" with artificial latency, so the project runs with no
// backend. In Parts 80+ you'll talk to a real server; the data-fetching code
// (TanStack Query) stays almost identical.
const JOBS: Job[] = [
  { id: 1, title: "Senior React Engineer", company: "Vercel", location: "Remote", remote: true, salary: 180000 },
  { id: 2, title: "Frontend Engineer", company: "Linear", location: "Berlin", remote: false, salary: 120000 },
  { id: 3, title: "Full-Stack Engineer", company: "Stripe", location: "Remote", remote: true, salary: 200000 },
  { id: 4, title: "Design Engineer", company: "Figma", location: "San Francisco", remote: false, salary: 170000 },
  { id: 5, title: "Staff Engineer", company: "Shopify", location: "Remote", remote: true, salary: 240000 },
];

function delay<T>(value: T, ms = 600): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export async function fetchJobs(): Promise<Job[]> {
  return delay(JOBS);
}

export async function fetchJob(id: number): Promise<Job> {
  const job = JOBS.find((j) => j.id === id);
  if (!job) throw new Error(`Job ${id} not found`);
  return delay(job);
}
