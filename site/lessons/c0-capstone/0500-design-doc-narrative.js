/* Lesson c0-capstone/0500 — The design doc & principal narrative. */
registerLesson({
  meta: {
    id: "c0-capstone/0500-design-doc-narrative",
    title: "The Design Doc & Your Principal Narrative",
    part: "c0-capstone",
    estMinutes: 15,
    level: "principal",
    project: null,
    lede: "Technical skill must be communicated to have impact. Write a design doc for your capstone and craft the narrative of your work — the way principal engineers document decisions and present their impact.",
    objectives: [
      "Write a clear design doc for your capstone",
      "Articulate decisions and trade-offs",
      "Build a portfolio narrative around your work",
      "Communicate impact, not just features",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Document your capstone like a principal</h2>
      <p>
        Write a <strong>design doc</strong> for your capstone (Part B0) — not after-the-fact busywork, but the artifact
        that demonstrates your thinking. It captures the <em>why</em> behind your <em>what</em>, which is what
        distinguishes a senior engineer from someone who just wrote code that works.
      </p>

      ${h.callout({
        kind: "principal",
        title: "A design doc structure",
        body: `<p>A strong design doc covers: <strong>Problem/Context</strong> (what and why), <strong>Goals &
        Non-Goals</strong> (scope — what you deliberately didn't do), <strong>Architecture</strong> (the system, with a
        diagram), <strong>Key Decisions</strong> (the important choices and <em>why</em> — Next.js vs SPA, this state tool
        vs that, this rendering strategy), <strong>Alternatives Considered</strong> (what you rejected and why — this shows
        you saw the landscape), <strong>Trade-offs</strong> (honest costs of your choices), and <strong>Risks/Future
        Work</strong>. The <em>"why"</em> and <em>"alternatives"</em> sections are where senior thinking shows — anyone
        can describe what they built; explaining the reasoning and the paths not taken is the mark of judgment.</p>`,
      })}

      <h2>Craft your narrative</h2>
      ${h.callout({
        kind: "principal",
        title: "Communicate impact, not a feature list",
        body: `<p>When you present your work — in a portfolio, a resume, an interview, a promotion packet — lead with
        <strong>impact and decisions</strong>, not a feature inventory. Not "I built a SaaS with auth and CRUD," but "I
        architected a full-stack product handling [scale/problem], chose [approach] because [reasoning], achieved
        [measurable outcome: load time, etc.], and would evolve it by [forward thinking]." Senior engineers are evaluated
        on <em>judgment and outcomes</em>, and that has to be <em>communicated</em>. The same depth of work, told as
        impact-and-reasoning vs. a feature list, lands completely differently. Practice telling the story of your work
        well — it's how your skill becomes visible and rewarded.</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Your portfolio is proof + narrative",
        body: `<p>A deployed capstone (the proof) plus a clear design doc and impact narrative (the story) is a far
        stronger portfolio than a pile of unfinished side projects. One or two <strong>substantial, deployed, well-
        documented</strong> products that you can speak about deeply — the decisions, the trade-offs, the hard problems
        you solved — beat ten shallow demos. Quality and the ability to articulate it win. Your capstones, documented
        this way, are exactly that kind of evidence.</p>`,
      })}

      ${h.exercise({
        title: "Write your design doc and narrative",
        prompt: `<p>Write a <strong>design doc</strong> for your capstone (problem, goals/non-goals, architecture +
        diagram, key decisions with reasoning, alternatives considered, trade-offs, risks/future). Then craft a
        <strong>one-paragraph impact narrative</strong> — how you'd describe this project in an interview or portfolio,
        leading with the problem, your key decisions, and outcomes. Get feedback if you can. These artifacts turn your
        technical work into demonstrated principal-level judgment.</p>`,
        runHint: "",
      })}
    </section>
  `,
});
