// =====================================================================
// Personal Dashboard — your Part 10 playground.
//
// Right now this just proves the project runs. As you work through the
// JavaScript lessons you'll replace and extend this file: a greeting that
// knows the time of day, a live clock, a to-do list, a notes box saved to
// localStorage, and more. Every concept you learn lands here.
//
// Run it from the repo root with:  pnpm js     (alias for: vite dev here)
// =====================================================================

const intro = document.querySelector("#intro");

// A tiny taste of what's coming: greet based on the current hour.
const hour = new Date().getHours();
const partOfDay = hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening";

intro.textContent = `Good ${partOfDay}! Your dashboard is running. 🎉`;

console.log("Dashboard loaded. Open the Console (F12) — you'll use it a lot.");
