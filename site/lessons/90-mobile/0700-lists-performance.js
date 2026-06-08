/* Lesson 90-mobile/0700 — Lists & performance with FlashList. */
registerLesson({
  meta: {
    id: "90-mobile/0700-lists-performance",
    title: "Lists & Performance with FlashList",
    part: "90-mobile",
    estMinutes: 14,
    level: "advanced",
    project: "expo-mobile",
    lede: "Lists are the backbone of mobile apps — feeds, messages, contacts. Rendering thousands of items smoothly requires virtualization. FlashList and FlatList only render what's on screen, keeping 60fps scrolling.",
    objectives: [
      "Render long lists with FlashList/FlatList",
      "Understand virtualization",
      "Avoid the ScrollView-for-everything trap",
      "Optimize list performance",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Why not just map() in a ScrollView?</h2>
      <p>
        On the web, rendering a 10,000-item list is sluggish but usually survivable. On a phone, rendering them
        all into a <code>ScrollView</code> will freeze and crash the app — phones have limited memory and need
        60fps scrolling. The solution is <strong>virtualization</strong>: only render the handful of items
        currently visible, recycling views as you scroll.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "FlashList — the fast list",
        readOnly: true,
        code: `import { FlashList } from "@shopify/flash-list";

function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <FlashList
      data={projects}
      renderItem={({ item }) => <ProjectCard project={item} />}
      keyExtractor={(item) => String(item.id)}
      // optional perf hints (header/footer/separators/onEndReached, etc.)
    />
  );
}
// Only on-screen rows exist in memory; scrolling stays smooth at any length.`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Virtualization is non-negotiable on mobile",
        body: `<p>This is the mobile version of the virtualization lesson from Part B0 — but on phones it's not an
        optimization, it's a <strong>requirement</strong>. <strong>FlashList</strong> (by Shopify) is the
        fastest option in 2026, with better recycling than the built-in <strong>FlatList</strong> (which is also
        fine). The rule: use <code>ScrollView</code> only for small, bounded content (a form, a settings page);
        use <code>FlashList</code>/<code>FlatList</code> for <em>any</em> list that could grow. Putting a large
        list in a <code>ScrollView</code> is one of the most common mobile performance bugs — and it gets worse as
        real data grows.</p>`,
      })}

      <h2>List features you'll use</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Common list props",
        readOnly: true,
        code: `<FlashList
  data={items}
  renderItem={renderItem}
  keyExtractor={(i) => i.id}
  ListHeaderComponent={<Header />}
  ListEmptyComponent={<EmptyState />}    // always handle empty!
  refreshing={isRefreshing}
  onRefresh={refetch}                    // pull-to-refresh
  onEndReached={loadMore}                // infinite scroll
  onEndReachedThreshold={0.5}
/>`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Keep renderItem cheap and keys stable",
        body: `<p>Performance depends on <code>renderItem</code> being fast (the React Compiler helps; avoid heavy
        work per row) and <code>keyExtractor</code> returning <strong>stable unique ids</strong> (same key rules
        as web lists, Part 30 — never the index for dynamic lists). Memoize row components if needed. Janky list
        scrolling almost always traces to an expensive <code>renderItem</code> or unstable keys.</p>`,
      })}

      ${h.exercise({
        title: "Build a performant feed",
        prompt: `<p>In LaunchPad Mobile, render the projects list with <code>FlashList</code>, including
        pull-to-refresh, an empty state, and (optionally) infinite scroll via <code>onEndReached</code>. Generate
        a few thousand fake items and confirm scrolling stays smooth (it will, because only visible rows render).
        Compare with putting the same data in a <code>ScrollView</code> and feel the difference.</p>`,
        runHint: "cd projects/expo-mobile && npx expo start",
      })}
    </section>
  `,
});
