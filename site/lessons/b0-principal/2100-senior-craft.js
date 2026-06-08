/* Lesson b0-principal/2100 — The senior craft. */
registerLesson({
  meta: {
    id: "b0-principal/2100-senior-craft",
    title: "The Senior Craft: RFCs, Reviews, Writing & Leadership",
    part: "b0-principal",
    estMinutes: 17,
    level: "principal",
    project: null,
    lede: "What truly separates a principal engineer isn't more syntax — it's judgment, communication, and the ability to make a whole team better. The human and leadership skills that define seniority.",
    objectives: [
      "Write effective RFCs and design docs",
      "Give and receive code review well",
      "Communicate and write technically with clarity",
      "Mentor, lead migrations, and multiply your team",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Seniority is judgment and impact, not syntax</h2>
      <p>
        You now have deep technical skills. But the difference between a strong senior and a principal/staff engineer is
        rarely <em>more</em> technical knowledge — it's <strong>judgment</strong> (choosing the right approach, knowing
        what not to build), <strong>communication</strong> (aligning people, writing clearly), and <strong>leverage</strong>
        (making the whole team more effective, not just shipping your own code). These are learnable skills, and they
        matter more the more senior you get.
      </p>

      ${h.callout({
        kind: "principal",
        title: "RFCs & design docs: align before building",
        body: `<p>For any significant change, senior engineers write an <strong>RFC</strong> ("Request for Comments") or
        <strong>design doc</strong> <em>before</em> coding: the problem, the proposed approach, alternatives considered,
        trade-offs, and impact. Why? It surfaces disagreement and better ideas <em>cheaply</em> (changing a doc is free;
        changing shipped code is expensive), it aligns the team, and it creates a durable record of <em>why</em> a
        decision was made. Writing a clear design doc — and running the discussion around it — is one of the highest-
        leverage things a senior engineer does. It's the system-design skill (Lesson 19) applied to real work, with
        people.</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Code review: a craft and a culture",
        body: `<p>Review is where quality and learning compound. <strong>As a reviewer</strong>: be kind and specific,
        distinguish blocking issues from nits (label them), explain the <em>why</em>, ask questions rather than issue
        decrees, and approve generously when it's good enough — perfectionism stalls teams. <strong>As an author</strong>:
        keep PRs small and focused, write a clear description (what & why), respond to feedback without ego, and thank
        reviewers. Good review culture catches bugs, spreads knowledge, and lifts everyone's standards; toxic review
        (nitpicky, harsh, gatekeeping) drives people away. Shaping a healthy review culture is leadership.</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Technical writing & communication",
        body: `<p>The most underrated senior skill: <strong>writing clearly</strong>. Docs, RFCs, PR descriptions,
        incident reports, Slack messages, and explaining a complex idea simply — your impact is bounded by your ability
        to communicate. Clear writing reflects clear thinking and scales your influence beyond what you can build alone.
        Tailor to your audience (executives need different detail than engineers), lead with the conclusion, and prefer
        simple language. (This very course is an exercise in explaining hard things clearly — notice how much that
        matters.) Invest in writing; it compounds your whole career.</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Mentoring, migrations & multiplying the team",
        body: `<p>The deepest shift at the principal level is from <strong>"how much can I build?"</strong> to
        <strong>"how much better can I make everyone around me?"</strong> That means mentoring (growing others, often
        the highest-leverage thing you do), leading large migrations and initiatives (the hard, cross-team, long-horizon
        work that needs someone to drive it patiently), setting technical direction, making pragmatic trade-offs between
        ideal and shipped, and knowing <strong>what not to build</strong> (saying no to complexity, resisting
        resume-driven development, choosing boring reliable tech where it fits). A principal engineer's value is
        measured in team and organizational outcomes, not personal output. This is the summit you've been climbing
        toward.</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Pragmatism over purity",
        body: `<p>A final, recurring theme: senior engineers are <strong>pragmatic</strong>. They know the "right" way
        and when to deviate from it for real-world constraints (deadlines, legacy code, team skills). They avoid
        over-engineering, premature abstraction, and chasing novelty for its own sake. They optimize for the team
        shipping valuable, reliable software sustainably — not for technical perfection or their own cleverness. This
        judgment, applied consistently, <em>is</em> what L7++ looks like in practice. You have the technical depth; now
        carry it with this pragmatic, people-centered judgment.</p>`,
      })}

      ${h.exercise({
        title: "Practice the senior craft",
        prompt: `<p>Do three things: <strong>(1)</strong> Write a one-page <strong>RFC</strong> for a real change you'd
        make to one of your projects (problem, approach, alternatives, trade-offs). <strong>(2)</strong> Review a PR
        (your own or a peer's) and practice giving kind, specific, prioritized feedback. <strong>(3)</strong> Write a
        clear explanation of a hard concept you learned in this course, as if mentoring a junior. These communication
        and leadership reps are what turn deep technical skill into principal-level impact.</p>`,
        runHint: "",
      })}
    </section>
  `,
});
