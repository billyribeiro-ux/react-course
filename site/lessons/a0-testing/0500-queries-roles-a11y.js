/* Lesson a0-testing/0500 — Queries, roles & accessibility-first testing. */
registerLesson({
  meta: {
    id: "a0-testing/0500-queries-roles-a11y",
    title: "Queries, Roles & Accessibility-First Testing",
    part: "a0-testing",
    estMinutes: 14,
    level: "advanced",
    project: "vite-fundamentals",
    lede: "RTL's query methods aren't just an API — they encode an accessibility priority. Learn the query hierarchy, the getBy/queryBy/findBy variants, and how testing this way doubles as an accessibility check.",
    objectives: [
      "Use the right query for each situation",
      "Choose getBy vs queryBy vs findBy",
      "Test accessibility through your queries",
      "Write robust, semantic selectors",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The query priority</h2>
      <p>RTL recommends queries in this order — most to least accessible:</p>
      <ol>
        <li><strong>getByRole</strong> — by ARIA role + accessible name (<code>button</code>, <code>heading</code>, <code>textbox</code>). The top choice.</li>
        <li><strong>getByLabelText</strong> — form fields by their label. Perfect for inputs.</li>
        <li><strong>getByPlaceholderText</strong> / <strong>getByText</strong> — by visible text.</li>
        <li><strong>getByDisplayValue</strong> — form fields by current value.</li>
        <li><strong>getByTestId</strong> — last resort, non-semantic.</li>
      </ol>

      ${h.callout({
        kind: "principal",
        title: "Your tests are an accessibility audit",
        body: `<p>Here's the beautiful part: querying <code>getByRole("button", { name: "Save" })</code> only works if
        your button is a real, properly-labeled button. If you have to fall back to <code>getByTestId</code> because
        no role/label query works, that's a signal your component isn't accessible — a screen reader would struggle
        too. So writing RTL tests with the recommended query priority <strong>simultaneously verifies your
        accessibility</strong> (Part 60). Tests and a11y reinforce each other. This dual benefit is a major reason RTL
        designed its API this way, and it's why "test by role" is the senior default.</p>`,
      })}

      <h2>getBy vs queryBy vs findBy</h2>
      ${h.codePane({
        lang: "tsx",
        title: "The three variants",
        readOnly: true,
        code: `// getBy*  → element MUST exist now; throws if not found. (assert presence)
screen.getByRole("heading", { name: "Recipes" });

// queryBy* → returns null if not found; never throws. (assert ABSENCE)
expect(screen.queryByText("Error")).not.toBeInTheDocument();

// findBy* → async; waits for the element to appear (up to a timeout).
//           (for elements that show up after loading/async work)
expect(await screen.findByText("Loaded!")).toBeInTheDocument();

// ...AllBy* variants return arrays (e.g. getAllByRole("listitem")).`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Pick the variant by intent",
        body: `<p>Use <strong>getBy</strong> to assert something <em>is</em> there (it throws a helpful error if not).
        Use <strong>queryBy</strong> only to assert something is <em>not</em> there (it returns null instead of
        throwing). Use <strong>findBy</strong> for things that appear <em>asynchronously</em> (after a fetch or state
        update) — it polls until they show up or times out. Using <code>getBy</code> for an async element fails
        because it checks immediately; using <code>queryBy</code> to assert presence gives a confusing null error.
        Matching the variant to your intent makes tests clear and correct.</p>`,
      })}

      <h2>Asserting absence and counts</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Common assertions",
        readOnly: true,
        code: `// Count list items:
expect(screen.getAllByRole("listitem")).toHaveLength(3);

// Assert something is gone after an action:
await user.click(screen.getByRole("button", { name: /delete/i }));
expect(screen.queryByText("Pasta")).not.toBeInTheDocument();

// Check accessible state:
expect(screen.getByRole("button", { name: /favorite/i }))
  .toHaveAttribute("aria-pressed", "true");`,
      })}

      ${h.exercise({
        title: "Query the accessible way",
        prompt: `<p>Rewrite (or write) a component test using only role/label/text queries — no test-ids. Assert a
        heading is present (<code>getByRole("heading")</code>), a labeled input exists
        (<code>getByLabelText</code>), an item disappears after deletion (<code>queryBy</code>), and async content
        appears (<code>findBy</code>). If any query forces you to a test-id, fix the component's accessibility
        instead. Your test suite is now also an a11y check.</p>`,
        runHint: "pnpm --filter vite-fundamentals test",
      })}
    </section>
  `,
});
