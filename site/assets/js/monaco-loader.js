/* =====================================================================
   monaco-loader.js — load the Monaco editor from a CDN (AMD loader) and
   expose helpers to mount read-only / editable code panes.

   Design goals:
   - Works over http(s) AND from file:// (uses <script> injection + CDN
     workers, both allowed under file://).
   - Never blocks the page: if the CDN is unreachable (offline), callers
     fall back to a plain <pre><code> block. The raw source always lives
     in a <template>, so the fallback is free and lossless.
   ===================================================================== */

(function () {
  const VERSION = (window.COURSE && window.COURSE.monacoVersion) || "0.53.0";
  const CDN = `https://cdn.jsdelivr.net/npm/monaco-editor@${VERSION}/min/vs`;

  let loadPromise = null;

  function injectScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.onload = resolve;
      s.onerror = () => reject(new Error("Failed to load " + src));
      document.head.appendChild(s);
    });
  }

  // Resolve once Monaco is ready, or reject if the CDN can't be reached.
  function loadMonaco() {
    if (loadPromise) return loadPromise;

    loadPromise = (async () => {
      // Web workers can't be fetched cross-origin directly; route them
      // through a tiny same-origin (blob/data) proxy worker per Monaco docs.
      window.MonacoEnvironment = {
        getWorkerUrl: function () {
          const proxy = `self.MonacoEnvironment = { baseUrl: "${CDN}/" };
importScripts("${CDN}/base/worker/workerMain.js");`;
          return (
            "data:text/javascript;charset=utf-8," + encodeURIComponent(proxy)
          );
        },
      };

      await injectScript(`${CDN}/loader.js`);

      // Load the editor. The AMD require's success/error callbacks can BOTH
      // fail to fire if Monaco's module evaluation hiccups — so we race it
      // against a hard timeout. A stuck load then rejects and callers fall
      // back to <pre>, instead of the lesson hanging forever.
      await new Promise((resolve, reject) => {
        if (!window.require) {
          reject(new Error("Monaco AMD loader missing"));
          return;
        }
        const timer = setTimeout(
          () => reject(new Error("Monaco load timed out")),
          15000
        );
        const done = () => {
          clearTimeout(timer);
          // Resolve only once Monaco is genuinely usable.
          if (window.monaco && window.monaco.editor) resolve();
          else reject(new Error("Monaco loaded but is unusable"));
        };
        window.require.config({ paths: { vs: CDN } });
        window.require(["vs/editor/editor.main"], done, reject);
      });

      // Language/theme setup is best-effort — never let it break a working
      // editor (APIs shift between Monaco versions).
      try {
        configureLanguages();
      } catch {
        /* fragments don't need TS diagnostics; ignore */
      }
      try {
        defineThemes();
      } catch {
        /* fall back to Monaco's built-in vs/vs-dark themes */
      }
      return window.monaco;
    })().catch((err) => {
      // Reset so a later mount could retry, but signal failure now.
      loadPromise = null;
      throw err;
    });

    return loadPromise;
  }

  function configureLanguages() {
    const ts = window.monaco.languages.typescript;
    const opts = {
      target: ts.ScriptTarget.ESNext,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      jsx: ts.JsxEmit.ReactJSX,
      allowNonTsExtensions: true,
      esModuleInterop: true,
      allowJs: true,
      noEmit: true,
    };
    ts.typescriptDefaults.setCompilerOptions(opts);
    ts.javascriptDefaults.setCompilerOptions(opts);
    // This is a teaching surface, not an IDE — silence "cannot find module
    // 'react'" style diagnostics so snippets read clean.
    ts.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: false,
    });
    ts.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: false,
    });
  }

  function defineThemes() {
    window.monaco.editor.defineTheme("course-light", {
      base: "vs",
      inherit: true,
      rules: [],
      colors: { "editor.background": "#ffffff" },
    });
    window.monaco.editor.defineTheme("course-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: { "editor.background": "#26282f" },
    });
  }

  function monacoTheme() {
    return document.documentElement.getAttribute("data-theme") === "dark"
      ? "course-dark"
      : "course-light";
  }

  // Map a friendly lang name to a Monaco language id.
  function langId(lang) {
    switch ((lang || "").toLowerCase()) {
      case "js":
      case "jsx":
      case "javascript":
        return "javascript";
      case "ts":
      case "tsx":
      case "typescript":
        return "typescript";
      case "html":
        return "html";
      case "css":
        return "css";
      case "json":
        return "json";
      case "bash":
      case "sh":
      case "shell":
        return "shell";
      case "md":
      case "markdown":
        return "markdown";
      default:
        return "plaintext";
    }
  }

  /**
   * Mount a Monaco editor into `el`. Returns the editor instance.
   * Auto-sizes height to content so the page reads like a document.
   */
  function createEditor(el, { code, language, readOnly }) {
    const editor = window.monaco.editor.create(el, {
      value: code,
      language: langId(language),
      theme: monacoTheme(),
      readOnly: !!readOnly,
      domReadOnly: !!readOnly,
      automaticLayout: true,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      scrollbar: { alwaysConsumeMouseWheel: false },
      lineNumbers: "on",
      renderLineHighlight: readOnly ? "none" : "line",
      fontFamily:
        'ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace',
      fontSize: 14,
      lineHeight: 22,
      padding: { top: 12, bottom: 12 },
      tabSize: 2,
      wordWrap: "on",
      contextmenu: !readOnly,
      overviewRulerLanes: 0,
      folding: false,
    });

    const fit = () => {
      const lines = editor.getModel()?.getLineCount() || 1;
      const h = Math.min(Math.max(lines, 1) * 22 + 28, 640);
      el.style.height = h + "px";
      editor.layout();
    };
    fit();
    editor.onDidChangeModelDecorations(fit);
    if (!readOnly) editor.onDidChangeModelContent(fit);

    return editor;
  }

  function retheme() {
    if (window.monaco) window.monaco.editor.setTheme(monacoTheme());
  }

  window.MonacoLoader = { loadMonaco, createEditor, retheme, langId };
})();
