/* Lesson 50-modern-react/0900 — <Activity>. */
registerLesson({
  meta: {
    id: "50-modern-react/0900-activity",
    title: "<Activity>: Pre-rendering & Hiding UI",
    part: "50-modern-react",
    estMinutes: 12,
    level: "advanced",
    project: "vite-hooks-lab",
    lede: "Activity is a React 19.2 component that lets you hide parts of the UI while preserving their state — and even pre-render hidden content in the background. It powers instant tab switches and snappy navigation.",
    objectives: [
      "Hide UI while keeping its state with <Activity>",
      "Understand visible vs hidden modes",
      "Use it for tabs and pre-rendering",
      "Know how it differs from conditional rendering",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The problem with unmounting</h2>
      <p>
        When you conditionally render (<code>{tab === "a" && &lt;TabA/&gt;}</code>), switching tabs
        <strong>unmounts</strong> the old tab — destroying its state (scroll position, form input, fetched
        data). Switching back re-mounts it from scratch. <code>&lt;Activity&gt;</code> lets you
        <em>hide</em> UI instead of destroying it, preserving its state.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "<Activity> for tabs",
        readOnly: true,
        code: `import { Activity } from "react";

function Tabs({ active }: { active: "board" | "calendar" }) {
  return (
    <>
      <Activity mode={active === "board" ? "visible" : "hidden"}>
        <BoardView />     {/* state preserved even when hidden */}
      </Activity>
      <Activity mode={active === "calendar" ? "visible" : "hidden"}>
        <CalendarView />
      </Activity>
    </>
  );
}
// Switch tabs → the hidden view keeps its scroll, inputs, and data.
// Switch back → instant, exactly as you left it.`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Hidden, not destroyed",
        body: `<p>A <code>hidden</code> Activity is removed from view (and its Effects are cleaned up, so it
        stops doing background work like timers), but React <strong>keeps its state</strong>. This is perfect
        for tabbed interfaces, multi-step wizards, and any UI you switch between repeatedly. It also lets React
        <em>pre-render</em> hidden content at low priority in the background, so revealing it is instant.
        Compared to the old "keep it mounted but display:none" hacks (which kept Effects running) or
        unmount-and-lose-state, <code>&lt;Activity&gt;</code> is the correct, first-class tool.</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Hidden Activities clean up their Effects",
        body: `<p>When an Activity becomes hidden, React runs its Effects' cleanups (disconnecting subscriptions,
        clearing timers) — so a hidden tab doesn't keep polling or holding resources — and re-runs setup when
        it becomes visible again. State is preserved, but ongoing side effects are paused. That's usually
        exactly what you want; just be aware of it for Effects with important setup costs.</p>`,
      })}

      ${h.callout({
        kind: "note",
        title: "Newer API",
        body: `<p><code>&lt;Activity&gt;</code> stabilized in React 19.2. It's part of React's push toward
        smoother, app-like navigation — pairing naturally with View Transitions (next lesson) and the routers
        you'll use in Part 70 and 80. Adoption is growing; expect routers to integrate it for instant
        back/forward navigation.</p>`,
      })}

      ${h.exercise({
        title: "Preserve tab state",
        prompt: `<p>Add a tabbed view to your Kanban app — e.g. "Board" and "Stats" tabs. First implement it
        with conditional rendering and notice that switching tabs resets each tab's local state (scroll, a
        filter input). Then switch to <code>&lt;Activity&gt;</code> with visible/hidden modes and confirm each
        tab now retains its state across switches. Feel the difference in polish.</p>`,
        runHint: "pnpm --filter vite-hooks-lab dev",
      })}
    </section>
  `,
});
