/* Lesson 90-mobile/0200 — Expo setup & create-expo-app. */
registerLesson({
  meta: {
    id: "90-mobile/0200-expo-setup",
    title: "Expo: The Best Way to Build React Native",
    part: "90-mobile",
    estMinutes: 14,
    level: "advanced",
    project: "expo-mobile",
    lede: "Expo is to React Native what Next.js is to React: a framework and toolchain that removes the painful native setup. It's how the vast majority of RN apps are built in 2026, and how you'll build yours.",
    objectives: [
      "Understand what Expo provides",
      "Create and run an Expo app",
      "Test on a real device with Expo Go",
      "Know the development workflow",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Why Expo</h2>
      <p>
        Bare React Native requires Xcode, Android Studio, native build configs, and a lot of platform-specific
        pain. <strong>Expo</strong> abstracts that away: a managed toolchain, a huge library of native modules
        (camera, notifications, etc.) that "just work," over-the-air updates, and cloud builds. The React Native
        team now <strong>officially recommends Expo</strong> for new apps.
      </p>

      ${h.codePane({
        lang: "bash",
        title: "Creating and running an Expo app",
        readOnly: true,
        code: `# Create a new app (with Expo Router + TypeScript):
npx create-expo-app@latest my-app

cd my-app
npx expo start        # starts the dev server + QR code

# Then:
#   - Scan the QR with the Expo Go app on your phone → runs on your device
#   - Press 'i' for iOS simulator, 'a' for Android emulator
#   - Press 'w' to run in the browser (Expo supports web too!)`,
      })}

      ${h.callout({
        kind: "principal",
        title: "The Expo Go workflow is magic for learning",
        body: `<p>Install <strong>Expo Go</strong> on your phone, scan the QR code, and your code runs on your
        actual device — with hot reload. Edit a file, save, and the app updates in your hand in seconds. No
        cables, no Xcode, no app store. This tight feedback loop makes mobile development approachable in a way it
        never was before. (For apps using custom native code, you graduate to "development builds," but Expo Go is
        perfect for learning and most apps.)</p>`,
      })}

      <h2>Expo SDK + the module library</h2>
      ${h.codePane({
        lang: "bash",
        title: "Adding native capabilities",
        readOnly: true,
        code: `# Expo modules give you native features with one install + JS API:
npx expo install expo-camera          # camera
npx expo install expo-notifications   # push notifications
npx expo install expo-location        # GPS
npx expo install expo-secure-store    # encrypted storage
# Use 'expo install' (not npm/pnpm) so it picks SDK-compatible versions.`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Expo vs bare React Native",
        body: `<p>Old advice was "Expo is limited, eject to bare RN for real apps." That's <strong>outdated</strong>.
        Modern Expo (with config plugins, development builds, and EAS) can do essentially everything bare RN can,
        including custom native modules — without the setup pain. For 2026, the default recommendation is "use
        Expo," and you only think about bare workflows in unusual cases. Choosing Expo is the senior, pragmatic
        default, not a beginner compromise.</p>`,
      })}

      ${h.callout({
        kind: "note",
        title: "expo install picks compatible versions",
        body: `<p>Always add native packages with <code>npx expo install &lt;pkg&gt;</code> rather than
        <code>npm install</code> — Expo resolves the version that matches your SDK, avoiding native version
        mismatches that cause cryptic build failures. This small habit prevents a lot of pain.</p>`,
      })}

      ${h.exercise({
        title: "Run it on your phone",
        prompt: `<p>From <code>projects/expo-mobile</code>, run <code>npm install</code> then <code>npx expo
        start</code>. Install Expo Go on your phone and scan the QR code to run LaunchPad Mobile on your actual
        device. Edit the home screen's title text and watch it hot-reload in your hand. Then try the iOS/Android
        simulator and even <code>w</code> for web. You're running a native app you built.</p>`,
        runHint: "cd projects/expo-mobile && npx expo start",
      })}
    </section>
  `,
});
