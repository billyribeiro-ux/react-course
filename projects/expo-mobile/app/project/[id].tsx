import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

// Dynamic route: [id].tsx captures the URL param, just like Next.js.
export default function ProjectDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Project #{id}</Text>
      <Text style={styles.body}>
        In a real app you&apos;d fetch this project with TanStack Query — the
        same data-fetching tool you used on the web.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 12 },
  title: { color: "#e7e9ee", fontSize: 24, fontWeight: "700" },
  body: { color: "#9aa2b1", fontSize: 16, lineHeight: 24 },
});
