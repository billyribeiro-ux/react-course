import {
  createRootRoute,
  createRoute,
  createRouter,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { HomePage } from "./pages/HomePage.tsx";
import { JobsPage } from "./pages/JobsPage.tsx";
import { JobDetailPage } from "./pages/JobDetailPage.tsx";

// Code-based routing: each route is created and assembled into a tree.
// (The lessons also cover the file-based approach, which generates this tree.)
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
            <Link to="/jobs" activeProps={{ className: "active" }}>
              Jobs
            </Link>
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

const jobsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jobs",
  component: JobsPage,
});

const jobDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jobs/$jobId", // typed dynamic param
  component: JobDetailPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  jobsRoute,
  jobDetailRoute,
]);

export const router = createRouter({ routeTree });

// Register the router type so Link/params/search are fully type-safe.
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
