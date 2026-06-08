/* Lesson 00-intro/0900 — Your mental model for learning to code. */
registerLesson({
  meta: {
    id: "00-intro/0900-learning-mindset",
    title: "Your Mental Model for Learning to Code",
    part: "00-intro",
    estMinutes: 14,
    level: "beginner",
    project: null,
    lede: "How you approach learning matters more than your starting point. Let's set the mindset and habits that turn a beginner into a principal engineer — and avoid the traps that make people quit.",
    objectives: [
      "Adopt habits that make learning to code stick",
      "Recognize and push past the normal phases of confusion",
      "Build by doing, not just by watching",
      "Set realistic expectations for the road ahead",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>You're building a skill, not absorbing facts</h2>
      <p>
        Coding is like playing an instrument or a sport: you get good by <strong>doing it</strong>,
        not by watching someone else do it. Reading this lesson is necessary but not sufficient —
        the learning happens when your fingers type the code, you hit an error, and you work through
        it. Watching a tutorial feels productive but builds far less than building the thing yourself.
      </p>

      ${h.callout({
        kind: "principal",
        title: "Active recall beats passive consumption",
        body: `<p>The strongest engineers learn by <em>retrieving</em>, not re-reading. After a lesson,
        close it and try to rebuild the idea from memory. Struggling to recall something is exactly the
        moment your brain wires it in. Comfortable re-watching, by contrast, creates an illusion of
        knowing. Embrace the productive struggle.</p>`,
      })}

      <h2>Confusion is a stage, not a verdict</h2>
      <p>Almost everyone goes through the same arc on each new topic:</p>
      <ol>
        <li><strong>"I have no idea what any of this means."</strong> (Totally normal. Day one of everything feels like this.)</li>
        <li><strong>"I can follow along if someone shows me."</strong> (Progress! But don't stop here.)</li>
        <li><strong>"I can do it myself, slowly, looking things up."</strong> (This is real competence.)</li>
        <li><strong>"I can do it fluently and explain it to others."</strong> (Mastery.)</li>
      </ol>
      <p>
        The dangerous gap is between stages 2 and 3 — where tutorials feel easy but the blank screen
        feels impossible ("tutorial hell"). The way through is to <strong>build things without a guide</strong>,
        which is exactly why every part of this course ends with projects and "your turn" exercises.
      </p>

      ${h.callout({
        kind: "tip",
        title: "The 20-minute rule",
        body: `<p>When stuck, struggle on your own for about 20 minutes first — that struggle is where
        learning happens. <em>Then</em> look up the answer. Less than that and you skip the learning;
        much more and you just get demoralized. Calibrate, but always give yourself a real attempt
        before reaching for help.</p>`,
      })}

      <h2>Habits that compound</h2>
      <ul>
        <li><strong>Consistency over cramming.</strong> 30–60 focused minutes daily beats one exhausting weekend. Skills consolidate while you sleep.</li>
        <li><strong>Type the code, don't just copy it.</strong> Even retyping an example teaches your hands and catches details your eyes skip.</li>
        <li><strong>Break things on purpose.</strong> Change a working example and predict what'll happen. Being wrong is how you build accurate intuition.</li>
        <li><strong>Build tiny projects of your own.</strong> Even silly ones. Personal motivation cements skills that exercises alone can't.</li>
        <li><strong>Keep a "things I learned / things that confused me" log.</strong> Reviewing it reveals how far you've come on the hard days.</li>
      </ul>

      ${h.callout({
        kind: "gotcha",
        title: "Comparison is the thief of momentum",
        body: `<p>You'll see people online who seem to "just get it." You're seeing their highlight reel,
        not their thousands of hours of confusion. Compare yourself only to <em>you</em> last month. The
        only person you're racing is your past self.</p>`,
      })}

      <h2>What the road actually looks like</h2>
      <p>
        This course is long because the destination — building anything you can imagine, at a
        principal-engineer level — is genuinely far from the starting line. That's not discouraging;
        it's honest. Every expert you admire walked this exact road, one confusing-then-clear concept
        at a time. There is no shortcut, but there's also no secret talent gate. Showing up
        consistently is the whole trick.
      </p>

      ${h.callout({
        kind: "principal",
        title: "From 'can I do this?' to 'how will I do this?'",
        body: `<p>Early on, every task triggers "can I even do this?" Over time that quietly changes to
        "how will I approach this?" — because you've built the confidence that you can figure
        <em>anything</em> out given time, docs, and persistence. That shift in self-talk is the real
        graduation from beginner to engineer. It's coming.</p>`,
      })}

      ${h.exercise({
        title: "Commit to the plan",
        prompt: `<p>Decide three things and write them down somewhere you'll see them:</p>
        <ol>
          <li><strong>When</strong> you'll study (a specific recurring time).</li>
          <li><strong>How long</strong> per session (even 30 minutes is plenty).</li>
          <li><strong>Why</strong> you're doing this — your real motivation, in one honest sentence.</li>
        </ol>
        <p>On hard days, that "why" is what carries you. Now click <strong>Next →</strong> — Part 10
        begins, and you write your very first real code.</p>`,
        runHint: "",
      })}
    </section>
  `,
});
