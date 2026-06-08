#!/usr/bin/env node
/* =====================================================================
   check-manifest.mjs — read-only consistency check for the course.

   Verifies that:
     1. Every lesson in manifest.js has a matching file under site/lessons/
     2. Every lesson file is registered in the manifest (no orphans)
     3. Lesson ids are unique
     4. Each lesson's `part` exists in COURSE.parts
     5. Each lesson file's id matches its path

   Usage: node tools/check-manifest.mjs   (or: pnpm check:lessons)
   Exits non-zero on any problem so it can gate CI.
   ===================================================================== */

import { readFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const lessonsDir = join(root, "site", "lessons");
const manifestPath = join(root, "site", "assets", "js", "manifest.js");

const problems = [];
const warn = (m) => problems.push(m);

// --- Load the manifest by evaluating it in a tiny window shim. ---
async function loadManifest() {
  const src = await readFile(manifestPath, "utf8");
  const sandbox = { window: {} };
  // manifest.js is a single `window.COURSE = {...}` assignment.
  const fn = new Function("window", src + "\nreturn window.COURSE;");
  return fn(sandbox.window);
}

// --- Recursively collect every lesson .js file under site/lessons/. ---
async function collectLessonFiles(dir, base = dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await collectLessonFiles(full, base)));
    } else if (entry.isFile() && entry.name.endsWith(".js")) {
      out.push(relative(base, full).replaceAll("\\", "/").replace(/\.js$/, ""));
    }
  }
  return out;
}

const course = await loadManifest();
if (!course || !Array.isArray(course.lessons)) {
  console.error("✗ Could not read COURSE.lessons from manifest.js");
  process.exit(1);
}

const partIds = new Set(course.parts.map((p) => p.id));
const fileIds = new Set(
  existsSync(lessonsDir) ? await collectLessonFiles(lessonsDir) : []
);
const seen = new Set();

for (const lesson of course.lessons) {
  // unique ids
  if (seen.has(lesson.id)) warn(`Duplicate lesson id: ${lesson.id}`);
  seen.add(lesson.id);

  // part exists
  if (!partIds.has(lesson.part)) {
    warn(`Lesson ${lesson.id} references unknown part "${lesson.part}"`);
  }

  // id starts with its part
  if (!lesson.id.startsWith(lesson.part + "/")) {
    warn(`Lesson ${lesson.id} id should start with its part "${lesson.part}/"`);
  }

  // file exists
  if (!fileIds.has(lesson.id)) {
    warn(`Manifest lists ${lesson.id} but site/lessons/${lesson.id}.js is missing`);
  }
}

// orphan files (exist on disk but not registered)
for (const id of fileIds) {
  if (!seen.has(id)) {
    warn(`File site/lessons/${id}.js is not registered in the manifest`);
  }
}

if (problems.length) {
  console.error(`✗ ${problems.length} problem(s) found:\n`);
  for (const p of problems) console.error("  • " + p);
  process.exit(1);
}

console.log(
  `✓ Manifest OK — ${course.lessons.length} lesson(s) across ${course.parts.length} part(s), all files matched.`
);
