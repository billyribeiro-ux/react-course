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
    {
      id: "00-intro/0100-welcome",
      part: "00-intro",
      title: "Welcome & How to Use This Course",
      estMinutes: 12,
      project: null,
      level: "beginner",
    },
  ],
};
