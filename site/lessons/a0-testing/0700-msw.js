/* Lesson a0-testing/0700 — Mocking the network with MSW. */
registerLesson({
  meta: {
    id: "a0-testing/0700-msw",
    title: "Mocking the Network with MSW",
    part: "a0-testing",
    estMinutes: 15,
    level: "advanced",
    project: "vite-fundamentals",
    lede: "Components that fetch data need their network mocked in tests. MSW intercepts requests at the network level, so your code runs unchanged and your mocks are realistic and reusable across tests AND development.",
    objectives: [
      "Intercept network requests with MSW",
      "Mock success, error, and loading responses",
      "Test components that fetch data",
      "Reuse mocks across tests and dev",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Why mock the network?</h2>
      <p>
        Tests should be fast, deterministic, and offline — so they can't hit a real server (slow, flaky, has real
        side effects). <strong>MSW (Mock Service Worker)</strong> intercepts requests at the <em>network level</em>
        (via a service worker / request interceptor), so your <code>fetch</code> and TanStack Query code runs
        <strong>completely unchanged</strong> — it just receives your mocked responses.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "Defining request handlers",
        readOnly: true,
        code: `import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  http.get("/api/recipes", () => {
    return HttpResponse.json([
      { id: 1, name: "Pasta" },
      { id: 2, name: "Soup" },
    ]);
  }),
);

// In test setup:
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());  // reset overrides between tests
afterAll(() => server.close());`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Mock the network, not your code",
        body: `<p>The old way was to mock <code>fetch</code> or your data functions directly — but that means your test
        runs <em>different code</em> than production (you've replaced the real fetching logic). MSW intercepts at the
        boundary, so <strong>all your actual code runs</strong> — your fetch calls, your Query setup, your response
        parsing, your error handling. Only the server's response is faked. This gives far more realistic, higher-
        confidence tests. And because MSW works in the browser too, the <em>same handlers</em> can power local
        development without a backend. Mocking at the network boundary, not inside your code, is the modern best
        practice.</p>`,
      })}

      <h2>Testing loading, success, and error</h2>
      ${h.codePane({
        lang: "tsx",
        title: "All three data states",
        readOnly: true,
        code: `it("shows recipes on success", async () => {
  render(<Recipes />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument(); // loading first
  expect(await screen.findByText("Pasta")).toBeInTheDocument(); // then data
});

it("shows an error when the request fails", async () => {
  // Override the handler for THIS test to return a 500:
  server.use(
    http.get("/api/recipes", () => new HttpResponse(null, { status: 500 })),
  );
  render(<Recipes />);
  expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
});`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Test the unhappy paths",
        body: `<p>It's easy to test the happy path; the bugs live in the <strong>error and edge cases</strong>. MSW
        makes it trivial to simulate a 500, a network failure, an empty response, or a slow response — so you can
        verify your loading spinners, error boundaries, retry logic, and empty states actually work. Robust apps are
        defined by how they handle failure (Parts 30, 50), and MSW lets you test that failure handling without ever
        breaking a real server. Always test what happens when the network misbehaves.</p>`,
      })}

      ${h.callout({
        kind: "tip",
        title: "Share handlers everywhere",
        body: `<p>Define your MSW handlers once and reuse them in unit tests, integration tests, Storybook (so stories
        with data work), and local development. One source of mock truth keeps everything consistent. MSW has become
        the de-facto standard precisely because of this versatility.</p>`,
      })}

      ${h.exercise({
        title: "Test a data-fetching component",
        prompt: `<p>Add MSW to <code>vite-fundamentals</code> and write tests for a data-fetching component (your
        Recipe Finder loading from an API): assert the loading state shows first, then the data, then test an error
        case by overriding the handler to return a 500 and asserting the error UI appears. Confirm your real fetch/
        Query code runs unchanged. You're now testing realistic data flows.</p>`,
        runHint: "pnpm --filter vite-fundamentals test",
      })}
    </section>
  `,
});
