import { Tabs } from "expo-router";

// A tab navigator. Each file in (tabs)/ becomes a tab screen.
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "#0f1117" },
        headerTintColor: "#e7e9ee",
        tabBarStyle: { backgroundColor: "#181b24", borderTopColor: "#262a36" },
        tabBarActiveTintColor: "#6ea8fe",
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="projects" options={{ title: "Projects" }} />
    </Tabs>
  );
}
