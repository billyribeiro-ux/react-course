/* Lesson 50-modern-react/0200 — The use() hook. */
registerLesson({
  meta: {
    id: "50-modern-react/0200-use-hook",
    title: "The use() Hook",
    part: "50-modern-react",
    estMinutes: 14,
    level: "advanced",
    project: "vite-hooks-lab",
    lede: "use() is a new React API that reads the value of a promise or context — and integrates with Suspense. It lets you consume async data declaratively, and unlike other hooks, it can be called conditionally.",
    objectives: [
      "Read a promise's value with use()",
      "Combine use() with Suspense for clean data loading",
      "Read context with use()",
      "Understand how use() differs from other hooks",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Reading a promise with <code>use()</code></h2>
      <p>
        <code>use()</code> unwraps a promise: it suspends the component until the promise resolves, then
        returns its value. Paired with a Suspense boundary, this replaces the entire
        loading-state-juggling dance with two lines.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "use() + Suspense",
        readOnly: true,
        code: `import { use, Suspense } from "react";

function Recipes({ recipesPromise }: { recipesPromise: Promise<Recipe[]> }) {
  const recipes = use(recipesPromise); // suspends until resolved, then returns the array
  return (
    <ul>{recipes.map((r) => <li key={r.id}>{r.name}</li>)}</ul>
  );
}

function App() {
  // Create the promise OUTSIDE render (or via a cache/framework) so it's stable:
  const recipesPromise = fetchRecipes();
  return (
    <Suspense fallback={<Spinner />}>
      <Recipes recipesPromise={recipesPromise} />
    </Suspense>
  );
}`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Don't create the promise during render",
        body: `<p>If you call <code>fetchRecipes()</code> directly inside the component that uses it, a new
        promise is created on every render → infinite suspending. The promise must be <strong>stable</strong>:
        created by a framework's data layer, a cache, an event handler, or passed in as a prop from a stable
        source. This is exactly why frameworks (Next.js) and libraries (TanStack Query) exist — they manage
        the promise's lifecycle for you. In raw React apps, <code>use()</code> shines most with framework or
        library support.</p>`,
      })}

      <h2>The rule-breaker: <code>use()</code> can be conditional</h2>
      ${h.codePane({
        lang: "tsx",
        title: "use() inside conditions is allowed",
        readOnly: true,
        code: `function Profile({ userPromise, show }: Props) {
  if (!show) return null;
  const user = use(userPromise); // ✅ allowed inside a condition!
  return <p>{user.name}</p>;
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Why use() can break Rule 1",
        body: `<p>Unlike <code>useState</code>/<code>useEffect</code>, <code>use()</code> doesn't rely on a
        fixed call-order slot — so it's allowed inside conditions and loops. This makes it uniquely flexible.
        It's a signal of where React is heading: a more declarative, async-native model where reading data
        feels as natural as reading a variable. You still can't call it from outside a component/hook, but the
        conditional freedom is a deliberate, powerful exception.</p>`,
      })}

      <h2>Reading context with <code>use()</code></h2>
      ${h.codePane({
        lang: "tsx",
        title: "use(Context)",
        readOnly: true,
        code: `import { use } from "react";

function ThemedButton() {
  const theme = use(ThemeContext); // like useContext, but conditional-friendly
  return <button className={theme}>Click</button>;
}`,
      })}

      ${h.callout({
        kind: "note",
        body: `<p><code>use(SomeContext)</code> works like <code>useContext(SomeContext)</code> but, again, can
        be called conditionally. For reading promises, <code>use()</code> is the building block behind much of
        React 19's data story and pairs directly with Server Components (Lesson 11) and Suspense. You'll use
        it most through frameworks, but understanding the primitive clarifies how they work.</p>`,
      })}

      ${h.exercise({
        title: "Load data with use()",
        prompt: `<p>In your hooks-lab, create a stable promise (e.g. <code>const boardStatsPromise =
        useMemo(() =&gt; fetchBoardStats(), [])</code> or hoist it) and a component that reads it with
        <code>use()</code> inside a <code>&lt;Suspense fallback={...}&gt;</code>. Compare how much simpler this
        is than the <code>useEffect</code> + three-state version from Part 30. Note the "stable promise"
        requirement — it's why Part 70's TanStack Query will make this effortless.</p>`,
        runHint: "pnpm --filter vite-hooks-lab dev",
      })}
    </section>
  `,
});
