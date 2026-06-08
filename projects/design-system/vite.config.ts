import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
// Tailwind CSS v4 is a first-class Vite plugin — no PostCSS config needed.
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
