/* Lesson 30-react-fundamentals/0900 — State with useState. */
registerLesson({
  meta: {
    id: "30-react-fundamentals/0900-usestate",
    title: "State with useState",
    part: "30-react-fundamentals",
    estMinutes: 20,
    level: "beginner",
    project: "vite-fundamentals",
    lede: "State is data that changes over time and that the UI reflects. useState is the hook that gives a component memory. This is the moment your app comes alive and re-renders itself.",
    objectives: [
      "Add state to a component with useState",
      "Update state and trigger a re-render",
      "Type state correctly",
      "Understand why you never mutate state directly",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>What is state?</h2>
      <p>
        <strong>Props</strong> are inputs from a parent (read-only). <strong>State</strong> is data a
        component <em>owns and changes over time</em> — the current search text, whether a menu is open, a
        counter's value. When state changes, React automatically re-renders the component to reflect it.
        This is the engine of <em>UI = f(state)</em>.
      </p>

      <h2>useState</h2>
      <p>
        <code>useState</code> is a <strong>hook</strong> — a special function (always called at the top of
        a component) that gives the component memory. It returns a pair: the current value and a function
        to update it. Remember array destructuring and tuples from earlier? That's exactly this:
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "A counter",
        readOnly: true,
        code: `import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  //     ^value  ^setter        ^initial value

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}`,
      })}

      <p>Trace what happens on click:</p>
      <ol>
        <li><code>setCount(count + 1)</code> tells React the new value.</li>
        <li>React <strong>re-renders</strong> <code>Counter</code> — calls the function again.</li>
        <li>This time <code>useState</code> returns the new <code>count</code>, so the button shows the updated number.</li>
      </ol>

      ${h.callout({
        kind: "principal",
        title: "State is closures, made safe",
        body: `<p>Remember closures from Part 10? <code>useState</code> uses them: React stores your value
        outside the function and hands it back on each render. That's why your handlers "remember" state.
        Understanding this demystifies React's trickiest behavior later (stale closures). For now, the rule
        is simple: <strong>to change what's on screen, change state — never edit the DOM directly.</strong>
        You've left manual <code>render()</code> calls behind forever.</p>`,
      })}

      <h2>Typing state</h2>
      <p>TypeScript usually infers the type from the initial value. Annotate explicitly when the initial
      value doesn't tell the whole story (e.g. could be null, or a union):</p>

      ${h.codePane({
        lang: "tsx",
        title: "Typed state",
        readOnly: true,
        code: `const [count, setCount] = useState(0);          // inferred: number
const [name, setName] = useState("");           // inferred: string
const [open, setOpen] = useState(false);        // inferred: boolean

// Explicit when needed:
const [user, setUser] = useState<User | null>(null);   // could be null
const [recipes, setRecipes] = useState<Recipe[]>([]);  // empty array → annotate`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Annotate empty arrays and nullable state",
        body: `<p><code>useState([])</code> infers <code>never[]</code> — you won't be able to add real items.
        Always write <code>useState&lt;Recipe[]&gt;([])</code>. Same for state that starts <code>null</code>
        but will hold an object: <code>useState&lt;User | null&gt;(null)</code>. These two cases catch
        everyone; make them habits.</p>`,
      })}

      <h2>Never mutate state directly</h2>
      <p>
        You must update state through its setter, and with a <strong>new</strong> value — never by mutating
        the existing one. React compares references to decide whether to re-render; mutating in place looks
        unchanged to React, so the screen won't update:
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "Right vs wrong",
        readOnly: true,
        code: `const [recipes, setRecipes] = useState<Recipe[]>([]);

// ❌ Mutation — React doesn't notice; no re-render
recipes.push(newRecipe);

// ✅ New array via spread — React sees a new reference, re-renders
setRecipes([...recipes, newRecipe]);

// Same for objects:
setUser({ ...user, name: "New Name" });`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Immutability is non-negotiable in React",
        body: `<p>This is exactly why Part 10 drilled spread/copy and "transform, don't mutate." React's
        change detection depends on new references. Treat state as immutable: always produce a new array or
        object. It's not just a rule to memorize — it's the same functional-programming discipline that
        makes UIs predictable and is the reason the next lesson on "state as a snapshot" makes sense.</p>`,
      })}

      ${h.exercise({
        title: "Make the Recipe Finder stateful",
        prompt: `<p>Add real state to your app: a <code>const [query, setQuery] = useState("")</code> driven by
        the search input's <code>onChange</code>, and a <code>const [recipes, setRecipes] =
        useState&lt;Recipe[]&gt;([...])</code>. Add a "favorite" toggle button on each card that updates a
        <code>favorites</code> state immutably. Watch the UI update automatically as state changes — no
        manual re-rendering anywhere. This is React earning its keep.</p>`,
        runHint: "pnpm vite",
      })}
    </section>
  `,
});
