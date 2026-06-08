/* =====================================================================
   shell.js — renders ALL shared chrome (header, sidebar TOC, prev/next
   footer), loads a lesson fragment, mounts Monaco panes, wires copy
   buttons, manages theme + progress, and powers the landing page.

   Authors never touch this file — it is the one place the course "frame"
   lives, so hundreds of lessons stay perfectly consistent.
   ===================================================================== */

(function () {
  const COURSE = window.COURSE;
  const LS_THEME = "course-theme";
  const LS_PROGRESS = "course-progress";

  /* ---------------- small DOM utils ---------------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  function elFromHTML(html) {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  /* ---------------- theme ---------------- */
  function storedTheme() {
    try {
      return localStorage.getItem(LS_THEME);
    } catch {
      return null;
    }
  }
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(LS_THEME, theme);
    } catch {}
    if (window.MonacoLoader) window.MonacoLoader.retheme();
    const btn = $("#theme-toggle");
    if (btn) btn.textContent = theme === "dark" ? "☀️" : "🌙";
  }
  function initTheme() {
    const stored = storedTheme();
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(stored || (prefersDark ? "dark" : "light"));
  }
  function toggleTheme() {
    const cur = document.documentElement.getAttribute("data-theme");
    applyTheme(cur === "dark" ? "light" : "dark");
  }

  /* ---------------- progress ---------------- */
  function getProgress() {
    try {
      return JSON.parse(localStorage.getItem(LS_PROGRESS) || "{}");
    } catch {
      return {};
    }
  }
  function markDone(id) {
    const p = getProgress();
    if (!p[id]) {
      p[id] = true;
      try {
        localStorage.setItem(LS_PROGRESS, JSON.stringify(p));
      } catch {}
    }
  }
  function progressPercent() {
    const total = COURSE.lessons.length || 1;
    const done = Object.keys(getProgress()).filter((id) =>
      COURSE.lessons.some((l) => l.id === id)
    ).length;
    return Math.round((done / total) * 100);
  }

  /* ---------------- header ---------------- */
  function renderHeader({ withMenu } = {}) {
    const header = $("#header");
    if (!header) return;
    header.className = "app-header";
    header.innerHTML = `
      ${
        withMenu
          ? `<button class="icon-btn menu-toggle" id="menu-toggle" title="Menu" aria-label="Toggle navigation">☰</button>`
          : ""
      }
      <a class="brand" href="index.html">
        <span class="logo">R</span>
        <span>
          ${COURSE.title}
          <span class="brand-sub">${COURSE.subtitle}</span>
        </span>
      </a>
      <span class="header-spacer"></span>
      <span class="header-progress" id="header-progress"></span>
      <button class="icon-btn" id="theme-toggle" title="Toggle theme" aria-label="Toggle color theme">🌙</button>
    `;
    updateHeaderProgress();
    $("#theme-toggle").addEventListener("click", toggleTheme);
    const mt = $("#menu-toggle");
    if (mt) {
      mt.addEventListener("click", () => {
        const app = $("#app");
        app.dataset.navOpen = app.dataset.navOpen === "true" ? "false" : "true";
      });
    }
    // reflect current theme glyph
    applyTheme(document.documentElement.getAttribute("data-theme") || "light");
  }
  function updateHeaderProgress() {
    const node = $("#header-progress");
    if (!node) return;
    const pct = progressPercent();
    node.innerHTML = `${pct}% complete <span class="bar"><span style="width:${pct}%"></span></span>`;
  }

  /* ---------------- sidebar TOC ---------------- */
  function lessonsByPart(partId) {
    return COURSE.lessons.filter((l) => l.part === partId);
  }
  function shortNum(id) {
    const tail = id.split("/")[1] || "";
    const m = tail.match(/^(\d+)/);
    return m ? m[1] : "";
  }
  function renderSidebar(activeId) {
    const sidebar = $("#sidebar");
    if (!sidebar) return;
    const progress = getProgress();
    const activePart = activeId ? activeId.split("/")[0] : null;

    const partsHtml = COURSE.parts
      .map((part) => {
        const lessons = lessonsByPart(part.id);
        if (!lessons.length) return ""; // hide empty parts until authored
        const open = part.id === activePart ? "open" : "";
        const items = lessons
          .map((l) => {
            const cls = [
              l.id === activeId ? "active" : "",
              progress[l.id] ? "done" : "",
            ]
              .join(" ")
              .trim();
            return `<li><a class="${cls}" href="lesson.html?id=${encodeURIComponent(
              l.id
            )}"><span class="num">${shortNum(l.id)}</span><span>${
              l.title
            }</span></a></li>`;
          })
          .join("");
        return `
        <details class="toc-part" ${open}>
          <summary>${part.title}<span class="part-tag">${lessons.length}</span></summary>
          <ul class="toc-lessons">${items}</ul>
        </details>`;
      })
      .join("");

    sidebar.innerHTML = `
      <input class="toc-search" id="toc-search" type="search" placeholder="Filter lessons…" aria-label="Filter lessons" />
      <nav class="toc-nav">${partsHtml}</nav>
    `;

    const search = $("#toc-search");
    search.addEventListener("input", () => {
      const q = search.value.toLowerCase();
      sidebar.querySelectorAll(".toc-part").forEach((part) => {
        let any = false;
        part.querySelectorAll(".toc-lessons li").forEach((li) => {
          const match = li.textContent.toLowerCase().includes(q);
          li.style.display = match ? "" : "none";
          if (match) any = true;
        });
        part.style.display = any ? "" : "none";
        if (q && any) part.open = true;
      });
    });
  }

  /* ---------------- code panes ---------------- */
  function paneSource(pane) {
    const tpl = pane.querySelector("template[data-source]");
    return tpl ? tpl.content.textContent : "";
  }
  function renderFallback(pane) {
    const mount = pane.querySelector("[data-mount]");
    const pre = document.createElement("pre");
    pre.className = "code-fallback";
    const code = document.createElement("code");
    code.textContent = paneSource(pane);
    pre.appendChild(code);
    mount.replaceChildren(pre);
  }
  function wireCopy(root) {
    root.querySelectorAll(".code-pane").forEach((pane) => {
      const btn = pane.querySelector("[data-copy]");
      if (!btn) return;
      btn.addEventListener("click", async () => {
        const text = pane._editor ? pane._editor.getValue() : paneSource(pane);
        const ok = await copyText(text);
        btn.textContent = ok ? "Copied!" : "Press ⌘/Ctrl+C";
        btn.classList.toggle("copied", ok);
        setTimeout(() => {
          btn.textContent = "Copy";
          btn.classList.remove("copied");
        }, 1600);
      });
    });
  }
  async function copyText(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {}
    // file:// / insecure fallback
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    } catch {
      return false;
    }
  }
  async function mountCodePanes(root) {
    const panes = [...root.querySelectorAll(".code-pane")];
    wireCopy(root);
    if (!panes.length) return;

    let ready = false;
    try {
      await window.MonacoLoader.loadMonaco();
      ready = true;
    } catch {
      // Offline / CDN blocked → graceful fallback for every pane.
      panes.forEach(renderFallback);
      return;
    }
    if (!ready) {
      panes.forEach(renderFallback);
      return;
    }

    const mountOne = (pane) => {
      if (pane._mounted) return;
      pane._mounted = true;
      const mount = pane.querySelector("[data-mount]");
      try {
        pane._editor = window.MonacoLoader.createEditor(mount, {
          code: paneSource(pane),
          language: pane.dataset.lang,
          readOnly: pane.dataset.readonly === "true",
        });
      } catch {
        renderFallback(pane);
      }
    };

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              mountOne(e.target);
              io.unobserve(e.target);
            }
          });
        },
        { rootMargin: "400px 0px" }
      );
      panes.forEach((p) => io.observe(p));
    } else {
      panes.forEach(mountOne);
    }
  }

  /* ---------------- lesson rendering ---------------- */
  function partTitle(partId) {
    const p = COURSE.parts.find((x) => x.id === partId);
    return p ? p.title : "";
  }
  function renderLessonHead(meta) {
    const objectives =
      meta.objectives && meta.objectives.length
        ? `<div class="objectives"><h2>By the end you can</h2><ul>${meta.objectives
            .map((o) => `<li>${o}</li>`)
            .join("")}</ul></div>`
        : "";
    const project = meta.project
      ? `<div class="project-banner">📦 <strong>Project:</strong> <code>projects/${meta.project}</code> — run <code>pnpm ${projectScript(
          meta.project
        )}</code> in the repo root to follow along.</div>`
      : "";
    const pills = [
      meta.level ? `<span class="pill">${meta.level}</span>` : "",
      meta.estMinutes ? `<span class="pill">~${meta.estMinutes} min</span>` : "",
    ].join("");
    return `
      ${project}
      <header class="lesson-head">
        <p class="eyebrow">${partTitle(meta.part)}</p>
        <h1>${meta.title}</h1>
        ${meta.lede ? `<p class="lede">${meta.lede}</p>` : ""}
        <div class="meta-row">${pills}</div>
        ${objectives}
      </header>`;
  }
  function projectScript(project) {
    const map = {
      "js-foundations": "js",
      "vite-fundamentals": "vite",
      "vite-hooks-lab": "hooks",
      "design-system": "design",
      "data-routing-app": "data",
      "next-saas": "next",
      "expo-mobile": "expo",
    };
    return map[project] || "install:all";
  }
  function renderFooter(idx) {
    const prev = COURSE.lessons[idx - 1];
    const next = COURSE.lessons[idx + 1];
    const btn = (l, dir) =>
      l
        ? `<a class="nav-btn ${dir}" href="lesson.html?id=${encodeURIComponent(
            l.id
          )}"><span class="dir">${
            dir === "prev" ? "← Previous" : "Next →"
          }</span><span class="title">${l.title}</span></a>`
        : `<span class="nav-btn ${dir}" aria-disabled="true"><span class="dir">${
            dir === "prev" ? "← Previous" : "Next →"
          }</span><span class="title">—</span></span>`;
    return `<footer class="lesson-footer">${btn(prev, "prev")}${btn(
      next,
      "next"
    )}</footer>`;
  }

  function loadLessonFragment(id) {
    return new Promise((resolve, reject) => {
      window.__lessonDef = null;
      let settled = false;
      window.__onLessonRegister = (def) => {
        if (settled) return;
        settled = true;
        resolve(def);
      };
      const s = document.createElement("script");
      s.src = `lessons/${id}.js`;
      s.onerror = () => {
        if (!settled) {
          settled = true;
          reject(new Error("Lesson not found: " + id));
        }
      };
      document.body.appendChild(s);
      setTimeout(() => {
        if (!settled) {
          settled = true;
          reject(new Error("Lesson timed out: " + id));
        }
      }, 10000);
    });
  }

  async function bootLessonPage() {
    initTheme();
    renderHeader({ withMenu: true });

    const params = new URLSearchParams(location.search);
    let id = params.get("id");
    if (!id) {
      // default to the first lesson
      id = COURSE.lessons[0] && COURSE.lessons[0].id;
    }
    const idx = COURSE.lessons.findIndex((l) => l.id === id);
    renderSidebar(id);

    const root = $("#lesson-root");
    root.innerHTML = `<div class="lesson-status"><div class="spinner"></div><p>Loading lesson…</p></div>`;

    if (idx === -1) {
      root.innerHTML = `<div class="lesson-status"><h1>Lesson not found</h1><p>No lesson with id <code>${
        id || ""
      }</code> is registered in the manifest.</p><p><a href="index.html">← Back to the course home</a></p></div>`;
      document.title = "Lesson not found • " + COURSE.title;
      return;
    }

    let def;
    try {
      def = await loadLessonFragment(id);
    } catch (err) {
      root.innerHTML = `<div class="lesson-status"><h1>Couldn't load this lesson</h1><p>${err.message}</p><p><a href="index.html">← Back to the course home</a></p></div>`;
      return;
    }

    const meta = def.meta || {};
    const bodyHtml = def.render ? def.render(def.helpers) : "";
    root.innerHTML =
      renderLessonHead(meta) +
      `<div class="lesson-body">${bodyHtml}</div>` +
      renderFooter(idx);

    document.title = `${meta.title} • ${COURSE.title}`;
    markDone(id);
    updateHeaderProgress();
    // refresh the "done" tick on the active sidebar item
    renderSidebar(id);

    await mountCodePanes(root);
    wireKeyboardNav(idx);
    window.scrollTo({ top: 0 });
  }

  function wireKeyboardNav(idx) {
    document.addEventListener("keydown", (e) => {
      if (e.target.matches("input, textarea") || e.metaKey || e.ctrlKey) return;
      // don't hijack when typing inside a Monaco editor
      if (e.target.closest && e.target.closest(".monaco-editor")) return;
      if (e.key === "ArrowLeft" && COURSE.lessons[idx - 1]) {
        location.href =
          "lesson.html?id=" + encodeURIComponent(COURSE.lessons[idx - 1].id);
      } else if (e.key === "ArrowRight" && COURSE.lessons[idx + 1]) {
        location.href =
          "lesson.html?id=" + encodeURIComponent(COURSE.lessons[idx + 1].id);
      }
    });
  }

  /* ---------------- landing page ---------------- */
  function bootLandingPage() {
    initTheme();
    renderHeader({ withMenu: false });

    const root = $("#landing-root");
    if (!root) return;

    const firstLesson = COURSE.lessons[0];
    const totalLessons = COURSE.lessons.length;

    const cards = COURSE.parts
      .map((part, i) => {
        const lessons = lessonsByPart(part.id);
        const items = lessons.length
          ? `<ol>${lessons
              .map(
                (l) =>
                  `<li><a href="lesson.html?id=${encodeURIComponent(
                    l.id
                  )}">${l.title}</a></li>`
              )
              .join("")}</ol>`
          : `<ol><li style="color:var(--text-faint)">Lessons coming as this part is authored.</li></ol>`;
        const partNum = String(i).padStart(2, "0");
        return `
        <details class="toc-card" ${i === 0 ? "open" : ""}>
          <summary><span class="part-id">${partNum}</span>${
          part.title
        }<span class="count">${lessons.length} lesson${
          lessons.length === 1 ? "" : "s"
        }</span></summary>
          <p style="padding:0 var(--space-5);color:var(--text-muted);margin-top:0">${
            part.blurb || ""
          }</p>
          ${items}
        </details>`;
      })
      .join("");

    root.innerHTML = `
      <section class="hero">
        <h1>Become a <span class="grad">Principal React Engineer</span><br/>from absolute zero.</h1>
        <p>A hands-on, university-grade course covering everything React in ${
          new Date().getFullYear()
        }: JavaScript &amp; TypeScript foundations, React 19.2, the React Compiler, Next.js 16, React Native &amp; Expo, testing, and principal-level architecture — built line by line with real projects.</p>
        ${
          firstLesson
            ? `<a class="cta" href="lesson.html?id=${encodeURIComponent(
                firstLesson.id
              )}">Start learning →</a>`
            : ""
        }
        <p style="margin-top:var(--space-4);font-size:var(--text-sm)">${
          COURSE.parts.length
        } parts • ${totalLessons} lesson${
      totalLessons === 1 ? "" : "s"
    } published so far</p>
      </section>
      <div class="toc-grid">${cards}</div>
    `;
  }

  /* ---------------- boot ---------------- */
  function boot() {
    const page = document.body.getAttribute("data-page");
    if (page === "lesson") bootLessonPage();
    else if (page === "landing") bootLandingPage();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
