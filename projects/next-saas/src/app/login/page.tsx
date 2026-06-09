import { redirect } from "next/navigation";
import { signIn, listUserIds } from "@/lib/session";

// A Server Action defined inline. In a real app this is a credentials/OAuth
// flow via your auth library (Part 80/1100); here we pick a demo user.
async function loginAction(formData: FormData): Promise<void> {
  "use server";
  const userId = String(formData.get("userId") ?? "");
  const ok = await signIn(userId);
  if (ok) redirect("/dashboard");
}

export default function LoginPage() {
  return (
    <main className="container narrow">
      <h1>Sign in to LaunchPad</h1>
      <p className="muted">
        Demo sign-in (no password). Real auth uses sessions + OAuth — see Part 80.
      </p>
      <form action={loginAction} className="login">
        {listUserIds().map((id) => (
          <button key={id} name="userId" value={id} type="submit">
            Sign in as {id}
          </button>
        ))}
      </form>
    </main>
  );
}
