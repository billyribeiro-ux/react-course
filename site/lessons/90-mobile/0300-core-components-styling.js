/* Lesson 90-mobile/0300 — Core components & styling. */
registerLesson({
  meta: {
    id: "90-mobile/0300-core-components-styling",
    title: "Core Components & Styling",
    part: "90-mobile",
    estMinutes: 16,
    level: "advanced",
    project: "expo-mobile",
    lede: "The building blocks of every React Native screen: View, Text, Image, Pressable, ScrollView, and TextInput — plus how styling works with StyleSheet and Flexbox, which behaves a little differently than on the web.",
    objectives: [
      "Use the core React Native components",
      "Style with StyleSheet and the style prop",
      "Lay out with Flexbox (RN defaults)",
      "Handle safe areas and platform differences",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The core components</h2>
      <ul>
        <li><strong>View</strong> — the container (like <code>div</code>). Everything is built from these.</li>
        <li><strong>Text</strong> — required for any text. Text can't float free in a View.</li>
        <li><strong>Image</strong> — displays images (local or remote).</li>
        <li><strong>Pressable</strong> — the modern touchable; handles press, long-press, hover (on web).</li>
        <li><strong>ScrollView</strong> — scrollable container (for small/known content).</li>
        <li><strong>TextInput</strong> — text entry (like <code>input</code>).</li>
        <li><strong>FlatList / FlashList</strong> — performant lists for large data (Lesson 7).</li>
      </ul>

      <h2>Styling with StyleSheet</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Styles are JavaScript objects",
        readOnly: true,
        code: `import { View, Text, StyleSheet } from "react-native";

function Card() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Hello</Text>
      {/* Combine styles with an array; later wins (like cn()): */}
      <Text style={[styles.title, { color: "tomato" }]}>Override</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16, borderRadius: 12, backgroundColor: "#181b24" },
  title: { fontSize: 18, fontWeight: "600", color: "#e7e9ee" },
});`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "RN styling differs from CSS",
        body: `<p>Styles are camelCase JS objects (<code>backgroundColor</code>, not <code>background-color</code>),
        values are numbers (density-independent pixels) or strings, there's <strong>no cascade or inheritance</strong>
        (except some text properties within nested Text), no <code>%</code> for most things (use Flexbox), and
        only a subset of CSS exists. Layout is <strong>always Flexbox</strong>. It feels limiting at first but is
        actually simpler — and NativeWind (next lesson) brings Tailwind's familiar utilities to mobile.</p>`,
      })}

      <h2>Flexbox in React Native</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Flexbox is the layout system",
        readOnly: true,
        code: `const styles = StyleSheet.create({
  // KEY DIFFERENCE: flexDirection defaults to "column" (web defaults to "row")
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  fill: { flex: 1 },                    // take available space
  center: { justifyContent: "center", alignItems: "center" },
});`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Master Flexbox once, use it everywhere",
        body: `<p>The same Flexbox you learned for the web (Part 60) is RN's <em>only</em> layout system — with the
        one twist that <code>flexDirection</code> defaults to <code>"column"</code> (stacking vertically), since
        phones are tall. Everything else (<code>justifyContent</code>, <code>alignItems</code>, <code>flex</code>,
        <code>gap</code>) is the same. So your web layout skills transfer directly. This is another example of
        React's "learn once" leverage paying off across platforms.</p>`,
      })}

      <h2>Safe areas & platform differences</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Respect notches and platform quirks",
        readOnly: true,
        code: `import { SafeAreaView } from "react-native-safe-area-context";
import { Platform } from "react-native";

// SafeAreaView keeps content out from under notches/status bars:
<SafeAreaView style={{ flex: 1 }}>{/* ... */}</SafeAreaView>

// Branch on platform when needed:
const padding = Platform.OS === "ios" ? 20 : 16;
Platform.select({ ios: "Apple", android: "Google", web: "Web" });`,
      })}

      ${h.exercise({
        title: "Build a profile screen",
        prompt: `<p>In LaunchPad Mobile, build a profile screen with <code>View</code>, <code>Text</code>,
        <code>Image</code>, and a <code>Pressable</code> "Edit" button, laid out with Flexbox (a centered avatar,
        a row of stats). Wrap it in <code>SafeAreaView</code> so it avoids the notch. Style it with
        <code>StyleSheet</code>. Test on both iOS and Android (or simulators) and notice any platform differences
        in how it renders.</p>`,
        runHint: "cd projects/expo-mobile && npx expo start",
      })}
    </section>
  `,
});
