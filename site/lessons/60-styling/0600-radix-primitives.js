/* Lesson 60-styling/0600 — Accessible primitives with Radix. */
registerLesson({
  meta: {
    id: "60-styling/0600-radix-primitives",
    title: "Accessible Primitives with Radix",
    part: "60-styling",
    estMinutes: 16,
    level: "advanced",
    project: "design-system",
    lede: "Building a truly accessible dropdown, dialog, or tooltip from scratch is deceptively hard — keyboard navigation, focus trapping, ARIA, screen readers. Radix gives you unstyled, fully-accessible behavior so you only style.",
    objectives: [
      "Understand 'headless' / unstyled components",
      "Build an accessible dialog with Radix",
      "Style Radix primitives with Tailwind",
      "Appreciate the accessibility you get for free",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The hidden difficulty of 'simple' components</h2>
      <p>
        A dropdown menu seems trivial until you make it <em>correct</em>: arrow-key navigation, Escape to
        close, focus returning to the trigger, click-outside, typeahead, correct ARIA roles, screen-reader
        announcements, and proper focus trapping in a modal. Getting all of this right is genuinely hard and
        easy to get subtly wrong. <strong>Radix UI</strong> provides these behaviors as
        <strong>unstyled (headless)</strong> components — all the accessibility and interaction, none of the
        looks.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "An accessible dialog, styled with Tailwind",
        readOnly: true,
        code: `import * as Dialog from "@radix-ui/react-dialog";

export function ConfirmDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="bg-brand text-brand-fg px-4 py-2 rounded-md">
          Delete
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        {/* Radix handles: focus trap, Escape to close, scroll lock,
            aria-modal, returning focus to the trigger on close. */}
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2
                                   -translate-y-1/2 bg-surface p-6 rounded-md">
          <Dialog.Title className="text-lg font-bold">Are you sure?</Dialog.Title>
          <Dialog.Description className="text-muted">
            This action cannot be undone.
          </Dialog.Description>
          {children}
          <Dialog.Close asChild>
            <button className="mt-4 px-4 py-2">Cancel</button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Headless = behavior without opinion on looks",
        body: `<p>The headless pattern separates <strong>behavior/accessibility</strong> (hard, universal,
        worth sharing) from <strong>presentation</strong> (your brand, infinitely variable). Radix nails the
        behavior; you bring the Tailwind. This is the modern way to build design-system primitives: you'd
        almost never hand-roll a dialog or combobox in 2026 — the accessibility surface is too large to get
        right and re-derive per project. Standing on Radix lets your team focus on product, not on
        re-implementing focus-trap logic.</p>`,
      })}

      ${h.callout({
        kind: "note",
        title: "The asChild pattern",
        body: `<p>Radix's <code>asChild</code> prop merges the primitive's behavior onto <em>your</em> element
        instead of rendering its own. So <code>&lt;Dialog.Trigger asChild&gt;&lt;button .../&gt;&lt;/Dialog.Trigger&gt;</code>
        gives your styled button all the trigger behavior. This composition pattern (you'll see it across
        Radix and shadcn) keeps you in control of the markup while inheriting the behavior.</p>`,
      })}

      <h2>What you get for free</h2>
      <ul>
        <li><strong>Keyboard:</strong> arrow keys, Escape, Tab order, typeahead — all handled.</li>
        <li><strong>Focus management:</strong> trapped in modals, restored on close.</li>
        <li><strong>ARIA:</strong> correct roles, states, and relationships, automatically.</li>
        <li><strong>Screen readers:</strong> proper announcements for open/close, selection, etc.</li>
      </ul>

      ${h.callout({
        kind: "principal",
        title: "Accessibility is not optional",
        body: `<p>Roughly 1 in 6 people has a disability. Accessible components aren't a nice-to-have — they're
        a professional and often legal requirement, and they improve UX for <em>everyone</em> (keyboard users,
        power users). Building on Radix means accessibility is the default, not an afterthought you bolt on
        later (which never goes well). We go deep on a11y in the next two lessons; Radix is how you operationalize
        it in components.</p>`,
      })}

      ${h.exercise({
        title: "Build accessible primitives",
        prompt: `<p>In the design-system project (Radix dialog & dropdown are installed), build a styled
        <code>Dialog</code> and a <code>DropdownMenu</code> using Radix, themed with your Tailwind tokens. Then
        test them with <strong>only your keyboard</strong> — Tab to the trigger, Enter/Space to open, arrow
        keys to navigate, Escape to close — and confirm focus returns correctly. Experiencing the
        keyboard-completeness you got for free is the lesson.</p>`,
        runHint: "pnpm --filter design-system dev",
      })}
    </section>
  `,
});
