#!/usr/bin/env node
/* =====================================================================
   check-snippets.mjs — extract every code pane from every lesson and
   syntax-check the JS/TS/JSX/TSX ones with the TypeScript parser.

   We use ts.transpileModule (NOT a full type-check): it reports SYNTAX
   errors (unbalanced braces, broken JSX, bad tokens) but does NOT complain
   about undefined symbols — which is correct, because teaching snippets are
   intentionally incomplete fragments that reference things like `db` or
   `useState` without imports.

   Lines that are deliberate pseudocode placeholders (a bare `...`, `// ...`)
   are normalized so they don't masquerade as real syntax errors.

   Usage: node tools/check-snippets.mjs   (or: pnpm check:snippets)
   ===================================================================== */

import fs from "node:fs";
import vm from "node:vm";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(join(root, "projects/vite-fundamentals/"));
const ts = require("typescript");

// ---- load manifest + lesson-api in a browser-like sandbox ----
const sandbox = { document: { createElement: () => ({}) }, console };
sandbox.window = sandbox;
vm.createContext(sandbox);
for (const f of ["site/assets/js/manifest.js", "site/assets/js/lesson-api.js"]) {
  vm.runInContext(fs.readFileSync(join(root, f), "utf8"), sandbox, { filename: f });
}

const lessons = sandbox.window.COURSE.lessons;
const CHECK_LANGS = new Set(["ts", "tsx", "js", "jsx", "typescript", "javascript"]);

// Replace deliberate placeholders so pseudocode doesn't read as a syntax error.
function normalize(code) {
  return code
    // attribute/value placeholders: foo={...}  ->  foo={undefined}
    .replace(/=\{\s*\.\.\.\s*\}/g, "={undefined}")
    // standalone "...": call args / array / object spread placeholders
    .replace(/\(\s*\.\.\.\s*\)/g, "()")
    .replace(/\[\s*\.\.\.\s*\]/g, "[]")
    // a line that is only "..." (with optional comment)
    .replace(/^\s*\.\.\.\s*$/gm, "");
}

function syntaxErrors(code, lang) {
  const isJsx = lang === "tsx" || lang === "jsx";
  const compilerOptions = {
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.ESNext,
    allowJs: true,
    isolatedModules: false,
  };
  // Only set jsx for JSX/TSX — passing it for plain JS/TS is rejected by TS.
  if (isJsx) compilerOptions.jsx = ts.JsxEmit.ReactJSX;

  const out = ts.transpileModule(normalize(code), {
    reportDiagnostics: true,
    compilerOptions,
    fileName: `snippet.${lang}`,
  });
  // transpileModule yields syntactic diagnostics; keep only real errors.
  return (out.diagnostics || []).filter(
    (d) => d.category === ts.DiagnosticCategory.Error
  );
}

let paneCount = 0;
let badPanes = 0;
const problems = [];

for (const l of lessons) {
  const rel = `site/lessons/${l.id}.js`;
  sandbox.window.__lessonDef = null;
  vm.runInContext(fs.readFileSync(join(root, rel), "utf8"), sandbox, { filename: rel });
  const def = sandbox.window.__lessonDef;

  // Capture every codePane's code by instrumenting the helper, then render.
  const panes = [];
  const realCodePane = def.helpers.codePane;
  def.helpers.codePane = (opts) => {
    panes.push({
      lang: (opts.lang || "").toLowerCase(),
      title: opts.title || "",
      code: opts.code || "",
      // Authors set `check: false` for deliberately-illustrative panes:
      // multi-example blocks, "don't do this" samples, or config fragments
      // that aren't meant to be a single compilable unit.
      check: opts.check !== false,
    });
    return realCodePane(opts);
  };
  def.render(def.helpers);
  def.helpers.codePane = realCodePane;

  for (const pane of panes) {
    if (!CHECK_LANGS.has(pane.lang)) continue;
    if (!pane.check) continue; // author-marked illustrative pane
    paneCount++;
    const errs = syntaxErrors(pane.code, pane.lang);
    if (errs.length) {
      badPanes++;
      problems.push({
        lesson: l.id,
        title: pane.title,
        lang: pane.lang,
        messages: errs.map((d) => ts.flattenDiagnosticMessageText(d.messageText, "\n")),
      });
    }
  }
}

if (problems.length) {
  console.error(`✗ Syntax issues in ${badPanes}/${paneCount} checked snippet(s):\n`);
  for (const p of problems) {
    console.error(`  ${p.lesson}  [${p.lang}] ${p.title ? '"' + p.title + '"' : ""}`);
    for (const m of p.messages) console.error(`     - ${m}`);
  }
  process.exit(1);
}
console.log(`✓ All ${paneCount} JS/TS/JSX/TSX snippets parse cleanly.`);
