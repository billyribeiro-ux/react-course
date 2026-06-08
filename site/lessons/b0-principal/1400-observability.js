/* Lesson b0-principal/1400 — Observability. */
registerLesson({
  meta: {
    id: "b0-principal/1400-observability",
    title: "Observability: Logs, Traces, Metrics & Analytics",
    part: "b0-principal",
    estMinutes: 13,
    level: "principal",
    project: "next-saas",
    lede: "Once your app is live, you need to know what's happening inside it: errors, performance, and user behavior. Observability turns 'users say it's broken' into 'here's exactly what's wrong and who it affects.'",
    objectives: [
      "Instrument errors, logs, traces, and metrics",
      "Monitor real-user performance (RUM)",
      "Add product analytics responsibly",
      "Build a feedback loop from production",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The pillars, expanded</h2>
      <p>
        Building on Part 80: observability is your senses into production. <strong>Error tracking</strong> (Sentry)
        captures exceptions with context and replays. <strong>Logs</strong> (structured) record events.
        <strong>Traces</strong> follow a request across services to find where time goes. <strong>Metrics</strong>
        (error rate, latency, throughput, Core Web Vitals) show trends. <strong>RUM</strong> measures real users'
        performance. <strong>Product analytics</strong> shows what users actually do.
      </p>

      ${h.callout({
        kind: "principal",
        title: "Close the loop: detect → diagnose → fix → verify",
        body: `<p>The goal of observability is a tight feedback loop from production: <strong>detect</strong> issues fast
        (alerts on error-rate spikes or latency regressions — before customers complain), <strong>diagnose</strong>
        quickly (rich error context, traces, logs pinpoint the cause), <strong>fix</strong>, and <strong>verify</strong>
        the fix worked in production (the metric recovers). Without instrumentation, you're blind — you find out about
        problems from angry users, days late, with no way to reproduce. With it, you operate proactively. This loop is
        what "running software in production" actually means, and owning it is core to senior engineering.</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Alert on symptoms, not noise",
        body: `<p>Good alerting is an art: alert on <strong>user-facing symptoms</strong> (error rate up, checkout
        failing, latency degraded) at thresholds that mean real impact — not on every log line. Too many alerts cause
        <strong>alert fatigue</strong> (people ignore them, including the real one); too few mean you miss incidents.
        Define SLOs (service level objectives — "99.9% of requests succeed") and alert when you're burning the error
        budget. Tuning signal vs noise so the team trusts and acts on alerts is a meaningful operational skill.</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Analytics: measure to learn, ethically",
        body: `<p>Product analytics (events: "user created a project," funnels, retention) tells you what's actually
        used and where users drop off — informing what to build. But instrument <strong>responsibly</strong>: respect
        privacy (consent, GDPR/CCPA), don't capture PII or secrets in events or logs, and minimize data collection to
        what you'll genuinely use. The principal balance: gather enough insight to make good product decisions while
        honoring user privacy and regulations. Data without ethics is a liability; ethics without data is guesswork.</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Don't log sensitive data",
        body: `<p>Repeating from Part 80 because it's critical: never log passwords, tokens, full card numbers, or
        unnecessary PII — logs and analytics are widely accessible and a leak there is as bad as a code vulnerability.
        Redact sensitive fields. Observability and privacy must coexist.</p>`,
      })}

      ${h.exercise({
        title: "Instrument LaunchPad",
        prompt: `<p>Add observability to LaunchPad: Sentry for errors (with source maps so stack traces are readable),
        the <code>web-vitals</code> library for RUM, structured logging with context, and a few product-analytics events
        for key actions (sign up, create project) — with privacy in mind (no PII). Set up one meaningful alert (error-
        rate spike). Then trigger an error and trace it from alert → Sentry → fix. You've built a production feedback
        loop.</p>`,
        runHint: "pnpm --filter next-saas dev",
      })}
    </section>
  `,
});
