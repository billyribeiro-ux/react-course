/* Lesson c0-capstone/0300 — Capstone 2: cross-platform product. */
registerLesson({
  meta: {
    id: "c0-capstone/0300-capstone-cross-platform",
    title: "Capstone 2: A Cross-Platform Product",
    part: "c0-capstone",
    estMinutes: 120,
    level: "principal",
    project: "expo-mobile",
    lede: "Extend your product to mobile, sharing code with the web app. This capstone proves the ultimate React leverage: one team, one language, shared logic, shipping to web AND native from a single codebase.",
    objectives: [
      "Build a native app sharing code with the web",
      "Architect a real cross-platform monorepo",
      "Reuse types, schemas, and logic across platforms",
      "Ship a coherent product to multiple platforms",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The brief</h2>
      <p>
        Build a mobile (Expo) companion to your Capstone 1 SaaS — or a mobile-first version of your product — that
        <strong>shares code</strong> with the web app: the same TypeScript types, the same Zod validation schemas, the
        same API client, the same business logic. Only the UI layer (navigation, screens, native features) is
        platform-specific.
      </p>

      ${h.callout({
        kind: "principal",
        title: "The architecture IS the achievement",
        body: `<p>The point of this capstone isn't just "also make a mobile app" — it's to architect a
        <strong>cross-platform system</strong> where the web and mobile apps are two thin UI layers over a
        <strong>shared core</strong> (Part B0's monorepo + shared package). When you change a validation rule, both
        platforms update and re-type together. When you add an API endpoint, both consume it through the same typed
        client. This is the structural payoff of an all-TypeScript, all-React stack — and proving you can build it is a
        genuinely senior, differentiated skill. Most engineers can't architect a real multi-platform product; you'll
        have done it.</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "What to share vs. what's platform-specific",
        body: `<p>Share: <strong>types, Zod schemas, the API client, business logic, constants, and design tokens</strong>
        (in shared packages). Keep platform-specific: <strong>navigation</strong> (Expo Router vs Next routing),
        <strong>screens/components</strong> (RN <code>View</code>/<code>Text</code> vs web DOM), <strong>native APIs</strong>
        (camera, notifications), and <strong>platform UI conventions</strong> (Part 90). The discipline of drawing this
        boundary cleanly — maximizing principled sharing without forcing the web and native UIs to be identical — is the
        core architectural skill of cross-platform development. Don't over-share (forcing one UI on both) or under-share
        (duplicating logic that drifts).</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Mind the practical constraints",
        body: `<p>Cross-platform monorepos have real friction (Part 90): React Native's Metro bundler and native-
        dependency hoisting need care in a workspace, and some web libraries don't work on native (and vice versa).
        Structure your shared packages to be <strong>platform-agnostic</strong> (pure TypeScript logic, no DOM or RN
        imports) so both sides can consume them cleanly. Test on real devices. These practical wrinkles are part of the
        learning — solving them is exactly the senior cross-platform experience.</p>`,
      })}

      ${h.exercise({
        title: "Build and ship Capstone 2",
        prompt: `<p>Build the mobile companion to your SaaS, sharing a <code>core</code> package (types, Zod schemas, API
        client, logic) with the web app in a monorepo. Implement the key flows natively (auth, the core feature, a native
        capability), with platform-appropriate navigation and UX. Produce an EAS build and install it on a real device.
        Confirm that changing a shared schema updates both apps. You will have built a real, coherent product spanning
        web and native — the ultimate demonstration of "everything React."</p>`,
        runHint: "cd projects/expo-mobile && eas build --platform android --profile preview",
      })}
    </section>
  `,
});
