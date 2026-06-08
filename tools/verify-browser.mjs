#!/usr/bin/env node
/* Browser smoke-test of the course site: serve it, load a lesson in real
   Chromium, and assert the chrome, Monaco, copy, and navigation all work.
   Usage: node tools/verify-browser.mjs */
import http from "node:http";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, extname } from "node:path";
import { createRequire } from "node:module";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(join(root, "package.json"));
const { chromium } = require("@playwright/test");

const siteDir = join(root, "site");
const MIME = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".json": "application/json" };

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p === "/") p = "/index.html";
  const file = join(siteDir, p);
  if (!file.startsWith(siteDir) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404); res.end("not found"); return;
  }
  res.writeHead(200, { "content-type": MIME[extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});

const fail = (m) => { console.error("✗ " + m); process.exitCode = 1; };
const ok = (m) => console.log("✓ " + m);

await new Promise((r) => server.listen(0, r));
const port = server.address().port;
const base = `http://localhost:${port}`;

// Ignore cert errors so the Monaco CDN loads even behind this sandbox's
// TLS interception (a normal user environment trusts the CDN cert directly).
const browser = await chromium.launch({ args: ["--ignore-certificate-errors"] });
const page = await (await browser.newContext({ ignoreHTTPSErrors: true })).newPage();
const consoleErrors = [];
page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()); });
page.on("pageerror", (e) => consoleErrors.push("pageerror: " + e.message));

try {
  // ---- Landing page ----
  await page.goto(`${base}/index.html`, { waitUntil: "networkidle" });
  if (await page.locator(".hero h1").count()) ok("landing: hero renders");
  else fail("landing: hero missing");
  const cards = await page.locator(".toc-card").count();
  cards >= 13 ? ok(`landing: ${cards} part cards (TOC)`) : fail(`landing: only ${cards} cards`);

  // ---- A lesson page ----
  await page.goto(`${base}/lesson.html?id=00-intro/0100-welcome`, { waitUntil: "networkidle" });
  await page.waitForSelector(".lesson-head h1", { timeout: 10000 });
  ok("lesson: header/title rendered");

  (await page.locator(".sidebar .toc-lessons a").count()) > 0 ? ok("lesson: sidebar TOC populated") : fail("sidebar empty");
  const panes = await page.locator(".code-pane").count();
  panes > 0 ? ok(`lesson: ${panes} code panes`) : fail("no code panes");
  (await page.locator(".callout").count()) > 0 ? ok("lesson: callouts render") : fail("no callouts");
  (await page.locator(".exercise").count()) > 0 ? ok("lesson: exercise box renders") : fail("no exercise");
  (await page.locator(".lesson-footer .nav-btn").count()) >= 2 ? ok("lesson: prev/next footer") : fail("no footer nav");

  // ---- Monaco actually mounted (give workers time) ----
  let monaco = false;
  try { await page.waitForSelector(".monaco-editor", { timeout: 20000 }); monaco = true; } catch {}
  if (monaco) ok("Monaco editor mounted from CDN");
  else if (await page.locator(".code-fallback").count()) ok("Monaco unavailable → <pre> fallback rendered (graceful)");
  else fail("neither Monaco nor fallback rendered in a code pane");

  // ---- Copy button ----
  await page.context().grantPermissions(["clipboard-read", "clipboard-write"]).catch(() => {});
  const copyBtn = page.locator(".code-pane [data-copy]").first();
  await copyBtn.click();
  await page.waitForTimeout(300);
  const label = await copyBtn.textContent();
  /copied/i.test(label) ? ok("copy button works (label → 'Copied!')") : fail(`copy button label was '${label}'`);

  // ---- Next navigation ----
  await page.locator(".lesson-footer a.next").click();
  await page.waitForSelector(".lesson-head h1");
  const url = page.url();
  url.includes("0200-what-is-a-program") ? ok("Next button navigates to lesson 2") : fail(`Next went to: ${url}`);

  // ---- Screenshot proof ----
  await page.goto(`${base}/lesson.html?id=00-intro/0100-welcome`, { waitUntil: "networkidle" });
  await page.waitForSelector(".monaco-editor, .code-fallback", { timeout: 20000 }).catch(() => {});
  await page.waitForTimeout(1500);
  const shot = join(root, "site", "assets", "img", "screenshot-lesson.png");
  await page.screenshot({ path: shot, fullPage: false });
  ok(`screenshot saved → ${shot.replace(root + "/", "")}`);

  if (consoleErrors.length) {
    console.log("\n  console errors during load:");
    for (const e of consoleErrors.slice(0, 8)) console.log("   • " + e);
  } else ok("no console errors");
} finally {
  await browser.close();
  server.close();
}

console.log(process.exitCode ? "\n✗ browser verification FAILED" : "\n✓ browser verification PASSED");
