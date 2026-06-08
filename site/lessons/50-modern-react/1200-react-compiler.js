/* Lesson 50-modern-react/1200 — The React Compiler 1.0. */
registerLesson({
  meta: {
    id: "50-modern-react/1200-react-compiler",
    title: "The React Compiler 1.0",
    part: "50-modern-react",
    estMinutes: 16,
    level: "advanced",
    project: "vite-hooks-lab",
    lede: "The React Compiler automatically optimizes your components at build time — doing what useMemo, useCallback, and memo did by hand, but everywhere and correctly. Stable since 2025, it changes how you write React.",
    objectives: [
      "Understand what the React Compiler does",
      "Install and enable it in a Vite project",
      "Write clean code and let the compiler optimize",
      "Configure the matching ESLint rules",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>What it does</h2>
      <p>
        The <strong>React Compiler</strong> (stable 1.0 since late 2025) is a build-time tool that analyzes
        your components and automatically inserts the memoization that prevents unnecessary re-renders and
        recomputations. It does — automatically and pervasively — what developers used to do manually and
        inconsistently with <code>useMemo</code>, <code>useCallback</code>, and <code>React.memo</code>.
      </p>

      ${h.callout({
        kind: "principal",
        title: "Write simple code; let the compiler optimize",
        body: `<p>This is a real paradigm shift. The official guidance is now: <strong>write clean,
        straightforward components and let the compiler handle performance.</strong> No more cluttering code
        with memoization hooks "just in case," no more wrong dependency arrays, no more debating what to
        memoize. The compiler memoizes correctly at a granularity humans can't match by hand. Teams report
        25–40% fewer re-renders with zero code changes. It's one of the most significant improvements in
        React's history — and it means much of the manual optimization advice from older tutorials is now
        obsolete.</p>`,
      })}

      <h2>Enabling it in Vite</h2>
      <p>The compiler is a Babel plugin you add to the React plugin. Install it and configure:</p>

      ${h.codePane({
        lang: "bash",
        title: "Terminal",
        readOnly: true,
        code: `# With @vitejs/plugin-react v6, the compiler runs via a small babel preset:
pnpm add -D babel-plugin-react-compiler @rolldown/plugin-babel @babel/core @types/babel__core`,
      })}

      ${h.codePane({
        lang: "ts",
        title: "vite.config.ts",
        readOnly: true,
        code: `import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

export default defineConfig({
  // react() handles JSX/Fast Refresh; the babel preset runs the compiler.
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
});`,
      })}

      ${h.callout({
        kind: "note",
        title: "Setup varies by tool",
        body: `<p>The exact wiring depends on your build tool and its version (this is the
        <code>@vitejs/plugin-react</code> v6 approach used in our project). Older Vite plugin versions used a
        <code>babel.plugins</code> field; Next.js enables the compiler with a single
        <code>reactCompiler: true</code> in <code>next.config</code> (Part 80). Always check the current docs
        for your setup — but the <em>behavior</em> is identical everywhere.</p>`,
      })}

      ${h.callout({
        kind: "note",
        title: "It's already wired into this project",
        body: `<p>The <code>vite-hooks-lab</code> project has the React Compiler enabled (check
        <code>vite.config.ts</code>). So every component you've written in Parts 40–50 is already being
        optimized automatically. You didn't have to think about it — which is the entire point.</p>`,
      })}

      <h2>The ESLint rules</h2>
      ${h.callout({
        kind: "principal",
        title: "The compiler relies on you following the Rules of React",
        body: `<p>The compiler can only safely optimize code that follows the <strong>Rules of React</strong>:
        components and hooks must be pure, you must not mutate props/state, and the Rules of Hooks must hold.
        The <code>eslint-plugin-react-hooks</code> (which you already have) includes the compiler's lint rules
        — they flag patterns the compiler can't optimize or that would be unsafe. <strong>Treat these warnings
        seriously:</strong> they're telling you where your code breaks React's assumptions. Clean, rule-following
        code is what unlocks the compiler's benefits. This is a virtuous cycle: the compiler rewards good
        habits.</p>`,
      })}

      <h2>What you stop writing</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Before vs after the compiler",
        readOnly: true,
        code: `// BEFORE (manual memoization everywhere):
const filtered = useMemo(() => items.filter(fn), [items, fn]);
const handleClick = useCallback(() => doThing(id), [id]);
const MemoChild = memo(Child);

// AFTER (compiler handles it — just write the obvious code):
const filtered = items.filter(fn);
const handleClick = () => doThing(id);
// <Child /> — the compiler memoizes as needed`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "It's not a license to ignore performance entirely",
        body: `<p>The compiler eliminates <em>unnecessary re-renders and recomputation</em>, which is most
        everyday performance work. It does <strong>not</strong> fix algorithmic problems (an O(n²) loop),
        oversized bundles, network waterfalls, or un-virtualized 10,000-row lists — those still need the
        techniques in Part B0. The compiler handles the tedious memoization layer so you can focus your
        performance attention where it actually matters.</p>`,
      })}

      ${h.exercise({
        title: "Verify the compiler is working",
        prompt: `<p>Confirm <code>babel-plugin-react-compiler</code> is in <code>vite-hooks-lab</code>'s
        <code>vite.config.ts</code>. Go back through your Parts 40–50 components and <strong>remove</strong> any
        <code>useMemo</code>/<code>useCallback</code> you added for performance (keep ones needed for
        correctness like stable promise creation). Run <code>pnpm build</code> and the app — it should work
        identically, now optimized by the compiler. Run <code>pnpm lint</code> and fix any rule violations the
        compiler flags. Enjoy writing cleaner code.</p>`,
        runHint: "pnpm --filter vite-hooks-lab build && pnpm --filter vite-hooks-lab lint",
      })}
    </section>
  `,
});
