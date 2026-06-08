import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

// The root layout wraps the whole app. Expo Router uses file-based routing,
// just like Next.js — the app/ folder structure IS your navigation.
export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#0f1117" },
          headerTintColor: "#e7e9ee",
          contentStyle: { backgroundColor: "#0f1117" },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="project/[id]" options={{ title: "Project" }} />
      </Stack>
    </>
  );
}
