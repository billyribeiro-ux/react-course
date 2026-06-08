import { FlashList } from "@shopify/flash-list";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

// Shared shape — in a real monorepo this type would come from shared code,
// the same way the web app and this app share validation schemas.
interface Project {
  id: number;
  name: string;
  status: "active" | "archived";
}

const PROJECTS: Project[] = [
  { id: 1, name: "Marketing Site", status: "active" },
  { id: 2, name: "Mobile App", status: "active" },
  { id: 3, name: "Internal Tools", status: "archived" },
];

export default function ProjectsScreen() {
  return (
    <View style={styles.container}>
      {/* FlashList is a high-performance list — only renders what's visible. */}
      <FlashList
        data={PROJECTS}
        renderItem={({ item }) => (
          <Link href={`/project/${item.id}`} asChild>
            <Pressable style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.status}>{item.status}</Text>
            </Pressable>
          </Link>
        )}
        keyExtractor={(item) => String(item.id)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: {
    backgroundColor: "#181b24",
    borderColor: "#262a36",
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  name: { color: "#e7e9ee", fontSize: 18, fontWeight: "600" },
  status: { color: "#9aa2b1", fontSize: 14, marginTop: 4 },
});
