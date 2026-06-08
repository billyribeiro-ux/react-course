/* Lesson b0-principal/1200 — Internationalization & localization. */
registerLesson({
  meta: {
    id: "b0-principal/1200-i18n",
    title: "Internationalization & Localization",
    part: "b0-principal",
    estMinutes: 13,
    level: "principal",
    project: "next-saas",
    lede: "If your product serves more than one language or region, i18n must be designed in — retrofitting it is painful. Learn to externalize text, handle plurals/dates/numbers, and support right-to-left layouts.",
    objectives: [
      "Externalize and translate UI text",
      "Handle plurals, dates, numbers, and currency",
      "Support RTL and locale-aware formatting",
      "Architect i18n into a React/Next app",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>i18n vs l10n</h2>
      <p>
        <strong>Internationalization (i18n)</strong> is building your app so it <em>can</em> be adapted to any language/
        region (externalizing text, handling formats). <strong>Localization (l10n)</strong> is the actual adaptation for
        a specific locale (translations, regional formats). You build i18n once; you localize per market.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "Externalized, formatted text",
        check: false,
        readOnly: true,
        code: `// ❌ Hardcoded — untranslatable, wrong format for other locales:
<p>You have {count} messages</p>

// ✅ Externalized with a translation function + ICU formatting:
<p>{t("inbox.count", { count })}</p>
// "inbox.count": "{count, plural, =0 {No messages} one {# message} other {# messages}}"
// → correct pluralization per language (some have 1/few/many forms!)

// Locale-aware formatting (built into the browser):
new Intl.NumberFormat(locale, { style: "currency", currency: "EUR" }).format(1234.5);
new Intl.DateTimeFormat(locale).format(date);`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Design for i18n from the start",
        body: `<p>Retrofitting i18n into an app full of hardcoded English strings, concatenated sentences, and
        US-format dates is a brutal, error-prone slog. If there's <em>any</em> chance you'll go multilingual,
        externalize strings and use locale-aware formatting from day one — it's cheap then and expensive later. Even
        for English-only apps, the discipline (no concatenated sentences, format dates/numbers via <code>Intl</code>)
        improves quality. Libraries: <strong>next-intl</strong> or <strong>react-i18next</strong> handle the message
        catalogs, pluralization (ICU MessageFormat), and locale routing.</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "The traps beyond translation",
        body: `<p>i18n is more than swapping words: <strong>pluralization rules differ</strong> by language (Arabic has
        six plural forms!), <strong>text expands</strong> (German can be 30%+ longer — your layout must flex),
        <strong>dates/numbers/currencies</strong> format differently per locale (use <code>Intl</code>, never
        hand-format), <strong>RTL languages</strong> (Arabic, Hebrew) need the whole layout mirrored (use CSS logical
        properties — <code>margin-inline-start</code> not <code>margin-left</code>), and you can't
        <strong>concatenate</strong> sentence fragments (word order varies by language). Designing UI that survives all
        this is a real skill.</p>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Next.js + i18n architecture",
        body: `<p>In Next.js, locale is typically part of the URL (<code>/en/...</code>, <code>/de/...</code>) so each
        locale is crawlable and shareable (good SEO), with middleware detecting/redirecting based on the user's
        preference. Translations load on the server (Server Components), so the right language ships in the initial
        HTML. Architecting i18n as a first-class concern — locale in the URL, server-loaded messages, logical CSS for
        RTL — is how you build a genuinely global product, not just a translated one.</p>`,
      })}

      ${h.exercise({
        title: "Internationalize LaunchPad",
        prompt: `<p>Add i18n to LaunchPad with next-intl (or react-i18next): externalize all UI strings into message
        catalogs, add a second locale, format at least one date and one number with <code>Intl</code>, and handle a
        pluralized string correctly. Put the locale in the URL. Switch locales and confirm the whole UI translates and
        formats correctly. Bonus: test that a longer-text locale doesn't break your layout.</p>`,
        runHint: "pnpm --filter next-saas dev",
      })}
    </section>
  `,
});
