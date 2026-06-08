/* Lesson 50-modern-react/1300 — Reading the compiler's output & opting out. */
registerLesson({
  meta: {
    id: "50-modern-react/1300-compiler-output-opting-out",
    title: "Trusting the Compiler & Opting Out",
    part: "50-modern-react",
    estMinutes: 12,
    level: "advanced",
    project: "vite-hooks-lab",
    lede: "How to verify the compiler is optimizing your components, what to do when it skips one, and the rare cases where you opt out. Plus the migration mindset for adopting it on existing code.",
    objectives: [
      "Verify which components the compiler optimized",
      "Understand why it skips rule-breaking components",
      "Opt out of a component when necessary",
      "Adopt the compiler on an existing codebase",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Verifying the compiler ran</h2>
      <p>
        The compiler works silently at build time, so how do you know it's optimizing? Two ways: the
        <strong>React DevTools</strong> badge a "Memo ✨" marker on compiled components, and the compiler's
        build logs / ESLint can report which components it <em>couldn't</em> optimize and why.
      </p>

      ${h.callout({
        kind: "principal",
        title: "The compiler 'bails out' on rule-breaking code",
        body: `<p>If a component violates the Rules of React — mutating props, calling hooks conditionally,
        relying on side effects during render — the compiler safely <strong>skips</strong> it rather than risk
        breaking it. So a component that "isn't getting faster" is often one that's breaking a rule. The fix
        isn't to fight the compiler; it's to make the component follow the rules (which makes it more correct
        anyway). The ESLint rules point you straight at these. This is the compiler turning "performance" into
        "just write correct React" — a profound simplification.</p>`,
      })}

      <h2>Opting out (rarely needed)</h2>
      ${h.codePane({
        lang: "tsx",
        title: "The escape hatch",
        readOnly: true,
        code: `function LegacyWidget() {
  "use no memo"; // tell the compiler to skip THIS component
  // ...code that (intentionally) does something the compiler can't handle...
}`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Use 'use no memo' as a last resort",
        body: `<p>The <code>"use no memo"</code> directive opts a single component out of compilation — useful as
        a temporary escape hatch while migrating, or for a component doing something genuinely incompatible.
        But it should be rare and ideally temporary. If you find yourself reaching for it often, the real issue
        is usually rule-violations worth fixing. Don't let opt-outs become a way to avoid writing clean
        components.</p>`,
      })}

      <h2>Adopting it on an existing codebase</h2>
      ${h.callout({
        kind: "principal",
        title: "A pragmatic migration path",
        body: `<p>To add the compiler to an existing app: (1) turn on the ESLint rules and fix the violations
        they surface — this is the bulk of the work and improves your code regardless; (2) enable the compiler;
        (3) <strong>remove</strong> now-redundant <code>useMemo</code>/<code>useCallback</code>/<code>memo</code>
        gradually (you don't have to do it all at once — they're harmless, just noise); (4) verify behavior with
        your test suite (Part A0). Teams report this as a high-value, relatively low-risk migration. The
        compiler is designed to be incrementally adoptable.</p>`,
      })}

      ${h.callout({
        kind: "note",
        title: "Leftover memo hooks are fine",
        body: `<p>You don't have to delete every <code>useMemo</code> the day you enable the compiler. Existing
        memoization still works; the compiler just makes most of it unnecessary. Clean it up opportunistically.
        New code, though, should be written plainly — let the compiler do its job from the start.</p>`,
      })}

      ${h.exercise({
        title: "Inspect and trust",
        prompt: `<p>Install React DevTools in your browser and open your <code>vite-hooks-lab</code> app. Look for
        the compiler's "Memo ✨" markers on your components in the Components panel. Then write a small component
        that mutates a prop (breaking a rule), observe that the compiler skips it and ESLint complains, and fix
        it. Finally, delete any remaining manual <code>useMemo</code>/<code>useCallback</code> you'd added for
        perf and confirm via the Profiler that re-renders are still minimized.</p>`,
        runHint: "pnpm --filter vite-hooks-lab dev",
      })}
    </section>
  `,
});
