/* Lesson 80-nextjs/1600 — Metadata & SEO. */
registerLesson({
  meta: {
    id: "80-nextjs/1600-metadata-seo",
    title: "Metadata & SEO",
    part: "80-nextjs",
    estMinutes: 13,
    level: "advanced",
    project: "next-saas",
    lede: "If people can't find your app, nothing else matters. Next.js makes great SEO straightforward: server-rendered HTML, a typed metadata API, dynamic titles, social cards, sitemaps, and structured data.",
    objectives: [
      "Set static and dynamic metadata",
      "Generate social share cards (Open Graph)",
      "Add sitemaps and robots files",
      "Understand why SSR helps SEO",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Why Next.js is good for SEO</h2>
      <p>
        Search engines and social platforms read your page's HTML. A client-only SPA initially ships an empty
        <code>&lt;div&gt;</code> — bad for SEO and social previews. Next.js renders real HTML on the server, with
        titles and meta tags present from the first byte. That server rendering is a structural SEO advantage.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "Static & dynamic metadata",
        readOnly: true,
        code: `// Static — export a metadata object from a layout or page:
export const metadata: Metadata = {
  title: "LaunchPad — Ship faster",
  description: "The full-stack SaaS starter.",
};

// Dynamic — generate metadata from data (e.g. a project's name):
export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
): Promise<Metadata> {
  const { id } = await params;
  const project = await getProject(Number(id));
  return {
    title: \`\${project.name} — LaunchPad\`,
    description: project.summary,
  };
}`,
      })}

      <h2>Social cards (Open Graph)</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Open Graph + Twitter cards",
        readOnly: true,
        code: `export const metadata: Metadata = {
  openGraph: {
    title: "LaunchPad",
    description: "Ship your SaaS faster.",
    images: ["/og-image.png"],   // the preview image when shared
  },
  twitter: { card: "summary_large_image" },
};
// Next can even GENERATE og images dynamically with an opengraph-image.tsx
// file that renders to an image per page — great for blog posts/products.`,
      })}

      ${h.callout({
        kind: "principal",
        title: "SEO is a product feature, not an afterthought",
        body: `<p>Good titles and descriptions drive click-through from search; Open Graph images drive shares on
        social. These directly affect growth, yet they're often neglected. Next's typed metadata API makes them
        cheap to do well — dynamic titles per page, generated social cards, proper canonical URLs. Treating
        discoverability as a first-class concern (alongside performance and accessibility) is part of shipping a
        real product, not just a demo. A beautiful app nobody can find isn't successful.</p>`,
      })}

      <h2>Sitemaps, robots & structured data</h2>
      ${h.codePane({
        lang: "tsx",
        title: "app/sitemap.ts & app/robots.ts",
        readOnly: true,
        code: `// app/sitemap.ts — Next generates /sitemap.xml from this:
export default async function sitemap() {
  const projects = await getPublicProjects();
  return [
    { url: "https://launchpad.app", lastModified: new Date() },
    ...projects.map((p) => ({ url: \`https://launchpad.app/p/\${p.id}\` })),
  ];
}

// app/robots.ts — controls crawler access (/robots.txt).
// JSON-LD structured data (a <script type="application/ld+json">) helps
// search engines understand your content for rich results.`,
      })}

      ${h.exercise({
        title: "Make LaunchPad discoverable",
        prompt: `<p>Add proper metadata to LaunchPad: a default title/description in the root layout, dynamic
        <code>generateMetadata</code> for project pages, Open Graph + Twitter card config (with an OG image), and
        a <code>sitemap.ts</code> + <code>robots.ts</code>. View the page source and confirm the meta tags are
        present in the server-rendered HTML, and test a shared link's preview. SEO done right.</p>`,
        runHint: "pnpm --filter next-saas dev",
      })}
    </section>
  `,
});
