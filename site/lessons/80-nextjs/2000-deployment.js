/* Lesson 80-nextjs/2000 — Deployment. */
registerLesson({
  meta: {
    id: "80-nextjs/2000-deployment",
    title: "Deployment to Production",
    part: "80-nextjs",
    estMinutes: 14,
    level: "advanced",
    project: "next-saas",
    lede: "Code that only runs on your laptop helps no one. Deployment puts your app on the internet. Learn to ship a Next.js app to production with preview deploys, environment config, and a real CI flow.",
    objectives: [
      "Deploy a Next.js app to a host",
      "Configure production environment variables",
      "Use preview deployments per pull request",
      "Understand the deploy/CI pipeline",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Deploying Next.js</h2>
      <p>
        <strong>Vercel</strong> (the company behind Next.js) offers the most seamless path — connect your GitHub
        repo and every push deploys. But Next runs anywhere: <strong>Netlify</strong>, <strong>Cloudflare</strong>,
        a <strong>Docker</strong> container on any cloud, or a Node server. The deploy needs to build your app
        (<code>next build</code>) and run it, with your production env vars set.
      </p>

      ${h.codePane({
        lang: "bash",
        title: "The deploy flow (Vercel example)",
        readOnly: true,
        code: `# 1. Push your repo to GitHub.
# 2. Import it in Vercel; it auto-detects Next.js.
# 3. Set production env vars (DATABASE_URL, secrets) in the dashboard.
# 4. Every push to main → production deploy.
#    Every pull request → an isolated PREVIEW deploy with its own URL.

# Or self-host with Docker:
#   next build && next start   (behind a reverse proxy, with a Node runtime)`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Preview deployments change how teams work",
        body: `<p>A <strong>preview deployment</strong> — a live, isolated URL for every pull request — is
        transformational: reviewers and designers click a link and use the actual feature instead of imagining it
        from a diff or pulling the branch locally. Bugs are caught before merge; stakeholders give feedback on real
        UI. This tight feedback loop is one of the biggest productivity wins in modern web development. Whatever
        host you use, aim for per-PR previews — it's a hallmark of a mature engineering workflow.</p>`,
      })}

      <h2>The production checklist</h2>
      <ul>
        <li><strong>Env vars set</strong> in the host (prod database, secrets) — and validated (Lesson 19).</li>
        <li><strong>Database migrated</strong> — run migrations as part of deploy, against the prod DB.</li>
        <li><strong>Build passes</strong> — <code>next build</code> type-checks and lints; CI should gate merges on it (Part A0).</li>
        <li><strong>Error tracking live</strong> (Sentry) and <strong>monitoring</strong> on.</li>
        <li><strong>Custom domain + HTTPS</strong> configured.</li>
        <li><strong>Secrets rotated</strong> and not in git.</li>
      </ul>

      ${h.callout({
        kind: "principal",
        title: "CI/CD: automate the path to production",
        body: `<p>The professional flow: push → <strong>CI</strong> runs (typecheck, lint, tests, build) → on green,
        <strong>CD</strong> deploys (preview for PRs, production for main). Automating this means humans never
        manually build-and-upload, deploys are consistent and repeatable, and broken code can't reach production
        because the pipeline blocks it. We build out CI pipelines properly in Part B0, but the principle starts
        here: <strong>the path from commit to production should be automated, fast, and safe.</strong> Manual
        deploys are error-prone and don't scale.</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Dev works ≠ prod works",
        body: `<p>Production differs from <code>next dev</code>: it's a real build (stricter), uses prod env vars and
        the prod database, runs minified, and behaves differently around caching and dynamic rendering. Always test
        a production build locally (<code>next build && next start</code>) before deploying, and use a staging/
        preview environment. "It worked on my machine" is the classic trap — close the gap with realistic
        pre-prod testing.</p>`,
      })}

      ${h.exercise({
        title: "Ship LaunchPad to the internet",
        prompt: `<p>Deploy LaunchPad: push the repo to GitHub, deploy via Vercel (or your host of choice), set the
        production env vars (a hosted Postgres URL, auth secrets), and run your database migrations against prod.
        Open a pull request and use its preview deployment. Verify the live app: sign up, create a project, confirm
        auth and data persistence work in production. You've shipped a real full-stack SaaS. 🚀</p>`,
        runHint: "pnpm --filter next-saas build && pnpm --filter next-saas start",
      })}
    </section>
  `,
});
