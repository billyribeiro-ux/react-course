/* Lesson 60-styling/0900 — Animation with Motion. */
registerLesson({
  meta: {
    id: "60-styling/0900-motion",
    title: "Animation with Motion",
    part: "60-styling",
    estMinutes: 15,
    level: "advanced",
    project: "design-system",
    lede: "Good animation guides attention and makes an interface feel alive and responsive. Motion (formerly Framer Motion) is the standard React animation library — declarative, physics-based, and a joy to use.",
    objectives: [
      "Animate elements declaratively with motion components",
      "Animate mount/unmount with AnimatePresence",
      "Use layout animations and gestures",
      "Animate tastefully and accessibly",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Declarative animation</h2>
      <p>
        With <strong>Motion</strong>, you describe an element's animation states as props, and it handles the
        transitions with spring physics. A <code>motion.div</code> is a <code>div</code> you can animate:
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "Basic animation",
        readOnly: true,
        code: `import { motion } from "motion/react";

function Card() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}   // starting state
      animate={{ opacity: 1, y: 0 }}    // animate to this
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.03 }}      // gesture-driven
      whileTap={{ scale: 0.98 }}
    >
      Hover and tap me
    </motion.div>
  );
}`,
      })}

      <h2>Animating things leaving the page</h2>
      <p>React removes elements from the DOM instantly — so how do you animate something <em>out</em>?
      <code>AnimatePresence</code> keeps an exiting element around long enough to animate:</p>

      ${h.codePane({
        lang: "tsx",
        title: "Exit animations",
        readOnly: true,
        code: `import { AnimatePresence, motion } from "motion/react";

function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <AnimatePresence>
      {tasks.map((t) => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}   // runs when removed
        >
          {t.title}
        </motion.div>
      ))}
    </AnimatePresence>
  );
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Layout animations are the magic trick",
        body: `<p>Add the <code>layout</code> prop to a <code>motion</code> component and it automatically
        animates between positions when the layout changes — reordering a list, expanding a card, moving a
        Kanban card between columns all animate smoothly with near-zero code. This "FLIP" technique is
        painful by hand; Motion makes it a one-word prop. For shared-element transitions and complex
        choreography, Motion is the tool reached for across the industry. (For simple state-change/navigation
        animations, the native View Transitions from Part 50 are also great — they complement each other.)</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Respect prefers-reduced-motion (again)",
        body: `<p>Motion can read the user's reduced-motion preference (e.g. via the <code>useReducedMotion</code>
        hook) so you can soften or skip animations for users who need that. Always honor it — motion that
        delights most users can cause genuine discomfort or vestibular issues for others. Accessible animation
        is animation that can be turned off.</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Animate with purpose, not decoration",
        body: `<p>The best animation is barely noticed — it provides <em>continuity</em> (where did this come
        from?), <em>feedback</em> (my tap registered), and <em>focus</em> (look here). Gratuitous animation
        slows users down and feels gimmicky. Senior engineers and designers use motion to communicate, keep it
        fast (usually 150–300ms), and make it interruptible. Less, but intentional, beats more.</p>`,
      })}

      ${h.exercise({
        title: "Add tasteful motion",
        prompt: `<p>In the design-system project, animate a list (or a modal) with Motion: items fade/slide in
        on mount, animate out on removal with <code>AnimatePresence</code>, and reorder smoothly with the
        <code>layout</code> prop. Add a <code>whileHover</code>/<code>whileTap</code> to your Button. Then wire
        up <code>useReducedMotion</code> to disable it when requested. Keep every animation under 300ms and ask
        "does this communicate something?" for each.</p>`,
        runHint: "pnpm --filter design-system dev",
      })}
    </section>
  `,
});
