/* Lesson 90-mobile/0500 — Expo Router (file-based navigation). */
registerLesson({
  meta: {
    id: "90-mobile/0500-expo-router",
    title: "Expo Router: File-Based Navigation",
    part: "90-mobile",
    estMinutes: 15,
    level: "advanced",
    project: "expo-mobile",
    lede: "Expo Router brings Next.js-style file-based routing to mobile. If you know the App Router, you already know this — the app/ folder defines your screens, with typed routes and deep linking for free.",
    objectives: [
      "Define screens with file-based routing",
      "Use the typed Link and dynamic routes",
      "Understand layouts and route groups",
      "Get deep linking automatically",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Routing that feels like Next.js</h2>
      <p>
        <strong>Expo Router</strong> uses the <code>app/</code> directory exactly like Next.js: each file is a
        screen, folders are nested routes, special files are layouts. Your Part 80 knowledge transfers almost
        completely — which is the whole point.
      </p>

      ${h.codePane({
        lang: "bash",
        title: "app/ structure (look familiar?)",
        readOnly: true,
        code: `app/
├── _layout.tsx          → root layout (Stack navigator)
├── (tabs)/
│   ├── _layout.tsx      → tab navigator
│   ├── index.tsx        → "/" (Home tab)
│   └── projects.tsx     → "/projects" (Projects tab)
└── project/
    └── [id].tsx         → "/project/:id" (dynamic route)`,
      })}

      ${h.codePane({
        lang: "tsx",
        title: "Navigating with typed Link",
        check: false,
        readOnly: true,
        code: `import { Link, useRouter } from "expo-router";

// Declarative navigation (typed routes are on in app.json):
<Link href="/projects">View projects</Link>
<Link href={\`/project/\${id}\`}>Open</Link>

// Imperative navigation:
const router = useRouter();
router.push("/settings");
router.back();`,
      })}

      ${h.codePane({
        lang: "tsx",
        title: "Reading dynamic params",
        readOnly: true,
        code: `import { useLocalSearchParams } from "expo-router";

export default function ProjectScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <Text>Project {id}</Text>;
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "One routing model, web and mobile",
        body: `<p>Expo Router deliberately mirrors Next.js's App Router: file-based routes, <code>_layout</code>
        files, route groups <code>(folder)</code>, dynamic <code>[param]</code> segments, typed routes. An
        engineer who knows one is instantly productive in the other. This convergence — the same routing mental
        model across web and native — is a major reason the React ecosystem feels coherent in 2026. It also makes
        building web + mobile versions of a product far more efficient: shared concepts, shared mental energy.</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Deep linking for free",
        body: `<p>Because routes are URLs, Expo Router gives you <strong>deep linking</strong> automatically: a link
        like <code>launchpad://project/3</code> (or a universal <code>https://</code> link) opens the app
        directly to that screen. This is essential for real apps — push notifications, emails, and shared links
        that open the right place. With imperative navigation you'd have to wire this by hand; file-based routing
        makes it inherent. The URL-as-state lesson from Part 70 applies on mobile too.</p>`,
      })}

      ${h.exercise({
        title: "Add screens and navigation",
        prompt: `<p>In LaunchPad Mobile, add a "Settings" screen (a new tab or a stack screen) and a dynamic
        <code>project/[id]</code> detail that reads its param and (for now) shows the id. Wire <code>&lt;Link&gt;</code>
        navigation from the projects list to the detail, and a <code>router.back()</code> button. Confirm the back
        gesture and header back button work. You're navigating a real native app with web-familiar routing.</p>`,
        runHint: "cd projects/expo-mobile && npx expo start",
      })}
    </section>
  `,
});
