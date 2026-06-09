import {
  createRootRoute,
  createRoute,
  createRouter,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { jobsSearchSchema } from "./lib/schemas.ts";
import { useSavedJobs } from "./store/savedJobs.ts";
import { HomePage } from "./pages/HomePage.tsx";
import { JobsPage } from "./pages/JobsPage.tsx";
import { JobDetailPage } from "./pages/JobDetailPage.tsx";
import { PostJobPage } from "./pages/PostJobPage.tsx";

function SavedBadge() {
  // Narrow selector → re-renders only when the count changes (Part 70/1000).
  const count = useSavedJobs((s) => s.ids.length);
  return <span className="saved-badge">★ {count}</span>;
}

const rootRoute = createRootRoute({
  component: function Root() {
    return (
      <div className="app">
        <header className="nav">
          <strong>💼 Job Board</strong>
          <nav>
            <Link to="/" activeProps={{ className: "active" }}>
              Home
            </Link>{" "}
            <Link to="/jobs" search={{ q: "", remote: false, sort: "title" }} activeProps={{ className: "active" }}>
              Jobs
            </Link>{" "}
            <Link to="/post" activeProps={{ className: "active" }}>
              Post a job
            </Link>{" "}
            <SavedBadge />
          </nav>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    );
  },
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

export const jobsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jobs",
  // Validated, typed URL search params — the URL is the source of truth.
  validateSearch: jobsSearchSchema,
  component: JobsPage,
});

const jobDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jobs/$jobId",
  component: JobDetailPage,
});

const postJobRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/post",
  component: PostJobPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  jobsRoute,
  jobDetailRoute,
  postJobRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
