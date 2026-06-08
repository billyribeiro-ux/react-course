import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

// https://vite.dev/config/
// React Compiler 1.0 — automatically memoizes components at build time, so you
// rarely need useMemo/useCallback/memo by hand. (Part 50, Lesson 12.)
// With @vitejs/plugin-react v6 the compiler is wired via the reactCompilerPreset
// helper + @rolldown/plugin-babel.
export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
});
