/* Lesson 30-react-fundamentals/1600 — Fragments, keys, and rendering pitfalls. */
registerLesson({
  meta: {
    id: "30-react-fundamentals/1600-render-pitfalls",
    title: "Fragments, Keys & Rendering Pitfalls",
    part: "30-react-fundamentals",
    estMinutes: 14,
    level: "intermediate",
    project: "vite-fundamentals",
    lede: "A focused lesson on the subtle rendering bugs that trip up even experienced developers — and how React's reconciliation actually decides what to keep, update, or throw away.",
    objectives: [
      "Use Fragments to group without extra DOM",
      "Understand reconciliation and how keys drive it",
      "Avoid keys-as-index bugs and state-bleed",
      "Prevent accidental re-mounts that reset state",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Fragments: group without a wrapper</h2>
      <p>
        JSX needs one root, but you don't always want an extra <code>&lt;div&gt;</code> in the DOM.
        <strong>Fragments</strong> group elements invisibly:
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "Fragments",
        readOnly: true,
        code: `function Stats() {
  return (
    <>                       {/* shorthand Fragment — no DOM node */}
      <dt>Recipes</dt>
      <dd>12</dd>
    </>
  );
}

// When you need a key on a fragment (in a list), use the long form:
import { Fragment } from "react";
items.map((item) => (
  <Fragment key={item.id}>
    <dt>{item.term}</dt>
    <dd>{item.def}</dd>
  </Fragment>
));`,
      })}

      <h2>How reconciliation works</h2>
      <p>
        When state changes, React builds a new tree of elements and <strong>diffs</strong> it against the
        previous one ("reconciliation"). It matches elements by their <strong>position</strong> and
        <strong>type</strong> — and within lists, by <strong>key</strong>. Matched elements are
        <em>updated</em> (keeping their state); unmatched ones are <em>created</em> or <em>destroyed</em>.
      </p>

      ${h.callout({
        kind: "principal",
        title: "Keys tell React 'this is the same item'",
        body: `<p>A key is React's identity tag for a list item across renders. With stable keys, reordering a
        list just reorders the existing components (and their state) — efficient and correct. With index
        keys, reordering makes React think item #2 became a different item, so it reuses the wrong DOM and
        component state. This is why "use a stable id, not the index" matters: keys are about
        <em>identity</em>, not position. Understanding reconciliation turns key bugs from mysterious to
        obvious.</p>`,
      })}

      <h2>The state-bleed bug</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Index keys + local state = trouble",
        readOnly: true,
        code: `// Each row has its own input state. With key={index}:
{recipes.map((r, index) => (
  <EditableRow key={index} recipe={r} />  // ❌
))}
// Delete the first row → every row shifts up → React matches by index →
// the text you typed in row 2's input now appears in row 1. Confusing!

// With key={r.id} ✅ React tracks each row's identity correctly.`,
      })}

      <h2>Accidental re-mounts reset state</h2>
      ${h.callout({
        kind: "gotcha",
        title: "Don't define components inside components",
        body: `<p>Declaring a component <em>inside</em> another component's body creates a brand-new component
        type on every render. React sees a "different" type, unmounts the old one, and mounts a fresh one —
        destroying its state and DOM each render (inputs lose focus, animations restart). <strong>Always
        define components at the top level of a module</strong>, never nested inside another component's
        function body.</p>`,
      })}

      ${h.codePane({
        lang: "tsx",
        title: "The nested-component trap",
        readOnly: true,
        code: `function Parent() {
  // ❌ NEVER do this — Row is recreated every render, resetting its state
  function Row({ r }: { r: Recipe }) { return <li>{r.title}</li>; }
  return <ul>{recipes.map((r) => <Row key={r.id} r={r} />)}</ul>;
}

// ✅ Define Row at module top level instead.`,
      })}

      ${h.callout({
        kind: "tip",
        title: "Using key to intentionally reset",
        body: `<p>The flip side is a useful trick: changing a component's <code>key</code> forces React to
        re-mount it, resetting its state. <code>&lt;Profile key={userId} /&gt;</code> gives each user a fresh
        Profile with cleared form state. Deliberately using keys to reset state is a clean, idiomatic
        pattern — once you understand reconciliation, you can wield it.</p>`,
      })}

      ${h.exercise({
        title: "Reproduce and fix a key bug",
        prompt: `<p>Make a list of editable recipe rows (each with a local <code>useState</code> for an inline
        note input). Use <code>key={index}</code>, type notes into a few rows, then delete the top row and
        watch the notes attach to the wrong rows. Switch to <code>key={recipe.id}</code> and confirm the bug
        vanishes. Then move any nested component definitions to the module top level. You've now seen
        reconciliation's effects with your own eyes.</p>`,
        runHint: "pnpm vite",
      })}
    </section>
  `,
});
