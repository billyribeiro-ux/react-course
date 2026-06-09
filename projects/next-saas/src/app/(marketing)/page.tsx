import Link from "next/link";

// A static marketing page (no dynamic data) — served fast from the CDN.
// Route groups (parentheses) organize routes without affecting the URL: this
// is still "/". (Part 80/0300.)
export default function HomePage() {
  return (
    <main className="container narrow">
      <h1>🚀 LaunchPad</h1>
      <p>
        A full-stack SaaS reference built with Next.js 16: Server Components, an
        authorized Data Access Layer, Server Actions with Zod validation, and
        cookie-based sessions.
      </p>
      <div className="cta-row">
        <Link className="cta" href="/dashboard">
          Go to dashboard →
        </Link>
        <Link className="cta secondary" href="/login">
          Sign in
        </Link>
      </div>
    </main>
  );
}
