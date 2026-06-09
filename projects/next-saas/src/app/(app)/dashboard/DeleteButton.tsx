"use client";

import { useTransition } from "react";
import { deleteProjectAction } from "./actions";

// A Server Action called from a client event handler, via a transition so the
// pending state is tracked (Part 80/0600).
export function DeleteButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      className="delete"
      disabled={pending}
      onClick={() => startTransition(() => deleteProjectAction(id))}
    >
      {pending ? "…" : "✕"}
    </button>
  );
}
