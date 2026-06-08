/* Lesson 90-mobile/1700 — Project: ship LaunchPad Mobile. */
registerLesson({
  meta: {
    id: "90-mobile/1700-project-launchpad-mobile",
    title: "Project: Ship LaunchPad Mobile",
    part: "90-mobile",
    estMinutes: 90,
    level: "advanced",
    project: "expo-mobile",
    lede: "Bring Part 90 together into a complete, polished mobile app that shares code with your web product: auth, navigation, native data, gestures, offline support — and a real build you can install on a phone.",
    objectives: [
      "Build a complete, multi-screen native app",
      "Share types, schemas, and logic with the web app",
      "Use native capabilities and smooth animations",
      "Produce an installable build",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>What you're shipping</h2>
      <p>
        <strong>LaunchPad Mobile</strong>: the native companion to your Part 80 SaaS. Users log in (same backend),
        browse and manage their projects on the go, with native navigation, gesture interactions, offline support,
        and at least one device capability — built on shared types and data logic with the web app.
      </p>

      ${h.callout({
        kind: "principal",
        title: "The payoff: build once, ship everywhere",
        body: `<p>This project proves the thesis of the whole React ecosystem: the <strong>same engineer</strong> who
        built the web SaaS can build its native app, <strong>reusing</strong> the TypeScript types, Zod validation
        schemas, API client, and design tokens — only the UI layer (navigation, screens, native APIs) is
        mobile-specific. A small team can now deliver a coherent product across server, web, and mobile. That
        leverage — one language, one component model, shared logic — is genuinely transformative for what an
        individual can ship. You're demonstrating it.</p>`,
      })}

      <h2>The build checklist</h2>
      <ul>
        <li><strong>Auth</strong> — login against your Part 80 backend; token in SecureStore; protected screens.</li>
        <li><strong>Navigation</strong> — tabs + stack + a modal create flow, platform-correct.</li>
        <li><strong>Data</strong> — TanStack Query against your API, with the <em>same Zod schemas</em> as web; pull-to-refresh; offline cache persistence.</li>
        <li><strong>Lists</strong> — FlashList for the projects feed, with empty/loading/error states.</li>
        <li><strong>Forms</strong> — create/edit projects with React Hook Form + Zod + keyboard handling.</li>
        <li><strong>Native feature</strong> — at least one: image picker for avatars, push notifications, or biometrics.</li>
        <li><strong>Polish</strong> — a gesture interaction (Reanimated), platform adaptation, accessibility, tasteful motion.</li>
        <li><strong>Ship</strong> — an EAS preview/development build installed on a real device.</li>
      </ul>

      ${h.callout({
        kind: "principal",
        title: "Set up real code sharing",
        body: `<p>The highest-value architecture choice: put your shared types, Zod schemas, and API client in a
        <strong>shared package</strong> (like the course's <code>shared-ui</code> and a <code>shared-core</code>)
        consumed by both the Next.js app and the Expo app. When you change a schema, both platforms update and
        re-type together — no drift between web and mobile. (Expo's standalone install needs care here; you can
        publish the shared package or use a tool like Turborepo, Part B0.) This is the structural decision that makes
        a multi-platform product maintainable.</p>`,
      })}

      ${h.exercise({
        title: "Build, polish, and install LaunchPad Mobile",
        prompt: `<p>Complete LaunchPad Mobile to the checklist above, sharing schemas/types with your web app. Add
        <strong>one signature mobile feature</strong> — push notifications for project updates, offline-first
        editing, biometric unlock, or a delightful gesture interaction. Test thoroughly on both iOS and Android.
        Produce an EAS build and install it on your own phone. Commit your work.</p>`,
        runHint: "cd projects/expo-mobile && eas build --platform android --profile preview",
      })}

      ${h.callout({
        kind: "principal",
        title: "You ship to every platform now",
        body: `<p>Take this in: you've built a website, a full-stack server-rendered SaaS, and a native mobile app —
        all with React, sharing code across them. Very few engineers can do this whole span; you can. Part 90
        completes the "everything React" surface area. The final stretch — Part A0 (testing) and Part B0 (principal
        architecture, performance, leadership) — is about making everything you build <em>rock-solid and scalable</em>,
        and operating at a true staff/principal level. Then the capstones. You're nearly there. 📱→🏛️</p>`,
      })}
    </section>
  `,
});
