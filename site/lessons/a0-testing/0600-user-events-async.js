/* Lesson a0-testing/0600 — User events & async UI. */
registerLesson({
  meta: {
    id: "a0-testing/0600-user-events-async",
    title: "User Events & Async UI",
    part: "a0-testing",
    estMinutes: 14,
    level: "advanced",
    project: "vite-fundamentals",
    lede: "Real components respond to clicks, typing, and async updates. Learn user-event for realistic interactions and the patterns for testing UI that changes after a delay or a fetch.",
    objectives: [
      "Simulate realistic user interactions",
      "Test typing, clicking, and form submission",
      "Wait for async UI updates",
      "Avoid flaky async tests",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>user-event: realistic interactions</h2>
      <p>
        <code>@testing-library/user-event</code> simulates real user interactions more faithfully than the low-level
        <code>fireEvent</code> — it dispatches the full sequence of events a real click or keystroke produces
        (focus, keydown, keyup, input, etc.). Always prefer it.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "Interactions",
        readOnly: true,
        code: `import userEvent from "@testing-library/user-event";

const user = userEvent.setup();   // set up once per test

await user.click(screen.getByRole("button", { name: /add/i }));
await user.type(screen.getByLabelText("Title"), "New recipe");
await user.clear(screen.getByLabelText("Title"));
await user.selectOptions(screen.getByRole("combobox"), "italian");
await user.keyboard("{Enter}");
await user.tab();                 // move focus (great for a11y testing)`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Always await user events",
        body: `<p><code>user-event</code> methods are <strong>async</strong> — always <code>await</code> them. They
        internally wrap React's <code>act()</code> and let the event sequence and resulting state updates flush before
        your next line. Forgetting <code>await</code> is the #1 cause of flaky, confusing component tests. The mental
        model: "the user does something (await it), then I assert what they'd now see." Faithful interaction
        simulation is what makes these tests genuinely representative of real usage.</p>`,
      })}

      <h2>Testing a form end-to-end</h2>
      ${h.codePane({
        lang: "tsx",
        title: "A form interaction test",
        readOnly: true,
        code: `it("adds a recipe via the form", async () => {
  const user = userEvent.setup();
  render(<RecipeForm />);

  await user.type(screen.getByLabelText("Title"), "Soup");
  await user.click(screen.getByRole("button", { name: /add/i }));

  // The new recipe should appear:
  expect(await screen.findByText("Soup")).toBeInTheDocument();
  // And the input should be cleared:
  expect(screen.getByLabelText("Title")).toHaveValue("");
});`,
      })}

      <h2>Waiting for async UI</h2>
      ${h.codePane({
        lang: "tsx",
        title: "findBy and waitFor",
        readOnly: true,
        code: `// findBy* waits for an element to appear (the usual tool):
expect(await screen.findByText("Loaded!")).toBeInTheDocument();

// waitFor waits for an assertion to pass (for non-appearance conditions):
import { waitFor } from "@testing-library/react";
await waitFor(() => {
  expect(mockOnSave).toHaveBeenCalled();
});`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Don't use arbitrary timeouts",
        body: `<p>Never <code>await sleep(1000)</code> to "wait for the UI" — it's slow and flaky (too short →
        intermittent failures; too long → slow suite). Use <strong><code>findBy</code></strong> (waits for an element)
        or <strong><code>waitFor</code></strong> (waits for an assertion), which poll until the condition is met or a
        short timeout elapses. This makes async tests both fast and reliable. Flaky tests erode trust in the whole
        suite — eliminating arbitrary waits is key to keeping tests trustworthy.</p>`,
      })}

      ${h.exercise({
        title: "Test an interactive flow",
        prompt: `<p>Write a test for your Recipe Finder's search: type into the search box (<code>user.type</code>)
        and assert the list filters to matching items, and shows the empty state when nothing matches. Test the
        "add recipe" form end-to-end: fill fields, submit, assert the item appears (<code>findBy</code>) and the form
        resets. Use only <code>await</code>ed user events and <code>findBy</code>/<code>waitFor</code> — no
        sleeps.</p>`,
        runHint: "pnpm --filter vite-fundamentals test",
      })}
    </section>
  `,
});
