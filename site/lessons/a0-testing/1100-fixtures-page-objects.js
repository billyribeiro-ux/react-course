/* Lesson a0-testing/1100 — Fixtures, page objects & parallelism. */
registerLesson({
  meta: {
    id: "a0-testing/1100-fixtures-page-objects",
    title: "Fixtures, Page Objects & Parallelism",
    part: "a0-testing",
    estMinutes: 13,
    level: "advanced",
    project: "next-saas",
    lede: "As a test suite grows, keeping it maintainable matters as much as keeping it correct. Learn the patterns — fixtures, page objects, and parallel-safe design — that keep large suites fast and DRY.",
    objectives: [
      "Share setup with fixtures",
      "Encapsulate pages with the Page Object pattern",
      "Run tests in parallel safely",
      "Keep test code maintainable",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Fixtures: reusable setup</h2>
      <p>
        Many tests share setup — a logged-in user, seeded data, a configured client. <strong>Fixtures</strong>
        encapsulate that so each test starts from a known state without copy-pasting setup. Playwright and Vitest both
        support them.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "A Playwright auth fixture",
        readOnly: true,
        code: `import { test as base } from "@playwright/test";

// Extend the base test with an "authedPage" fixture that logs in first:
export const test = base.extend({
  authedPage: async ({ page }, use) => {
    await page.goto("/login");
    await page.getByLabel("Email").fill("ada@example.com");
    await page.getByLabel("Password").fill("password123");
    await page.getByRole("button", { name: "Log in" }).click();
    await use(page);            // hand the logged-in page to the test
  },
});

// Tests get a logged-in page automatically:
test("dashboard loads", async ({ authedPage }) => { /* ... */ });`,
      })}

      <h2>Page Objects: encapsulate a page's interactions</h2>
      ${h.codePane({
        lang: "tsx",
        title: "A page object",
        readOnly: true,
        code: `class LoginPage {
  constructor(private page: Page) {}
  async goto() { await this.page.goto("/login"); }
  async login(email: string, password: string) {
    await this.page.getByLabel("Email").fill(email);
    await this.page.getByLabel("Password").fill(password);
    await this.page.getByRole("button", { name: "Log in" }).click();
  }
}
// Tests read like prose, and if the login UI changes, you fix ONE place:
const login = new LoginPage(page);
await login.goto();
await login.login("ada@example.com", "pw");`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Test code is real code — keep it DRY and clear",
        body: `<p>A common mistake is treating test code as second-class — copy-pasted, unstructured, unmaintained.
        But a brittle, repetitive test suite becomes a burden people resent and eventually ignore. <strong>Page
        objects</strong> (encapsulate a screen's selectors/actions in one place) and <strong>fixtures</strong> (share
        setup) apply the same DRY and abstraction principles you use in app code. When the login form changes, you
        update one page object, not fifty tests. Investing in test-suite maintainability is what keeps tests valuable
        as the app grows — a hallmark of teams that test well long-term.</p>`,
      })}

      <h2>Parallelism</h2>
      ${h.callout({
        kind: "principal",
        title: "Design tests to run in parallel",
        body: `<p>Vitest and Playwright run tests <strong>in parallel</strong> by default for speed — which means tests
        must be <strong>independent</strong>: no shared mutable state, no relying on execution order, no two tests
        fighting over the same database row. Each test should set up its own data (unique emails, isolated records)
        and clean up after itself. Tests that pass alone but fail when run together almost always have a hidden
        shared-state dependency. Designing for isolation from the start keeps your suite fast (parallel) and reliable.
        As suites grow to thousands of tests, parallel-safety is the difference between a 30-second and a 30-minute
        CI run.</p>`,
      })}

      ${h.exercise({
        title: "Refactor for maintainability",
        prompt: `<p>In LaunchPad's E2E tests, create an auth <strong>fixture</strong> so tests start logged in, and a
        <strong>page object</strong> for one screen (login or dashboard) encapsulating its selectors and actions.
        Refactor a couple of tests to use them and notice how much cleaner they read. Ensure each test creates its own
        isolated data so they pass when run in parallel.</p>`,
        runHint: "pnpm --filter next-saas exec playwright test",
      })}
    </section>
  `,
});
