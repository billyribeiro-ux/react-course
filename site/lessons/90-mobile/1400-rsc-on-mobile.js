/* Lesson 90-mobile/1400 — RSC on mobile (Expo) overview. */
registerLesson({
  meta: {
    id: "90-mobile/1400-rsc-on-mobile",
    title: "React Server Components on Mobile",
    part: "90-mobile",
    estMinutes: 11,
    level: "principal",
    project: "expo-mobile",
    lede: "One of the most forward-looking developments in 2026: React Server Components are coming to mobile via Expo. A brief look at what this means and why the same React patterns now span server, web, and native.",
    objectives: [
      "Understand RSC in a React Native context",
      "See the convergence of web and mobile React",
      "Know the current maturity and use cases",
      "Appreciate the unified React future",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Server Components, on a phone</h2>
      <p>
        You learned Server Components for the web (Parts 50 & 80): components that render on the server and ship
        data, not JavaScript. <strong>Expo has brought RSC to React Native</strong> — letting parts of a mobile app
        render on the server too. The same mental model (server-rendered data, client islands for interactivity)
        now applies to native apps.
      </p>

      ${h.callout({
        kind: "principal",
        title: "Why RSC on mobile is compelling",
        body: `<p>The benefits translate: <strong>ship less JavaScript</strong> to the device (smaller, faster apps),
        <strong>fetch data on the server</strong> (closer to the database, secrets stay server-side), and
        <strong>update server-driven UI without an app-store release</strong> — you can change server-rendered
        screens server-side, instantly, for all users (a long-standing mobile pain point, since native updates
        normally require store review). For content-driven screens (feeds, listings, marketing), server-driven UI
        is powerful. It's an active frontier, but the direction is clear and exciting.</p>`,
      })}

      <h2>The grand convergence</h2>
      ${h.callout({
        kind: "principal",
        title: "One React, everywhere",
        body: `<p>Step back and see the picture you've built across this course: the <strong>same React</strong> —
        components, hooks, Suspense, Server Components, Actions, the Compiler — now renders on the
        <strong>server</strong> (Next.js), the <strong>web client</strong>, and <strong>native mobile</strong>
        (Expo, increasingly with RSC). The same TypeScript types, Zod schemas, TanStack Query data layer, and design
        tokens can be <em>shared</em> across all of them. A single engineer (you) or a small team can build a
        cohesive product spanning a server, a website, and iOS/Android apps, with one language, one component model,
        and shared logic. This convergence is the most significant story in the React ecosystem in 2026, and
        understanding it is genuinely principal-level perspective.</p>`,
      })}

      ${h.callout({
        kind: "note",
        title: "Maturity check",
        body: `<p>RSC on mobile is newer and evolving faster than the web equivalent — production patterns are still
        settling, and tooling is maturing. You don't need it for most apps today (standard Expo + client React +
        TanStack Query is fully capable). But knowing it exists, and the trajectory it represents, positions you
        ahead of the curve. Keep an eye on the Expo and React Native release notes; this space is moving fast.</p>`,
      })}

      ${h.exercise({
        title: "Reflect on the unified model",
        prompt: `<p>Write a short architecture note (for yourself) describing how you'd build a hypothetical product
        — say a marketplace — across server, web, and mobile, identifying what you'd <strong>share</strong> (types,
        Zod schemas, API client, design tokens, business logic) and what's <strong>platform-specific</strong>
        (navigation, native APIs, layout). This is exactly the kind of cross-platform architectural thinking expected
        at a principal level — and you now have the knowledge to do it.</p>`,
        runHint: "",
      })}
    </section>
  `,
});
