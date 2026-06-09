import { NextResponse, type NextRequest } from "next/server";

// A fast first gate (Part 80/1400): bounce unauthenticated users away from the
// app before the page renders. NOT the only check — the Data Access Layer
// still authorizes every query (defense in depth).
export function middleware(request: NextRequest) {
  const hasSession = request.cookies.has("launchpad_session");
  if (!hasSession && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
