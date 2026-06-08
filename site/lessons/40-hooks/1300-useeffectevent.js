/* Lesson 40-hooks/1300 — useEffectEvent. */
registerLesson({
  meta: {
    id: "40-hooks/1300-useeffectevent",
    title: "useEffectEvent: Separating Events from Effects",
    part: "40-hooks",
    estMinutes: 14,
    level: "advanced",
    project: "vite-hooks-lab",
    lede: "A React 19.2 hook that solves a long-standing Effect pain: reading the latest props/state inside an Effect WITHOUT making them dependencies that cause needless re-syncs. The clean fix for a classic dilemma.",
    objectives: [
      "Understand the 'reactive vs non-reactive' values problem",
      "Extract non-reactive logic with useEffectEvent",
      "Keep dependency arrays honest and minimal",
      "Recognize the right (narrow) use case",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The dilemma</h2>
      <p>
        Sometimes an Effect needs to <em>read</em> a value but shouldn't <em>re-run</em> when that value
        changes. Classic example: a chat room Effect that connects when <code>roomId</code> changes, and on
        connect shows a notification using the current <code>theme</code>. You want to re-connect on
        <code>roomId</code> change — but <strong>not</strong> on <code>theme</code> change. Yet the
        dependency rules say you must list <code>theme</code> if you read it. Conflict.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "The problem",
        readOnly: true,
        code: `function ChatRoom({ roomId, theme }: { roomId: string; theme: string }) {
  useEffect(() => {
    const conn = createConnection(roomId);
    conn.on("connected", () => showToast("Connected!", theme)); // reads theme
    conn.connect();
    return () => conn.disconnect();
  }, [roomId, theme]); // ❌ including theme re-connects on every theme change!
                       //    but OMITTING theme is a lie (stale theme). Stuck.
}`,
      })}

      <h2>The solution: <code>useEffectEvent</code></h2>
      <p>
        Wrap the non-reactive logic in an <strong>Effect Event</strong>. It always "sees" the latest props
        and state, but it is <em>not</em> reactive — so it doesn't go in the dependency array:
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "The clean fix",
        readOnly: true,
        code: `import { useEffect, useEffectEvent } from "react";

function ChatRoom({ roomId, theme }: { roomId: string; theme: string }) {
  // Effect Event: always reads the latest theme, but is NOT a dependency
  const onConnected = useEffectEvent(() => {
    showToast("Connected!", theme);
  });

  useEffect(() => {
    const conn = createConnection(roomId);
    conn.on("connected", () => onConnected());
    conn.connect();
    return () => conn.disconnect();
  }, [roomId]); // ✅ only roomId — honest AND correct. theme changes don't reconnect.
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Reactive vs non-reactive values",
        body: `<p>The deep concept: some values an Effect uses are <strong>reactive</strong> (changing them
        <em>should</em> re-run the Effect — like <code>roomId</code>), and some are <strong>non-reactive</strong>
        (you want the latest value, but changing it shouldn't re-sync — like <code>theme</code> in a
        connection notification). Before <code>useEffectEvent</code>, you had to choose between an over-firing
        Effect or a dishonest dependency array. Now you separate the two cleanly: reactive logic stays in the
        Effect; non-reactive logic moves to an Effect Event. This resolves one of the most genuinely tricky
        Effect situations.</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Use it sparingly and correctly",
        body: `<p><code>useEffectEvent</code> is a precision tool, not a way to silence the dependency linter.
        Only the genuinely non-reactive logic goes in the Effect Event. Don't call Effect Events outside of
        Effects, and don't pass them around as props. Reach for it specifically when you have a value you must
        read-latest-but-not-react-to. For most Effects you won't need it at all.</p>`,
      })}

      ${h.callout({
        kind: "note",
        body: `<p><code>useEffectEvent</code> stabilized in React 19.2. In slightly older code you may see it
        imported as <code>experimental_useEffectEvent</code>, or see people work around the same problem with
        a ref. The modern, correct tool is <code>useEffectEvent</code>.</p>`,
      })}

      ${h.exercise({
        title: "Apply it to a subscription",
        prompt: `<p>In your Kanban app, add an Effect that connects to a (simulated) live-updates source keyed
        by the current board id, and logs an analytics event on connect that includes the current user's
        theme/preferences. Use <code>useEffectEvent</code> so changing the theme doesn't reconnect, but the
        logged event always uses the latest preferences — with <code>boardId</code> as the only Effect
        dependency. Confirm <code>pnpm lint</code> is happy.</p>`,
        runHint: "pnpm --filter vite-hooks-lab lint",
      })}
    </section>
  `,
});
