/* Lesson 50-modern-react/1000 — View Transitions in React. */
registerLesson({
  meta: {
    id: "50-modern-react/1000-view-transitions",
    title: "View Transitions",
    part: "50-modern-react",
    estMinutes: 12,
    level: "advanced",
    project: "vite-hooks-lab",
    lede: "The <ViewTransition> component lets React animate UI changes — items reordering, pages navigating, elements morphing — using the browser's View Transitions API, declaratively and smoothly.",
    objectives: [
      "Animate state changes with <ViewTransition>",
      "Understand what the browser API provides",
      "Apply transitions to lists and navigation",
      "Keep animations accessible and tasteful",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Smooth changes, declaratively</h2>
      <p>
        When your UI changes — a card moves columns, a list reorders, you navigate to a detail view — an
        instant jump can be jarring. React's <code>&lt;ViewTransition&gt;</code> wraps the browser's
        <strong>View Transitions API</strong> to animate between the before and after states automatically,
        without manual animation code.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "<ViewTransition> wrapping an update",
        readOnly: true,
        code: `import { ViewTransition, startTransition } from "react";

function Board({ tasks }: { tasks: Task[] }) {
  return (
    <ViewTransition>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>{t.title}</li>  // reordering animates smoothly
        ))}
      </ul>
    </ViewTransition>
  );
}

// Trigger the change inside a transition so React coordinates the animation:
function moveTask(id: string, column: string) {
  startTransition(() => dispatch({ type: "moved", id, column }));
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "The browser does the heavy lifting",
        body: `<p>The View Transitions API snapshots the page before and after a change and cross-fades or morphs
        between them — including elements that moved position. React's <code>&lt;ViewTransition&gt;</code>
        integrates this with your state updates so you get polished motion (shared-element transitions, smooth
        reorders, page-to-page morphs) declaratively, instead of hand-coding FLIP animations or pulling in a
        heavy animation library for every transition. It's native, performant, and progressively enhanced.</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Respect prefers-reduced-motion",
        body: `<p>Animations can cause discomfort or distraction for some users. Always honor the
        <code>prefers-reduced-motion</code> media query — disable or minimize transitions when it's set. The
        browser's View Transitions respect it to a degree, but you should design with it in mind. Tasteful,
        accessible motion enhances UX; gratuitous animation harms it. Accessibility is a principal-level
        non-negotiable, not an afterthought (Part 60 goes deep).</p>`,
      })}

      ${h.callout({
        kind: "note",
        title: "Evolving API + ecosystem",
        body: `<p>React's View Transition support stabilized through the 19.x line and pairs with
        <code>&lt;Activity&gt;</code> and routers for animated navigation. For complex, gesture-driven, or
        spring-physics animation you'll still reach for <strong>Motion</strong> (Part 60) or
        <strong>Reanimated</strong> on mobile (Part 90). View Transitions shine for the common "animate this
        state change / navigation" cases with minimal code.</p>`,
      })}

      ${h.exercise({
        title: "Animate your board",
        prompt: `<p>Wrap your Kanban columns/cards in <code>&lt;ViewTransition&gt;</code> and trigger moves and
        reorders inside <code>startTransition</code>. Watch cards smoothly animate between columns instead of
        snapping. Add a <code>prefers-reduced-motion</code> check that disables the effect. Subtle motion like
        this is what makes an app feel premium.</p>`,
        runHint: "pnpm --filter vite-hooks-lab dev",
      })}
    </section>
  `,
});
