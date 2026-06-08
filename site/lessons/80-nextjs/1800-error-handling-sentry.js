/* Lesson 80-nextjs/1800 — Error handling, logging & Sentry. */
registerLesson({
  meta: {
    id: "80-nextjs/1800-error-handling-sentry",
    title: "Error Handling, Logging & Observability",
    part: "80-nextjs",
    estMinutes: 14,
    level: "advanced",
    project: "next-saas",
    lede: "In production, things break and you're not watching. Observability — knowing what's happening in your live app — is what lets you find and fix problems fast. Error tracking, logging, and monitoring.",
    objectives: [
      "Handle errors gracefully at every layer",
      "Track errors in production with Sentry",
      "Add structured logging",
      "Understand observability's three pillars",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Layered error handling</h2>
      <p>You've built the pieces; here's the full-stack picture:</p>
      <ul>
        <li><strong>error.tsx</strong> — catches render errors per route segment (Lesson 4).</li>
        <li><strong>try/catch in actions & handlers</strong> — return typed error results, don't crash.</li>
        <li><strong>A global error.tsx</strong> at the root + <strong>not-found.tsx</strong> for 404s.</li>
        <li><strong>Report everything</strong> — a caught error users hit silently is worse than a visible crash.</li>
      </ul>

      <h2>Error tracking with Sentry</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Sentry captures production errors",
        readOnly: true,
        code: `// Sentry's Next.js SDK auto-instruments server, client, and edge.
// In error.tsx, report what users hit:
"use client";
import * as Sentry from "@sentry/nextjs";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { Sentry.captureException(error); }, [error]);
  return <div role="alert">Something went wrong. <button onClick={reset}>Retry</button></div>;
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "You can't fix what you can't see",
        body: `<p>In production, the user who hit a bug is gone before you know it happened — unless you have
        <strong>observability</strong>. An error tracker like <strong>Sentry</strong> captures every exception with
        a stack trace, the user's browser, the request, and a replay of what they did — turning "a customer
        emailed that it's broken" into "here's the exact error, line, and reproduction." This is non-negotiable for
        a real product. The principal mindset: assume things <em>will</em> break, and invest in <em>seeing</em> it
        instantly. Shipping without error tracking is flying blind.</p>`,
      })}

      <h2>The three pillars of observability</h2>
      <ul>
        <li><strong>Logs</strong> — structured records of events (prefer JSON logs with context: user id, request id — not <code>console.log("here")</code>).</li>
        <li><strong>Metrics</strong> — numbers over time (request rate, error rate, latency, Core Web Vitals).</li>
        <li><strong>Traces</strong> — the path of a single request across services (where did the time go?).</li>
      </ul>

      ${h.callout({
        kind: "principal",
        title: "Log with context, alert on what matters",
        body: `<p>Good logging isn't more <code>console.log</code> — it's <strong>structured</strong> logs (key/value
        context you can search and filter) at the right level (info/warn/error), capturing <em>why</em> something
        happened. Pair logs and error rates with <strong>alerts</strong> so you're notified when error rates spike
        or latency degrades — <em>before</em> customers complain. And monitor <strong>Core Web Vitals</strong> from
        real users (Part B0). The goal is to detect, diagnose, and resolve issues quickly. Teams that invest in
        observability ship faster <em>and</em> sleep better, because they trust they'll catch problems.</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Never log secrets or PII carelessly",
        body: `<p>Logs are widely accessible — don't log passwords, tokens, full credit-card numbers, or
        unnecessary personal data. Redact sensitive fields. A leaked log can be as damaging as a code
        vulnerability. Observability and privacy must coexist.</p>`,
      })}

      ${h.exercise({
        title: "Add observability to LaunchPad",
        prompt: `<p>Add error tracking to LaunchPad: install the Sentry Next.js SDK (or stub it), report exceptions
        from your <code>error.tsx</code> boundaries and from <code>catch</code> blocks in your Server Actions, and
        add a root <code>not-found.tsx</code>. Replace ad-hoc <code>console.log</code>s with a small structured
        logger that includes context (user id, action). Trigger an error and confirm it's captured with a useful
        stack trace.</p>`,
        runHint: "pnpm --filter next-saas dev",
      })}
    </section>
  `,
});
