#!/usr/bin/env node
/* =====================================================================
   check-render.mjs — load every lesson in the manifest the same way the
   browser does and call its render() to catch runtime errors, id
   mismatches, and empty output before they ship.

   Usage: node tools/check-render.mjs   (or: pnpm check:render)
   ===================================================================== */

import fs from "node:fs";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// In the browser, `window` IS the global object; model that so that
// `window.registerLesson = …` creates a real global `registerLesson`.
const sandbox = { document: { createElement: () => ({}) }, console };
sandbox.window = sandbox;
vm.createContext(sandbox);

for (const f of [
  "site/assets/js/manifest.js",
  "site/assets/js/lesson-api.js",
]) {
  vm.runInContext(fs.readFileSync(join(root, f), "utf8"), sandbox, {
    filename: f,
  });
}

const lessons = sandbox.window.COURSE.lessons;
let failures = 0;

for (const l of lessons) {
  const rel = `site/lessons/${l.id}.js`;
  try {
    sandbox.window.__lessonDef = null;
    vm.runInContext(fs.readFileSync(join(root, rel), "utf8"), sandbox, {
      filename: rel,
    });
    const def = sandbox.window.__lessonDef;
    if (!def) throw new Error("did not call registerLesson");
    if (def.meta.id !== l.id)
      throw new Error(`meta.id "${def.meta.id}" != manifest id "${l.id}"`);
    const html = def.render(def.helpers);
    if (!html || html.length < 200) throw new Error("render output too short");
  } catch (e) {
    failures++;
    console.error(`✗ ${l.id} — ${e.message}`);
  }
}

if (failures) {
  console.error(`\n✗ ${failures}/${lessons.length} lesson(s) failed to render.`);
  process.exit(1);
}
console.log(`✓ All ${lessons.length} lesson(s) render cleanly.`);
