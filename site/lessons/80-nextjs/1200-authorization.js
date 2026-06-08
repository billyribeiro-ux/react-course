/* Lesson 80-nextjs/1200 — Authorization & protecting routes/actions. */
registerLesson({
  meta: {
    id: "80-nextjs/1200-authorization",
    title: "Authorization & Protecting Routes/Actions",
    part: "80-nextjs",
    estMinutes: 16,
    level: "advanced",
    project: "next-saas",
    lede: "Authentication tells you who the user is; authorization decides what they can do. Getting this right — and in the right place — is the difference between a secure app and a data breach.",
    objectives: [
      "Protect pages, actions, and data with auth checks",
      "Scope every query to the current user",
      "Implement role-based access control",
      "Understand defense in depth",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Authorize at the data layer (above all)</h2>
      <p>
        The most important rule: <strong>check authorization where the data is accessed</strong> — in your DAL
        (Lesson 10) and Server Actions — not only in the UI or middleware. Every query should be scoped to the
        current user, and every mutation should verify the user is allowed.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "Scoped queries + action checks",
        readOnly: true,
        code: `// DAL: queries are always scoped to the owner
export async function getProject(id: number) {
  const user = await requireUser();           // throws/redirects if not logged in
  const [p] = await db.select().from(projects)
    .where(and(eq(projects.id, id), eq(projects.ownerId, user.id)));
  return p ?? null;  // a user can NEVER fetch someone else's project
}

// Server Action: verify ownership before mutating
export async function deleteProject(id: number) {
  "use server";
  const user = await requireUser();
  const project = await getProject(id);       // already ownership-scoped
  if (!project) throw new Error("Not found or not allowed");
  await db.delete(projects).where(eq(projects.id, id));
  revalidatePath("/dashboard");
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "The #1 web vulnerability: broken access control",
        body: `<p>"Broken access control" (e.g. user A loading <code>/projects/123</code> and seeing user B's data
        because the query wasn't scoped) tops the OWASP risk list. The fix is mechanical but must be
        <em>everywhere</em>: <strong>scope every query to the authenticated user</strong> and verify ownership/role
        on every mutation. Centralizing this in the DAL is what makes it reliable — you authorize once, in the one
        place all data flows through, instead of hoping every component remembered. This single discipline
        prevents the most common and damaging class of real-world breaches.</p>`,
      })}

      <h2>Defense in depth</h2>
      <p>Layer your checks so no single miss is catastrophic:</p>
      <ul>
        <li><strong>Data layer</strong> (essential) — scope queries, verify ownership/role. The real gate.</li>
        <li><strong>Page/layout</strong> — <code>redirect("/login")</code> if unauthenticated, for good UX.</li>
        <li><strong>Middleware</strong> (Lesson 14) — a fast first check to bounce unauthenticated users early.</li>
        <li><strong>UI</strong> — hide buttons users can't use (UX only — never the security boundary).</li>
      </ul>

      ${h.callout({
        kind: "gotcha",
        title: "UI hiding is not security",
        body: `<p>Hiding a "Delete" button from non-admins improves UX but provides <strong>zero</strong> security —
        anyone can call the Server Action or API directly. The actual enforcement must be on the server (data
        layer + action). "We hid it in the UI" is a sentence that precedes many breaches. Always enforce on the
        server; treat the client as untrusted.</p>`,
      })}

      <h2>Role-based access control</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Roles",
        readOnly: true,
        code: `async function requireRole(role: "admin" | "member") {
  const user = await requireUser();
  if (user.role !== role && user.role !== "admin") {
    throw new Error("Forbidden");
  }
  return user;
}
// Use in actions/DAL for admin-only operations. For richer needs, consider
// permission-based (not just role-based) checks, or a library like CASL.`,
      })}

      ${h.exercise({
        title: "Lock down LaunchPad",
        prompt: `<p>Make LaunchPad secure: ensure every DAL function scopes queries to the current user, every
        Server Action verifies ownership before mutating, and protected pages redirect when logged out. Add a
        simple role (admin/member) and an admin-only action guarded by <code>requireRole</code>. Then try to
        access another user's resource by id and confirm you can't — defense working. Security is a feature, and
        you just built it in.</p>`,
        runHint: "pnpm --filter next-saas dev",
      })}
    </section>
  `,
});
