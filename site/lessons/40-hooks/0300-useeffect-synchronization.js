/* Lesson 40-hooks/0300 — useEffect: synchronization, not lifecycles. */
registerLesson({
  meta: {
    id: "40-hooks/0300-useeffect-synchronization",
    title: "useEffect: Synchronization, Not Lifecycles",
    part: "40-hooks",
    estMinutes: 18,
    level: "intermediate",
    project: "vite-hooks-lab",
    lede: "useEffect is the most misunderstood hook. The fix is a mental reframe: an Effect synchronizes your component with an external system. Get this framing and Effects stop being scary.",
    objectives: [
      "Understand Effects as synchronization with external systems",
      "Write an Effect with the correct dependencies",
      "Recognize what is and isn't an external system",
      "Avoid thinking in terms of 'lifecycle methods'",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The reframe</h2>
      <p>
        Old tutorials describe <code>useEffect</code> as "run code on mount/update/unmount" — lifecycle
        thinking inherited from class components. That framing leads people astray. The modern, accurate
        framing from the React team: <strong>an Effect lets you synchronize a component with an external
        system</strong>.
      </p>
      <p>External systems are things <em>outside</em> React: the browser DOM/APIs, a network connection, a
      timer, a third-party widget, a subscription. If you're not syncing with something external, you
      probably don't need an Effect at all (Lesson 5).</p>

      ${h.codePane({
        lang: "tsx",
        title: "Synchronizing with an external system",
        readOnly: true,
        code: `import { useEffect, useState } from "react";

function ChatRoom({ roomId }: { roomId: string }) {
  useEffect(() => {
    // Sync: open a connection to the external chat server
    const connection = createConnection(roomId);
    connection.connect();

    // Cleanup: disconnect when leaving or before re-syncing
    return () => connection.disconnect();
  }, [roomId]); // re-sync whenever roomId changes
}`,
      })}

      <h2>The three parts of an Effect</h2>
      <ol>
        <li><strong>The setup function</strong> — starts syncing (connect, subscribe, start a timer).</li>
        <li><strong>The cleanup function</strong> (returned) — stops syncing (disconnect, unsubscribe, clear the timer).</li>
        <li><strong>The dependency array</strong> — the reactive values the Effect uses. React re-runs the Effect (cleanup then setup) when any of them change.</li>
      </ol>

      ${h.callout({
        kind: "principal",
        title: "Think in 'sync', not 'when'",
        body: `<p>Instead of asking "<em>when</em> should this run?", ask "<em>what is this keeping in
        sync, and what does it depend on?</em>" The dependency array then writes itself: list every reactive
        value the Effect reads. React's job is to keep the external system matching your current state by
        running setup/cleanup as those dependencies change. This framing eliminates the guesswork that makes
        Effects feel unpredictable.</p>`,
      })}

      <h2>Effects run after render (and paint)</h2>
      ${h.codePane({
        lang: "tsx",
        title: "A document-title sync",
        readOnly: true,
        code: `function Page({ title }: { title: string }) {
  // The document title is an external system (the browser tab).
  useEffect(() => {
    document.title = title;            // sync the tab title to our prop
  }, [title]);                         // re-sync whenever title changes

  return <h1>{title}</h1>;
}`,
      })}

      ${h.callout({
        kind: "note",
        title: "Effects fire twice in development",
        body: `<p>In <code>&lt;StrictMode&gt;</code>, React intentionally runs each Effect setup→cleanup→setup
        on mount in development, to surface Effects that don't clean up properly. If your Effect breaks when
        run twice, it has a real bug (usually a missing cleanup). This is a feature; don't disable
        StrictMode to "fix" it — fix the Effect.</p>`,
      })}

      <h2>A correct timer Effect</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Setup + cleanup",
        readOnly: true,
        code: `function Clock() {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000); // setup
    return () => clearInterval(id);                          // cleanup
  }, []); // no reactive deps → sync once, clean up on unmount

  return <p>{time.toLocaleTimeString()}</p>;
}`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Always clean up subscriptions & timers",
        body: `<p>Every Effect that starts something ongoing (a timer, listener, connection) must return a
        cleanup that stops it. Forgetting cleanup causes memory leaks, duplicate listeners, and "setState on
        unmounted component" issues. If your Effect's setup has a clear "undo," put that undo in the
        cleanup.</p>`,
      })}

      ${h.exercise({
        title: "Sync the document title",
        prompt: `<p>In your Kanban app, add an Effect that syncs the browser tab title to show the number of
        tasks in progress, e.g. <code>"Kanban (3 in progress)"</code>, updating whenever that count changes.
        Then add a <code>localStorage</code>-persistence Effect that saves the board whenever tasks change.
        Verify in DevTools that the title updates and the board survives a reload.</p>`,
        runHint: "pnpm --filter vite-hooks-lab dev",
      })}
    </section>
  `,
});
