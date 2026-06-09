#!/usr/bin/env node
/* Accessibility audit of the course site with axe-core (WCAG 2 A/AA). The
   course teaches accessibility (Part 60), so the site itself must pass.
   Serves the site, runs axe on the landing page and a lesson page, and fails
   on any violation. Usage: pnpm check:a11y */
import http from "node:http";
import fs from "node:fs";
import { join, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(join(root, "package.json"));
const { chromium } = require("@playwright/test");
const { default: AxeBuilder } = require("@axe-core/playwright");

const siteDir = join(root, "site");
const MIME = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".json": "application/json" };

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p === "/") p = "/index.html";
  const file = join(siteDir, p);
  if (!file.startsWith(siteDir) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404); res.end(); return;
  }
  res.writeHead(200, { "content-type": MIME[extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});

await new Promise((r) => server.listen(0, r));
const port = server.address().port;
const base = `http://localhost:${port}`;

const browser = await chromium.launch({ args: ["--ignore-certificate-errors"] });
const page = await (await browser.newContext({ ignoreHTTPSErrors: true })).newPage();

const pages = [
  { name: "landing", url: `${base}/index.html`, ready: ".toc-card" },
  { name: "lesson", url: `${base}/lesson.html?id=00-intro/0100-welcome`, ready: ".lesson-head h1" },
  { name: "lesson (a11y content)", url: `${base}/lesson.html?id=60-styling/1000-accessibility-semantics`, ready: ".lesson-head h1" },
];

let total = 0;
try {
  for (const theme of ["light", "dark"]) {
    // Seed the theme before the page's pre-paint script runs.
    await page.addInitScript((t) => {
      try { localStorage.setItem("course-theme", t); } catch {}
    }, theme);
    for (const p of pages) {
      await page.goto(p.url, { waitUntil: "networkidle" });
      await page.waitForSelector(p.ready, { timeout: 10000 });
      await page.waitForTimeout(800);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        // Monaco injects its own DOM we don't control; audit our chrome/content.
        .exclude(".monaco-editor")
        .analyze();
      const v = results.violations;
      if (v.length === 0) {
        console.log(`✓ ${theme} · ${p.name}: no a11y violations`);
      } else {
        total += v.length;
        console.log(`✗ ${theme} · ${p.name}: ${v.length} violation(s)`);
        for (const issue of v) {
          console.log(`   • [${issue.impact}] ${issue.id} — ${issue.help}`);
          for (const node of issue.nodes.slice(0, 3)) {
            console.log(`       ${node.target.join(" ")}`);
          }
        }
      }
    }
  }
} finally {
  await browser.close();
  server.close();
}

if (total) {
  console.error(`\n✗ ${total} accessibility violation(s) found.`);
  process.exit(1);
}
console.log("\n✓ Accessibility audit passed (WCAG 2.0/2.1 A & AA).");
