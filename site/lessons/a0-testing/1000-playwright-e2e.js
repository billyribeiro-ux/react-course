/* Lesson a0-testing/1000 — E2E with Playwright. */
registerLesson({
  meta: {
    id: "a0-testing/1000-playwright-e2e",
    title: "End-to-End Testing with Playwright",
    part: "a0-testing",
    estMinutes: 16,
    level: "advanced",
    project: "next-saas",
    lede: "E2E tests drive your real app in a real browser through complete user journeys — login, checkout, the critical flows that must never break. Playwright is the modern standard: fast, reliable, and cross-browser.",
    objectives: [
      "Write E2E tests that drive the real app",
      "Test critical user journeys",
      "Use Playwright's auto-waiting and locators",
      "Know what belongs in E2E (and what doesn't)",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>What E2E tests do</h2>
      <p>
        An <strong>end-to-end</strong> test launches your actual app in a real browser and automates a user journey:
        navigate, click, type, and assert — exactly as a person would. It tests the <em>whole stack</em> working
        together (frontend, backend, database), giving the highest confidence that a critical flow actually works.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "A Playwright E2E test",
        readOnly: true,
        code: `import { test, expect } from "@playwright/test";

test("user can log in and create a project", async ({ page }) => {
  await page.goto("/login");

  await page.getByLabel("Email").fill("ada@example.com");
  await page.getByLabel("Password").fill("password123");
  await page.getByRole("button", { name: "Log in" }).click();

  // Auto-waits for navigation + the heading to appear:
  await expect(page.getByRole("heading", { name: "Your projects" })).toBeVisible();

  await page.getByRole("button", { name: "New project" }).click();
  await page.getByLabel("Name").fill("Test Project");
  await page.getByRole("button", { name: "Create" }).click();

  await expect(page.getByText("Test Project")).toBeVisible();
});`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Auto-waiting kills flakiness",
        body: `<p>The historical curse of E2E testing was <strong>flakiness</strong> — tests failing randomly due to
        timing (element not ready yet). <strong>Playwright auto-waits</strong>: <code>click</code> waits for the
        element to be visible and actionable; <code>expect(...).toBeVisible()</code> retries until it's true or times
        out. You almost never write manual waits. This, plus parallel execution, cross-browser support (Chromium/
        Firefox/WebKit), and great debugging tools (trace viewer, codegen), is why Playwright became the 2026
        standard over older tools. Reliable E2E tests are ones the team actually trusts and keeps green.</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "E2E sparingly, on the critical flows",
        body: `<p>E2E tests are the most realistic <em>and</em> the slowest and most expensive to maintain — so write
        <strong>few of them, on the journeys that absolutely must work</strong>: sign up / log in, the core action of
        your product (create a project, checkout, send a message), payment. Don't try to test every edge case in E2E
        (that's what fast unit/integration tests are for) — cover the handful of "if this breaks, the business
        breaks" paths. A small, reliable E2E suite on critical flows gives enormous confidence per test. This
        selective approach is the testing-trophy philosophy applied at the top layer.</p>`,
      })}

      ${h.callout({
        kind: "tip",
        title: "Locators mirror RTL",
        body: `<p>Playwright's locators (<code>getByRole</code>, <code>getByLabel</code>, <code>getByText</code>) mirror
        React Testing Library's queries — same accessibility-first philosophy. So your RTL skills transfer directly,
        and your E2E tests also double as accessibility checks. <code>npx playwright codegen</code> can even record a
        flow and generate the test for you as a starting point.</p>`,
      })}

      ${h.exercise({
        title: "Write a critical-path E2E test",
        prompt: `<p>Set up Playwright in LaunchPad and write an E2E test for the most important journey: sign up / log
        in, then create a project and confirm it appears. Run it against your dev server. Use role/label locators.
        Then identify the 2–3 <em>other</em> flows that genuinely warrant E2E coverage (and the many that don't —
        those stay as faster tests). You've now covered the full testing trophy.</p>`,
        runHint: "pnpm --filter next-saas exec playwright test",
      })}
    </section>
  `,
});
