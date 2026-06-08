/* Lesson c0-capstone/0600 — Where to go next. */
registerLesson({
  meta: {
    id: "c0-capstone/0600-where-to-go-next",
    title: "Graduation: Where to Go Next",
    part: "c0-capstone",
    estMinutes: 14,
    level: "principal",
    project: null,
    lede: "You started never having written a line of code. You can now build anything in the React ecosystem — web, full-stack, and mobile — at a principal level. Here's how to keep growing and where to point your skills.",
    objectives: [
      "Recognize how far you've come",
      "Choose specialization tracks to deepen",
      "Build habits to stay current",
      "Keep growing toward distinguished engineer",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Look how far you've come</h2>
      <p>
        Take a real moment. You began at <em>"what is a program?"</em> You now understand JavaScript and TypeScript
        deeply, all of React 19.2 and the Compiler, design systems and accessibility, routing and data architecture,
        full-stack development with Next.js, native mobile with Expo, testing at every layer, and the performance,
        architecture, security, and leadership skills of a principal engineer. You've <strong>built and deployed real
        products across web and mobile.</strong> That is an extraordinary transformation — and you did it one lesson at a
        time. Be proud.
      </p>

      ${h.callout({
        kind: "principal",
        title: "You can now build whatever you can imagine",
        body: `<p>This was the promise of the course, and it's now true: faced with a new idea or an unfamiliar problem,
        you don't ask <em>"can I build this?"</em> — you ask <em>"how will I approach this?"</em>, because you've built
        the mental models and the judgment to figure <em>anything</em> out given time, docs, and persistence. That shift
        in self-talk is the real graduation. The specific tools will keep evolving; the <strong>way of thinking</strong>
        you've developed — declarative UI, the right state in the right place, server/client boundaries, measure-then-
        optimize, design for failure, communicate clearly — is durable and transferable. That's what makes you an
        engineer, not just a React user.</p>`,
      })}

      <h2>Specialization tracks</h2>
      <p>Principal engineers are T-shaped: broad foundations plus deep expertise somewhere. Consider going deep in:</p>
      <ul>
        <li><strong>Performance engineering</strong> — Core Web Vitals, rendering internals, the React Compiler, profiling at scale.</li>
        <li><strong>Design systems / design engineering</strong> — the craft of reusable, accessible, beautiful UI at scale.</li>
        <li><strong>Full-stack / platform</strong> — databases, infrastructure, the edge, distributed systems, DX tooling.</li>
        <li><strong>Mobile</strong> — deep React Native, native modules, app performance.</li>
        <li><strong>AI-powered apps</strong> — building with LLMs, the frontier of product engineering.</li>
        <li><strong>Open source / tooling</strong> — contributing to and building the libraries everyone uses.</li>
      </ul>

      ${h.callout({
        kind: "principal",
        title: "How to stay current (without burning out)",
        body: `<p>The ecosystem evolves fast, but don't chase every new tool. <strong>Fundamentals change slowly</strong>
        (you have them); the edges shift. Stay current efficiently: follow the official blogs (react.dev, Next.js, Expo)
        and a few trusted voices, read release notes for tools you use, <strong>build things</strong> (the best learning),
        read source (Part B0), and go deep occasionally rather than skimming constantly. Evaluate new tools against real
        problems, not hype. The meta-skill — learning new things quickly because your foundations are strong — is
        precisely what this course gave you. You'll never be a beginner again.</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Keep building, keep sharing, keep mentoring",
        body: `<p>Three habits compound for a lifetime: <strong>build</strong> real things you care about (depth comes
        from shipping, not consuming), <strong>share</strong> what you learn (writing, talks, open source — teaching
        cements your own understanding and builds your reputation), and <strong>mentor</strong> others (the most senior
        thing you can do is grow the people around you — and explaining concepts makes you understand them far more
        deeply). The journey from here to <em>distinguished</em> engineer is made of these: more building, more sharing,
        more lifting others, more judgment earned through experience.</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Thank you — now go build.",
        body: `<p>You showed up, lesson after lesson, and did the work to transform yourself. The hardest part — starting,
        and persisting — is behind you, and you have the skills to build whatever comes next. The world needs people who
        can take an idea and ship it well, across every platform, with care and craft. You're one of them now. So pick an
        idea that excites you, scope it, and <strong>build it.</strong> Then build the next one. That's the whole career,
        and it's a wonderful one. Congratulations, engineer. 🎓🚀</p>`,
      })}

      ${h.exercise({
        title: "Your next move",
        prompt: `<p>Do three things: <strong>(1)</strong> Write down what you're most proud of building in this course, and
        one thing that still intimidates you (then go learn it — you can now). <strong>(2)</strong> Choose a
        specialization track to go deep on next. <strong>(3)</strong> Pick your next real project — something you'd
        genuinely use or that excites you — scope it (Lesson 1), and start building this week. The course ends here; your
        career as an engineer is just beginning. Go build something amazing.</p>`,
        runHint: "",
      })}
    </section>
  `,
});
