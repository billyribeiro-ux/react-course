import "server-only";
import { cookies } from "next/headers";

// A minimal cookie-based session for the reference app — NO external service,
// so it builds and runs locally. The lessons (Part 80/1100) show swapping this
// for Better Auth / Auth.js with a real session + OAuth.

export interface User {
  id: string;
  name: string;
  email: string;
}

// A tiny fixed "user directory". Real apps store users in the database.
const USERS: Record<string, User> = {
  ada: { id: "ada", name: "Ada Lovelace", email: "ada@example.com" },
  grace: { id: "grace", name: "Grace Hopper", email: "grace@example.com" },
};

const COOKIE = "launchpad_session";

export async function getCurrentUser(): Promise<User | null> {
  const store = await cookies();
  const id = store.get(COOKIE)?.value;
  return id ? (USERS[id] ?? null) : null;
}

/** Throws if not signed in — used by the Data Access Layer to authorize. */
export async function requireUser(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");
  return user;
}

export async function signIn(userId: string): Promise<boolean> {
  if (!USERS[userId]) return false;
  const store = await cookies();
  // httpOnly so client JS can't read it (Part 80/1100 security).
  store.set(COOKIE, userId, { httpOnly: true, sameSite: "lax", path: "/" });
  return true;
}

export async function signOut(): Promise<void> {
  (await cookies()).delete(COOKIE);
}

export function listUserIds(): string[] {
  return Object.keys(USERS);
}
