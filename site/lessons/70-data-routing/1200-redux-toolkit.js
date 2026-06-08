/* Lesson 70-data-routing/1200 — Redux Toolkit (enterprise context). */
registerLesson({
  meta: {
    id: "70-data-routing/1200-redux-toolkit",
    title: "Redux Toolkit: Enterprise State",
    part: "70-data-routing",
    estMinutes: 15,
    level: "advanced",
    project: "data-routing-app",
    lede: "Redux dominated React state for years. Modern Redux Toolkit removed most of its boilerplate. You'll meet it in large, long-lived codebases — so understand its model, strengths, and when (not) to reach for it.",
    objectives: [
      "Understand the Redux model (store, actions, reducers)",
      "Write a slice with Redux Toolkit",
      "Know what RTK adds over old Redux",
      "Decide when Redux is the right choice",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The Redux model</h2>
      <p>
        Redux is the original "single store, predictable updates" library: one global <strong>store</strong>,
        state changed only by dispatching <strong>actions</strong> to pure <strong>reducers</strong>. You already
        know this model — it's <code>useReducer</code> (Part 40) scaled to a whole app, with great DevTools
        (time-travel debugging, action logs).
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "A Redux Toolkit slice",
        readOnly: true,
        code: `import { createSlice, configureStore } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] as Job[] },
  reducers: {
    // RTK uses Immer internally — you can "mutate" safely here:
    added: (state, action) => { state.items.push(action.payload); },
    removed: (state, action) => {
      state.items = state.items.filter((j) => j.id !== action.payload);
    },
  },
});

export const { added, removed } = cartSlice.actions;
export const store = configureStore({ reducer: { cart: cartSlice.reducer } });`,
      })}

      ${h.callout({
        kind: "principal",
        title: "What Redux Toolkit fixed",
        body: `<p>Classic Redux was infamous for boilerplate — separate action types, action creators, switch-based
        reducers, immutable spreading by hand, manual store setup. <strong>Redux Toolkit (RTK)</strong> is the
        official modern Redux: <code>createSlice</code> generates actions and reducers together, bundles
        <strong>Immer</strong> (so you write "mutating" reducers that stay immutable), and <code>configureStore</code>
        sets up DevTools and middleware. It's a night-and-day improvement. If you "heard Redux is boilerplate-heavy,"
        that critique is about <em>old</em> Redux — RTK is concise.</p>`,
      })}

      <h2>RTK Query</h2>
      ${h.callout({
        kind: "note",
        body: `<p>RTK also ships <strong>RTK Query</strong>, a data-fetching/caching layer (like TanStack Query) built
        into Redux. In a Redux shop it's a reasonable choice for server state. In a non-Redux app, TanStack Query
        is the more popular standalone pick. Same problem (server state caching), different homes.</p>`,
      })}

      <h2>When to choose Redux in 2026</h2>
      ${h.callout({
        kind: "principal",
        title: "A balanced, senior take",
        body: `<p>For a <strong>new small/medium app</strong>, Redux is usually overkill — Query + Zustand + URL
        state is leaner. Redux shines for <strong>large, long-lived, enterprise apps</strong> with complex,
        interconnected client state, many contributors, and a need for strict conventions, powerful DevTools, and
        a well-trodden path. Its structure (which feels heavy on a small app) becomes a <em>benefit</em> at scale:
        predictability and consistency across a big team. You'll also simply <em>encounter</em> Redux in existing
        codebases, so you must be able to read and work in it. The principal move: don't reach for Redux by
        default, but recognize the contexts where its rigor pays off — and never dismiss it as "outdated," because
        RTK is modern and widely used.</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        body: `<p>A common anti-pattern (in any state library): putting <em>server</em> data in the global store and
        hand-syncing it. Remember Lesson 5 — server state belongs in a caching layer (TanStack/RTK Query), not in
        hand-managed Redux slices. Redux/Zustand are for <em>client</em> state.</p>`,
      })}

      ${h.exercise({
        title: "Build a slice",
        prompt: `<p>Implement the saved-jobs feature once more, this time with Redux Toolkit: a
        <code>createSlice</code> with add/remove/clear reducers, wired via <code>configureStore</code> and the
        <code>&lt;Provider&gt;</code> + <code>useSelector</code>/<code>useDispatch</code> hooks. Compare the code
        and developer experience to your Zustand version. Then write down: for a 3-person startup app vs a
        500-engineer enterprise app, which would you pick, and why?</p>`,
        runHint: "pnpm --filter data-routing-app dev",
      })}
    </section>
  `,
});
