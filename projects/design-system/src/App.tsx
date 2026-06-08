import { useState } from "react";
import { Button } from "./components/Button.tsx";

// A simple showcase page. The real documentation lives in Storybook
// (run `pnpm --filter design-system storybook`), but this lets you see
// the components and the theme toggle in a normal app too.
export default function App() {
  const [dark, setDark] = useState(true);

  return (
    <div className={dark ? "dark" : ""}>
      <main className="min-h-screen bg-bg text-fg p-8">
        <div className="mx-auto max-w-2xl space-y-6">
          <header className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">🎨 Design System</h1>
            <Button variant="secondary" onClick={() => setDark((d) => !d)}>
              {dark ? "☀️ Light" : "🌙 Dark"}
            </Button>
          </header>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Buttons</h2>
            <div className="flex flex-wrap gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button disabled>Disabled</Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
