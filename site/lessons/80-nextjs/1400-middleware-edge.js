/* Lesson 80-nextjs/1400 — Middleware, edge, headers & cookies. */
registerLesson({
  meta: {
    id: "80-nextjs/1400-middleware-edge",
    title: "Middleware, Headers & Cookies",
    part: "80-nextjs",
    estMinutes: 14,
    level: "advanced",
    project: "next-saas",
    lede: "Middleware runs before a request reaches your routes — perfect for fast auth redirects, redirects, and request rewriting. Plus how to read and write cookies and headers in the App Router.",
    objectives: [
      "Run logic before requests with middleware",
      "Use middleware for auth redirects and rewrites",
      "Read/write cookies and headers correctly",
      "Know middleware's limits",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Middleware: code before the route</h2>
      <p>
        A <code>middleware.ts</code> at your project root runs on <em>every</em> matching request before it hits
        a page or handler. Use it for cross-cutting concerns: a fast first auth check, redirects, locale/geo
        rewrites, or setting headers.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "middleware.ts — auth gate",
        readOnly: true,
        code: `import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get("session");

  // Bounce unauthenticated users away from the app early:
  if (!sessionCookie && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

// Only run on these paths (keep it lean):
export const config = {
  matcher: ["/dashboard/:path*", "/settings/:path*"],
};`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Middleware is a first gate, not the only gate",
        body: `<p>Middleware is great for a <strong>fast, coarse</strong> check — redirecting logged-out users
        before they load a protected page (better UX than rendering then redirecting). But it should
        <strong>not be your only authorization</strong>: it can only do lightweight checks (it typically just
        verifies a cookie exists, not full session validity, and can't query your database safely in all
        runtimes). Real enforcement still happens at the data layer (Lesson 12). Think of middleware as the
        bouncer at the door and the DAL as the lock on every individual safe — you want both. Over-relying on
        middleware for security is a common mistake.</p>`,
      })}

      <h2>Cookies and headers in the App Router</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Reading/writing cookies & headers",
        readOnly: true,
        code: `import { cookies, headers } from "next/headers";

// In Server Components / Actions / Route Handlers (async in Next 16):
const cookieStore = await cookies();
const theme = cookieStore.get("theme")?.value;

// Set a cookie (in an Action or Route Handler):
cookieStore.set("theme", "dark", { httpOnly: true, secure: true, path: "/" });

// Read headers:
const userAgent = (await headers()).get("user-agent");`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Reading cookies/headers makes a route dynamic",
        body: `<p>Accessing <code>cookies()</code> or <code>headers()</code> means the route depends on the request,
        so Next renders it <strong>dynamically</strong> (not statically at build). That's expected for
        personalized pages, but be aware: a stray <code>cookies()</code> call can accidentally opt a page out of
        static optimization. Set <code>httpOnly</code> and <code>secure</code> on sensitive cookies, and remember
        these are async in Next 16.</p>`,
      })}

      ${h.callout({
        kind: "note",
        title: "Edge vs Node runtime",
        body: `<p>Middleware runs on a lightweight <strong>edge runtime</strong> (fast, globally distributed, but
        limited APIs — no native Node modules). Route handlers and pages can run on edge or the full Node runtime.
        For most logic, the Node runtime is fine; edge shines for ultra-low-latency, simple operations (geo
        redirects, header tweaks). Know the distinction so you don't try to use a Node-only library in an edge
        context.</p>`,
      })}

      ${h.exercise({
        title: "Add a middleware gate",
        prompt: `<p>Add <code>middleware.ts</code> to LaunchPad that redirects unauthenticated requests for
        <code>/dashboard/*</code> and <code>/settings/*</code> to <code>/login</code>, matched via
        <code>config.matcher</code>. Confirm it bounces you instantly when logged out — but also verify your DAL
        still enforces access (defense in depth): even if middleware were bypassed, the data stays protected.</p>`,
        runHint: "pnpm --filter next-saas dev",
      })}
    </section>
  `,
});
