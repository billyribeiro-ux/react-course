# React: Beginner → Distinguished Principal Engineer (L7++)

The most comprehensive, hands-on, up-to-date React course there is — engineered to take someone
who has **never written a line of code** all the way to **principal-engineer level**, able to build
anything in the React ecosystem.

Built around the **June 2026** stable ecosystem: React 19.2, React Compiler 1.0, Vite 8,
TypeScript 6, Next.js 16.2 LTS, Expo SDK 56 / React Native 0.85, TanStack Query 5 & Router,
Zustand 5, Tailwind CSS v4, Vitest 4 + Playwright, and more.

**Status: complete — 208 lessons across 13 parts**, beginner to distinguished principal engineer
(L7++), every lesson with deep explanations, copy-ready Monaco code panes, and hands-on exercises,
backed by 7 real projects.

**Verified reference implementations** (build/lint/typecheck — and where noted, tests — all green):
`vite-fundamentals` (Recipe Finder + tests), `vite-hooks-lab` (Kanban + reducer tests),
`data-routing-app` (Job Board), `design-system` (Button/Badge/Field + Storybook), and
`next-saas` (**LaunchPad** full-stack SaaS, verified end-to-end in a real browser:
auth → authorization → Server-Action CRUD → Zod validation). `js-foundations` is the vanilla→TS
starter you build through Part 10–20; `expo-mobile` is a standalone Expo Router app. Content
integrity is gated by `pnpm check` (manifest + render + 410 syntax-checked snippets) and
`pnpm check:browser` / `pnpm check:launchpad`.

## What's inside

```
react-course/
├── site/        ← the course website (static, no build) — open this to learn
├── projects/    ← the real apps you build, lesson by lesson (pnpm workspaces)
├── shared/      ← code shared across projects
└── tools/       ← authoring spec + manifest consistency check
```

The **course site** in `site/` is intentionally a plain static site (HTML/CSS/JS, Monaco editor
from a CDN). It works whether you double-click it (`file://`) or serve it. The **projects** in
`projects/` are genuine modern apps you scaffold and grow as you follow along.

## How to run the course site

Either just open `site/index.html` in your browser, or serve it (recommended, avoids any
browser file restrictions):

```bash
pnpm site        # serves ./site at a local URL
# or:  npx serve site
```

Then click **Start learning** and follow the **Previous / Next** buttons (or the ← / → keys).
Each lesson explains an idea, gives you code to copy from a real editor pane, and ends with a
short exercise. Your progress is saved automatically in your browser.

## How to run the projects

Projects are pnpm workspaces. Install once from the repo root, then start whichever project the
lesson you're on uses:

```bash
pnpm install        # one-time, installs every project's dependencies

pnpm vite           # Part 10–30: Vite + React fundamentals
pnpm hooks          # Part 40–50: hooks lab
pnpm design         # Part 60: design system (Storybook)
pnpm data           # Part 70: routing + data app
pnpm next           # Part 80: full-stack Next.js app
pnpm expo           # Part 90: Expo / React Native app
```

> New to terminals, Node, or pnpm? Part 00 walks you through installing and using everything from
> zero — you don't need to understand the commands above yet.

## The curriculum (13 parts)

| Part | Focus | Project |
|---|---|---|
| 00 | How software & the web work; your toolkit | — |
| 10 | JavaScript foundations (from zero) | Personal Dashboard (vanilla) |
| 20 | TypeScript foundations | Typed Dashboard |
| 30 | React fundamentals (Vite 7 + React 19.2) | Recipe Finder |
| 40 | Hooks deep dive | Kanban Board |
| 50 | Modern React 19.2 (Actions, `use()`, Suspense, Compiler) | (extends Kanban) |
| 60 | Styling, design systems, accessibility (Tailwind v4, shadcn, Storybook) | Component library |
| 70 | Routing & data (TanStack Router/Query, Zustand, RHF + Zod) | Job Board |
| 80 | Full-stack with Next.js 16 (RSC, Server Actions, DB, auth) | LaunchPad SaaS |
| 90 | Mobile with React Native + Expo SDK 56 | LaunchPad Mobile |
| A0 | Testing & quality (Vitest, Testing Library, Playwright, MSW) | Test suites |
| B0 | Principal topics: performance, architecture, scale, leadership | Hardened platform |
| C0 | Capstones — two large end-to-end builds | SaaS + cross-platform |

## For contributors / authors

See [`tools/scaffold-lesson.md`](tools/scaffold-lesson.md) for the lesson authoring spec, and run
`pnpm check:lessons` to verify the manifest and lesson files stay in sync.

## License

MIT
