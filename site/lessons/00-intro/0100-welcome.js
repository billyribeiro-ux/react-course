/* Lesson 00-intro/0100-welcome — the canonical template every lesson clones. */
registerLesson({
  meta: {
    id: "00-intro/0100-welcome",
    title: "Welcome & How to Use This Course",
    part: "00-intro",
    estMinutes: 12,
    level: "beginner",
    project: null,
    lede: "You're about to go from never having written a line of code to building anything you can imagine in React. Here's how this course works, and how to get the most out of it.",
    objectives: [
      "Understand the journey this course takes you on, end to end",
      "Know how each lesson is structured (read, copy, build, repeat)",
      "Use the code panes, callouts, exercises, and navigation confidently",
      "Set the right expectations and mindset for learning to code",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>What you're going to become</h2>
      <p>
        This is not a tour. It is a <strong>complete apprenticeship</strong>. By the final
        lesson you will have built real web apps, a full-stack product with a database and
        authentication, a mobile app shipped to phones, a tested and documented design system,
        and you'll understand the architecture decisions a <strong>principal engineer</strong>
        makes every day. We start from <em>"what even is a program?"</em> — so if you've never
        coded, you are in exactly the right place.
      </p>
      <p>
        The secret to getting there isn't talent. It's <strong>showing up and building</strong>,
        one small, well-explained step at a time. That's what this course is engineered for.
      </p>

      ${h.callout({
        kind: "principal",
        title: "The principal-engineer mindset (start it today)",
        body: `<p>Senior engineers aren't people who memorized more syntax. They're people who built
        a strong <em>mental model</em> of how things work, so they can reason about problems they've
        never seen before. Throughout this course, whenever you copy a line of code, pause and ask
        <em>"why does this work?"</em> The boxes like this one are where we hand you that deeper
        model.</p>`,
      })}

      <h2>How a lesson works</h2>
      <p>
        Every lesson follows the same rhythm so you always know what to do:
      </p>
      <ol>
        <li><strong>Read</strong> the explanation — written in plain English, but never dumbed down.</li>
        <li><strong>Copy</strong> the code from the code panes into your own project.</li>
        <li><strong>Run</strong> it and see it work with your own eyes.</li>
        <li><strong>Practice</strong> with the "Your turn" exercise at the end.</li>
      </ol>

      <h3>Code panes</h3>
      <p>
        Code appears in panes powered by the <strong>Monaco editor</strong> — the same editor
        inside VS Code. Each pane has a <strong>Copy</strong> button in its top-right corner. Most
        panes are read-only (they're for copying), like this one:
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "HelloWorld.tsx",
        readOnly: true,
        code: `// Your very first React component — don't worry about the details yet.
export function HelloWorld() {
  const name = "future principal engineer";
  return <h1>Hello, {name}! 👋</h1>;
}`,
      })}

      <p>
        A few panes are marked <strong>editable</strong> — you can type directly in them to
        experiment. Try changing the message below (it won't break anything):
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "Try me",
        editable: true,
        code: `const language = "JavaScript";
const message = \`I'm learning \${language} and React!\`;
console.log(message);`,
      })}

      ${h.callout({
        kind: "tip",
        body: `<p>Don't just read the code — <strong>type it out yourself</strong> when you can.
        Copy-pasting is fine to keep momentum, but typing builds the muscle memory and catches the
        small mistakes that teach you the most.</p>`,
      })}

      <h3>Callout boxes</h3>
      <p>You'll see colored boxes throughout. Each color means something specific:</p>

      ${h.callout({
        kind: "note",
        body: `<p>A <strong>Note</strong> adds useful background or context. Good to know, not critical.</p>`,
      })}
      ${h.callout({
        kind: "warning",
        body: `<p>A <strong>Warning</strong> flags something easy to get wrong. Slow down and read carefully.</p>`,
      })}
      ${h.callout({
        kind: "gotcha",
        body: `<p>A <strong>Gotcha</strong> is a specific trap that bites almost everyone once.
        We point it out so it doesn't bite you.</p>`,
      })}

      <h2>Building real projects</h2>
      <p>
        Reading about code is like reading about swimming. Starting in the next part, most lessons
        attach to a <strong>real project</strong> in this repository that you build up lesson by
        lesson. When a lesson has a project, you'll see a banner at the top telling you exactly
        which command to run. For example, later lessons will show:
      </p>

      ${h.codePane({
        lang: "bash",
        title: "Terminal",
        readOnly: true,
        code: `# Install everything once, from the repo root:
pnpm install

# Then start the project for the part you're on, e.g.:
pnpm vite`,
      })}

      ${h.callout({
        kind: "note",
        title: "Don't worry if that looks foreign",
        body: `<p>Terminals, <code>pnpm</code>, and installing tools are covered step by step in
        Part 00, lesson <em>"Installing the toolkit"</em>. Right now you don't need to run anything —
        just get comfortable with the layout.</p>`,
      })}

      <h2>Navigating the course</h2>
      <p>
        Use the <strong>sidebar</strong> on the left to jump between lessons and parts, and the
        <strong>Previous / Next</strong> buttons at the bottom of every lesson to move in order.
        You can also press <kbd>←</kbd> and <kbd>→</kbd> on your keyboard. Your progress is saved
        automatically in your browser, and the bar at the top shows how far you've come.
      </p>
      <p>
        Prefer dark mode? Click the <kbd>🌙</kbd> / <kbd>☀️</kbd> button in the top-right to switch
        any time.
      </p>

      ${h.callout({
        kind: "principal",
        title: "How to actually finish",
        body: `<p>This is a long course because mastery is a long road. Consistency beats
        intensity: <strong>one lesson a day</strong> finishes the whole thing in a few months and
        will change your career. Don't rush, don't skip the exercises, and don't move on until the
        current idea genuinely clicks. Confusion is normal and temporary — push through it and it
        becomes understanding.</p>`,
      })}

      ${h.exercise({
        title: "Set yourself up to win",
        prompt: `<p>Before the next lesson:</p>
        <ol>
          <li>Pick a consistent time you'll study (even 30 minutes counts).</li>
          <li>Toggle dark/light mode above and find what's comfortable for your eyes.</li>
          <li>Click the <strong>Next →</strong> button below to continue to
          <em>"What a computer and a program actually are."</em></li>
        </ol>
        <p>That's it. You've already taken the hardest step: starting. 🚀</p>`,
        runHint: "",
      })}
    </section>
  `,
});
