/* Lesson a0-testing/0900 — Testing Server Components & Server Actions. */
registerLesson({
  meta: {
    id: "a0-testing/0900-testing-server-code",
    title: "Testing Server Components & Server Actions",
    part: "a0-testing",
    estMinutes: 13,
    level: "advanced",
    project: "next-saas",
    lede: "Server Components and Server Actions (Part 80) run on the server, so they're tested a little differently. Learn to test server logic, the data access layer, and full-stack flows.",
    objectives: [
      "Test the data access layer and server logic",
      "Test Server Actions' validation and authorization",
      "Use a test database",
      "Decide unit vs E2E for server code",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Server code is just functions</h2>
      <p>
        Much of your Next.js server code is plain async functions — the DAL (Part 80), validation, Server Action
        bodies. These are testable like any other logic: call them, assert the result. The most valuable thing to
        test is your <strong>data access layer and authorization</strong>, because that's where security lives.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "Testing the DAL & authorization",
        readOnly: true,
        code: `import { describe, it, expect } from "vitest";
import { getProject } from "@/data/projects";

describe("getProject (authorization)", () => {
  it("returns the project for its owner", async () => {
    const project = await getProject(ownedId, { as: ownerUser });
    expect(project?.id).toBe(ownedId);
  });

  it("returns null for a non-owner (no data leak)", async () => {
    const project = await getProject(ownedId, { as: otherUser });
    expect(project).toBeNull();           // the critical security assertion
  });
});`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Test your authorization boundaries explicitly",
        body: `<p>The most important server tests assert that <strong>users can't access what they shouldn't</strong> —
        that <code>getProject</code> returns null for a non-owner, that an admin-only action rejects a regular user,
        that an unauthenticated request is denied. These tests directly guard against the "broken access control"
        breaches from Part 80. A passing authorization test is worth more than a dozen happy-path tests, because the
        failure it prevents is catastrophic. Make "the wrong user is denied" a first-class, well-covered test
        category.</p>`,
      })}

      <h2>Testing Server Actions</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Validation & error results",
        readOnly: true,
        code: `it("rejects invalid input", async () => {
  const form = new FormData();
  form.set("name", ""); // invalid (empty)
  const result = await createProject(emptyState, form);
  expect(result.fieldErrors?.name).toBeDefined(); // Zod caught it
});

it("creates a project for valid input", async () => {
  const form = new FormData();
  form.set("name", "Valid");
  const result = await createProject(emptyState, form);
  expect(result.error).toBeUndefined();
});`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Use a real (test) database",
        body: `<p>For data-layer tests, prefer a <strong>real test database</strong> (a disposable Postgres, often in
        Docker, reset between runs) over mocking the ORM. Mocking the database means you're not testing your actual
        queries — and query bugs are common. A test DB gives high confidence that your schema, queries, and
        constraints actually work together. Reset it to a known state before each test (transactions or truncation).
        This is more setup than mocking, but for the data layer it's worth it; database behavior is exactly what you
        want to verify.</p>`,
      })}

      ${h.callout({
        kind: "note",
        title: "Components & full flows → E2E",
        body: `<p>Rendering an entire Server Component tree (with its async data and the server/client boundary) in a
        unit test is awkward. For verifying that pages <em>render correctly end to end</em> — including Server
        Components, Actions, and navigation — <strong>Playwright E2E tests</strong> (next lessons) running against a
        real Next.js server are usually the better tool. So: unit-test the DAL, validation, and action logic; E2E-test
        the full user flows. Use each where it fits.</p>`,
      })}

      ${h.exercise({
        title: "Test LaunchPad's server logic",
        prompt: `<p>Write Vitest tests for LaunchPad's server code: the DAL's authorization (a non-owner gets null/
        denied — the key security test), and a Server Action's Zod validation (invalid input returns field errors,
        valid input succeeds). Use a disposable test database if you can. These tests guard the most important
        property of your app: that data stays protected.</p>`,
        runHint: "pnpm --filter next-saas test",
      })}
    </section>
  `,
});
