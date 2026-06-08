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
  ],
};
