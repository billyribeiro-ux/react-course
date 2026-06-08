/* Lesson 60-styling/1100 — Accessibility II: focus, ARIA, screen readers. */
registerLesson({
  meta: {
    id: "60-styling/1100-accessibility-aria",
    title: "Accessibility II: Focus, ARIA & Screen Readers",
    part: "60-styling",
    estMinutes: 17,
    level: "advanced",
    project: "design-system",
    lede: "The deeper layer of a11y: managing focus for dynamic UI, using ARIA correctly when native HTML isn't enough, announcing changes to screen readers, and color contrast. The details that make apps genuinely usable.",
    objectives: [
      "Manage focus for modals and dynamic content",
      "Apply ARIA roles, states, and properties correctly",
      "Announce dynamic updates with live regions",
      "Meet color-contrast requirements",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Focus management for dynamic UI</h2>
      <p>
        When UI appears or disappears, focus must go somewhere sensible. Open a modal → focus moves into it and
        is <strong>trapped</strong> there; close it → focus returns to the trigger. Delete a row → focus moves
        to a neighbor, not nowhere. Radix handles this for its primitives, but you'll manage it yourself for
        custom interactions.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "Moving focus deliberately",
        readOnly: true,
        code: `function EditableTitle() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (editing) inputRef.current?.focus(); // focus the input when it appears
  }, [editing]);

  return editing ? (
    <input ref={inputRef} onBlur={() => setEditing(false)} />
  ) : (
    <button onClick={() => setEditing(true)}>Edit title</button>
  );
}`,
      })}

      <h2>ARIA: when native HTML isn't enough</h2>
      <p>ARIA attributes describe roles, states, and relationships for assistive tech. Use them for custom
      widgets and dynamic states that HTML can't express:</p>

      ${h.codePane({
        lang: "tsx",
        title: "ARIA states & relationships",
        readOnly: true,
        code: `// State: a toggle button announces pressed/unpressed
<button aria-pressed={isFavorite}>♥</button>

// State: a disclosure announces expanded/collapsed
<button aria-expanded={open} aria-controls="panel-1">Details</button>
<div id="panel-1" hidden={!open}>...</div>

// Relationship: connect an input to its error/hint
<input aria-describedby="email-err" aria-invalid={!!error} />
<p id="email-err">{error}</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "ARIA changes semantics, not behavior",
        body: `<p><code>role="button"</code> makes a screen reader <em>announce</em> "button" — it does NOT make
        the element clickable by keyboard. You'd still have to add <code>tabindex</code> and key handlers
        yourself (and probably get it subtly wrong). This is precisely why a real <code>&lt;button&gt;</code> or
        a Radix primitive is better: it gives you behavior <em>and</em> semantics together. Use ARIA to fill
        gaps, not to rebuild native elements.</p>`,
      })}

      <h2>Live regions: announcing changes</h2>
      ${h.codePane({
        lang: "tsx",
        title: "aria-live for dynamic updates",
        readOnly: true,
        code: `// A screen reader won't notice content that silently changes. A live
// region announces updates (e.g. "Task added", "3 results found"):
<div aria-live="polite" className="sr-only">
  {statusMessage}
</div>
// 'polite' waits for a pause; 'assertive' interrupts (use sparingly).
// 'sr-only' is a utility that hides it visually but keeps it for readers.`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Think about the non-visual experience",
        body: `<p>A sighted user sees a toast appear and a list update. A screen-reader user perceives <em>nothing</em>
        unless you announce it. Live regions, focus moves, and accessible names are how you make the dynamic,
        client-rendered nature of React apps perceivable to everyone. The mental exercise — "how would someone
        experience this with their eyes closed?" — is what separates apps that pass an automated checker from
        apps that are genuinely usable. Test with a real screen reader (VoiceOver on Mac, NVDA on Windows) at
        least once; it's eye-opening.</p>`,
      })}

      <h2>Color contrast</h2>
      ${h.callout({
        kind: "principal",
        title: "Contrast is measurable — meet WCAG AA",
        body: `<p>Text must have sufficient contrast against its background: <strong>4.5:1</strong> for normal
        text, <strong>3:1</strong> for large text (WCAG AA). Low-contrast gray-on-gray "looks clean" but is
        unreadable for many users and in bright light. Check with browser DevTools' contrast checker or design
        tools. This is exactly where OKLCH tokens help — controlling perceived lightness makes hitting contrast
        targets predictable. Contrast isn't subjective; it's a number you can verify.</p>`,
      })}

      ${h.exercise({
        title: "Make a component fully accessible",
        prompt: `<p>Take one custom interactive component in your design system (a toggle, a disclosure/accordion,
        or a custom dropdown) and make it complete: correct ARIA states (<code>aria-pressed</code>/
        <code>aria-expanded</code>), focus management, an <code>aria-live</code> announcement when its state
        changes, and verified color contrast. Test it with your keyboard and, if you can, a screen reader. This
        is the standard every component you ship should meet.</p>`,
        runHint: "pnpm --filter design-system dev",
      })}
    </section>
  `,
});
