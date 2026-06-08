/* Lesson 90-mobile/0900 — Networking & TanStack Query on mobile. */
registerLesson({
  meta: {
    id: "90-mobile/0900-networking-query",
    title: "Networking & TanStack Query on Mobile",
    part: "90-mobile",
    estMinutes: 13,
    level: "advanced",
    project: "expo-mobile",
    lede: "Mobile apps talk to the same servers your web app does — and TanStack Query, which you mastered in Part 70, works identically in React Native. Plus the mobile-specific concerns: flaky networks and offline.",
    objectives: [
      "Fetch data in React Native",
      "Use TanStack Query unchanged from the web",
      "Handle flaky mobile networks",
      "Share an API layer across web and mobile",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Same fetch, same Query</h2>
      <p>
        React Native has the standard <code>fetch</code> API, and <strong>TanStack Query works exactly as it does
        on the web</strong> — same <code>QueryClientProvider</code>, <code>useQuery</code>, <code>useMutation</code>,
        caching, and invalidation. Everything you learned in Part 70 applies directly.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "TanStack Query in React Native (identical API)",
        readOnly: true,
        code: `import { useQuery } from "@tanstack/react-query";

function ProjectsScreen() {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["projects"],
    queryFn: () => fetch(API + "/projects").then((r) => r.json()),
  });

  if (isPending) return <ActivityIndicator />;  // RN's spinner
  if (isError) return <Text>Failed to load</Text>;
  return <FlashList data={data} renderItem={...} onRefresh={refetch} refreshing={false} />;
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Query was made for mobile, really",
        body: `<p>TanStack Query's features matter even <em>more</em> on mobile: caching means instant screens on
        revisit (crucial when networks are slow), background refetching keeps data fresh, retries handle flaky
        connections, and pull-to-refresh maps perfectly to <code>refetch</code>. It also has mobile-aware
        behaviors like refetch-on-app-foreground (when the user returns to the app) and refetch-on-reconnect
        (when the network comes back). Reusing the same data layer across web and mobile — same queries, same
        keys, same caching strategy — is a big productivity and consistency win.</p>`,
      })}

      <h2>Mobile network realities</h2>
      ${h.callout({
        kind: "principal",
        title: "Design for the unreliable network",
        body: `<p>Phones move through tunnels, lose signal, and switch between wifi and cellular. Your app must
        handle this gracefully: show cached data immediately (Query does this), retry failed requests, surface
        clear offline/error states, and never hang forever. Use <code>NetInfo</code> (from
        <code>@react-native-community/netinfo</code>) to detect connectivity and pause/resume Query accordingly.
        Designing for the <em>absence</em> of a network — not just the happy online path — is the mobile mindset.
        An app that breaks the moment a signal drops feels fragile; one that degrades gracefully feels solid.</p>`,
      })}

      <h2>Share the API layer</h2>
      ${h.codePane({
        lang: "tsx",
        title: "One typed API client, two platforms",
        readOnly: true,
        code: `// shared/api.ts — used by BOTH web and mobile:
import { z } from "zod";
const projectSchema = z.object({ id: z.number(), name: z.string() });

export async function getProjects() {
  const res = await fetch(API + "/projects");
  return z.array(projectSchema).parse(await res.json()); // validated + typed
}
// Mobile and web call the same function, validated by the same schema.`,
      })}

      ${h.exercise({
        title: "Wire up data fetching",
        prompt: `<p>Add <code>QueryClientProvider</code> to LaunchPad Mobile's root layout and load the projects
        list with <code>useQuery</code> (point it at your Next.js API from Part 80, or a public API). Add
        pull-to-refresh via <code>refetch</code>, a loading <code>ActivityIndicator</code>, and an error state.
        Validate the response with the same Zod schema your web app uses. Test it with airplane mode toggled to
        see the cached/offline behavior.</p>`,
        runHint: "cd projects/expo-mobile && npx expo start",
      })}
    </section>
  `,
});
