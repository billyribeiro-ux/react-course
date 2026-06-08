/* Lesson 80-nextjs/1100 — Authentication. */
registerLesson({
  meta: {
    id: "80-nextjs/1100-authentication",
    title: "Authentication",
    part: "80-nextjs",
    estMinutes: 18,
    level: "advanced",
    project: "next-saas",
    lede: "Authentication — knowing WHO a user is — is foundational to any SaaS. Learn the concepts (sessions, cookies, OAuth) and wire up a modern auth library so logging in 'just works' and stays secure.",
    objectives: [
      "Understand sessions, cookies, and OAuth",
      "Add auth with a modern library",
      "Read the current user on the server",
      "Handle login, logout, and protected pages",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The concepts first</h2>
      <ul>
        <li><strong>Authentication</strong> = "who are you?" (login). <strong>Authorization</strong> = "what are you allowed to do?" (next lesson).</li>
        <li><strong>Session</strong> = the server's memory that "this browser is logged in as user X," usually keyed by a secure, httpOnly <strong>cookie</strong> the browser sends with every request.</li>
        <li><strong>OAuth</strong> = "log in with Google/GitHub" — you delegate identity to a provider, so you never handle their password.</li>
        <li><strong>Credentials</strong> = email + password you store (hashed — never plaintext!).</li>
      </ul>

      ${h.callout({
        kind: "principal",
        title: "Don't roll your own auth",
        body: `<p>Authentication is security-critical and full of subtle pitfalls (password hashing, session fixation,
        CSRF, token rotation, secure cookie flags). <strong>Use a well-maintained library</strong> — in 2026,
        <strong>Better Auth</strong>, <strong>Auth.js (NextAuth)</strong>, or a managed provider (Clerk,
        WorkOS). These handle the dangerous details correctly. Writing your own auth from scratch is a classic way
        to ship a vulnerability. The senior move is leveraging battle-tested tools and understanding the model
        well enough to use them <em>correctly</em>.</p>`,
      })}

      ${h.codePane({
        lang: "tsx",
        title: "Setting up auth (Better Auth example)",
        readOnly: true,
        code: `// src/auth.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg" }),
  emailAndPassword: { enabled: true },          // credentials
  socialProviders: {
    github: { clientId: process.env.GITHUB_ID!, clientSecret: process.env.GITHUB_SECRET! },
  },
});`,
      })}

      ${h.codePane({
        lang: "tsx",
        title: "Reading the current user on the server",
        readOnly: true,
        code: `// In a Server Component, layout, or the DAL:
import { auth } from "@/auth";
import { headers } from "next/headers";

export async function getCurrentUser() {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user ?? null;
}

// Use it in a page:
const user = await getCurrentUser();
if (!user) redirect("/login");`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Sessions belong on the server",
        body: `<p>The secure pattern: the session lives server-side, identified by an <strong>httpOnly</strong>
        cookie (JavaScript can't read it, blunting XSS token theft). You read the user on the <em>server</em> (in
        layouts, pages, the DAL, actions) — never trust a client-sent "I am admin" flag. This is why Server
        Components are great for auth: the check happens where it can't be tampered with. Storing auth tokens in
        <code>localStorage</code> (readable by any script) is a common mistake; httpOnly cookies are the safer
        default.</p>`,
      })}

      <h2>Login, logout, OAuth</h2>
      ${h.callout({
        kind: "note",
        body: `<p>Modern auth libraries give you ready-made handlers and client helpers: a sign-in form posts
        credentials to the library's route handler; "Sign in with GitHub" redirects through the OAuth dance and
        back; sign-out clears the session cookie. You wire a route (e.g. <code>app/api/auth/[...all]/route.ts</code>)
        to the library and use its client functions in your login/logout UI. The library handles hashing, cookie
        flags, CSRF, and token management.</p>`,
      })}

      ${h.exercise({
        title: "Add login to LaunchPad",
        prompt: `<p>Add authentication to LaunchPad with Better Auth (or Auth.js): configure the library with the
        Drizzle adapter and the auth tables, wire its route handler, and build login/logout UI (email+password
        and/or GitHub OAuth). Implement <code>getCurrentUser()</code> reading the session on the server, and
        <code>redirect("/login")</code> from a protected page when there's no user. Confirm the session persists
        across reloads via the cookie.</p>`,
        runHint: "pnpm --filter next-saas dev",
      })}
    </section>
  `,
});
