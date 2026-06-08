import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// Vitest shares Vite's config and transforms, so component tests run with the
// same setup as the app. jsdom gives us a DOM to render into.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    css: true,
  },
});
