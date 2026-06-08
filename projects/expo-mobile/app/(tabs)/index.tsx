import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

// A screen is just a React component that returns React Native elements.
// <View> is like <div>, <Text> is required for any text.
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚀 LaunchPad Mobile</Text>
      <Text style={styles.body}>
        The companion app — built with React Native 0.85 and Expo SDK 56,
        sharing types and logic with the web app.
      </Text>
      <Link href="/projects" style={styles.link}>
        View projects →
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 12 },
  title: { color: "#e7e9ee", fontSize: 28, fontWeight: "700" },
  body: { color: "#9aa2b1", fontSize: 16, lineHeight: 24 },
  link: { color: "#6ea8fe", fontSize: 16, marginTop: 8 },
});
