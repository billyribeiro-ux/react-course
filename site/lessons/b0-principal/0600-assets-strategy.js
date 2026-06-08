/* Lesson b0-principal/0600 — Image, font & asset strategy. */
registerLesson({
  meta: {
    id: "b0-principal/0600-assets-strategy",
    title: "Image, Font & Asset Strategy",
    part: "b0-principal",
    estMinutes: 13,
    level: "principal",
    project: "next-saas",
    lede: "Images and fonts are usually the heaviest things on a page and a top cause of poor Core Web Vitals. A deliberate asset strategy — formats, sizing, loading, and caching — is high-impact, low-glamour performance work.",
    objectives: [
      "Optimize images for size and CLS",
      "Load fonts without blocking or shifting",
      "Cache and serve assets efficiently",
      "Treat assets as a performance budget",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Images: usually the biggest win</h2>
      <p>
        Images often dominate page weight. The strategy: serve <strong>modern formats</strong> (AVIF/WebP), the
        <strong>right size</strong> for the display (not a 4000px image in a 400px slot), <strong>lazy-load</strong>
        off-screen images, and <strong>reserve space</strong> to prevent layout shift. <code>next/image</code> (Part
        80) does all of this automatically — which is why it's worth using everywhere.
      </p>

      ${h.callout({
        kind: "principal",
        title: "The image checklist",
        body: `<p>For every image ask: Is it the <strong>right format</strong> (AVIF/WebP over JPEG/PNG)? The
        <strong>right dimensions</strong> (responsive <code>srcset</code>, not one huge file)? Does it
        <strong>reserve space</strong> (width/height or aspect-ratio, so it doesn't cause CLS)? Is it
        <strong>lazy-loaded</strong> if below the fold (and <em>eager/priority</em> if it's the LCP image)? Does it
        have meaningful <strong>alt text</strong> (accessibility + SEO)? Getting images right frequently improves LCP
        and CLS more than any JavaScript optimization — it's the highest-ROI performance area on most content
        pages.</p>`,
      })}

      <h2>Fonts: avoid blocking and shifting</h2>
      ${h.callout({
        kind: "principal",
        title: "Web fonts are a sneaky performance cost",
        body: `<p>Custom fonts can block text rendering (invisible text while loading) or cause a jarring shift when
        the custom font swaps in (FOUT/CLS). Mitigations: <strong>self-host</strong> fonts (faster, privacy-friendly,
        no third-party round-trip), use <code>font-display: swap</code> (show fallback text immediately), <strong>preload</strong>
        critical fonts, <strong>subset</strong> them (ship only the characters/weights you use), and pick a
        <strong>fallback metric-matched</strong> to the web font to minimize shift. Next.js <code>next/font</code>
        automates much of this (self-hosting, preloading, zero layout shift). Typography is part of performance, not
        just design.</p>`,
      })}

      <h2>Caching & delivery</h2>
      ${h.callout({
        kind: "principal",
        title: "Cache aggressively with content hashing",
        body: `<p>Static assets (JS, CSS, images, fonts) should be served from a <strong>CDN</strong> with
        <strong>long cache lifetimes</strong> and <strong>content-hashed filenames</strong> (<code>app.a1b2c3.js</code>).
        Hashing means the URL changes when the content changes, so you can cache forever <em>and</em> never serve a
        stale version — the best of both. Build tools (Vite, Next) do this automatically. Add compression (Brotli/
        gzip) at the server/CDN. These delivery fundamentals — CDN, immutable caching, compression — make repeat
        visits near-instant and are table stakes for a fast production site.</p>`,
      })}

      ${h.exercise({
        title: "Audit your assets",
        prompt: `<p>Run Lighthouse on LaunchPad and look at the image/font opportunities. Ensure every image uses
        <code>next/image</code> with proper sizing and reserved space (fix any CLS), and switch fonts to
        <code>next/font</code> for self-hosting and zero shift. Find your LCP image and mark it <code>priority</code>.
        Re-measure LCP and CLS. Asset optimization is unglamorous but often your biggest, easiest win.</p>`,
        runHint: "pnpm --filter next-saas build",
      })}
    </section>
  `,
});
