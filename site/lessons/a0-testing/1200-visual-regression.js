/* Lesson a0-testing/1200 — Visual regression testing. */
registerLesson({
  meta: {
    id: "a0-testing/1200-visual-regression",
    title: "Visual Regression Testing",
    part: "a0-testing",
    estMinutes: 11,
    level: "advanced",
    project: "design-system",
    lede: "Functional tests verify behavior, but they won't catch a button that's suddenly the wrong color or a broken layout. Visual regression testing snapshots how your UI LOOKS and flags unintended changes.",
    objectives: [
      "Catch unintended visual changes with snapshots",
      "Use Playwright's screenshot comparison",
      "Review and approve intentional changes",
      "Integrate visual testing for a design system",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The gap functional tests leave</h2>
      <p>
        A test can confirm "clicking favorite toggles the label" while the button is invisible, misaligned, or the
        wrong color — functional tests don't see <em>appearance</em>. <strong>Visual regression testing</strong>
        captures a screenshot of your UI and compares it pixel-by-pixel against an approved baseline, flagging any
        visual difference for review.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "Playwright screenshot comparison",
        readOnly: true,
        code: `import { test, expect } from "@playwright/test";

test("button looks correct", async ({ page }) => {
  await page.goto("/components/button");
  // Compares against a stored baseline; fails if pixels differ:
  await expect(page).toHaveScreenshot("button.png");
  // First run creates the baseline; later runs diff against it.
});`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Especially valuable for design systems",
        body: `<p>Visual regression shines for <strong>design systems</strong> (Part 60): a change to a shared token or
        base component can ripple across the whole product in ways no one anticipated. Snapshotting every component's
        variants catches "this CSS change accidentally broke the Card's padding everywhere" before it ships. It's also
        great for catching cross-browser rendering differences. Tools like <strong>Chromatic</strong> (built on
        Storybook), Playwright's built-in screenshots, or Percy automate this. For a team maintaining a component
        library, visual testing turns "we hope we didn't break anything visually" into "we know we didn't."</p>`,
      })}

      <h2>The review workflow</h2>
      ${h.callout({
        kind: "principal",
        title: "Intentional changes get approved, not auto-passed",
        body: `<p>When a visual test fails, it means <em>something looks different</em> — which might be a bug OR an
        intentional change. The workflow: a human <strong>reviews the visual diff</strong> (the tool shows before/
        after/highlighted-difference) and either fixes the regression or <strong>approves the new baseline</strong>.
        This human-in-the-loop step is the point — it surfaces every visual change for a conscious decision rather
        than letting them slip through unnoticed. Treating "did we mean to change how this looks?" as a reviewable
        event is what makes visual testing powerful, especially in design-conscious products.</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Manage flakiness",
        body: `<p>Pixel comparisons can be flaky across environments (font rendering, anti-aliasing, animations, dynamic
        content like dates). Mitigate by: running in a consistent environment (CI, often a container), disabling
        animations, masking dynamic regions, and setting a small diff threshold. Run visual tests in CI (not just
        locally) so baselines are consistent. Done right, they're reliable; done carelessly, they cry wolf and get
        ignored.</p>`,
      })}

      ${h.exercise({
        title: "Add visual tests to your design system",
        prompt: `<p>Add visual regression testing to your <code>design-system</code> components — via Playwright
        screenshots of each component's variants, or Storybook + Chromatic. Establish baselines, then make a small
        intentional style change and watch the test flag it; review the diff and approve the new baseline. Then make
        an <em>accidental</em> breaking change and confirm it's caught. Your design system now has a visual safety
        net.</p>`,
        runHint: "pnpm --filter design-system build-storybook",
      })}
    </section>
  `,
});
