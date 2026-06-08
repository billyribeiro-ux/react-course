/* Lesson 00-intro/0200 — What a computer and a program actually are. */
registerLesson({
  meta: {
    id: "00-intro/0200-what-is-a-program",
    title: "What a Computer & a Program Actually Are",
    part: "00-intro",
    estMinutes: 16,
    level: "beginner",
    project: null,
    lede: "Before we write code, let's build an accurate mental model of what a computer does and what 'programming' even means. Everything else in this course rests on this foundation.",
    objectives: [
      "Explain what a computer fundamentally does in one sentence",
      "Describe what a program is and how it relates to code",
      "Understand the difference between writing code and running it",
      "Know what a programming language is and why we use them",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>A computer is a very fast, very literal instruction-follower</h2>
      <p>
        Strip away the screens and apps and a computer is one simple thing: a machine that
        <strong>follows instructions, one after another, extremely fast and absolutely literally</strong>.
        It has no common sense. It does <em>exactly</em> what it's told — which is both its
        superpower and the source of every bug you'll ever write.
      </p>
      <p>Two parts matter to us right now:</p>
      <ul>
        <li><strong>The CPU</strong> (processor) — the part that actually carries out instructions, billions per second.</li>
        <li><strong>Memory</strong> (RAM) — a giant set of labeled boxes where the computer temporarily holds the data it's working with.</li>
      </ul>

      ${h.callout({
        kind: "principal",
        title: "Why 'literal' matters for your whole career",
        body: `<p>Almost every bug comes from a gap between what you <em>meant</em> and what you
        <em>actually said</em>. The computer always did exactly what you wrote. Internalizing this
        now turns debugging from "the computer is broken" into "where did my instructions not match
        my intent?" — which is a question you can always answer.</p>`,
      })}

      <h2>A program is a recipe</h2>
      <p>
        A <strong>program</strong> is just a list of instructions that accomplishes a goal — exactly
        like a recipe. A recipe says "chop the onions, heat the oil, add the onions." A program says
        "get the user's name, build a greeting, show it on screen." Same idea: ordered steps that
        transform some input into some output.
      </p>
      <p>Here's a recipe written in plain English first, so the structure is obvious:</p>

      ${h.codePane({
        lang: "markdown",
        title: "greeting.recipe (plain English)",
        readOnly: true,
        code: `1. Ask the person for their name.
2. Store that name.
3. Build the sentence: "Hello, " + the name + "!"
4. Show the sentence on the screen.`,
      })}

      <p>And here is the <em>same recipe</em> as real JavaScript. You don't need to understand the
      symbols yet — just notice that the steps line up one-to-one with the English version:</p>

      ${h.codePane({
        lang: "js",
        title: "greeting.js",
        readOnly: true,
        code: `const name = prompt("What's your name?"); // 1 & 2: ask, and store it
const sentence = "Hello, " + name + "!";          // 3: build the sentence
alert(sentence);                                  // 4: show it on screen`,
      })}

      ${h.callout({
        kind: "note",
        body: `<p><strong>Code</strong> is the text you write. A <strong>program</strong> is what
        that code becomes when it runs. People use the words loosely, but the distinction is real:
        code sits still in a file; a program is code <em>in motion</em>.</p>`,
      })}

      <h2>Writing code vs. running code</h2>
      <p>There are two completely separate moments, and beginners often blur them:</p>
      <ol>
        <li><strong>Writing</strong> — you type instructions into a file. Nothing happens yet. The
        file is just text, like a document.</li>
        <li><strong>Running</strong> (or "executing") — you hand that file to a program that reads
        your instructions and actually performs them. <em>Now</em> things happen.</li>
      </ol>
      <p>
        For us, the thing that runs JavaScript is usually the <strong>web browser</strong> (Chrome,
        Firefox, Safari) or a tool called <strong>Node.js</strong>. Both contain a "JavaScript
        engine" — a program whose entire job is to read JavaScript and carry out its instructions.
      </p>

      ${h.callout({
        kind: "gotcha",
        body: `<p>A super common early confusion: "I changed my code but nothing changed!" Usually
        the code was saved but never <strong>re-run</strong>. Editing the recipe doesn't re-cook the
        meal — you have to run it again. Modern tools often re-run automatically when you save, which
        we'll set up later.</p>`,
      })}

      <h2>Why a programming language?</h2>
      <p>
        Deep down, CPUs only understand <strong>machine code</strong> — raw numbers. Writing that by
        hand would be agony. So we invented <strong>programming languages</strong>: human-readable
        ways to express instructions that get <em>translated</em> into machine code for us.
      </p>
      <p>
        <strong>JavaScript</strong> — the language this course is built on — is the language of the
        web. Every browser on Earth can run it, which is exactly why it's the perfect place to start
        and the foundation for React.
      </p>

      ${h.callout({
        kind: "tip",
        body: `<p>You will <strong>not</strong> memorize a language the way you'd memorize vocabulary
        for a test. You learn it the way you learn a spoken language: by using it constantly, looking
        things up without shame, and slowly building intuition. Nobody has it all in their head — not
        even principal engineers.</p>`,
      })}

      ${h.exercise({
        title: "Think like a computer",
        prompt: `<p>Write a "recipe" in plain English (just in your head or on paper) for an everyday
        task — making tea, brushing your teeth, logging into an app. Then play computer: follow it
        <em>literally</em>, doing nothing that isn't written down. Notice every step you assumed but
        didn't write. That gap between intent and instruction is the entire craft of programming.</p>`,
        runHint: "",
      })}
    </section>
  `,
});
