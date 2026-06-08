/* Lesson 60-styling/1000 — Accessibility I: semantics, roles, keyboard. */
registerLesson({
  meta: {
    id: "60-styling/1000-accessibility-semantics",
    title: "Accessibility I: Semantics, Roles & Keyboard",
    part: "60-styling",
    estMinutes: 17,
    level: "advanced",
    project: "design-system",
    lede: "Accessibility (a11y) means everyone can use your app — including people using keyboards, screen readers, and assistive tech. It starts with the cheapest, highest-impact thing: semantic HTML.",
    objectives: [
      "Use semantic HTML elements correctly",
      "Ensure full keyboard operability",
      "Provide accessible names and labels",
      "Understand why semantics beat ARIA",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Semantic HTML is 80% of accessibility</h2>
      <p>
        The single highest-leverage accessibility practice is using the <strong>right HTML element for the
        job</strong>. A real <code>&lt;button&gt;</code> is focusable, clickable by keyboard (Enter/Space),
        announced as a button by screen readers, and works on touch — all for free. A
        <code>&lt;div onClick&gt;</code> dressed as a button has <em>none</em> of that until you laboriously
        add it back (and usually get it wrong).
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "Use the right element",
        readOnly: true,
        code: `// ❌ A div pretending to be a button — inaccessible
<div className="btn" onClick={save}>Save</div>

// ✅ A real button — keyboard, focus, screen reader: all free
<button onClick={save}>Save</button>

// Use elements for their meaning:
<nav> <main> <header> <footer> <article> <section>
<button> <a href> <ul>/<li> <label> <h1>...<h6>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "The first rule of ARIA: don't use ARIA",
        body: `<p>It sounds paradoxical, but the official guidance is: <strong>prefer native HTML over ARIA</strong>.
        A native <code>&lt;button&gt;</code> beats <code>&lt;div role="button" tabindex="0"&gt;</code> with
        hand-wired key handlers every time — less code, fewer bugs, better support. ARIA is a powerful patch for
        when no native element fits, but it's easy to misuse and "bad ARIA is worse than no ARIA." Reach for
        semantic elements first; this single habit prevents the majority of accessibility defects.</p>`,
      })}

      <h2>Keyboard operability</h2>
      <p>Every interactive thing must be usable without a mouse. Test by putting your mouse away and using only
      <kbd>Tab</kbd>, <kbd>Shift+Tab</kbd>, <kbd>Enter</kbd>, <kbd>Space</kbd>, arrows, and <kbd>Esc</kbd>.</p>
      <ul>
        <li><strong>Tab order</strong> should follow visual order (it does, if you use semantic HTML and don't abuse <code>tabindex</code>).</li>
        <li><strong>Focus must be visible</strong> — never remove focus outlines without replacing them (<code>focus-visible:outline-2</code>).</li>
        <li>Custom widgets need the expected keys (a menu: arrows + Enter + Esc) — which is exactly why Radix (Lesson 6) is worth it.</li>
      </ul>

      ${h.callout({
        kind: "gotcha",
        title: "Never do outline: none without a replacement",
        body: `<p>Removing the focus ring (<code>outline: none</code>) because it's "ugly" makes your app
        unusable for keyboard users — they can't see where they are. If you don't like the default, <em>style</em>
        a better focus indicator with <code>:focus-visible</code>. A visible focus state is non-negotiable.</p>`,
      })}

      <h2>Accessible names</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Everything interactive needs a name",
        readOnly: true,
        code: `// Inputs need labels (associated, not just placed near):
<label htmlFor="email">Email</label>
<input id="email" type="email" />   // (useId from Part 40 for reusable ones)

// Icon-only buttons need an accessible name:
<button aria-label="Close dialog"><XIcon /></button>

// Images need alt text (empty alt="" for decorative ones):
<img src="chart.png" alt="Sales up 20% in Q2" />`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Accessibility is a quality bar, not a feature",
        body: `<p>Treat a11y like you treat correctness: part of "done," checked in review, not a separate phase.
        It's a legal requirement in many jurisdictions, it's the right thing to do, and accessible interfaces
        are <em>better for everyone</em> — keyboard shortcuts help power users, good labels help search, high
        contrast helps in sunlight. Principal engineers bake it in from the start because retrofitting it is
        painful and incomplete. The cheapest a11y is the semantic HTML you write anyway.</p>`,
      })}

      ${h.exercise({
        title: "Keyboard-audit your components",
        prompt: `<p>Go through the design-system project using <strong>only your keyboard</strong>. Confirm every
        interactive element is reachable with Tab, has a visible focus indicator, and responds to the expected
        keys. Fix any <code>div onClick</code> by converting to a real <code>&lt;button&gt;</code>, add
        <code>aria-label</code> to any icon-only buttons, and ensure all inputs have associated labels. You'll
        be surprised how much you catch.</p>`,
        runHint: "pnpm --filter design-system dev",
      })}
    </section>
  `,
});
