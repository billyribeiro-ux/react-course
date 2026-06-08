// This is a React Server Component — it runs on the server and ships no JS
// for itself. You build LaunchPad up from here across Part 80.
export default function HomePage() {
  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-4xl font-bold">🚀 LaunchPad</h1>
      <p className="mt-4 text-muted">
        A full-stack SaaS you build with Next.js 16: Server Components, Server
        Actions, a database with Drizzle, and authentication.
      </p>
      <a
        href="/dashboard"
        className="mt-6 inline-block rounded-md bg-brand px-4 py-2 font-semibold text-brand-fg"
      >
        Go to dashboard →
      </a>
    </main>
  );
}
