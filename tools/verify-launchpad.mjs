#!/usr/bin/env node
/* Runtime smoke test of the LaunchPad full-stack reference: starts the
   production server and drives sign-in, authorization, Server Action CRUD,
   and Zod validation in a real browser. Requires a prior `next build` and
   @playwright/test + chromium. Usage: pnpm check:launchpad */
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
const require = createRequire("/home/user/react-course/package.json");
const { chromium } = require("@playwright/test");
const PORT = 3987;
const srv = spawn("node", ["node_modules/next/dist/bin/next", "start", "-p", String(PORT)],
  { cwd: "/home/user/react-course/projects/next-saas", stdio: "ignore" });
async function waitReady(){ for(let i=0;i<60;i++){ try{ const r=await fetch(`http://localhost:${PORT}/login`); if(r.ok) return true; }catch{} await new Promise(r=>setTimeout(r,500)); } return false; }
const ok=(m)=>console.log("✓ "+m); const fail=(m)=>{console.error("✗ "+m);process.exitCode=1;};
try {
  if(!await waitReady()){ fail("server did not start"); process.exit(1); }
  const b=await chromium.launch(); const pg=await b.newContext().then(c=>c.newPage());

  // Unauthenticated /dashboard → redirected to /login by middleware
  await pg.goto(`http://localhost:${PORT}/dashboard`,{waitUntil:"networkidle"});
  pg.url().includes("/login") ? ok("middleware redirects unauthenticated /dashboard → /login") : fail("no redirect: "+pg.url());

  // Sign in as ada
  await pg.getByRole("button",{name:/sign in as ada/i}).click();
  await pg.waitForURL("**/dashboard");
  await pg.getByRole("heading",{name:/your projects/i}).waitFor();
  ok("sign-in works → dashboard renders");
  (await pg.getByText("Marketing Site").count())>0 ? ok("user-scoped projects load (ada sees her seed data)") : fail("ada's projects missing");

  // Create a project via the Server Action form
  await pg.getByLabel("Project name").fill("Reference Build");
  await pg.getByLabel("Budget").fill("4200");
  await pg.getByRole("button",{name:/add project/i}).click();
  await pg.getByText("Reference Build").waitFor({timeout:8000});
  ok("Server Action creates a project (appears after revalidate)");

  await pg.goto(`http://localhost:${PORT}/dashboard`,{waitUntil:"networkidle"});
  await pg.getByLabel("Budget").fill("10");
  await pg.getByRole("button",{name:/add project/i}).click();
  try { await pg.getByText(/name is required/i).waitFor({timeout:8000}); ok("Zod server validation surfaces field error on empty name"); } catch { fail("no validation error shown"); }

  // Delete a project
  const before = await pg.locator(".project").count();
  await pg.locator(".project .delete").first().click();
  await pg.waitForFunction((n)=>document.querySelectorAll(".project").length < n, before, {timeout:8000});
  ok("delete Server Action removes a project");

  await b.close();
} finally { srv.kill("SIGTERM"); }
console.log(process.exitCode?"\n✗ LaunchPad smoke FAILED":"\n✓ LaunchPad smoke PASSED");
