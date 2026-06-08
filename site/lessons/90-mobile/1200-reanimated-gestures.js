/* Lesson 90-mobile/1200 — Animations with Reanimated & gestures. */
registerLesson({
  meta: {
    id: "90-mobile/1200-reanimated-gestures",
    title: "Animations with Reanimated & Gestures",
    part: "90-mobile",
    estMinutes: 15,
    level: "advanced",
    project: "expo-mobile",
    lede: "Smooth, gesture-driven animation is what makes a mobile app feel premium and native. Reanimated runs animations on the UI thread for buttery 60/120fps, and the Gesture Handler powers swipes, drags, and pinches.",
    objectives: [
      "Animate with Reanimated's shared values",
      "Run animations on the UI thread",
      "Handle gestures (swipe, drag, pinch)",
      "Combine gestures with animations",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Why a dedicated animation library?</h2>
      <p>
        Animating via React state re-renders on every frame — too slow for smooth 60fps (or 120fps on modern
        phones). <strong>Reanimated</strong> runs animations directly on the <strong>UI thread</strong>, bypassing
        the JS thread, so they stay smooth even when JavaScript is busy. This is essential for the fluid feel users
        expect from native apps.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "Reanimated basics",
        readOnly: true,
        code: `import Animated, {
  useSharedValue, useAnimatedStyle, withSpring,
} from "react-native-reanimated";

function Box() {
  const offset = useSharedValue(0);          // lives on the UI thread
  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));
  return (
    <>
      <Animated.View style={[styles.box, style]} />
      <Button title="Move" onPress={() => { offset.value = withSpring(100); }} />
    </>
  );
}
// withSpring/withTiming animate the shared value smoothly, on the UI thread.`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Shared values + the UI thread",
        body: `<p>The key concepts: a <strong>shared value</strong> is state that lives on the UI thread (not React
        state), and an <strong>animated style</strong> reads it to produce smooth motion without React re-renders.
        Spring physics (<code>withSpring</code>) feels natural because it mimics real-world motion. This
        architecture — animations decoupled from the JS thread — is why Reanimated stays smooth under load where
        naive state-driven animation janks. It's the mobile counterpart to the web's View Transitions/Motion, and
        the standard for serious RN animation.</p>`,
      })}

      <h2>Gestures</h2>
      ${h.codePane({
        lang: "tsx",
        title: "react-native-gesture-handler",
        readOnly: true,
        code: `import { Gesture, GestureDetector } from "react-native-gesture-handler";

const pan = Gesture.Pan().onUpdate((e) => {
  offset.value = e.translationX;     // follow the finger, on the UI thread
}).onEnd(() => {
  offset.value = withSpring(0);      // spring back when released
});

<GestureDetector gesture={pan}>
  <Animated.View style={[styles.card, animatedStyle]} />
</GestureDetector>
// Composable gestures: Pan, Tap, Pinch, Rotation, LongPress, and combinations.`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Gesture-driven UI is the mobile signature",
        body: `<p>Swipe-to-delete, drag-to-reorder, pull-to-refresh, pinch-to-zoom, swipeable cards — these
        gesture interactions <em>define</em> the mobile experience and have no real web equivalent. Combining the
        <strong>Gesture Handler</strong> (which processes touches on the UI thread) with <strong>Reanimated</strong>
        (which animates on the UI thread) lets you build interactions that track the finger perfectly with zero lag.
        This is where mobile development gets genuinely fun — and where a polished app distinguishes itself. As
        always, honor reduced-motion preferences and keep gestures discoverable.</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        body: `<p>Reanimated and Gesture Handler require a small amount of native setup (a Babel plugin, wrapping
        your app in <code>GestureHandlerRootView</code>). Expo includes them in many templates; follow the current
        docs for setup. Worklets (the functions that run on the UI thread) have rules — e.g. accessing React state
        inside them needs care. The docs are excellent; lean on them.</p>`,
      })}

      ${h.exercise({
        title: "Build a gesture interaction",
        prompt: `<p>Add a gesture-driven animation to LaunchPad Mobile: e.g. swipe-to-delete on project list rows
        (Pan gesture + Reanimated to slide and spring back/away), or a draggable card, or pull-to-refresh with a
        custom animated indicator. Test it on a real device — the smoothness of UI-thread animation is something you
        feel, not see in a screenshot.</p>`,
        runHint: "cd projects/expo-mobile && npx expo start",
      })}
    </section>
  `,
});
