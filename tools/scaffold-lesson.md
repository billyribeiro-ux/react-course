# Authoring spec — how to write a lesson

Every lesson is **one file** that calls `registerLesson({ meta, render })`. The shared shell
(`site/assets/js/shell.js`) supplies all chrome — header, sidebar, project banner, lesson head,
prev/next footer, Monaco mounting, copy buttons, theme, progress. **Authors only write `meta` +
prose + helper calls.** That's what keeps hundreds of lessons identical.

## File & id conventions

- **Path:** `site/lessons/<PART>/<NNNN>-<slug>.js`
  - `<PART>` is a part directory like `30-react-fundamentals`. Part numbers go in **tens**
    (`00, 10, 20 … b0, c0`) so a whole part can be inserted between two without renumbering.
  - `<NNNN>` is a four-digit lesson number in **hundreds** (`0100, 0200, 0300 …`). The gaps let you
    insert up to 99 lessons between any two without ever renumbering.
  - `<slug>` is stable kebab-case. It appears in the URL and the saved-progress key — **never rename
    it after publishing** (it would break bookmarks and progress).
- **`meta.id` = the path minus `.js`** (e.g. `30-react-fundamentals/0200-jsx`). It is the primary key
  in the manifest, URL, prev/next, and `localStorage`.

## `meta` fields

| field | required | notes |
|---|---|---|
| `id` | ✅ | must equal the file path minus `.js` |
| `title` | ✅ | shown as the H1 and in the sidebar |
| `part` | ✅ | must be an `id` in `COURSE.parts` |
| `estMinutes` | ✅ | rough reading/doing time |
| `objectives` | ✅ | array of concrete "you can…" statements (verbs) |
| `project` | ✅ | workspace folder name (e.g. `"vite-fundamentals"`) or `null` |
| `level` | ➖ | `beginner \| intermediate \| advanced \| principal` |
| `lede` | ➖ | one-paragraph intro shown under the title |

## `render(h)` — the body

Returns an HTML string. Wrap prose in `<section class="prose">`. Use **only** these helpers for
structure (never hand-write `.callout`, `.code-pane`, or `.exercise` markup):

- `h.codePane({ lang, title, code, readOnly })` — read-only by default; pass `editable: true` for a
  "try it" pane. `lang`: `tsx | ts | jsx | js | html | css | json | bash | markdown`.
- `h.callout({ kind, title, body })` — `kind`: `note | tip | warning | gotcha | principal`. `body`
  is HTML. Omit `title` for a default; pass `title: false` for no heading.
- `h.exercise({ title, prompt, runHint })` — `prompt` is HTML; `runHint` is a shell command tied to
  `meta.project`.

Plain prose uses normal HTML: `<h2>`, `<h3>`, `<p>`, `<ul>/<ol>`, `<code>`, `<strong>`, `<kbd>`.

## Per-lesson checklist

1. Copy `site/lessons/00-intro/0100-welcome.js` as a starting template.
2. Set `meta` (id matches the path; objectives are concrete).
3. Write the body: short prose sections, frequent code panes, callouts for traps/insights.
4. Include at least one `h.exercise(...)` with a real `runHint` when the lesson has a project.
5. Add one ordered entry to `COURSE.lessons[]` in `site/assets/js/manifest.js` at the right position.
6. Run `pnpm check:lessons` — it must pass (no missing files, no orphans, unique ids).

## Quality bar

- Explain the **why**, not just the **how**. Use `kind: "principal"` callouts for the senior lens.
- Teach one idea at a time; keep snippets small and runnable.
- Prefer the **latest stable syntax** (React 19.2, TS 5, Next 16, etc.).
- End every project-attached lesson by leaving the student with a working, runnable result.
