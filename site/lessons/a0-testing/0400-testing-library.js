/* Lesson a0-testing/0400 — React Testing Library: behavior, not implementation. */
registerLesson({
  meta: {
    id: "a0-testing/0400-testing-library",
    title: "React Testing Library: Testing Behavior",
    part: "a0-testing",
    estMinutes: 16,
    level: "advanced",
    project: "vite-fundamentals",
    lede: "React Testing Library is how you test components the way users actually use them. It deliberately makes implementation-detail testing hard, steering you toward resilient, meaningful tests.",
    objectives: [
      "Render components in tests",
      "Find elements as a user would",
      "Assert on what the user sees",
      "Avoid testing implementation details",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The philosophy in a tool</h2>
      <p>
        <strong>React Testing Library (RTL)</strong> renders your component into a test DOM and gives you tools to
        find and interact with elements <em>the way a user would</em> — by their visible text, their accessible role,
        their label — not by internal class names or component state. This design choice steers you toward
        behavior-focused tests automatically.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "A component test",
        readOnly: true,
        code: `import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Counter } from "./Counter";

describe("Counter", () => {
  it("increments when the button is clicked", async () => {
    const user = userEvent.setup();
    render(<Counter />);                       // render into the test DOM

    // Find by what the USER perceives (role + accessible name):
    const button = screen.getByRole("button", { name: /increment/i });
    expect(screen.getByText("Count: 0")).toBeInTheDocument();

    await user.click(button);                  // interact like a user

    expect(screen.getByText("Count: 1")).toBeInTheDocument(); // assert on UI
  });
});`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Why finding by role/text matters",
        body: `<p>RTL pushes you to query elements by their <strong>accessible role</strong>
        (<code>getByRole("button")</code>), <strong>label</strong>, or <strong>visible text</strong> — exactly how a
        user (or a screen reader) finds them. This has two big benefits: (1) your tests don't break when you change a
        CSS class or restructure the DOM (resilience), and (2) <strong>if you can't query by role/label, your
        component probably has an accessibility problem</strong>. RTL makes accessible, behavior-focused testing the
        path of least resistance. A test that's easy to write in RTL is usually testing the right thing.</p>`,
      })}

      <h2>What NOT to do</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Anti-patterns RTL discourages",
        readOnly: true,
        code: `// ❌ Testing implementation details:
//   - reaching into component state
//   - querying by CSS class or test-id-everything
//   - asserting that a specific function was called internally
//
// ✅ Testing behavior:
//   - "when I click Submit, an error message appears"
//   - "the list shows 3 recipes"
//   - "after deleting, the item is gone"
// If a test breaks during a refactor that didn't change behavior,
// the test was testing the wrong thing.`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "data-testid is a last resort",
        body: `<p>RTL offers <code>getByTestId</code> for elements with a <code>data-testid</code> attribute. It's an
        escape hatch for when no semantic query works — not a default. Reaching for <code>testid</code> everywhere
        recreates the brittle, implementation-coupled testing RTL is designed to prevent. Prefer
        <code>getByRole</code> → <code>getByLabelText</code> → <code>getByText</code>, and only fall back to
        <code>testid</code> when truly necessary.</p>`,
      })}

      ${h.exercise({
        title: "Test a real component",
        prompt: `<p>Write an RTL test for one of your Recipe Finder components — e.g. that
        <code>RecipeCard</code> renders the title and that clicking its favorite button calls the handler / toggles
        the label. Find everything by role/text/label, not test-ids. Then test the empty state ("No recipes found"
        when given an empty list). You're testing what users see, the resilient way.</p>`,
        runHint: "pnpm --filter vite-fundamentals test",
      })}
    </section>
  `,
});
