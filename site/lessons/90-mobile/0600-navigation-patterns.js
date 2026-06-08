/* Lesson 90-mobile/0600 — Navigation patterns. */
registerLesson({
  meta: {
    id: "90-mobile/0600-navigation-patterns",
    title: "Navigation Patterns: Stacks, Tabs & Modals",
    part: "90-mobile",
    estMinutes: 14,
    level: "advanced",
    project: "expo-mobile",
    lede: "Mobile apps have distinct navigation conventions users expect: stacks that push and pop, bottom tabs, and modals that slide up. Expo Router gives you all of them through layout files.",
    objectives: [
      "Build stack navigation with push/pop",
      "Create bottom tab navigation",
      "Present screens as modals",
      "Follow platform navigation conventions",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Stacks: push and pop</h2>
      <p>A <strong>Stack</strong> navigator pushes screens onto a pile (with a back button / swipe-back) — the
      default for drilling into detail. Define it in a <code>_layout.tsx</code>:</p>

      ${h.codePane({
        lang: "tsx",
        title: "Stack layout",
        readOnly: true,
        code: `import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: "#0f1117" } }}>
      <Stack.Screen name="index" options={{ title: "Projects" }} />
      <Stack.Screen name="[id]" options={{ title: "Detail" }} />
    </Stack>
  );
}
// Navigating to a screen pushes it; the header back button / swipe pops it.`,
      })}

      <h2>Tabs: bottom navigation</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Tab layout",
        readOnly: true,
        code: `import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: HomeIcon }} />
      <Tabs.Screen name="projects" options={{ title: "Projects", tabBarIcon: ListIcon }} />
      <Tabs.Screen name="profile" options={{ title: "Profile", tabBarIcon: UserIcon }} />
    </Tabs>
  );
}`,
      })}

      <h2>Modals: slide-up screens</h2>
      ${h.codePane({
        lang: "tsx",
        title: "A modal screen",
        readOnly: true,
        code: `// Mark a stack screen as a modal presentation:
<Stack.Screen name="new-project" options={{ presentation: "modal" }} />
// Navigating to it slides up from the bottom (iOS) — great for create/edit
// flows, filters, and quick actions you dismiss with a downward swipe.`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Respect platform conventions",
        body: `<p>Mobile users have deep muscle memory: iOS expects swipe-back-from-the-left-edge and slide-up
        modals; Android expects the hardware/gesture back button and material patterns. <strong>Don't fight
        these</strong> — using the standard navigators means your app behaves the way each platform's users
        expect, which is a huge (and free) usability win. A common beginner mistake is building custom navigation
        that breaks back-gestures or feels "off." The platform conventions exist for good reasons; lean on them.
        This respect for platform norms is part of crafting an app that feels native, not like a web page in a
        wrapper.</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Nest navigators intentionally",
        body: `<p>A typical app nests them: a root Stack containing a Tabs navigator, with detail screens pushed
        onto the stack <em>above</em> the tabs (so the tab bar hides on detail screens), and modals presented
        over everything. Getting this nesting right — what's a tab vs. a pushed screen vs. a modal — is the main
        navigation design decision. Sketch the flow before coding it.</p>`,
      })}

      ${h.exercise({
        title: "Build the full navigation",
        prompt: `<p>Structure LaunchPad Mobile's navigation: a bottom tab bar (Home, Projects, Profile), with
        project detail screens <em>pushed</em> onto a stack (tab bar hidden on detail), and a "New Project" screen
        presented as a <strong>modal</strong>. Confirm swipe-back works on iOS and the Android back button behaves
        correctly. Add tab icons. It should now feel like a real app.</p>`,
        runHint: "cd projects/expo-mobile && npx expo start",
      })}
    </section>
  `,
});
