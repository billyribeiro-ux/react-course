/* Lesson 00-intro/0700 — Git & GitHub from zero. */
registerLesson({
  meta: {
    id: "00-intro/0700-git-and-github",
    title: "Git & GitHub From Zero",
    part: "00-intro",
    estMinutes: 24,
    level: "beginner",
    project: null,
    lede: "Git is the time machine and safety net every professional developer uses to track their code. GitHub is where that code lives online. Learn the core workflow now and you'll use it every single day.",
    objectives: [
      "Explain what version control is and why it's non-negotiable",
      "Run the core Git workflow: clone, add, commit, push",
      "Understand branches and why we never work on main directly",
      "Create a GitHub account and connect it to your machine",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>What problem does Git solve?</h2>
      <p>
        Imagine writing a long essay and saving copies named <code>essay_final.doc</code>,
        <code>essay_final_v2.doc</code>, <code>essay_REALLY_final.doc</code>. Now imagine that across
        thousands of files, with a whole team editing at once. Chaos. <strong>Git</strong> is a
        <strong>version control system</strong>: it records snapshots of your project over time so you
        can see what changed, undo mistakes, and combine work from many people safely.
      </p>
      <ul>
        <li><strong>Git</strong> — the tool that tracks versions, running on your computer.</li>
        <li><strong>GitHub</strong> — a website that hosts Git projects online so you can back them up
        and collaborate. (GitLab and Bitbucket are alternatives.)</li>
      </ul>

      ${h.callout({
        kind: "principal",
        title: "Git fluency is a senior-level superpower",
        body: `<p>Comfort with Git separates people who panic when something breaks from people who
        calmly say "no problem, I'll just revert that commit." Mastering history, branches, and
        clean commits is genuinely part of operating at a principal level. We start with the
        essentials and deepen it in Part B0.</p>`,
      })}

      <h2>The mental model: snapshots over time</h2>
      <p>
        Think of Git as a series of save points in a video game. Each save point is a
        <strong>commit</strong> — a snapshot of all your files at a moment, with a short message
        describing what changed. You can always travel back to any commit.
      </p>

      <h2>One-time setup</h2>
      <p>First, install Git (search "install git" for your OS), then tell Git who you are:</p>

      ${h.codePane({
        lang: "bash",
        title: "Terminal — configure Git once",
        readOnly: true,
        code: `git --version                                   # confirm Git is installed
git config --global user.name "Your Name"
git config --global user.email "you@example.com" # use your GitHub email`,
      })}

      <p>
        Then go to <strong>github.com</strong>, create a free account (use the same email), and you're
        ready.
      </p>

      <h2>The core workflow (90% of what you'll do)</h2>
      <p>Here is the everyday loop, in order. Read the comments carefully:</p>

      ${h.codePane({
        lang: "bash",
        title: "Terminal — the everyday Git loop",
        readOnly: true,
        code: `# Copy a project from GitHub onto your machine (do this once per project)
git clone https://github.com/someone/some-project.git
cd some-project

# ... you edit files in VS Code ...

# See what you've changed
git status

# Stage the changes you want to save (the "." means "all of them")
git add .

# Save a snapshot with a clear message
git commit -m "Add the login button"

# Send your commits up to GitHub
git push`,
      })}

      ${h.callout({
        kind: "note",
        title: "add vs. commit — why two steps?",
        body: `<p><code>git add</code> chooses <em>which</em> changes go into the next snapshot;
        <code>git commit</code> actually takes the snapshot. The two-step design lets you craft tidy,
        focused commits instead of dumping everything together. Good commits tell a story.</p>`,
      })}

      <h2>Branches: work without breaking things</h2>
      <p>
        A <strong>branch</strong> is a parallel line of work. The main line is usually called
        <code>main</code>. Professionals rarely edit <code>main</code> directly — instead they branch
        off, build a feature in isolation, and merge it back when it's ready. This keeps the working
        version stable.
      </p>

      ${h.codePane({
        lang: "bash",
        title: "Terminal — branching",
        readOnly: true,
        code: `# Create a new branch and switch to it
git switch -c add-search-feature

# ... work, add, commit as usual ...

# Push the branch to GitHub
git push -u origin add-search-feature`,
      })}

      <p>
        On GitHub, you then open a <strong>Pull Request (PR)</strong> — a proposal to merge your
        branch into <code>main</code>, where teammates can review it before it's accepted. You'll
        live this workflow constantly.
      </p>

      ${h.callout({
        kind: "gotcha",
        body: `<p>A <strong>commit</strong> only saves locally; <strong>push</strong> sends it to
        GitHub. "I committed but my teammate can't see it" almost always means you forgot to push.
        Commit early and often; push regularly so your work is backed up.</p>`,
      })}

      ${h.callout({
        kind: "tip",
        body: `<p>Create a file named <code>.gitignore</code> listing files Git should never track —
        things like <code>node_modules/</code> (huge, re-installable) and <code>.env</code> (secrets).
        This course's repo already has one; peek at it to see the pattern.</p>`,
      })}

      <h2>You're already using it</h2>
      <p>
        This very course lives in a Git repository on GitHub. As you build the projects, you'll
        <code>commit</code> your progress and <code>push</code> it — turning Git from an abstract idea
        into a daily habit within a week.
      </p>

      ${h.exercise({
        title: "Make your first commit",
        prompt: `<p>On GitHub, create a new empty repository called <code>hello-git</code>. Clone it to
        your machine, create a file <code>README.md</code> with a sentence about yourself, then run the
        full loop: <code>add</code>, <code>commit</code>, <code>push</code>. Refresh the GitHub page and
        watch your file appear online. That round trip — local edit to live on GitHub — is the
        foundation of professional development.</p>`,
        runHint: 'git add . && git commit -m "Add README" && git push',
      })}
    </section>
  `,
});
