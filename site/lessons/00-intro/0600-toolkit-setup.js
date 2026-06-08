/* Lesson 00-intro/0600 — Installing your developer toolkit. */
registerLesson({
  meta: {
    id: "00-intro/0600-toolkit-setup",
    title: "Installing Your Toolkit (Node, pnpm, VS Code, Terminal)",
    part: "00-intro",
    estMinutes: 22,
    level: "beginner",
    project: null,
    lede: "Time to set up a real development environment on your own machine: a code editor, the JavaScript runtime, a package manager, and the terminal. Take this slowly — it's a one-time setup you'll use for years.",
    objectives: [
      "Install and open VS Code, the editor you'll live in",
      "Understand what the terminal is and run your first commands",
      "Install Node.js (via a version manager) and the pnpm package manager",
      "Verify everything works before moving on",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The four tools you need</h2>
      <ul>
        <li><strong>VS Code</strong> — a free code editor from Microsoft. Where you'll write code.</li>
        <li><strong>The terminal</strong> — a text-based way to give your computer commands. Already on your machine.</li>
        <li><strong>Node.js</strong> — runs JavaScript outside the browser. All our tools are built on it.</li>
        <li><strong>pnpm</strong> — a fast "package manager" that installs the libraries our projects use.</li>
      </ul>

      ${h.callout({
        kind: "tip",
        body: `<p>Setup is the least fun part of programming and the easiest place to get discouraged.
        If a step fails, that's <em>completely normal</em> — copy the error message, paste it into a
        search engine, and you'll almost always find the fix. Persistence here pays off for your whole
        career.</p>`,
      })}

      <h2>1. Install VS Code</h2>
      <p>
        Go to <strong>code.visualstudio.com</strong>, download the version for your operating system
        (Windows, macOS, or Linux), and install it like any other app. Open it once to confirm it
        launches. We'll customize it shortly.
      </p>

      <h2>2. Meet the terminal</h2>
      <p>
        The <strong>terminal</strong> (also "command line" or "shell") lets you type commands instead
        of clicking. It feels intimidating at first and then becomes one of your favorite tools.
        VS Code has one built in: open VS Code and press
        <kbd>Ctrl</kbd>+<kbd>\`</kbd> (the backtick key, top-left) — or use the menu
        <em>Terminal → New Terminal</em>.
      </p>
      <p>Try a couple of harmless commands. Type one, press Enter:</p>

      ${h.codePane({
        lang: "bash",
        title: "Terminal — first commands",
        readOnly: true,
        code: `pwd      # "print working directory" — shows where you currently are
ls       # "list" — shows the files in the current folder (use 'dir' on Windows cmd)
echo hi  # prints "hi" back to you`,
      })}

      ${h.callout({
        kind: "note",
        title: "Reading command examples",
        body: `<p>In terminal snippets, anything after a <code>#</code> is a comment for <em>you</em> —
        don't type it. And don't type a leading <code>$</code> if you see one elsewhere; it just
        represents the prompt. Type only the actual command.</p>`,
      })}

      <h2>3. Install Node.js (via a version manager)</h2>
      <p>
        We recommend installing Node through a <strong>version manager</strong> so you can switch Node
        versions per project later. On macOS/Linux use <strong>nvm</strong>; on Windows use
        <strong>nvm-windows</strong> or <strong>fnm</strong>. The simplest reliable path:
      </p>
      <ul>
        <li><strong>macOS / Linux:</strong> follow the install command at the <em>nvm</em> GitHub
        page, then run the commands below.</li>
        <li><strong>Windows:</strong> install <em>fnm</em> (search "fnm install") or download the
        Node LTS installer directly from <strong>nodejs.org</strong> if you prefer the simplest route.</li>
      </ul>

      ${h.codePane({
        lang: "bash",
        title: "Terminal — install & select Node (with nvm)",
        readOnly: true,
        code: `# Install the latest Long-Term Support (LTS) version of Node
nvm install --lts

# Use it
nvm use --lts

# Confirm it worked — you should see version numbers print
node --version    # e.g. v22.x.x
npm --version     # e.g. 10.x.x`,
      })}

      ${h.callout({
        kind: "gotcha",
        body: `<p>"LTS" means <strong>Long-Term Support</strong> — the stable version recommended for
        real work. Avoid "Current"/experimental builds while learning. This course targets Node 22+.</p>`,
      })}

      <h2>4. Install pnpm</h2>
      <p>
        <strong>npm</strong> comes bundled with Node, but we'll use <strong>pnpm</strong> — it's
        faster and handles multi-project repos (like this course) cleanly. The easiest way is Node's
        built-in <code>corepack</code>:
      </p>

      ${h.codePane({
        lang: "bash",
        title: "Terminal — install pnpm",
        readOnly: true,
        code: `corepack enable
corepack prepare pnpm@latest --activate

# Confirm
pnpm --version    # e.g. 10.x.x`,
      })}

      <h2>5. Make VS Code feel like home</h2>
      <p>Open VS Code's Extensions panel (the squares icon in the left bar) and install:</p>
      <ul>
        <li><strong>ESLint</strong> — flags mistakes as you type.</li>
        <li><strong>Prettier</strong> — auto-formats your code so it always looks clean.</li>
        <li><strong>Error Lens</strong> — shows errors inline, right where they happen.</li>
      </ul>

      ${h.callout({
        kind: "principal",
        title: "Invest in your environment",
        body: `<p>Strong engineers obsess a little over their tools — fast feedback loops, good
        formatting, helpful errors. It's not procrastination; a sharp environment compounds into
        thousands of saved hours and fewer bugs. Set it up well once, then keep refining it.</p>`,
      })}

      ${h.exercise({
        title: "Prove your toolkit works",
        prompt: `<p>In a VS Code terminal, run all four version checks and confirm each prints a number:</p>`,
        runHint: "node --version && npm --version && pnpm --version",
      })}

      <p>
        If all of those print versions, your machine is officially a development environment. 🎉 In the
        next lesson we'll set up Git and GitHub so you can save and share your work.
      </p>
    </section>
  `,
});
