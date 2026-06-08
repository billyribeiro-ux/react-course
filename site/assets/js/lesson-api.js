/* =====================================================================
   lesson-api.js — the authoring surface for lessons.

   Every lesson file is exactly one call:

     registerLesson({
       meta: { id, title, part, estMinutes, objectives, project, level, lede },
       render: (h) => `<section class="prose"> ... </section>`,
     });

   Inside render, authors use ONLY these structural helpers so all lessons
   look identical across the whole course:
     h.codePane({ lang, title, code, readOnly|editable })
     h.callout({ kind, title, body })   kind: note|tip|warning|gotcha|principal
     h.exercise({ title, prompt, runHint })
   ===================================================================== */

(function () {
  let paneSeq = 0;

  function escapeHtml(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }

  /**
   * A code pane: a header bar (title, language tag, copy button) plus a
   * mount point for Monaco. The exact source is stored, HTML-escaped, in a
   * <template> so the shell can (a) feed Monaco and (b) fall back to a
   * <pre> if Monaco fails to load — losslessly.
   */
  function codePane({ lang = "tsx", title = "", code = "", readOnly, editable }) {
    const id = "pane-" + ++paneSeq;
    const ro = editable ? false : readOnly !== false; // read-only by default
    const src = (code || "").replace(/^\n/, "").replace(/\s+$/, "");
    const flag = editable
      ? '<span class="code-flag">✎ editable</span>'
      : "";
    return `
<figure class="code-pane" id="${id}" data-lang="${escapeHtml(lang)}" data-readonly="${ro}">
  <figcaption class="code-head">
    ${title ? `<span class="code-title">${escapeHtml(title)}</span>` : ""}
    <span class="code-lang">${escapeHtml(lang)}</span>
    ${flag}
    <span class="code-actions">
      <button class="copy-btn" type="button" data-copy>Copy</button>
    </span>
  </figcaption>
  <div class="code-mount" data-mount></div>
  <template data-source>${escapeHtml(src)}</template>
</figure>`;
  }

  const CALLOUT_ICON = {
    note: "📝",
    tip: "💡",
    warning: "⚠️",
    gotcha: "🐞",
    principal: "♟️",
  };
  const CALLOUT_DEFAULT_TITLE = {
    note: "Note",
    tip: "Tip",
    warning: "Warning",
    gotcha: "Gotcha",
    principal: "Principal-engineer lens",
  };

  function callout({ kind = "note", title, body = "" }) {
    const k = CALLOUT_ICON[kind] ? kind : "note";
    const heading =
      title === false
        ? ""
        : `<p class="callout-title">${escapeHtml(
            title || CALLOUT_DEFAULT_TITLE[k]
          )}</p>`;
    return `
<aside class="callout" data-kind="${k}">
  <div class="callout-icon" aria-hidden="true">${CALLOUT_ICON[k]}</div>
  <div class="callout-body">
    ${heading}
    ${body}
  </div>
</aside>`;
  }

  function exercise({ title = "Your turn", prompt = "", runHint = "" }) {
    return `
<section class="exercise">
  <p class="ex-label">✍️ Your turn</p>
  <h3>${escapeHtml(title)}</h3>
  <div class="ex-prompt">${prompt}</div>
  ${runHint ? `<p class="run-hint">${escapeHtml(runHint)}</p>` : ""}
</section>`;
  }

  /**
   * An inline SVG diagram with an accessible label and a caption. The SVG
   * should use `currentColor` / the theme CSS vars so it adapts to light/dark.
   */
  function diagram({ svg = "", caption = "", label = "" }) {
    return `
<figure class="diagram" role="img"${label ? ` aria-label="${escapeHtml(label)}"` : ""}>
  <div class="diagram-canvas">${svg}</div>
  ${caption ? `<figcaption>${caption}</figcaption>` : ""}
</figure>`;
  }

  const helpers = { codePane, callout, exercise, diagram, escapeHtml };

  /**
   * Called by each lesson fragment. The shell sets up a one-shot resolver
   * before injecting the fragment <script>, so this hands the definition
   * straight back to whoever requested this lesson.
   */
  function registerLesson(def) {
    def.helpers = helpers;
    window.__lessonDef = def;
    if (typeof window.__onLessonRegister === "function") {
      window.__onLessonRegister(def);
    }
  }

  window.registerLesson = registerLesson;
  window.LessonAPI = { helpers, escapeHtml };
})();
