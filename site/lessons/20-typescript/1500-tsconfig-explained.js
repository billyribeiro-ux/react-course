/* Lesson 20-typescript/1500 — tsconfig.json explained. */
registerLesson({
  meta: {
    id: "20-typescript/1500-tsconfig-explained",
    title: "tsconfig.json Explained",
    part: "20-typescript",
    estMinutes: 14,
    level: "advanced",
    project: "js-foundations",
    lede: "The tsconfig.json controls how strict and how modern TypeScript is. You rarely write one from scratch, but understanding the key options — especially strict mode — makes you far more effective.",
    objectives: [
      "Understand what tsconfig.json controls",
      "Know the most important compiler options",
      "Appreciate why 'strict' should always be on",
      "Read the course's shared base config",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>What it is</h2>
      <p>
        <code>tsconfig.json</code> is the config file at a project's root that tells the TypeScript
        compiler how to behave: which files to include, how strict to be, what JavaScript version to
        target, and how to resolve modules. Tools like Vite and Next set up a good one for you — your job
        is to understand and tune it.
      </p>

      ${h.codePane({
        lang: "json",
        title: "A representative tsconfig.json",
        readOnly: true,
        code: `{
  "compilerOptions": {
    "target": "ES2023",          // JS version to compile down to
    "module": "ESNext",          // module system to emit
    "moduleResolution": "Bundler", // how to find imports (modern)
    "strict": true,              // ⭐ all strict checks on — keep this!
    "noUncheckedIndexedAccess": true, // arr[i] is T | undefined
    "jsx": "react-jsx",          // enables JSX (for React)
    "esModuleInterop": true,
    "skipLibCheck": true,        // don't type-check library .d.ts (faster)
    "noEmit": true               // Vite/bundler handles output, not tsc
  },
  "include": ["src"]
}`,
      })}

      <h2>The one that matters most: <code>strict</code></h2>
      <p>
        <code>"strict": true</code> turns on a family of checks that catch the most bugs — including
        <code>strictNullChecks</code> (the famous one), which makes <code>null</code> and
        <code>undefined</code> impossible to use accidentally:
      </p>

      ${h.codePane({
        lang: "ts",
        title: "strictNullChecks in action",
        readOnly: true,
        code: `function getLength(text: string | null) {
  return text.length;     // ❌ with strict: 'text' might be null
}
// Forces you to handle the null case:
function getLengthSafe(text: string | null) {
  return text?.length ?? 0; // ✅
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Always start strict",
        body: `<p>Turning <code>strict</code> on from day one is non-negotiable on serious projects. It's
        far easier to satisfy strict checks while writing code than to retrofit them onto a loose codebase
        later (a painful migration many teams put off for years). Strict mode is the difference between
        TypeScript catching your bugs and TypeScript just being decoration. Our course config also enables
        <code>noUncheckedIndexedAccess</code>, which honestly types <code>arr[i]</code> as possibly
        <code>undefined</code> — stricter, safer, and a great habit.</p>`,
      })}

      <h2>Sharing config across a monorepo</h2>
      <p>
        This course uses one <code>tsconfig.base.json</code> at the repo root, and each project
        <code>extends</code> it. That keeps every project consistent and avoids repeating settings — the
        same DRY principle as everything else:
      </p>

      ${h.codePane({
        lang: "json",
        title: "projects/js-foundations/tsconfig.json",
        readOnly: true,
        code: `{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist",
    "lib": ["ES2023", "DOM", "DOM.Iterable"]
  },
  "include": ["src"]
}`,
      })}

      ${h.callout({
        kind: "tip",
        body: `<p>Run <code>tsc --noEmit</code> (we wired it as <code>pnpm --filter js-foundations
        typecheck</code>) to type-check the whole project at once without producing files. This is what
        runs in CI to block type errors from ever merging — a safety net for your whole team.</p>`,
      })}

      ${h.exercise({
        title: "Inspect and tighten",
        prompt: `<p>Open <code>projects/js-foundations/tsconfig.json</code> and the root
        <code>tsconfig.base.json</code>. Confirm <code>strict</code> is on. Temporarily introduce a
        possible-null bug and run the typecheck to watch it get caught. Then read each option in the base
        config and make sure you can explain what it does — you'll meet these same options in the React,
        Next, and Expo projects ahead.</p>`,
        runHint: "pnpm --filter js-foundations typecheck",
      })}
    </section>
  `,
});
