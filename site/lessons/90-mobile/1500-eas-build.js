/* Lesson 90-mobile/1500 — Building & shipping with EAS. */
registerLesson({
  meta: {
    id: "90-mobile/1500-eas-build",
    title: "Building & Shipping with EAS",
    part: "90-mobile",
    estMinutes: 14,
    level: "advanced",
    project: "expo-mobile",
    lede: "Expo Go is for development; to ship a real app you need production builds. EAS (Expo Application Services) builds your iOS and Android binaries in the cloud and delivers over-the-air updates — no Mac required for iOS.",
    objectives: [
      "Create development and production builds with EAS",
      "Understand build profiles and configuration",
      "Ship instant updates over-the-air",
      "Know the release pipeline",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>From Expo Go to real builds</h2>
      <p>
        Expo Go runs your JS in a generic host app — perfect for development. But a shippable app needs a
        <strong>native build</strong> (a real <code>.ipa</code> for iOS, <code>.aab</code>/<code>.apk</code> for
        Android) with your own icon, name, and any custom native modules. <strong>EAS Build</strong> compiles these
        in the cloud.
      </p>

      ${h.codePane({
        lang: "bash",
        title: "EAS build commands",
        readOnly: true,
        code: `npm install -g eas-cli
eas login

# Configure build profiles (creates eas.json):
eas build:configure

# Build in the cloud (no Xcode/Mac needed for iOS!):
eas build --platform ios --profile development   # dev build for your devices
eas build --platform android --profile preview   # internal testing build
eas build --platform all --profile production    # store-ready builds`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Cloud builds remove the biggest RN barrier",
        body: `<p>Historically, building iOS apps required a Mac with Xcode — a hard blocker for many developers.
        <strong>EAS Build runs the native build in the cloud</strong>, so you can ship an iOS app from a Windows or
        Linux machine. It also manages the painful parts: signing credentials, provisioning profiles, and
        certificates. This democratization of mobile shipping is a big deal — the toolchain is no longer the
        gatekeeper. Build profiles (in <code>eas.json</code>) let you define different configs for development,
        internal preview, and production from one place.</p>`,
      })}

      <h2>Build profiles</h2>
      ${h.codePane({
        lang: "json",
        title: "eas.json (profiles)",
        readOnly: true,
        code: `{
  "build": {
    "development": { "developmentClient": true, "distribution": "internal" },
    "preview": { "distribution": "internal" },
    "production": { "autoIncrement": true }
  }
}
// development → custom dev client; preview → share with testers via a link;
// production → store-ready binaries with auto-incremented build numbers.`,
      })}

      <h2>Over-the-air updates</h2>
      ${h.callout({
        kind: "principal",
        title: "Ship JS fixes instantly with EAS Update",
        body: `<p>A superpower of Expo: <strong>EAS Update</strong> pushes JavaScript/asset changes
        <em>over-the-air</em> to installed apps — users get the fix on next launch, <strong>without an app-store
        review</strong>. A typo or a bug fix that's pure JS can reach users in minutes instead of days. (Native
        changes still need a new store build.) This dramatically tightens the mobile release loop. Use it
        responsibly — respect store policies (you can't fundamentally change the app's purpose via OTA) — but for
        rapid iteration and hotfixes, it's transformative compared to the traditional "submit and wait" cycle.</p>`,
      })}

      ${h.exercise({
        title: "Create a build",
        prompt: `<p>Set up EAS for LaunchPad Mobile: install <code>eas-cli</code>, run
        <code>eas build:configure</code>, and create a <strong>preview</strong> build for Android (the easiest to
        test — you get an installable link, no store needed). Install it on a device. If you have an Apple Developer
        account, try an iOS development build too. Experience shipping a real binary you built in the cloud.</p>`,
        runHint: "cd projects/expo-mobile && eas build --platform android --profile preview",
      })}
    </section>
  `,
});
