/* Lesson 70-data-routing/1100 — Atomic state with Jotai. */
registerLesson({
  meta: {
    id: "70-data-routing/1100-jotai",
    title: "Atomic State with Jotai",
    part: "70-data-routing",
    estMinutes: 13,
    level: "advanced",
    project: "data-routing-app",
    lede: "Jotai takes a different approach to state: tiny independent 'atoms' you compose, with automatic dependency tracking. It shines for fine-grained, derived state — a useful tool to know alongside Zustand.",
    objectives: [
      "Create and use atoms",
      "Derive atoms from other atoms",
      "Understand the atomic model vs the store model",
      "Choose between Jotai and Zustand",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The atomic model</h2>
      <p>
        Where Zustand has one store with many fields, <strong>Jotai</strong> breaks state into many small
        <strong>atoms</strong> — each a tiny independent piece. Components subscribe to exactly the atoms they
        use, and Jotai tracks dependencies automatically. It feels like <code>useState</code>, but the state can
        be shared and composed.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "Atoms",
        readOnly: true,
        code: `import { atom, useAtom } from "jotai";

// A primitive atom (shared state):
const remoteOnlyAtom = atom(false);

function RemoteFilter() {
  const [remoteOnly, setRemoteOnly] = useAtom(remoteOnlyAtom); // like useState!
  return (
    <label>
      <input type="checkbox" checked={remoteOnly}
             onChange={(e) => setRemoteOnly(e.target.checked)} />
      Remote only
    </label>
  );
}`,
      })}

      <h2>Derived atoms</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Atoms computed from other atoms",
        readOnly: true,
        code: `const jobsAtom = atom<Job[]>([]);
const remoteOnlyAtom = atom(false);

// A derived (read-only) atom — recomputes when its deps change:
const visibleJobsAtom = atom((get) => {
  const jobs = get(jobsAtom);
  const remoteOnly = get(remoteOnlyAtom);
  return remoteOnly ? jobs.filter((j) => j.remote) : jobs;
});

function JobList() {
  const [visible] = useAtom(visibleJobsAtom); // auto-updates when deps change
  return <ul>{visible.map((j) => <li key={j.id}>{j.title}</li>)}</ul>;
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Bottom-up vs top-down",
        body: `<p>Jotai is <strong>bottom-up</strong>: you build state from small atoms and compose upward, with
        automatic, fine-grained dependency tracking (only components using a changed atom re-render). Zustand is
        <strong>top-down</strong>: one store, select slices out. Both avoid Context's whole-tree re-renders.
        Jotai excels when you have lots of small, interrelated, derived state (think a complex form or editor);
        Zustand excels for cohesive feature stores with actions. Neither is "better" — they suit different
        shapes of problem. Knowing both means you can match the model to the state.</p>`,
      })}

      ${h.callout({
        kind: "tip",
        title: "Jotai also handles async atoms",
        body: `<p>An atom's value can be a promise, integrating with Suspense — so Jotai can manage async/server
        state too. That said, for server state you'll usually still prefer TanStack Query's dedicated caching.
        Jotai's sweet spot is fine-grained <em>client</em> state.</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Don't adopt everything — choose",
        body: `<p>You now know three global-state options (Context, Zustand, Jotai) plus URL state and Query. The
        senior skill is <em>not</em> using all of them — it's picking the minimal set. A very common, excellent
        2026 stack is simply <strong>TanStack Query (server) + Zustand (the little global client state) + URL
        (filters/navigation) + useState (local)</strong>, with Jotai reached for only when its atomic model
        genuinely fits. More tools means more to learn for the next engineer; choose deliberately and keep the
        stack lean.</p>`,
      })}

      ${h.exercise({
        title: "Try the atomic approach",
        prompt: `<p>Reimplement the Job Board's filter state (remote-only, sort) as Jotai atoms, with a derived
        <code>visibleJobsAtom</code> that filters/sorts automatically. Compare the feel to a Zustand store doing
        the same thing. Then write a short note on which you'd choose for this app and why — practicing the
        "pick the right tool, justify it" reasoning.</p>`,
        runHint: "pnpm --filter data-routing-app dev",
      })}
    </section>
  `,
});
