/* Lesson 90-mobile/1000 — Local storage & offline. */
registerLesson({
  meta: {
    id: "90-mobile/1000-storage-offline",
    title: "Local Storage & Offline Support",
    part: "90-mobile",
    estMinutes: 14,
    level: "advanced",
    project: "expo-mobile",
    lede: "Mobile apps must work with intermittent connectivity and persist data on the device. Learn the storage options — from simple key/value to encrypted secrets to a local SQLite database — and offline strategy.",
    objectives: [
      "Store data with AsyncStorage and SecureStore",
      "Use SQLite for structured local data",
      "Persist the Query cache for offline use",
      "Design an offline-capable app",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The storage options</h2>
      <ul>
        <li><strong>AsyncStorage</strong> — simple async key/value (like web <code>localStorage</code>). For non-sensitive prefs, flags, small data.</li>
        <li><strong>expo-secure-store</strong> — <em>encrypted</em> key/value backed by the device keychain. For <strong>secrets</strong>: auth tokens, sensitive data.</li>
        <li><strong>expo-sqlite</strong> — a real on-device SQL database. For structured data, offline-first apps, large datasets.</li>
        <li><strong>MMKV</strong> (third-party) — extremely fast key/value, popular for performance-sensitive storage.</li>
      </ul>

      ${h.codePane({
        lang: "tsx",
        title: "SecureStore for auth tokens",
        readOnly: true,
        code: `import * as SecureStore from "expo-secure-store";

// Store a token securely (encrypted, in the OS keychain):
await SecureStore.setItemAsync("session", token);
const token = await SecureStore.getItemAsync("session");
await SecureStore.deleteItemAsync("session"); // on logout`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Use the right store for the data's sensitivity",
        body: `<p>This mirrors the web lesson (Part 10) but the stakes are higher on a device that can be lost or
        stolen. <strong>Never put secrets in AsyncStorage</strong> — it's unencrypted, readable by anyone with
        device access or certain exploits. Auth tokens and sensitive data go in <strong>SecureStore</strong>
        (hardware-backed encryption). Plain preferences can use AsyncStorage. Structured/large data belongs in
        SQLite. Choosing the appropriate storage by sensitivity and shape is a security-and-architecture decision
        a principal engineer makes deliberately.</p>`,
      })}

      <h2>Offline-first with a local database</h2>
      ${h.callout({
        kind: "principal",
        title: "The offline-first mindset",
        body: `<p>The most resilient mobile apps treat the <em>local</em> store as the source of truth for the UI:
        reads come from local data (instant, works offline), writes go to local storage immediately (optimistic),
        and a background sync reconciles with the server when connectivity returns. This "offline-first" architecture
        — often built on SQLite or a sync engine — is why great apps (notes, email, messaging) feel instant and
        never block on the network. It's more work than naive online-only fetching, but for apps where reliability
        matters, it's the gold standard. Even a lighter version — persisting the TanStack Query cache — gets you
        most of the perceived benefit.</p>`,
      })}

      ${h.codePane({
        lang: "tsx",
        title: "Persisting the Query cache for offline",
        readOnly: true,
        code: `// TanStack Query has a persistence layer: save the cache to AsyncStorage
// so the app shows last-known data instantly on launch, even offline.
import { persistQueryClient } from "@tanstack/react-query-persist-client";
// On launch, the cache is restored; queries refetch when back online.
// A pragmatic middle ground between "online only" and full offline-first.`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Handle conflicts in sync",
        body: `<p>Offline writes that sync later can <strong>conflict</strong> (you edited a record offline; so did
        someone else). Real offline-first apps need a conflict-resolution strategy (last-write-wins, merge, or
        CRDTs for advanced cases). Don't underestimate this — "sync is easy" is a famous trap. For most apps, start
        simple (persist the cache, queue mutations) and add sophistication only as needed.</p>`,
      })}

      ${h.exercise({
        title: "Add persistence and offline support",
        prompt: `<p>In LaunchPad Mobile: store the auth token in <code>SecureStore</code> (never AsyncStorage), and
        persist user preferences (theme) in AsyncStorage. Then persist the TanStack Query cache so the projects
        list shows instantly on launch and works in airplane mode (showing last-known data with an offline
        indicator). Test by killing the network and relaunching the app.</p>`,
        runHint: "cd projects/expo-mobile && npx expo start",
      })}
    </section>
  `,
});
