/* Lesson 80-nextjs/1900 — Environment, config & secrets. */
registerLesson({
  meta: {
    id: "80-nextjs/1900-env-config-secrets",
    title: "Environment, Config & Secrets",
    part: "80-nextjs",
    estMinutes: 12,
    level: "advanced",
    project: "next-saas",
    lede: "Apps need configuration that differs between development and production — database URLs, API keys, secrets. Managing these correctly (and never leaking them) is basic but critical professional hygiene.",
    objectives: [
      "Manage environment variables in Next.js",
      "Keep secrets server-only",
      "Validate env vars at startup with Zod",
      "Understand the NEXT_PUBLIC boundary",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Environment variables</h2>
      ${h.codePane({
        lang: "bash",
        title: ".env.local (NEVER commit this)",
        readOnly: true,
        code: `DATABASE_URL=postgres://user:pass@host/db
GITHUB_CLIENT_SECRET=super-secret-value
NEXT_PUBLIC_APP_URL=https://launchpad.app   # ← public (see below)`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "The NEXT_PUBLIC_ boundary is a security line",
        body: `<p>In Next.js, env vars are <strong>server-only by default</strong> — <code>process.env.DATABASE_URL</code>
        is available on the server but <em>not</em> shipped to the browser. Only variables prefixed
        <code>NEXT_PUBLIC_</code> are embedded in the client bundle (and thus visible to anyone). So:
        <strong>never</strong> prefix a secret with <code>NEXT_PUBLIC_</code> — doing so publishes it to the world.
        A leaked database URL or API secret in client JS is a serious breach, and it's an easy mistake. Public →
        <code>NEXT_PUBLIC_</code> (the site URL, a public analytics id); secret → no prefix, server-only.</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Validate your environment at startup",
        body: `<p>A missing or malformed env var causing a cryptic crash deep in production is a classic painful bug.
        The fix: <strong>validate all env vars with Zod at startup</strong>, failing fast with a clear message if
        anything's wrong. This turns "undefined is not a valid connection string" three layers deep into "❌
        DATABASE_URL is required" at boot. It also documents exactly what config your app needs. This small
        investment prevents real outages and onboarding friction.</p>`,
      })}

      ${h.codePane({
        lang: "tsx",
        title: "src/env.ts — typed, validated config",
        readOnly: true,
        code: `import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  GITHUB_CLIENT_SECRET: z.string().min(1),
  NEXT_PUBLIC_APP_URL: z.string().url(),
});

// Fails fast at startup with a clear error if anything is missing/invalid:
export const env = envSchema.parse(process.env);
// Now use env.DATABASE_URL — fully typed, guaranteed present.`,
      })}

      <h2>Config hygiene</h2>
      <ul>
        <li><strong>.gitignore your <code>.env</code> files</strong> — secrets never go in git (the course repo already ignores them).</li>
        <li><strong>Commit a <code>.env.example</code></strong> with the keys (no values) so teammates know what's needed.</li>
        <li><strong>Different values per environment</strong> — dev uses a dev database, prod uses prod, via your host's env settings (Vercel dashboard, etc.).</li>
        <li><strong>Rotate leaked secrets immediately</strong> — if a secret hits git or a log, it's compromised; revoke and reissue.</li>
      </ul>

      ${h.callout({
        kind: "principal",
        body: `<p>This is unglamorous but it's where real outages and breaches come from: a committed secret, a
        <code>NEXT_PUBLIC_</code> typo, a prod env var that was never set. Senior engineers are <em>boringly
        careful</em> here because the failure modes are severe. Good config hygiene is a quiet superpower.</p>`,
      })}

      ${h.exercise({
        title: "Lock down LaunchPad's config",
        prompt: `<p>Create a <code>src/env.ts</code> that validates LaunchPad's required env vars with Zod and
        export a typed <code>env</code> object used everywhere instead of raw <code>process.env</code>. Add a
        <code>.env.example</code>. Audit your code to ensure no secret is prefixed <code>NEXT_PUBLIC_</code> and
        no secret is referenced in a Client Component. Deliberately remove a required var and confirm the app
        fails fast with a clear message.</p>`,
        runHint: "pnpm --filter next-saas dev",
      })}
    </section>
  `,
});
