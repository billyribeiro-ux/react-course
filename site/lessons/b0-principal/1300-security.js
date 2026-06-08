/* Lesson b0-principal/1300 — Security. */
registerLesson({
  meta: {
    id: "b0-principal/1300-security",
    title: "Frontend & Full-Stack Security",
    part: "b0-principal",
    estMinutes: 17,
    level: "principal",
    project: "next-saas",
    lede: "A single security mistake can compromise your users and your company. Learn the threats every web engineer must defend against — XSS, CSRF, broken access control, injection — and the practices that prevent them.",
    objectives: [
      "Prevent XSS, CSRF, and injection",
      "Enforce access control correctly",
      "Harden auth, secrets, and dependencies",
      "Adopt a security-first mindset",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The threats you must know</h2>
      <ul>
        <li><strong>XSS (Cross-Site Scripting)</strong> — attacker injects scripts that run in users' browsers (stealing sessions, data).</li>
        <li><strong>Broken Access Control</strong> — users access data/actions they shouldn't (Part 80 — the #1 risk).</li>
        <li><strong>CSRF</strong> — tricking a logged-in user's browser into making unwanted requests.</li>
        <li><strong>Injection</strong> (SQL, etc.) — malicious input executed as code/queries.</li>
        <li><strong>Sensitive data exposure</strong> — leaked secrets, tokens, PII.</li>
      </ul>

      ${h.callout({
        kind: "principal",
        title: "XSS: React protects you — until you opt out",
        body: `<p>React <strong>escapes</strong> values rendered in JSX by default, so <code>{userInput}</code> can't
        inject scripts — a major built-in protection. The danger is <strong>opting out</strong>:
        <code>dangerouslySetInnerHTML</code> renders raw HTML and is an XSS hole if fed untrusted content (the
        "dangerously" is a real warning). If you must render user HTML (a rich-text field), <strong>sanitize</strong> it
        first (e.g. DOMPurify). Also avoid building URLs/scripts from user input. A <strong>Content Security Policy
        (CSP)</strong> header is defense-in-depth: it restricts what scripts can run, mitigating XSS even if something
        slips through. Knowing exactly where React's protection ends is essential.</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Access control: enforce on the server, scope every query",
        body: `<p>The biggest real-world risk (Part 80, OWASP #1): never trust the client. <strong>Every</strong> data
        access must verify the user is authenticated AND authorized, and queries must be <strong>scoped to the
        user</strong> (<code>where ownerId = currentUser</code>) — enforced in the server/DAL, not the UI. Hiding a
        button is not security; an attacker calls the action/API directly. This is worth repeating because it's the
        breach you're most likely to ship. Centralize and test authorization (Parts 80 & A0).</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Auth, secrets, and the supply chain",
        body: `<p><strong>Auth hardening</strong>: httpOnly+secure cookies (not <code>localStorage</code> tokens),
        hashed passwords, rate-limited login, secure session handling — use a vetted library (Part 80), don't roll your
        own. <strong>Secrets</strong>: server-only env vars, never <code>NEXT_PUBLIC_</code> on a secret, never in git,
        rotate if leaked (Part 80). <strong>Dependency/supply-chain risk</strong>: your app includes hundreds of
        third-party packages — run <code>npm audit</code>/Dependabot, pin versions, review what you add, and be wary of
        typosquatted or compromised packages. A vulnerability in a dependency is your vulnerability. SQL injection is
        prevented by parameterized queries (your ORM, Drizzle, does this) — never string-concatenate SQL.</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Security is a mindset, not a checklist",
        body: `<p>The principal-level shift is thinking <strong>adversarially</strong>: for every input, ask "what if
        this is malicious?"; for every endpoint, "who can call this and what could they do?"; for every piece of data,
        "should this user see it?" Validate all input (Zod, Part 70), assume the client is hostile, apply least
        privilege, and add defense in depth so no single mistake is catastrophic. Security isn't a feature you bolt on —
        it's a quality you maintain in every decision. The cost of getting it wrong (breaches, legal liability, lost
        trust) makes this non-negotiable at senior levels.</p>`,
      })}

      ${h.exercise({
        title: "Security-audit LaunchPad",
        prompt: `<p>Audit LaunchPad for the threats above: confirm no <code>dangerouslySetInnerHTML</code> with
        untrusted input (sanitize if any), verify every DAL query is user-scoped and every action authorizes, check no
        secret is client-exposed, ensure auth uses httpOnly cookies, and run <code>npm audit</code>. Add a Content
        Security Policy header. Write down the worst thing an attacker could try and confirm you're defended. Thinking
        like an attacker is the skill.</p>`,
        runHint: "pnpm --filter next-saas dev",
      })}
    </section>
  `,
});
