/* =====================================================================
   manifest.js — THE single source of truth for the course.
   `parts` defines the section groupings shown in the sidebar & landing.
   `lessons` is the canonical ORDERED reading list; prev/next is derived
   purely from a lesson's index in this array.

   To add a lesson:
     1. Create site/lessons/<part>/<NNNN>-<slug>.js
     2. Add one entry here, in the correct reading position.
   `id` MUST equal the file path under lessons/ minus the ".js".

   No JSON file is used on purpose: a plain global object loads fine from
   file:// (a fetch() of a local .json would be blocked by the browser).
   ===================================================================== */

window.COURSE = {
  title: "React: Beginner to Principal Engineer",
  subtitle: "L7++ • The complete hands-on curriculum",
  // Monaco version pinned once, globally (loaded from CDN).
  monacoVersion: "0.53.0",

  parts: [
    { id: "00-intro", title: "Getting Started", blurb: "How software & the web work, and your toolkit." },
    { id: "10-js-foundations", title: "JavaScript Foundations", blurb: "Programming from zero, in plain JavaScript." },
    { id: "20-typescript", title: "TypeScript Foundations", blurb: "Add a type system and never fear refactors." },
    { id: "30-react-fundamentals", title: "React Fundamentals", blurb: "Components, props, state, and the React mental model." },
    { id: "40-hooks", title: "Hooks Deep Dive", blurb: "Every hook, when to use it, and when not to." },
    { id: "50-modern-react", title: "Modern React 19.2", blurb: "Actions, use(), Suspense, the Compiler." },
    { id: "60-styling", title: "Styling & Design Systems", blurb: "Tailwind v4, shadcn, accessibility, Storybook." },
    { id: "70-data-routing", title: "Routing & Data", blurb: "TanStack Router/Query, Zustand, forms with Zod." },
    { id: "80-nextjs", title: "Full-Stack with Next.js 16", blurb: "RSC, Server Actions, databases, auth, deploy." },
    { id: "90-mobile", title: "Mobile with Expo", blurb: "React Native 0.85 + Expo SDK 56, shipped to stores." },
    { id: "a0-testing", title: "Testing & Quality", blurb: "Vitest, Testing Library, Playwright, MSW." },
    { id: "b0-principal", title: "Principal Topics", blurb: "Performance, architecture, scale, leadership." },
    { id: "c0-capstone", title: "Capstones", blurb: "Prove it: two large end-to-end builds." },
  ],

  // Ordered reading list. (Grows as parts are authored.)
  lessons: [
    // ---- Part 00 — Getting Started ----
    { id: "00-intro/0100-welcome", part: "00-intro", title: "Welcome & How to Use This Course", estMinutes: 12, project: null, level: "beginner" },
    { id: "00-intro/0200-what-is-a-program", part: "00-intro", title: "What a Computer & a Program Actually Are", estMinutes: 16, project: null, level: "beginner" },
    { id: "00-intro/0300-how-the-web-works", part: "00-intro", title: "How the Internet & the Web Work", estMinutes: 18, project: null, level: "beginner" },
    { id: "00-intro/0400-browsers-and-the-dom", part: "00-intro", title: "Browsers, the DOM & the Render Pipeline", estMinutes: 16, project: null, level: "beginner" },
    { id: "00-intro/0500-html-css-js", part: "00-intro", title: "HTML, CSS & JavaScript — The Three Roles", estMinutes: 15, project: null, level: "beginner" },
    { id: "00-intro/0600-toolkit-setup", part: "00-intro", title: "Installing Your Toolkit", estMinutes: 22, project: null, level: "beginner" },
    { id: "00-intro/0700-git-and-github", part: "00-intro", title: "Git & GitHub From Zero", estMinutes: 24, project: null, level: "beginner" },
    { id: "00-intro/0800-reading-docs-and-errors", part: "00-intro", title: "Reading Docs, Errors & Asking Good Questions", estMinutes: 18, project: null, level: "beginner" },
    { id: "00-intro/0900-learning-mindset", part: "00-intro", title: "Your Mental Model for Learning to Code", estMinutes: 14, project: null, level: "beginner" },

    // ---- Part 10 — JavaScript Foundations ----
    { id: "10-js-foundations/0100-values-and-types", part: "10-js-foundations", title: "Values & Types", estMinutes: 16, project: "js-foundations", level: "beginner" },
    { id: "10-js-foundations/0200-variables", part: "10-js-foundations", title: "Variables: let, const & Naming", estMinutes: 16, project: "js-foundations", level: "beginner" },
    { id: "10-js-foundations/0300-numbers-and-math", part: "10-js-foundations", title: "Numbers & Math", estMinutes: 15, project: "js-foundations", level: "beginner" },
    { id: "10-js-foundations/0400-strings", part: "10-js-foundations", title: "Strings & Template Literals", estMinutes: 16, project: "js-foundations", level: "beginner" },
    { id: "10-js-foundations/0500-booleans-and-comparison", part: "10-js-foundations", title: "Booleans, Comparison & Truthiness", estMinutes: 17, project: "js-foundations", level: "beginner" },
    { id: "10-js-foundations/0600-control-flow", part: "10-js-foundations", title: "Making Decisions: if, else, switch & ternary", estMinutes: 16, project: "js-foundations", level: "beginner" },
    { id: "10-js-foundations/0700-loops", part: "10-js-foundations", title: "Loops: Doing Things Repeatedly", estMinutes: 16, project: "js-foundations", level: "beginner" },
    { id: "10-js-foundations/0800-functions", part: "10-js-foundations", title: "Functions: Reusable Blocks of Logic", estMinutes: 20, project: "js-foundations", level: "beginner" },
    { id: "10-js-foundations/0900-scope-and-closures", part: "10-js-foundations", title: "Scope & Closures", estMinutes: 18, project: "js-foundations", level: "intermediate" },
    { id: "10-js-foundations/1000-arrays", part: "10-js-foundations", title: "Arrays: Ordered Lists of Values", estMinutes: 17, project: "js-foundations", level: "beginner" },
    { id: "10-js-foundations/1100-array-methods", part: "10-js-foundations", title: "Array Methods: map, filter, reduce & friends", estMinutes: 22, project: "js-foundations", level: "intermediate" },
    { id: "10-js-foundations/1200-objects", part: "10-js-foundations", title: "Objects: Structured Data", estMinutes: 19, project: "js-foundations", level: "beginner" },
    { id: "10-js-foundations/1300-destructuring-and-spread", part: "10-js-foundations", title: "Destructuring, Spread & Rest", estMinutes: 18, project: "js-foundations", level: "intermediate" },
    { id: "10-js-foundations/1400-optional-chaining-nullish", part: "10-js-foundations", title: "Optional Chaining & Nullish Coalescing", estMinutes: 13, project: "js-foundations", level: "intermediate" },
    { id: "10-js-foundations/1500-this-and-arrow-functions", part: "10-js-foundations", title: "this, Arrow vs Regular Functions", estMinutes: 16, project: "js-foundations", level: "intermediate" },
    { id: "10-js-foundations/1600-errors-and-try-catch", part: "10-js-foundations", title: "Errors & try / catch", estMinutes: 15, project: "js-foundations", level: "intermediate" },
    { id: "10-js-foundations/1700-the-dom", part: "10-js-foundations", title: "The DOM: Selecting & Changing Elements", estMinutes: 18, project: "js-foundations", level: "intermediate" },
    { id: "10-js-foundations/1800-events", part: "10-js-foundations", title: "Events: Responding to the User", estMinutes: 17, project: "js-foundations", level: "intermediate" },
    { id: "10-js-foundations/1900-modules", part: "10-js-foundations", title: "ES Modules: import & export", estMinutes: 14, project: "js-foundations", level: "intermediate" },
    { id: "10-js-foundations/2000-async-callbacks-event-loop", part: "10-js-foundations", title: "Async I: Callbacks & the Event Loop", estMinutes: 16, project: "js-foundations", level: "intermediate" },
    { id: "10-js-foundations/2100-promises", part: "10-js-foundations", title: "Async II: Promises", estMinutes: 16, project: "js-foundations", level: "intermediate" },
    { id: "10-js-foundations/2200-async-await-fetch", part: "10-js-foundations", title: "Async III: async / await & fetch", estMinutes: 18, project: "js-foundations", level: "intermediate" },
    { id: "10-js-foundations/2300-localstorage-and-json", part: "10-js-foundations", title: "localStorage & JSON", estMinutes: 14, project: "js-foundations", level: "intermediate" },
    { id: "10-js-foundations/2400-modern-js-roundup", part: "10-js-foundations", title: "Modern JavaScript Roundup", estMinutes: 17, project: "js-foundations", level: "intermediate" },
    { id: "10-js-foundations/2500-project-dashboard", part: "10-js-foundations", title: "Project: Ship the Personal Dashboard", estMinutes: 40, project: "js-foundations", level: "intermediate" },

    // ---- Part 20 — TypeScript Foundations ----
    { id: "20-typescript/0100-why-types", part: "20-typescript", title: "Why TypeScript? The Cost of Bugs", estMinutes: 15, project: "js-foundations", level: "beginner" },
    { id: "20-typescript/0200-primitive-and-literal-types", part: "20-typescript", title: "Primitive & Literal Types", estMinutes: 15, project: "js-foundations", level: "beginner" },
    { id: "20-typescript/0300-arrays-tuples-objects", part: "20-typescript", title: "Typing Arrays, Tuples & Objects", estMinutes: 16, project: "js-foundations", level: "beginner" },
    { id: "20-typescript/0400-functions", part: "20-typescript", title: "Typing Functions", estMinutes: 16, project: "js-foundations", level: "beginner" },
    { id: "20-typescript/0500-unions-and-intersections", part: "20-typescript", title: "Union & Intersection Types", estMinutes: 15, project: "js-foundations", level: "intermediate" },
    { id: "20-typescript/0600-narrowing-and-guards", part: "20-typescript", title: "Narrowing & Type Guards", estMinutes: 15, project: "js-foundations", level: "intermediate" },
    { id: "20-typescript/0700-interface-vs-type", part: "20-typescript", title: "interface vs type", estMinutes: 13, project: "js-foundations", level: "intermediate" },
    { id: "20-typescript/0800-generics", part: "20-typescript", title: "Generics: Reusable, Type-Safe Code", estMinutes: 18, project: "js-foundations", level: "intermediate" },
    { id: "20-typescript/0900-keyof-indexed-typeof", part: "20-typescript", title: "keyof, Indexed Access & typeof", estMinutes: 14, project: "js-foundations", level: "advanced" },
    { id: "20-typescript/1000-utility-types", part: "20-typescript", title: "Utility Types: Partial, Pick, Omit, Record…", estMinutes: 16, project: "js-foundations", level: "advanced" },
    { id: "20-typescript/1100-discriminated-unions", part: "20-typescript", title: "Discriminated Unions & Exhaustiveness", estMinutes: 16, project: "js-foundations", level: "advanced" },
    { id: "20-typescript/1200-unknown-any-never", part: "20-typescript", title: "unknown vs any vs never", estMinutes: 12, project: "js-foundations", level: "advanced" },
    { id: "20-typescript/1300-enums-and-as-const", part: "20-typescript", title: "Enums & as const", estMinutes: 13, project: "js-foundations", level: "advanced" },
    { id: "20-typescript/1400-modules-and-declarations", part: "20-typescript", title: "Modules, Imports & Declaration Files", estMinutes: 13, project: "js-foundations", level: "advanced" },
    { id: "20-typescript/1500-tsconfig-explained", part: "20-typescript", title: "tsconfig.json Explained", estMinutes: 14, project: "js-foundations", level: "advanced" },
    { id: "20-typescript/1600-project-typed-dashboard", part: "20-typescript", title: "Project: Convert the Dashboard to TypeScript", estMinutes: 45, project: "js-foundations", level: "advanced" },

    // ---- Part 30 — React Fundamentals ----
    { id: "30-react-fundamentals/0100-what-is-react", part: "30-react-fundamentals", title: "What React Is & the Mental Model", estMinutes: 16, project: "vite-fundamentals", level: "beginner" },
    { id: "30-react-fundamentals/0200-vite-project-tour", part: "30-react-fundamentals", title: "Your First React App: A Tour", estMinutes: 18, project: "vite-fundamentals", level: "beginner" },
    { id: "30-react-fundamentals/0300-jsx-in-depth", part: "30-react-fundamentals", title: "JSX in Depth", estMinutes: 18, project: "vite-fundamentals", level: "beginner" },
    { id: "30-react-fundamentals/0400-components-composition", part: "30-react-fundamentals", title: "Components & Composition", estMinutes: 16, project: "vite-fundamentals", level: "beginner" },
    { id: "30-react-fundamentals/0500-props", part: "30-react-fundamentals", title: "Props: Passing Data to Components", estMinutes: 18, project: "vite-fundamentals", level: "beginner" },
    { id: "30-react-fundamentals/0600-lists-and-keys", part: "30-react-fundamentals", title: "Rendering Lists & Keys", estMinutes: 16, project: "vite-fundamentals", level: "beginner" },
    { id: "30-react-fundamentals/0700-conditional-rendering", part: "30-react-fundamentals", title: "Conditional Rendering", estMinutes: 14, project: "vite-fundamentals", level: "beginner" },
    { id: "30-react-fundamentals/0800-handling-events", part: "30-react-fundamentals", title: "Handling Events", estMinutes: 15, project: "vite-fundamentals", level: "beginner" },
    { id: "30-react-fundamentals/0900-usestate", part: "30-react-fundamentals", title: "State with useState", estMinutes: 20, project: "vite-fundamentals", level: "beginner" },
    { id: "30-react-fundamentals/1000-state-as-snapshot", part: "30-react-fundamentals", title: "State as a Snapshot & Batching", estMinutes: 16, project: "vite-fundamentals", level: "intermediate" },
    { id: "30-react-fundamentals/1100-updating-state-immutably", part: "30-react-fundamentals", title: "Updating Objects & Arrays in State", estMinutes: 18, project: "vite-fundamentals", level: "intermediate" },
    { id: "30-react-fundamentals/1200-forms-and-controlled-inputs", part: "30-react-fundamentals", title: "Forms & Controlled Inputs", estMinutes: 18, project: "vite-fundamentals", level: "intermediate" },
    { id: "30-react-fundamentals/1300-lifting-state-up", part: "30-react-fundamentals", title: "Lifting State Up", estMinutes: 16, project: "vite-fundamentals", level: "intermediate" },
    { id: "30-react-fundamentals/1400-thinking-in-react", part: "30-react-fundamentals", title: "Thinking in React", estMinutes: 18, project: "vite-fundamentals", level: "intermediate" },
    { id: "30-react-fundamentals/1500-children-and-composition", part: "30-react-fundamentals", title: "Children & Composition Patterns", estMinutes: 16, project: "vite-fundamentals", level: "intermediate" },
    { id: "30-react-fundamentals/1600-render-pitfalls", part: "30-react-fundamentals", title: "Fragments, Keys & Rendering Pitfalls", estMinutes: 14, project: "vite-fundamentals", level: "intermediate" },
    { id: "30-react-fundamentals/1700-fetching-data-preview", part: "30-react-fundamentals", title: "Fetching Data (and the useEffect Caveat)", estMinutes: 16, project: "vite-fundamentals", level: "intermediate" },
    { id: "30-react-fundamentals/1800-project-recipe-finder", part: "30-react-fundamentals", title: "Project: Build the Recipe Finder", estMinutes: 50, project: "vite-fundamentals", level: "intermediate" },

    // ---- Part 40 — Hooks Deep Dive ----
    { id: "40-hooks/0100-rules-of-hooks", part: "40-hooks", title: "What Hooks Are & the Rules of Hooks", estMinutes: 15, project: "vite-hooks-lab", level: "intermediate" },
    { id: "40-hooks/0200-usestate-deeply", part: "40-hooks", title: "useState, Deeply", estMinutes: 16, project: "vite-hooks-lab", level: "intermediate" },
    { id: "40-hooks/0300-useeffect-synchronization", part: "40-hooks", title: "useEffect: Synchronization, Not Lifecycles", estMinutes: 18, project: "vite-hooks-lab", level: "intermediate" },
    { id: "40-hooks/0400-effect-dependencies-cleanup", part: "40-hooks", title: "Effect Dependencies & Cleanup", estMinutes: 17, project: "vite-hooks-lab", level: "advanced" },
    { id: "40-hooks/0500-when-not-to-use-effects", part: "40-hooks", title: "You Might Not Need an Effect", estMinutes: 17, project: "vite-hooks-lab", level: "advanced" },
    { id: "40-hooks/0600-useref", part: "40-hooks", title: "useRef: Escaping Render & Reaching the DOM", estMinutes: 15, project: "vite-hooks-lab", level: "intermediate" },
    { id: "40-hooks/0700-usereducer", part: "40-hooks", title: "useReducer: State Transitions as Data", estMinutes: 18, project: "vite-hooks-lab", level: "advanced" },
    { id: "40-hooks/0800-usecontext", part: "40-hooks", title: "useContext: Avoiding Prop Drilling", estMinutes: 18, project: "vite-hooks-lab", level: "advanced" },
    { id: "40-hooks/0900-usememo-usecallback", part: "40-hooks", title: "useMemo, useCallback & the Compiler", estMinutes: 18, project: "vite-hooks-lab", level: "advanced" },
    { id: "40-hooks/1000-useid", part: "40-hooks", title: "useId: Stable Unique IDs", estMinutes: 10, project: "vite-hooks-lab", level: "intermediate" },
    { id: "40-hooks/1100-usetransition-usedeferredvalue", part: "40-hooks", title: "Concurrent UI: useTransition & useDeferredValue", estMinutes: 16, project: "vite-hooks-lab", level: "advanced" },
    { id: "40-hooks/1200-usesyncexternalstore", part: "40-hooks", title: "useSyncExternalStore: Subscribing to External State", estMinutes: 14, project: "vite-hooks-lab", level: "advanced" },
    { id: "40-hooks/1300-useeffectevent", part: "40-hooks", title: "useEffectEvent: Separating Events from Effects", estMinutes: 14, project: "vite-hooks-lab", level: "advanced" },
    { id: "40-hooks/1400-custom-hooks", part: "40-hooks", title: "Writing Custom Hooks", estMinutes: 18, project: "vite-hooks-lab", level: "advanced" },
    { id: "40-hooks/1500-composing-and-testing-hooks", part: "40-hooks", title: "Composing & Testing Hooks", estMinutes: 15, project: "vite-hooks-lab", level: "advanced" },
    { id: "40-hooks/1600-project-kanban", part: "40-hooks", title: "Project: Build the Kanban Board", estMinutes: 55, project: "vite-hooks-lab", level: "advanced" },

    // ---- Part 50 — Modern React 19.2 ----
    { id: "50-modern-react/0100-suspense", part: "50-modern-react", title: "Suspense Fundamentals", estMinutes: 15, project: "vite-hooks-lab", level: "advanced" },
    { id: "50-modern-react/0200-use-hook", part: "50-modern-react", title: "The use() Hook", estMinutes: 14, project: "vite-hooks-lab", level: "advanced" },
    { id: "50-modern-react/0300-streaming-suspense", part: "50-modern-react", title: "Streaming & Suspense Boundaries", estMinutes: 14, project: "vite-hooks-lab", level: "advanced" },
    { id: "50-modern-react/0400-error-boundaries", part: "50-modern-react", title: "Error Boundaries", estMinutes: 14, project: "vite-hooks-lab", level: "advanced" },
    { id: "50-modern-react/0500-actions-and-forms", part: "50-modern-react", title: "Actions & Form Actions", estMinutes: 16, project: "vite-hooks-lab", level: "advanced" },
    { id: "50-modern-react/0600-useactionstate", part: "50-modern-react", title: "useActionState", estMinutes: 14, project: "vite-hooks-lab", level: "advanced" },
    { id: "50-modern-react/0700-useoptimistic", part: "50-modern-react", title: "useOptimistic", estMinutes: 14, project: "vite-hooks-lab", level: "advanced" },
    { id: "50-modern-react/0800-useformstatus", part: "50-modern-react", title: "useFormStatus", estMinutes: 10, project: "vite-hooks-lab", level: "advanced" },
    { id: "50-modern-react/0900-activity", part: "50-modern-react", title: "<Activity>: Pre-rendering & Hiding UI", estMinutes: 12, project: "vite-hooks-lab", level: "advanced" },
    { id: "50-modern-react/1000-view-transitions", part: "50-modern-react", title: "View Transitions", estMinutes: 12, project: "vite-hooks-lab", level: "advanced" },
    { id: "50-modern-react/1100-server-components-concept", part: "50-modern-react", title: "Server Components: The Concept", estMinutes: 16, project: "vite-hooks-lab", level: "advanced" },
    { id: "50-modern-react/1200-react-compiler", part: "50-modern-react", title: "The React Compiler 1.0", estMinutes: 16, project: "vite-hooks-lab", level: "advanced" },
    { id: "50-modern-react/1300-compiler-output-opting-out", part: "50-modern-react", title: "Trusting the Compiler & Opting Out", estMinutes: 12, project: "vite-hooks-lab", level: "advanced" },
    { id: "50-modern-react/1400-concurrent-rendering", part: "50-modern-react", title: "The Concurrent Rendering Mental Model", estMinutes: 13, project: "vite-hooks-lab", level: "advanced" },
    { id: "50-modern-react/1500-project-optimistic-ui", part: "50-modern-react", title: "Project: An Optimistic, Suspense-Driven Board", estMinutes: 50, project: "vite-hooks-lab", level: "advanced" },
  ],
};
