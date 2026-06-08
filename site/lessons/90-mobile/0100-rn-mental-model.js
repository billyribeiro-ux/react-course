/* Lesson 90-mobile/0100 — RN mental model & the New Architecture. */
registerLesson({
  meta: {
    id: "90-mobile/0100-rn-mental-model",
    title: "React Native & the New Architecture",
    part: "90-mobile",
    estMinutes: 16,
    level: "advanced",
    project: "expo-mobile",
    lede: "React Native lets you build real native iOS and Android apps using React. Your component skills transfer almost entirely — you just render native views instead of HTML. Here's the model and what's new in 2026.",
    objectives: [
      "Understand how React Native renders to native UI",
      "Map web concepts to their RN equivalents",
      "Grasp the New Architecture (Fabric/TurboModules/JSI)",
      "Know what transfers from web React and what differs",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>React, but for native apps</h2>
      <p>
        <strong>React Native (RN)</strong> uses the same React you know — components, props, state, hooks — but
        instead of rendering to the DOM, it renders to <strong>real native UI components</strong> (actual iOS
        and Android views). It's not a web view; a React Native button <em>is</em> a native button. You write
        JavaScript/TypeScript and React; RN bridges it to native.
      </p>

      ${h.callout({
        kind: "principal",
        title: "Almost everything you know transfers",
        body: `<p>Components, props, state, <code>useState</code>/<code>useEffect</code>, custom hooks, context,
        TanStack Query, Zod, the React Compiler — all work in React Native. You're not learning a new framework;
        you're learning a new <strong>renderer</strong> and a set of native APIs. The mental model is identical:
        UI = f(state). This is the payoff of React's "learn once, write anywhere" design — your hard-won React
        skills now build mobile apps too. That leverage is exactly why "React engineer" is so valuable.</p>`,
      })}

      <h2>Web → React Native translation</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Same React, different primitives",
        readOnly: true,
        code: `// WEB:                          // REACT NATIVE:
<div>                            <View>           // layout container
<p>, <span>, text               <Text>           // ALL text must be in <Text>
<button onClick>                 <Pressable onPress>
<input>                          <TextInput>
<img>                            <Image>
<ul> + scrolling                 <FlashList> / <FlatList>
className="..."                  style={{ ... }}  // JS objects (or NativeWind)
window/localStorage              native APIs (expo-secure-store, etc.)`,
      })}

      ${h.codePane({
        lang: "tsx",
        title: "A React Native screen",
        readOnly: true,
        code: `import { View, Text, Pressable, StyleSheet } from "react-native";
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0); // exactly like web!
  return (
    <View style={styles.container}>
      <Text style={styles.count}>{count}</Text>
      <Pressable onPress={() => setCount((c) => c + 1)}>
        <Text style={styles.button}>Tap me</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({ /* ... */ });`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Key differences to internalize",
        body: `<p>(1) <strong>All text must be inside <code>&lt;Text&gt;</code></strong> — raw strings in a
        <code>&lt;View&gt;</code> error. (2) <strong>No CSS</strong> — styling is JS objects via
        <code>StyleSheet</code> (or NativeWind/Tailwind, Lesson 4), and everything is <strong>Flexbox by
        default</strong> (with <code>flexDirection: "column"</code> as the default, unlike web). (3) Events are
        <code>onPress</code>, not <code>onClick</code>. (4) No <code>div</code>/semantic HTML — you use
        <code>View</code>, <code>Text</code>, etc. These differences are small and quickly become second
        nature.</p>`,
      })}

      <h2>The New Architecture (2026)</h2>
      ${h.callout({
        kind: "principal",
        title: "Fabric, TurboModules & JSI",
        body: `<p>React Native's <strong>New Architecture</strong> (default since RN 0.76, and what you get in SDK
        56) replaced the old asynchronous "bridge" with <strong>JSI</strong> (JavaScript Interface) — letting
        JavaScript call native code <em>synchronously</em> and directly. <strong>Fabric</strong> is the new
        rendering system (faster, concurrent-React-compatible); <strong>TurboModules</strong> lazy-load native
        modules. The upshot: meaningfully better performance, lower memory, and smoother UIs than RN's earlier
        years. You rarely interact with this directly, but it's why modern RN is genuinely fast — and it's why
        2026 RN is a serious choice for production apps, not a compromise.</p>`,
      })}

      ${h.exercise({
        title: "Read the LaunchPad Mobile scaffold",
        prompt: `<p>Open the <code>expo-mobile</code> project and read <code>app/(tabs)/index.tsx</code> and
        <code>projects.tsx</code>. Map each piece to its web equivalent: <code>&lt;View&gt;</code>→div,
        <code>&lt;Text&gt;</code>→p, <code>&lt;Pressable onPress&gt;</code>→button onClick,
        <code>style</code>→className. Notice it's just React with different primitives. Follow the README to run
        it in Expo Go on your phone — seeing your code as a real app is a thrill.</p>`,
        runHint: "cd projects/expo-mobile && npm install && npx expo start",
      })}
    </section>
  `,
});
