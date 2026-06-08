/* Lesson 90-mobile/1300 — Expo UI & platform differences. */
registerLesson({
  meta: {
    id: "90-mobile/1300-expo-ui-platform",
    title: "Expo UI & Platform Differences",
    part: "90-mobile",
    estMinutes: 12,
    level: "advanced",
    project: "expo-mobile",
    lede: "iOS and Android have different design languages, behaviors, and native components. Learn to write code that adapts per platform — and about Expo UI, which renders true native SwiftUI/Compose components.",
    objectives: [
      "Write platform-adaptive code",
      "Use native-feeling components per platform",
      "Understand Expo UI (SwiftUI/Compose)",
      "Decide between cross-platform and native components",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>iOS and Android are different</h2>
      <p>
        They have different navigation patterns, typography, spacing conventions, default behaviors (the Android
        hardware back button), and native UI elements (date pickers, switches, action sheets look different). A
        great app respects each platform's conventions rather than forcing one look on both.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "Platform-adaptive code",
        readOnly: true,
        code: `import { Platform } from "react-native";

// Branch on platform:
const styles = {
  shadow: Platform.select({
    ios: { shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 8 },
    android: { elevation: 4 },          // Android uses elevation, not shadow*
  }),
};

// Platform-specific files: Button.ios.tsx and Button.android.tsx are
// auto-selected by the bundler when you import "./Button".`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Adapt, don't homogenize",
        body: `<p>The temptation is to make the app look <em>identical</em> on both platforms. Resist it where it
        matters: an iOS user expects iOS-style controls and gestures; an Android user expects material patterns and
        the back button. Using platform-appropriate components and behaviors makes the app feel <em>native</em> on
        each — a quality users feel even if they can't articulate it. Your brand can be consistent (colors,
        identity) while the interaction patterns respect each platform. Knowing <em>which</em> things to keep
        consistent vs adapt is a senior design-engineering judgment.</p>`,
      })}

      <h2>Expo UI: true native components</h2>
      ${h.callout({
        kind: "principal",
        title: "SwiftUI & Jetpack Compose from React",
        body: `<p>A major 2026 development: <strong>Expo UI</strong> (stable in SDK 56) lets you render <em>actual</em>
        SwiftUI (iOS) and Jetpack Compose (Android) components from React. Instead of React Native re-implementing a
        switch or picker, you get the <strong>real OS-native component</strong> — perfectly matching the platform's
        look, behavior, accessibility, and future OS updates. This narrows the gap between React Native and fully
        native apps even further. For components where pixel-perfect native fidelity matters (system controls,
        menus), Expo UI is a powerful option layered on top of standard React Native.</p>`,
      })}

      ${h.codePane({
        lang: "tsx",
        title: "Expo UI (conceptual)",
        readOnly: true,
        code: `// Expo UI exposes native components with a React API. The actual rendered
// control is SwiftUI on iOS / Compose on Android — not a JS re-creation.
// Use it for system-native switches, sliders, pickers, context menus, etc.
// Standard React Native components remain great for custom-branded UI.`,
      })}

      ${h.callout({
        kind: "note",
        title: "Test on both platforms, always",
        body: `<p>The cardinal rule: <strong>test on both iOS and Android</strong> throughout development, not at the
        end. Layouts, fonts, shadows, safe areas, keyboard behavior, and gestures differ — a screen that's perfect on
        iOS can be broken on Android. Use both simulators/emulators, and ideally real devices. "It worked on my iPhone"
        is the mobile version of "it worked on my machine."</p>`,
      })}

      ${h.exercise({
        title: "Make it feel native on both",
        prompt: `<p>Audit LaunchPad Mobile on both iOS and Android (simulators or devices). Fix any platform issues
        (shadows vs elevation, safe areas, the Android back button). Use <code>Platform.select</code> where behavior
        should differ. If exploring Expo UI, swap one custom control for its native equivalent and compare the feel.
        The goal: an app that feels at home on each platform.</p>`,
        runHint: "cd projects/expo-mobile && npx expo start",
      })}
    </section>
  `,
});
