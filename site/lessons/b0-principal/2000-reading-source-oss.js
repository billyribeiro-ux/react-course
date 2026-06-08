/* Lesson b0-principal/2000 — Reading source & contributing to OSS. */
registerLesson({
  meta: {
    id: "b0-principal/2000-reading-source-oss",
    title: "Reading Source & Contributing to Open Source",
    part: "b0-principal",
    estMinutes: 13,
    level: "principal",
    project: null,
    lede: "The best engineers don't treat their tools as magic black boxes — they read the source when they need to, and contribute back. Both skills deepen your understanding and your standing in the community.",
    objectives: [
      "Read unfamiliar source code effectively",
      "Debug into your dependencies",
      "Make your first open-source contribution",
      "Learn from how great libraries are built",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Source code is documentation that can't lie</h2>
      <p>
        When docs are unclear, a behavior is surprising, or you hit a bug in a library, the source is the ground truth.
        Senior engineers are comfortable <strong>opening node_modules</strong> (or a library's GitHub) and reading how
        something actually works — instead of being blocked by "it's a black box." This ability turns mysterious
        behavior into understandable mechanics.
      </p>

      ${h.callout({
        kind: "principal",
        title: "How to read unfamiliar code",
        body: `<p>You won't (and shouldn't try to) understand an entire codebase. Read <strong>with a purpose</strong>:
        start from the public API you use and follow it inward, just far enough to answer your specific question. Use
        your editor's "go to definition," set breakpoints and <strong>step through with the debugger</strong> (watching
        real execution beats reading static code), read the tests (they show intended behavior and usage), and skim for
        the shape before diving into detail. Reading code is a skill that improves with practice — and the same skill
        lets you onboard onto any new codebase quickly, which is exactly what senior engineers do when they change teams
        or jobs.</p>`,
      })}

      <h2>Contributing to open source</h2>
      ${h.callout({
        kind: "principal",
        title: "Start small, contribute real value",
        body: `<p>You already depend on dozens of open-source projects (React, Vite, every library in this course) —
        contributing back is both generous and a powerful learning accelerator. Start small: fix a typo in docs, improve
        an error message, add a failing-test reproduction to a bug report, clarify documentation, then graduate to small
        bug fixes. Read the project's CONTRIBUTING guide, discuss in an issue before a big PR, write clear PR
        descriptions, and be gracious in review. Working in a high-standards public codebase — with maintainers
        reviewing your code — rapidly raises your own bar. It also builds your reputation and network.</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Learn architecture from the masters",
        body: `<p>Reading how excellent libraries are built — how TanStack Query structures its cache, how Radix handles
        accessibility, how Zustand stays tiny, how React's reconciler works — teaches you patterns and trade-offs no
        tutorial covers. These are some of the best-engineered codebases in the ecosystem, written by people solving
        hard problems elegantly. Studying them is like an apprenticeship with the masters. Pick one library you admire
        and read a slice of its source with a question in mind; you'll come away a better engineer and pick up patterns
        you'll reuse for years.</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Debugging into dependencies",
        body: `<p>A practical superpower: when a bug seems to be "in a library," don't assume it's unreachable. Set a
        breakpoint, step into the library's code in your debugger, and watch what actually happens with your inputs.
        Often you'll find <em>you're</em> using it wrong (most common), or occasionally a real library bug worth
        reporting with a minimal reproduction. Either way you learn how it works. The willingness to debug <em>through</em>
        the boundary instead of stopping at it is what separates engineers who get unblocked from those who stay
        stuck.</p>`,
      })}

      ${h.exercise({
        title: "Read source and contribute",
        prompt: `<p>Pick a library you use (TanStack Query, Zustand, Radix, Zod) and read a focused slice of its source
        with a specific question ("how does invalidateQueries find matching queries?"). Step through it in a debugger if
        you can. Then find a <strong>good-first-issue</strong> or a docs improvement in an OSS project you use and open a
        small PR (even a typo or a clarified sentence counts). You'll learn more in an afternoon of this than a week of
        tutorials.</p>`,
        runHint: "",
      })}
    </section>
  `,
});
