import { Link } from "@tanstack/react-router";

export function HomePage() {
  return (
    <section>
      <h1>Find your next role</h1>
      <p>
        A demo Job Board showcasing TanStack Router (type-safe routing),
        TanStack Query (server state), client state, and forms with Zod.
      </p>
      <Link to="/jobs" className="button">
        Browse jobs →
      </Link>
    </section>
  );
}
