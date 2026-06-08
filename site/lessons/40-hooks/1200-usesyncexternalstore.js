/* Lesson 40-hooks/1200 — useSyncExternalStore. */
registerLesson({
  meta: {
    id: "40-hooks/1200-usesyncexternalstore",
    title: "useSyncExternalStore: Subscribing to External State",
    part: "40-hooks",
    estMinutes: 14,
    level: "advanced",
    project: "vite-hooks-lab",
    lede: "The hook that lets React safely subscribe to state living outside React — browser APIs, or third-party stores. It's how libraries like Zustand integrate, and how you read things like online status correctly.",
    objectives: [
      "Subscribe to an external store with useSyncExternalStore",
      "Read browser state (online status, media queries) safely",
      "Understand why this hook exists (tearing)",
      "See how state libraries use it under the hood",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>When state lives outside React</h2>
      <p>
        Sometimes the source of truth isn't React state — it's a browser API (<code>navigator.onLine</code>,
        a media query, the URL) or an external store (a library like Zustand or Redux). To read such state
        and re-render when it changes, you need <code>useSyncExternalStore</code>: you give it how to
        <em>subscribe</em> and how to <em>read the current value</em>, and React keeps your component in sync —
        safely, even with concurrent rendering.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "A reusable online-status hook",
        readOnly: true,
        code: `import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

export function useOnlineStatus(): boolean {
  return useSyncExternalStore(
    subscribe,                       // how to subscribe to changes
    () => navigator.onLine,          // how to read the current value (client)
    () => true                       // server snapshot (for SSR) — assume online
  );
}

// Usage:
function StatusBadge() {
  const isOnline = useOnlineStatus();
  return <span>{isOnline ? "🟢 Online" : "🔴 Offline"}</span>;
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Why not just useEffect + useState?",
        body: `<p>You <em>could</em> wire this with <code>useEffect</code> and <code>useState</code>, and for
        simple cases it mostly works. But <code>useSyncExternalStore</code> is built for it: it avoids
        <strong>tearing</strong> (where different parts of the UI briefly show different values of the same
        external state during a concurrent render), handles SSR with the server-snapshot argument, and is the
        officially correct primitive. It exists precisely because concurrent React made the naive approach
        subtly unsafe. Using the right primitive prevents rare, maddening bugs.</p>`,
      })}

      <h2>This is how state libraries integrate</h2>
      ${h.callout({
        kind: "note",
        body: `<p>You'll rarely call <code>useSyncExternalStore</code> directly in app code — but it's the
        foundation that <strong>Zustand</strong>, <strong>Redux</strong> (via react-redux), and other state
        libraries (Part 70) use to connect their external stores to React. Knowing it exists demystifies how
        those libraries "just work," and equips you to integrate any external data source (a browser API, a
        WebSocket store) correctly when you need to.</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "getSnapshot must return a stable value",
        body: `<p>The read function must return the <em>same reference</em> when nothing changed — returning a
        fresh object/array each call causes infinite re-renders. For object snapshots, cache them or select
        primitive values. This is the main footgun, and it's why libraries provide selector APIs on top.</p>`,
      })}

      ${h.exercise({
        title: "Build a useMediaQuery hook",
        prompt: `<p>Write a custom <code>useMediaQuery(query: string)</code> hook with
        <code>useSyncExternalStore</code> that returns whether a CSS media query (e.g.
        <code>"(max-width: 700px)"</code>) currently matches, updating live as the window resizes. Use it in
        your Kanban app to switch between a 3-column board and a stacked layout on narrow screens. You've
        built a genuinely reusable, correct piece of infrastructure.</p>`,
        runHint: "pnpm --filter vite-hooks-lab dev",
      })}
    </section>
  `,
});
