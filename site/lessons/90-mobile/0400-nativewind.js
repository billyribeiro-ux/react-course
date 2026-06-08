/* Lesson 90-mobile/0400 — NativeWind / Tailwind on mobile. */
registerLesson({
  meta: {
    id: "90-mobile/0400-nativewind",
    title: "NativeWind: Tailwind on Mobile",
    part: "90-mobile",
    estMinutes: 13,
    level: "advanced",
    project: "expo-mobile",
    lede: "Love Tailwind from the web? NativeWind brings the same utility-class styling to React Native, so you can use className just like on the web — and share design tokens across web and mobile.",
    objectives: [
      "Style RN components with Tailwind classes",
      "Set up NativeWind in an Expo app",
      "Share design tokens across platforms",
      "Decide between NativeWind and StyleSheet",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Tailwind for React Native</h2>
      <p>
        <strong>NativeWind</strong> lets you use Tailwind utility classes via <code>className</code> in React
        Native — the same mental model you used in Part 60. It compiles Tailwind classes to RN styles at build
        time.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "className in React Native",
        readOnly: true,
        code: `import { View, Text, Pressable } from "react-native";

function Card() {
  return (
    <View className="p-4 rounded-xl bg-surface">
      <Text className="text-lg font-semibold text-fg">Hello</Text>
      <Pressable className="mt-3 bg-brand rounded-md px-4 py-2 active:opacity-80">
        <Text className="text-brand-fg font-semibold text-center">Tap</Text>
      </Pressable>
    </View>
  );
}
// Same utility names as the web — your Tailwind knowledge transfers directly.`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Share a design language across web and mobile",
        body: `<p>The big win: you can define your design tokens (brand colors, spacing, radii) <strong>once</strong>
        and use them on both web and mobile via Tailwind. A <code>bg-brand</code> button looks consistent across
        platforms because both read the same token values. Combined with sharing types and validation (Zod) and
        business logic, NativeWind lets a small team maintain a coherent product across web and native without
        duplicating the design system. This cross-platform consistency, with one mental model, is a real
        productivity and quality multiplier.</p>`,
      })}

      <h2>Setup (brief)</h2>
      ${h.codePane({
        lang: "bash",
        title: "Adding NativeWind",
        readOnly: true,
        code: `npx expo install nativewind tailwindcss react-native-reanimated react-native-safe-area-context
# Then: create tailwind.config.js, add the NativeWind preset, wire the Babel
# plugin and Metro config, and import a global.css with the Tailwind directives.
# (Follow the current NativeWind docs — setup details shift between versions.)`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Not every web class exists",
        body: `<p>NativeWind supports most layout, spacing, color, and typography utilities, but some web-only CSS
        features don't translate (there's no real <code>grid</code>, hover works only on web, some pseudo-classes
        differ). RN's styling surface is smaller than CSS, so a subset of Tailwind applies. For interaction states
        you use RN-specific variants (e.g. <code>active:</code>). Check what's supported rather than assuming
        100% parity with the web.</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "NativeWind vs StyleSheet",
        body: `<p>Both are valid. <strong>NativeWind</strong> shines if your team already uses Tailwind on the web
        (shared mental model + tokens) and for rapid styling. <strong>StyleSheet</strong> is built-in (zero
        config), fully typed, and some teams prefer its explicitness. There's no wrong answer — many apps even mix
        them. The principal move is consistency within a project. We taught StyleSheet first so you understand the
        underlying styles NativeWind generates; now you can choose deliberately.</p>`,
      })}

      ${h.exercise({
        title: "Add NativeWind (optional but recommended)",
        prompt: `<p>Follow the current NativeWind docs to add it to LaunchPad Mobile, then restyle one screen using
        <code>className</code> with the same token names as your web design system (<code>bg-surface</code>,
        <code>text-fg</code>, <code>bg-brand</code>). Compare the developer experience to the
        <code>StyleSheet</code> version. If you prefer StyleSheet, that's fine — the point is to understand both
        and the cross-platform token-sharing opportunity.</p>`,
        runHint: "cd projects/expo-mobile && npx expo start",
      })}
    </section>
  `,
});
