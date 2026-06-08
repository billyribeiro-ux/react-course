/* Lesson 70-data-routing/0700 — Mutations & invalidation. */
registerLesson({
  meta: {
    id: "70-data-routing/0700-mutations-invalidation",
    title: "Mutations & Cache Invalidation",
    part: "70-data-routing",
    estMinutes: 16,
    level: "advanced",
    project: "data-routing-app",
    lede: "Reading data is half the story; changing it is the other half. useMutation handles creates/updates/deletes, and cache invalidation keeps your UI in sync with the server automatically.",
    objectives: [
      "Perform mutations with useMutation",
      "Invalidate queries to refetch affected data",
      "Track mutation pending/error state",
      "Keep the cache consistent after changes",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>useMutation for changes</h2>
      <p>
        Queries <em>read</em>; <strong>mutations</strong> <em>write</em> (POST/PUT/DELETE). <code>useMutation</code>
        gives you a <code>mutate</code> function plus pending/error state, and a place to react to success — most
        importantly, to <strong>invalidate</strong> stale cached data.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "A mutation that updates the cache",
        readOnly: true,
        code: `import { useMutation, useQueryClient } from "@tanstack/react-query";

function AddJobButton() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (job: NewJob) => createJob(job),  // the write request
    onSuccess: () => {
      // The jobs list is now out of date — tell Query to refetch it:
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });

  return (
    <button
      disabled={mutation.isPending}
      onClick={() => mutation.mutate({ title: "New role", company: "Acme" })}
    >
      {mutation.isPending ? "Adding…" : "Add job"}
    </button>
  );
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Invalidation is the heart of cache consistency",
        body: `<p>After you change server data, your cached copy is stale. <code>invalidateQueries</code> marks
        matching queries stale so Query refetches them — your UI updates to reflect the server automatically. This
        is why thoughtful query keys matter: <code>invalidateQueries({ queryKey: ["jobs"] })</code> refetches the
        list, and key prefixes let you invalidate broadly or narrowly. This "mutate → invalidate → auto-refetch"
        loop replaces the brittle manual "update local state and hope it matches the server" pattern. It's the
        single most important mutation skill, and it keeps client and server in sync with almost no code.</p>`,
      })}

      <h2>Reacting to mutation state</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Pending, error, success",
        readOnly: true,
        code: `const mutation = useMutation({ mutationFn: deleteJob });

mutation.isPending   // show a spinner / disable the button
mutation.isError     // show an error toast
mutation.isSuccess   // show confirmation
mutation.error       // the error object

// Trigger it (with optional per-call callbacks):
mutation.mutate(jobId, {
  onSuccess: () => toast("Deleted"),
  onError: (e) => toast.error(e.message),
});`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "mutate vs mutateAsync",
        body: `<p><code>mutate(args)</code> is fire-and-forget (handle results via callbacks). <code>mutateAsync</code>
        returns a promise you can <code>await</code> — useful inside an async flow, but you must
        <code>try/catch</code> it or unhandled rejections appear. Prefer <code>mutate</code> with callbacks for
        most UI; reach for <code>mutateAsync</code> when you genuinely need to await the result in a sequence.</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Pairs with React 19 Actions",
        body: `<p>TanStack Query mutations and React 19's Actions/<code>useActionState</code> (Part 50) solve
        overlapping problems. In a client SPA, Query's <code>useMutation</code> is the natural fit. In a
        full-stack app (Part 80), Server Actions handle mutations on the server and you often invalidate or
        revalidate from there. Knowing both lets you pick per architecture — and they compose.</p>`,
      })}

      ${h.exercise({
        title: "Add create & delete with invalidation",
        prompt: `<p>Extend the Job Board's fake API with <code>createJob</code> and <code>deleteJob</code>. Add a
        <code>useMutation</code> for each, invalidating <code>["jobs"]</code> on success so the list refetches and
        updates automatically. Wire pending/error UI (disabled buttons, error messages). Confirm that after
        adding or deleting, the list reflects the change with no manual state updates — invalidation did it.</p>`,
        runHint: "pnpm --filter data-routing-app dev",
      })}
    </section>
  `,
});
