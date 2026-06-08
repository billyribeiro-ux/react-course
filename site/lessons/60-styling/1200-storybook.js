/* Lesson 60-styling/1200 — Documenting components in Storybook. */
registerLesson({
  meta: {
    id: "60-styling/1200-storybook",
    title: "Documenting Components in Storybook",
    part: "60-styling",
    estMinutes: 15,
    level: "advanced",
    project: "design-system",
    lede: "Storybook is a workshop for building and documenting components in isolation. It's how design systems become usable by a team — a living catalog of every component, every variant, every state.",
    objectives: [
      "Write stories that document a component",
      "Use controls to explore props interactively",
      "Develop components in isolation",
      "Understand Storybook's role in a team",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>What Storybook is for</h2>
      <p>
        <strong>Storybook</strong> runs your components in isolation, outside the app, in a browsable catalog.
        Each component gets <strong>stories</strong> — examples of its variants and states. It's three things
        at once: a <em>development</em> environment (build a component without wiring it into the app), a
        <em>documentation</em> site (a living catalog designers and engineers browse), and a <em>test</em>
        surface (Part A0).
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "Button.stories.tsx",
        readOnly: true,
        code: `import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button.tsx";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],            // auto-generate a docs page from types
  args: { children: "Click me" },
  argTypes: {                    // turn props into interactive controls
    variant: { control: "select", options: ["primary", "secondary", "danger"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { variant: "primary" } };
export const Danger: Story = { args: { variant: "danger" } };
export const Disabled: Story = { args: { disabled: true } };`,
      })}

      <p>Run it with <code>pnpm --filter design-system storybook</code> and browse every component and variant,
      tweaking props live via the controls panel.</p>

      ${h.callout({
        kind: "principal",
        title: "Why isolation matters",
        body: `<p>Building a component <em>inside</em> a page means juggling routing, data, and state just to see
        a button's hover state. Storybook lets you build and inspect a component in <strong>every</strong> state
        directly — including the hard-to-reach ones (loading, error, empty, super-long text, RTL). This isolation
        produces more robust components because you're forced to consider all their states, not just the one your
        current page happens to show. It's also where you'll catch responsive and a11y issues early. Developing in
        isolation is a genuinely better workflow for reusable UI.</p>`,
      })}

      <h2>Stories are documentation that can't go stale</h2>
      ${h.callout({
        kind: "principal",
        title: "A living design system",
        body: `<p>A README screenshot rots the moment the component changes. A Storybook story renders the
        <em>actual current component</em> — it can't lie. With <code>autodocs</code>, your prop types become a
        documented API table automatically. For a team, this is transformative: designers see what's actually
        built, engineers discover existing components instead of rebuilding them, and PMs review UI without
        running the app. Storybook is how a pile of components becomes a <em>design system</em> people trust and
        reuse. Deploying it as a static site (it builds to plain HTML) gives everyone a shared reference.</p>`,
      })}

      ${h.callout({
        kind: "tip",
        title: "Document states, not just the happy path",
        body: `<p>Write stories for the edge cases: empty, loading, error, disabled, very long content, many
        items. These are exactly the states that break in production and the ones a static design rarely shows.
        A component isn't "done" until its tricky states each have a story. Pair this with the visual and
        interaction testing in Part A0 and your stories become your test suite too.</p>`,
      })}

      ${h.exercise({
        title: "Document your components",
        prompt: `<p>The design-system project has Storybook configured with a <code>Button</code> story. Run
        <code>pnpm --filter design-system storybook</code> and explore it. Then write stories for the other
        components you've built (Badge, Dialog, etc.), including their important states (disabled, long text,
        each variant). Add <code>argTypes</code> controls so props are explorable. You now have a living catalog
        of your design system.</p>`,
        runHint: "pnpm --filter design-system storybook",
      })}
    </section>
  `,
});
