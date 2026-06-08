/* Lesson 70-data-routing/1000 — Client state with Zustand. */
registerLesson({
  meta: {
    id: "70-data-routing/1000-zustand",
    title: "Client State with Zustand",
    part: "70-data-routing",
    estMinutes: 16,
    level: "advanced",
    project: "data-routing-app",
    lede: "For the client state that genuinely needs to be global, Zustand is the 2026 favorite: tiny, simple, hook-based, and free of boilerplate. Learn it and you've covered the global-state need for most apps.",
    objectives: [
      "Create a Zustand store",
      "Read state with selectors to avoid re-renders",
      "Update state with actions",
      "Know when global client state is actually needed",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>When do you even need this?</h2>
      <p>
        After TanStack Query takes server state and the URL takes filter/navigation state, the leftover
        <strong>global client state</strong> is usually small: a shopping cart, a multi-step wizard, UI prefs, a
        "command palette open" flag shared across the tree. For <em>that</em>, <strong>Zustand</strong> is ideal —
        and for purely local state, plain <code>useState</code> still wins.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "A Zustand store",
        readOnly: true,
        code: `import { create } from "zustand";

interface CartState {
  items: Job[];
  add: (job: Job) => void;
  remove: (id: number) => void;
  clear: () => void;
}

export const useCart = create<CartState>((set) => ({
  items: [],
  add: (job) => set((s) => ({ items: [...s.items, job] })),    // immutable
  remove: (id) => set((s) => ({ items: s.items.filter((j) => j.id !== id) })),
  clear: () => set({ items: [] }),
}));`,
      })}

      ${h.codePane({
        lang: "tsx",
        title: "Using the store anywhere — no provider",
        readOnly: true,
        code: `function CartBadge() {
  // Select ONLY what you need — this component re-renders only when
  // items.length changes, not on every cart change:
  const count = useCart((s) => s.items.length);
  return <span>🛒 {count}</span>;
}

function AddToCart({ job }: { job: Job }) {
  const add = useCart((s) => s.add); // actions are stable references
  return <button onClick={() => add(job)}>Add to cart</button>;
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Why Zustand won",
        body: `<p>Zustand is ~1KB, needs <strong>no provider</strong> wrapping your app, and its store is just a
        hook. Compared to the Redux of old, there's no boilerplate (no actions/reducers/dispatch ceremony for
        simple cases) — yet it scales. The key performance feature is <strong>selectors</strong>:
        <code>useCart(s =&gt; s.items.length)</code> subscribes a component to <em>only</em> that slice, so it
        re-renders only when that slice changes. This granular subscription is something React Context can't do
        (Context re-renders all consumers). For global client state, Zustand hits the sweet spot of simple +
        performant, which is why it tops developer-satisfaction surveys in 2026.</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Select narrowly; update immutably",
        body: `<p>Two rules: (1) <strong>select the smallest slice</strong> you need — selecting the whole store
        (<code>useCart(s =&gt; s)</code>) re-renders on every change, defeating the point. (2) Update
        <strong>immutably</strong> in your actions (spread/map/filter), same as <code>useState</code> — Zustand
        compares to decide re-renders. For deeply nested updates, pair Zustand with Immer (a middleware) to write
        mutating-looking code that produces immutable updates.</p>`,
      })}

      ${h.callout({
        kind: "tip",
        title: "Persistence & middleware",
        body: `<p>Zustand has middleware for common needs: <code>persist</code> (sync a store to
        <code>localStorage</code> automatically), <code>devtools</code> (Redux DevTools integration), and
        <code>immer</code>. A cart that survives reloads is <code>create(persist((set) =&gt; ({...}), { name:
        "cart" }))</code> — one line. This composability keeps Zustand simple at the core but capable when
        needed.</p>`,
      })}

      ${h.exercise({
        title: "Build a saved-jobs store",
        prompt: `<p>In the Job Board, create a Zustand store for "saved jobs" (add, remove, clear), persisted to
        <code>localStorage</code> with the <code>persist</code> middleware. Add a save button on job cards and a
        badge in the nav showing the saved count — using a narrow selector so the badge only re-renders when the
        count changes. Confirm saved jobs survive a reload. You've now used the right tool for global client
        state.</p>`,
        runHint: "pnpm --filter data-routing-app dev",
      })}
    </section>
  `,
});
